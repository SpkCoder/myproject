
//请求数据
function _get($scope,$http,href,type,callback)
{
		var getUrl="";
	    getUrl+=href;
	    getUrl+="&sortField="+$scope.sortField;
	    getUrl+="&searchCondition="+$scope.searchCondition;
	    getUrl+="&pageNumber="+$scope.p_current;
	    getUrl+="&pageSize="+$scope.p_pernum;
	    getUrl+="&totalRecord=0";
	    getUrl+="&action=GetPages&timeStamp=" + Date.parse(new Date());
	    
      $http({
        method: 'GET', 
        url:getUrl,
        dataType:"json",
        })
        .success(function (data, status, headers, config) {

            if(type=="type_get")
            {
                
                $scope.tableWidth=data["total_width"];
                $scope.subject=data["subject"];
                $scope.fields_c=data["fields_c"].split(";");
                $scope.fields_e=data["fields_e"].split(";");
                $scope.trWidthArr=data["col_width"].split(";");
                $scope.count=data["total"]; 
                $scope.p_current=data["page"]; 
                $scope.p_all_page =Math.ceil($scope.count/$scope.p_pernum);

                $scope.checked = [];
                $scope.list=data["rows"];

                
     
                //判断工作状态
		        var arrWorkState = [];
		        angular.forEach($scope.list,function(e,i){
		        	if(e.work_state == 1){
		        		arrWorkState.push('正在办理');
		        	}else if(e.work_state == 2){
		        		arrWorkState.push('正常结束');
		        	}else if(e.work_state == 3){
		        		arrWorkState.push('已被驳回');
		        	}
		        })
		        $scope.arrWorkState = arrWorkState;
            }
            
            if(callback){
            	callback(); 
            }
            

            
         })
        .error(function (data, status, headers, config) {

            alert("请求数据加载失败");
        });

} 




//请求分页
function GetPages($scope,$http,href)
{

      //首页  
        $scope.p_index = function(){  
        	$scope.p_current = 1;
          _get($scope,$http,href,"type_get",function(){ 
	                 //回调函数，请求成功执行的函数。
	        });
          //清空checkbox
          $scope.checked = [];
        }; 


        //尾页  
        $scope.p_last = function(){  
        	$scope.p_current = $scope.p_all_page;
          _get($scope,$http,href,"type_get",function(){ 
	               if($scope.callback){
                      $scope.callback();
                    }
	        });
            //清空checkbox
            $scope.checked = [];
        }; 


        
        //上一页  
        $scope.p_pre = function(){ 
          if($scope.p_current>1)
            {
              $scope.p_current -= 1;
		          _get($scope,$http,href,"type_get",function(){ 
                       if($scope.callback){
                          $scope.callback();
                        }
                  }); 
                  //清空checkbox
                  $scope.checked = [];
            } 
              
        }; 


        //下一页  
        $scope.p_next = function(){  
            if($scope.p_current<$scope.p_all_page)
            {
               $scope.p_current += 1;
		          _get($scope,$http,href,"type_get",function(){ 
                       if($scope.callback){
                          $scope.callback();
                        }
                  });
                  //清空checkbox
                  $scope.checked = [];
            } 
        };



        //加载某一页  
        $scope.load_page = function(page){
            if(page>0&&page<=$scope.p_all_page)
            {
              	$scope.p_current = page;
			        _get($scope,$http,href,"type_get",function(){ 
                       if($scope.callback){
                          $scope.callback();
                        }
                  });
	              //清空checkbox
	              $scope.checked = [];

            }else
            {
                //alert("输入页码有误");
            }
             
        }; 

       
        //加载每页显示数量  
        $scope.load_pernum = function(p_pernum){
                $scope.p_pernum = p_pernum;
                $scope.p_current = 1;   //当前页
			      _get($scope,$http,href,"type_get",function(){ 
                       if($scope.callback){
                          $scope.callback();
                        }
                  });
               //清空checkbox
               $scope.checked = [];
        }; 



}







//checkbox按钮
function checkbox($scope,callback)
{
      
        $scope.selectAll = function () {
            if($scope.select_all) {
                $scope.checked = [];
                angular.forEach($scope.list, function (i) {
                    i.checked = true;
                    $scope.checked.push(i.RowNumber);
                })
            }else {
                angular.forEach($scope.list, function (i) {
                    i.checked = false;
                    $scope.checked = [];
                })
            }
             // console.log($scope.checked);
        };
        $scope.selectOne = function () {
            angular.forEach($scope.list , function (i) {
                var index = $scope.checked.indexOf(i.RowNumber);
                if(i.checked && index === -1) {
                    $scope.checked.push(i.RowNumber);
                } else if (!i.checked && index !== -1){
                    $scope.checked.splice(index, 1);
                };
            })

            if ($scope.list.length === $scope.checked.length) {
                $scope.select_all = true;
            } else {
                $scope.select_all = false;
            }
//             console.log($scope.checked);
            if(callback){
                callback(); 
            }
           
        };
        
}








//动态生成新增、修改、删除按钮
function page_btn($scope,$http,url)
{

    // console.log(url);
    $http({
        method: 'GET', 
        url: url+"&timeStamp=" + Date.parse(new Date()),
        dataType:"json",
     })
    .success(function (data, status, headers, config) {
    	$scope.btn_c = [];
        $scope.pageBtns = [];
        $scope.file_pageBtns=[];
    	if(data){
    		$scope.pageBtnArr = data.split(';'); 
	        angular.forEach($scope.pageBtnArr,function(e,i){
	        		$scope.btn_c.push(e.split(',')[1]);
	        		$scope.pageBtns.push(e.split(',')[0]);
	                if(e.split(',')[0]=="btn_add"){$scope.file_pageBtns.push("上传");}
	                if(e.split(',')[0]=="btn_delete"){$scope.file_pageBtns.push("删除");}
	        });
    	}
     })
    .error(function (data, status, headers, config) {
        alert("按钮加载失败");  
    });
    $scope.btnClick = function(btn){
        if(btn == 'btn_add'){
            $scope.btn_add();
        }else if(btn == 'btn_modify'){
            $scope.btn_modify();
        }else if(btn == 'btn_delete'){
            $scope.btn_delete();
        }else if(btn == 'btn_save'){
            $scope.btn_save();
        }else if(btn == 'btn_import'){
            $scope.btn_import();
        }else if(btn == 'btn_send'){
            $scope.btn_send();
        }else if(btn == 'btn_receive'){
            $scope.btn_receive();
        }else if(btn == 'btn_check'){
            $scope.btn_check();
        }else if(btn == 'btn_check'){
            $scope.btn_check();
        }else if(btn == 'btn_manager'){
            $scope.btn_manager();
        }else if(btn == 'btn_copy'){
            $scope.btn_copy();
        }else if(btn == 'btn_addPic'){
            $scope.btn_addPic();
        }else if(btn == 'btn_delPic'){
            $scope.btn_delPic();
        }else if(btn == 'btn_uploadFile'){
            $scope.btn_uploadFile();
        }else if(btn == 'btn_delFile'){
            $scope.btn_delFile();
        }
    }

}

//新增向后台请求方法
function _add($http,$scope,href,postUrl,config){
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
    .success(function (data, status, headers, config) {
    	if(data>0){
    		alert("新增成功");
	        _get($scope,$http,href,"type_get",function(){
	    		if($scope.callback){
	    			$scope.callback();
	    		}
	    	});
	        $scope.isAddShow = false;
	        $scope.addDisabled = false;
    	}else if(data == 0){
    		alert("新增失败");
    		$scope.addDisabled = false;
    	}else if(data == -1){
    		alert("没有权限");
    	}
     })
    .error(function (data, status, headers, config) {
		alert("新增失败");
		$scope.addDisabled = false;
    });
}


//修改向后台请求方法
function _modify($http,$scope,href,postUrl,config){
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
    .success(function (data, status, headers, config) {
    	if(data == 0){
			alert("修改失败");
			$scope.changeDisabled = false;
    	}else if(data == -1){
			alert("没有权限");
    	}else{
			alert("修改成功");
	    	$scope.checked.length = 0;
	        _get($scope,$http,href,"type_get",function(){
	    		if($scope.callback){
	    			$scope.callback();
	    		}
	    	});
	        $scope.isChangeShow = false;
	        $scope.changeDisabled = false;
    	}
     })
    .error(function (data, status, headers, config) {
        alert("修改失败");
	    $scope.changeDisabled = false;
    });
}





//复制向后台请求方法
function _copy($http,$scope,href,postUrl,config){
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
    .success(function (data, status, headers, config) {
        if(data == -1){
            alert("没有权限");
        }else{
            data = data.replace(/<\/br>/,";");
            $scope.importSuccess = data.split(";")[0];
            $scope.importError = data.split(";")[1];
            $scope.isDetailShow = true;
            if($scope.addDisabled){
            	$scope.addDisabled = false;
            }else if($scope.changeDisabled){
            	$scope.changeDisabled = false;
            }
            _get($scope,$http,href,"type_get",$scope.callback);

        }
     })
    .error(function (data, status, headers, config) {
        alert("操作失败");
        if($scope.addDisabled){
        	$scope.addDisabled = false;
        }else if($scope.changeDisabled){
        	$scope.changeDisabled = false;
        }
    });
}






//删除向后台请求方法
function _del($http,$scope,href,postUrl,config){
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
	.success(function (data, status, headers, config) {
		console.log(data);
		if(data == 1){
//			console.log(data);
			alert("删除成功");
	    	_get($scope,$http,href,"type_get",function(){
	    		if($scope.callback){
	    			$scope.callback();
	    		}
	    	});
		}else if(data == 0){
			alert("删除失败");
			_get($scope,$http,href,"type_get",function(){
	    		if($scope.callback){
	    			$scope.callback();
	    		}
	    	});
		}else if(data == -1){
			alert("没有权限");
		}
	})
	.error(function (data, status, headers, config) {
	    alert("删除失败");
	});
}


////获取待办工作
//function getWorkWaitTotal($http){
//	$http({
//      method: 'GET', 
//      url:http+"/handler/work/wait/list.ashx?"+idStr+"&sortField=&searchCondition=&pageNumber=1&pageSize=10&totalRecord=0&action=GetPages&timeStamp=" + Date.parse(new Date()),
//		dataType:"json"
//  })
//  .success(function (data2, status, headers, config) {
//  	$("#111300 a strong").html("(" + data2.total + ")");
//  	
////  	if(window.ncp){
////  		window.ncp.callOnJs2();  //通过ncp代理调用android方法
////  	}
//  	
//  })
//}









	//获取故障分类
    function getRepaireClass($scope,$http,http){
    	var getRepaireClassHref = http+"/handler/repaire/repaire_class/list.ashx?"+idStr+"&sortField=&searchCondition=status=1&pageNumber=1&pageSize=1000&totalRecord=0&action=GetPages";
        $http({
            method: 'GET', 
            url: getRepaireClassHref+"&timeStamp=" + Date.parse(new Date()),
            dataType:"json",
        })
    	.success(function (data, status, headers, config) {
    		$scope.repaire_class = data.rows;
        })
        	
    }

    //获取资产设备分类
    function getObjectClass($scope,$http,http){
    	var getObjectClassHref = http+"/handler/objects/object_class/list.ashx?"+idStr+"&sortField=&searchCondition=status=1&pageNumber=1&pageSize=1000&totalRecord=0&action=GetPages"; 
        $http({
            method: 'GET', 
            url: getObjectClassHref+"&timeStamp=" + Date.parse(new Date()),
            dataType:"json",
        })
    	.success(function (data, status, headers, config) {
    		$scope.object_class = data.rows;
        }) 
    }







 