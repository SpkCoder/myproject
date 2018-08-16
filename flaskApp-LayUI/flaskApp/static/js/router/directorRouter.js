layui.define(["jquery"],function(exports){
    //console.log('directorRouter.js');
    var $ = layui.$; 
  
    function getHTML(url) {
        $.ajax({
                url: url,
                type: "GET",
                dataType:"html",
                success: function (data,status,xhr) {
                  //console.log(url);
                  $("#layUI_routerView").attr("data-href",url);
                  $("#layUI_routerView").html(data);
                  //初始化当前页
                  var this_href = "#"+url.split(".html")[0].replace(/\/static/,"");
                  var this_a = $(".layui-nav a[href='"+this_href+"']");
                  if(this_a.length == 0){return;}
                  var this_dd = this_a.parents("dd");
                  var this_li = this_a.parents("li");
                  var this_ul = this_a.parents("ul");
                  
                  if(this_ul.hasClass("leftNav")){
                    $(".layui-layout-left li dl dd").removeClass("layui-this");
                    this_li.addClass("layui-nav-itemed");
                    this_li.find("dl").css("display","block");
                    this_dd.addClass("layui-this");
                  }
                  if(this_ul.hasClass("topNav")){
                    $(".layui-nav-tree li").removeClass("layui-nav-itemed");
                    $(".layui-nav-tree li dl").css("display","none");
                    $(".layui-nav-tree li dl dd").removeClass("layui-this");
                    //this_li.addClass("");
                    this_dd.addClass("layui-this");
                  }
                  //初始化当前页结束
                },
                error: function (xhr,status,error) {
                  console.log("Err:getHTML");
                }
        });
    };

    var routerObj = {};
    routerUrl.forEach(function (item,index) {
    	if(item == "/page/data_list_detail/:id"){
    		routerObj[item] = function (id) { getHTML("/static" + "/page/data_list_detail.html?"+id);}
    	}else{
    		routerObj[item] = function () { getHTML("/static" + item + ".html");}
    	}
    });

 
 
   //console.log(routerObj);
   var router = new Router(routerObj);
   //router.init();



  //输出API
  exports('directorRouter',  router);
});   