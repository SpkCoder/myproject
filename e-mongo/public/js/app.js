require.config({
    //存放js的基目录,paths路径基于这个目录
    //默认这个目录的文件会全部加载
    baseUrl: '/js/jquery',
    
    //加载js
    paths: {
        director: '../director/director',
        Vue: '../vue/vue',
        directorRouter: '../router/directorRouter',
        dataDB: '../modeljs/dataDB',
        ELEMENT: '../element-ui/lib/index',
        locale: '../element-ui/lib/umd/locale/en',
        drag: '../modeljs/drag',
        formVerify: '../modeljs/formVerify'

    },
    shim: {"director": { 
    	          deps: ['jquery'],
                  exports: "director" 
                },
          'Vue': { 
                  exports: "Vue" 
              }
    }
});


require(['jquery','directorRouter','Vue','ELEMENT','locale','dataDB','drag'], function ($,directorRoute,Vue,ELEMENT,locale,dataDB,drag) {
	
	
	//初始化路由
	var router = directorRoute.router;
	router.init();
	
	if(!window.location.hash){
	  window.location.href = "/#/page/userList";
	}
	
	var dataDBInt = dataDB.int;
	
	Vue.use(ELEMENT, { locale })  //设置语言
    
    var dragInt = drag.int;
    
	
	//获取指定名称的cookie值
	function getCookie(name)
	{
			var strCookie=document.cookie;
			var arrCookie=strCookie.split(";");
			for(var i=0;i<arrCookie.length;i++)
			{
				var arr=arrCookie[i].split("=");
				if($.trim(arr[0]) == name)return arr[1];
			}
			return "";
	} 
	var loginingStr = getCookie("logining");
	   
    if(loginingStr){
   	 //获取登录信息
	  window.loginObj = JSON.parse(decodeURIComponent(loginingStr).split("j:")[1]);
	  //console.log(loginObj);
	  $("#UserName").html('<i class="layui-icon topmenu-layui-icon"></i>'+loginObj.UserName +'<span class="nav-more"></span>');
    }
	
	
	
    //获取菜单
    var url = '/json/menu.json';
    var reqData = 'action=findData'+"&timeStamp=" +Date.now();
	dataDBInt.findData(url,reqData,function (data) {
		//console.log(data);
		
		if(typeof data != "object"){
	          alert(data);
	          window.location.href = "/login.html";
	          return;
	    }
		
        //渲染topMenu
		var topNav = new Vue({
		  el: '#topNav',
		  data: {
		    rows: data.rows
		  }
		});
		
        topNav.$nextTick(function () {
          	//console.log("topNav渲染完成")
          	
          	if($("html,body").width() <= 768){
          	  //top菜单折叠
	  		  $("#topNav > li > a").on("click",function(){
	  		    var _thisLi = $(this).parent("li");
	  		    if(_thisLi.hasClass("actived")){
	  		      _thisLi.removeClass("actived");
	  		      _thisLi.find("dl").slideUp();
	  		    }else{
	  		      _thisLi.addClass("actived").siblings("li").removeClass("actived");
	  		      _thisLi.siblings("li").find("dl").slideUp();
	  		      _thisLi.find("dl").slideDown();
	  		    }
	  		  });
	  		  
	  		  $("#topNav > li dl dd a").on("click",function(){
	  		    $("#topNav").slideUp();$("#nav-menu-moble").addClass("nav-close");
	  		  });
	  		  
	  		  $("#nav-menu-moble").on("click",function () {
		          if($(this).hasClass("nav-close")){
		            $("#topNav").slideDown();$(this).removeClass("nav-close");
		          }else{
		            $("#topNav").slideUp();$(this).addClass("nav-close");
		          }
		      });
		      
		      $(window).on("resize",function(){
			      location.reload();
			  });
	  		  
          	}
	    });
	    
	    
	    //修改密码
		$("#changePassword").on("click",function(){
		    var formHtml = '<h4 id="dragbur"><span>Edit</span><i class="el-icon-close closeBtn"></i><i class="el-icon-plus plusBtn"></i><i class="el-icon-minus minusBtn"></i></h4>'
		      	formHtml += '<el-form :model="formData" :rules="rules" ref="formData" label-width="150px" name="edit" class="demo-ruleForm">';
	            formHtml+='<el-form-item label="UserName" prop="UserName"> <el-input disabled v-model="formData.UserName" auto-complete="off" name="UserName"></el-input> </el-form-item>';
	            formHtml+='<el-form-item label="Password" prop="Password"> <el-input type="Password" v-model="formData.Password" auto-complete="off" name="Password" placeholder="Please input Password"></el-input> </el-form-item>';
	            formHtml+='<el-form-item label="Confirm Password" prop="Password2"> <el-input type="Password" v-model="formData.Password2" auto-complete="off" name="password2" placeholder="Please input Password again"></el-input> </el-form-item>';

	            formHtml+='<el-form-item> <el-button type="primary" size="medium" @click="submitForm()">SUBMIT</el-button> <el-button size="medium" class="closeBtn">CANCEL</el-button> </el-form-item>';
	            formHtml+='</el-form>';
		      	$("#formApp").html(formHtml);
		      	
		      	setTimeout(function () {
		      		dragInt.resizeFn("formApp",formApp);
		      		dragInt.dragFn("formApp","window");
		      	},0);
                
		      	var formApp = new Vue({
				        el: '#formApp',
				        data: {
				         	formData: {
						        	UserName: loginObj.UserName,
							        Password: '',
							        Password2: ''
						        },
					        rules: {
					        	Password:[
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
					      		],
					        	Password2:[
					      		   { validator: function(rule, value, callback) {
										if(! /[(\w)|@|#|-|$|%|^|&|+|=|!|?]{8,36}/.test(value)){
									      return callback(new Error('Password must contain special character - @#-_$%^&+=!? and length>=8'));
									    }
										if(! /[_|@|#|-|$|%|^|&|+|=|!|?]+/.test(value)){
									      return callback(new Error('Password must contain special character - @#-_$%^&+=!? and length>=8'));
									    }
										if (value !== formApp.formData.Password) {
									        return callback(new Error('Two different Passwords'));
									    }
										callback();
									  }, 
						              trigger: 'blur' 
						            }
					      		]
					        }
				        },
					    methods: {
					      submitForm() {
					      	var _this = this;
					        this.$refs["formData"].validate (function (valid) {
								if(valid) {
									//console.log(formApp.formData);
									
				                    var searchJson={"UserName": formApp.formData.UserName};
						            var updateJson= {"Password": formApp.formData.Password};
						            var reqData2 = 'action=updateData&searchJson=' + JSON.stringify(searchJson) + '&updateJson=' + JSON.stringify(updateJson);
						            dataDBInt.updateData("/nodejs/login",reqData2,function (data2) {
						                _this.$message({duration: 1000, message: data2 });
                                        if(data2 != "Success"){return;}
                                        $("#formApp").hide(); 
						            });
						            
								}else {
									//console.log('error submit');
									return false;
								}
							});
					      },
					      resetForm() {
					        this.$refs["formData"].resetFields();
					      }
					    }
			         
		        });
		
		});
	  //修改密码 结束
	  
	  
	  
	  //退出登录
	  $("#loginOut").on("click",function () {
	  	 $.ajax({
			      url: "/nodejs/login",
			      type: "POST",
			      dataType:"text",
			      data:"action=signOut",
			      success: function (data,status,xhr) {
			      	//console.log("请求成功");
//			      	alert(data);
			      	window.location.href = "/login.html";
			      },
			      error: function (xhr,status,error) {
			      	//console.log("请求失败"); 
			      	window.location.href = "/login.html";
			      }
			});
	  });
	  //退出登录 结束
	
      
  });



})