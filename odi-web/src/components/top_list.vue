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

                <template>
                  <el-tabs v-model="activeName" @tab-click="tabHandleClick">
                    <el-tab-pane label="Top100域名统计" name="tab1">
                        <div style="margin-bottom:10px; margin-left: -34px;">
                          <el-form v-loading.fullscreen.lock="fullLoading" element-loading-text="Loading" ref="searchForm" :inline="true" :model="searchForm" :rules="rules" size="small" label-width="100px">
                              <el-form-item label="设备IP">
                                <el-select v-model="searchForm['server_ip']" placeholder="">
                                  <el-option label="全部" value=""> </el-option>
                                  <el-option v-for="item2 in deviceList" :key="item2.id" :label="item2.ip" :value="item2.ip"> </el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label="域名">
                                <el-input v-model="searchForm['client_host']" placeholder=""/>
                              </el-form-item><br>
                              <el-form-item label="开始时间">
                                <el-date-picker v-model="searchForm['time_start']" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
                              </el-form-item>
                              <el-form-item label="结束时间">
                                <el-date-picker v-model="searchForm['time_end']" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
                              </el-form-item>

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
                              <el-table-column v-if='item == "err_rate"' :key="item.id" show-overflow-tooltip sortable="custom" :prop="item" :label="field_ch[index]" :width="field_width[index] | field_width_filter">
                                <template slot-scope="scope">
                                  {{ scope.row.err_rate | err_rate_filter}}
                                </template>
                              </el-table-column>
                              <el-table-column v-else-if='item == "index"' :key="item.id" :prop="item" :label="field_ch[index]" :width="field_width[index] | field_width_filter"> </el-table-column>
                              <el-table-column v-else :key="item.id" show-overflow-tooltip sortable="custom" :prop="item" :label="field_ch[index]" :width="field_width[index] | field_width_filter"> </el-table-column>
                          </template>
                        </el-table>

                        <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,50,100]" :page-size="limit" layout="prev, pager, next, jumper, total, sizes" :total="count"> 
                          </el-pagination> -->
                    </el-tab-pane>
                    <el-tab-pane label="Top100客户端IP统计" name="tab2">
                        <div style="margin-bottom:10px; margin-left: -34px;">
                          <el-form ref="searchForm2" :inline="true" :model="searchForm2" :rules="rules" size="small" label-width="100px">
                              <el-form-item label="设备IP">
                                <el-select v-model="searchForm2['server_ip']" placeholder="">
                                  <el-option label="全部" value=""> </el-option>
                                  <el-option v-for="item2 in deviceList" :key="item2.id" :label="item2.ip" :value="item2.ip"> </el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label="客户端IP">
                                <el-input v-model="searchForm2['client_ip']" placeholder=""/>
                              </el-form-item><br>
                              <el-form-item label="开始时间">
                                <el-date-picker v-model="searchForm2['time_start']" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
                              </el-form-item>
                              <el-form-item label="结束时间">
                                <el-date-picker v-model="searchForm2['time_end']" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
                              </el-form-item>

                              <el-form-item>
                                <el-button icon="el-icon-search" type="primary" @click="searchSubmitForm2">查询</el-button>
                                <el-button icon="el-icon-refresh" @click="searchCancelSubmit2">取消</el-button>
                                <el-button icon="el-icon-download" @click="btn_export2()">导出</el-button>
                                <a style="display: none" id="a_export2" href="" target="_self" download></a>
                              </el-form-item>
                            </el-form>
                        </div>

                        <el-table
                          :data="list2"
                          v-loading="listLoading"
                          element-loading-text="Loading"
                          border
                          stripe
                          highlight-current-row
                          tooltip-effect="dark"
                          size="small"
                          @selection-change="selectionChange" 
                          @sort-change="sortChange2"
                          :style={width:tabelwidth2}>
                          <!-- <el-table-column fixed="left" type="selection" width="40"></el-table-column> -->
                          <template v-for='(item, index) in field_en2'>
                              <el-table-column v-if='item == "err_rate"' :key="item.id" show-overflow-tooltip sortable="custom" :prop="item" :label="field_ch2[index]" :width="field_width2[index] | field_width_filter">
                                <template slot-scope="scope">
                                  {{ scope.row.err_rate | err_rate_filter}}
                                </template>
                              </el-table-column>
                              <el-table-column v-else-if='item == "index"' :key="item.id" :prop="item" :label="field_ch2[index]" :width="field_width2[index] | field_width_filter"> </el-table-column>
                              <el-table-column v-else :key="item.id" show-overflow-tooltip sortable="custom" :prop="item" :label="field_ch2[index]" :width="field_width2[index] | field_width_filter"> </el-table-column>
                          </template>
                        </el-table>

                        <!-- <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="page2" :page-sizes="[10,20,50,100]" :page-size="limit2" layout="prev, pager, next, jumper, total, sizes" :total="count2"> 
                          </el-pagination> -->
                    </el-tab-pane>
                  </el-tabs>
                </template>

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
    err_rate_filter(value) {
       if(value >= 0){return parseInt(value*100)+"%"}
    }
  },
  data () {
    return {
      activeName: 'tab1',
			modelName1: null,
			modelName2: null,
			url: null,
			tabelwidth: null,
			tabelwidth2: null,
			list: null,
			list2: null,
			listLoading: true,
			fullLoading: false,
			data_type: null,
			data_type2: null,
			field_ch: null,
			field_ch2: null,
			field_en: null,
			field_en2: null,
			field_sort: null,
			field_sort2: null,
			field_width: null,
			field_width2: null,
      multipleSelection: [],
      deviceList: [],
			searchForm: {},
			searchForm2: {},
      page: 1,
      limit: 100,
      count: 0,
      sortJson : {"num":-1},
      whereJson : {},
      page2: 1,
      limit2: 100,
      count2: 0,
      sortJson2 : {"num":-1},
      whereJson2 : {},
      deviceList: [],
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
        res.rows.forEach(function (item,index) {
          item.index = index+1;
        });
				_this.list = res.rows;
				_this.field_ch = ["#", "域名", "DNS查询次数", "错误次数", "错误率"];
				_this.field_en = ["index", "client_host", "num", "num_err", "err_rate"];
				_this.data_type = ["text", "text", "text", "text"];
				_this.field_width = [60, 400, 200, 200, 200];
				_this.field_width.forEach(element => {
						_this.tabelwidth+=Number(element);
				});
				_this.tabelwidth = _this.tabelwidth + 5 + "px";
        _this.page = res.page;
        _this.limit = res.limit;
        _this.count = res.count;

        }).catch(function (err) {
          console.log(err);
        });


    },
    getData2() {
      var _this = this;
      _this.listLoading = true;
			var reqData = {"action":"findData", "page":_this.page2, "limit":_this.limit2, "whereJson":_this.whereJson2, "sortJson":_this.sortJson2, "tocken": sessionStorage.getItem('tocken')}
      _this.$axiosHttp.get(_this.url, {"params":reqData}).then(function (res) {
        _this.listLoading = false;
        if(res.code != 200){
				  _this.$message({duration: 1000, message: res.msg});
          return false;
        }
        res.rows.forEach(function (item,index) {
          item.index = index+1;
        });
				_this.list2 = res.rows;
				_this.field_ch2 = ["#", "客户端IP", "DNS查询次数", "请求域名个数", "错误次数", "错误率"];
				_this.field_en2 = ["index", "client_ip", "num", "num_host", "num_err", "err_rate"];
				_this.data_type2 = ["text", "text", "text", "text", "text", "text"];
				_this.field_width2 = [60, 400, 150, 150, 150, 150];
				_this.field_width2.forEach(element => {
						_this.tabelwidth2+=Number(element);
				});
				_this.tabelwidth2 = _this.tabelwidth2 + 5 + "px";
        _this.page2 = res.page;
        _this.limit2 = res.limit;
        _this.count2 = res.count;

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
        // console.log(obj.prop +":"+obj.order);
        var _this = this;
        var type = (obj.order == "descending") ? -1 : 1;
        _this.sortJson = {};
        _this.sortJson[obj.prop] = type;
        _this.getData();
    },
    sortChange2(obj) {
        //排序
        //console.log(obj.prop +":"+obj.order);
        var _this = this;
        var type = (obj.order == "descending") ? -1 : 1;
        _this.sortJson2 = {};
        _this.sortJson2[obj.prop] = type;
        _this.getData2();
    },
    handleSizeChange(num) {
      var _this = this;
      _this.limit = num;
      _this.getData();
    },
    handleSizeChange2(num) {
      var _this = this;
      _this.limit2 = num;
      _this.getData2();
    },
    handleCurrentChange(num) {
      var _this = this;
      _this.page = num;
      _this.getData();
    },
    handleCurrentChange2(num) {
      var _this = this;
      _this.page2 = num;
      _this.getData2();
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
    btn_export2() {
        var _this = this;
        var reqData = {"action":"exportData", "page":_this.page2, "limit":_this.limit2, "whereJson":_this.whereJson2, "sortJson":_this.sortJson2, "tocken": sessionStorage.getItem('tocken')}
        _this.fullLoading = true;
        _this.$axiosHttp.get(_this.url, {"params":reqData}).then(function (res) {
          _this.fullLoading = false;
          if(res.code != 200){
            _this.$message({duration: 1000, message: res.msg});
            return false;
          }
          document.getElementById('a_export2').href = _this.GLOBAL.host + res.url;
          document.getElementById('a_export2').click();

        }).catch(function (err) {
          console.log(err);
        });
    },
    searchSubmitForm() {
        var _this = this;
        _this.$refs["searchForm"].validate (function (valid) {
            if(valid) {
              // console.log(_this.searchForm);
              delete _this.searchForm.log_time
              if(_this.searchForm.time_start && _this.searchForm.time_end){
                  var time_s_num = (new Date(_this.searchForm.time_end).getTime() - new Date(_this.searchForm.time_start).getTime())/1000;
                  if(time_s_num <= 0){
                    _this.$message({duration: 1000, message: "时间区间必须大于0秒！"});
                    return false;
                  }
                  _this.searchForm.log_time = {"$gte":_this.searchForm.time_start,"$lt":_this.searchForm.time_end}
              }
              _this.whereJson = {"type":"host"};
              // console.log(_this.searchForm)
              for(var item in _this.searchForm){
                if(String(_this.searchForm[item]).trim()){_this.whereJson[item] = typeof(_this.searchForm[item]) == "string" ? _this.searchForm[item].trim() :  _this.searchForm[item]}
              };
              if(_this.whereJson.client_host){
                _this.whereJson.client_host = "/"+_this.whereJson.client_host+"/"
              }
              delete _this.whereJson.time_start
              delete _this.whereJson.time_end
              _this.page = 1;
              _this.limit = 100;
              _this.getData();

            }else {
              console.log('error submit');
              return false;
            }
        });
    },
    searchSubmitForm2() {
        var _this = this;
        _this.$refs["searchForm2"].validate (function (valid) {
            if(valid) {
              // console.log(_this.searchForm2);
              delete _this.searchForm2.log_time
              if(_this.searchForm2.time_start && _this.searchForm2.time_end){
                  var time_s_num = (new Date(_this.searchForm2.time_end).getTime() - new Date(_this.searchForm2.time_start).getTime())/1000;
                  if(time_s_num <= 0){
                    _this.$message({duration: 1000, message: "时间区间必须大于0秒！"});
                    return false;
                  }
                  _this.searchForm2.log_time = {"$gte":_this.searchForm2.time_start,"$lt":_this.searchForm2.time_end}
              }
              _this.whereJson2 = {"type":"ip"};
              for(var item in _this.searchForm2){
                if(String(_this.searchForm2[item]).trim()){_this.whereJson2[item] = typeof(_this.searchForm2[item]) == "string" ? _this.searchForm2[item].trim() :  _this.searchForm2[item]}
              };
              delete _this.whereJson2.time_start
              delete _this.whereJson2.time_end
              _this.page2 = 1;
              _this.limit2 = 100;
              _this.getData2();

            }else {
              console.log('error submit');
              return false;
            }
        });
    },
    searchCancelSubmit() {
      this.searchForm = {};
      this.whereJson = {"type": "host", "log_time": {"$gte":moment().format("YYYY-MM-DD HH:mm:ss").split(" ")[0]+" 00:00:00","$lt":moment().format("YYYY-MM-DD HH:mm:ss")}};
      this.$set(this.searchForm, "time_start", this.whereJson.log_time["$gte"]);
      this.$set(this.searchForm, "time_end", this.whereJson.log_time["$lt"]);
      this.$set(this.searchForm, "server_ip", "");
      this.$refs["searchForm"].resetFields();
      this.page = 1;
      this.limit = 100;
      this.getData();
    },
    searchCancelSubmit2() {
      this.searchForm2 = {};
      this.whereJson2 = {"type": "ip", "log_time": {"$gte":moment().format("YYYY-MM-DD HH:mm:ss").split(" ")[0]+" 00:00:00","$lt":moment().format("YYYY-MM-DD HH:mm:ss")}};
      this.$set(this.searchForm2, "time_start", this.whereJson2.log_time["$gte"]);
      this.$set(this.searchForm2, "time_end", this.whereJson2.log_time["$lt"]);
      this.$set(this.searchForm2, "server_ip", "");
      this.$refs["searchForm2"].resetFields();
      this.page2 = 1;
      this.limit2 = 100;
      this.getData2();
    },
    tabHandleClick(tab, event) {
      // console.log(tab.name);
      if(tab.name == "tab1"){
        this.getData();
      }
      if(tab.name == "tab2"){
        this.getData2();
      }
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
    _this.whereJson = {"type": "host", "log_time": {"$gte":moment().format("YYYY-MM-DD HH:mm:ss").split(" ")[0]+" 00:00:00","$lt":moment().format("YYYY-MM-DD HH:mm:ss")}};
    _this.$set(_this.searchForm, "time_start", _this.whereJson.log_time["$gte"]);
    _this.$set(_this.searchForm, "time_end", _this.whereJson.log_time["$lt"]);
    _this.whereJson2 = {"type": "ip", "log_time": {"$gte":moment().format("YYYY-MM-DD HH:mm:ss").split(" ")[0]+" 00:00:00","$lt":moment().format("YYYY-MM-DD HH:mm:ss")}};
    _this.$set(_this.searchForm2, "time_start", _this.whereJson2.log_time["$gte"]);
    _this.$set(_this.searchForm2, "time_end", _this.whereJson2.log_time["$lt"]);
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
    _this.$set(_this.searchForm, "server_ip", "");
    _this.$set(_this.searchForm2, "server_ip", "");

  }
}
</script>

<style scoped>

</style>
