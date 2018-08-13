import $ajax from './ajax';
export default {
	    findData: function(url, reqData, callback){
			    $ajax({ 
					  type:"GET", 
					  url:url+"?"+reqData, 
					  dataType:"text", 
					  success:function(data){ 
					    try {data = JSON.parse(data) } catch(e) {
		                	//console.log(e)
				          }
								  if(callback){
				              callback(data);
				          }
					  }, 
					  error:function(err){ 
					    console.log("dataDB.get请求失败"); 
					  } 
					}) 

	    },
	    insertData: function(url, reqData, callback){
		    	$ajax({ 
					  type:"POST", 
					  url:url,
					  data:reqData,
					  dataType:"text", 
					  success:function(data){ 
					    try {data = JSON.parse(data) } catch(e) {
		                	//console.log(e)
				        }
									if(callback){
					            callback(data);
					    }
					  }, 
					  error:function(err){ 
					    console.log("dataDB.post请求失败"); 
					  } 
					}) 
	  	    
	    },
	    updateData: function(url, reqData, callback){
	  	    $ajax({ 
					  type:"POST", 
					  url:url,
					  data:reqData,
					  dataType:"text", 
					  success:function(data){ 
					    try {data = JSON.parse(data) } catch(e) {
		                	//console.log(e)
				         }
									if(callback){
					            callback(data);
					     }
					  }, 
					  error:function(err){ 
					    console.log("dataDB.post请求失败"); 
					  } 
					}) 
	    },
	    delData: function(url, reqData, callback){
	  	    $ajax({ 
					  type:"POST", 
					  url:url,
					  data:reqData,
					  dataType:"text", 
					  success:function(data){ 
					    try {data = JSON.parse(data) } catch(e) {
		                	//console.log(e)
				          }
									if(callback){
					            callback(data);
					     }
					  }, 
					  error:function(err){ 
					    console.log("dataDB.post请求失败"); 
					  } 
					}) 
	    }
	    
}

