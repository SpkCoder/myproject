<template>
	<div class="menu clearfix">
  	  <div class="container clearfix" @load="noticeGroup()">

					<el-menu
						:default-active="activeIndex" 
						class="el-menu-demo nav" 
						mode="horizontal" 
						@select="handleSelect">
					  <el-submenu v-for='(item, index) in rows' :key="item.id" v-if='item.show == "true"' :index='item.id | toStr'>
					    <template slot="title"><a href="javascript:;">{{ item.name }}</a></template>
					    <el-menu-item v-for='(item2, index2) in item.children' :key="item2.id" v-if='item2.show == "true"' :index='item2.id | toStr'>
					    	<a :href="item2.href">{{ item2.name }}</a>
					    </el-menu-item>
					  </el-submenu>
					</el-menu>
					
					<el-menu class="el-menu-demo nav nav-right" mode="horizontal">
					  <el-submenu index="2">
					    <template slot="title"><a href="javascript:;"><i class="layui-icon"></i>admin</a></template>
					    <el-menu-item index="2-1"><a id="changePassword" href="javascript:;"><i class="layui-icon"></i>Change Password</a></el-menu-item>
					    <el-menu-item index="2-2"><a id="loginOut" href="javascript:;"><i class="layui-icon"></i>Sign Out</a></el-menu-item>
					  </el-submenu>
					</el-menu>
					 
					<div class="moblebar"><i class="el-icon-menu"></i></div>
	  		  
			</div>
	</div>
</template>


<script>
  export default {
  	name: 'Vmenu',
    data() {
      return {
        activeIndex: '400001',
        rows: [],
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
	            this.$http.get("/static/json/menu.json", {responseType: 'text'})
				.then(function(data){
					//console.log(data.body);
					if(typeof data.body != "object"){
			          alert(data.body);
			          window.location.href = "/login.html";
			          return;
			        }
					
					this.rows = data.body.rows;
					console.log(this.rows);
				},function(err){
					console.log("err: _getMenu")
				});
	    }
    
	},
	created: function () {
    	this._getMenu();
    }
  }
</script>

<style scoped>

</style>