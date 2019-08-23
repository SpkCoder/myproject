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

                <div style="margin-bottom:10px;">
                  <el-form ref="searchForm" :inline="true" :model="searchForm" :rules="rules" size="small" label-width="100px">
                      <el-form-item label="粒度">
                        <el-select v-model="searchForm['type']" placeholder="">
                          <el-option v-for="item2 in typeList" :key="item2.id" :label="item2.name" :value="item2.id"> </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="设备IP">
                        <el-select v-model="searchForm['ip']" placeholder="">
                          <el-option v-for="item2 in deviceList" :key="item2.id" :label="item2.ip" :value="item2.ip"> </el-option>
                        </el-select>
                      </el-form-item><br>
                      <el-form-item label="时间">
                        <el-date-picker
                          v-model="searchForm['log_time_arr']"
                          type="datetimerange"
                          range-separator="至"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
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
                <div class="eChart_bottom_box clearfix">
                  <div id="eChart2" style="width:50%;height:300px;"></div>
                  <div id="eChart3" style="width:50%;height:300px;"></div>
                </div>

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
			listLoading: true,
      searchFormBox: false,
			searchForm: {},
			roleClass: [],
      page: 1,
      limit: 10,
      count: 0,
      sortJson : {},
      whereJson : {},
      deviceList: [],
      typeList: [{"id": "5M", "name": "5分钟"}, {"id": "1H", "name": "1小时"}, {"id": "1M", "name": "1分钟"}],
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
        _this.xdata = res.info.time;
        _this.ydata = res.info.ALL;

        var option = {
            title: {
                text: 'DNS查询趋势图',
                left: 'center'
            },
            color: ['#409EFF'],
            tooltip: {},
            xAxis: {
                data: _this.xdata
            },
            yAxis: {
            },
            series: [{
                name: 'DNS查询次数',
                type: 'line',
                data: _this.ydata
            }]
        };
        var myChart = echarts.init(document.getElementById('eChart'));
        myChart.setOption(option, true);

        var option2 = {
            title: {
                text: '请求类型分布图',
                left: 'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : ({d}%)"
            },
            legend: {
                x: '50px',
                orient: 'vertical',
                data:[]
            },
            series:  [
                {
                    name:'请求类型',
                    type:'pie',
                    radius : '55%',
                    data:[]
                }
            ]
        };
        res.info.type_name.forEach(function (item, index) {
          if(item != "ALL"){
            option2.legend.data.push(item)
            option2.series[0].data.push({value: res.info.rate[index], name: item})
          }
        });
        var myChart2 = echarts.init(document.getElementById('eChart2'));
        myChart2.setOption(option2, true);

        var option3 = {
            title: {
                text: '请求类型分布趋势图',
                left: 'center'
            },
            tooltip: {},
            legend: {
                data:[]
            },
            xAxis: {
                data: []
            },
            yAxis: {
            },
            series: []
        };
        
        res.info.type_name.forEach(function (item, index) {
          if(item != "ALL"){
            option3.legend.data.push(item)
            option3.series.push({ name: item, type: 'line', data: res.info[item] })
          }
        });
        if (option3.series.length > 0) {
          option3.xAxis.data = _this.xdata
        }
        var myChart3 = echarts.init(document.getElementById('eChart3'));
        myChart3.setOption(option3, true);

        myChart.on('click', function (params) {
            // console.log(params.name);
            var obj = {}
            obj.create_time = _this.whereJson.time_start.split(" ")[0]+" "+params.name
            obj.type = _this.whereJson.type
            if (_this.whereJson.ip){
              obj["client_ip"] = _this.whereJson.ip
            }
            _this.whereJson.time_start.split(" ")[0]+" "+params.name;
            _this.$router.push({ path: '/page/dns_req_list_detail/'+JSON.stringify(obj) });
        });



      }).catch(function (err) {
        console.log(err);
      });


    },
    btn_export() {
        var _this = this;
        var reqData = {"action":"exportData", "page":_this.page, "limit":_this.limit, "whereJson":_this.whereJson, "sortJson":_this.sortJson, "tocken": sessionStorage.getItem('tocken')}
        delete reqData.whereJson.type;
        _this.$axiosHttp.get(_this.url, {"params":reqData}).then(function (res) {
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
              if(_this.searchForm.log_time_arr){
                _this.searchForm.time_start = _this.searchForm.log_time_arr[0]
                _this.searchForm.time_end = _this.searchForm.log_time_arr[1]
              }
              _this.whereJson = Object.assign({"type":"host"}, _this.searchForm)
              delete _this.whereJson.log_time_arr
              _this.getData();

            }else {
              console.log('error submit');
              return false;
            }
        });
    },
    searchCancelSubmit() {
      this.searchForm = {};
      this.whereJson = {"type": "5M", "time_start": moment().format("YYYY-MM-DD HH:mm:ss").split(" ")[0]+" 00:00:00","time_end": moment().format("YYYY-MM-DD HH:mm:ss")};
      this.$set(this.searchForm, "type", this.typeList[0].id);
      this.$set(this.searchForm, "log_time_arr", [this.whereJson.time_start, this.whereJson.time_end]);
      this.$refs["searchForm"].resetFields();
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
    var leftAsideVue = function(){
        var obj = {};
        _this.$parent.$children.forEach(function(item,index){
           if(item.activeIndex){
              obj=item;
           }
        });
        return obj;
    }();
    leftAsideVue.list.forEach(function(item,index){
       item.children.forEach(function(item2,index2){
           if(item2.id == localStorage.getItem("activeIndex")){
              _this.modelName1 = item.name;
              _this.modelName2 = item2.name;
              return false;
           }
        });
    });

    _this.whereJson = {"type": "5M", "time_start": moment().format("YYYY-MM-DD HH:mm:ss").split(" ")[0]+" 00:00:00","time_end": moment().format("YYYY-MM-DD HH:mm:ss")};
    _this.$set(this.searchForm, "type", this.typeList[0].id);
    _this.$set(this.searchForm, "log_time_arr", [_this.whereJson.time_start, _this.whereJson.time_end]);
    _this.getData();

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
