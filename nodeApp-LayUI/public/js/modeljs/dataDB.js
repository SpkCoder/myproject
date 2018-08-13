layui.define(["jquery"],function(exports){
  var $ = layui.$; 
  
  function dataDB() {
     var _this = this;
     this.headObj = {};
     this.getcolArr = function (data) {
        if(typeof data != "object"){
          return;
        }
        var headObj = {};
        var colArr = [];
        var field_en_Arr = data.field_en.split(";");
        var field_ch_Arr = data.field_ch.split(";");
        var data_type_Arr = data.data_type.split(";");
        var field_width_Arr = data.field_width.split(";");
        if(field_en_Arr.length > 0){
          colArr.push({type:'checkbox', fixed: 'left'});
          for(let i = 0; i < field_en_Arr.length; i++){
             colArr.push({field: field_en_Arr[i], title: field_ch_Arr[i], width:field_width_Arr[i], sort: true});
          }
          colArr.push({fixed: 'right', width: 150, align:'center', toolbar: '#barDemo'});
        }
        headObj.field_en_Arr = field_en_Arr;
        headObj.field_ch_Arr = field_ch_Arr;
        headObj.data_type_Arr = data_type_Arr;
        headObj.field_width_Arr = field_width_Arr;
        headObj.colArr = colArr;
        this.headObj = headObj;
     }
  	 this.get = function (url,reqData,callback) {
       $.ajax({
              url: url+"?"+reqData,
              type: "GET",
              dataType:"text",
              success: function (data,status,xhr) {
                try {data = JSON.parse(data) } catch(e) {console.log(e)}
                //console.log("dataDB.get请求成功");
                //console.log(data);
                if(callback){
                  _this.getcolArr(data);
                  callback(data, _this.headObj);
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
  

  
  var dataDB = new dataDB();
  
    
  //输出API
  exports('dataDB', dataDB);
});   