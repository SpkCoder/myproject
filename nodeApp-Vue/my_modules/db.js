const settings = require("./settings.js");
const MongoClient = require('mongodb').MongoClient;
const dburl = settings.dburl;



//连接数据库
function _connectDB(callback) {
    MongoClient.connect(dburl, function (err, db) {
        if (err) {
            console.log('MongoClient.connect:'+ err);
	        return;
        }
        callback(db);
    });
};




//创建索引
exports.createIndex = function (collectionName, fieldJson, callback) {
    _connectDB(function (db) {
        db.collection(collectionName).createIndex(fieldJson, function (err, result) {
            callback(err, result);
            db.close(); //关闭数据库
        })
    })
};



//创建数据表
exports.createCollection = function (collectionName, callback) {
    _connectDB(function (db) {
        db.createCollection(collectionName,function (err, result) {
            callback(err, result);
            db.close(); //关闭数据库
        })
    })
};



//删除数据表
exports.dropCollection = function (collectionName,callback) {
    _connectDB(function (db) {
        db.collection(collectionName).drop(function (err, result) {
            callback(err, result);
            db.close(); //关闭数据库
        })
    })
};



//删除集合
exports.createCollection = function (collectionName, callback) {
    _connectDB(function (db) {
        db.createCollection(collectionName,function (err, result) {
            callback(err, result);
            db.close(); //关闭数据库
        })
    })
};



//获取权限
exports.getPower = function (username, dbName, action, callback) {
	var whereJson = {"username": username};
    var skipNum = 0;  //跳过条数
    var limit = 0;    //数目限制
    var sort = {};    //排序方式
    var fields = {"id":1, "dbName":1, "function_en":1};  //过滤字段
	
    _connectDB(function (db) {
    	db.collection("userList").find(whereJson, fields).skip(skipNum).limit(limit).sort(sort).toArray(function(err, result) {
	        if (err) {
    		   db.close(); //关闭数据库
               returnErr("collection.find" +err);
	           return;
            }
	        var roleId = result[0].roleId;
	        var whereJson2 = {"id": roleId, "dbName": dbName, "function_en": action};
	        db.collection("powerList").count(whereJson2, function (err, count) {
	        	//count = [1];
	    		callback(err,count);
		        db.close(); //关闭数据库
	        });
        });
    });
}




//获取thead
exports.getHead = function (whereJson, callback) {
    var skipNum = 0;  //跳过条数
    var limit = 0;    //数目限制
    var sort = {"id": 1,"field_sort": 1};    //排序方式
    var fields = {};    //过滤字段
	
    _connectDB(function (db) {
    	db.collection("dataList").find(whereJson, fields).skip(skipNum).limit(limit).sort(sort).toArray(function(err, result) {
	        if(typeof result=="object" && result.length > 0){
	        	var rowsArr = [];
		        var rowsIndex;
		        result.forEach(function(item, index) {
		       	    if(index == 0){
		       	       rowsArr.push(item);
		       	       rowsIndex = 0;
		       	    }else{
		       	    	if(item.id == result[index - 1].id){
				    	  rowsArr[rowsIndex].field_ch += (";"+item.field_ch);
				    	  rowsArr[rowsIndex].field_en += (";"+item.field_en);
				    	  rowsArr[rowsIndex].data_type += (";"+item.data_type);
				    	  rowsArr[rowsIndex].field_width += (";"+item.field_width);
				    	  rowsArr[rowsIndex].field_sort += (";"+item.field_sort);
				        }else{
				        	rowsArr.push(item);
				        	rowsIndex += 1;
				        }
		       	    }
			    });
			    result = rowsArr;
	        }
	        
	        callback(err, result);
	        db.close(); //关闭数据库
        });
    });
}




//查找数据 
exports.findData = function (collectionName, whereJson, fieldJson, args, callback) {
	
    var skipNum = 0;  //跳过条数
    var limit = 0;    //数目限制
    var sort = {};    //排序方式
    var fields = {};    //过滤字段
	if(args){
		skipNum = args.prePageNum * (args.currPage-1) || 0;
		limit = args.prePageNum || 0;
		sort = args.sort || {};
	}
	if(fieldJson){
		fields = fieldJson;
	}

    _connectDB(function (db) {
    	db.collection(collectionName).count(whereJson, function (err, count) {
    		if (err) {
    		   db.close(); //关闭数据库
               returnErr("collection.count" +err);
	           return;
            }
          	db.collection(collectionName).find(whereJson, fields).skip(skipNum).limit(limit).sort(sort).toArray(function(err, result) {
	        	callback(err, result, count);
	            db.close(); //关闭数据库
           });
        });
    });
}





//插入数据
exports.insertData = function (collectionName, dataArr, callback) {
    _connectDB(function (db) {
        db.collection(collectionName).insert(dataArr, function (err, result) {
            callback(err, result);
            db.close(); //关闭数据库
        })
    })
};



//修改数据
exports.updateData = function (collectionName, whereJson, updateJson, callback) {
    _connectDB(function (db) {
        db.collection(collectionName).update(whereJson, updateJson, function (err, result) {
                callback(err, result);
                db.close();//关闭数据库
        });
    })
};




//删除数据
exports.deleteData = function (collectionName, whereJson, callback) {
    _connectDB(function (db) {
        db.collection(collectionName).deleteMany(whereJson, function (err, result) {
                callback(err, result);
                db.close(); //关闭数据库
        });
    });
};


//插入修改删除列
exports.updateCol = function (collectionName, whereJson, updateJson, callback) {
    _connectDB(function (db) {
    	db.createCollection(collectionName);
        db.collection(collectionName).updateMany(whereJson, updateJson, function (err, result) {
                callback(err, result);
                db.close();//关闭数据库
        });
    })
};




//操作记录
exports.setRecord = function (recordJson, callback) {
	var whereJson = {"name": recordJson.dbName};
    var skipNum = 0;  //跳过条数
    var limit = 1;    //数目限制
    var sort = {};    //排序方式
    var fields = {"id":1, "name":1, "name_ch":1};  //过滤字段
	
    _connectDB(function (db) {
    	db.collection("dataList").find(whereJson, fields).skip(skipNum).limit(limit).sort(sort).toArray(function(err, result) {
	        if (err) {
    		   db.close(); //关闭数据库
               returnErr("collection.find" +err);
	           return;
            }
	        recordJson.modelId = result[0].id;
	        recordJson.dbName_ch = result[0].name_ch;
	        db.collection("recordList").insert([recordJson], function (err, result) {
	            callback(err, result);
	            db.close(); //关闭数据库
	        })
        });
    });
}


