<template>
  <div class="header">
    <div class="logo">
      <a style="display: inline-block;height: 100%;" class="logo" href="/">
      <h2 class="logo-text" >dnsmgr 1.0.0</h2>
      <!-- <img class="img-pc" height="100%" src="../assets/image/logo_pc.png">
      <img class="img-mobel" height="100%" src="../assets/image/logo_mobel.png"> -->
      </a>
    </div>

    <el-menu
      :default-active="activeIndex" 
      class="el-menu-demo nav-left" 
      mode="horizontal" 
      background-color="#1f2935"
      text-color="rgba(255,255,255,.7)"
      active-text-color="rgba(255,255,255,.7)"
      @select="handleSelect">
      <template v-for='(item, index) in list'>
          <el-submenu :key="item.id" v-if='item.position == "top" && item.show == "true"' :index='item.id | toStr'>
            <template slot="title"><i :class="item.iconfont"></i><span class="itemName1">{{ item.name }}</span></template>
            <template v-for='(item2, index2) in item.children'>
                <el-menu-item :key="item2.id" v-if='item2.show == "true"' :index='item2.id | toStr'>
                  <i :class="item.iconfont"></i>
                  <a :href="item2.href">{{ item2.name }}</a>
                </el-menu-item>
            </template>
          </el-submenu>
      </template>
    </el-menu>
    
    <el-menu class="el-menu-demo nav-right" mode="horizontal"
      background-color="#1f2935"
      text-color="rgba(255,255,255,.7)"
      active-text-color="rgba(255,255,255,.7)">
      <li class="el-submenu"> <div class="side-arrow-moble" @click="sideArrowClick"><i class="fa fa-navicon" style="font-size: 28px;"></i></div></li>
      <el-submenu index="2">
        <template slot="title"><i class="fa fa-user" style="margin-right: 5px;"></i>{{username}}</template>
        <el-menu-item index="2-1"><a style="display:block" @click="changePassword" href="javascript:;"><i class="layui-icon"></i>修改密码</a></el-menu-item>
        <el-menu-item index="2-2"><a style="display:block" @click="logOut" href="javascript:;"><i class="layui-icon"></i>安全退出</a></el-menu-item>
      </el-submenu>
    </el-menu>
    
    <el-dialog
      title="修改"
      :visible.sync="editFormBox"
      width="600px">
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="150px">
          <el-form-item label="用户名">
            <el-input disabled v-model="editForm.username"/>
          </el-form-item>

          <el-form-item label="密码" prop="password" type="password" required>
            <el-input v-model="editForm.password"/>
          </el-form-item>

          <el-form-item label="新密码" prop="password2" type="password" required>
            <el-input v-model="editForm.password2"/>
          </el-form-item>

          <el-form-item label="重复新密码" prop="password3" type="password" required>
            <el-input v-model="editForm.password3"/>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="editSubmitForm">提交</el-button>
            <el-button @click="editCancelSubmit">取消</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>

  </div>
</template>

<script>
  import DB from '@/common/db';
  export default {
    name: 'Vheader',
    props: ["msg","menuRows"],
    data() {
      var _this = this;
      return {
        activeIndex: '100001',
        username: '',
        editFormBox: false,
        leftAsideShow: false,
        list: [],
        editForm: {
          username: '',
          password: '',
          password2: '',
          password3: ''
        },
        rules: {
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
            password2:[
                { validator: function(rule, value, callback) {
                  if(! /[(\w)]{6,30}/.test(value)){
                    return callback(new Error('密码必须是字母数字下划线组合且长度>=6'));
                  }
                  callback();
                  }, 
                    trigger: 'blur' 
                  }
              ],
            password3:[
                { validator: function(rule, value, callback) {
                  if(value == ""){
                      return callback(new Error('请重复新密码'));
                  }
                  if(value != _this.editForm.password2){
                    return callback(new Error('两次密码输入不一致'));
                  }
                  callback();
                  }, 
                    trigger: 'blur' 
                  }
              ]
        }
      };
    },
    filters: {
      toStr: function (value) {
        if (!value) return '';
        return value.toString();
      }
    },
    methods: {
      handleSelect(key, keyPath) {
				//console.log(key, keyPath);
				localStorage.setItem("activeIndex",key);
	    },
      sideArrowClick () {
        if(this.leftAsideShow){
          document.querySelector(".left-aside").classList.add("left-aside-close");
          this.leftAsideShow = false;
        }else{
          document.querySelector(".left-aside").classList.remove("left-aside-close");
          this.leftAsideShow = true;
        }
        
      },
      changePassword() {
        this.$set(this.editForm, 'username', this.username);
        this.editFormBox = true;
      },
      editSubmitForm() {
          var _this = this;
          _this.$refs["editForm"].validate (function (valid) {
              if(valid) {
                var reqData = {
                      "action": "updateData",
                      "whereJson": { "username": _this.editForm.username, "password": _this.editForm.password },
                      "updateJson": { "password": _this.editForm.password2 },
                      "tocken": sessionStorage.getItem('tocken')
                }
                _this.$axiosHttp.post(_this.url, reqData).then(function (res) {
                  _this.$message({duration: 1000, message: res.msg });
                  if(res.code != 200){
                    return false;
                  }
                _this.$refs["editForm"].resetFields();
                _this.editFormBox = false;
                _this.$router.push({ path: '/page/login' });
                }).catch(function (err) {
                  console.log(err);
                });
              }else {
                //console.log('error submit');
                return false;
              }
          });
      },
      editCancelSubmit() {
        this.$refs["editForm"].resetFields();
        this.editFormBox = false;
      },
      logOut() {
        var _this = this;
        var reqData = {'action': 'SignOut', "username": _this.username, "tocken": sessionStorage.getItem('tocken')};
        _this.$axiosHttp.post(_this.url, reqData).then(function (res) {
          // if(res.code != 200){
          //   _this.$message({duration: 1000, message: res.msg});
          //   return false;
          // }
        _this.$router.push({ path: '/page/login' });
        }).catch(function (err) {
          console.log(err);
        });
      }
    
    },
    watch: {
      msg(value, oldValue) {
        //console.log(value, oldValue);
        if(value == true){
          this.list = this.menuRows;
        }
      }
    },
    created: function () {
        var _this = this;
        _this.url = _this.GLOBAL.host + "/api/python/login";
        this.username = sessionStorage.getItem('username');
        
    }

  }
</script>

<style scoped>

</style>


