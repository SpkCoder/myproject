const express = require('express');
const router = express.Router();
const config = require('../config');
const PermissionModel = require('../models/permission');
const AdminModel = require('../models/admin');
const FunctionModel = require('../models/function');
// const powerModel = require('../my_modules/power');
const jwt = require('jsonwebtoken');
const dtime = require('time-formater');


// http://localhost:3000/nodejs/httpTest?action=findData&whereJson={"name":"mick"}&fieldJson={"name":1}&prePageNum=10&currPage=1&sortJson={"key":1}  //查询数据
// http://localhost:3000/nodejs/httpTest?action=insertData&dataArr=[{"name":"mick","age":18},{"name":"tina","age":35}]  //插入数据 
// http://localhost:3000/nodejs/httpTest?action=updateData&searchJson={"name":"mick"}&updateJson={"age":20}  //修改数据 
// http://localhost:3000/nodejs/httpTest?action=delData&dataJson={"name":{"$in":["mick","tina"]}}  //删除数据 


//验证token
var userObj = {};
router.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        res.send("No token");
        console.log("No token");
        return;
    }
    jwt.verify(token, config.secret, function(err, result) {
        if (err) {
            res.send("Login has expired");
            console.log("Login has expired");
            return;
        }
        userObj = result;
        console.log(userObj);
        next();
    });
});


//get请求
router.get('/', async function(req, res, next) {
    
        //返回并打印
        function sendLog (value) {
            if(process.env.debug == 'true'){
                console.log(value);
            }
            res.send(value);
        }

        //判断权限
        var action = req.query.action;
        var tableName = "permissions";
        // var result = await powerModel.getPower(userObj.Permission, tableName, action2);
        var result = 1;
        //分配方法
        if(result){
            switch (action){
                case "findData":
                      await findData();
                      break;
                default:
                      sendLog("action Error");
            }
        }else{
            sendLog("No Permissions");
            return;
        }

        
        //查询数据
        async function findData() {
            if(req.query.whereJson){
                try{
                  var whereJson = JSON.parse(req.query.whereJson);
                }catch(e){
                    sendLog("whereJson error");
                    return;
                }
            }else{
                var whereJson = {};
            }

            if(req.query.sortJson){
                try{
                  var sortJson = JSON.parse(req.query.sortJson);
                }catch(e){
                    sendLog("sortJson Error");
                    return;
                }
            }else{
                var sortJson = {};
            }
            
            if(req.query.fieldJson){
                try{
                  var fieldJson = JSON.parse(req.query.fieldJson);
                }catch(e){
                    sendLog("fieldJson Error");
                    return;
                }
            }else{
                var fieldJson = {};
            }

            var prePageNum = req.query.prePageNum ? Number(req.query.prePageNum) : 0;
            var currPage = req.query.currPage ? Number(req.query.currPage) : 0;
            var skipNum = prePageNum * (currPage-1) || 0;
            try {
                var count = await PermissionModel.find(whereJson).count();
                var result = await PermissionModel.find(whereJson).skip(skipNum).limit(prePageNum).sort(sortJson).select(fieldJson);
                var jsonObj = {"code": 0, "msg" : "Success", "count" : count, "prePageNum": prePageNum, "currPage": currPage, "rows": result};
                sendLog(jsonObj);
            } catch (err) {
                sendLog("findData function error:" + err);
            }
        }
        
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

        //判断权限
        var action = req.body.action;
        var tableName = "permissions";
        var result = await powerModel.getPower(userObj.Permission, tableName, action);
        //分配方法
        if(result){
            switch (action){
                case "insertData":
                      await insertData();
                      break;
                case "updateData":
                      await updateData();
                      break;
                case "delData":
                      await delData();
                      break;
                default:
                      sendLog("action Error");
            }
        }else{
            sendLog("No Permissions");
            return;
        }
        

        async function insertData () {
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

            if(!dataArr[0].permission || !dataArr[0].permission_name){
                sendLog("permission must not be null");
                return;
            }

            try {
                var result = await PermissionModel.findOne({permission: dataArr[0].permission});
                if (result) {
                    sendLog("permission already existed");
                    return;
                }
                var result = await new PermissionModel({
                    permission: dataArr[0].permission,
                    permission_name: dataArr[0].permission_name,
                }).save();

                sendLog("Success");
                
            } catch (err) {
               sendLog("insertData function error:" + err);
            }
        }


        async function updateData () {
            if(req.body.whereJson){
                try{
                      var whereJson = JSON.parse(req.body.whereJson);
                }catch(e){
                    sendLog("whereJson error");
                    return;
                }
            }else{
                sendLog("whereJson error");
                return;
            }
            if(req.body.updateJson){
                try{
                  var updateJson = JSON.parse(req.body.updateJson);
                }catch(e){
                    sendLog("updateJson error");
                    return;
                }
            }else{
                sendLog("updateJson error");
                return;
            }
            try {
                var result = await PermissionModel.update(whereJson, updateJson);
                var result = await AdminModel.updateMany({"permission":whereJson.permission}, {"permission_name":updateJson.permission_name});
                sendLog("Success");
            } catch (err) {
                sendLog("updateData function error:" + err);
            }
        }


        async function delData () {
            if(req.body.dataJson){
                try{
                   var whereJson = JSON.parse(req.body.dataJson);
                }catch(e){
                    sendLog("dataJson error");
                    return;
                }
            }else{
                sendLog("dataJson error");
                return;
            }
            try {
                var result = await PermissionModel.remove(whereJson);
                var result = await FunctionModel.deleteMany({"permission":whereJson.permission});
                sendLog("Success");
            } catch (err) {
                sendLog("delData function error:" + err);
            }
        }

        
});

module.exports = router;
