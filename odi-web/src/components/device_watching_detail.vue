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

                <div style="margin-bottom:10px;">
                  <el-form v-loading.fullscreen.lock="listLoading" ref="searchForm" :inline="true" :model="searchForm" :rules="rules" size="small" label-width="100px" >

                      <el-form-item label="时间">
                        <el-date-picker v-model="searchForm['time']" type="date" value-format="yyyy-MM-dd"> </el-date-picker>
                      </el-form-item>

                      <el-form-item>
                        <el-button icon="el-icon-search" type="primary" @click="searchSubmitForm">查询</el-button>
                        <el-button icon="el-icon-refresh" @click="searchCancelSubmit">取消</el-button>
                      </el-form-item>
                    </el-form>
                </div>
                <div class="watching_top_box clearfix">
                  <div id="eChart1" style="width:33%;height:200px;"></div>
                  <div id="eChart2" style="width:33%;height:200px;"></div>
                  <div id="eChart3" style="width:33%;height:200px;"></div>
                </div>
                <div class="watching_bottom_box clearfix">
                  <div id="eChart4" style="width:50%;height:200px;"></div>
                  <div id="eChart5" style="width:50%;height:200px;"></div>
                  <div id="eChart6" style="width:50%;height:200px;"></div>
                  <div id="eChart7" style="width:50%;height:200px;"></div>
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

        var option1 = {
            tooltip : {
                formatter: "{b} : {c}%"
            },
            toolbox: {},
            series: [
                {
                    name: '硬件监控',
                    type: 'gauge',
                    axisLine: {
                      lineStyle: {
                        width: 10
                      }
                    },
                    splitLine: {
                      length: 15
                    },
                    title: {
                      offsetCenter: [0, -20]
                    },
                    detail: {fontSize: 20,formatter:'{value}%'},
                    data: [{value: (res.info.cpu_rate * 100).toFixed(0), name: 'CPU使用率'}]
                }
            ]
        };
        var myChart1 = echarts.init(document.getElementById('eChart1'));
        myChart1.setOption(option1, true);

        var option2 = {
            tooltip : {
                formatter: "{b} : {c}%"
            },
            toolbox: {},
            series: [
                {
                    name: '硬件监控',
                    type: 'gauge',
                    axisLine: {
                      lineStyle: {
                        width: 10
                      }
                    },
                    splitLine: {
                      length: 15
                    },
                    title: {
                      offsetCenter: [0, -20]
                    },
                    detail: {fontSize: 20,formatter:'{value}%'},
                    data: [{value: (res.info.ram_rate * 100).toFixed(0), name: '内存使用率'}]
                }
            ]
        };
        var myChart2 = echarts.init(document.getElementById('eChart2'));
        myChart2.setOption(option2, true);

        var option3 = {
            tooltip : {
                formatter: "{b} : {c}%"
            },
            toolbox: {},
            series: [
                {
                    name: '硬件监控',
                    type: 'gauge',
                    axisLine: {
                      lineStyle: {
                        width: 10
                      }
                    },
                    splitLine: {
                      length: 15
                    },
                    title: {
                      offsetCenter: [0, -20]
                    },
                    detail: {fontSize: 20,formatter:'{value}%'},
                    data: [{value: (res.info.disk_rate * 100).toFixed(0), name: '磁盘使用率'}]
                }
            ]
        };
        var myChart3 = echarts.init(document.getElementById('eChart3'));
        myChart3.setOption(option3, true);

        var option4 = {
            title: {
                text: '网络流量',
                left: 'left'
            },
            color: ['#409EFF'],
            tooltip: {trigger: 'axis'},
            xAxis: {
                axisLabel : {
                    rotate: 0
                },
                data: res.info.time
            },
            yAxis: {},
            series: [{
                name: '网络流量',
                type: 'line',
                lineStyle: {width: 1},
                data: res.info.net_flow_send
            }]
        };
        var myChart4 = echarts.init(document.getElementById('eChart4'));
        myChart4.setOption(option4, true);

        var option5 = {
            title: {
                text: 'QPS',
                left: 'left'
            },
            color: ['#409EFF'],
            tooltip: {trigger: 'axis'},
            xAxis: {
                axisLabel : {
                    rotate: 0
                },
                data: res.info.time
            },
            yAxis: {},
            series: [{
                name: 'QPS',
                type: 'line',
                lineStyle: {width: 1},
                data: res.info.qps
            }]
        };
        var myChart5 = echarts.init(document.getElementById('eChart5'));
        myChart5.setOption(option5, true);

        var option6 = {
            title: {
                text: '解析时延',
                left: 'left'
            },
            color: ['#409EFF'],
            tooltip: {trigger: 'axis'},
            xAxis: {
                axisLabel : {
                    rotate: 0
                },
                data: res.info.time
            },
            yAxis: {},
            series: [{
                name: '解析时延',
                type: 'line',
                lineStyle: {width: 1},
                data: res.info.dns_delay
            }]
        };
        var myChart6 = echarts.init(document.getElementById('eChart6'));
        myChart6.setOption(option6, true);

        var option7 = {
            title: {
                text: '解析成功率',
                left: 'left'
            },
            color: ['#409EFF'],
            tooltip: {trigger: 'axis'},
            xAxis: {
                axisLabel : {
                    rotate: 0
                },
                data: res.info.time
            },
            yAxis: {},
            series: [{
                name: '解析成功率',
                type: 'line',
                lineStyle: {width: 1},
                data: res.info.dns_success_rate
            }]
        };
        var myChart7 = echarts.init(document.getElementById('eChart7'));
        myChart7.setOption(option7, true);



      }).catch(function (err) {
        console.log(err);
      });


    },

    searchSubmitForm() {
        var _this = this;
        _this.$refs["searchForm"].validate (function (valid) {
            if(valid) {
              // console.log(_this.searchForm);
              if(!_this.searchForm.time){
                _this.$message({duration: 1000, message: "请输入时间！"});
                return false;
              }
              _this.whereJson.time = _this.searchForm.time
              _this.getData();

            }else {
              console.log('error submit');
              return false;
            }
        });
    },
    searchCancelSubmit() {
      this.searchForm = {};
      this.whereJson.time = moment().format("YYYY-MM-DD");
      this.$set(this.searchForm, "time", this.whereJson.time);
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
		_this.url = _this.GLOBAL.host + "/api/python/device_list";
    _this.whereJson = {"type": "device_list_monitor", "time": moment().format("YYYY-MM-DD"),"ip": _this.$route.params.ip};
    _this.$set(this.searchForm, "time", _this.whereJson.time);
    _this.getData();

    var menuRows = _this.$store.state.menuRows;
    menuRows.forEach(function(item,index){
       item.children.forEach(function(item2,index2){
           if(item2.id == localStorage.getItem("activeIndex")){
              _this.modelName1 = item.name;
              _this.modelName2 = item2.name;
              _this.modelName3 = "监控详情";
              return false;
           }
        });
    });


  }
}
</script>

<style scoped>

</style>
