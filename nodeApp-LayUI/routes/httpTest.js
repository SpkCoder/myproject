const express = require('express');
const router = express.Router();
const db = require("../my_modules/db.js");
const moment = require('moment');
const sendMail = require("../my_modules/sendMail.js");
const httpRequest = require("../my_modules/httpRequest.js");
const myGM = require("../my_modules/myGM.js");
const jwt = require("../my_modules/jwt.js");

// http://localhost:3000/nodejs/httpTest?action=findData&searchJson={"name":"mick"}&fieldJson={"name":1}&prePageNum=10&currPage=1&sortJson={"key":1}  //查询数据
// http://localhost:3000/nodejs/httpTest?action=findDataLookup&fromJson={"dbName":"roleClass","pk":"roleId","fk":"id","as":"lookup"}&searchJson={"name":"mick"}&fieldJson={"name":1}&prePageNum=10&currPage=1&sortJson={"key":1}  //查询关联数据
// http://localhost:3000/nodejs/httpTest?action=insertData&dataArr=[{"name":"mick","age":18},{"name":"tina","age":35}]  //插入数据 
// http://localhost:3000/nodejs/httpTest?action=updateData&searchJson={"name":"mick"}&updateJson={"age":20}  //修改数据 
// http://localhost:3000/nodejs/httpTest?action=delData&dataJson={"name":{"$in":["mick","tina"]}}  //删除数据 
// http://localhost:3000/nodejs/httpTest?action=addCol&dataJson={"name":""}  //插入列
// http://localhost:3000/nodejs/httpTest?action=updateCol&dataJson={"oldname":"newname"}  //修改列
// http://localhost:3000/nodejs/httpTest?action=delCol&dataJson={"name":""}  //删除列
// http://localhost:3000/nodejs/httpTest?action=sendMail&dataJson={"to":"1533165085@qq.com","subject":"nodemailer测试","html":"<h2>hello</h2>"}  //发送邮件


//jwt加密
//var token = jwt.incoded({"username": "admin", "password": "123456"});
//console.log(token);
//jwt.decoded(token,function(err,result){
//	if(err){
//		console.log("jwt.decode" + err);
//	}
//	console.log(result);
//});
//return;



//创建索引
//db.createIndex(dbName,{"id":1},function(err,result){
//      if(err){
//          console.log('createIndex:'+ err);
//      }
//      //console.log(result);
//});


//创建数据表
//db.createCollection(dbName,function(err,result){
//      if(err){
//          console.log('createCollection:'+ err);
//      }
//      //console.log(result);
//});


//删除数据表
//db.dropCollection(dbName,function(err,result){
//      if(err){
//          console.log('dropCollection:'+ err);
//      }
//      //console.log(result);
//});


//发送http请求
//sendHttpRequest();
//function sendHttpRequest () {
//	var options = {  
//	    hostname: '127.0.0.1',  
//	    port: 8001,  
//	    path: '/nodejs/userList',  
//	    method: 'GET'  
//	};
//	
//	var dataJson = { 
//		action: 'findData',
//	    searchJson: '{"name":"yuxian"}' 
//	}
//	
//	httpRequest(options, dataJson, function(data){
//		//console.log("httpRequest");
//		console.log(data);
//	});
//}





//gm裁剪图片
//myGM.cropImg("../public/uploadFile/test.png","../public/uploadFile/test2.png",100, 100, 0, 0,function (err) {
//	if(err){
//		console.log(err);
//	}
//});






router.get('/', function(req, res, next) {
	
	var dbName = req.baseUrl.split("/")[2];
	
	//返回错误
    function returnErr (value) {
    	console.log(value);
		res.send(value);
    }
    
    
    //分配方法
	console.log(req.query);
	var action = req.query.action;
	switch (action){
		case "findData":
		      findData();
			  break;
	    case "findDataLookup":
		      findDataLookup();
			  break;
        default:
              returnErr("action错误");
	}
	
    


	//查找关联数据 
	function findDataLookup () {
		if(req.query.fromJson){
			try{
			  var fromJson = JSON.parse(req.query.fromJson);
			  if(!fromJson.dbName || !fromJson.pk || !fromJson.fk || !fromJson.as){
                 returnErr("fromJson错误");
				 return;
              }
			}catch(e){
				returnErr("fromJson错误");
				return;
			}
		}else{
			var whereJson = {};
		}

		if(req.query.searchJson){
			try{
			  var whereJson = JSON.parse(req.query.searchJson);
			}catch(e){
				returnErr("searchJson错误");
				return;
			}
		}else{
			var whereJson = {};
		}
		
		if(req.query.sortJson){
			try{
			  var sortJson = JSON.parse(req.query.sortJson);
			}catch(e){
				returnErr("sortJson错误");
				return;
			}
		}else{
			var sortJson = {};
		}
		
		if(req.query.fieldJson){
			try{
			  var fieldJson = JSON.parse(req.query.fieldJson);
			}catch(e){
				returnErr("fieldJson错误");
				return;
			}
		}else{
			var fieldJson = {};
		}
        
		
		var prePageNum = req.query.prePageNum ? Number(req.query.prePageNum) : 0;
		var currPage = req.query.currPage ? Number(req.query.currPage) : 0;
		var args = {"prePageNum":prePageNum, "currPage":currPage, "sort":sortJson};
		db.findDataLookup(dbName, fromJson, whereJson, fieldJson, args, function(err, result, count){
		        if(err){
		            returnErr('findDataError:'+ err);
				    return;
		        }
		       //console.log(result);
		       console.log("查询了" + result.length +"条数据，" + "共" + count +"条数据");
		       var jsonObj = {"code": 0, "msg" : "", "count" : count, "prePageNum": prePageNum, "currPage": currPage, "rows": result};
		       res.send(jsonObj);
		});
	}





	//查询数据 
	function findData () {
		if(req.query.searchJson){
			try{
			  var whereJson = JSON.parse(req.query.searchJson);
			}catch(e){
				returnErr("searchJson错误");
				return;
			}
		}else{
			var whereJson = {};
		}
		
		if(req.query.sortJson){
			try{
			  var sortJson = JSON.parse(req.query.sortJson);
			}catch(e){
				returnErr("sortJson错误");
				return;
			}
		}else{
			var sortJson = {};
		}
		
		if(req.query.fieldJson){
			try{
			  var fieldJson = JSON.parse(req.query.fieldJson);
			}catch(e){
				returnErr("fieldJson错误");
				return;
			}
		}else{
			var fieldJson = {};
		}
		
		var prePageNum = req.query.prePageNum ? Number(req.query.prePageNum) : 0;
		var currPage = req.query.currPage ? Number(req.query.currPage) : 0;
		var args = {"prePageNum":prePageNum, "currPage":currPage, "sort":sortJson};
		db.findData(dbName, whereJson, fieldJson, args, function(err, result, count){
		        if(err){
		            returnErr('findDataError:'+ err);
				    return;
		        }
		       //console.log(result);
		       console.log("查询了" + result.length +"条数据，" + "共" + count +"条数据");
		       var jsonObj = {"code": 0, "msg" : "", "count" : count, "prePageNum": prePageNum, "currPage": currPage, "rows": result};
		       res.send(jsonObj);
		});
	}
	
	
	
});

	
	
router.post('/', function(req, res, next) {
	
	var dbName = req.baseUrl.split("/")[2];
	
	
	//返回错误
    function returnErr (value) {
    	console.log(value);
		res.send(value);
    }
    
    
    //分配方法
	console.log(req.body);
	var action = req.body.action;
	switch (action){
	    case "insertData":
		      insertData();
			  break;
		case "updateData":
		      updateData();
			  break;
		case "delData":
		      delData();
			  break;
		case "addCol":
		      addCol();
			  break;
		case "updateCol":
		      updateCol();
			  break;
		case "delCol":
		      delCol();
			  break;
		case "sendMail":
		      sendMailFn();
			  break;
        default:
              returnErr("action错误");
              
           
	}
	
    
    

	
	//插入数据 
	function insertData () {
		if(req.body.dataArr){
			try{
			    var dataArr = JSON.parse(req.body.dataArr);
			    if(Array.isArray(dataArr) && dataArr.length > 0){
					//continue
				}else{
					returnErr("dataArr错误");
					return;
				}
			}catch(e){
				returnErr("dataArr错误");
				return;
			}
		}else{
			returnErr("dataArr错误");
			return;
		}
		var idArr = [];
		for(let i=0; i<dataArr.length; i++){
			dataArr[i].create_name = req.cookies["logining_node"].username;
            dataArr[i].create_time = moment().format("YYYY-MM-DD HH:mm:ss");
            idArr.push(dataArr[i].id);
		}
		var whereJson = {"id":{"$in":idArr}};
		var fieldJson = {"id": 1};
		var args = "";
		db.findData(dbName, whereJson, fieldJson, args, function(err, result, count){
		        if(err){
		            returnErr('findDataError:'+ err);
				    return;
		        }
		       //console.log(result);
		       if(result.length > 0){
		       	 res.send("ID已存在");
				 return;
		       }
		       db.insertData(dbName,dataArr,function(err2,result2){
			        if(err2){
			            returnErr('insertDataError:'+ err2);
					    return;
			        }
			        console.log("插入了" + result2.result.n +"条数据");
			        if(result2.result.n > 0){
			        	res.send("操作成功");
			        }else{
			        	res.send("操作失败");
			        }
			        
			   });
		});

	}
	
	
	//修改数据 
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
		
		updateData.update_name = req.cookies["logining_node"].username;
        updateData.update_time = moment().format("YYYY-MM-DD HH:mm:ss");
		var updateJson = {$set: updateData};
		db.updateData(dbName, whereJson, updateJson, function(err,result){
		        if(err){
		            returnErr('updateDataError:'+ err);
				    return;
		        }
		        console.log("修改了" + result.result.n +"条数据");
		        if(result.result.n > 0){
		        	res.send("操作成功");
		        }else{
		        	res.send("操作失败");
		        }
		});
	}
  

    //删除数据 
	function delData () {
		if(req.body.dataJson){
			try{
			  var whereJson = JSON.parse(req.body.dataJson);
			}catch(e){
				returnErr("delJson错误");
				return;
			}
		}else{
			returnErr("delJson错误");
			return;
		}
		db.deleteData(dbName, whereJson, function(err,result){
		        if(err){
		            returnErr('deleteDataError:'+ err);
				    return;
		        }
		        console.log("删除了" + result.result.n +"条数据");
		        if(result.result.n > 0){
		        	res.send("操作成功");
		        }else{
		        	res.send("操作失败");
		        }
		});
	}
	
	
	//插入列
	function addCol () {
		if(req.body.dataJson){
			try{
			  var dataJson = JSON.parse(req.body.dataJson);
			}catch(e){
				returnErr("dataJson错误");
				return;
			}
		}else{
			returnErr("dataJson错误");
			return;
		}
		var whereJson = {};
		var updateJson = {$set: dataJson};
		db.updateCol(dbName, whereJson, updateJson, function(err,result){
		        if(err){
		            returnErr('updateCol:'+ err);
				    return;
		        }
		        var arr =[];
		        for(var key in dataJson){
		        	arr.push("插入列" + key );
		        }
		        console.log(arr.join(",") +"共" + result.result.n +"条数据");
		        if(result.result.n > 0){
		        	res.send("操作成功");
		        }else{
		        	res.send("操作失败");
		        }
		});
	}
	
	
	
	
	//修改列
	function updateCol () {
		if(req.body.dataJson){
			try{
			  var dataJson = JSON.parse(req.body.dataJson);
			}catch(e){
				returnErr("dataJson错误");
				return;
			}
		}else{
			returnErr("dataJson错误");
			return;
		}
		var whereJson = {};
		var updateJson = {$rename: dataJson};
		db.updateCol(dbName, whereJson, updateJson, function(err,result){
		        if(err){
		            returnErr('updateCol:'+ err);
				    return;
		        }
		        var arr =[];
		        for(var key in dataJson){
		        	arr.push("修改列名" + key + "为"+ dataJson[key]);
		        }
		        console.log(arr.join(",") +"共" + result.result.n +"条数据");
		        if(result.result.n > 0){
		        	res.send("操作成功");
		        }else{
		        	res.send("操作失败");
		        }
		});
	}
	
	
	
	//删除列
	function delCol () {
		if(req.body.dataJson){
			try{
			  var dataJson = JSON.parse(req.body.dataJson);
			}catch(e){
				returnErr("dataJson错误");
				return;
			}
		}else{
			returnErr("dataJson错误");
			return;
		}
		var whereJson = {};
		var updateJson = {$unset: dataJson};
			db.updateCol(dbName, whereJson, updateJson, function(err,result){
		        if(err){
		            returnErr('updateCol:'+ err);
				    return;
		        }
		        var arr =[];
		        for(var key in dataJson){
		        	arr.push("删除列" + key );
		        }
		        console.log(arr.join(",") +"共" + result.result.n +"条数据");
		        if(result.result.n > 0){
		        	res.send("操作成功");
		        }else{
		        	res.send("操作失败");
		        }
		});
	}
	
	
	
	//发送邮件
	function sendMailFn () {
		if(req.body.dataJson){
			try{
			  var dataJson = JSON.parse(req.body.dataJson);
			}catch(e){
				returnErr("dataJson错误");
				return;
			}
		}else{
			returnErr("dataJson错误");
			return;
		}
		
		sendMail(dataJson,function(err, info){ 
		  if(err){
		  	returnErr('sendMail Error:'+ err);
			return;
		  }
		  console.log("发送邮件成功");
		  res.send("发送邮件成功");
		});
		
	}
	
	
	
	
	
	
	
});

	



module.exports = router;


