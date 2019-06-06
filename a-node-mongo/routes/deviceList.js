const express = require('express');
const router = express.Router();
const config = require('../config');
const systemmodel = require('../models/systemConfig');
const DeviceDataModel = require('../models/DeviceData');
const RegisterModel = require('../models/register');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');



//验证token
// var userObj = {};
// router.use(function(req, res, next) {
//     var token = req.body.token || req.query.token || req.headers['x-access-token'];
//     if (!token) {
//         res.send("No token");
//         console.log("No token");
//         return;
//     }
//     jwt.verify(token, config.secret, function(err, result) {
//         if (err) {
//             res.send("Login has expired");
//             console.log("Login has expired");
//             return;
//         }
//         userObj = result;
//         console.log(userObj);
//         next();
//     });
// });


//get请求
router.get('/', async function(req, res, next) {

    //返回并打印
    function sendLog (value) {
        if(process.env.debug == 'true'){
            console.log(value);
        }
        res.send(value);
    }

    var action = req.query.action;
    if(action == "findData"){
        if (req.query.whereJson) {
            try {
                var whereJson = JSON.parse(req.query.whereJson);
            } catch (e) {
                sendLog("whereJson error");
                return;
            }
        } else {
            var whereJson = {};
        }

        if (req.query.sortJson) {
            try {
                var sortJson = JSON.parse(req.query.sortJson);
            } catch (e) {
                sendLog("sortJson Error");
                return;
            }
        } else {
            var sortJson = {};
        }

        if (req.query.fieldJson) {
            try {
                var fieldJson = JSON.parse(req.query.fieldJson);
            } catch (e) {
                sendLog("fieldJson Error");
                return;
            }
        } else {
            var fieldJson = {};
        }

        var prePageNum = req.query.prePageNum ? Number(req.query.prePageNum) : 0;
        var currPage = req.query.currPage ? Number(req.query.currPage) : 0;
        var skipNum = prePageNum * (currPage - 1) || 0;
        try {
            var count = await DeviceDataModel.find(whereJson).count()
            var result = await DeviceDataModel.find(whereJson).skip(skipNum).limit(prePageNum).sort(sortJson).select(fieldJson);
            var jsonObj = {
                "code": 0,
                "msg": "Success",
                "count": count,
                "prePageNum": prePageNum,
                "currPage": currPage,
                "rows": result
            };
            sendLog(jsonObj);
        } catch (err) {
            sendLog("findData error:" + err);
        }
    }else if(action == "findUsageData"){
        var systemArray = await systemmodel.find();
        var system ;
        var statuds = null;
        if(systemArray){
            system = systemArray[0];
        }
        console.log(system);
        if(req.query.whereJson){
            try{
                var whereJson = JSON.parse(req.query.whereJson);
            }catch(e){
                var jsonObj={
                    'msg':'whereJson error',
                    'statuds':statuds,
                    'system':system,
                }
                sendLog(jsonObj);
                return;
            }
        }

        if(!whereJson.SerialNumber){
            var jsonObj={
                'msg':'SerialNumber must not be null',
                'statuds':statuds,
                'system':system,
            }
            sendLog(jsonObj);
            return;
        }
        var device  = await RegisterModel.findOne({SerialNumber: whereJson.SerialNumber});
        if(device){
            statuds = device.status;
        }
        try {
            var result = await DeviceDataModel.findOne({SerialNumber: whereJson.SerialNumber});
            if (result) {
                var lastIndex = result.UpdateData[0].UsageData.length - 1;
                var jsonObj={
                    'lastdatatime':result.UpdateData[0].UpdateTime,
                    'lastuserdata':result.UpdateData[0].UsageData[lastIndex],
                    'statuds':statuds,
                    'system':system,
                }
                sendLog(jsonObj);
            }else{
                var jsonObj={
                    'msg':'Not found userdata',
                    'statuds':statuds,
                    'system':system,
                }
                sendLog(jsonObj);
            }
        } catch (err) {
            var jsonObj={
                'msg':"findUsageData error:" + err,
                'statuds':statuds,
                'system':system,
            }
            sendLog(jsonObj);
        }
    }else{
        sendLog("action error");
    }
        
});


//post请求
router.post('/', async function(req, res, next) {

    //返回并打印
    function sendLog (value) {
        if(process.env.debug == true){
            console.log(value);
        }
        res.send(value);
    }

    var action = req.body.action;
    if(action == "insertData"){

        try{
          var reqData = JSON.parse(req.body.dataJson);
        }catch(e){
            sendLog("dataJson error");
            return;
        }
        //console.log(reqData);

        if(!reqData.SerialNumber){
            sendLog("SerialNumber must not be null");
            return;
        }
        
        //检测是否激活
        try{
            var resultRegister = await RegisterModel.findOne({SerialNumber: reqData.SerialNumber, status: {$in:[1,2]}});
            if (!resultRegister) {
                sendLog("Comlete device manufacturing data not found on website");
                return;
            }
        }catch(e){
            sendLog("Test activated error");
            return;
        }

        var ConfigData = {
            ComplianceTime: reqData.Config[0],
            Language: reqData.Config[1],
            Brightness: reqData.Config[2],
            Audible: reqData.Config[3],
            NightMode: reqData.Config[4]
        };

        try{
            var PresetDataArr = [];
            for(let i = 0; i < reqData.Preset.length; i++) {
                PresetDataArr.push({
                    PresetNumber: reqData.Preset[i][9],
                    ElectrodeSize: reqData.Preset[i][0],
                    StimulationType: reqData.Preset[i][1],
                    ModeSettings: reqData.Preset[i][2],
                    TreatmentTime: reqData.Preset[i][3],
                    NumberOfCycles: reqData.Preset[i][4],
                    NextPresetToUse: reqData.Preset[i][5],
                    BeatFrequency: reqData.Preset[i][6]
                })
            }
        }catch(e){
            sendLog("Preset error");
            return;
        }
        
        try{
            var UsageDataArr = [];
            for(let i = 0; i < reqData.Usage.length; i++) {
                // U => Usage Data    A => AnswerData
                if(reqData.Usage[i][0] === 'U') {
                    var PresetData = PresetDataArr[Number(reqData.Usage[i][2])-1];
                    UsageDataArr.push({
                        Type: reqData.Usage[i][0],
                        DateOfTreatment: reqData.Usage[i][1][0],
                        TimeOfTreatment: reqData.Usage[i][1][1],
                        PresetNumber: reqData.Usage[i][2],
                        PresetData: PresetData,
                        ConfigData: ConfigData,
                        MinOfUse: reqData.Usage[i][4],
                        MinOfPause: reqData.Usage[i][3],
                        Channel1MaxAmpUsed: reqData.Usage[i][5]/2,
                        Channel1AverageAmpUsed: reqData.Usage[i][6]/2,
                        Channel2MaxAmpUsed: reqData.Usage[i][7]/2,
                        Channel2AverageAmpUsed: reqData.Usage[i][8]/2,
                        Address: reqData.Usage[i][9]
                    })
                } else {
                    // Q & A
                    UsageDataArr.push({
                        Type: reqData.Usage[i][0],
                        DateOfTreatment: reqData.Usage[i][1][0],
                        TimeOfTreatment: reqData.Usage[i][1][1],
                        PainBefore: reqData.Usage[i][2],
                        PainAfter: reqData.Usage[i][3],
                        DecrMeds: reqData.Usage[i][4],
                        HelpWork: reqData.Usage[i][5],
                        HelpHome: reqData.Usage[i][6],
                        Address: reqData.Usage[i][7]
                    })
                }
            }
        }catch(e){
            sendLog("Usage error");
            return;
        }

        var dataJson = {
            ConfigData: ConfigData,
            PresetData: PresetDataArr,
            UsageData: UsageDataArr,
            UpdateTime: moment().tz("America/Los_Angeles").format("YYYY-MM-DD HH:mm:ss"),
        };

       
        DeviceDataModel.findOne({ 'SerialNumber' : reqData.SerialNumber }, (err, doc) => {
            if (!doc) {
                var DeviceData = new DeviceDataModel();
                DeviceData.SerialNumber = resultRegister.SerialNumber;
                DeviceData.PCBNumber = resultRegister.PCBNumber;
                DeviceData.BluetoothNumber = resultRegister.BluetoothNumber;
                DeviceData.UserInfo.PatientName = reqData.UserInfo.PatientName;
                DeviceData.UserInfo.PatientEmail = reqData.UserInfo.PatientEmail;
                DeviceData.UserInfo.DoctorEmail = reqData.UserInfo.DoctorEmail;
                DeviceData.UserInfo.DeviceName = reqData.UserInfo.DeviceName;
                DeviceData.UpdateData.push(dataJson);
                DeviceData.save((err, result) => {
                    // 还未保存过的device，会新增device data
                    if(err){
                        sendLog("save error:" + err);
                        return;
                    }
                    
                    //修改状态
                    RegisterModel.update({SerialNumber: reqData.SerialNumber }, { status:2}, (err, doc) => {
                        if (err) {
                            sendLog("Change status error");
                            return;
                        }
                        sendLog("Success");
                    });

                });
            } else {
                // 已经保存过的device，在原来的数据上添加数据
                //console.log(doc.UpdateData[0].UsageData);
                doc.UpdateData[0].UpdateTime = moment().tz("America/Los_Angeles").format("YYYY-MM-DD HH:mm:ss");
                UsageDataArr.forEach(function(item, index){
                    doc.UpdateData[0].UsageData.push(item);
                });
                doc.save((err, result) => {
                    if(err){
                        sendLog("push error:" + err);
                        return;
                    }
                    sendLog("Success");
                });
            }
        });
    }else{
        sendLog("action error");
    }
});

module.exports = router;
