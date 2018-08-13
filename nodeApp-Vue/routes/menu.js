const express = require('express');
const router = express.Router();
const db = require("../my_modules/db.js");
const moment = require('moment');

// http://localhost:3000/nodejs/modelList?action=findData&searchJson={"name":"mick"}&fieldJson={"name":1}&prePageNum=5&currPage=1&sortJson={"key":1}  //查询数据


router.get('/', function(req, res, next) {
	
	var dbName = "modelList";
	
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
        default:
              returnErr("action错误");
	}
	
    


	//查询数据 
	function findData () {
		var whereJson = {};
		var sortJson = {"level":1,"sort":1};
		var fieldJson = {};
		
		var prePageNum = 0;
		var currPage = 0;
		var args = {"prePageNum":prePageNum, "currPage":currPage, "sort":sortJson};
		db.findData(dbName, whereJson, fieldJson, args, function(err, result, count){
		        if(err){
		            returnErr('findDataError:'+ err);
				    return;
		        }
		       //console.log(result);
		       console.log("查询了" + result.length +"条数据，" + "共" + count +"条数据");
		       var rowsArr = [];
		       result.forEach(function(item, index) {
		       	    item.children = [];
				    if(item.level == 1){
				    	rowsArr.push(item);
				    }
				    if(item.level == 2){
				    	rowsArr.forEach(function(item2, index2) {
				    		if(item.parentId == item2.id){
				    			item2.children.push(item);
				    		}
				    	});
				    }
			   });
		       var jsonObj = {"name_ch": "菜单", "name_en" : "menu", "rows": rowsArr};
		       res.send(jsonObj);
		});
	}
	
	
	
});

	


	



module.exports = router;


