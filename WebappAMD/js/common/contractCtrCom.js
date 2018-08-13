
//checkType为radio或checkbox
// $scope.ComSearchCondition = "";  //公共搜索条件
// $scope.ComCheckedId = "";        //单选的id（checkType为radio）
// $scope.ComCheckedData = "";      //单选的一条详细信息（checkType为radio）
// $scope.ComCheckedArr = [];       //多选的id数组（checkType为checkbox）
// $scope.ComCheckedDataArr = [];   //多选的多条详细信息（checkType为checkbox）



function _searchCommon($http,$scope,checkType){
    
    var ComSearchHref=http+"/handler/contract/contract_base/list.ashx?"+idStr;
    
    //配置分页  
    $scope.ComSearch_count = 0;      //总数量
    $scope.ComSearch_p_pernum = 5;  //每页数量
    $scope.options=[5,10,50,100,300,500,1000];
    $scope.ComSearch_p_current = 1;   //当前页
    $scope.ComSearch_p_all_page =0;   //总页数
    
    $scope.ComSearchCondition= "";  //查询公共条件

    


    $scope._getComSearch=function()
    {
        var SearchUrl=ComSearchHref;
        if($scope.ComSearchCondition)
        {
           SearchUrl+="&sortField=&searchCondition=status=1 and "+encodeURIComponent($scope.ComSearchCondition); 
        }else
        {
           SearchUrl+="&sortField=&searchCondition=status=1"; 
        }
        SearchUrl+="&pageNumber="+$scope.ComSearch_p_current;
        SearchUrl+="&pageSize="+$scope.ComSearch_p_pernum;
        SearchUrl+="&totalRecord=0";
        SearchUrl+="&action=GetPages&timeStamp=" + Date.parse(new Date());
        $http({
            method: 'GET', 
            url:SearchUrl,
            dataType:"json"
        })
        .success(function (data, status, headers, config) {
            $scope.ComSearchList = data.rows;
            $scope.ComSearch_count=data["total"]; 
            $scope.ComSearch_p_current=data["page"]; 
            $scope.ComSearch_p_all_page =Math.ceil($scope.ComSearch_count/$scope.ComSearch_p_pernum);

            //清空Checked
            $scope.ComCheckedId = "";        
            $scope.ComCheckedData = "";      
            $scope.ComCheckedArr = [];       
            $scope.ComCheckedDataArr = [];   
        })
    };

   // $scope._getComSearch();




    //首页  
    $scope.ComSearch_p_index = function(){  
        $scope.ComSearch_p_current = 1;
        $scope._getComSearch();
    }; 


    //尾页  
    $scope.ComSearch_p_last = function(){  
        $scope.ComSearch_p_current = $scope.ComSearch_p_all_page;
        $scope._getComSearch();
    }; 


    //上一页  
    $scope.ComSearch_p_pre = function(){ 
      if($scope.ComSearch_p_current>1)
        {
          $scope.ComSearch_p_current -= 1;
          $scope._getComSearch();
        } 
          
    }; 


    //下一页  
    $scope.ComSearch_p_next = function(){  
        if($scope.ComSearch_p_current<$scope.ComSearch_p_all_page)
        {
           $scope.ComSearch_p_current += 1;
           $scope._getComSearch();
        } 
    };



    //加载某一页  
    $scope.ComSearch_load_page = function(page){
        if(page>0&&page<=$scope.ComSearch_p_all_page)
        {
            $scope.ComSearch_p_current = page;
            $scope._getComSearch();
           
        }else
        {
            //alert("输入页码有误");
        }
         
    }; 


    //加载每页显示数量  
    $scope.ComSearch_load_pernum = function(p_pernum){
            $scope.ComSearch_p_pernum = p_pernum;
            $scope.ComSearch_p_current = 1;   //当前页
            $scope._getComSearch();
    }; 





    //加载合同分类
     var getClassHref = http+"/handler/contract/contract_class/list.ashx?"+idStr+"&sortField=&searchCondition=status=1&pageNumber=1&pageSize="+1000000+"&totalRecord=0&action=GetPages&timeStamp=" + Date.parse(new Date());
      $http({
          method: 'GET', 
          url: getClassHref,
          dataType:"json",
      })
    .success(function (data, status, headers, config) {
        $scope.search_class_list = data.rows;
       })
      .error(function (data, status, headers, config) {
          
      });    

    
    
    
     
    
    //查询
    $scope.getComSearchCondition = function(){

        var seaCondition = "";
        
        if($scope.search_contract_type_id){
            seaCondition += "contract_type_id="+$scope.search_contract_type_id;
        }
        
        if(seaCondition){
            if($scope.search_class_id){
              seaCondition += " and class_id="+$scope.search_class_id;
            }
        }else{
            if($scope.search_class_id){
              seaCondition += "class_id="+$scope.search_class_id;
            }
        }
        
        if(seaCondition){
            if($scope.search_contract_No){
              seaCondition += " and contract_No="+"'"+$scope.search_contract_No+"'";
            }
        }else{
            if($scope.search_contract_No){
              seaCondition += "contract_No="+"'"+$scope.search_contract_No+"'";
            }
        }
        
        
        if(seaCondition){
            if($scope.search_order_No){
              seaCondition += " and order_No='"+"'"+$scope.search_order_No+"'";
            }
        }else{
            if($scope.search_order_No){
              seaCondition += "order_No="+"'"+$scope.search_order_No+"'";
            }
        }
        
        
        $scope.ComSearchCondition = seaCondition;


        
        
    };




   //查询
    $scope.btn_getComSearch = function(){
        $scope.getComSearchCondition();
        
        if(!$scope.ComSearchCondition){
            alert("请输入查询条件");
        }else{
            //初始化分页  
            $scope.ComSearch_count = 0;      //总数量
            $scope.ComSearch_p_pernum = 5;  //每页数量
            $scope.ComSearch_p_current = 1;   //当前页
            $scope.ComSearch_p_all_page =0;   //总页数
             $scope._getComSearch();
        }
        
        
    };





    
    //取消查询
    $scope.getComSearch_cancel = function(){
        
        $scope.search_contract_type_id = '';
        $scope.search_class_id = '';
        $scope.search_contract_No = '';
        $scope.search_order_No ='';
        
        $scope.ComSearchCondition ="";
        //初始化分页  
        $scope.ComSearch_count = 0;      //总数量
        $scope.ComSearch_p_pernum = 5;  //每页数量
        $scope.ComSearch_p_current = 1;   //当前页
        $scope.ComSearch_p_all_page =0;   //总页数
        // $scope._getComSearch();
        $scope.ComSearchList = [];

        $scope.ComSearchCondition = "";
        $scope.ComCheckedId = "";
        $scope.ComCheckedData = "";
        $scope.ComCheckedArr = [];
        $scope.ComCheckedDataArr = [];

    };


   






    //单选框
    if(checkType=="radio")
    {
        $scope.showComRadio=true;
        $scope.getComCheckedOne = function(id,str){
              $scope.ComCheckedId=id;
              angular.forEach($scope.ComSearchList,function(e){
                    if(e[str] == id){
                        //获取被选中的详细信息
                       $scope.ComCheckedData=e;
                    }
               });
              // console.log($scope.ComCheckedId);
              // console.log($scope.ComCheckedData);
             
              //勾选时的回调函数
              if($scope.ComCheckedOneCallback)
              {
                 $scope.ComCheckedOneCallback(); 
              }; 
             
        };
        $scope.noCheckAll=function()
        {
            $scope.ComCheckedId = "";
            $scope.ComCheckedData = ""; 
            if($scope.ComCheckedOneCallback)
            {
                $scope.ComCheckedOneCallback(); 
            };
        };
        
    }
    
 
    //多选框
    if(checkType=="checkbox")
    {
       $scope.showComCheckbox=true;
       $scope.ComCheckedArr = [];
       $scope.ComCheckedDataArr = [];
        $scope.getComCheckedOne = function(id,str){
                var checked = true;
                angular.forEach($scope.ComCheckedArr,function(e,i){
                    if(id == e){
                        $scope.ComCheckedArr.splice(i,1);
                        $scope.ComCheckedDataArr.splice(i,1);
                        checked = false;
                    }
                });
                if(checked){
                    $scope.ComCheckedArr.push(id);
                    angular.forEach($scope.ComSearchList,function(e){
                        if(e[str] == id){
                            //获取被选中的详细信息
                            $scope.ComCheckedDataArr.push(e);
                        }
                    });
                }
            
               // console.log($scope.ComCheckedArr);
               // console.log($scope.ComCheckedDataArr);

                //判断是否全选
                if($scope.ComCheckedArr.length == $('#com_table input[name=checkbox]').length){
                    $('#checkboxAll').prop("checked",true);
                }else{
                    $('#checkboxAll').prop("checked",false);
                }
                


                 //勾选时的回调函数
                if($scope.ComCheckedOneCallback)
                {
                     $scope.ComCheckedOneCallback(); 
                };
                

        };
        
        //全选/全不选
        $scope.getComCheckedAll = function(str){
            $scope.ComCheckedArr = [];
            $scope.ComCheckedDataArr = [];
            if($('#checkboxAll').prop("checked")){
                angular.forEach($scope.ComSearchList,function(e){
                    $scope.ComCheckedArr.push(e[str]);
                    $scope.ComCheckedDataArr.push(e);
                });
                
                $('#com_table input[name=checkbox]').prop("checked",true);
                
            }else{
                $('#com_table input[name=checkbox]').prop("checked",false);
            }
            //console.log($scope.ComCheckedArr);
            //console.log($scope.ComCheckedDataArr);

          };
    }

    



}   