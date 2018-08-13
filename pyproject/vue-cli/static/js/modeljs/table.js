define(["jquery","Vue"], function ($,Vue) {

  var int = function(data) {
  	 tabletag = {
		    template:`<h2>123 ${data.name_ch}</h2>`
		 }
	        
    var tableObj = new Vue({
        el:'#app',
        data:{
          
        },
        //components 注册组件
        components:{
          'tabletag': tabletag
        }
    });
  
  }

  
  
  //输出API
  return{
           int:int
        };
        
});   