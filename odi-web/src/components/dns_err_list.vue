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

                <div style="margin-bottom:10px;margin-left: -33px;">
                  <el-form v-loading.fullscreen.lock="fullLoading" element-loading-text="Loading" ref="searchForm" :inline="true" :model="searchForm" :rules="rules" size="small" label-width="100px">
                      <el-form-item label="粒度">
                        <el-select v-model="searchForm['type']" placeholder="">
                          <el-option v-for="item2 in typeList" :key="item2.id" :label="item2.name" :value="item2.id"> </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="设备IP">
                        <el-select v-model="searchForm['ip']" placeholder="">
                          <el-option label="全部" value=""> </el-option>
                          <el-option v-for="item2 in deviceList" :key="item2.id" :label="item2.ip" :value="item2.ip"> </el-option>
                        </el-select>
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
                <div id="eChart" style="width: auto;height:300px;"></div>

						</div>
					</div>
		</div>
    </div>
</template>

<script>
import moment from 'moment';
import echarts from 'echarts';
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
			xdata: [],
			ydata: [],
			fullLoading: true,
      searchFormBox: false,
			searchForm: {},
			roleClass: [],
      page: 1,
      limit: 10,
      count: 0,
      sortJson : {},
      whereJson : {},
      deviceList: [],
      typeList: [{"id": "1H", "name": "1小时"}, {"id": "5M", "name": "5分钟"}, {"id": "1M", "name": "1分钟"}],
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
        _this.xdata = res.info.time;
        _this.ydata = res.info.ALL;

        var option = {
            title: {
                text: 'DNS错误应答趋势图',
                left: 'center'
            },
            tooltip: {trigger: 'axis'},
            xAxis: {
                axisLabel : {
                    rotate: 45,
                    formatter:(data) => {
                      return moment(data).format('MM-DD HH:mm');
                    }
                },
                data: _this.xdata
            },
            yAxis: {
            },
            series: [{
                name: '错误次数',
                type: 'line',
                lineStyle: {width: 1},
                data: _this.ydata
            }]
        };
        var myChart = echarts.init(document.getElementById('eChart'));
        myChart.setOption(option, true);
        myChart.on('click', function (params) {
            // console.log(params.name);
            var obj = {}
            obj.create_time = params.name
            obj.type = _this.whereJson.type
            if (_this.whereJson.ip){
              obj["client_ip"] = _this.whereJson.ip
            }
            _this.$router.push({ path: '/page/dns_err_list_detail/'+JSON.stringify(obj) });

        });

      }).catch(function (err) {
        console.log(err);
      });


    },
    btn_export() {
        var _this = this;
        var reqData = {"action":"exportData", "page":_this.page, "limit":_this.limit, "whereJson":_this.whereJson, "sortJson":_this.sortJson, "tocken": sessionStorage.getItem('tocken')}
        delete reqData.whereJson.type;
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
              if(!_this.searchForm.time_start || !_this.searchForm.time_end){
                _this.$message({duration: 1000, message: "请输入开始时间和结束时间！"});
                return false;
              }
              var time_s_num = (new Date(_this.searchForm.time_end).getTime() - new Date(_this.searchForm.time_start).getTime())/1000;
              var type_s_num = 0;
              if(_this.searchForm.type == '1H'){
                type_s_num = 3600;
              }else if(_this.searchForm.type == '5M'){
                type_s_num = 300;
              }else{
                type_s_num = 60;
              }
              if(time_s_num < type_s_num){
                _this.$message({duration: 1000, message: "时间区间必须大于粒度！"});
                return false;
              }
              _this.whereJson = {};
              for(var item in _this.searchForm){
                if(String(_this.searchForm[item]).trim()){_this.whereJson[item] = typeof(_this.searchForm[item]) == "string" ? _this.searchForm[item].trim() :  _this.searchForm[item]}
              };
              sessionStorage.setItem("dns_err_list_whereJson", JSON.stringify(_this.whereJson));
              _this.getData();

            }else {
              console.log('error submit');
              return false;
            }
        });
    },
    searchCancelSubmit() {
      this.searchForm = {};
      this.whereJson = {"type": "1H", "time_start": moment().format("YYYY-MM-DD HH:mm:ss").split(" ")[0]+" 00:00:00","time_end": moment().format("YYYY-MM-DD HH:mm:ss")};
      this.$set(this.searchForm, "type", this.typeList[0].id);
      this.$set(this.searchForm, "ip", "");
      this.$set(this.searchForm, "time_start", this.whereJson.time_start);
      this.$set(this.searchForm, "time_end", this.whereJson.time_end);
      this.$refs["searchForm"].resetFields();
      sessionStorage.removeItem("dns_err_list_whereJson");
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

    if(sessionStorage.getItem("dns_err_list_whereJson")){
        _this.whereJson = JSON.parse(sessionStorage.getItem("dns_err_list_whereJson"))
        _this.$set(_this.searchForm, "type", _this.whereJson.type);
        if(_this.whereJson.ip){
          _this.$set(_this.searchForm, "ip", _this.whereJson.ip);
        }else{
          _this.$set(_this.searchForm, "ip", "");
        }
    }else{
      _this.whereJson = {"type": "1H", "time_start": moment().format("YYYY-MM-DD HH:mm:ss").split(" ")[0]+" 00:00:00","time_end": moment().format("YYYY-MM-DD HH:mm:ss")};
      _this.$set(_this.searchForm, "type", _this.typeList[0].id);
      _this.$set(_this.searchForm, "ip", "");
    }
    _this.$set(_this.searchForm, "time_start", _this.whereJson.time_start);
    _this.$set(_this.searchForm, "time_end", _this.whereJson.time_end);
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

  }
}
</script>

<style scoped>

</style>
