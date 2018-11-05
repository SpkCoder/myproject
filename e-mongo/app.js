const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const urlSettings = require("./my_modules/urlSettings");



const app = express();



// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//longintest
app.all('*',function(req,res,next){
//  console.log(req.path);
//  console.log(req.cookies);
    
    //允许跨域
//  res.header('Access-Control-Allow-Credentials', 'true');
//  res.header('Access-Control-Allow-Origin', "http://localhost:8080");
//  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
	if(req.path == "/nodejs/login"){
	    next();
	    return;
	}
	if(req.cookies["logining"] != null){
	      next();
	      return;
	}
	//console.log("没有登录，请先登录");
	//res.redirect('/login.html?'+Date.now());
	res.send("No login, please Sign in");
		
});



//router
const routerUrls = urlSettings.routerUrls;
for(let i = 0; i < routerUrls.length; i++){
	app.use(routerUrls[i].reqUrl, require(routerUrls[i].resUrl));
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  var fileName = path.join(__dirname, 'public/error.html');
  res.status(err.status || 500);
  res.sendFile(fileName, function (err2) {
    if (err2) {
      console.log(err2);
    }else {
      console.log('sendFile:', fileName);
    }
  });
});

module.exports = app;
