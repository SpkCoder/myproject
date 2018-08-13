define(['jquery','director'], function ($) {
    //console.log('directorRouter.js');
  
    function getHTML(url) {
        $.ajax({
                url: url,
                type: "GET",
                dataType:"html",
                success: function (data,status,xhr) {
                  //console.log(url);
                  $("#Vue_routerView").attr("data-href",url);
                  $("#Vue_routerView").html(data);
                  //初始化当前页
                  var this_href = "#"+url.split(".html")[0];
                  setTimeout(function(){
                      var this_a = $(".nav a[href='"+this_href+"']");
	                  if(this_a.length == 0){return;}
	                  var this_dd = this_a.parents("dd");
	                  var this_li = this_a.parents("li");
	                  var this_ul = this_a.parents("ul");
	                  
	                  if(this_ul.attr("id") == "leftNav"){
	                  
	                    $("#topNave li dl dd").removeClass("selected");
	                    $("#topNave li").removeClass("actived");
	                    
	                    $(".aside-left .nav li dl dd").removeClass("selected");
	                    this_li.addClass("actived");
	                    this_li.find("dl").css("display","block");
	                    this_dd.addClass("selected");
	                  }
	                  if(this_ul.attr("id") == "topNav"){
	                    $(".aside-left .nav li").removeClass("layui-nav-itemed");
	                    $(".aside-left .nav li dl").css("display","none");
	                    $(".aside-left .nav li dl dd").removeClass("selected");
	                    
	                    this_dd.addClass("selected");
	                    this_li.addClass("actived");
	                  }
                  
                  },200);
                  
                  //初始化当前页结束
                },
                error: function (xhr,status,error) {
                  console.log("Err:getHTML");
                }
        });
    };

    var routerObj = {};
    routerUrl.forEach(function (item,index) {
    	if(item == "/page/dataListDetail/:id"){
    		routerObj[item] = function (id) { getHTML("/page/dataListDetail.html?"+id);}
    	}else{
    		routerObj[item] = function () { getHTML(item + ".html");}
    	}
    });

 
 
   //console.log(routerObj);
   var router = new Router(routerObj);
   //router.init();



  //输出API
  return{'router': router};
  
});   

