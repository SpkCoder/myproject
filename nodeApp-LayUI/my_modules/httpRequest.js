const http = require('http');  
const qs = require('querystring');  
  

//var options = {  
//  hostname: '127.0.0.1',  
//  port: 8001,  
//  path: '/nodejs/userList',  
//  method: 'GET'  
//};
//
//var dataJson = { 
//	action: 'findData',
//  searchJson: '{"name":"yuxian"}' 
//}


var httpRequest =function (options,dataJson,callback) {
	var content = qs.stringify(dataJson); 
	console.log(content);
	if(options.method == "GET"){
		options.path = options.path + "?" + content;
	}
	if(options.method == "POST"){
		options.headers = {  
	        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'  
	    }
	}
	
	var HRreq = http.request(options, function (HRres) {  
	    console.log('Status Code: ' + HRres.statusCode);  
	    console.log('headers: ' + JSON.stringify(HRres.headers));  
	    HRres.setEncoding('utf8');  
	    HRres.on('data', function (chunk) {  
	        callback(chunk);
	    });  
	});
	
	HRreq.on('error', function (HRerr) {  
      console.log('httpRequest Error:' + HRerr.message);  
	});  
	
	if(options.method == "POST"){
		HRreq.write(content); 
	}
	
	HRreq.end(); 
	
}



module.exports = httpRequest;

