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
                    <p><span class="span1">设备总数：{{device_num}}</span>   <span class="span2">在线数量：{{online_num}}</span>   <span class="span3">告警数量：{{alarm_num}}</span></p>
                </div>
                <div id="eChart" style="width: auto;height:500px;"></div>

								<el-dialog
									title="详细"
									:visible.sync="viewFormBox"
									width="600px">
									<el-form ref="viewForm" :model="viewForm" size="small" label-width="150px">
											<template v-for='(item, index) in field_en'>
                          <template v-if='item == "id"'>
                          </template>
                          <template v-else>
                            <el-form-item :key="index" :label="field_ch[index]" >
                              <el-input v-model="viewForm[item]" readonly/>
                            </el-form-item>
                          </template>
                      </template>

										</el-form>
								</el-dialog>

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
			device_num: 0,
			online_num: 0,
			alarm_num: 0,
      url: null,
			field_ch: null,
			field_en: null,
			xdata: [],
			ydata: [],
			listLoading: true,
      searchFormBox: false,
      searchForm: {},
      viewFormBox: false,
      viewForm: {},
			roleClass: [],
      page: 1,
      limit: 10,
      count: 0,
      sortJson : {},
      whereJson : {"type": "device_list_icon"},
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

        var option = {
            // color: ['#c23531', '#2f4554', '#61a0a8'],
            series : [
                {
                    type:'graph',
                    layout:'force',
                    categories : [{name:'level1'},{name:'level2'},{name: 'level3'}],
                    label: {
                        normal: {
                            show : true,
                            position: 'right',
                            formatter: function(params){
                                return params.data.name;
                            },
                        }
                    },
                    force: {
                        repulsion: 600,
                        edgeLength:60
                    },
                    nodes: [],
                    links: []
                }
            ]
        };

        var device_num = 0;
        var online_num = 0;
        var alarm_num = 0;
        option.series[0].nodes.push({name: "infoblox",category: 0, symbolSize : 30, itemStyle: {color: '#c23531'} })
        res.rows.forEach(function (item, index) {
          item.name = item.level;
          option.series[0].nodes.push({name: item.name, category: 1, symbolSize : 20, itemStyle: {color: '#2f4554'} })
          option.series[0].links.push({source: item.name, target: 'infoblox'})
          item.children.forEach(function (item2, index2) {
            option.series[0].nodes.push({name: item2.name, index:index2, category: 1, symbolSize : 15, itemStyle: {color: '#61a0a8'} })
            option.series[0].links.push({source: item2.name, target: item.name})
            if(item2.online_status == 'true'){online_num++}
            if(item2.alarm_status == 'true'){alarm_num++}
            device_num++
          });
        });
        _this.device_num = device_num;
        _this.online_num = online_num;
        _this.alarm_num = alarm_num;
        _this.field_ch = ["设备编号", "设备名称", "IP地址", "所属节点", "详细地址", "设备类型", "所属厂商", "CPU", "内存", "磁盘", "功率", "操作系统", "系统版本", "描述信息", "上线时间"];
				_this.field_en = ["code", "name", "ip", "level", "address", "device_type", "factory", "cpu", "ram", "disk", "power", "os", "os_version", "message", "online_time"];

        var myChart = echarts.init(document.getElementById('eChart'));
        myChart.setOption(option, true);
        myChart.on('click', function (params) {
          // console.log(params.name);
          res.rows.forEach(function (item, index) {
            item.children.forEach(function (item2, index2) {
              if(item2.name == params.name){
                // console.log(item2)
                _this.view(item2)
                return false;
              }
            });
          });

        });

      }).catch(function (err) {
        console.log(err);
      });


    },
    view(row) {
        //console.log(row);
        var _this = this;
        _this.field_en.forEach(function(item,index){
            _this.$set(_this.viewForm, item, row[item]);
        });
        _this.thisrow = row
        this.viewFormBox = true;
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
		_this.url = _this.GLOBAL.host + "/api/python/device_list";
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
    _this.getData();

  }
}
</script>

<style scoped>

</style>
