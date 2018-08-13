const express = require('express');
const router = express.Router();
const db = require("../my_modules/db.js");
const crypto = require('crypto');
const moment = require('moment');

// http://localhost:3000/nodejs/login?action=SignIn&searchJson={"username":"tom","password":"tom123456"}&osJson={}  //登录
// http://localhost:3000/nodejs/login?action=SignOut  //退出



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
	    case "SignIn":
		      SignIn();
			  break;
		case "SignOut":
		      SignOut();
			  break;
		case "updateData":
		      updateData();
			  break;
        default:
              returnErr("action错误");
          
	}
	
   
    
	//登录 
	function SignIn () {
		if(req.body.searchJson){
			try{
			  var whereJson = JSON.parse(req.body.searchJson);
			}catch(e){
				returnErr("searchJson错误");
				return;
			}
		}else{
			var whereJson = {};
		}
		
		if(req.body.osJson){
			try{
			  var osJson = JSON.parse(req.body.osJson);
			}catch(e){
				returnErr("osJson错误");
				return;
			}
		}else{
			var osJson = {};
		}
		
		if(whereJson.username && whereJson.password.length >= 6){
				let password = "pw" + whereJson.password + (whereJson.password).substr(0,3);
				let md5 = crypto.createHash("md5");
                let md5Password = md5.update(password).digest("hex");
                whereJson.password = md5Password;
		}else{
			res.send("用户名和密码格式错误");
			return;
	    }
		
		var whereJsonNoPW = {};
		whereJsonNoPW.username = whereJson.username;
		
		var args = "";
		var fieldJson = {"username":1, "password":1};
		db.findData("userList", whereJsonNoPW, fieldJson, args, function(err, result, count){
		        if(err){
		            returnErr('findDataError:'+ err);
				        return;
		        }
		       //console.log(result);
		       if(result.length == 0){
		       	  res.send("用户名错误");
		       	  return;
		       }
		       
		       db.findData("userList", whereJson, fieldJson, args, function(err2, result2, count2){
			        if(err2){
			            returnErr('findDataError:'+ err2);
					        return;
			        }
			       //console.log(result);
			       if(result2.length == 0){
			       	  res.send("密码错误");
			       	  return;
			       }
			       
			       console.log(whereJson.username + "登录成功");
			       var os = osJson.os ? osJson.os : "";
			       var px = osJson.px ? osJson.px : "";
			       var ip = req.ip;
			       res.cookie("logining", {"username": whereJson.username, "hash": whereJson.password, "os":os, "px":px, "ip":ip }, { maxAge: 8*3600*1000});
			       res.send("登录成功");
			       
			       //操作记录
			        var content = "action=SignIn";
			        var recordJson = {"username":whereJson.username, "dbName":"userList", "action": "登录", "content": content, "os": os, "px": px, "ip": ip, "time": moment().format("YYYY-MM-DD HH:mm:ss")};
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
	function SignOut () {
		var username = req.cookies["logining"].username;
		res.clearCookie("logining");
		console.log(username + "退出成功");
        //res.redirect('/login.html?'+Date.now());
        res.send("退出成功");
        
        //操作记录
        var content = "action=SignOut";
        var recordJson = {"username":username, "dbName":"userList", "action": "退出", "content": content, "os": req.cookies["logining"].os, "px": req.cookies["logining"].px, "ip": req.ip, "time": moment().format("YYYY-MM-DD HH:mm:ss")};
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
				returnErr("searchJson错误");
				return;
			}
		}else{
			returnErr("searchJson错误");
			return;
		}
		
		if(req.body.updateJson){
			try{
			  var updateData = JSON.parse(req.body.updateJson);
			}catch(e){
				returnErr("updateJson错误");
				return;
			}
		}else{
			returnErr("updateJson错误");
			return;
		}
		
		if(whereJson.username != req.cookies["logining"].username){
			returnErr("没有权限");
			return;
		}
		
		if(updateData.password != null){
			if(updateData.password.length >= 6){
				let password = "pw" + updateData.password + (updateData.password).substr(0,3);
				let md5 = crypto.createHash("md5");
	            let md5Password = md5.update(password).digest("hex");
	            updateData.password = md5Password;
			}else{
				returnErr("密码不能为空");
				return;
		    }
		}
	    
	    updateData.update_name = req.cookies["logining"].username;
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
		        	res.send("操作成功");
		        }else{
		        	res.send("操作失败");
		        }
		        
		        //操作记录
		        var content = "修改密码";
		        var recordJson = {"username":whereJson.username, "dbName":"userList", "action": "修改", "content": content, "os": req.cookies["logining"].os, "px": req.cookies["logining"].px, "ip": req.ip, "time": moment().format("YYYY-MM-DD HH:mm:ss")};
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


