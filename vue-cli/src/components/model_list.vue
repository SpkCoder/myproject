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
										<el-button type="primary" size="medium" @click="btn_add()">Add</el-button>
										<el-button type="primary" size="medium" @click="btn_del()">Delete</el-button>
									</el-button-group>
								</div>
								
								<el-table
									:data="list"
									element-loading-text="Loading"
									border
									stripe
									highlight-current-row
									tooltip-effect="dark"
									size="medium"
									@selection-change="selectionChange" 
									@sort-change="sortChange"
									:style={width:tabelwidth}>
									<el-table-column fixed="left" type="selection" width="40"></el-table-column>
									<template v-for='(item, index) in field_en'>
											<el-table-column :key="item.id" show-overflow-tooltip sortable="custom" :prop="item" :label="field_ch[index]" :width="field_width[index] | field_width_filter"> </el-table-column>
									</template>
									<el-table-column fixed="right" label="Operation" width="130"> 
											<template slot-scope="scope"> 
											<el-button @click="view(scope.row)" type="text" size="medium" icon="el-icon-view">&nbsp;</el-button>
											<el-button @click="edit(scope.row)" type="text" size="medium" icon="el-icon-edit">&nbsp;</el-button>
											<el-button @click="del(scope.row)" type="text" size="medium" icon="el-icon-delete">&nbsp;</el-button>
											</template> 
									</el-table-column>
								</el-table>

								<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currPage" :page-sizes="[10,50,100,500,1000]" :page-size="prePageNum" layout="prev, pager, next, jumper, total, sizes" :total="count"> 
									</el-pagination>
								
								<el-dialog
									title="Add"
									:visible.sync="addFormBox"
									width="600px">
									<el-form ref="addForm" :model="addForm" :rules="rules" label-width="150px">
											<el-form-item label="UserName" prop="username">
												<el-input v-model="addForm.user_name"/>
											</el-form-item>
											<el-form-item label="Password" prop="password">
												<el-input type="password" v-model="addForm.password"/>
											</el-form-item>
											<el-form-item label="Permission">
												<el-select v-model="addForm.permission" placeholder="select">
													<el-option v-for="item in permissionList" :label="item.permission_name" :key="item.permission" :value="item.permission"/>
												</el-select>
											</el-form-item>

											<el-form-item>
												<el-button type="primary" @click="addSubmitForm">SUBMIT</el-button>
												<el-button @click="addCancelSubmit">Cancel</el-button>
											</el-form-item>
										</el-form>
								</el-dialog>

								<el-dialog
									title="Edit"
									:visible.sync="editFormBox"
									width="600px">
									<el-form ref="editForm" :model="editForm" :rules="rules" label-width="150px">
											<el-form-item label="UserName">
												<el-input disabled v-model="editForm.user_name"/>
											</el-form-item>

											<el-form-item label="Permission">
												<el-select v-model="editForm.permission" placeholder="select">
													<el-option v-for="item in permissionList" :label="item.permission_name" :key="item.permission" :value="item.permission"/>
												</el-select>
											</el-form-item>

											<el-form-item>
												<el-button type="primary" @click="editSubmitForm">SUBMIT</el-button>
												<el-button @click="editCancelSubmit">Cancel</el-button>
											</el-form-item>
										</el-form>
								</el-dialog>							

						</div>
					</div>
		</div>
    </div>
</template>

<script>
import DB from '@/common/db';
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
			data_type: null,
			field_ch: null,
			field_en: null,
			field_sort: null,
			field_width: null,
      editFormBox: false,
      addFormBox: false,
      multipleSelection: [],
			permissionList: [],
			rules: {
          username:[
              { validator: function(rule, value, callback) {
                if(value == ""){
                    return callback(new Error('Please input UserName'));
                }
                callback();
                }, 
                trigger: 'blur' 
                }
            ],
          password:[
              { validator: function(rule, value, callback) {
                if(! /[(\w)|@|#|-|$|%|^|&|+|=|!|?]{8,36}/.test(value)){
                  return callback(new Error('Password must contain special character - @#-_$%^&+=!? and length>=8'));
                }
                if(! /[_|@|#|-|$|%|^|&|+|=|!|?]+/.test(value)){
                  return callback(new Error('Password must contain special character - @#-_$%^&+=!? and length>=8'));
                }
                callback();
                }, 
                  trigger: 'blur' 
                }
            ]
      },
      editForm: {
        user_name: '',
        permission: ''
      },
      addForm: {
        user_name: '',
        permission: 1
      },
      currPage: 1,
      prePageNum: 10,
      count: 0,
      whereJson : {},
      sortJson : {}
    }
	},
	methods: {
    getData() {
			var _this = this;
      var reqData = 'action=findData&whereStr='+'&sortStr='+'&prePageNum='+_this.prePageNum+'&currPage='+_this.currPage;
      DB.findData(_this, reqData, function (resData) {
				console.log(resData);
				if(typeof resData != "object"){
					alert(resData);
					return;
				}
				_this.list = resData.rows;
				_this.data_type = resData.data_type.split(";");
				_this.field_ch = resData.field_ch.split(";");
				_this.field_en = resData.field_en.split(";");
				_this.field_sort = resData.field_sort.split(";");
				_this.field_width = resData.field_width.split(";");
				_this.field_width.forEach(element => {
						_this.tabelwidth+=Number(element);
				});
				_this.tabelwidth = _this.tabelwidth + 40 + 130 + 5 + "px";
				
				console.log(_this.tabelwidth);
        _this.currPage = resData.currPage;
        _this.prePageNum = resData.prePageNum;
        _this.count = resData.count;
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
        var sortJson = {};
        sortJson[obj.prop] = (obj.order == "descending") ? -1 : 1;
        _this.sortJson = sortJson;
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
       this.$set(this.editForm, 'user_name', row['user_name']);
       this.$set(this.editForm, 'permission', row['permission']);
       this.editFormBox = true;
    },
    del(row) {
        //console.log(row);
        var _this = this;
        _this.$confirm('delete?', 'Delete', {
          confirmButtonText: 'CONFIRM',
          cancelButtonText: 'CANCEL',
          type: 'warning'
        }).then(function () {
          var dataJson = {"user_name":{"$in":[row.user_name]}};
          var reqData = 'action=delData&dataJson=' + JSON.stringify(dataJson);
          delData(reqData).then(data => {
            //console.log(data)
            if(data != "Success"){return;}
            _this.addFormBox = false;
            _this.getData();
          });
        }).catch(function () {
          //
        });
    },
    btn_add(){
       this.addFormBox = true;
    },
    btn_del(){
        var _this = this;
        if(_this.multipleSelection.length == 0){
          _this.$message({duration: 1000, message: "Please check the lines to be deleted" });
          return;
        }
       _this.$confirm('delete?', 'Delete', {
          confirmButtonText: 'CONFIRM',
          cancelButtonText: 'CANCEL',
          type: 'warning'
        }).then(function () {
            var user_name_arr = [];
            for(var i=0; i<SelectedArr.length; i++){
              user_name_arr.push(SelectedArr[i].user_name);
            }
            var dataJson = {"user_name":{"$in":user_name_arr}};
            var reqData = 'action=delData&dataJson=' + JSON.stringify(dataJson);
            delData(reqData).then(data => {
              //console.log(data)
              if(data != "Success"){return;}
              _this.addFormBox = false;
              _this.getData();
            });
        }).catch(function () {
          //
        });

    },
    addSubmitForm() {
        var _this = this;
        this.$refs["addForm"].validate (function (valid) {
            if(valid) {
              //console.log(_this.addForm);
              _this.addForm.permission = Number(_this.addForm.permission);
              _this.permissionList.forEach( function(item, index) {
                 if(item.permission == _this.addForm.permission){_this.addForm.permission_name = item.permission_name}
              });
              var dataArr = [{"user_name": _this.addForm.user_name, "password": _this.addForm.password, "permission": _this.addForm.permission, "permission_name": _this.addForm.permission_name}];
              var reqData = 'action=insertData&dataArr=' + JSON.stringify(dataArr);
              insertData(reqData).then(data => {
                //console.log(data)
                if(data != "Success"){return;}
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
    editSubmitForm() {
        var _this = this;
        this.$refs["editForm"].validate (function (valid) {
            if(valid) {
              //console.log(_this.editForm);
              _this.editForm.permission = Number(_this.editForm.permission);
              _this.permissionList.forEach( function(item, index) {
                 if(item.permission == _this.editForm.permission){_this.editForm.permission_name = item.permission_name}
              });
              var whereJson = {"user_name": _this.editForm.user_name};
              var updateJson = {"permission": _this.editForm.permission, "permission_name": _this.editForm.permission_name};
              var reqData = 'action=updateData&whereJson=' + JSON.stringify(whereJson) + '&updateJson=' + JSON.stringify(updateJson);
              updateData(reqData).then(data => {
                //console.log(data)
                if(data != "Success"){return;}
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
    }
	},
	created() {
		var _this = this;
		_this.url = _this.GLOBAL.host + _this.$route.path.replace(/\/page/,"/python");
    _this.getData();
  },
	mounted: function () {
		this.$nextTick(function () {
			//console.log(this.$route);
			var this_a = document.querySelector('a[href="#'+this.$route.path+'"]');
			var this_li = this_a.parentNode.parentNode.parentNode;
			this.modelName2 = this_a.innerHTML;
			this.modelName1 = this_li.querySelector('.itemName1').innerHTML;
			
		});
	}
}
</script>

<style scoped>

</style>
