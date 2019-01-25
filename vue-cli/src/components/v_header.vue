<template>
  <div class="header">
    <div class="logo">
      <a style="display: inline-block;height: 100%;" class="logo" href="/">
      <img class="img-pc" height="100%" src="../assets/image/logo_pc.png">
      <img class="img-mobel" height="100%" src="../assets/image/logo_mobel.png">
      </a>
    </div>

    <el-menu
      :default-active="activeIndex" 
      class="el-menu-demo nav-left" 
      mode="horizontal" 
      background-color="#23262E"
      text-color="#fff"
      active-text-color="#409eff"
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
      background-color="#23262E"
      text-color="#fff"
      active-text-color="#409eff">
      <li class="el-submenu"> <div class="side-arrow-moble" @click="sideArrowClick"><i class="fa fa-navicon" style="font-size: 28px;"></i></div></li>
      <el-submenu index="2">
        <template slot="title">{{username}}</template>
        <el-menu-item index="2-1"><a style="display:block" @click="changePassword" href="javascript:;"><i class="layui-icon"></i>修改密码</a></el-menu-item>
        <el-menu-item index="2-2"><a style="display:block" @click="logOut" href="javascript:;"><i class="layui-icon"></i>安全退出</a></el-menu-item>
        <el-menu-item index="2-3"><a style="display:block" id="useHelp" href="/static/page/my_use_help.html" target="_blank"><i class="layui-icon"></i>使用说明</a></el-menu-item>
      </el-submenu>
    </el-menu>
    
    <el-dialog
      title="修改"
      :visible.sync="editFormBox"
      width="600px">
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="150px">
          <el-form-item label="UserName">
            <el-input disabled v-model="editForm.username"/>
          </el-form-item>

          <el-form-item label="Password" prop="password">
            <el-input v-model="editForm.password"/>
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
    props: ["msg"],
    data() {
      return {
        activeIndex: '100001',
        username: '',
        editFormBox: false,
        leftAsideShow: false,
        list: [],
        editForm: {
          user_name: '',
          password: ''
        },
        rules: {
            username:[
                { validator: function(rule, value, callback) {
                  if(value == ""){
                      return callback(new Error('Please input UserName'));
                  }
                  callback();
                  }, 
                  trigger: 'blur' 
                  }
              ],
            password:[
                { validator: function(rule, value, callback) {
                  if(! /[(\w)]{6,30}/.test(value)){
                    return callback(new Error('密码必须是字母数字下划线组合且长度>=8'));
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
          console.log(key, keyPath);
      },
      _getMenu () {
				var _this = this;
				var reqUrl = _this.GLOBAL.host + "/python/menu?action=findData&timeStamp=" + Date.now();
	      _this.$http.get(reqUrl, {responseType: 'text', withCredentials: true})
				.then(function(data){
					//console.log(data.body);
					if(typeof data.body != "object"){
			          alert(data.body);
			          _this.$router.push({ path: '/page/login' });
			          return;
			    }
          _this.list = data.body.rows;
          _this.$nextTick(function () {
            _this.$emit('topMenuOver',{});
          });
					
				},function(err){
					console.log("err: _getMenu");
				});
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
                // console.log(_this.editForm);
                var whereJson = {"username": _this.editForm.username};
                var updateJson = {"password": _this.editForm.password};
                var reqData = {'action': 'updateData', 'whereJson': JSON.stringify(whereJson), 'updateJson': JSON.stringify(updateJson)};
                DB.updateData(_this, reqData, function (resData) {
                  //console.log(resData)
                  _this.$message({duration: 1000, message: resData });
                  if(resData != "操作成功"){ return; }
                  _this.editFormBox = false;
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
        var reqData = {'action': 'SignOut'};
        _this.$http.post(_this.url, reqData, {emulateJSON: true, responseType: 'text', credentials: true })
        .then(function (res) {
            //console.log(res.data);
            _this.$router.push({ path: '/page/login' });
        }, function (err) {
            console.log(err);
        });
      }
    
    },
    watch: {
      msg(value, oldValue) {
        //console.log(value, oldValue);
        if(value == true){
          this._getMenu();
        }
      }
    },
    created: function () {
        var _this = this;
        _this.url = _this.GLOBAL.host + "/python/login";
        if(localStorage.getItem("loginStatus")){
            var loginStatus = JSON.parse(localStorage.getItem("loginStatus"));
            this.username = loginStatus['username'];
        }
    }

  }
</script>

<style scoped>

</style>


