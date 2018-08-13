//实时数据的排列,动态生成dataBox的宽度
$('.classBox').each(function(){
	if($(this).attr('id').indexOf('Current') != -1){
		var _width = $(this).width();
		//11=2*5（左右padding）+1（左边border）
		//241为一条数据的宽度
		_width = parseInt((_width -11)/241)*241;
		$(this).find('.dataBox').css('width',_width+'px');
	}
	
	if($(this).attr('id').indexOf('Light') != -1){
		var _width = $(this).width();
		$(this).find('.LightBox').css('width',_width+'px');
	}
	
})

//渲染背景图
if($('#intergratedMove').length>0){
	$('#intergratedMove').css({'background-size':$('#intergratedMove').width()+'px','background-repeat':'no-repeat','background-position':'center'});
}



$('.editorBox').hide();
$('.monitorCheck').hide();
$('#editorSelectChangeBox').hide();
$('#editorSelectDelBox').hide();
$('#typeSelectShow').show();
$('#EditorNameShow').show();
$('#addWidth').val('1000');
$('#addHeight').val('200');

//新增、修改、删除栏目、设置栏目的宽、高、外边距
$('.editorBtn').each(function(i,e){
	$(this).click(function(){
		$('.editorBox').show();
		
		//输入值限制
		$('#editorAdd b').each(function(){
			$(this).hide();
		})
		$('#addWidth').keyup(function(){
			if($(this).val() != undefined){
				var reg = /^(0|[1-9][0-9]*)$/;
		     	if(!reg.test($(this).val())){
		     		$(this).siblings('b').show();
		     	}else{
		     		if($(this).val()>1000){
		     			$(this).siblings('b').show();
		     		}else{
		     			$(this).siblings('b').hide();
		     		}
		     		
		     	}
			}else{
				$(this).siblings('b').hide();
			}
		})
		$('.required').each(function(i){
			if(i!=0){
				$(this).keyup(function(){
					if($(this).val() != undefined){
						var reg = /^(0|[1-9][0-9]*)$/;
				     	if(!reg.test($(this).val())){
				     		$(this).siblings('b').show();
				     	}else{
				     		$(this).siblings('b').hide();
				     	}
					}else{
						$(this).siblings('b').hide();
					}
				})
			}
		})
		
		
		
		
		
		$('#save').click(function(){
			if($('#editorSelect').val() == "新增"){
				$.each($('.required'), function() {
					if($(this).val()==undefined){
						$(this).val() = 0;
					}
				});
				if($('#typeSelect').val() && $('#addEditorName').val()){
					if($('#typeSelectShow').css('display')!="none" || $('#EditorNameShow').css('display')!="none"){
						alert("请根据要求填写相关内容");
						return;
					}
					
					var val = $('#typeSelect').val();
					var text = getText(val);
					
					var addHtml = '<div class="classBox" style="width: '+$('#addWidth').val()+'px;height: '+$('#addHeight').val()
					+'px;margin:'+$('#addMarginTop').val()+'px '+$('#addMarginRight').val()+'px '
					+$('#addMarginBottom').val()+'px '+$('#addMarginLeft').val()+'px;" id="'+text+$('#typeSelect').val()
					+'"><p><button class="dragBtn">编辑监控项</button><span>'+$('#addEditorName').val()+'</span></p></div>';
					
					$('.monitorBoxLeft').eq(i).append(addHtml);
					
					//隐藏编辑框并存储html
					$('.editorBox').hide();
					var html = $('.listPage').eq(1).html();
					localStorage.setItem('html',html);
					$('.listPage').eq(1).html(html);
				}else{
					alert("栏目类型与栏目名称不能为空");
				}
			}else if($('#editorSelect').val() == "修改"){
				$.each($('.required'), function() {
					if($(this).val()==undefined){
						$(this).val() = 0;
					}
				});
				if($('#editorSelectBox').val()){
					//设置修改框的栏目名称
					$('#'+$('#editorSelectBox').val()).find('p').find('span').html($('#addEditorName').val());
					//设置修改框的css
					$('#'+$('#editorSelectBox').val()).css({'width':$('#addWidth').val()+'px','height':$('#addHeight').val()+'px','marginTop':$('#addMarginTop').val()+'px','marginRight':$('#addMarginRight').val()+'px','marginBottom':$('#addMarginBottom').val()+'px','marginLeft':$('#addMarginLeft').val()+'px'});
					
					//隐藏编辑框并存储html
					$('.editorBox').hide();
					var html = $('.listPage').eq(1).html();
					localStorage.setItem('html',html);
					$('.listPage').eq(1).html(html);
				}
			}else if($('#editorSelect').val() == "删除"){
				if($('#editorSelectBox2').val()){
					//删除需要删除的编辑框
					if(confirm("确定删除该编辑框？")){
						$('#'+$('#editorSelectBox2').val()).remove();
						
						//隐藏编辑框并存储html
						$('.editorBox').hide();
						var html = $('.listPage').eq(1).html();
						localStorage.setItem('html',html);
						$('.listPage').eq(1).html(html);
					}
					
					
				}
			}
			
		})
		
		
		$('#addEditorName').keyup(function(){
			var val = $(this).val();
			var arr = [];
			var flag = true;
			if(val){
				$('.monitorBoxLeft').each(function(i,e){
					$.each($(this).children(),function(){
						arr.push($(this));
					})
				})
				$.each(arr, function() {
					if($(this).attr('id') != $('#editorSelectBox').val()){
						if(val == $(this).find('p').find('span').html()){
							flag = false;
						}
					}
						
				});
				if(flag){
					$('#EditorNameShow').hide();
				}else{
					$('#EditorNameShow').show();
				}
			}else{
				$('#EditorNameShow').show();
			}
				
		})
		
		$('#typeSelect').change(function(){
			var flag = true;
			var val = $(this).val();
			if(!val){
				$('#typeSelectShow').show();
			}else{
				if(val == "Move"){
					$('.classBox').each(function(){
						if($(this).attr('id').indexOf('Move') != -1){
							flag = false;
						}
					})
					if(flag){
						$('#typeSelectShow').hide();
					}else{
						$('#typeSelectShow').show();
					}
				}else{
					$('#typeSelectShow').hide();
				}
					
			}
				
		})
		
		
		$('#editorSelect').change(function(){
//					console.log($(this).val());
			if($(this).val() == "新增"){
				$('#editorSelectChangeBox').hide();
				$('#editorSelectDelBox').hide();
				$('#editorTypeBox').show();
				$('#editorAdd').show();
				$('#EditorNameShow').show();
			}else if($(this).val() == "修改"){
				$('#editorSelectDelBox').hide();
				$('#editorTypeBox').hide();
				$('#editorAdd').show();
				$('#EditorNameShow').hide();
				var changeArr = $('.monitorBoxLeft').eq(i).children();
				
				
				var editorSelectBoxHtml="<option></option>";
				$.each(changeArr, function(i,e) {
					var val = $(this).attr('id');
					
					var text = $(this).find('p').find('span').html();
					editorSelectBoxHtml += '<option value="'+val+'">'+text+'</option>'
				});
				$('#editorSelectBox').html(editorSelectBoxHtml);
				$('#editorSelectChangeBox').show();
				
				$('#editorSelectBox').change(function(){
					//获取被选中的栏目并显示该栏目的相关内容
					var ele = $(this).val();
					$('#addWidth').val($('#'+ele).width());
					$('#addHeight').val($('#'+ele).height());
					$('#addMarginTop').val(parseInt($('#'+ele).css('margin-top')));
					$('#addMarginRight').val(parseInt($('#'+ele).css('margin-right')));
					$('#addMarginBottom').val(parseInt($('#'+ele).css('margin-bottom')));
					$('#addMarginLeft').val(parseInt($('#'+ele).css('margin-left')));
					$('#addEditorName').val($('#'+ele).find('p').find('span').html());
				})
				
			}else if($(this).val() == "删除"){
				$('#editorSelectChangeBox').hide();
				$('#editorAdd').hide();
				var delArr = $('.monitorBoxLeft').eq(i).children();
				var editorSelectBox2Html="";
				$.each(delArr, function(i,e) {
					var val = $(this).attr('id');
					var text = $(this).find('p').find('span').html();
					editorSelectBox2Html += '<option value="'+val+'">'+text+'</option>'
				});
				$('#editorSelectBox2').html(editorSelectBox2Html);
				$('#editorSelectDelBox').show();
			}
		})
	})
})

$('#cancel').click(function(){
	$('.editorBox').hide();
})


$('#checkCancel').click(function(){
	$.each($('.lightSize'),function(){
		$(this).prop('checked',false);
	})
	$.each($('.checkLight'),function(){
		$(this).prop('checked',false);
	})
	$('.monitorCheck').hide();
})

$('.dragBtn').each(function(i){
	$(this).click(function(){
		//
		var arr1 = [{
				sequence:1,
				name:"名称1"
			},{
				sequence:2,
				name:"名称2"
			},{
				sequence:3,
				name:"名称3"
			},{
				sequence:4,
				name:"名称4"
			}];
		
		var arr2 = [{
				sequence:5,
				name:"名称5"
			},{
				sequence:6,
				name:"名称6"
			},{
				sequence:7,
				name:"名称7"
			},{
				sequence:8,
				name:"名称8"
			}]
		
		//获取所有指示灯数据并显示指示灯
		var allCheckLightHtml = "";
		$.each(arr1,function(i,e){
			allCheckLightHtml += '<li><p><input name="checkLight" class="checkLight" type="checkbox" value="'+e.sequence+'" /><span>'
							+e.name+'</span>&nbsp;&nbsp;&nbsp;亮灯图片颜色：<select class="lightColor"></select></p></li>';
		})
		$('#allCheckLight').html(allCheckLightHtml);
	    
	    //获取所有的实时数据
		var allCheckDataHtml = "";
		$.each(arr2,function(i,e){
			allCheckDataHtml += '<li><p><input name="checkData" class="checkData" type="checkbox" value="'+e.sequence+'" /><span>'
							+e.name+'</span>&nbsp;&nbsp;&nbsp;正方向图片：<select class="dataDerection"></select>&nbsp;&nbsp;&nbsp;反方向图片：<select class="dataDerection2"></select></p></li>';
		})
		$('#allCheckData').html(allCheckDataHtml);
		
		
		
		
		//默认指示灯的大小
		$.each($('.lightSize'), function() {
			if($(this).val() == 30){
				$(this).prop('checked',true);
			}
		});
		
		//显示监控项编辑框
		$('.monitorCheck').show();
		//获取当前栏目中内容为灯还是实时数据或者动画
		var arrLight = $(this).parents('.classBox').find('.light');
		var arrData = $(this).parents('.classBox').find('.data');
		var arrMove = $(this).parents('.classBox').find('.move');
		//获取当前栏目id
		var classBoxId = $(this).parents('.classBox').attr('id');
		
		//获取页面中已被选中的指示灯以及实时数据
		var arrAllLightId = [];
		var arrAllDataId = [];
		if(classBoxId.indexOf('Light') != -1){
			//显示指示灯选择项
			$('#checkLightBox').show();
			$('#checkDataBox').hide();
			$('#checkMoveBox').hide();
			
			
			
			//获取指示灯的图片选择
			$.ajax({
				url:http+"/handler/monitor/lamp_gallery/list.ashx?"+idStr+"&sortField=&searchCondition=status=1 and content='报警灯'&pageNumber=1&pageSize=1000&totalRecord=0&action=GetPages&timeStamp="+Date.parse(new Date()),
				async:false,
				success:function(data){
					var arr = JSON.parse(data).rows;
					var html = '';
					$.each(arr, function(i,e) {
						html += '<option value="'+e.file_url+'">'+e.content+' '+e.keyword+'</option>';
					});
					$('.lightColor').each(function(){
						$(this).html(html);
					})
					
					//默认指示灯的亮灯图片
					var localLightColor = [];
					if(localStorage.getItem('arrLightColor')){
						localLightColor = JSON.parse(localStorage.getItem('arrLightColor'));
					}
					if(localLightColor.length>0){
						$.each(localLightColor, function(i,e) {
							$.each($('.checkLight'), function(ii) {
								if($(this).val() == e.sequence){
									$('.lightColor').eq(ii).val(e.lightColor);
								}
							});
						});
					}
				}
			});
			
			//获取页面中其他栏目中的报警灯的id数组
			$('.classBox').each(function(){
				if($(this).attr('id')!=classBoxId){
					$(this).find('.light').each(function(){
						arrAllLightId.push($(this).attr('id'));
					})
				}
			})
		}else{
			//箭头方向
			$.ajax({
				url:http+"/handler/monitor/lamp_gallery/list.ashx?"+idStr+"&sortField=&searchCondition=status=1 and content='指示灯'&pageNumber=1&pageSize=1000&totalRecord=0&action=GetPages&timeStamp="+Date.parse(new Date()),
				async:false,
				success:function(data){
					var arrlamp = JSON.parse(data).rows;
					var lampHtml = '<option></option>';
					$.each(arrlamp, function(i,e) {
						lampHtml += '<option value="'+e.file_url+'">'+e.keyword+'</option>';
					});
					$('.dataDerection').html(lampHtml);
					$('.dataDerection2').html(lampHtml);
					
					//默认实时数据显示图片
					var localDataDerection = [];
					if(localStorage.getItem('arrDataDerection')){
						localDataDerection = JSON.parse(localStorage.getItem('arrDataDerection'));
					}
					if(localDataDerection.length>0){
						$.each(localDataDerection, function(i,e) {
							$.each($('.checkData'), function(ii) {
								if($(this).val() == e.sequence){
									$('.dataDerection').eq(ii).val(e.dataDerection);
									$('.dataDerection2').eq(ii).val(e.dataDerection2);
								}
							});
						});
					}else{
						$.each($('.dataDerection'), function(i) {
							$(this).val('');
							$('.dataDerection2').eq(i).val('');
						});
					}
				}
			});
			
			
			
			if(classBoxId.indexOf('Current') != -1){
				$('#checkLightBox').hide();
				$('#checkDataBox').show();
				$('#checkMoveBox').hide();
				$('.dataDerection').each(function(){
					$(this).prop('disabled',true);
				})
				$('.dataDerection2').each(function(){
					$(this).prop('disabled',true);
				})
			}else{
				$('#checkLightBox').hide();
				$('#checkDataBox').show();
				$('#checkMoveBox').show();
				$('.dataDerection').each(function(){
					$(this).prop('disabled',false);
				})
				$('.dataDerection2').each(function(){
					$(this).prop('disabled',false);
				})
				//获取动画图片
				$.ajax({
					url:http+"/handler/monitor/lamp_gallery/list.ashx?"+idStr+"&sortField=&searchCondition=status=1 and content='动画'&pageNumber=1&pageSize=1000&totalRecord=0&action=GetPages&timeStamp="+Date.parse(new Date()),
					async:false,
					success:function(data){
						var arrBackground = JSON.parse(data).rows;
						var moveBackHtml = '<option></option>';
						$.each(arrBackground, function(i,e) {
							moveBackHtml += '<option value="'+e.file_url+'">'+e.keyword+'</option>';
						});
						$('#moveBackground').html(moveBackHtml);
					}
				});
				if(localStorage.getItem('moveBackground')){
					$('#moveBackground').val(localStorage.getItem('moveBackground'));
				}
				
			}
			
			
				
			
			$('.classBox').each(function(){
				if($(this).attr('id')!=classBoxId){
					$(this).find('.data').each(function(){
						arrAllDataId.push($(this).attr('id'));
					})
					
					$(this).find('.move').each(function(){
						arrAllDataId.push($(this).attr('id'));
					})
				}
			})
		}
		//显示当前栏目的已选择项
		//选择灯
		if(arrLight.length != 0){
			$.each($('.checkLight'),function(){
				var val = $(this).val();
				var flag = true;
				$.each(arrLight, function() {
					if(val == $(this).attr('id')){
						flag = false;
					}
				})
				if(flag){
					$(this).prop('checked',false);
				}else{
					$(this).prop('checked',true);
				}
				
			})
			
			
		}
		//选择实时数据
		if(arrData.length != 0){
			$.each($('.checkData'),function(){
				var val = $(this).val();
				var flag = true;
				$.each(arrData, function() {
					if(val == $(this).attr('id')){
						flag = false;
					}
				})
				if(flag){
					$(this).prop('checked',false);
				}else{
					$(this).prop('checked',true);
				}
				
			})
		}
		
		//选择动画
		if(arrMove.length != 0){
			$.each($('.checkData'),function(){
				var val = $(this).val();
				var flag = true;
				$.each(arrMove, function() {
					if(val == $(this).attr('id')){
						flag = false;
					}
				})
				if(flag){
					$(this).prop('checked',false);
				}else{
					$(this).prop('checked',true);
				}
				
			})
		}
		
		
		
		
		
		//限制不能重复选择指示灯及实时数据
		$('.checkLight').each(function(){
			var val = $(this).val();
			var that = $(this);
			$.each(arrAllLightId, function(i,e) {
				if(val == e){
					$(that).prop('disabled',true);
				}
			});
		})
		$('.checkData').each(function(){
			var val = $(this).val();
			var that = $(this);
			$.each(arrAllDataId, function(i,e) {
				if(val == e){
					$(that).prop('disabled',true);
				}
			});
			
		})
		
		
		
		
		
		
		$('#checkSure').click(function(){
			//报警灯
			if(classBoxId.indexOf('Light') != -1){
				//存亮灯图片
				var arrLightColor = [];
				$.each($('.lightColor'), function(i) {
					arrLightColor.push({'sequence':$('.checkLight').eq(i).val(),'lightColor':$(this).val()});
				});
				localStorage.setItem('arrLightColor',JSON.stringify(arrLightColor));
				
				
				var width = $('#'+classBoxId).width;
				var checkLightHtml = '<div style="width:'+width+'px;" class="lightBox clearfix">';
						
				$('.checkLight').each(function(){
					if($(this).prop('checked')){
						var name = $(this).next().html();
						var lightSize;
						$.each($('.lightSize'), function() {
							if($(this).prop('checked')){
								lightSize = $(this).val();
							}
						});
						
						//显示选择的指示灯
						var lightWidth = $('#lightWidth').val()+"px";
						checkLightHtml +='<div class="light" id="'+$(this).val()
						+'"><div class="lightPic" style="width:'+lightWidth+';"><img style="width:'+lightSize+'px;" src="../../../images/huise.png"/></div><div class="lightName" style="width:'+lightWidth+';">'+name+'</div></div>';
					}
				})
				checkLightHtml += '</div>';
				if($('#'+classBoxId).find('.lightBox').length>0){
					$('#'+classBoxId).find('.lightBox').replaceWith(checkLightHtml);
				}else{
					$('#'+classBoxId).append(checkLightHtml);
				}
				
				//隐藏编辑框并存储html
				$('.monitorCheck').hide();
				var html = $('.listPage').eq(1).html();
				localStorage.setItem('html',html);
				$('.listPage').eq(1).html(html);
			//动画
			}else if(classBoxId.indexOf('Move') != -1){
				//存箭头方向
				var arrDataDerection = [];
				$.each($('.dataDerection'), function(i) {
					arrDataDerection.push({'sequence':$('.checkData').eq(i).val(),'dataDerection':$(this).val(),'dataDerection2':$('.dataDerection2').eq(i).val()});
				});
				localStorage.setItem('arrDataDerection',JSON.stringify(arrDataDerection));
				
				//存背景图
				if($('#moveBackground').val()){
					localStorage.setItem('moveBackground',$('#moveBackground').val());
				}
				
				//渲染动画数据
				var width = $('#'+classBoxId).width;
				var checkMoveHtml = '';
				var k=0;
				$('.checkData').each(function(){
					if($(this).prop('checked')){
						k++;
						var name = $(this).next().html();
						if($(this).siblings('.dataDerection').val()){
							checkMoveHtml +='<div class="move" style="left:0;top:'+k*25+'px" id="'+$(this).val()
							+'"><span class="moveName">'+name+'</span>&nbsp;&nbsp;&nbsp;<img alt="" src="'+http+$(this).siblings('.dataDerection').val()+'"/></div>';
						}else{
							checkMoveHtml +='<div class="move" style="left:0;top:'+k*25+'px" id="'+$(this).val()
							+'"><span class="moveName">'+name+'</span>&nbsp;&nbsp;&nbsp;<span class="moveValue">value</span></div>';
						}
							
					}
				})
				
				$('.move').remove();
				$('#'+classBoxId).append(checkMoveHtml);
				
				//渲染背景图
				$('#'+classBoxId).css({'background-image':'url('+http+$('#moveBackground').val()+')','background-size':$('#'+classBoxId).width()+'px','background-repeat':'no-repeat','background-position':'center'});
				
				//隐藏编辑框并存储html
				$('.monitorCheck').hide();
				var html = $('.listPage').eq(1).html();
				localStorage.setItem('html',html);
				$('.listPage').eq(1).html(html);
				
				
				
				
			//实时数据
			}else{
				//存箭头方向
				var arrDataDerection = [];
				$.each($('.dataDerection'), function(i) {
					arrDataDerection.push({'sequence':$('.checkData').eq(i).val(),'dataDerection':$(this).val(),'dataDerection2':$('.dataDerection2').eq(i).val()});
				});
				localStorage.setItem('arrDataDerection',JSON.stringify(arrDataDerection));
				
				var width = $('#'+classBoxId).width;
				var checkDataHtml = '<div style="width:'+width+'px;" class="dataBox clearfix">';
				$('.checkData').each(function(){
					if($(this).prop('checked')){
						var name = $(this).next().html();
						checkDataHtml +='<div class="data clearfix" id="'+$(this).val()
						+'"><div class="dataName">'+name+'</div><div class="dataValue">1111</div></div>';
					}
				})
				checkDataHtml += '</div>';
				
				if($('#'+classBoxId).find('.dataBox').length>0){
					$('#'+classBoxId).find('.dataBox').replaceWith(checkDataHtml);
				}else{
					$('#'+classBoxId).append(checkDataHtml);
				}
				
				//隐藏编辑框并存储html
				$('.monitorCheck').hide();
				var html = $('.listPage').eq(1).html();
				localStorage.setItem('html',html);
				$('.listPage').eq(1).html(html);
			}
		})
			
	})
})




	
$('.monitorCheck').mousedown(function(e){
	var el;
	el=$(this);
	
    var os = el.offset(); dx = e.pageX-os.left, dy = e.pageY-os.top;
    
    document.onmousemove=function(e){
    	el.offset({top: e.pageY-dy, left: e.pageX-dx});
    }
    
    document.onmouseup = function(e){
		document.onmousemove=null;
		document.onmouseup=null;  
		
	}
})

$('.move').mousedown(function(e){
	var el;
	el=$(this);
	
    var os = el.offset(); dx = e.pageX-os.left, dy = e.pageY-os.top;
    
    document.onmousemove=function(e){
    	el.offset({top: e.pageY-dy, left: e.pageX-dx});
    }
    
    document.onmouseup = function(e){
		document.onmousemove=null;
		document.onmouseup=null;  
		var html = $('.listPage').eq(1).html();
		localStorage.setItem('html',html);
		$('.listPage').eq(1).html(html);
	}
})

function getText(val){
	
	var i = 0;
	$('.classBox').each(function(){
		if($(this).attr('id').indexOf(val)){
			i++;		}
	})
	return i;
}