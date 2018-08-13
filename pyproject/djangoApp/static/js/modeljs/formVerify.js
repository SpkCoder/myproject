layui.define(['jquery', 'form'],function(exports){
    var $ = layui.$; 
    var form = layui.form; 
    var fn = function () {
      form.verify({
			  "text": function(value, item){ //value：表单的值、item：表单的DOM对象
			    if(/['|"]+/.test(value)){
			      return '输入的文本不能包含英文单引号或双引号';
			    }
			  },
			  "textarea": function(value, item){ 
			    if(/['|"]+/.test(value)){
			      return '输入的文本不能包含英文单引号或双引号';
			    }
			  },
			  "int": function(value, item){ 
			    if(! /^[1-9][0-9]*$/.test(value)){
			      return '请输入正整数';
			    }
			  },
			  "int(6)": function(value, item){ 
			    if(! /^[1-9][0-9]{5}$/.test(value)){
			      return '请输入6位正整数';
			    }
			  },
			  "decimal(2)": function(value, item){ 
			    if(! /^[1-9]*[0]?\.[0-9]{2}$/.test(value)){
			      return '请保留2位小数';
			    }
			  },
			  "decimal(4)": function(value, item){ 
			    if(! /^[1-9]*[0]?\.[0-9]{4}$/.test(value)){
			      return '请保留4位小数';
			    }
			  },
			  "date(YYYY-MM-DD HH:mm:ss)": function(value, item){ 
			    if(! /^[0-9]{4}-[0-9]{2}-[0-9]{2}[ ][0-6]{2}:[0-6]{2}:[0-6]{2}$/.test(value)){
			      return '请输入正确格式';
			    }
			  },
			  "date(YYYY)": function(value, item){ 
			    if(! /^[0-9]{4}$/.test(value)){
			      return '请输入正确格式';
			    }
			  },
			  "date(YYYY-MM)": function(value, item){ 
			    if(! /^[0-9]{4}-[0-9]{2}$/.test(value)){
			      return '请输入正确格式';
			    }
			  },
			  "date(YYYY-MM-DD)": function(value, item){ 
			    if(! /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value)){
			      return '请输入正确格式';
			    }
			  },
			  "date(HH:mm:ss)": function(value, item){ 
			    if(! /^[0-6]{2}:[0-6]{2}:[0-6]{2}$/.test(value)){
			      return '请输入正确格式';
			    }
			  }
		});
    }
    
  //输出API
  exports('formVerify', fn);
});   