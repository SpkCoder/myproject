

$(function(){

 var loginUrl = localStorage.getItem("login");
//更换LOGO
var website = window.location.href;
if(loginUrl=="login.html")
{
  $("#headTitle").html("广东中远船务");
  $("#headLink").attr("href","zyfavicon.ico");
  $(".login .message img").attr("src","images/zyLogo.png");
  $(".login .message span").html("广东中远船务工程有限公司");
  $(".left_header img").attr("src","../images/zyLogo2.png");
  
}
// if(/login.html/.test(website))
// {
//   $("#headTitle").html("中远海运重工");
//   $(".login .message img").attr("src","images/zyLogo.png");
//   $(".login .message span").html("广东中远船务工程有限公司");
//   $(".left_header img").attr("src","../images/zyLogo2.png");
  
// }


if(loginUrl=="login2.html")
{
  $("#headTitle").html("益尔智控");
  $("#headLink").attr("href","yefavicon.ico");
  $(".login .message img").attr("src","images/yetecLogo.png");
  $(".login .message span").html("益尔智控技术有限公司");
  $(".left_header img").attr("src","../images/yetecLogo2.png");
  $(".listPage .welcome h3").html("欢迎来到武钢第三炼钢厂设备管理平台");

  
}

// if(/login2.html/.test(website))
// {
//   $("#headTitle").html("益尔智控");
//   $(".login .message img").attr("src","images/yetecLogo.png");
//   $(".login .message span").html("益尔智控技术有限公司");
//   $(".left_header img").attr("src","../images/yetecLogo2.png");
  
// }





});