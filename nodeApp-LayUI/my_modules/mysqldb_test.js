const mysql  = require('mysql');  
const querystring  = require('querystring');  


//连接数据库
function _connectDB(callback) {
    var db = mysql.createConnection({     
		host: 'localhost',       
		user: 'root',              
		password: '123456',       
		port: '3306',                   
		database: 'mydb'
	}); 
	db.connect();
	console.log(db);
};

_connectDB();

