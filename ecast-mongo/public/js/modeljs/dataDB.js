define(["jquery"], function ($) {
  
  function dataDB() {
  	 this.get = function (url,reqData,callback) {
       $.ajax({
              url: url+"?"+reqData,
              type: "GET",
              dataType:"text",
              success: function (data,status,xhr) {
                try {data = JSON.parse(data) } catch(e) {
                	//console.log(e)
                }
                
                //console.log("dataDB.get请求成功");
//              console.log(data);
                if(callback){
                  callback(data);
                }
              },
              error: function (xhr,status,error) {
                console.log("dataDB.get请求失败"); 
              }
        });
     }
     this.post = function (url,reqData,callback) {
         $.ajax({
              url: url,
              type: "POST",
              data: reqData,
              dataType:"text",
              success: function (data,status,xhr) {
              	try {data = JSON.parse(data) } catch(e) {
              		//console.log(e)
              	}
              	
                //console.log("dataDB.post请求成功");
                //console.log(data);
                if(callback){
                  callback(data);
                }
              },
              error: function (xhr,status,error) {
                console.log("dataDB.post请求失败"); 
              }
        });
     }
  }
  
  //查询数据
  dataDB.prototype.findData = function(url,reqData,callback){
  	    this.get(url,reqData,callback);
  };

  //插入数据
  dataDB.prototype.insertData = function(url,reqData,callback){
        this.post(url,reqData,callback);
  };
  
  //修改数据
  dataDB.prototype.updateData = function(url,reqData,callback){
        this.post(url,reqData,callback);
  };

  //删除数据
  dataDB.prototype.delData = function(url,reqData,callback){
        this.post(url,reqData,callback);
  };
  

  
  var int = new dataDB();
  
  
  
  //输出API
  return{
           int:int
        };
        
});   