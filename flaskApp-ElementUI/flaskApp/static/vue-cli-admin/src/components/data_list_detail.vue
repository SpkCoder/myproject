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
										<el-button type="primary" size="small" @click="btn_add()">增加</el-button>
										<!-- <el-button type="primary" size="small" @click="btn_del()">删除</el-button> -->
										<!-- <el-button type="primary" size="small" @click="btn_search()">查询</el-button> -->
									</el-button-group>
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
											<el-table-column :key="item.id" show-overflow-tooltip :prop="item" :label="field_ch[index]" :width="field_width[index] | field_width_filter"> </el-table-column>
									</template>
									<el-table-column fixed="right" label="操作" width="130"> 
											<template slot-scope="scope"> 
											<!-- <el-button @click="view(scope.row)" type="text" size="small" icon="el-icon-view">&nbsp;</el-button> -->
											<el-button @click="edit(scope.row)" type="text" size="small" icon="el-icon-edit">&nbsp;</el-button>
											<el-button @click="del(scope.row)" type="text" size="small" icon="el-icon-delete">&nbsp;</el-button>
											</template> 
									</el-table-column>
								</el-table>

								<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currPage" :page-sizes="[10,50,100,500]" :page-size="prePageNum" layout="prev, pager, next, jumper, total, sizes" :total="count"> 
									</el-pagination>
								
								<el-dialog
									title="增加"
									:visible.sync="addFormBox"
									width="600px">
									<el-form ref="addForm" :model="addForm" :rules="rules" size="small" label-width="150px">
											<template v-for='(item, index) in field_en'>
                          <template v-if='item == "id"'>
                          </template>
                          <template v-else-if='item=="data_type"'>
                            <el-form-item :key="index" :label="field_ch[index]">
                              <el-select id="data_type_select" v-model="addForm['data_type']" placeholder="">
                                <el-option label="文本" value="text"> </el-option>
                                <el-option label="文本域" value="textarea"> </el-option>
                                <el-option label="正整数" value="int"> </el-option>
                                <el-option label="6位正整数" value="int(6)"> </el-option>
                                <el-option label="保留2位小数" value="decimal(2)"> </el-option>
                                <el-option label="保留4位小数" value="decimal(4)"> </el-option>
                                <el-option label="年月日 时分秒" value="date(YYYY-MM-DD HH:mm:ss)"> </el-option>
                                <el-option label="年" value="date(YYYY)"> </el-option>
                                <el-option label="年月" value="date(YYYY-MM)"> </el-option>
                                <el-option label="年月日" value="date(YYYY-MM-DD)"> </el-option>
                                <el-option label="时分秒" value="date(HH:mm:ss)"> </el-option>
                              </el-select>
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
                          <template v-else-if='item=="data_type"'>
                            <el-form-item :key="index" :label="field_ch[index]">
                              <el-select id="data_type_select" v-model="editForm['data_type']" placeholder="">
                                <el-option label="文本" value="text"> </el-option>
                                <el-option label="文本域" value="textarea"> </el-option>
                                <el-option label="正整数" value="int"> </el-option>
                                <el-option label="6位正整数" value="int(6)"> </el-option>
                                <el-option label="保留2位小数" value="decimal(2)"> </el-option>
                                <el-option label="保留4位小数" value="decimal(4)"> </el-option>
                                <el-option label="年月日 时分秒" value="date(YYYY-MM-DD HH:mm:ss)"> </el-option>
                                <el-option label="年" value="date(YYYY)"> </el-option>
                                <el-option label="年月" value="date(YYYY-MM)"> </el-option>
                                <el-option label="年月日" value="date(YYYY-MM-DD)"> </el-option>
                                <el-option label="时分秒" value="date(HH:mm:ss)"> </el-option>
                              </el-select>
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

                <el-dialog
									title="查询"
									:visible.sync="searchFormBox"
									width="600px">
									<el-form ref="searchForm" :model="searchForm" :rules="rules" size="small" label-width="150px">
                      <template v-for='(item, index) in field_en'>
                          <el-form-item v-if='/date/.test(data_type[index])' :key="index" :label="field_ch[index]">
                            <el-date-picker v-model="searchForm[item]" type="datetime" placeholder="选择日期时间"> </el-date-picker>
                          </el-form-item>
                          <el-form-item v-else :key="index" :label="field_ch[index]">
                            <el-input v-model="searchForm[item]"/>
                          </el-form-item>
                      </template>

											<el-form-item>
												<el-button type="primary" @click="searchSubmitForm">查询</el-button>
												<el-button @click="searchCancelSubmit">取消</el-button>
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
import DB from '@/common/db';
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
      currPage: 1,
      prePageNum: 10,
      count: 0,
      sortStr : '',
      whereStr : '',
      rules: {}
    }
	},
	methods: {
    getData() {
      var _this = this;
      _this.listLoading = true;
      var reqData = 'action=findData&whereStr='+_this.whereStr+'&sortStr='+_this.sortStr+'&prePageNum='+_this.prePageNum+'&currPage='+_this.currPage;
      DB.findData(_this, _this.url, reqData, function (resData) {
        //console.log(resData);
        _this.listLoading = false;
				if(typeof resData != "object"){
					_this.$message({duration: 1000, message: resData });
					return;
				}
				_this.list = resData.rows;
				_this.data_type = resData.data_type.split(";");
				_this.field_ch = resData.field_ch.split(";");
        _this.field_en = resData.field_en.split(";");
        _this.field_sort = resData.field_sort.split(";");
				_this.field_width = resData.field_width.split(";");
        var new_data_type = [];
        var new_field_ch = [];
        var new_field_en = [];
        var new_field_sort = [];
        var new_field_width = [];
        _this.field_en.forEach(function(item,index){
          if(item == "id" || item == "name" || item == "name_ch"){
              //
          }else{
            new_data_type.push(_this.data_type[index]);
            new_field_ch.push(_this.field_ch[index]);
            new_field_en.push(item);
            new_field_sort.push(_this.field_sort[index]);
            new_field_width.push(_this.field_width[index]);
          }
        });
        _this.data_type = new_data_type;
        _this.field_ch = new_field_ch;
        _this.field_en = new_field_en;
        _this.field_sort = new_field_sort;
        _this.field_width = new_field_width;
				_this.field_width.forEach(element => {
						_this.tabelwidth+=Number(element);
				});
				_this.tabelwidth = _this.tabelwidth + 40 + 130 + 5 + "px";
        _this.currPage = resData.currPage;
        _this.prePageNum = resData.prePageNum;
        _this.count = resData.count;

        _this.rules = formVerify.rules(_this.field_en,_this.data_type);
        
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
        var type = (obj.order == "descending") ? 'desc' : 'asc';
        _this.sortStr = obj.prop + " " + type;
        _this.getData();
    },
    handleSizeChange(num) {
      var _this = this;
      _this.prePageNum = num;
      _this.getData();
    },
    handleCurrentChange(num) {
      var _this = this;
      _this.currPage = num;
      _this.getData();
    },
    view(row) {
       //console.log(row);
    },
    edit(row) {
        //console.log(row);
        var _this = this;
        if(row.modelId==100001 || row.modelId==100002 || row.modelId==100003 || row.modelId==100004 || row.modelId==100005 || row.modelId==100006 || row.modelId==100007 || row.modelId==100008){
          _this.$message({duration: 1000, message: "禁止操作系统模块！" });
          return;
        }
        _this.field_en.forEach(function(item,index){
            _this.$set(_this.editForm, item, row[item]);
        });
        _this.$set(_this.editForm, "id", row["id"]);
        this.editFormBox = true;
    },
    editSubmitForm() {
        var _this = this;
        _this.$refs["editForm"].validate (function (valid) {
            if(valid) {
              //console.log(_this.editForm);
              _this.field_en.forEach(function(item,index){
                  var field_type_this = _this.data_type[index];
                  if(field_type_this == "int" || field_type_this == "int(6)" || field_type_this == "decimal(2)" || field_type_this == "decimal(4)"){
                    _this.editForm[item] = Number(_this.editForm[item]);
                  }
              });
              
              var whereStr = 'id=' + _this.editForm.id;
              var updateJson =_this.editForm;
              delete updateJson.id;
              var reqData = {'action': 'updateData', 'whereStr': whereStr, 'updateJson': JSON.stringify(updateJson)};      
              DB.updateData(_this, _this.url, reqData, function (resData) {
                //console.log(data)
                _this.$message({duration: 1000, message: resData });
                if(resData != "操作成功"){ return; }
                _this.editFormBox = false;
                _this.getData();
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
        if(row.modelId==100001 || row.modelId==100002 || row.modelId==100003 || row.modelId==100004 || row.modelId==100005 || row.modelId==100006 || row.modelId==100007 || row.modelId==100008){
          _this.$message({duration: 1000, message: "禁止操作系统模块！" });
          return;
        }
        _this.$confirm('确认删除?', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          var whereJson = {"id": [row.id]};
          var reqData = {'action': 'delData', 'whereJson': JSON.stringify(whereJson)};
          DB.delData(_this, _this.url, reqData, function (resData) {
            //console.log(data)
            _this.$message({duration: 1000, message: resData });
            if(resData != "操作成功"){ return; }
            _this.addFormBox = false;
            _this.getData();
          });
        }).catch(function () {
          //
        });
    },
    btn_add(){
       this.$set(this.addForm, "data_type", "text");
       this.addFormBox = true;
    },
    addSubmitForm() {
        var _this = this;
        _this.$refs["addForm"].validate (function (valid) {
            if(valid) {
              //console.log(_this.addForm);
              _this.field_en.forEach(function(item,index){
                  var field_type_this = _this.data_type[index];
                  if(field_type_this == "int" || field_type_this == "int(6)" || field_type_this == "decimal(2)" || field_type_this == "decimal(4)"){
                    _this.addForm[item] = Number(_this.addForm[item]);
                  }
              });
              _this.addForm.id = _this.list[0].modelId;
              _this.addForm.name = _this.list[0].name;
              _this.addForm.name_ch = _this.list[0].name_ch;

              var dataArr=[];
              dataArr.push(_this.addForm);
              var reqData = {'action': 'insertData', 'dataArr': JSON.stringify(dataArr)};
              DB.insertData(_this, _this.url, reqData, function (resData) {
                //console.log(resData)
                _this.$message({duration: 1000, message: resData });
                if(resData != "操作成功"){ return; }
                _this.addFormBox = false;
                _this.getData();
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
            var reqData = {'action': 'delData', 'whereJson': JSON.stringify(whereJson)};
            DB.delData(_this, _this.url, reqData, function (resData) {
              //console.log(resData)
              _this.$message({duration: 1000, message: resData });
              if(resData != "操作成功"){ return; }
              _this.getData();
            });
        }).catch(function () {
          //
        });

    },
    btn_search(){
        var _this = this;
        _this.searchFormBox = true;
    },
    searchSubmitForm() {
        var _this = this;
        _this.$refs["searchForm"].validate (function (valid) {
            if(valid) {
              //console.log(_this.searchForm);
              var whereStr = '';
              var num = 0; 
              _this.field_en.forEach(function(item,index){
                  var field_type_this = _this.data_type[index];
                  if(field_type_this == "int" || field_type_this == "int(6)" || field_type_this == "decimal(2)" || field_type_this == "decimal(4)"){
                    if(_this.searchForm[item]){
                      _this.searchForm[item] = Number(_this.searchForm[item]);
                      if(num == 0){
                          whereStr += item + '=' + _this.searchForm[item];
                      }else{
                          whereStr += ' and ' + item + '=' + _this.searchForm[item];
                      }
                      num++;
                    }
                  }else if(field_type_this == "date(YYYY-MM-DD HH:mm:ss)" || field_type_this == "date(YYYY)" || field_type_this == "date(YYYY-MM)" || field_type_this == "date(YYYY-MM-DD)" || field_type_this == "date(HH:mm:ss)"){
                    if(_this.searchForm[item]){
                      if(num == 0){
                          whereStr += item + '>="' + _this.searchForm[item] + '"';
                      }else{
                          whereStr += ' and ' + item + '>="' + _this.searchForm[item] + '"';
                      }
                      num++;
                    }
                  }else{
                    if(_this.searchForm[item]){
                      if(num == 0){
                          whereStr += item + '="' + _this.searchForm[item] + '"';
                      }else{
                          whereStr += ' and ' + item + '="' + _this.searchForm[item] + '"';
                      }
                      num++;
                    }
                  }
              });
              
              _this.whereStr = whereStr;
              //console.log(_this.whereStr);
              _this.getData();

            }else {
              //console.log('error submit');
              return false;
            }
        });
    },
    searchCancelSubmit() {
      this.searchForm = {};
      this.$refs["searchForm"].resetFields();
      this.searchFormBox = false;
      this.whereStr = '';
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
    _this.whereStr = 'modelId=' + _this.$route.params.id;
		_this.url = _this.GLOBAL.host + "/python/"+ _this.$route.path.split("/")[2].replace(/\_detail/,"");
    _this.modelName1 = _this.$route.meta.pname;
    _this.modelName2 = _this.$route.name;
    _this.getData();
  }
}
</script>

<style scoped>

</style>
