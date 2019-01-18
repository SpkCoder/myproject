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
        <template slot="title">admin</template>
        <el-menu-item index="2-1"><a id="changePassword" href="javascript:;"><i class="layui-icon"></i>修改密码</a></el-menu-item>
        <el-menu-item index="2-2"><a id="loginOut" href="javascript:;"><i class="layui-icon"></i>安全退出</a></el-menu-item>
        <el-menu-item index="2-3"><a id="useHelp" href="/static/page/my_use_help.html"><i class="layui-icon"></i>使用说明</a></el-menu-item>
      </el-submenu>
    </el-menu>
    

  </div>
</template>

<script>
  export default {
    name: 'Vheader',
    data() {
      return {
        activeIndex: '100001',
        leftAsideShow: false,
        list: [],
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
			          window.location.href = "/login.html";
			          return;
			    }
					_this.list = data.body.rows;
					
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
        
      }
    
    },
    created: function () {
        this._getMenu();
    }

  }
</script>

<style scoped>

</style>


