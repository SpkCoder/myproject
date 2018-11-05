const express = require('express');
const router = express.Router();
const db = require("../my_modules/db.js");
const fs = require("fs");
const folder = require("../my_modules/folder");
const path = require('path');
const moment = require('moment');
const multer  = require('multer');
const upload = multer({ dest: '../public/uploadFile/',limits: { fileSize: 100*1024*1024, files:10 }});



// http://localhost:3000/nodejs/fileList?action=findData&searchJson={"class_name":"图库"}&prePageNum=10&currPage=1&sortJson={"key":1}  //查询文件
// http://localhost:3000/nodejs/fileList?action=insertData&dataJson={"class_name":"图库"}&fileArr=[file,file]  //上传文件 
// http://localhost:3000/nodejs/fileList?action=delData&dataJson={"url":{"$in":[url,url]}}  //删除文件


router.get('/', function(req, res, next) {
	
	var dbName = req.baseUrl.split("/")[2];
	var UserName = req.cookies["logining"].UserName;
	
	//返回错误
    function returnErr (value) {
    	console.log(value);
		res.send(value);
    }
    
    //判断权限
	console.log(req.query);
	var action = req.query.action;
    db.getPower(UserName, dbName, action, function(err, power){
	        if(err){
	            returnErr('getPowerError:'+ err);
			    return;
	        }
	        if(power == 0){
	        	res.send("No Permissions");
	        	return;
	        }
	        
	        //分配方法
			switch (action){
				case "findData":
				      findData();
					  break;
		        default:
		              returnErr("action Error");
			}
    });
    
		
			
    
	//查询数据 
	function findData () {
		if(req.query.searchJson){
			try{
			  var whereJson = JSON.parse(req.query.searchJson);
			}catch(e){
				returnErr("searchJson Error");
				return;
			}
		}else{
			var whereJson = {};
		}
		
		if(req.query.sortJson){
			try{
			  var sortJson = JSON.parse(req.query.sortJson);
			}catch(e){
				returnErr("sortJson Error");
				return;
			}
		}else{
			var sortJson = {};
		}
		
		if(req.query.fieldJson){
			try{
			  var fieldJson = JSON.parse(req.query.fieldJson);
			}catch(e){
				returnErr("fieldJson Error");
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
		       var jsonObj = {"code": 0, "msg" : "", "count" : count, "prePageNum": prePageNum, "currPage": currPage,  "name": dbName, "rows": result};				       	 
               res.send(jsonObj);
		       
		});
	}
	
});
	



router.post('/', upload.array('file'), function(req, res, next) {
	
	var dbName = req.baseUrl.split("/")[2];
	var UserName = req.cookies["logining"].UserName;
	
	//返回错误
    function returnErr (value) {
    	console.log(value);
		res.send(value);
    }
    
    //判断权限
	console.log(req.body);
	var action = req.body.action;
	db.getPower(UserName, dbName, action, function(err, power){
	        if(err){
	            returnErr('getPowerError:'+ err);
			    return;
	        }
	        if(power == 0){
	        	res.send("No Permissions");
	        	return;
	        }
	        //分配方法
			switch (action){
			    case "insertData":
				      insertData();
					  break;
				case "delData":
				      delData();
					  break;
		        default:
		              returnErr("action Error");
			}
    });
    
	
	
	
	//上传文件
	function insertData () {
		if(req.body.dataJson){
			try{
			    var dataJson = JSON.parse(req.body.dataJson);
			}catch(e){
				returnErr("dataJson Error");
				return;
			}
		}else{
			returnErr("dataJson Error");
			return;
		}
		if(req.files.length == 0){
			returnErr("Uploading files can not be empty");
			return;
		}
		if(!dataJson.class_name){
			returnErr("class_name can not be empty");
			return;
		}
		
		console.log(req.files);
		var newpathArr = [];
		var dataArr = [];
		for(let i=0; i<req.files.length; i++){
		   		var oldpath = req.files[i].path;
				var _url = "/public/uploadFile/" + moment().format("YYYY-MM-DD-HH-mm-ss-SS") + "___" + req.files[i].originalname;
			    var newpath = path.join(path.dirname(__dirname), _url);
			    console.log(newpath);
                try{
                  fs.renameSync(oldpath, newpath);
                }catch(err){
					returnErr('renameSync:'+ err);
					return;
				}
                newpathArr.push(newpath);
                dataJson.name = req.files[i].originalname;
                dataJson.size = req.files[i].size;
                dataJson.url = _url;
                dataJson.create_name = req.cookies["logining"].UserName;
                dataJson.create_time = moment().format("YYYY-MM-DD HH:mm:ss");
				var obj = JSON.parse(JSON.stringify(dataJson));
			    dataArr.push(obj);

		}
		console.log(dataArr);
		
		function deleteDataFilelist () {
		    return new Promise(function(resolve, reject){
			    var whereJson = {"class_name": dataArr[0].class_name, "file_id": dataArr[0].file_id};
				var fieldJson = {"class_name": 1, "file_id":1, "url":1};
				var args = "";
				db.findData(dbName, whereJson, fieldJson, args, function(err, result, count){
				        if(err){
				            returnErr('findDataError:'+ err);
				            reject("Error");
						    return;
				        }
				       //console.log(result);
				       
				       if(result.length > 0){
				       	    var this_url = result[0].url;
				       	    db.deleteData(dbName, whereJson, function(err2,result2){
							        if(err2){
							            returnErr('deleteDataError:'+ err2);
							            reject("Error");
									    return;
							        }
							        var urlpath = path.join(path.dirname(__dirname), this_url);
					                fs.unlink(urlpath,function(err3){
					                  if(err3){console.log('unlinkError:'+ err3)}
					                });
							        console.log("删除了" + result2.result.n +"个文件");
							        if(result2.result.n > 0){
							        	resolve("Success");
							        }else{
							        	res.send("Picture deletion failure");
							        	reject("Error");
							        }
							        
							});
				       }else{
				       	 resolve("true");
				       }
				       
				});   
		        
		    });
		}
		
		
		function insertDataFilelist (data) {
		    return new Promise(function(resolve, reject){   
		        db.insertData(dbName,dataArr,function(err,result){
			        if(err){
			            for(let i=0; i<newpathArr.length; i++){
			               fs.unlink(newpathArr[i],function(err2){
			                 if(err2){console.log('unlinkError:'+ err2)}
			               });
			            }
				        returnErr('insertDataError:'+ err);
				        reject("Error");
					    return;
			        }
			        console.log("上传了" + result.result.n +"个文件");
		            if(result.result.n > 0){
			        	resolve("Success");
			        }else{
			        	res.send("Insert data failure");
			        	reject("Error");
			        }
		            
		            
				});
		    });
		}
		
		
		function updataDataProductlist (data) {
		    return new Promise(function(resolve, reject){   
		        var whereJson = {"id": dataArr[0].file_id};
				var updateJson = {$set: {"image_url": dataArr[0].url}};
				db.updateDataMany("productList", whereJson, updateJson, function(err,result){
				        if(err){
				            returnErr('updateDataError:'+ err);
				            reject("Error");
						    return;
				        }
				        console.log("修改了" + result.result.n +"条数据");
				        if(result.result.n > 0){
				        	res.send("Success");
			        	    resolve("Success");
				        }else{
				        	res.send("Updata data failure");
			        	    reject("Error");
				        }
				        
				});
				
				//操作记录
		        var content = "dataArr=" + JSON.stringify(dataArr).replace(/"/g,"'");
		        var recordJson = {"UserName":UserName, "dbName":dbName, "action": "insert", "content": content, "os": req.cookies["logining"].os, "px": req.cookies["logining"].px, "ip": req.ip, "time": moment().format("YYYY-MM-DD HH:mm:ss")};
		        db.setRecord(recordJson, function(recordErr,recordResult){
			        if(recordErr){
			            returnErr('setRecordError:'+ recordErr);
					    return;
			        }
			        console.log("操作记录成功"+content);
			    });
		            
		    });
		}
		
		
		
		deleteDataFilelist()
	   .then(insertDataFilelist)
	   .then(updataDataProductlist)
	   .catch(function(data){
	       console.log(data);
	   })
	   
	   
        
		
	}
	
	
	
  

    //删除文件 
	function delData () {
		if(req.body.dataJson){
			try{
			  var whereJson = JSON.parse(req.body.dataJson);
			  var urlArr = whereJson["url"]["$in"];
			  if(Array.isArray(urlArr) && urlArr.length > 0){
					//continue
			  }else{
					returnErr("dataJson Error");
					return;
			  }
			}catch(e){
				returnErr("delJson Error");
				return;
			}
		}else{
			returnErr("delJson Error");
			return;
		}
		console.log(whereJson);
		db.deleteData(dbName, whereJson, function(err,result){
		        if(err){
		            returnErr('deleteDataError:'+ err);
				    return;
		        }
		        for(let i=0; i<urlArr.length; i++){
		           var urlpath = path.join(path.dirname(__dirname), urlArr[i]);
	               fs.unlink(urlpath,function(err2){
	                 if(err2){console.log('unlinkError:'+ err2)}
	               });
	            }
		        console.log("删除了" + result.result.n +"个文件");
		        if(result.result.n > 0){
		        	res.send("Success");
		        }else{
		        	res.send("Error");
		        }
		        
		        //操作记录
		        var content = "dataJson=" + JSON.stringify(whereJson).replace(/"/g,"'");
		        var recordJson = {"UserName":UserName, "dbName":dbName, "action": "delete", "content": content, "os": req.cookies["logining"].os, "px": req.cookies["logining"].px, "ip": req.ip, "time": moment().format("YYYY-MM-DD HH:mm:ss")};
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


