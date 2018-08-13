define(['jquery','director'], function ($, director) {
    //console.log('directorRouter.js');
  
    function getHTML(url) {
        $.ajax({
                url: url,
                type: "GET",
                dataType:"html",
                success: function (data,status,xhr) {
//                console.log(data);
                  str_html = data.split(/<script[^>]*?>[\s\S]*?/)[0];
                  var reg=/<script[^>]*?>[\s\S]*?<\/script>/i;
                  var str = reg.exec(data)[0];
				  var str_script=str.substring(str.indexOf(">")+1,str.lastIndexOf("<"))
//				  console.log(str_script);
                  $("#Vue_routerView").attr("data-href",url);
//                $("#Vue_routerView").html(data); //不兼容Safari9.1
                  document.getElementById("Vue_routerView").innerHTML = data.split(/<script[^>]*?>[\s\S]*?/)[0];

                  var s = document.createElement('script');
                  s.type = 'text/javascript';
				  s.innerHTML = str_script;
				  document.getElementById("Vue_routerView").appendChild(s);
                  
                  
                  //初始化当前页
                  var this_href = "#"+url.split(".html")[0];
                  setTimeout(function(){
                      var this_a = $(".nav a[href='"+this_href+"']");
	                  if(this_a.length == 0){return;}
	                  var this_dd = this_a.parents("dd");
	                  var this_li = this_a.parents("li");
	                  var this_ul = this_a.parents("ul");
	                  
	                  if(this_ul.attr("id") == "topNav"){
	                    $(".nav li").removeClass("actived");
	                    $(".nav li dl dd").removeClass("selected");
	                    
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
    	if(/:id$/.test(item)){
    		routerObj[item] = function (id) { getHTML(item.split("/:")[0] + ".html?" +id);}
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

