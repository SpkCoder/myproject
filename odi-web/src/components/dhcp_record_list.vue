<template>
	<div class="view-body clearfix">
	    <div class="list-page-point">
		   <div class="container">
		     <p><i class="el-icon-location" style="font-size: 14px;"></i><span>{{modelName1}}&gt;&gt;{{modelName2}}</span></p>
		   </div>
		</div>
		<div class="list-page-box clearfix">
		  	  <div class="container clearfix">
						<div class="list-page">

								<!-- <div style="margin-bottom:10px;">
									<el-form ref="searchForm" :inline="true" :model="searchForm" :rules="rules" size="small" label-width="100px">
                      <template v-for='(item, index) in field_en'>
                          <template v-if='item == "client_ip"'>
														<el-form-item :key="index" :label="field_ch[index]">
                              <el-input v-model="searchForm[item]"/>
                            </el-form-item>
                          </template>
													<template v-else>
                          </template>
                      </template>

											<el-form-item>
												<el-button icon="el-icon-search" type="primary" @click="searchSubmitForm">查询</el-button>
												<el-button icon="el-icon-refresh" @click="searchCancelSubmit">取消</el-button>
											</el-form-item>
										</el-form>
								</div> -->

								<el-table
									:data="list"
                  v-loading="listLoading"
									element-loading-text="Loading"
									border
									stripe
									highlight-current-row
									tooltip-effect="dark"
									size="small"
									@selection-change="selectionChange" 
									@sort-change="sortChange"
									:style={width:tabelwidth}>
									<el-table-column fixed="left" type="selection" width="40"></el-table-column>
									<template v-for='(item, index) in field_en'>
											<el-table-column v-if='item == "lease"' :key="item.id" show-overflow-tooltip sortable="custom" :prop="item" :label="field_ch[index]" :width="field_width[index] | field_width_filter">
                        <template slot-scope="scope">
                          {{ scope.row.lease | lease_filter}}
                        </template>
                      </el-table-column>
											<el-table-column v-else :key="item.id" show-overflow-tooltip sortable="custom" :prop="item" :label="field_ch[index]" :width="field_width[index] | field_width_filter"> </el-table-column>
									</template>
                  <el-table-column fixed="right" label="操作" width="130"> 
                      <template slot-scope="scope"> 
                      <router-link :to="'/page/dhcp_record_list_detail/' + scope.row.client_ip">
                        <el-button type="text" size="small" icon="el-icon-view">&nbsp;</el-button>
                      </router-link>
                      <!-- <el-button @click="edit(scope.row)" type="text" size="small" icon="el-icon-edit">&nbsp;</el-button> -->
                      <!-- <el-button @click="del(scope.row)" type="text" size="small" icon="el-icon-delete">&nbsp;</el-button> -->
                      </template> 
                  </el-table-column>
								</el-table>

								<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,50,100,500]" :page-size="limit" layout="prev, pager, next, jumper, total, sizes" :total="count"> 
									</el-pagination>

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
    },
    lease_filter(value) {
       if(value){return value/3600+"h"+Math.round(value%3600/60)+"min"}
    }
  },
  data () {
    return {
			modelName1: null,
			modelName2: null,
			url: null,
			tabelwidth: null,
			list: null,
			listLoading: true,
			data_type: null,
			field_ch: null,
			field_en: null,
			field_sort: null,
			field_width: null,
      editFormBox: false,
      addFormBox: false,
      searchFormBox: false,
      multipleSelection: [],
			permissionList: [],
      editForm: {},
      addForm: {},
			searchForm: {},
			roleClass: [],
      page: 1,
      limit: 10,
      count: 0,
      sortJson : {"log_time":-1},
      whereJson : {},
      rules: {}
    }
	},
	methods: {
    getData() {
      var _this = this;
      _this.listLoading = true;
			var reqData = {"action":"findData", "page":_this.page, "limit":_this.limit, "whereJson":_this.whereJson, "sortJson":_this.sortJson, "tocken": sessionStorage.getItem('tocken')}
      _this.$axiosHttp.get(_this.url, {"params":reqData}).then(function (res) {
        _this.listLoading = false;
        if(res.code != 200){
				  _this.$message({duration: 1000, message: res.msg});
          return false;
        }
				_this.list = res.rows;
				_this.field_ch = ["租期", "IP", "HOST", "MAC", "时间"];
				_this.field_en = ["lease", "client_ip", "client_host", "client_mac","log_time"];
				_this.data_type = ["text", "text", "text", "text", "text"];
				_this.field_width = [100, 120, 120, 120, 150];
				_this.field_width.forEach(element => {
						_this.tabelwidth+=Number(element);
				});
				_this.tabelwidth = _this.tabelwidth + 40 + 130 + 5 + "px";
        _this.page = res.page;
        _this.limit = res.limit;
        _this.count = res.count;

        _this.rules = formVerify.rules(_this.field_en,_this.data_type);
        }).catch(function (err) {
          console.log(err);
        });

    },
    selectionChange(dataArr) {
        var _this = this;
        _this.multipleSelection = dataArr;
        //选中的dataArr
        //console.log(dataArr);
    },
    sortChange(obj) {
        //排序
        //console.log(obj.prop +":"+obj.order);
        var _this = this;
        var type = (obj.order == "descending") ? -1 : 1;
        _this.sortJson = {};
        _this.sortJson[obj.prop] = type;
        _this.getData();
    },
    handleSizeChange(num) {
      var _this = this;
      _this.limit = num;
      _this.getData();
    },
    handleCurrentChange(num) {
      var _this = this;
      _this.page = num;
      _this.getData();
    },
    view(row) {
       //console.log(row);
    },
    searchSubmitForm() {
        var _this = this;
        _this.$refs["searchForm"].validate (function (valid) {
            if(valid) {
              // console.log(_this.searchForm);
              _this.whereJson = _this.searchForm
              _this.page = 1;
              _this.limit = 10;
              _this.getData();

            }else {
              console.log('error submit');
              return false;
            }
        });
    },
    searchCancelSubmit() {
      this.searchForm = {};
      this.$refs["searchForm"].resetFields();
      this.searchFormBox = false;
      this.whereJson = {};
      this.page = 1;
      this.limit = 10;
      this.getData();
    }
  },
  watch: {
      msg(value, oldValue) {
        //console.log(value, oldValue);
      }
  },
	created() {
		var _this = this;
		_this.url = _this.GLOBAL.host + _this.$route.path.replace(/\/page/,"/api/python");
    _this.getData();

    var menuRows = _this.$store.state.menuRows;
    menuRows.forEach(function(item,index){
       item.children.forEach(function(item2,index2){
           if(item2.id == localStorage.getItem("activeIndex")){
              _this.modelName1 = item.name;
              _this.modelName2 = item2.name;
              return false;
           }
        });
    });
  }
}
</script>

<style scoped>

</style>
