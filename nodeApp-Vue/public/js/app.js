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
    },
});


require(['jquery','directorRouter','Vue','ELEMENT','dataDB','drag'], function ($,directorRoute,Vue,ELEMENT,dataDB,drag) {
	
	//初始化路由
	var router = directorRoute.router;
	router.init();
	
	if(!window.location.hash){
	  window.location.href = "/#/page/modelList";
	}
	
	var dataDBInt = dataDB.int;
    Vue.use(ELEMENT); 
    
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
	  loginObj = JSON.parse(decodeURIComponent(loginingStr).split("j:")[1]);
	  //console.log(loginObj);
	  $("#username").html('<i class="layui-icon topmenu-layui-icon"></i>'+loginObj.username +'<span class="nav-more"></span>');
    }
	
	
	function _getMenu() {
      $.ajax({
              type: "GET",
              url: url + "?action=findData&timeStamp=" +Date.now(),
              dataType:"text",
              success: function (data,status,xhr) {
                try {data = JSON.parse(data) } catch(e) {console.log(e)}
                console.log("请求菜单成功");
                if(typeof data != "object"){
		          alert(data);
		          window.location.href = "/login.html";
		          return;
		        }
                
                
                //渲染leftMenu
				var topNav = new Vue({
				  el: '#topNav',
				  data: {
				    rows: data.rows
				  }
				});
				
                topNav.$nextTick(function () {
                  	//console.log("topNav渲染完成")
                });


                //渲染leftMenu
				var leftNav = new Vue({
				  el: '#leftNav',
				  data: {
				    rows: data.rows
				  },
				  methods:{
				  	_leftMenuInit: function () {
				  	
				  	      //左侧菜单折叠
				  		  $("#leftNav > li > a").on("click",function(){
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
				  		  
				  		  $("#leftNav > li dl dd").on("click",function(){
				  		    $("#leftNav > li dl dd").removeClass("selected");
				  		    $(this).addClass("selected");
				  		  });
				  		  
				  		  //左侧菜单偏移
				  		  if($("html,body").width()>768){
					        $("#nav-side-arrow-pc").on("click",function () {
					          if($(this).hasClass("nav-side-arrow-close")){
					            $(".aside-left").animate({"left":"0"},500);$(this).animate({"left":"200px"},500);$(this).removeClass("nav-side-arrow-close");$(".vue-body").animate({"left":"200px"},500);$(".footer").animate({"left":"200px"},500);
					          }else{
					            $(".aside-left").animate({"left":"-200px"},500);$(this).animate({"left":"0"},500);$(this).addClass("nav-side-arrow-close");$(".vue-body").animate({"left":"0"},500);$(".footer").animate({"left":"0"},500);
					          }
					        });
					      }else{
					         
					         $("#nav-side-arrow-moble").on("click",function () {
					          if($(this).hasClass("nav-side-arrow-close")){
					            $(".aside-left").animate({"left":"0"},500);$(this).removeClass("nav-side-arrow-close");
					          }else{
					            $(".aside-left").animate({"left":"-200px"},500);$(this).addClass("nav-side-arrow-close");
					          }
					        });

					        
					        $("#Vue_routerView").on("touchstart",function (e) {
					          if(!$("#nav-side-arrow-moble").hasClass("nav-side-arrow-close")){
					            $(".aside-left").animate({"left":"-200px"},500);$("#nav-side-arrow-moble").addClass("nav-side-arrow-close");
					            return false;
					          }
					        });
					        
				            $(window).on("resize",function(){
						      location.reload();
						    });
					        
					      }
				  	}
				  }
				});
				
                leftNav.$nextTick(function () {
                  	//console.log("leftNav渲染完成");
                  	//初始化左侧折叠菜单开始
                  	this._leftMenuInit();
                });
                
                
                //修改密码
				$("#changePassword").on("click",function(){
				    var formHtml = '<h4 id="dragbur"><span>修改</span><i class="icon-font closeBtn">&#xe618</i></h4>'
				      	formHtml += '<el-form :model="formData" :rules="rules" ref="formData" label-width="150px" name="edit" class="demo-ruleForm">';
			            formHtml+='<el-form-item label="用户名" prop="username"> <el-input disabled v-model="formData.username" auto-complete="off" name="username"></el-input> </el-form-item>';
			            formHtml+='<el-form-item label="密码" prop="password"> <el-input v-model="formData.password" auto-complete="off" name="password" placeholder="请输入密码"></el-input> </el-form-item>';
			            formHtml+='<el-form-item label="确认密码" prop="password2"> <el-input v-model="formData.password2" auto-complete="off" name="password2" placeholder="确认密码"></el-input> </el-form-item>';

			            formHtml+='<el-form-item> <el-button type="primary" size="medium" @click="submitForm()">提交</el-button> <el-button size="medium" class="closeBtn">取消</el-button> </el-form-item>';
			            formHtml+='</el-form>';
				      	$("#formApp").html(formHtml);
				      	var left_px = ($(window).width() - $("#formApp").width())/2 +"px";
				      	var top_px = ($(window).height() - $("#formApp").height())/2 +"px";
				      	$("#formApp").css({left:left_px,top:top_px});
				      	$("#formApp").show();
				      	setTimeout(function () {
				      		dragInt.dragFn("formApp","window");
				      		$(".closeBtn").on("click",function () {
				      			$("#formApp").hide(); 
				      		});
				      	},500);
				      	
                        
				      	var formApp = new Vue({
					         el: '#formApp',
					         data() {
							      return {
							        formData: {
							        	username: loginObj.username,
								        password: '',
								        password2: ''
							        },
							        rules: {
							        	password:[
							      		   { validator: function(rule, value, callback) {
												if(! /^(\w){6,36}$/.test(value)){
											      return callback(new Error('密码必须是字母数字下划线组成且长度大于6'));
											    }
												callback();
											  }, 
								              trigger: 'blur' 
								            }
							      		],
							        	password2:[
							      		   { validator: function(rule, value, callback) {
												if(! /^(\w){6,36}$/.test(value)){
											      return callback(new Error('密码必须是字母数字下划线组成且长度大于6'));
											    }else if (value !== formApp.formData.password) {
										          callback(new Error('两次输入密码不一致!'));
										        }
												callback();
											  }, 
								              trigger: 'blur' 
								            }
							      		]
							        }
							      };
							    },
							    methods: {
							      submitForm() {
							      	var _this = this;
							        this.$refs["formData"].validate (function (valid) {
										if(valid) {
											//console.log(formApp.formData);
											
						                    var searchJson={"username": formApp.formData.username};
								            var updateJson= {"password": formApp.formData.password};
								            var reqData2 = 'action=updateData&searchJson=' + JSON.stringify(searchJson) + '&updateJson=' + JSON.stringify(updateJson);
								            dataDBInt.updateData("/nodejs/login",reqData2,function (data2) {
								                _this.$message({duration: 1000, message: data2 });
		                                        if(data2 != "操作成功"){return;}
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
					      data:"action=loginOut",
					      success: function (data,status,xhr) {
					      	console.log("请求成功");
					      	alert(data);
					      	window.location.href = "/login.html";
					      },
					      error: function (xhr,status,error) {
					      	console.log("请求失败"); 
					      	window.location.href = "/login.html";
					      }
					});
			  });
			  //退出登录 结束
                
                
                
              },
              error: function (xhr,status,error) {
                console.log("请求菜单失败"); 
              }
      });
  }
  var url = "/nodejs/menu";
  _getMenu(url);
	
	

});


