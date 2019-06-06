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
      <el-table-column show-overflow-tooltip sortable="custom" prop="tableName" label="Model" width="150">
          <template slot-scope="scope">
            {{ scope.row.tableName | model_filter}}
          </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable="custom" prop="action" label="Function" width="200"> 
      </el-table-column>
      <el-table-column fixed="right" label="Operation" width="130"> 
          <template slot-scope="scope"> 
          <!-- <el-button @click="edit(scope.row)" type="text" size="medium" icon="el-icon-edit">&nbsp;</el-button> -->
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
          <el-form-item label="Model">
            <el-select v-model="addForm.tableName" placeholder="select">
              <el-option label="User Permission" value="permissions"/>
              <el-option label="Permission Function" value="functions"/>
              <el-option label="User List" value="admins"/>
              <el-option label="Device List" value="registers"/>
          </el-select>
          </el-form-item>
          <el-form-item label="Function">
            <el-select v-model="addForm.action" placeholder="select">
              <template v-if="addForm.tableName == 'registers'">
                  <el-option label="findData" value="findData"/>
                  <el-option label="insertData" value="insertData"/>
                  <el-option label="updateData" value="updateData"/>
                  <el-option label="delData" value="delData"/>
                  <el-option label="Mfg" value="Mfg"/>
                  <el-option label="Final" value="Final"/>
                  <el-option label="Incoming" value="Incoming"/>
              </template>
              <template v-else>
                  <el-option label="findData" value="findData"/>
                  <el-option label="insertData" value="insertData"/>
                  <el-option label="updateData" value="updateData"/>
                  <el-option label="delData" value="delData"/>
              </template>
          </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="addSubmitForm">SUBMIT</el-button>
            <el-button @click="addCancelSubmit">Cancel</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>

    
  </div>
  
</template>

<script>
import {findData, insertData, updateData, delData} from '@/api/function'

export default {
  filters: {
    model_filter(value) {
       if(value == "permissions"){return "User Permission"}
       if(value == "functions"){return "Permission Function"}
       if(value == "admins"){return "User List"}
       if(value == "registers"){return "Device List"}
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
          tableName:[
              { validator: function(rule, value, callback) {
                if(value == ""){
                    return callback(new Error('Model must not be null'));
                }
                callback();
                }, 
                trigger: 'blur' 
                }
            ],
          action:[
              { validator: function(rule, value, callback) {
                if(value == ""){
                    return callback(new Error('Function must not be null'));
                }
                callback();
                }, 
                trigger: 'blur' 
                }
            ]
      },
      addForm: {
        tableName: '',
        action: ''
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
      _this.permission = this.$route.params.id;
      _this.listLoading = true;
      var reqData = 'action=findData&whereJson='+JSON.stringify({"permission":_this.permission})+'&sortJson='+JSON.stringify(_this.sortJson)+'&prePageNum='+_this.prePageNum+'&currPage='+_this.currPage;
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
    },
    del(row) {
        //console.log(row);
        var _this = this;
        _this.$confirm('delete?', 'Delete', {
          confirmButtonText: 'CONFIRM',
          cancelButtonText: 'CANCEL',
          type: 'warning'
        }).then(function () {
          var dataJson = {"permission":_this.permission,"tableName":row.tableName,"action":row.action};
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
              var dataArr = [{"permission": _this.permission, "tableName": _this.addForm.tableName, "action": _this.addForm.action}];
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
        //var _this = this;
    },
    editCancelSubmit() {
      this.$refs["editForm"].resetFields();
      this.editFormBox = false;
    }

  }
  
}
</script>
