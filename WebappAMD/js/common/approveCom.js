//获取审批流程公共方法

function _getApproveCom($http,$scope,href,work_do_id,work_state){
	//获取工作节点列表
    $scope.isBackWorkJiedianShow = false;
    function getWorkJiedianList(sequence){
    	$http({
		        method: 'GET', 
		        url:http+"/handler/work/monitor/list.ashx?"+idStr+"&sortField=&searchCondition=work_do_id="+work_do_id+"&pageNumber=1&pageSize=10&totalRecord=0&action=GetPages&timeStamp=" + Date.parse(new Date()),
				dataType:"json"
		    })
		    .success(function (data, status, headers, config) {
		    	if(data.rows[0]){
		    		var work_flow_id = data.rows[0].work_flow_id;
			    	$http({
				        method: 'GET', 
				        url:http+"/handler/work/work_jiedian/list.ashx?"+idStr+"&sortField=&searchCondition=work_flow_id="+work_flow_id+"&pageNumber=1&pageSize=10&totalRecord=0&action=GetPages&timeStamp=" + Date.parse(new Date()),
						dataType:"json"
				    })
				    .success(function (data2, status, headers, config) {
				    	$scope.workJiedianList = data2.rows;
				    	$scope.workJiedianBackList = [];
				    	angular.forEach(data2.rows,function(e){
				    		if(e.sequence < sequence){
				    			$scope.workJiedianBackList.push(e);
				    		}
				    	})
				     })
		    	}
			    	
		    })
    }
    
      //储存是否为最后一个经办人
    var oldLastOne = "";
    $scope.getNextWorkFlow = function(){
    	$scope.isNextWorkFlowShow = false;
	    $scope.isNextUserShow = false;
	    $scope.nextWorkFlow = "";
    	if($scope.result == "1同意"){
    		$scope.isBackWorkJiedianShow = false;
    		
    		//判断当前流程节点是否到最后一个经办人
    		$http({
		        method: 'GET', 
		        url:http+"/handler/work/work_do_jiedian/list.ashx?"+idStr+"&action=get_need_select_person&work_do_id="+work_do_id+"&work_jiedian_id="+work_jiedian_id+"&timeStamp=" + Date.parse(new Date()),
				dataType:"json"
		    })
		    .success(function (data, status, headers, config) {
		    	oldLastOne = data;
		    	if(data==1){
		    		//遍历流程节点，
		    		angular.forEach($scope.workJiedianList,function(e,i){
		    			if(e.sequence == $scope.current_sequence){
		    				if(i-1 >= 0){
		    					$scope.nextWorkFlow = $scope.workJiedianList[i-1];
		    					$scope.work_flow_name = $scope.nextWorkFlow.work_flow_name;
								$scope.isNextWorkFlowShow = true;
								if(!$scope.nextWorkFlow.user_name){
									$scope.isNextUserShow = true;
									$scope.next_user_id = "";
									$scope.next_user_name = "";
									$http({
							            method: 'GET', 
							            url: getUserUrl+"&timeStamp=" + Date.parse(new Date()),
							            dataType:"json",
							        })
							    	.success(function (data, status, headers, config) {
										zNodes=data;
										$.fn.zTree.init($("#treeDemo2"), setting2, zNodes);
							         })
							        .error(function (data, status, headers, config) {
							            alert("加载失败");  
							        });
								}else{
									$scope.next_user_id = $scope.nextWorkFlow.user_id;
									$scope.next_user_name = $scope.nextWorkFlow.user_name;
								}
		    				}
		    			}
		    		})
		    	}
		    })
    	}else if($scope.result == "2不同意"){
    		if($scope.current_sequence == 1){
    			$scope.isBackWorkJiedianShow = false;
    			return false;
    		}
    		$scope.isBackWorkJiedianShow = true;
    		if($scope.sequence_return){
    			angular.forEach($scope.workJiedianList,function(e,i){
	    			if(e.sequence == $scope.sequence_return){
	    				$scope.nextWorkFlow = e;
	    				$scope.work_flow_name = $scope.nextWorkFlow.work_flow_name;
						$scope.isNextWorkFlowShow = true;
						if(!$scope.nextWorkFlow.user_name){
							$scope.isNextUserShow = true;
							$scope.next_user_id = "";
							$scope.next_user_name = "";
							$http({
					            method: 'GET', 
					            url: getUserUrl+"&timeStamp=" + Date.parse(new Date()),
					            dataType:"json",
					        })
					    	.success(function (data, status, headers, config) {
								zNodes=data;
								$.fn.zTree.init($("#treeDemo2"), setting2, zNodes);
					         })
					        .error(function (data, status, headers, config) {
					            alert("加载失败");  
					        });
						}else{
							$scope.next_user_id = $scope.nextWorkFlow.user_id;
							$scope.next_user_name = $scope.nextWorkFlow.user_name;
						}
	    			}
	    		})
    		}else{ //不同意且不选择返回到某一节点：工作驳回
    			$scope.next_user_id = "";
				$scope.next_user_name = "";
				$http({
		            method: 'GET', 
		            url: getUserUrl+"&timeStamp=" + Date.parse(new Date()),
		            dataType:"json",
		        })
		    	.success(function (data, status, headers, config) {
					zNodes=data;
					$.fn.zTree.init($("#treeDemo2"), setting2, zNodes);
		         })
		        .error(function (data, status, headers, config) {
		            alert("加载失败");  
		        });
    		}
    		
    		
    	}
    }
    
    
    
     //获取当前节点
     var oldSequence = "";
    $scope.getCurrentWorkJiedian = function(){
    	$http({
	        method: 'GET', 
	        url:$scope.getCurrentWorkJiedianUrl+"&timeStamp=" + Date.parse(new Date()),
			dataType:"json"
	    })
	    .success(function (data, status, headers, config) {
	    	$scope.current_work_jiedian = data.rows[0].sequence_name;
	    	$scope.current_sequence = data.rows[0].sequence;
	    	oldSequence = data.rows[0].sequence;
	    	work_state = data.rows[0].work_state;
	    	getWorkJiedianList($scope.current_sequence);
	     })
    }
    //初始化时获取当前节点
    $scope.getCurrentWorkJiedian();

	//获取显示审批结果的方法
    $scope.getApproveResult = function(){
    	var getApproveResultUrl = http + "/handler/work/work_do_jiedian/list.ashx?" + idStr + "&sortField=&searchCondition=work_do_id="+work_do_id+"&pageNumber=1&pageSize=10&totalRecord=0&action=GetPages";
		$http({
	        method: 'GET', 
	        url:getApproveResultUrl+"&timeStamp=" + Date.parse(new Date()),
			dataType:"json"
	    })
	    .success(function (data, status, headers, config) {
	    	$scope.approveResultData = data.rows;
			var approveResult = data.rows[0];
			if(approveResult){
				$scope.isApproveResultShow = true;
			}
	     })
	    .error(function (data, status, headers, config) {
	
	    });   
    }
    
    //显示审批页面方法
    $scope.showApprove = function(){
    	$scope.isApproveShow = false;
		if(work_state != 2){
			//判断是否为审批人
	    	var getPrivilegeUrl = http + "/handler/work/work_do/list.ashx?" + idStr +"&searchCondition=work_do_id="+work_do_id+"&action=get_privilege";
			$http({
		        method: 'GET', 
		        url:getPrivilegeUrl+"&timeStamp=" + Date.parse(new Date()),
				dataType:"json"
		    })
		    .success(function (data, status, headers, config) {
//		    	console.log("审批人："+data);
				if(data == 1){
					//判断该审批人是否已经审批过该节点
					$http({
				        method: 'GET', 
				        url:http+"/handler/work/work_do_jiedian/list.ashx?"+idStr+"&action=get_need_show_shenpi&work_do_id="+work_do_id+"&work_jiedian_id="+work_jiedian_id+"&timeStamp=" + Date.parse(new Date()),
						dataType:"json"
				    })
				    .success(function (data1, status, headers, config) {
//				    	console.log("未审批："+data1);
				    	//如果未审批过该节点则显示审批页面
						if(data1 == 1){
							$scope.isApproveShow = true;
							$scope.description = "";
							$scope.result = "";
							$scope.isNextWorkFlowShow = false;
			    			$scope.isNextUserShow = false;
			    			$scope.isBackWorkJiedianShow = false;
						}
				    })
				}
		    })
	    }
	    
    }
    
    //获取workJiedianId
   	var getWorkJiedianIdUrl = http + "/handler/work/work_do/list.ashx?"+idStr+"&field=&sortField=&searchCondition=work_do_id="+work_do_id+"&pageNumber=1&pageSize=10&totalRecord=0&action=GetPage";
	var work_jiedian_id,sequence;
    $scope.getWorkJiedianId = function(url){
    	$http({
	        method: 'GET', 
	        url:url,
			dataType:"json"
	    })
	    .success(function (data, status, headers, config) {
	    	if(data.rows[0]){
	    		work_jiedian_id = data.rows[0].work_jiedian_id;
	    		sequence = data.rows[0].sequence;
	    		//初始化时是否显示审批页面
				$scope.showApprove(); 
	    	}
	    		   
    	})	
    }
    
    
    function funApprove(){
    	var result_id = $scope.result.substr(0,1);
	    var result_name = $scope.result.substr(1);
	    if($scope.nextWorkFlow){
	    	if(result_id && $scope.next_user_id){
	    		$scope.changeDisabled = true;

				var postUrl = http + "/handler/work/work_do_jiedian/list.ashx";
				var addJson = "[{'work_do_id':'"+work_do_id+"','work_jiedian_id':'"+work_jiedian_id+"','result_id':'"+result_id+"','result_name':'"+result_name
			    +"','sequence':'"+sequence+"','description':'"+$scope.description+"','user_id_next':'"+$scope.next_user_id
			    +"','user_name_next':'"+$scope.next_user_name+"'";
			    
			    //不同意时拼接回到工作节点的序号及内容
			    if(result_id == 2){
			    	if($scope.sequence_return){
			    		angular.forEach($scope.workJiedianList,function(e,i){
				    		if(e.sequence == $scope.sequence_return){
				    			$scope.sequence_name_return = e.sequence_name;
				    		}
				    	})
				    	addJson += ",'sequence_return':'"+$scope.sequence_return+"','sequence_name_return':'"+$scope.sequence_name_return+"'";
			    	}else{
			    		alert("请选择返回的工作节点");
			    		return false;
			    	}
				    	
			    }
			    
			    addJson += "}]";
			    
//				    console.log(addJson);
				var config = {json:addJson,sid:idStr.split("=")[1],action:"btn_add"};
				
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
		    		alert("提交成功");
		    		$scope.isApproveShow = false;
		    		$scope.getWorkJiedianId(getWorkJiedianIdUrl+"&timeStamp=" + Date.parse(new Date()));    
		    		$scope.getApproveResult();
		    		$scope.changeDisabled = false;
		    		$scope.getCurrentWorkJiedian();
		    		
		    		//显示与隐藏操作按钮
				    $http({
				        method: 'GET', 
				        url:$scope.showBtnsUrl+"&timeStamp=" + Date.parse(new Date()),
						dataType:"json"
				    })
				    .success(function (data, status, headers, config) {
				    	if(data==1){
				    		$scope.btn_show = true;
				    	}else{
				    		$scope.btn_show = false;
				    	}
				    })
				    
//				    //获取待办事项总数
//		    		getWorkWaitTotal($http);
		    		
		    		//重置经办人树数据
		    		$http({
				            method: 'GET', 
				            url: getUserUrl+"&timeStamp=" + Date.parse(new Date()),
				            dataType:"json",
				        })
				    	.success(function (data, status, headers, config) {
							zNodes=data;
							$.fn.zTree.init($("#treeDemo2"), setting2, zNodes);
				         })
				        .error(function (data, status, headers, config) {
				            alert("加载失败");  
				        });
		    		
			     })
			    .error(function (data, status, headers, config) {
			    	alert("提交出错");
			    	$scope.changeDisabled = false;
			    	
			    });
			    
				    
		    }else{
		    	alert("请准确填写内容");
		    }
	    }else{
	    	if(result_id){	
				var postUrl = http + "/handler/work/work_do_jiedian/list.ashx";
				var addJson = "[{'work_do_id':'"+work_do_id
			    +"','work_jiedian_id':'"+work_jiedian_id+"','result_id':'"+result_id+"','result_name':'"+result_name
			    +"','sequence':'"+$scope.current_sequence+"','description':'"+$scope.description+"','user_id_next':'','user_name_next':''";
			    
			     //不同意时拼接回到工作节点的序号及内容
			    if(result_id == 2){
			    	if($scope.sequence_return){
			    		angular.forEach($scope.workJiedianList,function(e,i){
				    		if(e.sequence == $scope.sequence_return){
				    			$scope.sequence_name_return = e.sequence_name;
				    		}
				    	})
				    	addJson += ",'sequence_return':'"+$scope.sequence_return+"','sequence_name_return':'"+$scope.sequence_name_return+"'";
			    	}else{
			    		if($scope.isBackWorkJiedianShow){
			    			if(!confirm("请选择返回的工作节点,否则该工作将被驳回")){
			    				return false;
			    			}
			    				
			    		}else{
			    			if(!confirm("该工作将被驳回")){
			    				return false;
			    			}
			    		}
			    	}
			    }
			    
			    addJson += "}]";
//				    console.log(addJson);
			    var config = {json:addJson,sid:idStr.split("=")[1],action:"btn_add"};
				
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
			    		alert("提交成功");
			    		$scope.isApproveShow = false;
			    		$scope.getWorkJiedianId(getWorkJiedianIdUrl+"&timeStamp=" + Date.parse(new Date()));    
			    		$scope.getApproveResult();
			    		$scope.changeDisabled = false;
			    		$scope.getCurrentWorkJiedian();
			    		
			    		//显示与隐藏操作按钮
					    $http({
					        method: 'GET', 
					        url:$scope.showBtnsUrl+"&timeStamp=" + Date.parse(new Date()),
							dataType:"json"
					    })
					    .success(function (data, status, headers, config) {
					    	if(data==1){
					    		$scope.btn_show = true;
					    	}else{
					    		$scope.btn_show = false;
					    	}
					    })
					    
//					    //获取待办事项总数
//		    			getWorkWaitTotal($http);
		    			
		    			//重置经办人树数据
		    			$http({
				            method: 'GET', 
				            url: getUserUrl+"&timeStamp=" + Date.parse(new Date()),
				            dataType:"json",
				        })
				    	.success(function (data, status, headers, config) {
							zNodes=data;
							$.fn.zTree.init($("#treeDemo2"), setting2, zNodes);
				        })
		    		
			    	}else if(data == 0){
			    		alert("提交失败");
			    		$scope.changeDisabled = false;
			    	}else if(data == -1){
			    		alert("没有权限");
			    	}
			    	
			    	
			     })
			    .error(function (data, status, headers, config) {
			    	alert("提交失败");
			    	$scope.changeDisabled = false;
			    });
		    }else{
		    	alert("请选择结果");
		    }
	    }
    }
    
    //判断权限，是否显示审批页面
    $scope.isApproveShow = false;
    $scope.isApproveResultShow = false;
    $scope.getApproveResult();
    $scope.getWorkJiedianId(getWorkJiedianIdUrl+"&timeStamp=" + Date.parse(new Date()));
    

    //提交审批触发事件
    $scope.changeDisabled = false;
    $scope.approveSure = function(){
    	//判断是否为审批人：如果不是则隐藏审批页面
    	var getPrivilegeUrl = http + "/handler/work/work_do/list.ashx?" + idStr +"&searchCondition=work_do_id="+work_do_id+"&action=get_privilege";
		$http({
	        method: 'GET', 
	        url:getPrivilegeUrl+"&timeStamp=" + Date.parse(new Date()),
			dataType:"json"
	    })
	    .success(function (data, status, headers, config) {
			if(data == 1){
				//判断是否为之前的节点：如果不是则更新当前节点
				$http({
			        method: 'GET', 
			        url:$scope.getCurrentWorkJiedianUrl+"&timeStamp=" + Date.parse(new Date()),
					dataType:"json"
			    })
			    .success(function (data1, status, headers, config) {
			    	if(oldSequence == data1.rows[0].sequence){
			    		//判断审批结果是否为同意；如果为同意则判断是否为最后一个审批人；
			    		if($scope.result == "1同意"){
			    			//判断当前流程节点是否到最后一个经办人
				    		$http({
						        method: 'GET', 
						        url:http+"/handler/work/work_do_jiedian/list.ashx?"+idStr+"&action=get_need_select_person&work_do_id="+work_do_id+"&work_jiedian_id="+work_jiedian_id+"&timeStamp=" + Date.parse(new Date()),
								dataType:"json"
						    })
						    .success(function (data2, status, headers, config) {
						    	//判断之前存储的是不是最后一个经办人：如果与之前一样则继续判断，否则显示下一节点
						    	if(data2 == 1 && oldLastOne != 1){
						    		alert("如有下一节点请选择下一节点经办人");
						    		$scope.getNextWorkFlow();
						    		return false;
						    	}else{
						    		funApprove();
						    	}
						    	
						    })
			    		}else{
			    			//如果是不同意则调用提交方法；
			    			funApprove();
			    		}
			    	}else{
			    		alert("该工作流程已被返回或被驳回");
			    		$scope.getCurrentWorkJiedian();
			    		$scope.getWorkJiedianId(getWorkJiedianIdUrl+"&timeStamp=" + Date.parse(new Date()));   
			    	}
			    	
			     })
				
				
			}else{
				$scope.isApproveShow = false;
				$scope.getApproveResult();
				alert("您没有该流程操作权限");
			}
	    })
    	
    	
						    	
    	
    }
    
    
    
    //获取本页面的树结构
	var userHref = http+"/handler/system/user/list.ashx?"+idStr;   

	$scope.zTree2Show = function(){
		$('#treeDemo2').slideToggle();
	}
    var zNodes;
    var setting2 = 
    {
        check: {
                  autoCheckTrigger: false,
                  nocheckInherit: false,
                  radioType: "all",
                  enable: true,
                  chkStyle: "checkbox",
                  chkboxType: { "Y": "ps", "N": "ps" }
              },
        data: {
             simpleData: {
                            enable: true
                         },
                    key: {
                            name: "dept_name",
                            children: "children",
                            id: "dept_id"
                         }
               },
     	callback: {
                      onClick: onClick2,
					  onCheck: onCheck2
              }
    };
    
      
    //获取树结构数据
	var getUserUrl = userHref+"&action=Get_dept_user";
	$http({
            method: 'GET', 
            url: getUserUrl+"&timeStamp=" + Date.parse(new Date()),
            dataType:"json",
        })
    	.success(function (data, status, headers, config) {
    		zNodes=data;
    		if($scope.searchObjectFineshed)
            {
                $.fn.zTree.init($("#treeDemo2"), setting2, zNodes);
            }else
            {
                var timer =setInterval(function(){
                    
                   if($scope.searchObjectFineshed)
                    {
                        $.fn.zTree.init($("#treeDemo2"), setting2, zNodes);
                        clearInterval(timer);
                    }
                },50);
            }
    		
    		
			
			
         })
        .error(function (data, status, headers, config) {
            alert("加载失败");  
        });


	function onClick2(e, treeId, treeNode) {
		var zTree = $.fn.zTree.getZTreeObj("treeDemo2");
		zTree.checkNode(treeNode, !treeNode.checked, null, true);
		return false;
	}

	function onCheck2(e, treeId, treeNode) {
		var zTree = $.fn.zTree.getZTreeObj("treeDemo2"),
		nodes = zTree.getCheckedNodes(true),
		v = "",
		vId = "";
		for (var i=0, l=nodes.length; i<l; i++) {
			v += nodes[i].dept_name + ",";
			vId += nodes[i].dept_id + ",";
		}
		if (v.length > 0 ){
			v = v.substring(0, v.length-1);
			vId = vId.substring(0, vId.length-1);
			$scope.next_user_id = vId; 
			$scope.next_user_name = v; 
		}else{
			$scope.next_user_id = ''; 
			$scope.next_user_name = '';
		}
		$('#next_user').val(v);
	}
}