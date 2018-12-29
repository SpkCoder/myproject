const express = require('express');
const router = express.Router();
const db = require("../my_modules/db.js");
const fs = require("fs");
const folder = require("../my_modules/folder");
const path = require('path');
const moment = require('moment');
const multer  = require('multer');
const upload = multer({ dest: '../public/uploadFile/',limits: { fileSize: 100*1024*1024, files:10 }});



// http://localhost:3000/nodejs/fileList?action=findData&searchJson={"class_name":"图库"}&fieldJson={"name":1}&prePageNum=10&currPage=1&sortJson={"key":1}  //查询文件
// http://localhost:3000/nodejs/fileList?action=insertData&dataJson={"class_name":"图库"}&fileArr=[file,file]  //上传文件 
// http://localhost:3000/nodejs/fileList?action=delData&dataJson={"url":{"$in":[url,url]}}  //删除文件


router.get('/', function(req, res, next) {
	
	var dbName = req.baseUrl.split("/")[2];
	var username = req.cookies["logining_node"].username;
	var hash = req.cookies["logining_node"].hash;
	
	//返回错误
    function returnErr (value) {
    	console.log(value);
		res.send(value);
    }
    
    //判断权限
	console.log(req.query);
	var action = req.query.action;
    db.getPower(username, hash, dbName, action, function(err, power){
	        if(err){
	            returnErr('getPowerError:'+ err);
			    return;
	        }
	        if(power == 0){
	        	res.send("没有权限");
	        	return;
	        }
	        
	        //分配方法
			switch (action){
				case "findData":
				      findData();
					  break;
		        default:
		              returnErr("action错误");
			}
    });
    
	
    
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
		        //获取表头数据
		        db.getHead({"name": dbName},function(err2, headArr){
				        if(err2){
				            returnErr(db.getHead+ err2);
						    return;
				        }
				       //console.log(headArr[0]);
				       if(headArr.length > 0){
				         var jsonObj = {"code": 0, "msg" : "", "count" : count, "prePageNum": prePageNum, "currPage": currPage, "name_ch": headArr[0].name_ch, "name": headArr[0].name, "field_ch": headArr[0].field_ch, "field_en": headArr[0].field_en, "data_type": headArr[0].data_type, "field_width": headArr[0].field_width, "rows": result};
				       }else{
				         var jsonObj = {"code": 0, "msg" : "", "count" : count, "prePageNum": prePageNum, "currPage": currPage, "name_ch": "", "name": "", "field_ch": "", "field_en": "", "data_type": "", "field_width": "", "rows": result};
				       }
				       //console.log(jsonObj);
				       res.send(jsonObj);
				});
		});
	}
	
});
	



router.post('/', upload.array('file'), function(req, res, next) {
	
	var dbName = req.baseUrl.split("/")[2];
	var username = req.cookies["logining_node"].username;
	var hash = req.cookies["logining_node"].hash;
	
	//返回错误
    function returnErr (value) {
    	console.log(value);
		res.send(value);
    }
    
    //判断权限
	console.log(req.body);
	var action = req.body.action;
	db.getPower(username, hash, dbName, action, function(err, power){
	        if(err){
	            returnErr('getPowerError:'+ err);
			    return;
	        }
	        if(power == 0){
	        	res.send("没有权限");
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
		              returnErr("action错误");
			}
    });
    
	

	
	
	//上传文件
	function insertData () {
		if(req.body.dataJson){
			try{
			    var dataJson = JSON.parse(req.body.dataJson);
			    dataJson = {"class_name": dataJson.class_name};
			}catch(e){
				returnErr("dataJson错误");
				return;
			}
		}else{
			returnErr("dataJson错误");
			return;
		}
		if(req.files.length == 0){
			returnErr("上传文件不能为空");
			return;
		}
		if(!dataJson.class_name){
			returnErr("分类不能为空");
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
                dataJson.create_name = req.cookies["logining_node"].username;
                dataJson.create_time = moment().format("YYYY-MM-DD HH:mm:ss");
				var obj = JSON.parse(JSON.stringify(dataJson));
			    dataArr.push(obj);

		}
		console.log(dataArr);
        db.insertData(dbName,dataArr,function(err,result){
	        if(err){
	            for(let i=0; i<newpathArr.length; i++){
	               fs.unlink(newpathArr[i],function(err2){
	                 if(err2){console.log('unlinkError:'+ err2)}
	               });
	            }
		        returnErr('insertDataError:'+ err);
			    return;
	        }
	        console.log("上传了" + result.result.n +"个文件");
            if(result.result.n > 0){
	        	res.send("上传成功");
	        }else{
	        	res.send("上传失败");
	        }
            
            //删除缓存文件夹
//          folder.rmdirSync("../uploadFile",function(e){
//          	if(e){
//          	  console.log("folder.rmdirSync"+e);
//          	}
//			});
			
			//创建文件夹
//          folder.mkdirSync("../uploadFile2",function(e){
//          	if(e){
//          	  console.log("folder.rmdirSync"+e);
//          	}
//			});

            //操作记录
	        var content = "dataArr=" + JSON.stringify(dataArr).replace(/"/g,"'");
	        var recordJson = {"username":username, "dbName":dbName, "action": "上传文件", "content": content, "os": req.cookies["logining_node"].os, "px": req.cookies["logining_node"].px, "ip": req.ip, "time": moment().format("YYYY-MM-DD HH:mm:ss")};
	        db.setRecord(recordJson, function(recordErr,recordResult){
		        if(recordErr){
		            returnErr('setRecordError:'+ recordErr);
				    return;
		        }
		        console.log("操作记录成功"+content);
		    });

            
		});
		
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
					returnErr("dataJson错误");
					return;
			  }
			}catch(e){
				returnErr("delJson错误");
				return;
			}
		}else{
			returnErr("delJson错误");
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
		        	res.send("操作成功");
		        }else{
		        	res.send("操作失败");
		        }
		        
		        //操作记录
		        var content = "dataJson=" + JSON.stringify(whereJson).replace(/"/g,"'");
		        var recordJson = {"username":username, "dbName":dbName, "action": "删除文件", "content": content, "os": req.cookies["logining_node"].os, "px": req.cookies["logining_node"].px, "ip": req.ip, "time": moment().format("YYYY-MM-DD HH:mm:ss")};
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


