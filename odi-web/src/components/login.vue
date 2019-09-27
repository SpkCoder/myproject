<template>
	<div class="view-body clearfix">
	    <div class="login-bg">
          <div class="login-box">
              <div class="logo-box">
                <img src="../assets/image/logo.png" />
                <h1>DNS集中监控系统</h1>
              </div>
              <el-form ref="formData" :model="formData" :rules="rules" :label-position="labelPosition" size="medium" label-width="60px">
                <div class="login-top-box">
                  <el-form-item label="用户名" prop="username">
                      <el-input tabindex="1" type="text" v-model="formData.username" placeholder="输入用户名"></el-input>
                  </el-form-item>  
                    <el-form-item label="密码" prop="password">
                      <el-input tabindex="2" type="password" v-model="formData.password" placeholder="输入密码"></el-input>
                  </el-form-item> 
                  <el-form-item label="验证码" prop="code">
                      <el-input style="width:160px" tabindex="3" type="text" v-model="formData.code" placeholder="输入验证码"></el-input><img @click="codeClick" style="height: 34px; margin-left: 10px;" :src="formData.srcCode">
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
			labelPosition: 'right',
      formData: {
        username: '',
        password: '',
        code: '',
        srcCode: '',
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
            ],
          code:[
              { validator: function(rule, value, callback) {
                if(value == ""){
                    return callback(new Error('请输入验证码'));
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
      codeClick() {
         var _this = this;
          var srcCode = _this.GLOBAL.host+"/api/python/login?params={%22action%22:%22getCode%22}&timeStamp="+Date.now();
          _this.$set(_this.formData, 'srcCode', srcCode);
      },
      submitForm() {
        var _this = this;
        _this.$refs["formData"].validate (function (valid) {
            if(valid) {
              //console.log(_this.formData);
              device.px = screen.width +"x" + screen.height;
              var reqData = {"action":"SignIn", "username":_this.formData.username,"password":_this.formData.password, "code":_this.formData.code}
              _this.$axiosHttp.post(_this.url, reqData).then(function (res) {
                if(res.code != 200){
                  _this.$message({duration: 1000, message: res.msg});
                  return false;
                }
                sessionStorage.setItem("username", _this.formData.username);
                sessionStorage.setItem("tocken", res.tocken);
                localStorage.setItem("activeIndex","100001");
                if(_this.formData.rememberMe == true){
                  delete _this.formData.code
                  delete _this.formData.srcCode
                	localStorage.setItem("loginStatus",JSON.stringify(_this.formData));
                }else{
                	localStorage.removeItem("loginStatus");
                }
                // _this.$router.push({ path: '/' });
                window.location.href = '/';
              }).catch(function (err) {
                console.log(err);
              });
            }else {
              console.log('error submit');
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
    _this.url = _this.GLOBAL.host + _this.$route.path.replace(/\/page/,"/api/python");
    var srcCode = _this.GLOBAL.host+"/api/python/login?params={%22action%22:%22getCode%22}&timeStamp="+Date.now();
    _this.$set(_this.formData, 'srcCode', srcCode);


    // 获取登录状态
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
