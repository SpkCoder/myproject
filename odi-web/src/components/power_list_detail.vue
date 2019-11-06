<template>
	<div class="view-body clearfix">
	    <div class="list-page-point">
		   <div class="container">
		     <p><i class="el-icon-location" style="font-size: 14px;"></i><span>{{modelName1}}&gt;&gt;{{modelName2}}&gt;&gt;{{modelName3}}</span></p>
		   </div>
		</div>
		<div class="list-page-box clearfix">
		  	  <div class="container clearfix">
						<div class="list-page" style="padding-left:50px">

              <el-tree
                v-loading.fullscreen.lock="fullLoading" element-loading-text="Loading" 
                :data="list"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="treeForm"
                :default-checked-keys="defaultChecked"
                :props="defaultProps"
                @check-change="handleCheckChange">
              </el-tree>

              <el-form ref="editForm" :model="editForm" :rules="rules" size="small" label-width="0px" style="margin-top:20px">
                  <el-form-item>
                    <el-button type="primary" @click="editSubmitForm">保存</el-button> <el-button onclick="javascript:history.go(-1)">返回</el-button>
                  </el-form-item>
              </el-form>

						</div>
					</div>
		</div>
    </div>
</template>

<script>
import moment from 'moment';
import formVerify from '@/common/formVerify';
export default {
	name: 'model_list',
	filters: {
    field_width_filter(value) {
       if(value){return value+"px"}
    }
  },
  data () {
    return {
			modelName1: null,
			modelName2: null,
			url: null,
			tabelwidth: null,
			list: null,
			fullLoading: true,
      defaultProps: { children: 'children', label: 'name' },
      defaultChecked: [],
      editForm: {},
      addForm: {},
			searchForm: {},
      page: 1,
      limit: 10,
      count: 0,
      sortJson : {},
      whereJson : {},
      rules: {}
    }
	},
	methods: {
    getData() {
      var _this = this;
      _this.fullLoading = true;
			var reqData = {"action":"findData", "page":_this.page, "limit":_this.limit, "whereJson":_this.whereJson, "sortJson":_this.sortJson, "tocken": sessionStorage.getItem('tocken')}
      _this.$axiosHttp.get(_this.url, {"params":reqData}).then(function (res) {
        _this.fullLoading = false;
        if(res.code != 200){
				  _this.$message({duration: 1000, message: res.msg});
          return false;
        }
        _this.list = res.rows;
        var arr = []
        _this.list.forEach(function (item,index) {
            if(item.checked == "true"){
              arr.push(item.id)
              item.children.forEach(function (item2,index2) {
                if(item2.checked == "true"){
                  arr.push(item2.id)
                }
              })
            }
        })
        _this.defaultChecked = arr;

        }).catch(function (err) {
          console.log(err);
        });

    },
    handleCheckChange(data, checked, indeterminate) {
        // console.log(data);
    },
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([{ id: 5, label: '二' }, { id: 9, label: '三' }]);
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([3]);
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
    editSubmitForm() {
        var _this = this;
        _this.$refs["editForm"].validate (function (valid) {
            if(valid) {
              // console.log(_this.$refs["treeForm"].getCheckedKeys());
              var whereJson = {"role_id": _this.$route.params.id};
              var updateJson = {"fn_id": _this.$refs["treeForm"].getCheckedKeys()};
              var reqData = {'action': 'updateData', 'whereJson': whereJson, 'updateJson': updateJson, "tocken": sessionStorage.getItem('tocken')};     
              _this.$axiosHttp.post(_this.url, reqData).then(function (res) {
                _this.$message({duration: 1000, message: res.msg});
                if(res.code != 200){ return false; }
                _this.getData();
              }).catch(function (err) {
                console.log(err);
              });
            }else {
              //console.log('error submit');
              return false;
            }
        });
    }
  },
  watch: {
      msg(value, oldValue) {
        //console.log(value, oldValue);
      }
  },
	created() {
    var _this = this;
    _this.whereJson = {"role_id": _this.$route.params.id};
    _this.url = _this.GLOBAL.host + "/api/python/power_list";
    _this.getData();

    var menuRows = _this.$store.state.menuRows;
    menuRows.forEach(function(item,index){
       item.children.forEach(function(item2,index2){
           if(item2.id == localStorage.getItem("activeIndex")){
              _this.modelName1 = item.name;
              _this.modelName2 = item2.name;
              _this.modelName3 = "角色权限";
              return false;
           }
        });
    });
  }
}
</script>

<style scoped>

</style>
