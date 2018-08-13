<template>
	<div class="menu clearfix">
  	  <div class="container clearfix" @load="noticeGroup()">

					<el-menu
						:default-active="activeIndex" 
						class="el-menu-demo nav" 
						mode="horizontal" 
						@select="handleSelect">
					  <el-submenu v-for='(item, index) in rows' :key="item.id" :index='item.id | toStr' v-if='item.show == "true"'>
					    <template slot="title"><a href="javascript:;">{{ item.name }}</a></template>
					    <el-menu-item v-for='(item2, index2) in item.children' :key="item2.id" :index='item2.id | toStr' v-if='item2.show == "true"'>
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
  import $ajax from '../assets/js/ajax';
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
	    	var _this = this;
    	    $ajax({ 
			  type:"GET", 
			  url:"/static/json/menu.json", 
			  dataType:"json", 
			  success:function(data){
			  	//console.log(data);
			    if(typeof data != "object"){
		          alert(data);
		          return;
		        }
				
				_this.rows = data.rows;
			  }, 
			  error:function(err){ 
			    console.log("Err: _getMenu")
			  } 
            });   
	    }
    
	},
	created: function () {
      	this._getMenu();
    }
  }
</script>