<template>
  <div class="app-container">

    <div style="margin-bottom:10px;">
      <el-button-group>
        <el-button type="primary" size="medium" @click="btn_add()"></i>Add</el-button>
        <!-- <el-button type="primary" size="medium" @click="btn_del()"></i>Delete</el-button> -->
      </el-button-group>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      stripe
      highlight-current-row
      tooltip-effect="dark"
      size="medium"
      @selection-change="selectionChange" 
      @sort-change="sortChange"
      style="width:525px">
      <el-table-column fixed="left" type="selection" width="40"> </el-table-column>
      <el-table-column show-overflow-tooltip sortable="custom" prop="permission" label="Permission ID" width="150"> </el-table-column>
      <el-table-column show-overflow-tooltip sortable="custom" prop="permission_name" label="Permission Name" width="200"> 
      </el-table-column>
      <el-table-column fixed="right" label="Operation" width="130"> 
          <template slot-scope="scope"> 
          <router-link :to="'/user/function/' + scope.row.permission">
                <el-button type="text" size="medium" icon="el-icon-view">&nbsp;</el-button>
          </router-link>
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
          <el-form-item label="Permission ID" prop="permission">
            <el-input v-model="addForm.permission"/>
          </el-form-item>
          <el-form-item label="Permission Name" prop="permission_name">
            <el-input v-model="addForm.permission_name"/>
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
          <el-form-item label="Permission ID" prop="permission">
            <el-input disabled v-model="editForm.permission"/>
          </el-form-item>
          <el-form-item label="Permission Name" prop="permission_name">
            <el-input v-model="editForm.permission_name"/>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="editSubmitForm">SUBMIT</el-button>
            <el-button @click="editCancelSubmit">Cancel</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
    
  </div>
  
</template>

<script>
import {findData, insertData, updateData, delData} from '@/api/permission'

export default {
  filters: {
    permission_filter(value) {
       //
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      editFormBox: false,
      addFormBox: false,
      multipleSelection: [],
      rules: {
          permission_name:[
              { validator: function(rule, value, callback) {
                if(value == ""){
                    return callback(new Error('Please input Permission Name'));
                }
                callback();
                }, 
                trigger: 'blur' 
                }
            ],
          permission:[
              { validator: function(rule, value, callback) {
                if(value < 1){
                  return callback(new Error('Permission ID must be int'));
                }
                callback();
                }, 
                  trigger: 'blur' 
                }
            ]
      },
      editForm: {
        permission: '',
        permission_name: ''
      },
      addForm: {
        permission: '',
        permission_name: ''
      },
      currPage: 1,
      prePageNum: 10,
      count: 0,
      whereJson : {},
      sortJson : {}
    }
  },
  created() {
    var _this = this;
    _this.getData();
  },
  methods: {
    getData() {
      var _this = this;
      _this.listLoading = true;
      var reqData = 'action=findData&whereJson='+JSON.stringify(_this.whereJson)+'&sortJson='+JSON.stringify(_this.sortJson)+'&prePageNum='+_this.prePageNum+'&currPage='+_this.currPage;
      findData(reqData).then(data => {
        //console.log(data)
        _this.list = data.rows;
        _this.currPage = data.currPage;
        _this.prePageNum = data.prePageNum;
        _this.count = data.count;
        _this.listLoading = false;
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
       this.$set(this.editForm, 'permission', row['permission']);
       this.$set(this.editForm, 'permission_name', row['permission_name']+'');
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
          var dataJson = {"permission":{"$in":[row.permission]}};
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
        //
    },
    addSubmitForm() {
        var _this = this;
        this.$refs["addForm"].validate (function (valid) {
            if(valid) {
              //console.log(_this.addForm);
              _this.addForm.permission = Number(_this.addForm.permission);
              var dataArr = [{"permission": _this.addForm.permission, "permission_name": _this.addForm.permission_name}];
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
              var whereJson = {"permission": _this.editForm.permission};
              var updateJson = {"permission_name": _this.editForm.permission_name};
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

  }
  
}
</script>
