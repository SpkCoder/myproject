const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');



//调用方法:sendMail({"to":"1533165086@qq.com","subject":"nodemailer测试","html":"<h2>hello</h2>"},function(err, info){ });

//var email = {
//  service: 'qq',
//  host: "smtp.qq.com",
//  user: '1533165085@qq.com',
//  pass: 'kfcqwrxtqktabafh'  //授权码,通过QQ获取  
//}

var email = {
    service: 'gmail',
    host: "pop.gmail.com",
    port: 465,
    user: 'touchhk11@gmail.com',
    pass: 'Welc@me123'  
}
//https://myaccount.google.com/lesssecureapps 开启非安全

var transporter = nodemailer.createTransport({  
  service: email.service, 
  host: email.host, 
  port: email.port, 
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

//var dataJson = {"to":"1533165085@qq.com","subject":"nodemailer测试","html":"<h2>hello</h2>"};
//sendMail(dataJson,function(err, info){ 
//		  if(err){
//		  	console.log('sendMail Error:'+ err);
//			return;
//		  }
//		  console.log("发送邮件成功");
//		  res.send("发送邮件成功");
//});
		
module.exports = sendMail;

