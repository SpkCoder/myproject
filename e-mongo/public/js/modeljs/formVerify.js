define(["jquery"], function ($) {
    var rules = function (row,colArr) {
      var obj = {};
      for(var i = 0; i < colArr.length; i++){
      	var field = colArr[i].field;
      	var data_type = colArr[i].data_type;
      	if(row[field] != null){
      		if(data_type == "text"){
	      		obj[field] = [
	      		   { validator: function(rule, value, callback) {
						if(/['|"]+/.test(value)){
					      return callback(new Error('The input text does not contain single quotes or double quotes'));
					    }
						callback();
					  }, 
		              trigger: 'blur' 
		            }
	      		]
	      	}else if(data_type == "textarea"){
	      	    obj[field] = [
	      		   { validator: function(rule, value, callback) {
						if(/['|"]+/.test(value)){
					      return callback(new Error('The input text does not contain single quotes or double quotes'));
					    }
						callback();
					  }, 
		              trigger: 'blur' 
		            }
	      		]
	        }else if(data_type == "int"){
	      	    obj[field] = [
	      		   { validator: function(rule, value, callback) {
						if(! /^[1-9][0-9]*$/.test(value)){
					      return callback(new Error('Please enter a positive integer'));
					    }
						callback();
					  }, 
		              trigger: 'blur' 
		            }
	      		]
	        }else if(data_type == "int(6)"){
	      	    obj[field] = [
	      		   { validator: function(rule, value, callback) {
						if(! /^[1-9][0-9]{5}$/.test(value)){
					      return callback(new Error('Please enter 6 positive integers'));
					    }
						callback();
					  }, 
		              trigger: 'blur' 
		            }
	      		]
	        }else if(data_type == "decimal(2)"){
	      	    obj[field] = [
	      		   { validator: function(rule, value, callback) {
						if(! /^[1-9]*[0]?\.[0-9]{2}$/.test(value)){
					      return callback(new Error('Please keep 2 decimal numbers'));
					    }
						callback();
					  }, 
		              trigger: 'blur' 
		            }
	      		]
	        }else if(data_type == "decimal(4)"){
	      	    obj[field] = [
	      		   { validator: function(rule, value, callback) {
						if(! /^[1-9]*[0]?\.[0-9]{4}$/.test(value)){
					      return callback(new Error('Please keep 4 decimal numbers'));
					    }
						callback();
					  }, 
		              trigger: 'blur' 
		            }
	      		]
	        }else if(data_type == "date(YYYY-MM-DD HH:mm:ss)"){
	      	    obj[field] = [
	      		   { validator: function(rule, value, callback) {
						 if(! /^[0-9]{4}-[0-9]{2}-[0-9]{2}[ ][0-6]{2}:[0-6]{2}:[0-6]{2}$/.test(value)){
					      return callback(new Error('Please input format(YYYY-MM-DD HH:mm:ss)'));
					    }
						callback();
					  }, 
		              trigger: 'blur' 
		            }
	      		]
	        }else if(data_type == "date(YYYY)"){
	      	    obj[field] = [
	      		   { validator: function(rule, value, callback) {
						 if(! /^[0-9]{4}$/.test(value)){
					      return callback(new Error('Please input format(YYYY)'));
					    }
						callback();
					  }, 
		              trigger: 'blur' 
		            }
	      		]
	        }else if(data_type == "date(YYYY-MM)"){
	      	    obj[field] = [
	      		   { validator: function(rule, value, callback) {
						 if(! /^[0-9]{4}-[0-9]{2}$/.test(value)){
					      return callback(new Error('Please input format(YYYY-MM)'));
					    }
						callback();
					  }, 
		              trigger: 'blur' 
		            }
	      		]
	        }else if(data_type == "date(YYYY-MM-DD)"){
	      	    obj[field] = [
	      		   { validator: function(rule, value, callback) {
						 if(! /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value)){
					      return callback(new Error('Please input format(YYYY-MM-DD)'));
					    }
						callback();
					  }, 
		              trigger: 'blur' 
		            }
	      		]
	        }else if(data_type == "date(HH:mm:ss)"){
	      	    obj[field] = [
	      		   { validator: function(rule, value, callback) {
						 if(! /^[0-6]{2}:[0-6]{2}:[0-6]{2}$/.test(value)){
					      return callback(new Error('Please input format(HH:mm:ss)'));
					    }
						callback();
					  }, 
		              trigger: 'blur' 
		            }
	      		]
	        }
      	}
      	
      }
	  
	  obj["UserName"] = [
		    { validator: function(rule, value, callback) {
						if(! value){
					      return callback(new Error('Can not be empty value'));
					    }
						if(/['|"]+/.test(value)){
					      return callback(new Error('The input text does not contain single quotes or double quotes'));
					    }
						callback();
					  }, 
	          trigger: 'blur' 
	        }
	  ];
	  
      obj["Password"] = [
		    { validator: function(rule, value, callback) {
		    	        if(! /[(\w)|@|#|-|$|%|^|&|+|=|!|?]{8,36}/.test(value)){
					      return callback(new Error('Password must contain special character - @#-_$%^&+=!? and length>=8'));
					    }
						if(! /[_|@|#|-|$|%|^|&|+|=|!|?]+/.test(value)){
					      return callback(new Error('Password must contain special character - @#-_$%^&+=!? and length>=8'));
					    }
						callback();
					  }, 
	          trigger: 'blur' 
	        }
	  ];
      return obj;
      
    }
    
  //输出API
   return{
       rules:rules
   };
});   