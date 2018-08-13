
//查询备件公共方法

function _searchParts($http,$scope,href){
    

    
    //配置分页  
    $scope.parts_count = 0;      //总数量
    $scope.parts_p_pernum = 5;  //每页数量
    $scope.options=[5,10,50,100,300,500,1000];
    $scope.parts_p_current = 1;   //当前页
    $scope.parts_p_all_page =0;   //总页数



    $scope._getParts=function()
    {
        var getPartsNameUrl=http + "/handler/parts/parts/list.ashx?" + idStr;
        
        if($scope.searchPartsCondition)
        {
           getPartsNameUrl+="&sortField=&searchCondition=status=1 and "+encodeURIComponent($scope.searchPartsCondition); 
        }else
        {
           getPartsNameUrl+="&sortField=&searchCondition=status=1"; 
        }
        getPartsNameUrl+="&pageNumber="+$scope.parts_p_current;
        getPartsNameUrl+="&pageSize="+$scope.parts_p_pernum;
        getPartsNameUrl+="&totalRecord=0";
        getPartsNameUrl+="&action=GetPages&timeStamp=" + Date.parse(new Date());
        $http({
            method: 'GET', 
            url:getPartsNameUrl,
            dataType:"json"
        })
        .success(function (data, status, headers, config) {
        	$scope.checkedPartsId = "";
        	$scope.partsArr = [];
            $scope.partsList = data.rows;
            $scope.parts_count=data["total"]; 
            $scope.parts_p_current=data["page"]; 
            $scope.parts_p_all_page =Math.ceil($scope.parts_count/$scope.parts_p_pernum);
        })
    }



  
    //首页  
    $scope.parts_p_index = function(){  
        $scope.parts_p_current = 1;
        $scope._getParts();
    }; 


    //尾页  
    $scope.parts_p_last = function(){  
        $scope.parts_p_current = $scope.parts_p_all_page;
        $scope._getParts();
    }; 


    //上一页  
    $scope.parts_p_pre = function(){ 
      if($scope.parts_p_current>1)
        {
          $scope.parts_p_current -= 1;
          $scope._getParts();
        } 
          
    }; 


    //下一页  
    $scope.parts_p_next = function(){  
        if($scope.parts_p_current<$scope.parts_p_all_page)
        {
           $scope.parts_p_current += 1;
           $scope._getParts();
        } 
    };



    //加载某一页  
    $scope.parts_load_page = function(page){
        if(page>0&&page<=$scope.parts_p_all_page)
        {
            $scope.parts_p_current = page;
            $scope._getParts();
           
        }else
        {
            //alert("输入页码有误");
        }
         
    }; 


    //加载每页显示数量  
    $scope.parts_load_pernum = function(p_pernum){
            $scope.parts_p_pernum = p_pernum;
    		$scope.parts_p_current = 1;   //当前页
            $scope._getParts();
    }; 





    //加载备件分类
     var getClassHref = http+"/handler/parts/parts_class/list.ashx?"+idStr+"&sortField=&searchCondition=status=1&pageNumber=1&pageSize="+1000000+"&totalRecord=0&action=GetPages&timeStamp=" + Date.parse(new Date());
      $http({
          method: 'GET', 
          url: getClassHref+"&timeStamp=" + Date.parse(new Date()),
          dataType:"json",
      })
    .success(function (data, status, headers, config) {
        $scope.search_material_class_list = data.rows;
       })
      .error(function (data, status, headers, config) {
          
      }); 
      
      
      if($("html,body").width()<768){
		$scope.isPCShow = false;
	}else{
		$scope.isPCShow = true;
	}
    
    
    
    $scope.getPartsSearchCondition = function(){
    	var seaCondition = "";
        
        if($scope.search_parts_id){
            seaCondition = "parts_id="+$scope.search_parts_id;
        }
        
        if(seaCondition){
            if($scope.search_material_code){
              seaCondition += " and material_code='" + $scope.search_material_code + "'";
            }
        }else{
            if($scope.search_material_code){
              seaCondition += "material_code='" + $scope.search_material_code + "'";
            }
        }
        
        if(seaCondition){
            if($scope.search_material_name){
              seaCondition += " and material_name like'%" + $scope.search_material_name + "%'";
            }
        }else{
            if($scope.search_material_name){
              seaCondition += "material_name like'%" + $scope.search_material_name + "%'";
            }
        }
        
        if(seaCondition){
            if($scope.search_material_class_id){
              seaCondition += " and material_class_id="+$scope.search_material_class_id;
            }
        }else{
            if($scope.search_material_class_id){
              seaCondition += "material_class_id="+$scope.search_material_class_id;
            }
        }
        
        
        $scope.searchPartsCondition = seaCondition;
    }
        
    
    
    $scope.search_parts = function(){

        $scope.getPartsSearchCondition();
        
        if(!$scope.searchPartsCondition){
            alert("请输入查询条件");
        }else{
        	$scope.parts_p_current = 1;   //当前页
    		$scope.parts_p_pernum = 5;  //每页数量
            $scope._getParts();
        }
        
        
    }
    
    //取消查询
    $scope.search_parts_cancel = function(){
        
        $scope.search_parts_id = '';
        $scope.search_material_class_id = '';
        $scope.search_material_code = '';
        $scope.search_material_name ='';
        
        
        $scope.searchPartsCondition = "";
        $scope.partsList = [];
        $scope.checkedPartsId = "";
        $scope.checkedPartsData = [];
        $scope.partsArr = [];
        
        $scope.parts_count = 0;      //总数量
	    $scope.parts_p_pernum = 10;  //每页数量
	    $scope.parts_p_current = 1;   //当前页
	    $scope.parts_p_all_page =0;   //总页数
    }
    
    $scope.partsArr = [];
    $scope.getCheckedPartsId = function(id){
        var flag = true;
        angular.forEach($scope.partsArr,function(e,i){
            if(id == e){
                $scope.partsArr.splice(i,1);
                flag = false;
            }
        })
        if(flag){
            $scope.partsArr.push(id);
        }
    
        if($scope.partsArr.length == 1){
            $scope.checkedPartsId = $scope.partsArr[0];
            console.log($scope.checkedPartsId);
            angular.forEach($scope.partsList,function(e){
                if(e.parts_id == $scope.partsArr[0]){
                    //获取被选中的资产设备详细信息
                    $scope.checkedPartsData = e;
                }
            })
        }else{
            $scope.checkedPartsId = "";
            $scope.checkedPartsData = [];
        }
        
    }
    
    



}   