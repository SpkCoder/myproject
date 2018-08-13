define(["app"], function () {
    return ["$rootScope", "$scope", "$http", "$interval", function ($rootScope,$scope,$http,$interval) {
           

            var getTopUrl = http+"/handler/index/top.ashx?"+idStr+"&action=GetTop&timeStamp="+ Date.parse(new Date());
	        $http({
		            method: 'GET', 
		            url:getTopUrl,
		            dataType:"json",
		        })
		        .success(function (data, status, headers, config) {
		            $rootScope.nav=data;
		            //console.log($rootScope.nav);
		          
		         })
		        .error(function (data, status, headers, config) {
		            //return false;
		     });

		  


            var getLeftUrl = http + "/handler/index/left.ashx?"+idStr+"&action=GetLeft&timeStamp="+ Date.parse(new Date());
	        $http({
	            method: 'GET', 
	            url:getLeftUrl,
	            dataType:"json",
	        })
	        .success(function (data, status, headers, config) {
	            if(data=="没有登录或登录已过期！"){
	            	  localStorage.removeItem("idStr");
		              var login = localStorage.getItem("login");
		              if(login=="login.html"){
		                  window.location.href="/login.html";
		              }
		              if(login=="login2.html"){
		                  window.location.href="/login2.html";
		              }
	            }else{

	            	$rootScope.menu=data;
		            //console.log($rootScope.menu);
	            }
	          
	         })
	        .error(function (data, status, headers, config) {
	            //return false;
	        });

	    



	    $rootScope.$on('ngRepeatFinishedIndex', function() {
        
            //console.log("ngRepeatFinishedIndex");
            appendfn();
           

       });
       

       
       
       if(window.ncp){
       		$interval(function(){
       			var position = window.ncp.callOnJs5();  //通过ncp代理调用android方法
//  			alert(position);
				if(!position){
					return;
				}
    			
    			var postUrl=http + "/handler/system/user_online_history/list.ashx";
    			var jsonStr ="[{'longitude':'"+position.split(';')[1]+"','latitude':'"+position.split(';')[0]+"'}]";
		        var config = {json:jsonStr,sid:idStr.split("=")[1],action:"btn_add"};
		        
		        $http({  
				    method: "POST",    
				    url: postUrl,    
				    data: config,  
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' },  
				    transformRequest: function(obj) {  
				      	var str = [];  
				      	for (var s in obj) {  
				        	str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));  
				      	}  
				      	return str.join("&");  
				    }  
				})  
    			
       		},60000);
    		
    	}else{
    		if($("html,body").width()<=768){
    			if (navigator.geolocation){
			        $interval(function(){
			        	var postUrl=http + "/handler/system/user_online_history/list.ashx";
			        	
				    	navigator.geolocation.getCurrentPosition(function(position){
	
				    		var jsonStr ="[{'longitude':'"+position.coords.longitude+"','latitude':'"+position.coords.latitude+"'}]";
					        var config = {json:jsonStr,sid:idStr.split("=")[1],action:"btn_add"};
					        
					        $http({  
							    method: "POST",    
							    url: postUrl,    
							    data: config,  
									headers: { 'Content-Type': 'application/x-www-form-urlencoded' },  
							    transformRequest: function(obj) {  
							      	var str = [];  
							      	for (var s in obj) {  
							        	str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));  
							      	}  
							      	return str.join("&");  
							    }  
							}) 
				    	});
						
					},60000)
		         }else{
		         	var login = localStorage.getItem("login");
		            if(login=="login.html"){
		                window.location.href="/login.html";
		            }
		            if(login=="login2.html"){
		                window.location.href="/login2.html";
		            }
		         }
    		}else{
    			$interval(function(){
		        	var postUrl=http + "/handler/system/user_online_history/list.ashx";
		        	var jsonStr ="[{}]";
			        var config = {json:jsonStr,sid:idStr.split("=")[1],action:"btn_add"};
			        
			        $http({  
					    method: "POST",    
					    url: postUrl,    
					    data: config,  
							headers: { 'Content-Type': 'application/x-www-form-urlencoded' },  
					    transformRequest: function(obj) {  
					      	var str = [];  
					      	for (var s in obj) {  
					        	str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));  
					      	}  
					      	return str.join("&");  
					    }  
					}) 
				},60000)
    		}
    	}



        





    }]; 
});



