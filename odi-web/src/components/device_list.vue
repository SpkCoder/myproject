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
									<el-button-group>
										<el-button icon="el-icon-plus" type="primary" size="small" @click="btn_add()">增加</el-button>
										<el-button icon="el-icon-delete" type="primary" size="small" @click="btn_del()">删除</el-button>
									</el-button-group>
								</div>

								<div style="margin-bottom:10px;">
									<el-form ref="searchForm" :inline="true" :model="searchForm" :rules="rules" size="small" label-width="100px">
                      <template v-for='(item, index) in field_en'>
                          <template v-if='item == "code" || item == "name" || item == "ip"'>
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
                        <el-button icon="el-icon-upload2" @click="btn_import()">导入</el-button>
                        <input style="display: none" id="file_input" type="file" name="file" multiple="multiple"/>
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
									<el-table-column fixed="left" type="selection" width="40"></el-table-column>
									<template v-for='(item, index) in field_en'>
											<el-table-column :key="item.id" show-overflow-tooltip sortable="custom" :prop="item" :label="field_ch[index]" :width="field_width[index] | field_width_filter"> </el-table-column>
									</template>
									<el-table-column fixed="right" label="操作" width="130"> 
											<template slot-scope="scope"> 
                      <!-- <router-link :to="'/page/page_demo_detail/' + scope.row.id">
                        <el-button type="text" size="small" icon="el-icon-view">&nbsp;</el-button>
                      </router-link> -->
											<el-button @click="edit(scope.row)" type="text" size="small" icon="el-icon-edit">&nbsp;</el-button>
											<el-button @click="del(scope.row)" type="text" size="small" icon="el-icon-delete">&nbsp;</el-button>
											</template> 
									</el-table-column>
								</el-table>

								<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,50,100,500]" :page-size="limit" layout="prev, pager, next, jumper, total, sizes" :total="count"> 
									</el-pagination>
								
								<el-dialog
									title="增加"
									:visible.sync="addFormBox"
									width="600px">
									<el-form ref="addForm" :model="addForm" :rules="rules" size="small" label-width="150px">
											<template v-for='(item, index) in field_en'>
                          <template v-if='item == "id"'>
                          </template>
                          <template v-else-if='item == "code" || item == "name" || item == "ip" || item == "level"'>
                            <el-form-item :key="index" :label="field_ch[index]" :prop="item" required>
                              <el-input v-model="addForm[item]"/>
                            </el-form-item>
                          </template>
                          <template v-else-if='item == "os"'>
														<el-form-item :key="index" :label="field_ch[index]">
                              <el-select v-model="addForm[item]" placeholder="">
                                <el-option label="Window" value="Window"> </el-option>
                                <el-option label="Linux" value="Linux"> </el-option>
                                <el-option label="CentOS" value="CentOS"> </el-option>
                              </el-select>
                            </el-form-item>
                          </template>
                          <template v-else-if='/date\(yyyy-MM-dd\)/.test(data_type[index])'>
                            <el-form-item :key="index" :label="field_ch[index]">
                              <el-date-picker v-model="addForm[item]" type="date" value-format="yyyy-MM-dd" placeholder="选择日期时间"> </el-date-picker>
                            </el-form-item>
                          </template>
                          <template v-else-if='/date\(yyyy-MM-dd HH:mm:ss\)/.test(data_type[index])'>
                            <el-form-item :key="index" :label="field_ch[index]">
                              <el-date-picker v-model="addForm[item]" type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"> </el-date-picker>
                            </el-form-item>
                          </template>
                          <template v-else>
                            <el-form-item :key="index" :label="field_ch[index]" :prop="item">
                              <el-input v-model="addForm[item]"/>
                            </el-form-item>
                          </template>
                      </template>

											<el-form-item>
												<el-button type="primary" @click="addSubmitForm">提交</el-button>
												<el-button @click="addCancelSubmit">取消</el-button>
											</el-form-item>
										</el-form>
								</el-dialog>

								<el-dialog
									title="修改"
									:visible.sync="editFormBox"
									width="600px">
									<el-form ref="editForm" :model="editForm" :rules="rules" size="small" label-width="150px">
											<template v-for='(item, index) in field_en'>
                          <template v-if='item == "id"'>
                          </template>
                          <template v-else-if='item == "code" || item == "name" || item == "ip"'>
                            <el-form-item :key="index" :label="field_ch[index]" :prop="item" required>
                              <el-input v-model="editForm[item]"/>
                            </el-form-item>
                          </template>
                          <template v-else-if='item == "os"'>
														<el-form-item :key="index" :label="field_ch[index]">
                              <el-select v-model="editForm[item]" placeholder="">
                                <el-option label="Window" value="Window"> </el-option>
                                <el-option label="Linux" value="Linux"> </el-option>
                                <el-option label="CentOS" value="CentOS"> </el-option>
                              </el-select>
                            </el-form-item>
                          </template>
                          <template v-else-if='/date\(yyyy-MM-dd\)/.test(data_type[index])'>
                            <el-form-item :key="index" :label="field_ch[index]">
                              <el-date-picker v-model="editForm[item]" type="date" value-format="yyyy-MM-dd" placeholder="选择日期时间"> </el-date-picker>
                            </el-form-item>
                          </template>
                          <template v-else-if='/date\(yyyy-MM-dd HH:mm:ss\)/.test(data_type[index])'>
                            <el-form-item :key="index" :label="field_ch[index]">
                              <el-date-picker v-model="editForm[item]" type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"> </el-date-picker>
                            </el-form-item>
                          </template>
                          <template v-else>
                            <el-form-item :key="index" :label="field_ch[index]" :prop="item">
                              <el-input v-model="editForm[item]"/>
                            </el-form-item>
                          </template>
                      </template>

											<el-form-item>
												<el-button type="primary" @click="editSubmitForm">提交</el-button>
												<el-button @click="editCancelSubmit">取消</el-button>
											</el-form-item>
										</el-form>
								</el-dialog>

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
      sortJson : {},
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
				_this.field_ch = ["设备编号", "设备名称", "IP地址", "所属节点", "详细地址", "设备类型", "所属厂商", "CPU", "内存", "磁盘", "功率", "操作系统", "系统版本", "描述信息", "上线时间"];
				_this.field_en = ["code", "name", "ip", "level", "address", "device_type", "factory", "cpu", "ram", "disk", "power", "os", "os_version", "message", "online_time"];
				_this.data_type = ["text", "text", "text", "text", "text", "text", "text", "text", "text", "text", "text", "text", "text", "text", "date(yyyy-MM-dd)"];
				_this.field_width = [120, 120, 120, 120, 120, 120, 120, 100, 100, 100, 100, 120, 120, 120, 120];
				_this.field_width.forEach(element => {
						_this.tabelwidth+=Number(element);
				});
				_this.tabelwidth = _this.tabelwidth + 40 + 130 + 5 + "px";
        _this.page = res.page;
        _this.limit = res.limit;
        _this.count = res.count;

        _this.rules = formVerify.rules(_this.field_en,_this.data_type);
        _this.rules["code"] = [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {
                validator: function (rule, value, callback) {
                    if (! /^[A-Z][0-9]+$/.test(value)) {
                        return callback(new Error('设备编号必须是大写字母数字组合'));
                    }
                    callback();
                },
                trigger: 'blur'
            }
        ];
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
    edit(row) {
        // console.log(row);
        var _this = this;
        _this.field_en.forEach(function(item,index){
            _this.$set(_this.editForm, item, row[item]);
        });
        _this.thisrow = row
        this.editFormBox = true;
    },
    editSubmitForm() {
        var _this = this;
        _this.$refs["editForm"].validate (function (valid) {
            if(valid) {
              // console.log(_this.editForm);
              _this.field_en.forEach(function(item,index){
                  var field_type_this = _this.data_type[index];
                  if(field_type_this == "int" || field_type_this == "int(6)" || field_type_this == "decimal(2)" || field_type_this == "decimal(4)"){
                    _this.addForm[item] = _this.addForm[item] ? Number(_this.addForm[item]) : 0;
                  }else{
                    _this.addForm[item] = _this.addForm[item] ? String(_this.addForm[item]) : "";
                  }
              });
              var whereJson = {"id": _this.thisrow.id};
              var updateJson = Object.assign({},_this.editForm);
              delete updateJson.id;
              var reqData = {'action': 'updateData', 'whereJson': whereJson, 'updateJson': updateJson, "tocken": sessionStorage.getItem('tocken')};     
              _this.$axiosHttp.post(_this.url, reqData).then(function (res) {
                _this.$message({duration: 1000, message: res.msg});
                if(res.code != 200){ return false; }
                _this.editFormBox = false;
                _this.getData();
              }).catch(function (err) {
                console.log(err);
              });
            }else {
              //console.log('error submit');
              return false;
            }
        });
    },
    editCancelSubmit() {
      this.$refs["editForm"].resetFields();
      this.editFormBox = false;
    },
    del(row) {
        //console.log(row);
        var _this = this;
        _this.$confirm('确认删除?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          var whereJson = {"id": [row.id]};
          var reqData = {'action': 'delData', 'whereJson': whereJson, "tocken": sessionStorage.getItem('tocken')};     
          _this.$axiosHttp.post(_this.url, reqData).then(function (res) {
            _this.$message({duration: 1000, message: res.msg});
            if(res.code != 200){ return false; }
            _this.getData();
          }).catch(function (err) {
            console.log(err);
          });
        }).catch(function () {
          //
        });
    },
    btn_add(){
       this.addFormBox = true;
    },
    addSubmitForm() {
        var _this = this;
        _this.$refs["addForm"].validate (function (valid) {
            if(valid) {
              // console.log(_this.addForm);
              _this.field_en.forEach(function(item,index){
                  var field_type_this = _this.data_type[index];
                  if(field_type_this == "int" || field_type_this == "int(6)" || field_type_this == "decimal(2)" || field_type_this == "decimal(4)"){
                    _this.addForm[item] = _this.addForm[item] ? Number(_this.addForm[item]) : 0;
                  }else{
                    _this.addForm[item] = _this.addForm[item] ? String(_this.addForm[item]) : "";
                  }
              });
              delete _this.addForm.id;
              var reqData = {'action': 'insertData', 'dataArr': [_this.addForm], "tocken": sessionStorage.getItem('tocken')};
              _this.$axiosHttp.post(_this.url, reqData).then(function (res) {
                _this.$message({duration: 1000, message: res.msg});
                if(res.code != 200){ return false; }
                _this.addFormBox = false;
                _this.getData();
              }).catch(function (err) {
                console.log(err);
              });

            }else {
              //console.log('error submit');
              return false;
            }
        });
    },
    addCancelSubmit() {
      this.$refs["addForm"].resetFields();
      this.addFormBox = false;
    },
    btn_del(){
        var _this = this;
        if(_this.multipleSelection.length == 0){
          _this.$message({duration: 1000, message: "请勾选要删除的行" });
          return;
        }
        _this.$confirm('确认删除?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
            var idArr = [];
            for(var i=0; i<_this.multipleSelection.length; i++){
              idArr.push(_this.multipleSelection[i].id);
            }
            var whereJson = {"id": idArr};
            var reqData = {'action': 'delData', 'whereJson': whereJson, "tocken": sessionStorage.getItem('tocken')};     
            _this.$axiosHttp.post(_this.url, reqData).then(function (res) {
              _this.$message({duration: 1000, message: res.msg});
              if(res.code != 200){ return false; }
              _this.getData();
            }).catch(function (err) {
              console.log(err);
            });
        }).catch(function () {
          //
        });

    },
    btn_import() {
        var _this = this;
        document.getElementById('file_input').click();
        document.getElementById('file_input').onchange = function () {
          var file = document.getElementById("file_input").files[0];
          if(! /\.csv/.test(file.name)){
              _this.$message({duration: 1000, message: '请导入.csv格式文件'});
              return false;
          }
          var formData = new FormData();
          var reqData = {"action":"importData", "tocken": sessionStorage.getItem('tocken')}
          formData.append("file",file);
          formData.append("params",JSON.stringify(reqData));
          _this.$axiosHttp.post(_this.url, formData,{headers: {'Content-Type': 'multipart/form-data'}}).then(function (res) {
            _this.$message({duration: 1000, message: res.msg});
            if(res.code != 200){ return false; }
            _this.getData();

          }).catch(function (err) {
            console.log(err);
          });
        };
    },
    btn_export() {
        var _this = this;
        var reqData = {"action":"exportData", "page":_this.page, "limit":_this.limit, "whereJson":_this.whereJson, "sortJson":_this.sortJson, "tocken": sessionStorage.getItem('tocken')}
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
              _this.whereJson = _this.searchForm
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
