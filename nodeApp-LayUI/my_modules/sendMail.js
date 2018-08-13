const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');



//调用方法:sendMail({"to":"1533165086@qq.com","subject":"nodemailer测试","html":"<h2>hello</h2>"},function(err, info){ });

var email = {
    service: 'qq',
    user: '1533165085@qq.com',
    pass: 'kfcqwrxtqktabafh'  //授权码,通过QQ获取  
}

var transporter = nodemailer.createTransport({  
  service: email.service,  
  auth: {  
    user: email.user,  
    pass: email.pass 
  }  
}); 


//var mailOptions = {  
//  from: '1533165085@qq.com', // 发送者  
//  to: '1533165086@qq.com', // 接受者,多个以逗号隔开  
//  subject: 'nodemailer测试', // 标题  
//  html: `<h2>hello</h2>`   //内容
//}; 

var sendMail = function (mailOptions, callback) {
  mailOptions.from = email.user;
  transporter.sendMail(mailOptions, function (err, info) {  
     callback(err, info);
  }); 
}


module.exports = sendMail;

