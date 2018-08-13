const express = require('express');
const router = express.Router();
const db = require("../my_modules/db.js");
const moment = require('moment');

// http://localhost:3000/nodejs/httpTest?action=findData&searchJson={"name":"mick"}&fieldJson={"name":1}&prePageNum=10&currPage=1&sortJson={"key":1}  //查询数据
// http://localhost:3000/nodejs/httpTest?action=insertData&dataArr=[{"name":"mick","age":18},{"name":"tina","age":35}]  //插入数据 
// http://localhost:3000/nodejs/httpTest?action=updateData&searchJson={"name":"mick"}&updateJson={"age":20}  //修改数据 
// http://localhost:3000/nodejs/httpTest?action=delData&dataJson={"name":{"$in":["mick","tina"]}}  //删除数据 



router.get('/', function(req, res, next) {
	
    var dbName = req.baseUrl.split("/")[2];
	var username = req.cookies["logining"].username;
	var hash = req.cookies["logining"].hash;
	
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

	
	
router.post('/', function(req, res, next) {
	
	var dbName = req.baseUrl.split("/")[2];
	var username = req.cookies["logining"].username;
	var hash = req.cookies["logining"].hash;
	
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
				case "updateData":
				      updateData();
					  break;
				case "delData":
				      delData();
					  break;
		        default:
		              returnErr("action错误");
			}
    });
	
	
	
	
	
	
	
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
			dataArr[i].id = dataArr[i].id;
			dataArr[i].create_name = req.cookies["logining"].username;
            dataArr[i].create_time = moment().format("YYYY-MM-DD HH:mm:ss");
            if(dataArr[i].id.toString().length != 6){
            	res.send("ID长度必须为6");
            	return;
            }
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
			        
			        //操作记录
			        var content = "dataArr=" + JSON.stringify(dataArr).replace(/"/g,"'");
			        var recordJson = {"username":username, "dbName":dbName, "action": "增加", "content": content, "os": req.cookies["logining"].os, "px": req.cookies["logining"].px, "ip": req.ip, "time": moment().format("YYYY-MM-DD HH:mm:ss")};
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
		
		updateData.update_name = req.cookies["logining"].username;
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
		        
		        //操作记录
		        var content = "searchJson=" + JSON.stringify(whereJson).replace(/"/g,"'") + "updateJson=" + JSON.stringify(updateJson).replace(/"/g,"'");
		        var recordJson = {"username":username, "dbName":dbName, "action": "修改", "content": content, "os": req.cookies["logining"].os, "px": req.cookies["logining"].px, "ip": req.ip, "time": moment().format("YYYY-MM-DD HH:mm:ss")};
		        db.setRecord(recordJson, function(recordErr,recordResult){
			        if(recordErr){
			            returnErr('setRecordError:'+ recordErr);
					    return;
			        }
			        console.log("操作记录成功"+content);
			    });
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
		        
		        //操作记录
		        var content = "dataJson=" + JSON.stringify(whereJson).replace(/"/g,"'");
		        var recordJson = {"username":username, "dbName":dbName, "action": "删除", "content": content, "os": req.cookies["logining"].os, "px": req.cookies["logining"].px, "ip": req.ip, "time": moment().format("YYYY-MM-DD HH:mm:ss")};
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


