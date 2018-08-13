define(["app"], function () {
    return ["$rootScope", "$scope", "$http", "$interval", "$routeParams", function ($rootScope,$scope,$http,$interval,$routeParams) {
        
        var href=http+"/handler/smooth/smooth_run_record/list.ashx?"+idStr;    //必须放在最上面，否则影响速度
        var taskhref=http+"/handler/smooth/smooth_task/list.ashx?"+idStr;     //必须放在最上面，否则影响速度
        var postUrl=http + "/handler/smooth/smooth_run_record/list.ashx";

        


        //配置分页  
        $scope.count = 0;      //总数量
        $scope.p_pernum = 10;  //每页数量
        $scope.options=[5,10,50,100,300,500,1000];
        $scope.p_current = 1;   //当前页
        $scope.p_all_page =0;   //总页数


        $scope.sortField = "";  //查询条件
        $scope.tdBj="default";
        $scope.searchCondition = "status=1";  //查询条件
        



        $scope.callback=function(){
            angular.forEach($scope.list,function(i,key){
                if(i["create_time"]){i["create_time"]=i["create_time"].split(" ")[0];}
            });
        };



        //请求数据
        //参数$scope,$http,必填 
        //getUrl 为请求的url地址
        //type 有两种类型,  type_get代表请求数据。type_post代表发送编辑修改等请求，请求信息发送成功后不用获取数据。
         // console.log(getUrl);
        _get($scope,$http,href,"type_get",$scope.callback);
        
       



      

         //排序
        $scope.sortFn=function(index)
        {
           
             if($("#mainTable thead tr td").eq(index+1).children("span").hasClass("default"))
             {

                $scope.sortField=$scope.fields_e[index];
                 _get($scope,$http,href,"type_get",$scope.callback);
                for(var i=0; i<$scope.fields_c.length; i++)
                {
                  $("#mainTable thead tr td").eq(i+1).children("span").removeClass("desc").addClass("default");
                }
                $("#mainTable thead tr td").eq(index+1).children("span").removeClass("default").addClass("desc");

             }else
             {
                 $scope.sortField=$scope.fields_e[index]+" desc";
                 _get($scope,$http,href,"type_get",$scope.callback);
                for(var i=0; i<$scope.fields_c.length; i++)
                {
                  $("#mainTable thead tr td").eq(i+1).children("span").removeClass("desc").addClass("default");
                }
                $("#mainTable thead tr td").eq(index+1).children("span").removeClass("desc").addClass("default");
             }
           
            
        };


        
        
        
        //分页 只传href即可，余下字符串不传
        GetPages($scope,$http,href);


        
       



        
        //checkbox按钮 
        $scope.checked = [];
        checkbox($scope);

       
        




        
        //动态生成新增、修改、删除按钮
        var btns_url="";
        btns_url+=href;
        btns_url+="&action=page_btns";
     
        ///参数$scope,$http,btns_url 必填  
        page_btn($scope,$http,btns_url);








        //获取公共搜索
        //checkType为radio或checkbox
        // $scope.ComSearchCondition = "";  //公共搜索条件
        // $scope.ComCheckedId = "";        //单选的id（checkType为radio）
        // $scope.ComCheckedData = "";      //单选的一条详细信息（checkType为radio）
        // $scope.ComCheckedArr = [];       //多选的id数组（checkType为checkbox）
        // $scope.ComCheckedDataArr = [];   //多选的多条详细信息（checkType为checkbox）
        _searchCommon($http,$scope,"radio");





          $scope.btn_search = function(){
            $scope.searchCondition = "status=1";
            $scope.getComSearchCondition();
            
            if($("#create_time_start").val()){
              $scope.searchCondition += " and create_time>='" +$("#create_time_start").val()+ "'";
            }
            
            if($("#create_time_end").val()){
                $scope.searchCondition += " and create_time<='" +$("#create_time_end").val()+ "'";
            }
            
            if($scope.ComSearchCondition){
              $scope.searchCondition += " and ";
              if($scope.ComCheckedId){
                $scope.searchCondition += "object_id=" + $scope.ComCheckedId;
              }else{
                $scope.searchCondition += $scope.ComSearchCondition;
              }
            }
            if(!$scope.ComSearchCondition&&$scope.ComCheckedId){
              $scope.searchCondition += " and object_id=" + $scope.ComCheckedId;
            }

            $scope.searchCondition = encodeURIComponent($scope.searchCondition);
            //初始化分页  
            $scope.count = 0;      //总数量
            $scope.p_pernum = 10;  //每页数量
            $scope.p_current = 1;   //当前页
            $scope.p_all_page =0;   //总页数
             _get($scope,$http,href,"type_get",$scope.callback);
            
          }









        $scope.total_amount_blur = function(){
            if($scope.total_amount){
                var reg = /^[1-9][0-9]{0,8}$/;
                if(!reg.test($scope.total_amount)){
                     $scope.total_amount_show = true;
                }else{
                     $scope.total_amount_show = false;
                }
            }else{
                $scope.total_amount_show = false;
            }
             if($scope.total_amount_show || $scope.run_record_show)
            {
                $scope.btn_disabled=true;
            }else{
               $scope.btn_disabled= false;
            }
                
        }



        $scope.run_record_blur = function(){
            if($scope.run_record){
                var reg = /^[1-9][0-9]{0,8}$/;
                if(!reg.test($scope.run_record)){
                     $scope.run_record_show = true;
                }else{
                     $scope.run_record_show = false;
                }
            }else{
                $scope.run_record_show = false;
            }
            if($scope.total_amount_show || $scope.run_record_show)
            {
                $scope.btn_disabled=true;
            }else{
               $scope.btn_disabled= false;
            }
                
        }





       





        //新增
        $scope.btn_add = function(){

            if($scope.ComCheckedId){
                $scope.all_total_amount = "";
                $scope.total_amount = "";
                $scope.run_record = "";

                $scope.show_add = true;
                $scope.show_modify = false;
                //取消
                $scope.btn_esc = function(){
                    $scope.show_add = false;
                }
                //确定
                $scope.btn_confirm = function() 
                {

                    var jsonStr ="[{"+"'object_id':"+"'"+$scope.ComCheckedId+"',"+"'smooth_task_id':"+"'"+$scope.taskCheckedId+"',"+"'total_amount':"+"'"+$scope.total_amount+"',"+"'run_record':"+"'"+$scope.run_record+"'"+"}]";
                    var config = {json:jsonStr,sid:idStr.split("=")[1],action:"btn_add"};
                    //console.log(config);
                     _add($http,$scope,href,postUrl,config);
                    
                     $scope.btn_esc();
                }

             }else{
              alert("请勾选一条设备");
             }

        }






        //修改
        $scope.btn_modify = function(){

             if($scope.checked.length!=1)
             {
                 alert("请勾选一个复选框");
             }else
             {
                var RowNumber=$scope.checked[0];
                var this_index = (RowNumber-1)-(($scope.p_current-1)*$scope.p_pernum);
                $scope.smooth_run_record_id =$scope.list[this_index].smooth_run_record_id;
                $scope.object_id =$scope.list[this_index].object_id;
                $scope.smooth_task_id =$scope.list[this_index].smooth_task_id;
                $scope.all_total_amount =$scope.list[this_index].all_total_amount;
                $scope.total_amount =$scope.list[this_index].total_amount;
                $scope.run_record =$scope.list[this_index].run_record;
               

                $scope.show_modify = true;
                $scope.show_add = false;
                //取消
                $scope.btn_esc = function(){
                    $scope.show_modify = false;
                }

             }



             //确定
            $scope.btn_confirm = function() 
            {


                var jsonStr ="[{"+"'smooth_run_record_id':"+"'"+$scope.smooth_run_record_id+"',"+"'object_id':"+"'"+$scope.object_id+"',"+"'smooth_task_id':"+"'"+$scope.smooth_task_id+"',"+"'total_amount':"+"'"+$scope.total_amount+"',"+"'run_record':"+"'"+$scope.run_record+"'"+"}]";
                var config = {json:jsonStr,sid:idStr.split("=")[1],action:"btn_modify"};
                _modify($http,$scope,href,postUrl,config);

                 $scope.btn_esc();
            }

         
        }

     




        
          //删除
        $scope.btn_delete = function(){
          if($scope.checked.length==0)
             {
                 alert("请勾选至少一个复选框");
             }else
             {
     
                if(confirm("确认删除"))
                 {

                       var checkedArr =$scope.checked;
                       console.log(checkedArr);
                       var jsonArr = [];
                       
                       for(var i = 0; i<checkedArr.length; i++)
                       {   
                           var this_index = (checkedArr[i]-1)-(($scope.p_current-1)*$scope.p_pernum);
                           jsonArr.push($scope.list[this_index].smooth_run_record_id);
                       }

                        //console.log(jsonArr);
                        var jsonStr = jsonArr.join(",");
                         var config = {json:jsonStr,sid:idStr.split("=")[1],action:"btn_delete"};
                        _del($http,$scope,href,postUrl,config);
                  
                } 

            }

        }







    
    //查询任务库
    $scope.searchTaskCheck = function(){
        var seaCondition = "";
        //判断查询机构名称是否存在，若存在则拼接字符串
        if($scope.task_search_task_type){
            seaCondition += "task_type_id="+$scope.task_search_task_type.substr(0,1);
        }
        
        //先判断seaCondition不为空，再判断周期是否存在
        if(seaCondition){
            
            if($scope.task_search_period){
                seaCondition += " and period_id="+$scope.task_search_period.substr(0,1);
            }
        }else{
            if($scope.task_search_period){
                seaCondition += "period_id="+$scope.task_search_period.substr(0,1);
            }
        }
        

        if(seaCondition){
            
            if($scope.task_search_mechanism_name){
                seaCondition += " and mechanism_name like'%"+$scope.task_search_mechanism_name+"%'";
            }
        }else{
            if($scope.task_search_mechanism_name){
                seaCondition += "mechanism_name like'%"+$scope.task_search_mechanism_name+"%'";
            }
        }
        
        //判断seaCondition是否为空
        if(!seaCondition){
            // alert("请输入查询条件");
            $scope.searchTaskCheckCondition = "status=1";
            $scope.taskCheckList = [];
            $scope.taskCheckedArr = [];
        }else{
            seaCondition = encodeURIComponent(seaCondition);
            $scope.searchTaskCheckCondition = "status=1 and " + seaCondition;
            $http({
                method: 'GET', 
                url: http+"/handler/smooth/smooth_task/list.ashx?"+idStr+"&sortField=&searchCondition="+$scope.searchTaskCheckCondition+"&pageNumber=1&pageSize=1000&totalRecord=0&action=GetPages",
                dataType:"json",
            })
            .success(function (data, status, headers, config) {
            //          console.log(data);
                $scope.taskCheckList = data.rows;
                $scope.taskCheckedArr = [];
            })
        }
    }
    


   





    
    //点击任务库中的复选框触发的事件
    $scope.taskCheckedId = "";
    $scope.getTaskCheckId =  function(id){
       $scope.taskCheckedId = id;
    }


  
   //全选/全不选
    $scope.getTaskAllObject = function(){
        $scope.taskCheckedId = "";
    }














    
}]; 
});







