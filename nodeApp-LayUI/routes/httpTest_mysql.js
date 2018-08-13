const express = require('express');
const router = express.Router();
const db = require("../my_modules/db.js");
const moment = require('moment');
const mysqldb = require("../my_modules/mysqldb.js");


// http://localhost:3000/nodejs/httpTest-mysql?action=findData&whereStr=id=1 and name="xx"&fieldStr=field1,field2&prePageNum=10&currPage=1&sortStr=id ASC|DESC  //查询数据
// http://localhost:3000/nodejs/httpTest-mysql?action=findDataLookup&whereStr=id=1 and name="xx"&fieldStr=table1.id,table1.firstname,table1.email,table2.age&prePageNum=10&currPage=1&sortStr=id DESC  //查询关联数据
// http://localhost:3000/nodejs/httpTest-mysql?action=insertData&dataArr=[{"name":"mick","age":18},{"name":"tina","age":35}]  //插入数据 
// http://localhost:3000/nodejs/httpTest-mysql?action=updateData&whereStr=id=1&updateJson={"name":"xx"}  //修改数据 
// http://localhost:3000/nodejs/httpTest-mysql?action=delData&dataArr=[1,3,5]  //删除数据 
// http://localhost:3000/nodejs/httpTest-mysql?action=addCol&dataJson={"fieldName":"num","dataType":"INT"}  //插入列
// http://localhost:3000/nodejs/httpTest-mysql?action=updateCol&dataJson={"fieldName":"num","fieldNewName":"meg","dataNewType":"TEXT"}  //修改列
// http://localhost:3000/nodejs/httpTest-mysql?action=delCol&dataJson={"fieldName":"num"}  //删除列




router.get('/', function(req, res, next) {
	
	var dbName = req.baseUrl.split("/")[2];
	
	//返回错误
    function returnErr (value) {
    	console.log(value);
		res.send(value);
    }
    
    
    //分配方法
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
		//var sql_lookup = "table1 LEFT JOIN table2 ON table1.firstname = table2.firstname";  //2张表
		var sql_lookup = "(table1 LEFT JOIN table2 ON table1.firstname = table2.firstname) LEFT JOIN table3 ON table1.firstname = table3.firstname";    //3张表
		var fieldStr = req.query.fieldStr;
		var whereStr = req.query.whereStr;
		var sortStr = req.query.sortStr;
		
		var prePageNum = req.query.prePageNum ? Number(req.query.prePageNum) : 0;
		var currPage = req.query.currPage ? Number(req.query.currPage) : 0;
		var args = {"prePageNum":prePageNum, "currPage":currPage, "sort":sortStr};
		mysqldb.findDataLookup(sql_lookup, whereStr, fieldStr, args, function(err, result, count){
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
		var whereStr = req.query.whereStr;
		var fieldStr = req.query.fieldStr;
		var sortStr = req.query.sortStr;
		
		var prePageNum = req.query.prePageNum ? Number(req.query.prePageNum) : 0;
		var currPage = req.query.currPage ? Number(req.query.currPage) : 0;
		var args = {"prePageNum":prePageNum, "currPage":currPage, "sort":sortStr};
		mysqldb.findData(dbName, whereStr, fieldStr, args, function(err, result, count){
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
		for(let i=0; i<dataArr.length; i++){
			dataArr[i].create_name = req.cookies["logining"].username;
            dataArr[i].create_time = moment().format("YYYY-MM-DD HH:mm:ss");
		}
		mysqldb.insertData(dbName,dataArr,function(errArr){
	        if(errArr.length > 0){
	            res.send("操作失败:" +errArr.join(","));
	            return;
	        }
	        console.log("插入了" + dataArr.length +"条数据");
	        res.send("操作成功");
		});

	}
	
	
	
	
	//修改数据 
	function updateData () {
		if(req.body.whereStr){
			var whereStr = req.body.whereStr;
		}else{
			returnErr("whereStr错误");
			return;
		}
		if(req.body.updateJson){
			try{
			  var updateJson = JSON.parse(req.body.updateJson);
			}catch(e){
				returnErr("updateJson错误");
				return;
			}
		}else{
			returnErr("updateJson错误");
			return;
		}
		
		updateJson.update_name = req.cookies["logining"].username;
        updateJson.update_time = moment().format("YYYY-MM-DD HH:mm:ss");
		mysqldb.updateData(dbName, whereStr, updateJson, function(err,result){
		        if(err){
		            returnErr('updateDataError:'+ err);
				    return;
		        }
		        console.log("修改了" + result.changedRows +"条数据");
		        if(result.changedRows > 0){
		        	res.send("操作成功");
		        }else{
		        	res.send("操作失败");
		        }
		});
	}
  

    //删除数据 
	function delData () {
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
		mysqldb.deleteData(dbName, dataArr, function(err,result){
		        if(err){
		            returnErr('deleteDataError:'+ err);
				    return;
		        }
		        console.log("删除了" + result.affectedRows +"条数据");
		        if(result.affectedRows > 0){
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
		if(!dataJson.fieldName || !dataJson.dataType){
	      returnErr("dataJson错误");
		  return;
        }
		
		var sql = "ADD " + dataJson.fieldName +" "+ dataJson.dataType;
		mysqldb.updateCol(dbName, sql, function(err,result){
		        if(err){
		            returnErr('addCol:'+ err);
				    return;
		        }
		        console.log("插入列 " + dataJson.fieldName);
		        res.send("操作成功");
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
		if(!dataJson.fieldName || !dataJson.fieldNewName){
	      returnErr("dataJson错误");
		  return;
        }
		
		var sql = "CHANGE " + dataJson.fieldName +" "+ dataJson.fieldNewName;
		if(dataJson.dataNewType){
			sql += " "+dataJson.dataNewType;
		}
		mysqldb.updateCol(dbName, sql, function(err,result){
		        if(err){
		            returnErr('updateCol:'+ err);
				    return;
		        }
                console.log("修改列 " + dataJson.fieldName);
		        res.send("操作成功");
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
		if(!dataJson.fieldName){
	      returnErr("dataJson错误");
		  return;
        }
		var sql = "DROP " + dataJson.fieldName;
		mysqldb.updateCol(dbName, sql, function(err,result){
		        if(err){
		            returnErr('delCol:'+ err);
				    return;
		        }
                console.log("刪除列 " + dataJson.fieldName);
		        res.send("操作成功");
		});
	}
	
	
	
	//事物
//	mysqldb.beginTransaction(function(err){
//      returnErr("beginTransaction错误");
//		return;   
//	});
	
	
	
	
	
});

	



module.exports = router;


