<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="keywords" content="" />
<meta name="description" content="" />
<meta name="viewport" content="width=device-width,maximum-scale=1.0,initial-scale=1.0">
<title>纽莱可</title>
<link href="css/style.css" rel="stylesheet" type="text/css">
<link href="css/swiper.min.css" rel="stylesheet" type="text/css">
<link href="css/animate.css" rel="stylesheet" type="text/css">
<link rel="shortcut icon" href="favicon.ico">
<!--[if lte IE9]> 
<script src="js/html5shiv.js"></script>
<link href="css/html5shiv.css" rel="stylesheet" type="text/css"> 
<![endif]-->
</head>
<body>


<!--======head========--> 
<!--#include file="userkj/header2.asp"--> 






<!--======login========-->
<section class="login_b clearfix" >
  <div class="container clearfix">
     
<div class="box1">
        <ul class="clearfix">
          <li ><div>1</div><p>开启你的营养生活</p></li>
          <li class="selected"><div>2</div><p>完成注册</p></li>
        </ul>
      </div>
      
      
      
      <div class="box2">
        <p class="title">已有账号?  <a href="#" target="_self">立即登录</a></p>
        <aside class="aside_left">
            <img alt="" src="images/over.png" >
            <h4>恭喜您注册成功!</h4>
            <p><span id="second">5</span><span>S</span>后自动跳转 <a href="login.asp" target="_self">手动登录</a></p>
            <div><a href="#" target="_self">继续完善您的资料</a></div>
          </aside>
          
          <aside class="aside_right">
            <img alt="" src="images/wechat2.png" >
            <p>扫一扫关注纽莱可微信公众号<br>更加方便了解营养动态</p>
          </aside>
          
      </div>
      
  </div>
</section>
















<!--======foot ========--> 
<!--#include file="userkj/footer.asp"--> 


<script src="js/jquery-1.11.0.min.js" ></script> 
<script type="text/javascript">  
    
	var sec = document.getElementById("second");
	var i = 5;
	var timer = setInterval(function(){
		i--;
		sec.innerHTML = i;
		if(i==1){
			window.location.href = "login.asp";
		}
	},1000);
	 
	/*function goBack(){ 
	  window.history.go(-1);
	}  
*/  </script> 

<script src="js/common.js"></script> 
</body>
</html>
