const express = require('express');
const router = express.Router();
const config = require('../config');
const AdminModel = require('../models/admin');
const FunctionModel = require('../models/function');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const dtime = require('time-formater');



//get请求
router.get('/', async function(req, res, next) {

        //返回并打印
        function sendLog (value) {
            if(process.env.debug == 'true'){
                console.log(value);
            }
            res.send(value);
        }

        sendLog("no get");

});


//post请求
router.post('/', async function(req, res, next) {

        //返回并打印
        function sendLog (value) {
            if(process.env.debug == 'true'){
                console.log(value);
            }
            res.send(value);
        }

        var action = req.body.action;
        if(action == "signIn"){
            try{
              var whereJson = JSON.parse(req.body.whereJson);
            }catch(e){
                sendLog({"code": 0, "msg":"whereJson error"});
                return;
            }

            if(!whereJson.username || !whereJson.password){
                sendLog({"code": 0, "msg":"username and password must not be null"});
                return;
            }

            let account = whereJson.username;
            let password = whereJson.password;
            var md5 = crypto.createHash('md5');
            let newPassword = md5.update(password).digest('hex');
            try {
                var result = await AdminModel.findOne({ user_name: account, password: newPassword });
                if(result){
                    //res.cookie("logining-avid", {"UserName": result.user_name, "hash": result.password, "Permission": result.permission }, {maxAge: 8*3600*1000});
                    var token = jwt.sign({"UserName": result.user_name, "hash": result.password, "Permission": result.permission }, config.secret, {expiresIn : 60*60*800});
                    var result_f = await FunctionModel.find({ permission: result.permission });
                    var functionArr = [];
                    result_f.forEach( function(item, index) {
                        if(item.action == "Mfg" || item.action == "Final" || item.action == "Incoming"){
                            functionArr.push(item.action);
                        }
                    });
                    var obj = {"code": 0, "msg":"Success", "UserName": result.user_name, "Permission": result.permission, "function": functionArr, "token": token};
                    sendLog(obj);
                }else {
                    sendLog({"code": 0, "msg":"UserName or Password error"});
                }
                
            } catch (err) {
               sendLog({"code": 0, "msg":"signIn function error:" + err});
            }

        }else if(action == "signOut"){
        	var token = req.body.token || req.query.token || req.headers['x-access-token'];
		    if(!token){
		    	sendLog("No token");
		        return;
		    }
			jwt.verify(token, config.secret, function(err, result) {
				if(err){
					sendLog("Login has expired");
		            return;
				}
				var token = jwt.sign({"UserName": result.user_name, "hash": result.password, "Permission": result.permission }, config.secret, {expiresIn : 0});
				var UserName = result.UserName;
	            sendLog("Success");
			});
            
        }
        else if(action == "signUp"){
            try{
                var dataArr = JSON.parse(req.body.dataArr);
                if(Array.isArray(dataArr) && dataArr.length == 1){
                    //continue
                }else{
                    sendLog("dataArr Error");
                    return;
                }
            }catch(e){
                sendLog("dataArr Error"); 
                return;
            }

            if(!dataArr[0].username || !dataArr[0].password){
                sendLog("username and password must not be null");
                return;
            }

            let username = dataArr[0].username;
            let password = dataArr[0].password;
            var md5 = crypto.createHash('md5');
            let newPassword = md5.update(password).digest('hex');
            try {
                var result = await AdminModel.findOne({user_name: username});
                if (result) {
                    sendLog("username already existed");
                    return;
                }

                var result = await new AdminModel({
                    user_name: username,
                    password: newPassword,
                    permission: 1,
                    create_time: dtime().format('YYYY-MM-DD HH:mm:ss'),
                }).save();

                if (result) {
                    sendLog("Success");
                } else {
                    sendLog("AdminModel.save error");
                }
                
            } catch (err) {
               sendLog("Error");
            }

        }
        else if(action == 'appsignUp'){
            let whereJson = JSON.parse(req.body.whereJson);
            let password =whereJson.password;
            var md5 = crypto.createHash('md5');
            let newPassword = md5.update(password).digest('hex');
            var result = await new AdminModel({
                "user_name" : whereJson.username,
                "password" : newPassword,
                "name":whereJson.name,
                "email":whereJson.email,
                "permission" : 5,
                "additional_email":whereJson.additionalEmail,
                "serial_number":whereJson.serialNumber,
                "permission_name" : "customer",
                "create_time" : dtime().format('YYYY-MM-DD HH:mm:ss'),
            }).save();
            if(result){
                var find = await AdminModel.findOne({ user_name: whereJson.username, password: newPassword });
                if(find){
                    var token = jwt.sign({"UserName": find.user_name, "hash": find.password, "Permission": find.permission }, config.secret, {expiresIn : 60*60*800});
                    var result_f = await FunctionModel.find({ permission: find.permission });
                    var functionArr = [];
                    result_f.forEach( function(item, index) {
                        if(item.action == "Mfg" || item.action == "Final" || item.action == "Incoming"){
                            functionArr.push(item.action);
                        }
                    });
                    var obj = {"code": 0, "msg":"Success", "UserName": find.user_name, "Permission": find.permission, "function": functionArr, "token": token};
                    sendLog(obj);
                }else {
                    sendLog({"code": 0, "msg":"UserName or Password error"});
                }

            }else  {
                sendLog("Sign up data error");
            }
        }
        else{
            res.send("signUp function error");
            return;
        }
});

module.exports = router;
