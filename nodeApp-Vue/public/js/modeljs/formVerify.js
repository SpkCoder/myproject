define(["jquery"], function ($) {
    var rules = function (row,data) {
      var obj = {};
      for(item in row){
      	var index = data.field_en.indexOf(item);
      	var data_type = data.data_type[index];
      	if(data_type == "text"){
      		obj[item] = [
      		   { validator: function(rule, value, callback) {
					if(/['|"]+/.test(value)){
				      return callback(new Error('输入的文本不能包含英文单引号或双引号'));
				    }
					callback();
				  }, 
	              trigger: 'blur' 
	            }
      		]
      	}else if(data_type == "textarea"){
      	    obj[item] = [
      		   { validator: function(rule, value, callback) {
					if(/['|"]+/.test(value)){
				      return callback(new Error('输入的文本不能包含英文单引号或双引号'));
				    }
					callback();
				  }, 
	              trigger: 'blur' 
	            }
      		]
        }else if(data_type == "int"){
      	    obj[item] = [
      		   { validator: function(rule, value, callback) {
					if(! /^[1-9][0-9]*$/.test(value)){
				      return callback(new Error('请输入正整数'));
				    }
					callback();
				  }, 
	              trigger: 'blur' 
	            }
      		]
        }else if(data_type == "int(6)"){
      	    obj[item] = [
      		   { validator: function(rule, value, callback) {
					if(! /^[1-9][0-9]{5}$/.test(value)){
				      return callback(new Error('请输入6位正整数'));
				    }
					callback();
				  }, 
	              trigger: 'blur' 
	            }
      		]
        }else if(data_type == "decimal(2)"){
      	    obj[item] = [
      		   { validator: function(rule, value, callback) {
					if(! /^[1-9]*[0]?\.[0-9]{2}$/.test(value)){
				      return callback(new Error('请保留2位小数'));
				    }
					callback();
				  }, 
	              trigger: 'blur' 
	            }
      		]
        }else if(data_type == "decimal(4)"){
      	    obj[item] = [
      		   { validator: function(rule, value, callback) {
					if(! /^[1-9]*[0]?\.[0-9]{4}$/.test(value)){
				      return callback(new Error('请保留4位小数'));
				    }
					callback();
				  }, 
	              trigger: 'blur' 
	            }
      		]
        }else if(data_type == "date(YYYY-MM-DD HH:mm:ss)"){
      	    obj[item] = [
      		   { validator: function(rule, value, callback) {
					 if(! /^[0-9]{4}-[0-9]{2}-[0-9]{2}[ ][0-6]{2}:[0-6]{2}:[0-6]{2}$/.test(value)){
				      return callback(new Error('请保留4位小数'));
				    }
					callback();
				  }, 
	              trigger: 'blur' 
	            }
      		]
        }else if(data_type == "date(YYYY)"){
      	    obj[item] = [
      		   { validator: function(rule, value, callback) {
					 if(! /^[0-9]{4}$/.test(value)){
				      return callback(new Error('请保留4位小数'));
				    }
					callback();
				  }, 
	              trigger: 'blur' 
	            }
      		]
        }else if(data_type == "date(YYYY-MM)"){
      	    obj[item] = [
      		   { validator: function(rule, value, callback) {
					 if(! /^[0-9]{4}-[0-9]{2}$/.test(value)){
				      return callback(new Error('请保留4位小数'));
				    }
					callback();
				  }, 
	              trigger: 'blur' 
	            }
      		]
        }else if(data_type == "date(YYYY-MM-DD)"){
      	    obj[item] = [
      		   { validator: function(rule, value, callback) {
					 if(! /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value)){
				      return callback(new Error('请保留4位小数'));
				    }
					callback();
				  }, 
	              trigger: 'blur' 
	            }
      		]
        }else if(data_type == "date(HH:mm:ss)"){
      	    obj[item] = [
      		   { validator: function(rule, value, callback) {
					 if(! /^[0-6]{2}:[0-6]{2}:[0-6]{2}$/.test(value)){
				      return callback(new Error('请保留4位小数'));
				    }
					callback();
				  }, 
	              trigger: 'blur' 
	            }
      		]
        }
      }

      return obj;
      
    }
    
  //输出API
   return{
       rules:rules
   };
});   