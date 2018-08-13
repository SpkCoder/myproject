const express = require('express');
const router = express.Router();
const db = require("../my_modules/db.js");
const crypto = require('crypto');
const moment = require('moment');

// http://localhost:3000/nodejs/login?action=signIn&searchJson={"UserName":"tom","Password":"tom123456"}&osJson={}  //登录
// http://localhost:3000/nodejs/login?action=signOut  //退出
// http://localhost:3000/nodejs/login?action=updateData&searchJson={"UserName":"tom"}&updateJson={"Password":"12345678"}  //修改密码


router.post('/', function(req, res, next) {
	
	
	//返回错误
    function returnErr (value) {
    	console.log(value);
		res.send(value);
    }
    
    
    //分配方法
	console.log(req.body);
	var action = req.body.action;
	switch (action){
	    case "signIn":
		      signIn();
			  break;
		case "signOut":
		      signOut();
			  break;
		case "updateData":
		      updateData();
			  break;
        default:
              returnErr("action Error");
          
	}
	
   

    //登录后修改密码
    function loginInChangePassword(whereJson) {
    	var md5 = crypto.createHash("md5");
        var md5Password = md5.update(whereJson.Password).digest("hex");
        whereJson.Password = md5Password;
        var updateJson = {$set: {"Password": whereJson.Password, "UPasswordChanged": "true"}};
    	db.updateData("userList", {"UserName": whereJson.UserName}, updateJson, function(err,result){
		        if(err){
		            returnErr('loginInChangePassword:'+ err);
				    return;
		        }
		        //console.log(result.result);
		});
    }


    
	//登录 
	function signIn () {
		if(req.body.searchJson){
			try{
			  var whereJson = JSON.parse(req.body.searchJson);
			}catch(e){
				returnErr("searchJson Error");
				return;
			}
		}else{
			var whereJson = {};
		}
		
		if(req.body.osJson){
			try{
			  var osJson = JSON.parse(req.body.osJson);
			}catch(e){
				returnErr("osJson Error");
				return;
			}
		}else{
			var osJson = {};
		}
		
		if(whereJson.Password.length < 8){
			res.send("Password format Error");
			return;
	    }
		
		var whereJson2 = JSON.parse(JSON.stringify(whereJson));
		var whereJsonNoPW = {};
		whereJsonNoPW.UserName = whereJson.UserName;
		
		var args = "";
		var fieldJson = {"UserName":1, "Password":1 ,"UPasswordChanged":1};
		db.findData("userList", whereJsonNoPW, fieldJson, args, function(err, result, count){
		        if(err){
		            returnErr('findDataError:'+ err);
				        return;
		        }
		       //console.log(result);
		       if(result.length == 0){
		       	  res.send("UserName Error");
		       	  return;
		       }

                var UPasswordChanged = result[0].UPasswordChanged;
		        if(UPasswordChanged == "true"){
                    var Password = whereJson.Password;
		        }else{
                    var Password = whereJson.Password.toUpperCase();
		        }
		        var md5 = crypto.createHash("md5");
	            var md5Password = md5.update(Password).digest("hex");
	            whereJson.Password = md5Password;

		       db.findData("userList", whereJson, fieldJson, args, function(err2, result2, count2){
			        if(err2){
			            returnErr('findDataError:'+ err2);
					        return;
			        }
//			       console.log(result2);
			       if(result2.length == 0){
			       	  res.send("Password Error");
			       	  return;
			       }
			       
			       console.log(whereJson.UserName + " Login Success");
			       var os = osJson.os ? osJson.os : "";
			       var px = osJson.px ? osJson.px : "";
			       var ip = req.ip;
			       res.cookie("logining", {"UserName": whereJson.UserName, "hash": whereJson.Password, "os":os, "px":px, "ip":ip }, {maxAge: 8*3600*1000});
			       res.send("Login Success");
			       
                   
                   //修改密码
			       if(UPasswordChanged != "true"){
	                   loginInChangePassword(whereJson2);
			       }
                   


			       //操作记录
			         var content = "action=signIn";
			         var recordJson = {"UserName":whereJson.UserName, "dbName":"userList", "action": "signIn", "content": content, "os": os, "px": px, "ip": ip, "time": moment().format("YYYY-MM-DD HH:mm:ss")};
			         db.setRecord(recordJson, function(recordErr,recordResult){
				         if(recordErr){
				             returnErr('setRecordError:'+ recordErr);
						     return;
				         }
				         console.log("操作记录成功"+content);
				     });
			  });
		       
		});
		
	}
	
	
	//退出 
	function signOut () {
		var UserName = req.cookies["logining"].UserName;
		res.clearCookie("logining");
		console.log(UserName + " signOut Success");
        //res.redirect('/login.html?'+Date.now());
        res.send("signOut Succes");
        
        //操作记录
	     var content = "action=signOut";
	     var recordJson = {"UserName":UserName, "dbName":"userList", "action": "signOut", "content": content, "os": req.cookies["logining"].os, "px": req.cookies["logining"].px, "ip": req.ip, "time": moment().format("YYYY-MM-DD HH:mm:ss")};
	     db.setRecord(recordJson, function(recordErr,recordResult){
	         if(recordErr){
	             returnErr('setRecordError:'+ recordErr);
			     return;
	         }
	         console.log("操作记录成功"+content);
	     });

	}
	
	
	//修改密码 
	function updateData () {
		if(req.body.searchJson){
			try{
			  var whereJson = JSON.parse(req.body.searchJson);
			}catch(e){
				returnErr("searchJson Error");
				return;
			}
		}else{
			returnErr("searchJson Error");
			return;
		}
		
		if(req.body.updateJson){
			try{
			  var updateData = JSON.parse(req.body.updateJson);
			}catch(e){
				returnErr("updateJson Error");
				return;
			}
		}else{
			returnErr("updateJson Error");
			return;
		}
		
		
		if(whereJson.UserName != req.cookies["logining"].UserName){
			returnErr("No Permission");
			return;
		}
		
		if(updateData.Password != null){
			if(updateData.Password.length >= 8){
				let Password = updateData.Password;
				let md5 = crypto.createHash("md5");
	            let md5Password = md5.update(Password).digest("hex");
	            updateData.Password = md5Password;
			}else{
				returnErr("Password format Error");
				return;
		    }
		}
	    
	    updateData.update_name = req.cookies["logining"].UserName;
        updateData.update_time = moment().format("YYYY-MM-DD HH:mm:ss");
    	var updateJson = {$set: updateData};
		db.updateData("userList", whereJson, updateJson, function(err,result){
		        if(err){
		            returnErr('updateDataError:'+ err);
				    return;
		        }
		        //console.log(result.result);
		        console.log("修改了" + result.result.n +"条数据");
		        if(result.result.n > 0){
		        	res.send("Success");
		        }else{
		        	res.send("Error");
		        }
		        
		         //操作记录
		         var content = "Change Password";
		         var recordJson = {"UserName":whereJson.UserName, "dbName":"userList", "action": "update", "content": content, "os": req.cookies["logining"].os, "px": req.cookies["logining"].px, "ip": req.ip, "time": moment().format("YYYY-MM-DD HH:mm:ss")};
		         db.setRecord(recordJson, function(recordErr,recordResult){
			         if(recordErr){
			             returnErr('setRecordError:'+ recordErr);
					     return;
			         }
			         console.log("操作记录成功"+content);
			     });
		});
		
	}
	
	
	
});

	



module.exports = router;


