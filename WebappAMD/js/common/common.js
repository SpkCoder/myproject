 // 存放公共js、函数、全局变量
    

      if(idStr==undefined)
      {
         alert("请先登录");
         window.location.href="/login.html";
      }
      
    





//index框架
 function frameSet()
   {
    
        var topHeight=$("html,body").height()-35;
        var lbHeight=$("html,body").height()-50-35;
        var listHeight=$("html,body").height()-50-40-35;
        var menuwidth = $(".index_top .left").width();
        var trWidth = $("html,body").width()-menuwidth;
        $(".index_top").css("height",topHeight);
        $(".left_body").css("height",lbHeight);
        $(".index_top .right").css("width",trWidth);
        $(".right_body").css("height",$("html,body").height()-50-35);
        $(".right_body .right_list").css("height",listHeight);
   

      if($("html,body").width()<=480)
      {
         
         $(".index_top .right").css({"left":"0","width":"100%"}); 
      }else{
      	 $(".index_top .right").css({"left":menuwidth,"width":trWidth});
      }

      if($("html,body").width()>=1280)
      {
         $(".right_header dl").removeClass("navMoble").addClass("nav");
         $(".right_header dl").css({"display":"block"});
      }else
      {
        $(".right_header dl").removeClass("nav").addClass("navMoble");
        $(".right_header dl").css({"display":"none"}); 
      }

      
   }

  











  $(window).on("load",function(){
  	
		if(window.location.href != http + "/page/index.html#/"){
			window.location.href="/page/index.html#/";
		}
   
		

      /*index_pc框架*/
      frameSet();
      
    
      
      


      /*左右toggle*/
       $(".toggle_icon").click(function(){
        
         var nowleft = parseInt($(".index_top .right").css("left"));
         var nowwidth = parseInt($(".index_top .left").width());
         var intwidth = parseInt($("html,body").width()-nowwidth);
         
         if(nowleft==nowwidth)
         {

            $(".index_top .right").animate({"left":"0","width":"100%"},500);
            $(".toggle_icon").removeClass("toggle_left").addClass("toggle_right");
            
         }else{
            $(".index_top .right").animate({"left":nowwidth+"px","width":intwidth+"px"},500);
            $(".toggle_icon").removeClass("toggle_right").addClass("toggle_left");
         }
       });
      
     
    

       
    

        
      //换肤
        var arrSkinHref = ['../css/skin_blue.css','../css/skin_green.css','../css/skin_gray.css','../css/skin_black.css']
        var skin = localStorage.getItem('skin');
        if(skin){
          $('#changeSkin').attr('href',skin+timeStamp);
        }else{
          $('#changeSkin').attr('href',arrSkinHref[0]+timeStamp);
        }
        //点击切换
        var arrSkin = $('.huanfu ul li');
        $.each(arrSkin,function(i){
          $(this).click(function(){
            $('#changeSkin').attr('href',arrSkinHref[i]+timeStamp);
            localStorage.setItem('skin',arrSkinHref[i]);
          });
        });
        
     

      //获取用户名
      var user = window.localStorage.getItem("user");
      if(user)
      {
        user=JSON.parse(user).user;
      }else
      {
        user="";
      }

      if($("html,body").width()>480){
        $('#user').html(user);
      }
      
        
      
      //密码
      var pwd = window.localStorage.getItem("pwd");
      if(pwd)
      {
        pwd=JSON.parse(pwd).pwd;
      }else
      {
        pwd="";
      }

     

      //修改密码
      $("#changePassword").click(function(){

             $(".passwordBox").show();
             $('.passwordBox .p1 span').html(user);
             $("#UpdatePassWord").attr("disabled","disabled");
             $(".passwordBox .p2 input").blur(function(){
                var oldpwd = $(".passwordBox .p2 input").val();
                if(oldpwd!=pwd)
                {
                   $(".passwordBox .p2 i").show();
                   $("#UpdatePassWord").attr("disabled","disabled");

                }else
                {
                   $(".passwordBox .p2 i").hide();
                   $("#UpdatePassWord").removeAttr("disabled");
                }

             });
             $(".passwordBox .p3 input").keyup(function(){
                var newpwd = $(".passwordBox .p3 input").val();
                var reg_pwd = /[0-9a-zA-Z]/;
                if(!reg_pwd.test(newpwd))
                {
                   $(".passwordBox .p3 i").show();
                   $("#UpdatePassWord").attr("disabled","disabled");

                }else
                {
                   $(".passwordBox .p3 i").hide();
                   $("#UpdatePassWord").removeAttr("disabled");
                   
                    var newpwd = $(".passwordBox .p3 input").val();
                    var aLvTxt = ['无','低','中','高'];
                    var lv = 0;
                    if(newpwd.match(/[a-z]/g)){lv++;}
                    if(newpwd.match(/[0-9]/g)){lv++;}
                    if(newpwd.match(/(.[^a-z0-9])/g)){lv++;}
                    if(newpwd.length >0 && newpwd.length < 6){lv=1;}
                    if(newpwd.length = 0){lv=0;}
                    if(lv > 3){lv=3;}
                    $(".passwordBox form .p4 i").html(aLvTxt[lv]);
                    $(".passwordBox form .p4 span").width(lv*30);

                }

             });
             
             $(".passwordBox .p5 input").blur(function(){
                var newpwd = $(".passwordBox .p3 input").val();
                var newpwd2 = $(".passwordBox .p5 input").val();
                if(newpwd2!=newpwd)
                {
                   $(".passwordBox .p5 i").show();
                   $("#UpdatePassWord").attr("disabled","disabled");

                }else
                {
                   $(".passwordBox .p5 i").hide();
                   $("#UpdatePassWord").removeAttr("disabled");
                }

             });


         
      });
       

       $("#ChaPassWord").click(function(){

         $(".passwordBox").hide();

      });

      $("#EscPassWord").click(function(){

         $(".passwordBox").hide();

      });
      

      $("#UpdatePassWord").click(function(){

            var newpwd = $(".passwordBox .p3 input").val();
            $.ajax({
              type: "GET",
              url: http + "/handler/system/user/list.ashx?"+idStr+"&oldpwd="+pwd+"&newpwd="+newpwd+"&action=UpdatePassWord&timeStamp="+ Date.parse(new Date()),
              dataType: "json",
              success: function (data, status, headers, config) {
                localStorage.removeItem("idStr");
                alert("修改成功");
                window.location.href="/login.html";
              },
              error: function (xhr) {
                  //alert("加载失败");  
              }
          });

      });
      
      //获取公司、部门树数据
    $.ajax({
        type: "GET",
        url: http+"/handler/system/dept/list.ashx?"+localStorage.getItem('idStr')+"&sortField=&searchCondition=dept_type=1&action=GetPage",
        dataType: "json"
    });
    $.ajax({
        type: "GET",
        url: http+"/handler/system/dept/list.ashx?"+localStorage.getItem('idStr')+"&sortField=&searchCondition=&action=GetPage",
        dataType: "json"
    });
      


    var showIpNum = localStorage.getItem("showIpNum");

    if(showIpNum==1){

         //显示用户信息
         setTimeout(function(){
       
                $.ajax({
                  type: "GET",
                  url: http+"/handler/system/user_login_status/list.ashx?"+idStr+"&field=ID,ip_location,create_time&sortField=&searchCondition=&pageNumber=1&pageSize=2&totalRecord=0&action=GetPage_2&timeStamp=" + Date.parse(new Date()),
                  dataType: "json",
                  success: function (data, status, headers, config) {
                    var ipList = data.rows;
                    $("#ipMeg .p1 .pan1").html(ipList[0].ip_location);
                    $("#ipMeg .p1 .pan2").html(ipList[0].create_time);
                    $("#ipMeg .p2 .pan1").html(ipList[1].ip_location);
                    $("#ipMeg .p2 .pan2").html(ipList[1].create_time);
                    $('#ipMeg').show();
                  },
                  error: function (xhr) {
                      //alert("加载失败");  
                  }
              });

                
         },3000);

          setTimeout(function(){
              $('#ipMeg').hide();
              localStorage.setItem('showIpNum', "2");
          },8000);

         $("#ipMeg h4 img").click(function(){
             $('#ipMeg').hide();
             localStorage.setItem('showIpNum', "2");
          });
   
   }

    
  });






  $(window).on("resize",function(){
       frameSet();
      
  });







   

   function appendfn(){
    
   
      /*左侧折叠菜单*/

       $(".leftmenu").find("dd").eq(0).find(".menuson").css("display","block");
       $(".leftmenu").find("dd").eq(0).find(".m-title1 span").addClass("jian");
      
       


        $('.leftmenu .m-title1').click(function(){

          var mul = $(this).next('ul');
          $(this).parents('dl').find('.menuson').slideUp();
          if(mul.is(':visible')){
            $(this).next('.menuson').slideUp();
            $(this).find('span').removeClass();

          }else{
            $(this).next('.menuson').slideDown();
              $(this).parents('dl').find('.m-title1 span').removeClass().addClass('jia');
            $(this).find('span').addClass('jian');
          }
        });


    


     /*leftmenu*/
    $(".leftmenu dd ul li a").click(function(){
      
           $(".nav dd").removeClass("curr");
           $(".leftmenu").find("dd").find("li").removeClass("curr");
           $(this).parent("li").addClass("curr");


    });

    
    
   
   
    /*top折叠菜单*/

    if($("html,body").width()<=1279)
     {


         $(".nav_icon").on("click",function(){
			
          if ($(this).hasClass("menuicon-out")) {
              $(this).removeClass("menuicon-out").addClass("menuicon-in");
          } else {
              $(this).removeClass("menuicon-in").addClass("menuicon-out");
          }
       

        if($(".right_header .navMoble").is(':visible')){
          $(".right_header .navMoble").removeClass("menufade");
          $(".right_header .navMoble").stop(true).slideUp();


        }else{
          $(".right_header .navMoble").stop(true).slideDown();
          $(".right_header .navMoble").addClass("menufade");
        }


       });


		setTimeout(function(){
			$(".right_header .navMoble dd").click(function(){
	           
	            if($(this).find(".nav_menu").is(":visible")){
	              $(this).find(".nav_menu").slideUp();
	            }else{
	              $(this).find(".nav_menu").slideDown();
	            }
	            $(this).siblings("dd").find(".nav_menu").slideUp();
	            
	       
	        });
		},200)



        window.addEventListener("popstate", function(e) {
            $(".right_header .navMoble").slideUp();
            $(".nav_icon").removeClass("menuicon-in").addClass("menuicon-out");

        }, false);


     }else{

         $(".nav dd ul li a").click(function(){
           
           $(".leftmenu").find("dd").find("li").removeClass("curr");
           $(".nav dd").removeClass("curr");
           $(this).parents("dd").addClass("curr");

         });

     }
    






    
    //获取待办事项总数
    $("#111300 a").append("<strong></strong>")
    var handlerUrl = ws+"/handler/websocket/work_wait.ashx?"+idStr+"&action=websocket";
    var webSocket;
    //如果WebSocket对象没有初始化，就给其初始化.
    if (webSocket == undefined) {
        webSocket = new WebSocket(handlerUrl);

        //发送数据.
        webSocket.onopen = function () {
            webSocket.send(idStr);
        };

        //收到的信息
        webSocket.onmessage = function (e) {
//      	alert(111);
        	$("#111300 a strong").html("("+e.data+")");
          
        	var vibrateSupport = "vibrate" in navigator;  
		    if (vibrateSupport) { //兼容不同的浏览器  
		        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;  
		    }  
        	
        	
        	if(e.data > 0){
        		if(window.ncp){
		    		window.ncp.callOnJs2(e.data);  //通过ncp代理调用android方法
		    	}else if(navigator.vibrate){
		    		navigator.vibrate(1000);
		    	  }
        	}
	    		
	        	
        	
        };

        //关闭.
        webSocket.onclose = function () {
//          alert("webscoket closed");
        };

        //报错.
        webSocket.onerror = function (e) {
//          alert(e.message);
        }
    }
    
     
    
    


	


    
}






//退出登陆
 function SignOut()
 {
      if(confirm('确定退出'))
      {
          $.ajax({
              type: "GET",
              url: http + "/handler/login/logout.ashx?action=logout&"+idStr+"&timeStamp="+ Date.parse(new Date()),
              dataType: "json",
              success: function (data, status, headers, config) {
              localStorage.removeItem("idStr");
              var login = localStorage.getItem("login");
              if(login=="login.html"){
                  window.location.href="/login.html";
              }
              if(login=="login2.html"){
                  window.location.href="/login2.html";
              }
              

              },
              error: function (xhr) {
                  //alert("加载失败");  
              }
          });
      }

      
}
 







//取消冒泡事件
function stopBubble(e)
{
    if(e && e.stopPropagation){
    //W3C取消冒泡事件
    e.stopPropagation();
    }else{
    //IE取消冒泡事件
    window.event.cancelBubble = true;
    }
}






//拖拽
function drag(inbox,outbox,limit)
{
   this.inbox=document.getElementById(inbox);
   if(outbox=="window")
   {
    this.outWidth=document.documentElement.clientWidth;
      this.outHeight=document.documentElement.clientHeight;
   }else
   {
      this.outbox=document.getElementById(outbox);
      this.outWidth=this.outbox.offsetWidth;
      this.outHeight=this.outbox.offsetHeight;
   }
   this.limit=limit;
   
}


drag.prototype.dragFn=function()
{
   var that=this;
   this.inbox.onmousedown=function(event)
   {   
       
     this.x=0;
     this.y=0;
     this.x=event.clientX-that.inbox.offsetLeft;
     this.y=event.clientY-that.inbox.offsetTop;
     var that2=this;
     document.onmousemove=function(event)
     {
          this.outX=event.clientX-that2.x;
      this.outY=event.clientY-that2.y;
      this.oWidth=that.outWidth-that.inbox.offsetWidth;
      this.oHeight=that.outHeight-that.inbox.offsetHeight;
      // console.log(oWidth+" "+oHeight);
      if(that.limit=="limitX")
      {
        if(this.outX<0)
        {
          this.outX=0;   //限制左边
        }
        else if (this.outX>this.oWidth)
        {
          this.outX=this.oWidth;   //限制右边
        }
      }else if(that.limit=="limitY")
      {
        if(this.outY<0)
        {
          this.outY=0;     
        }
        else if (this.outY>this.oHeight)
        {
          this.outY=this.oHeight; 
        }
      }else if(that.limit=="limitXY")
      {
        if(this.outX<0)
        {
          this.outX=0;  
        }
        else if (this.outX>this.oWidth)
        {
          this.outX=this.oWidth;   
        }
        if(this.outY<0)
        {
          this.outY=0;    
        }
        else if (this.outY>this.oHeight)
        {
          this.outY=this.oHeight;  
        }
      }
      
      that.inbox.style.left=this.outX+'px';
        that.inbox.style.top=this.outY+'px';
      
          
     };
     document.onmouseup=function(event)
     {
      document.onmousemove=null;
      document.onmouseup=null;  
     };
     
     return false;//解决firefox低版本的bug问题

   };

};


var NfcAdapter;
var NdefRecord;
var NdefMessage;
var waiting ;
var readyWriteData = false;
var readyRead = false;
function listenNFCStatus() {
    try{
        var main = plus.android.runtimeMainActivity();
        var Intent = plus.android.importClass('android.content.Intent');
        var Activity = plus.android.importClass('android.app.Activity');
        var PendingIntent = plus.android.importClass('android.app.PendingIntent');
        var IntentFilter = plus.android.importClass('android.content.IntentFilter');
        NfcAdapter = plus.android.importClass('android.nfc.NfcAdapter');
        var nfcAdapter = NfcAdapter.getDefaultAdapter(main);
        if(nfcAdapter == null){
			alert("设备不支持NFC！");
			return;
		}
		if (!nfcAdapter.isEnabled()) {
		
			alert("请在系统设置中先启用NFC功能！");
		
			return;
		
		}
        
        
        var intent = new Intent(main, main.getClass());
        intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
        var pendingIntent = PendingIntent.getActivity(main, 0, intent, 0);
        var ndef = new IntentFilter("android.nfc.action.TECH_DISCOVERED");
        ndef.addDataType("*/*");
        var intentFiltersArray = [ndef];
        var techListsArray = [
            ["android.nfc.tech.IsoDep"],
            ["android.nfc.tech.NfcA"],
            ["android.nfc.tech.NfcB"],
            ["android.nfc.tech.NfcF"],
            ["android.nfc.tech.Nfcf"],
            ["android.nfc.tech.NfcV"],
            ["android.nfc.tech.NdefFormatable"],
            ["android.nfc.tech.MifareClassi"],
            ["android.nfc.tech.MifareUltralight"]
        ];
        document.addEventListener("newintent",
            function() {
                console.log('newintent');
                setTimeout(handle_nfc_data1, 1000);
            }, false);
        document.addEventListener("pause", function(e) {
            if (nfcAdapter) {
                nfcAdapter.disableForegroundDispatch(main);
                console.log('pause');
            }
        }, false);
        document.addEventListener("resume", function(e) {
            if (nfcAdapter) {
                console.log('resume');
                nfcAdapter.enableForegroundDispatch(main, pendingIntent, intentFiltersArray, techListsArray);
            }
        }, false);
        nfcAdapter.enableForegroundDispatch(main, pendingIntent, intentFiltersArray, techListsArray);
    }catch(e){
        console.error(e);
    }
}

function handle_nfc_data1()
{
    NdefRecord = plus.android.importClass("android.nfc.NdefRecord");
    NdefMessage = plus.android.importClass("android.nfc.NdefMessage");
    var main = plus.android.runtimeMainActivity();
    var intent = main.getIntent();
    console.log("action type:" + intent.getAction());
    if("android.nfc.action.TECH_DISCOVERED" == intent.getAction()){
        if(readyWriteData){
            __write(intent);
            readyWriteData = false;
        }else if(readyRead){
            __read(intent);
            readyRead = false;
        }else{
        	waiting = plus.nativeUI.showWaiting("请勿移开标签\n正在读取数据...");
        	__read(intent);
        }
    }
}
function showToast(msg){
    plus.nativeUI.toast(msg);
}

function __write(intent){
    try{
        waiting.setTitle('请勿移开标签\n正在写入...');
        var text = document.getElementById('writeNfcData').value;
        console.log("text=" + text);
        var textBytes = plus.android.invoke(text,"getBytes");
        // image/jpeg text/plain
        var textRecord = new NdefRecord(NdefRecord.TNF_MIME_MEDIA,
                plus.android.invoke("text/plain","getBytes"), plus.android.invoke("","getBytes"), textBytes);
        var message = new NdefMessage([textRecord]);
        var Ndef = plus.android.importClass('android.nfc.tech.Ndef');
        var NdefFormatable = plus.android.importClass('android.nfc.tech.NdefFormatable');
        var tag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG);
        var ndef = Ndef.get(tag);
        if (ndef != null) {
            var size = message.toByteArray().length;
            console.log("size=" + size);
            ndef.connect();
            if (!ndef.isWritable()) {
                showToast("tag不允许写入");
                waiting.close();
                return ;
            }
            if (ndef.getMaxSize() < size) {
                showToast("文件大小超出容量");
                waiting.close();
                return ;
            }

            ndef.writeNdefMessage(message);
            waiting.close();
            showToast("写入数据成功.");
            return ;
        } else {
            var format = NdefFormatable.get(tag);
            if (format != null) {
                try {
                    format.connect();
                    format.format(message);
                    showToast("格式化tag并且写入message");
                    waiting.close();
                    return ;
                } catch (e) {
                    showToast("格式化tag失败.");
                    waiting.close();
                    return ;
                }
            } else {
                showToast("Tag不支持NDEF");
                waiting.close();
                return ;
            }
        }
    }catch(e){
        console.log("error=" + e);
        waiting.close();
        alert('写入失败');
    }

}



function __read(intent){
    waiting.setTitle('请勿移开标签\n正在读取数据...');
    var Parcelable = plus.android.importClass("android.os.Parcelable");
    var rawmsgs = intent.getParcelableArrayExtra("android.nfc.extra.NDEF_MESSAGES");
    records = rawmsgs[0].getRecords();
    var result = records[0].getPayload();
    var s = plus.android.newObject("java.lang.String",result);
    
    if(location.href !=httpBefore+"/page/index.html#/page/objects/NFC_write/list"){
		location.href ="/page/index.html#/page/objects/NFC_read/list/"+s;
	}else{
		document.getElementById('readNfcData').value = s;
	}
	waiting.close();
}
document.addEventListener('plusready',listenNFCStatus,false);






