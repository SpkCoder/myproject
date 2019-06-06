const express = require('express');
const router = express.Router();
const config = require('../config');
const RegisterModel = require('../models/register');
const DeviceDataModel = require('../models/DeviceData');
const powerModel = require('../my_modules/power');
const jwt = require('jsonwebtoken');
const dtime = require('time-formater');


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
    var tableName = "registers";
    if (action == "findData") {
        var action2 = "findData";
    } else if (action == "check_activate" || action == "check_idCodes") {
        var action2 = "Incoming";
    } else if (action == "check_register") {
        var action2 = "findData";
    }else if (action == "register" || action == "updateMfgTest") {
        var action2 = "Mfg";
    } else if (action == "activate") {
        var action2 = "Final";
    } else {
        var action2 = "None";
    }
    var result = await powerModel.getPower(userObj.Permission, tableName, action2);
    //分配方法
    if (result) {
        switch (action) {
            case "register":
                await register();
                break;
            case "check_register":
                await check_register();
                break;
            case "activate":
                await activate();
                break;
            case "check_activate":
                await check_activate();
                break;
            case "check_idCodes":
                await check_idCodes();
                break;
            case "findData":
                await findData();
                break;
            case "updateMfgTest":
                await updateMfgTest();
                break;
            default:
                sendLog("action Error");
        }
    } else {
        sendLog("No Permissions");
        return;
    }


    //get_register_data
    function get_data(data) {
        data.forEach(function(item, index) {
            if (item.code == "128-129") {
                item.value2 = item.value;
                item.name = "channel 1 minimum value";
            } else if (item.code == "130-131") {
                item.value2 = item.value;
                item.name = "channel 2 minimum value";
            } else if (item.code == "132-133") {
                item.value2 = item.value;
                item.name = "channel 1 maximum value";
            } else if (item.code == "134-135") {
                item.value2 = item.value;
                item.name = "channel 2 maximum value";
            } else if (item.code == "136-137") {
                item.value2 = item.value;
                item.name = "channel minimum Amp";
            } else if (item.code == "138-139") {
                item.value2 = item.value;
                item.name = "channel maximum Amp";
            } else if (item.code == "140-141") {
                item.value2 = item.value;
                item.name = "channel 1 sense value";
            } else if (item.code == "142-143") {
                item.value2 = item.value;
                item.name = "channel 2 sense value";
            } else if (item.code == "144-145") {
                item.value2 = item.value;
                item.name = "Open sense";
            } else if (item.code == "192") {
                item.name = "Amp 1 test";
                if (item.value == "1") {
                    item.value2 = "fail";
                }
                if (item.value == "0") {
                    item.value2 = "pass";
                }
                if (item.value == "255") {
                    item.value2 = "has not yet performed";
                }
            } else if (item.code == "193") {
                item.name = "Amp 2 test";
                if (item.value == "1") {
                    item.value2 = "fail";
                }
                if (item.value == "0") {
                    item.value2 = "pass";
                }
                if (item.value == "255") {
                    item.value2 = "has not yet performe";
                }
            } else if (item.code == "194-198") {
                item.value = item.value[0] + " " + item.value[1];
                item.value2 = item.value;
                item.name = "Test date";
            } else if (item.code == "199") {
                item.name = "UI test";
                if (item.value == "1") {
                    item.value2 = "fail";
                }
                if (item.value == "0") {
                    item.value2 = "pass";
                }
                if (item.value == "255") {
                    item.value2 = "has not yet performed";
                }
            } else if (item.code == "200") {
                item.name = "Calibration";
                if (item.value == "1") {
                    item.value2 = "fail";
                }
                if (item.value == "0") {
                    item.value2 = "pass";
                }
                if (item.value == "255") {
                    item.value2 = "has not yet performed";
                }
            } else if (item.code == "201") {
                item.name = "Bluetooth";
                if (item.value == "1") {
                    item.value2 = "fail"
                }
                if (item.value == "0") {
                    item.value2 = "pass"
                }
                if (item.value == "255") {
                    item.value2 = "has not yet performed"
                }
            } else if (item.code == "202") {
                item.name = "LCD test";
                if (item.value == "1") {
                    item.value2 = "fail"
                }
                if (item.value == "0") {
                    item.value2 = "pass"
                }
                if (item.value == "255") {
                    item.value2 = "has not yet performe"
                }
            } else if (item.code == "203") {
                item.name = "Touch test";
                if (item.value == "1") {
                    item.value2 = "fail"
                }
                if (item.value == "0") {
                    item.value2 = "pass"
                }
                if (item.value == "255") {
                    item.value2 = "has not yet performed"
                }
            } else if (item.code == "204") {
                item.name = "Backlight test";
                if (item.value == "1") {
                    item.value2 = "fail"
                }
                if (item.value == "0") {
                    item.value2 = "pass"
                }
                if (item.value == "255") {
                    item.value2 = "has not yet performed"
                }
            } else if (item.code == "205") {
                item.name = "Buzzer test";
                if (item.value == "1") {
                    item.value2 = "fail"
                }
                if (item.value == "0") {
                    item.value2 = "pass"
                }
                if (item.value == "255") {
                    item.value2 = "has not yet performed"
                }
            } else if (item.code == "206") {
                item.name = "Power key test";
                if (item.value == "1") {
                    item.value2 = "fail"
                }
                if (item.value == "0") {
                    item.value2 = "pass"
                }
                if (item.value == "255") {
                    item.value2 = "has not yet performed"
                }
            } else if (item.code == "207") {
                item.name = "EEPROM test";
                if (item.value == "1") {
                    item.value2 = "fail"
                }
                if (item.value == "0") {
                    item.value2 = "pass"
                }
                if (item.value == "255") {
                    item.value2 = "has not yet performed"
                }
            } else if (item.code == "208") {
                item.name = "Battery test";
                if (item.value == "1") {
                    item.value2 = "fail"
                }
                if (item.value == "0") {
                    item.value2 = "pass"
                }
                if (item.value == "255") {
                    item.value2 = "has not yet performed"
                }
            } else if (item.code == "209") {
                item.name = "Charging test";
                if (item.value == "1") {
                    item.value2 = "fail"
                }
                if (item.value == "0") {
                    item.value2 = "pass"
                }
                if (item.value == "255") {
                    item.value2 = "has not yet performed"
                }
            } else {
                //
            }
        });
        return data;
    }

    //注册(4A)Mfg
    async function register() {
        if (!req.query.idCode) {
            sendLog("idCode must not be null");
            return;
        }
        try {
            var register_data = JSON.parse(req.query.data);
            if (register_data.length >= 0) {
                //
            } else {
                sendLog("data error");
                return;
            }
        } catch (err) {
            sendLog("register function error:" + err);
            return;
        }

        register_data = get_data(register_data);

        try {
            var result = await RegisterModel.findOne({
                BluetoothNumber: req.query.idCode
            });
            if (result) {
                sendLog("Barcode code already registered");
                return;
            }
            var result = await RegisterModel.findOne({
                BluetoothNumber: req.query.idCode,
                PCBNumber: req.query.idCode2
            });
            if (result) {
                sendLog("Two-dimensional code already registered");
                return;
            }

            var result = await new RegisterModel({
                BluetoothNumber: req.query.idCode,
                PCBNumber: req.query.idCode2,
                status: 0,
                SerialNumber: '',
                register_name: userObj.UserName,
                register_time: dtime().format('YYYY-MM-DD HH:mm:ss'),
                register_data: register_data,
                activate_name: "",
                activate_time: "",
                activate_data: [],
            }).save();

            //console.log(result);
            if (result) {
                sendLog("Success");
            } else {
                sendLog("Error");
            }
        } catch (err) {
            sendLog("register function error:" + err);
        }

    }



    //updateMfgTest
    async function updateMfgTest() {
        if (!req.query.idCode) {
            sendLog("idCode must not be null");
            return;
        }
        if (!req.query.idCode2) {
            sendLog("idCode2 must not be null");
            return;
        }
        try {
            var register_data = JSON.parse(req.query.data);
            if (register_data.length >= 0) {
                //
            } else {
                sendLog("data error");
                return;
            }
        } catch (e) {
            sendLog("data error");
            return;
        }

        register_data = get_data(register_data);

        try {
            var result = await RegisterModel.findOne({
                BluetoothNumber: req.query.idCode
            });
            if (!result) {
                sendLog("BluetoothNumber error");
                return;
            }
            var result = await RegisterModel.findOne({
                BluetoothNumber: req.query.idCode,
                PCBNumber: req.query.idCode2
            });
            if (!result) {
                sendLog("PCBNumber error");
                return;
            }
            if (result.status != 0) {
                sendLog("Can not update/禁止更新");
                return;
            }

            var result = await RegisterModel.update({
                BluetoothNumber: req.query.idCode
            }, {
                register_name: userObj.UserName,
                register_time: dtime().format('YYYY-MM-DD HH:mm:ss'),
                register_data: register_data,
            });
            if (result.n > 0) {
                sendLog("Success");
            } else {
                sendLog("result.n error");
            }
        } catch (err) {
            sendLog("updateMfgTest function error:" + err);
        }

    }


    //验证注册(4A)Mfg
    async function check_register() {
        //idCode=BluetoothNumber idCode2=PCBNumber
        if (!req.query.idCode) {
            sendLog("idCode must not be null");
            return;
        }
        try {
            var result = await RegisterModel.findOne({
                BluetoothNumber: req.query.idCode
            });
            if (!result) {
                var  obj= {"msg":"No registered",
                            "stadus":""};
                sendLog(obj);
                return;
            }
            var obj = {"msg":"Already registered", //0 注册成功 1/2 激活 3 incoming
                "stadus":result.status};
            sendLog(obj);
        } catch (err) {
            var obj = {"msg":"check_register function error:" + err,
                "stadus":''};
            sendLog(obj);
        }

    }


    //激活(4B)Final
    async function activate() {
        if (!req.query.idCode) {
            sendLog("idCode must not be null");
            return;
        }
        if (!req.query.serialNo) {
            sendLog("serialNo must not be null");
            return;
        }
        try {
            var activate_data = JSON.parse(req.query.data);
            if (activate_data.length >= 0) {
                //
            } else {
                sendLog("data error");
                return;
            }
        } catch (e) {
            sendLog("data error");
            return;
        }

        activate_data = get_data(activate_data);

        try {
            var result = await RegisterModel.findOne({
                BluetoothNumber: req.query.idCode
            });
            if (!result) {
                sendLog("No registered");
                return;
            }
            if(result.status != 3){
                sendLog('Please do Incoming first');
                return;
            }
            var result = await RegisterModel.findOne({
                BluetoothNumber: req.query.idCode,
                SerialNumber: req.query.serialNo
            });
            if (result) {
                sendLog("Already activated");
                return;
            }

            var activate_name = userObj.UserName;
            var activate_time = dtime().format('YYYY-MM-DD HH:mm:ss');
            var result = await RegisterModel.update({
                BluetoothNumber: req.query.idCode
            }, {
                SerialNumber: req.query.serialNo,
                status: 1,
                activate_name: activate_name,
                activate_time: activate_time,
                activate_data: activate_data
            });
            if (result.n > 0) {
                sendLog("Success");
            } else {
                sendLog("Error");
            }
        } catch (err) {
            sendLog("activate function error:" + err);
        }
    }


    //验证激活(4B)Final
    async function check_activate() {
        if (!req.query.idCode) {
            sendLog("idCode must not be null");
            return;
        }
        try {
            var result = await RegisterModel.findOne({
                BluetoothNumber: req.query.idCode,
                status: {
                    $gte: 1
                }
            });
            if (!result) {
                sendLog("No activated");
                return;
            }
            sendLog("Already activated");
        } catch (err) {
            sendLog("check_activate function error:" + err);
        }
    }


    //检查(4C)Incoming
    async function check_idCodes() {
        //idCode=BluetoothNumber idCode2=PCBNumber
        if (!req.query.idCode) {
            var obj = {"msg":"idCode must not be null"};
            sendLog(obj);
            return;
        }
        // if (!req.query.idCode2) {
        //     var obj = {"msg":"idCode2 must not be null"};
        //     sendLog(obj);
        //     return;
        // }
        try {
            var result = await RegisterModel.findOne({
                BluetoothNumber: req.query.idCode
            });
            if (!result) {
                var obj = {"msg":"Manufacturing data not found"};
                sendLog(obj);
                return;
            }
            // var result = await RegisterModel.findOne({
            //     BluetoothNumber: req.query.idCode,
            //     PCBNumber: req.query.idCode2
            // });
            // if (!result) {
            //     var obj = {"msg":"idCode2 no registered"};
            //     sendLog(obj);
            //     return;
            // }
            var result2 = [];
            result.register_data.forEach( function(item, index) {
                // if (item.code == "192") {
                //     if (item.value != "0") {
                //         result2.push(item);
                //     }
                // } else if (item.code == "193") {
                //     if (item.value != "0") {
                //         result2.push(item);
                //     }
                // } else if (item.code == "199") {
                //     if (item.value != "0") {
                //         result2.push(item);
                //     }
                // } else if (item.code == "200") {
                //     if (item.value != "0") {
                //         result2.push(item);
                //     }
                // } 
                if (item.code == "201") {
                    if (item.value != "0") {
                        result2.push(item);
                    }
                } else if (item.code == "202") {
                    if (item.value != "0") {
                        result2.push(item);
                    }
                } else if (item.code == "203") {
                    if (item.value != "0") {
                        result2.push(item);
                    }
                } else if (item.code == "204") {
                    if (item.value != "0") {
                        result2.push(item);
                    }
                } else if (item.code == "205") {
                    if (item.value != "0") {
                        result2.push(item);
                    }
                } else if (item.code == "206") {
                    if (item.value != "0") {
                        result2.push(item);
                    }
                } else if (item.code == "207") {
                    if (item.value != "0") {
                        result2.push(item);
                    }
                } else if (item.code == "208") {
                    if (item.value != "0") {
                        result2.push(item);
                    }
                } else if (item.code == "209") {
                    if (item.value != "0") {
                        result2.push(item);
                    }
                } else {
                    //
                }
            });

            // if(result2.length>0){
            //     var obj = {"msg":"Mfg Test Error", result: result2};
            //     sendLog(obj);
            //     return;
            // }
            var check_name = userObj.UserName;
            var check_time = dtime().format('YYYY-MM-DD HH:mm:ss');
            var result = await RegisterModel.update({
                BluetoothNumber: req.query.idCode
            }, {
                status :3,
                check_name: check_name,
                check_time: check_time
            });
            if (result.n > 0) {
                var obj = {"msg":"Success"};
                sendLog(obj);
            } else {
                var obj = {"msg":"result.n error"};
                sendLog(obj);
            }
        } catch (err) {
            var obj = {"msg":"check_idCodes function error"};
            sendLog(obj);

        }

    }



    //查询数据
    async function findData() {
        //console.log(req.query);
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
            var count = await RegisterModel.find(whereJson).count()
            var result = await RegisterModel.find(whereJson).skip(skipNum).limit(prePageNum).sort(sortJson).select(fieldJson);
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
            sendLog("findData function error");
        }
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

    //判断权限
    var action = req.body.action;
    var tableName = "registers";
    var result = await powerModel.getPower(userObj.Permission, tableName, action);
    //分配方法
    if (result) {
        switch (action) {
            case "delData":
                await delData();
                break;
            default:
                sendLog("action Error");
        }
    } else {
        sendLog("No Permissions");
        return;
    }


    async function delData() {
        if (req.body.dataJson) {
            try {
                var whereJson = JSON.parse(req.body.dataJson);
            } catch (e) {
                sendLog("dataJson error");
                return;
            }
        } else {
            sendLog("dataJson error");
            return;
        }
        try {
            var result = await RegisterModel.remove(whereJson);
            var result = await DeviceDataModel.remove(whereJson);
            sendLog("Success");
        } catch (err) {
            sendLog("findData delData error");
        }
    }


});


module.exports = router;