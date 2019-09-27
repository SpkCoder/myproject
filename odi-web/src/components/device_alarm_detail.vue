<template>
	<div class="view-body clearfix">
	    <div class="list-page-point">
		   <div class="container">
		     <p><i class="el-icon-location" style="font-size: 14px;"></i><span>{{modelName1}}&gt;&gt;{{modelName2}}&gt;&gt;{{modelName3}}</span></p>
		   </div>
		</div>
		<div class="list-page-box clearfix">
		  	  <div class="container clearfix">
						<div class="list-page">

                <template>
                  <el-tabs v-model="activeName" @tab-click="tabHandleClick">
                    <el-tab-pane label="活动告警" name="tab1">
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
                              <el-table-column :key="item.id" show-overflow-tooltip sortable="custom" :prop="item" :label="field_ch[index]" :width="field_width[index] | field_width_filter"> </el-table-column>
                          </template>
                        </el-table>

                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,50,100,500]" :page-size="limit" layout="prev, pager, next, jumper, total, sizes" :total="count"> 
                          </el-pagination>
                    </el-tab-pane>

                    <el-tab-pane label="历史告警" name="tab2">
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
                          <el-table-column fixed="left" type="selection" width="40"></el-table-column>
                          <template v-for='(item, index) in field_en2'>
                              <el-table-column :key="item.id" show-overflow-tooltip sortable="custom" :prop="item" :label="field_ch2[index]" :width="field_width2[index] | field_width_filter"> </el-table-column>
                          </template>
                        </el-table>

                        <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="page2" :page-sizes="[10,50,100,500]" :page-size="limit2" layout="prev, pager, next, jumper, total, sizes" :total="count2"> 
                          </el-pagination>
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
			searchForm: {},
			searchForm2: {},
      page: 1,
      limit: 10,
      count: 0,
      sortJson : {"alarm_time": -1},
      whereJson : {},
      page2: 1,
      limit2: 10,
      count2: 0,
      sortJson2 : {"alarm_time": -1},
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
				_this.list = res.rows;
				_this.field_ch = ["IP", "告警类型", "内容", "第一次告警时间", "最后告警时间"];
				_this.field_en = ["client_ip", "alarm_type", "alarm_msg", "first_alarm_time", "last_alarm_time"];
				_this.data_type = ["text", "text", "text", "text", "text"];
				_this.field_width = [120, 150, 200, 160, 160];
				_this.field_width.forEach(element => {
						_this.tabelwidth+=Number(element);
				});
				_this.tabelwidth = _this.tabelwidth + 40 + 5 + "px";
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
				_this.list2 = res.rows;
				_this.field_ch2 = ["IP", "告警类型", "内容", "第一次告警时间", "最后告警时间"];
				_this.field_en2 = ["client_ip", "alarm_type", "alarm_msg", "first_alarm_time", "last_alarm_time"];
				_this.data_type2 = ["text", "text", "text", "text", "text"];
				_this.field_width2 = [120, 150, 200, 160, 160];
				_this.field_width2.forEach(element => {
						_this.tabelwidth2+=Number(element);
				});
				_this.tabelwidth2 = _this.tabelwidth2 + 40 + 5 + "px";
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
    searchSubmitForm() {
        var _this = this;
        _this.$refs["searchForm"].validate (function (valid) {
            if(valid) {
              // console.log(_this.searchForm);
              if(_this.searchForm.client_host){
                _this.searchForm.client_host = "/"+_this.searchForm.client_host+"/"
              }
              delete _this.searchForm.log_time
              if(_this.searchForm.time_start && _this.searchForm.time_end){
                  _this.searchForm.log_time = {"$gte":_this.searchForm.time_start,"$lt":_this.searchForm.time_end}
              }
              _this.whereJson = Object.assign({"type":"host"}, _this.searchForm)
              delete _this.whereJson.time_start
              delete _this.whereJson.time_end
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
                  _this.searchForm2.log_time = {"$gte":_this.searchForm2.time_start,"$lt":_this.searchForm2.time_end}
              }
              _this.whereJson2 = Object.assign({"type":"ip"}, _this.searchForm2)
              delete _this.whereJson2.time_start
              delete _this.whereJson2.time_end
              _this.getData2();

            }else {
              console.log('error submit');
              return false;
            }
        });
    },
    searchCancelSubmit() {
      this.searchForm = {};
      this.$refs["searchForm"].resetFields();
      this.whereJson = {"type":"host"};
      this.getData();
    },
    searchCancelSubmit2() {
      this.searchForm2 = {};
      this.$refs["searchForm2"].resetFields();
      this.whereJson2 = {"type":"ip"};
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
    _this.whereJson = {"status":1,"group":"true","client_ip":_this.$route.params.ip};
    _this.whereJson2 = {"status":0,"group":"true","client_ip":_this.$route.params.ip};
		_this.url = _this.GLOBAL.host + "/api/python/alarm_list";
    _this.getData();

    var menuRows = _this.$store.state.menuRows;
    menuRows.forEach(function(item,index){
       item.children.forEach(function(item2,index2){
           if(item2.id == localStorage.getItem("activeIndex")){
              _this.modelName1 = item.name;
              _this.modelName2 = item2.name;
              _this.modelName3 = "告警详情";
              return false;
           }
        });
    });
  }
}
</script>

<style scoped>

</style>
