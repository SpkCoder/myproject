const express = require('express');
const router = express.Router();
const db = require("../my_modules/db.js");
const fs = require("fs");
const path = require('path');
const moment = require('moment');
const myServer = require("../bin/myServer.js");

// http://localhost:3000/nodejs/httpTest?action=findData&searchJson={"name":"mick"}&fieldJson={"name":1}&prePageNum=10&currPage=1&sortJson={"key":1}  //查询数据
// http://localhost:3000/nodejs/httpTest?action=insertData&dataArr=[{"name":"mick","age":18},{"name":"tina","age":35}]  //插入数据 
// http://localhost:3000/nodejs/httpTest?action=updateData&searchJson={"name":"mick"}&updateJson={"age":20}  //修改数据 
// http://localhost:3000/nodejs/httpTest?action=delData&dataJson={"name":{"$in":["mick","tina"]}}  //删除数据 



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
	var action2 = action;
	if(action == "findDataAll"){action2 = "findData"}
    db.getPower(username, hash, dbName, action2, function(err, power){
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
			    case "findDataAll":
				      findDataAll();
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
		
		var sortJson = {"id": 1,"field_sort": 1};
		
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
	
	
	//查询处理过的数据 
	function findDataAll () {
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
		
		var sortJson = {"id": 1,"field_sort": 1};
		
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
		       db.getHead(whereJson,function(err2, headArr){
				        if(err2){
				            returnErr(db.getHead+ err2);
						    return;
				        }
					    var name = "dataList";
					    var name_ch = "数据列表";
					    var field_ch ="模块ID;数据表名称;数据表中文名;中文字段集合;英文字段集合;字段数据类型集合;字段列宽集合;字段排序集合";
			            var field_en = "id;name;name_ch;field_ch;field_en;data_type;field_width;field_sort";
			            var data_type = "int(6);text;text;text;text;int;int";
			            var field_width = "100;100;150;200;200;200;200;200";
					    var jsonObj = {"code": 0, "msg" : "", "count" : headArr.length, "prePageNum": prePageNum, "currPage": currPage, "name_ch": name_ch, "name": name, "field_ch": field_ch, "field_en": field_en, "data_type": data_type, "field_width": field_width, "rows": headArr};
					    res.send(jsonObj);
			   });
	       

		});
	}
	
	
});



	
router.post('/', function(req, res, next) {
	
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
    
	
    
    
    //复制前后端代码文件
    function copyFileFn (this_dbName) {
        var file_src_html = path.join(path.dirname(__dirname),"/public/page/pageDemo.html");
        var file_dest_html = path.join(path.dirname(__dirname),"/public/page/"+this_dbName+".html");
        var file_src_js = path.join(path.dirname(__dirname),"/routes/pageDemo.js");
        var file_dest_js = path.join(path.dirname(__dirname),"/routes/"+this_dbName+".js");
        
        //复制HTML文件
        function copyHTML () {
        	return new Promise(function (resole, reject) {
        		try{
				  fs.createReadStream(file_src_html).pipe(fs.createWriteStream(file_dest_html));
				  //console.log("复制文件"+this_dbName+".html" +"成功");
				  resole("复制文件"+this_dbName+".html" +"成功");
        		}catch(e){
					reject("复制文件"+this_dbName+".html" +"失败");
					return;
					
				}
        	});
        }
        
        
        //复制JS文件
        function copyJS () {
        	return new Promise(function (resole, reject) {
        		try{
				  fs.createReadStream(file_src_js).pipe(fs.createWriteStream(file_dest_js));
				  //console.log("复制文件"+this_dbName+".html" +"成功");
				  resole("复制文件"+this_dbName+".js" +"成功");
        		}catch(e){
					reject("复制文件"+this_dbName+".js" +"失败");
					return;
					
				}
        	});
        }
        
        
         //给routerUrl.js添加routerUrl
        function addRouterUrl () {
        	return new Promise(function (resole, reject) {
        		var file_routerUrl = path.join(path.dirname(__dirname),"/public/js/router/"+"routerUrl.js");
			    fs.readFile(file_routerUrl, {encoding:'utf-8'}, function(readFile_err,readFile_data){
				    if(readFile_err){
				    	reject("读取routerUrl.js失败");
				        return;
				    };
				    var routerUrl = JSON.parse(readFile_data.split(" = ")[1]);
				    var thisRouterUrl = "/page/"+ this_dbName;
				    routerUrl.push(thisRouterUrl);
				    var routerUrlStr = "var routerUrl = "+JSON.stringify(routerUrl);
				    console.log(routerUrlStr);
				    fs.writeFile(file_routerUrl, routerUrlStr, {encoding:'utf-8'}, function(writeFile_err){
					    if(writeFile_err){
					    	reject("写入routerUrl.js失败");
					        return;
					    };
					    console.log("给routerUrl.js添加" + thisRouterUrl + "成功");
					    resole("写入routerUrl.js成功");
					});
				});
        	});
        }
        
        
        //给urlSettings.js添加routerUrl
        function addSettingsUrl () {
        	return new Promise(function (resole, reject) {
        		var file_settings = path.join(path.dirname(__dirname),"/my_modules/"+"urlSettings.js");
			    fs.readFile(file_settings, {encoding:'utf-8'}, function(readFile_err,readFile_data){
				    if(readFile_err){
				    	reject("读取urlSettings.js失败");
				        return;
				    };
				    var settingsObj = JSON.parse(readFile_data.split(" = ")[1]);
				    var routerUrl = {"reqUrl": "/nodejs/"+this_dbName, "resUrl": "./routes/"+this_dbName};
				    settingsObj.routerUrls.push(routerUrl);
				    var settingsStr = "module.exports = "+JSON.stringify(settingsObj);
				    console.log(settingsStr);
				    fs.writeFile(file_settings, settingsStr, {encoding:'utf-8'}, function(writeFile_err){
					    if(writeFile_err){
					    	reject("写入urlSettings.js失败");
					        return;
					    };
					    console.log("给urlSettings.js添加" + JSON.stringify(routerUrl) + "成功");
					    resole("写入urlSettings.js成功");
					});
				});
        	});
        }
        
        

       
       Promise
		.all([copyHTML(), copyJS(), addRouterUrl(), addSettingsUrl()])
		.then(function(result){
		    console.log(result);
		    
		    //重启server
		    myServer.restart();
		}).catch(function(data){
		    console.log(data);
		});
       
        
    }
    
    
    //删除前后端代码文件
    function removeFileFn (this_dbName) {
        var file_dest_html = path.join(path.dirname(__dirname),"/public/page/"+this_dbName+".html");
        var file_dest_js = path.join(path.dirname(__dirname),"/routes/"+this_dbName+".js");
        
        //删除HTML文件
        function delHTML () {
        	return new Promise(function (resole, reject) {
        		fs.unlink(file_dest_html,function (remove_err) {
				    if(remove_err){
			           reject("删除文件"+this_dbName+".html" +"失败");
			           return;
			        }
				    resole("删除文件"+this_dbName+".html" +"成功");
				});
        	});
        }
        
        //删除JS文件
        function delJS () {
        	return new Promise(function (resole, reject) {
        		fs.unlink(file_dest_js,function (remove_err) {
				    if(remove_err){
			           reject("删除文件"+this_dbName+".js" +"失败");
			           return;
			        }
				    resole("删除文件"+this_dbName+".js" +"成功");
				});
        	});
        }
        
        
        //给routerUrl.js删除routerUrl
        function delRouterUrl () {
        	return new Promise(function (resole, reject) {
        		var file_routerUrl = path.join(path.dirname(__dirname),"/public/js/router/"+"routerUrl.js");
			    fs.readFile(file_routerUrl, {encoding:'utf-8'}, function(readFile_err,readFile_data){
				    if(readFile_err){
				    	reject("读取routerUrl.js失败");
				        return;
				    };
				    var routerUrl = JSON.parse(readFile_data.split(" = ")[1]);
				    var thisRouterUrl = "/page/"+this_dbName;
				    var routerUrl2 = [];
				    routerUrl.forEach(function (item,index) {
				    	if(item != thisRouterUrl){
				    		routerUrl2.push(item);
				    	}
				    });
				    var routerUrlStr = "var routerUrl = "+JSON.stringify(routerUrl2);
				    console.log(routerUrlStr);
				    fs.writeFile(file_routerUrl, routerUrlStr, {encoding:'utf-8'}, function(writeFile_err){
					    if(writeFile_err){
					    	reject("写入routerUrl.js失败");
					        return;
					    };
					    console.log("给routerUrl.js删除" + thisRouterUrl + "成功");
					    resole("给routerUrl.js删除" + thisRouterUrl + "成功");
					});
				});
        	});
        }
        
        //给urlSettings.js删除routerUrl
        function delSettingsUrl () {
        	return new Promise(function (resole, reject) {
        		var file_settings = path.join(path.dirname(__dirname),"/my_modules/"+"urlSettings.js");
			    fs.readFile(file_settings, {encoding:'utf-8'}, function(readFile_err,readFile_data){
				    if(readFile_err){
				    	reject("读取urlSettings.js失败");
				        return;
				    };
				    var settingsObj = JSON.parse(readFile_data.split(" = ")[1]);
				    var routerUrl = {"reqUrl": "/nodejs/"+this_dbName, "resUrl": "./routes/"+this_dbName};
				    var routerUrlArr = [];
				    settingsObj.routerUrls.forEach(function (item,index) {
				    	if(item.reqUrl != routerUrl.reqUrl){
				    		routerUrlArr.push(item);
				    	}
				    });
				    settingsObj.routerUrls = routerUrlArr;
				    var settingsStr = "module.exports = "+JSON.stringify(settingsObj);
				    console.log(settingsStr);
				    fs.writeFile(file_settings, settingsStr, {encoding:'utf-8'}, function(writeFile_err){
					    if(writeFile_err){
					    	reject("写入urlSettings.js失败");
					        return;
					    };
					    console.log("给urlSettings.js删除" + JSON.stringify(routerUrl) + "成功");
					    resole("给urlSettings.js删除" + JSON.stringify(routerUrl) + "成功");
					});
				});
        	});
        }
        

       
        Promise
		.all([delHTML(), delJS(), delRouterUrl(), delSettingsUrl()])
		.then(function(result){
		    console.log(result);
		    
		    //重启server
		    myServer.restart();
		}).catch(function(data){
		    console.log(data);
		});

        
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
		if(dataArr.length > 1){
			res.send("不支持批量插入");
            return;
		};
		var field_enArr = [];
		for(let i=0; i<dataArr.length; i++){
			if(dataArr[0].field_en == "id"){
				dataArr[0].data_type = "int";
				dataArr[0].field_width = "100";
				dataArr[0].field_sort = 1;
			}
			dataArr[i].create_name = req.cookies["logining_node"].username;
            dataArr[i].create_time = moment().format("YYYY-MM-DD HH:mm:ss");
            if(dataArr[i].id.toString().length != 6){
            	res.send("ID长度必须为6");
            	return;
            }
            if(! /^[A-Za-z]+$/.test(dataArr[i].name)){
            	res.send("数据表名必须为字母组成");
            	return;
            }
            if(dataArr[i].name == "pageDemo"){
            	res.send("该数据表名已被占用");
            	return;
            }
            if(! dataArr[i].field_ch){
            	res.send("中文字段不能为空");
            	return;
            }
            if(! /^\w+$/.test(dataArr[i].field_en)){
            	res.send("英文字段必须为字母\数字\下划线");
            	return;
            }
            if(! dataArr[i].data_type){
            	res.send("字段数据类型不能为空");
            	return;
            }
            if(! /^[1-9][0-9]*$/.test(dataArr[i].field_width)){
            	res.send("字段列宽必须为正整数");
            	return;
            }
            if(! /^[1-9][0-9]*$/.test(dataArr[i].field_sort)){
            	res.send("字段排序必须为正整数");
            	return;
            }
            field_enArr.push(dataArr[i].field_en);
            
		}
		
		var whereJson = {"id":dataArr[0].id, "field_en":{"$in":field_enArr}};
		var fieldJson = {"id": 1,"field_en": 1};
		var args = "";
		db.findData(dbName, whereJson, fieldJson, args, function(err, result, count){
		        if(err){
		            returnErr('findDataError:'+ err);
				    return;
		        }
		       //console.log(result);
		       if(result.length > 0){
		       	 res.send("字段名已存在");
				 return;
		       }
		       
		       var this_dbName = dataArr[0].name;
		       if(dataArr[0].field_en == "id"){
		       	   //创建数据表
				   db.insertData(this_dbName,[{"id":""}],function(err2,result2){
				        if(err2){
				           returnErr('createCollection:'+ err2);
				           return;
				        }
				        if(result2.result.n > 0){
				        	//res.send("操作成功");
				        	insertDataFn();
				        	copyFileFn (this_dbName);
				        }else{
				        	res.send("操作失败");
				        }
				   });
		       }else{
		       	    //给数据表插入列
		       	    var this_whereJson = {};
		            var this_dataJson = {};
		            this_dataJson[dataArr[0].field_en] = "";
			        var this_updateJson = {$set: this_dataJson};
			        db.updateCol(this_dbName, this_whereJson, this_updateJson, function(err3,result3){
				        if(err3){
				            returnErr('updateCol:'+ err3);
						    return;
				        }
				        var arr =[];
				        for(var key in this_dataJson){
				        	arr.push("插入列" + key );
				        }
				        console.log(arr.join(",") +"共" + result3.result.n +"条数据");
				        if(result3.result.n > 0){
				        	//res.send("操作成功");
				        	insertDataFn();
				        }else{
				        	res.send("操作失败");
				        }
			        });
		       }
		       
		       //插入dataList数据
		       function insertDataFn () {
		        	db.insertData(dbName,dataArr,function(err4,result4){
				        if(err4){
				            returnErr('insertDataError:'+ err4);
						    return;
				        }
				        console.log("插入了" + result4.result.n +"条数据");
				        if(result4.result.n > 0){
				        	res.send("操作成功");
				        }else{
				        	res.send("操作失败");
				        }
				        
				        //操作记录
				        var content = "dataArr=" + JSON.stringify(dataArr).replace(/"/g,"'");
				        var recordJson = {"username":username, "dbName":dbName, "action": "增加", "content": content, "os": req.cookies["logining_node"].os, "px": req.cookies["logining_node"].px, "ip": req.ip, "time": moment().format("YYYY-MM-DD HH:mm:ss")};
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
		if(whereJson.id == null){
			res.send("id不能为空");
			return;
		}
		if(whereJson.name == null){
			res.send("name不能为空");
			return;
		}
		if(whereJson.field_en == null){
			res.send("field_en不能为空");
			return;
		}
		if(whereJson.field_en == "id"){
			res.send("该字段不能修改");
			return;
		}
		
		if(updateData.field_en == whereJson.field_en){
			updateDataFn();
		}else{
			//修改列
			var this_dbName = whereJson.name;
			var rename_dataJson = {};
		    rename_dataJson[whereJson.field_en] = updateData.field_en;
			var rename_updateJson = {$rename: rename_dataJson};
			db.updateCol(this_dbName, {}, rename_updateJson, function(err,result){
			        if(err){
			            returnErr('updateCol:'+ err);
					    return;
			        }
			        var arr =[];
			        for(var key in rename_dataJson){
			        	arr.push("修改列名" + key + "为"+ rename_dataJson[key]);
			        }
			        console.log(arr.join(",") +"共" + result.result.n +"条数据");
			        if(result.result.n > 0){
			        	//res.send("操作成功");
			        	updateDataFn();
			        }else{
			        	res.send("操作失败");
			        }
			});
		}
		
		function updateDataFn () {
			updateData.update_name = req.cookies["logining_node"].username;
	        updateData.update_time = moment().format("YYYY-MM-DD HH:mm:ss");
		    var updateJson = {$set: updateData};
		    db.updateData(dbName, whereJson, updateJson, function(err2,result2){
			        if(err2){
			            returnErr('updateDataError:'+ err2);
					    return;
			        }
			        console.log("修改了" + result2.result.n +"条数据");
			        if(result2.result.n > 0){
			        	res.send("操作成功");
			        }else{
			        	res.send("操作失败");
			        }
			        
			        //操作记录
			        var content = "searchJson=" + JSON.stringify(whereJson).replace(/"/g,"'") + "updateJson=" + JSON.stringify(updateJson).replace(/"/g,"'");
			        var recordJson = {"username":username, "dbName":dbName, "action": "修改", "content": content, "os": req.cookies["logining_node"].os, "px": req.cookies["logining_node"].px, "ip": req.ip, "time": moment().format("YYYY-MM-DD HH:mm:ss")};
			        db.setRecord(recordJson, function(recordErr,recordResult){
				        if(recordErr){
				            returnErr('setRecordError:'+ recordErr);
						    return;
				        }
				        console.log("操作记录成功"+content);
				    });
		    });
		}
		
		
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
		if(whereJson.name == null){
			res.send("name不能为空");
			return;
		}
		if(whereJson.field_en == "id"){
			res.send("该字段不能删除");
			return;
		}
		
		var this_dbName = whereJson.name;
		if(whereJson.field_en == null){
    		//删除数据表
			db.dropCollection(this_dbName,function(err,result){
		        if(err){
		            returnErr('db.dropCollection:'+ err);
	                return;
		        }
		        //res.send("操作成功");
		        deleteDataFn();
		        removeFileFn (this_dbName);
			});
    	}else{
		    //删除列
		    var unset_dataJson = {};
		    unset_dataJson[whereJson.field_en] = "";
		    var unset_updateJson = {$unset: unset_dataJson};
			db.updateCol(this_dbName, {}, unset_updateJson, function(err,result){
			        if(err){
			            returnErr('updateCol:'+ err);
					    return;
			        }
			        var arr =[];
			        for(var key in unset_dataJson){
			        	arr.push("删除列" + key );
			        }
			        console.log(arr.join(",") +"共" + result.result.n +"条数据");
			        if(result.result.n > 0){
			        	//res.send("操作成功");
			        	deleteDataFn();
			        }else{
			        	res.send("操作失败");
			        }
			        
			});
    	}
		
		function deleteDataFn () {
			db.deleteData(dbName, whereJson, function(err2,result2){
		        if(err2){
		            returnErr('deleteDataError:'+ err2);
				    return;
		        }
		        console.log("删除了" + result2.result.n +"条数据");
		        if(result2.result.n > 0){
		        	res.send("操作成功");
		        }else{
		        	res.send("操作失败");
		        }
		        
		        //操作记录
		        var content = "dataJson=" + JSON.stringify(whereJson).replace(/"/g,"'");
		        var recordJson = {"username":username, "dbName":dbName, "action": "删除", "content": content, "os": req.cookies["logining_node"].os, "px": req.cookies["logining_node"].px, "ip": req.ip, "time": moment().format("YYYY-MM-DD HH:mm:ss")};
		        db.setRecord(recordJson, function(recordErr,recordResult){
			        if(recordErr){
			            returnErr('setRecordError:'+ recordErr);
					    return;
			        }
			        console.log("操作记录成功"+content);
			    });
			    
		    });
		}
		
	}
	
	

	
	
	
});

	



module.exports = router;


