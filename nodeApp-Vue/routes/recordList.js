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
	
	//返回错误
    function returnErr (value) {
    	console.log(value);
		res.send(value);
    }
    
    
    //判断权限
	console.log(req.query);
	var action = req.query.action;
    db.getPower(username, dbName, action, function(err, power){
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
		sortJson.time = -1;
		
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
				         var jsonObj = {"code": 0, "msg" : "", "count" : count, "prePageNum": prePageNum, "currPage": currPage, "name_ch": headArr[0].name_ch, "name": headArr[0].name, "field_ch": headArr[0].field_ch, "field_en": headArr[0].field_en, "data_type": headArr[0].data_type, "field_width": headArr[0].field_width, "rows": result};				       	 headObj = headArr[0];
				       }else{
				         var jsonObj = {"code": 0, "msg" : "", "count" : count, "prePageNum": prePageNum, "currPage": currPage, "name_ch": "", "name": "", "field_ch": "", "field_en": "", "data_type": "", "field_width": "", "rows": result};
				       }
				       //console.log(jsonObj);
				       res.send(jsonObj);
				});
		});
	}
	
	
	
});

	


module.exports = router;


