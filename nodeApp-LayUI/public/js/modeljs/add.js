layui.define(["jquery"],function(exports){
    var $ = layui.$; 
    var fn = function (a,b) {
      return a+b;
    }
    
  //输出API
  exports('add', fn);
});   