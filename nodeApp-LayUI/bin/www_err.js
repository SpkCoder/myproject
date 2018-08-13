const sendMail = require("../my_modules/sendMail.js");
process.on('message', function(megObj){
	console.log('message from parent: ' + megObj.meg);
	sendMail({"to":"1533165085@qq.com","subject":"nodeApp-LayUI exit","html":megObj.meg},function(err, info){ 
		if(err){
			console.log(err);
			process.send({"meg": 'www_err发送邮件失败'});
			return;
		}
		process.send({"meg": 'www_err发送邮件成功'});
	});
});

