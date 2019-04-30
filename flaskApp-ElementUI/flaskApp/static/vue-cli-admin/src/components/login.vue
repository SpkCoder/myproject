<template>
	<div class="view-body clearfix">
	    <div class="login-bg">
          <div class="login-box">
              <h1>仙鱼大数据平台</h1>
              <el-form ref="formData" :model="formData" :rules="rules" :label-position="labelPosition" size="medium" label-width="180px">
                <div class="login-top-box">
                  <el-form-item label="用户名" prop="username">
                      <el-input tabindex="1" type="text" v-model="formData.username" placeholder="输入用户名"></el-input>
                  </el-form-item>  
                    <el-form-item label="密码" prop="password">
                      <el-input tabindex="2" type="password" v-model="formData.password" placeholder="输入密码"></el-input>
                  </el-form-item>  
                  
                </div>
                <div class="login-bottom-box">
                    <el-form-item>
                          <el-button size="medium" type="primary" @click="submitForm">登录</el-button> <el-checkbox tabindex="3" v-model="formData.rememberMe">记住帐号？</el-checkbox> 
                      </el-form-item>
                </div>
            </el-form>
          </div>
      </div>
    </div>
</template>

<script>
import DB from '@/common/db';
import device from '@/common/device';
import formVerify from '@/common/formVerify';
export default {
	name: 'login',
  data () {
    return {
			labelPosition: 'top',
      formData: {
        username: '',
        password: '',
        rememberMe: false,
      },
      rules: {
        username:[
              { validator: function(rule, value, callback) {
                if(value == ""){
                    return callback(new Error('请输入用户名'));
                }
                callback();
                }, 
                trigger: 'blur' 
                }
            ],
          password:[
              { validator: function(rule, value, callback) {
                if(value == ""){
                    return callback(new Error('请输入密码'));
                }
                callback();
                }, 
                trigger: 'blur' 
                }
            ]
      }
    }
	},
	methods: {
      submitForm() {
        var _this = this;
        _this.$refs["formData"].validate (function (valid) {
            if(valid) {
              //console.log(_this.formData);
              device.px = screen.width +"x" + screen.height;
              var reqData = {'action': 'SignIn', 'whereJson': JSON.stringify({username: _this.formData.username, password: _this.formData.password, password: _this.formData.password}), 'osJson': JSON.stringify({os: device.os, px: device.px})};
              _this.$http.post(_this.url, reqData, {emulateJSON: true, responseType: 'text', credentials: true })
              .then(function (res) {
                  console.log(res.data);
                  if(res.data != "登录成功"){
                  _this.$message({duration: 1000, message: res.data});
                  return;
                }
                if(_this.formData.rememberMe == true){
                	localStorage.setItem("loginStatus",JSON.stringify(_this.formData));
                }else{
                	localStorage.removeItem("loginStatus");
                }
                localStorage.setItem("activeIndex","100001");
                //_this.$router.push({ path: '/' });
                window.location.href = '/';
              }, function (err) {
                  console.log(err);
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
  },
  created() {
		var _this = this;
    _this.url = _this.GLOBAL.host + _this.$route.path.replace(/\/page/,"/python");
    
    //获取登录状态
    if(localStorage.getItem("loginStatus")){
        var loginStatus = JSON.parse(localStorage.getItem("loginStatus"));
        _this.$set(_this.formData, 'username', loginStatus['username']);
        _this.$set(_this.formData, 'password', loginStatus['password']);
        _this.$set(_this.formData, 'rememberMe', loginStatus['rememberMe']);
    }
  }
}
</script>

<style scoped>
  
</style>
