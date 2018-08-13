/**
 * Created by dick on 2017/3/22.
 */
var rand = Math.random();



function check_user(){
    var user = $("#user").val();
    var reg=/^[a-zA-Z0-9]{8,16}$/;
    if(reg.test(user)){
        $("#ale").css("display","none")
    }else{
        $("#ale").css("display","block")
    }
}
function check_pwd(){
    
    $("#aletr").css("display","none");
    var reg=/^[a-zA-Z0-9]{6,12}$/;
    var pwd = $("#pwd").val();
    if(reg.test(pwd)){
        $("#alee").css("display","none")
    }else{
        $("#alee").css("display","block")
    }

}
// function check_code(){
//     var reg=/^[a-zA-Z0-9]{4}$/;
//     var txtCheckCode = $("#txtCheckCode").val();
//     if(reg.test(txtCheckCode)){
//         $("#aleee").css("display","none")
//     }else{
//         $("#aleee").css("display","block")
//     }
// }

$(document).ready(function () {

    var user_show = window.localStorage.getItem("user_show");
    var pwd_show = window.localStorage.getItem("pwd_show");
    //验证函数暂时不执行
    //ReloadCheckCode();
    $("#user").focus();
    if(user_show){
        var json1 = JSON.parse(user_show);
        var json2 = JSON.parse(pwd_show);
        $("#user").val(json1.user_show);
        $("#pwd").val(json2.pwd_show);
        $("#user").blur();
        $("#che1").attr('checked', true);
        $("#che2").attr('checked', true);
    }


});





$('#bt-login').click(function(){
    
    var user =document.getElementById("user")
    var pwd =document.getElementById("pwd")
    if(user.validity.valid && pwd.validity.valid){
        var user1=$("#user").val();
        var pwd1 = $("#pwd").val();
        //var txtCheckCode = $("#txtCheckCode").val();
        var scheight = screen.height || $("html,body").height();
        var scwidth = screen.width || $("html,body").width();
        var postParams = "user_code=" + user1 + "&password=" + pwd1 + "&code=" + "&r=" + rand + "&scheight=" + scheight + "&scwidth=" + scwidth;
        //console.log(postParams);
        var url=http+"/handler/login/login.ashx?"+postParams;
        // alert(url);
        $.ajax({
            url:url,
            type: "GET",
            dataType: "text",
            success: function (data) {
//          	alert(data);
                var urlArr=data.split("|");
                var code = urlArr[0];
                if(code=="00"){
                    var urlArr2 = urlArr[1].split("?");
                    var href1=urlArr2[0];
                    var idStr = urlArr2[1];
                    
                    var che1 = document.getElementById("che1");
                    var che2 = document.getElementById("che2");

                    var user = $("#user").val();
                    var user_json1 = {
                        "user": user,
                    }
                    var user_json2 = {
                        "user_show": user,
                    }
                    var jsonString1 = JSON.stringify(user_json1);
                    var jsonString2 = JSON.stringify(user_json2);
                    if (che1.checked) {
                        
                        window.localStorage.setItem('user', jsonString1);
                        window.localStorage.setItem('user_show', jsonString2);

                    }else
                    {
                        window.localStorage.setItem('user', jsonString1);
                        window.localStorage.setItem('user_show', "");
                    }

                    var pwd = $("#pwd").val();
                    var pwd_json1 = {
                        "pwd": pwd
                    }
                    var pwd_json2 = {
                        "pwd_show": pwd
                    }
                    var jsonString1 = JSON.stringify(pwd_json1);
                    var jsonString2 = JSON.stringify(pwd_json2);
                    if (che2.checked) {
                        
                        window.localStorage.setItem('pwd', jsonString1);
                        window.localStorage.setItem('pwd_show', jsonString2);

                    }else
                    {
                        window.localStorage.setItem('pwd', jsonString1);
                        window.localStorage.setItem('pwd_show', "");
                    }

                     var loginURL = window.location.href;

                   
                    if(/login2.html/.test(loginURL))
                    {
                        localStorage.setItem('login', "login2.html");
                    }else{
                        localStorage.setItem('login', "login.html");
                    }

                    localStorage.setItem('showIpNum', "1");

                    
                    //跳转
                    localStorage.setItem('idStr', idStr);
                   window.location.href=href1;

                }else{
                    var a=urlArr[1];
                    $("#aletr").html(a);
                    $("#aletr").css("display","block");
                    
                }



            },
            error: function (r) {
                console.log("密码或用户名错误");
                
            }
        });

    }
});




//版本更新
if(window.ncp){
	var versionsAPP = window.ncp.callOnJs();  //通过ncp代理调用android方法获取版本号
	
	//获取系统中的版本号
	if(idStr){
		$.get(http + "/handler/system/version/list.ashx?" + idStr +"&field=&sortField=&searchCondition=&pageNumber=1&pageSize=10&totalRecord=0&action=GetPage",function(data,status){ 
	   		 data = JSON.parse(data);
	   		 var versions = data.rows[0].versions;
	   		 if(versionsAPP*100 < versions*100){
	   		 	if(confirm("有新的软件版本，是否更新？")){
	   		 		var u = navigator.userAgent;
					var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
					var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
					if(isAndroid){
						window.location.href = http + data.rows[1].download_url;
					}else if(isiOS){
						window.location.href = http + data.rows[0].download_url;
					}
	   		 		
	   		 	}
	   		 }
	   		 
	    });
	}
		
}

var wgtVer = null;  
function plusReady(){  
    // 获取本地应用资源版本号  
    plus.runtime.getProperty(plus.runtime.appid,function(inf){  
        wgtVer=inf.version;  
        //获取系统中的版本号
		if(idStr){
			$.get(http + "/handler/system/version/list.ashx?" + idStr +"&field=&sortField=&searchCondition=&pageNumber=1&pageSize=10&totalRecord=0&action=GetPage",function(data,status){ 
		   		 data = JSON.parse(data);
		   		 var versions = data.rows[0].versions;
		   		 if(wgtVer*100 < versions*100){
		   		 	if(confirm("有新的软件版本，是否更新？")){
		   		 		var u = navigator.userAgent;
						var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
						var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
						if(isAndroid){
							window.location.href = http + data.rows[1].download_url;
						}else if(isiOS){
							window.location.href = http + data.rows[0].download_url;
						}
		   		 	}
		   		 }
		   		 
		    });
		}
    });  
}  
  
if(window.plus){  
    plusReady();  
}else{  
    document.addEventListener('plusready',plusReady,false);  
}  





















/**
 * Created by dick on 2017/3/21.
 */
