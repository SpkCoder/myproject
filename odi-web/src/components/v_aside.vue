<template>
    <div id='left-aside' class="left-aside">
	    <div class="left-aside-scroll">
	    	<el-menu
		      :default-active="activeIndex" 
					:unique-opened=true
		      class="el-menu-vertical-demo"
		      @select="handleSelect"
		      @open="handleOpen"
	        @close="handleClose"
		      background-color="#23262E"
		      text-color="#fff"
		      active-text-color="#409eff">
					<template v-for='(item, index) in list'>
							<el-submenu :key="item.id" v-if='item.show == "true"' :index='item.id | toStr'>
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
	    </div>
	    <div class="side-arrow" @click="sideArrowClick"><i class="side-arrow-icon el-icon-arrow-left" style="font-size: 12px;"></i></div>
	</div>
</template>


<script>
  export default {
  	name: 'Vmenu',
    data() {
      return {
        activeIndex: '100001',
        leftAsideShow: true,
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
				//console.log(key, keyPath);
				localStorage.setItem("activeIndex",key);
	    },
	    handleOpen(key, keyPath) {
        // console.log(key, keyPath);
	    },
	    handleClose(key, keyPath) {
	      //console.log(key, keyPath);
	    },
	    _getMenu () {
			var _this = this;
		    if(!sessionStorage.getItem('tocken')){
	          _this.$router.push({ path: '/page/login' });
	          return false;
		    }

			var reqUrl = _this.GLOBAL.host + "/api/python/menu";
			var reqData = {"action":"findData", "tocken": sessionStorage.getItem('tocken')}
              _this.$axiosHttp.get(reqUrl, {"params":reqData}).then(function (res) {
                if(res.msg === '没有登录或登录已经过期！'){
                  _this.$router.push({ path: '/page/login' });
                  return false;
                }
                if(res.code != 200){
				  _this.$message({duration: 1000, message: res.msg});
                  return false;
                }
				_this.list = res.rows;
				_this.list[2].children.push({id: 120006, name: "历史告警", level: 2, parentId: 120000, show: "true", sort: 6, href: "#/page/alarm_list_history", children: []})
				_this.list[3].children.splice(2,1)
				_this.$emit('leftMenuOver',{'menuRows': _this.list});
              }).catch(function (err) {
                console.log(err);
              });
	    },
	    sideArrowClick () {
	    	if(this.leftAsideShow){
	    		document.querySelector(".left-aside").classList.add("left-aside-close");
	    		document.querySelector(".side-arrow").classList.add("left-aside-close");
	    		document.querySelector(".view-body").classList.add("left-aside-close");
	    		document.querySelector(".footer").classList.add("left-aside-close");
	    		document.querySelector(".side-arrow-icon").classList.remove('el-icon-arrow-left');
	    		document.querySelector(".side-arrow-icon").classList.add("el-icon-arrow-right");
	    		this.leftAsideShow = false;
	    	}else{
	    		document.querySelector(".left-aside").classList.remove("left-aside-close");
	    		document.querySelector(".side-arrow").classList.remove("left-aside-close");
	    		document.querySelector(".view-body").classList.remove("left-aside-close");
	    		document.querySelector(".footer").classList.remove("left-aside-close");
	    		document.querySelector(".side-arrow-icon").classList.remove('el-icon-arrow-right');
	    		document.querySelector(".side-arrow-icon").classList.add("el-icon-arrow-left");
	    		this.leftAsideShow = true;
	    	}
	    	
	    }
    
	},
	created: function () {
    	this._getMenu();
		this.$nextTick(function () {
				// console.log(this.GLOBAL);
				if(localStorage.getItem("activeIndex")){
					this.activeIndex = localStorage.getItem("activeIndex");
				}

			  if(document.body.clientWidth <= 768){
						document.querySelector(".left-aside").classList.add("left-aside-close");
						document.querySelector(".side-arrow").classList.add("left-aside-close");
						document.querySelector(".view-body").classList.add("left-aside-close");
						document.querySelector(".footer").classList.add("left-aside-close");
						document.querySelector(".side-arrow-icon").classList.remove('el-icon-arrow-left');
						document.querySelector(".side-arrow-icon").classList.add("el-icon-arrow-right");
				}

				// window.onresize= function () {
				// 	window.location.reload();
				// };
		});
    }
  }
</script>

<style scoped>

</style>