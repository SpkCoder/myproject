const jwt = require('jsonwebtoken'); 
const miyao = "miyaoxxxx";


//加密
exports.incoded = function (jsonObj) {
	var token = jwt.sign(jsonObj, miyao, {
        expiresIn : 60*60*24// 授权时效24小时
    });
    return token;
}


//解密
exports.decoded = function (token,callback) {
	jwt.verify(token, miyao, function(err, jsonObj) {
		if(err){
			callback(err);
			return;
		}
	    callback(err, jsonObj);
    });
}