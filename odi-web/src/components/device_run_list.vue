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

								<div style="margin-bottom:10px; margin-left: -32px;">
									<el-form v-loading.fullscreen.lock="fullLoading" element-loading-text="Loading" ref="searchForm" :inline="true" :model="searchForm" :rules="rules" size="small" label-width="100px">
                      <template v-for='(item, index) in field_en'>
                          <template v-if='item == "client_ip"'>
														<el-form-item :key="index" :label="field_ch[index]">
                              <el-select v-model="searchForm['client_ip']" placeholder="">
                                <el-option label="全部" value=""> </el-option>
                                <el-option v-for="item2 in deviceList" :key="item2.id" :label="item2.ip" :value="item2.ip"> </el-option>
                              </el-select>
                            </el-form-item>
                          </template>
                          <template v-else-if='item == "code" || item == "name"'>
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
                        <el-button icon="el-icon-download" @click="btn_export()">导出</el-button>
                        <a style="display: none" id="a_export" href="" target="_self" download></a>
											</el-form-item>
										</el-form>
								</div>

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
									<!-- <el-table-column fixed="left" type="selection" width="40"></el-table-column> -->
									<template v-for='(item, index) in field_en'>
                      <el-table-column v-if='item == "cpu_rate"' :key="item.id" show-overflow-tooltip sortable="custom" :prop="item" :label="field_ch[index]" :width="field_width[index] | field_width_filter">
                        <template slot-scope="scope">
                          {{ scope.row.cpu_rate | cpu_rate_filter}}
                        </template>
                      </el-table-column>
                      <el-table-column v-else-if='item == "ram_rate"' :key="item.id" show-overflow-tooltip sortable="custom" :prop="item" :label="field_ch[index]" :width="field_width[index] | field_width_filter">
                        <template slot-scope="scope">
                          {{ scope.row.ram_rate | ram_rate_filter}}
                        </template>
                      </el-table-column>
											<el-table-column v-else :key="item.id" show-overflow-tooltip sortable="custom" :prop="item" :label="field_ch[index]" :width="field_width[index] | field_width_filter"> </el-table-column>
									</template>
                  <el-table-column fixed="right" label="操作" width="130"> 
                      <template slot-scope="scope"> 
                      <router-link :to="'/page/device_run_list_detail/' + scope.row.client_ip">
                        <el-button type="text" size="small" icon="el-icon-view">查看</el-button>
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
    cpu_rate_filter(value) {
       if(value >= 0){return parseInt(value*100)+"%"}
    },
    ram_rate_filter(value) {
       if(value >= 0){return parseInt(value*100)+"%"}
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
      fullLoading: false,
			data_type: null,
			field_ch: null,
			field_en: null,
			field_sort: null,
			field_width: null,
      editFormBox: false,
      addFormBox: false,
      searchFormBox: false,
      multipleSelection: [],
			deviceList: [],
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
				_this.field_ch = ["设备编号", "设备名称", "设备IP", "CPU使用率", "内存使用率", "接收流量(Kb)", "发送流量(Kb)", "网速(Kb/s)", "时间"];
				_this.field_en = ["code", "name", "client_ip", "cpu_rate", "ram_rate", "net_flow_receive", "net_flow_send", "net_speed", "log_time"];
				_this.data_type = ["text", "text", "text", "text", "text", "text", "text", "text", "text"];
				_this.field_width = [120, 120, 120, 120, 120, 140, 140, 120, 150];
				_this.field_width.forEach(element => {
						_this.tabelwidth+=Number(element);
				});
				_this.tabelwidth = _this.tabelwidth + 5 + 130 + "px";
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
    btn_export() {
        var _this = this;
        var reqData = {"action":"exportData", "page":_this.page, "limit":_this.limit, "whereJson":_this.whereJson, "sortJson":_this.sortJson, "tocken": sessionStorage.getItem('tocken')}
        _this.fullLoading = true;
        _this.$axiosHttp.get(_this.url, {"params":reqData}).then(function (res) {
          _this.fullLoading = false;
          if(res.code != 200){
            _this.$message({duration: 1000, message: res.msg});
            return false;
          }
          document.getElementById('a_export').href = _this.GLOBAL.host + res.url;
          document.getElementById('a_export').click();

        }).catch(function (err) {
          console.log(err);
        });
    },
    searchSubmitForm() {
        var _this = this;
        _this.$refs["searchForm"].validate (function (valid) {
            if(valid) {
              // console.log(_this.searchForm);
              _this.whereJson = {};
              for(var item in _this.searchForm){
                if(String(_this.searchForm[item]).trim()){_this.whereJson[item] = typeof(_this.searchForm[item]) == "string" ? _this.searchForm[item].trim() :  _this.searchForm[item]}
              };
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
      this.searchForm = {"code": "", "name": "", "client_ip": ""};
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

    //加载device_list
    var reqUrl = _this.GLOBAL.host+'/api/python/device_list'
    var reqData = {"action":"findData", "page":1, "limit":-1, "tocken": sessionStorage.getItem('tocken')}
    _this.$axiosHttp.get(reqUrl, {"params":reqData}).then(function (res) {
      if(res.code != 200){
        _this.$message({duration: 1000, message: res.msg});
        return false;
      }
      _this.deviceList = res.rows;
    }).catch(function (err) {
        console.log(err);
    });
    _this.$set(_this.searchForm, "client_ip", "");

  }
}
</script>

<style scoped>

</style>
