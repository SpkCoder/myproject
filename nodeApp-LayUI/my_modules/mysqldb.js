const mysql  = require('mysql');  
const querystring  = require('querystring');  


//连接数据库
function _connectDB(callback) {
    var db = mysql.createConnection({     
		host: 'localhost',       
		user: 'root',              
		password: '',       
		port: '3306',                   
		database: 'mydb', 
	}); 
	db.connect();
	callback(db);
};


function getStr (obj) {
	var arr = [];
	for(k in obj){
		if(typeof obj[k] == "string"){
			arr.push(k + '="' + obj[k] + '"');
		}else{
			arr.push(k + '=' + obj[k]);
		}
	}
	return arr.join(",");
}




//创建数据表
exports.createCollection = function (collectionName, callback) {
    _connectDB(function (db) {
        db.query('CREATE TABLE '+ collectionName + '(id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY)', function (err, result) {
                callback(err, result);
                db.end(); //关闭数据库
        });
    })
};



//删除数据表
exports.dropCollection = function (collectionName,callback) {
    _connectDB(function (db) {
        db.query('DROP TABLE '+ collectionName, function (err, result) {
                callback(err, result);
                db.end(); //关闭数据库
        });
    })
};





//查找关联数据 
exports.findDataLookup = function (sql_lookup, whereStr, fieldStr, args, callback) {
    _connectDB(function (db) {
    	db.query("SELECT * FROM "+ sql_lookup, function (err, result) {
            if(err){
           	 callback(err, result);
           	 db.end(); //关闭数据库
           	 return;
            }
            
            var count = result.length;
	        var field = fieldStr || '*';
	    	var sql = 'SELECT '+field+' FROM ' + sql_lookup;
	    	
	    	var skipNum = 0;  //跳过条数
		    var limit = 0;    //数目限制
		    var sort = "";    //排序方式
		    if(args){
		        skipNum = args.prePageNum * (args.currPage-1);
		        limit = args.prePageNum;
		        sort = args.sort;
		    }
	    	if(whereStr){
	    		sql += ' WHERE ' + whereStr
	    	}
	    	if(sort){  
	    		sql += ' ORDER BY ' + sort
	    	}
	    	if(limit > 0){  
	    		sql += ' LIMIT ' + limit
	    	}
	    	if(skipNum > 0){  
	    		sql += ' OFFSET ' + skipNum
	    	}
	    	
//	    	console.log(sql);
	        db.query(sql, function (err2, result2) {
	           if(err2){
	           	 callback(err2, result2);
	           	 db.end(); //关闭数据库
	           	 return;
	           }
		       callback(err2, result2, count);
	           db.end(); //关闭数据库
			});
	       
		});
    	
    })
};





//查询数据
exports.findData = function (collectionName, whereStr, fieldStr, args, callback) {
    _connectDB(function (db) {
    	var sql = 'SELECT * FROM ' + collectionName;
    	if(whereStr){
	    	sql += ' WHERE ' + whereStr
	    }
    	db.query(sql, function (err, result) {
            if(err){
           	 callback(err, result);
           	 db.end(); //关闭数据库
           	 return;
            }
	        var count = result.length;
	        var field = fieldStr || '*';
	    	var sql = 'SELECT '+field+' FROM ' + collectionName;
	    	
	    	var skipNum = 0;  //跳过条数
		    var limit = 0;    //数目限制
		    var sort = "";    //排序方式
		    if(args){
		        skipNum = args.prePageNum * (args.currPage-1);
		        limit = args.prePageNum;
		        sort = args.sort;
		    }
	    	if(whereStr){
	    		sql += ' WHERE ' + whereStr
	    	}
	    	if(sort){  
	    		sql += ' ORDER BY ' + sort
	    	}
	    	if(limit > 0){  
	    		sql += ' LIMIT ' + limit
	    	}
	    	if(skipNum > 0){  
	    		sql += ' OFFSET ' + skipNum
	    	}
	    	
	    	//console.log(sql);
	        db.query(sql, function (err2, result2) {
	           if(err2){
	           	 callback(err2, result2);
	           	 db.end(); //关闭数据库
	           	 return;
	           }
		       callback(err2, result2, count);
	           db.end(); //关闭数据库
			});
	       
		});
    	
    })
};






//插入数据
exports.insertData = function (collectionName, dataArr, callback) {
    _connectDB(function (db) {
    	var errArr = [];
    	function insertDataMany(i){
    		if(i < dataArr.length){
    			db.query('INSERT INTO '+ collectionName +' SET ?', dataArr[i], function (err, result) {
		            if(err){
		            	errArr.push(key + 1);
		            }
		            i++;
		            insertDataMany(i);
		        })
    		}else{
    			db.end(); //关闭数据库
                callback(errArr);
    		}
    	};
    	insertDataMany(0);
    })
};



//修改数据
exports.updateData = function (collectionName, whereStr, updateJson, callback) {
    _connectDB(function (db) {
    	var updateStr = getStr(updateJson);
        db.query('UPDATE '+ collectionName +' SET ' + updateStr + ' WHERE ' + whereStr, function (err, result) {
                callback(err, result);
                db.end(); //关闭数据库
        });
    })
};





//删除数据
exports.deleteData = function (collectionName, dataArr, callback) {
    _connectDB(function (db) {
    	var dataStr = '(' + dataArr.join(",") + ')';
        db.query('DELETE FROM '+ collectionName + ' WHERE id in ' + dataStr, function (err, result) {
                callback(err, result);
                db.end(); //关闭数据库
        });
    });
};





//插入修改删除列
exports.updateCol = function (collectionName, sql, callback) {
    _connectDB(function (db) {
        db.query('ALTER TABLE '+ collectionName +" "+ sql, function (err, result) {
                callback(err, result);
                db.end(); //关闭数据库
        });
    })
};




//事物
exports.beginTransaction = function (callback) {
    _connectDB(function (db) {
        db.beginTransaction(function(err) {
		  if (err) { callback(err); }
		  db.query('INSERT INTO table1 SET?', {"firstname": "test5"} , function (err, result) {
		    if (err) {
		      return db.rollback(function() {
		        callback(err);
		      });
		    }
		    
		    db.query('INSERT INTO table2 SET?', {"firstname": "test5", "age": result.insertId} , function (err, result) {
		      if (err) {
		        return db.rollback(function() {
		          callback(err);
		        });
		      }
		      db.commit(function(err) {
		        if (err) {
		          return db.rollback(function() {
		            callback(err);
		          });
		        }
		        console.log('Transaction success!');
		      });
		    });
		  });
		  
		});
    })
};


