<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      stripe
      highlight-current-row
      size="medium"
      style="width:635px">
      <el-table-column label="User Name" width="150">
        <template slot-scope="scope">
          {{ scope.row.user_name }}
        </template>
      </el-table-column>
      <el-table-column label="Permission" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.permission }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Create Time" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.create_time }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operation" width="130"> 
          <template slot-scope="scope"> 
          <!-- <el-button @click="view(scope.row)" type="text" size="medium" icon="el-icon-view">&nbsp;</el-button> -->
          <el-button @click="edit(scope.row)" type="text" size="medium" icon="el-icon-edit">&nbsp;</el-button>
          <!-- <el-button @click="delete(scope.row)" type="text" size="medium" icon="el-icon-delete">&nbsp;</el-button> -->
          </template> 
      </el-table-column>
    </el-table>

    <el-dialog
      title="Edit"
      :visible.sync="dialogVisible"
      width="600px">
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="150px">
          <el-form-item label="User Name">
            <el-input disabled v-model="editForm.user_name"/>
          </el-form-item>

          <el-form-item label="Permission">
            <el-select v-model="editForm.permission" placeholder="select">
              <el-option label="system administrator" value="1"/>
              <el-option label="activate" value="2"/>
              <el-option label="sign" value="3"/>
            </el-select>
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
import {findData, updateData} from '@/api/user'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      dialogVisible: false,
      rules: {},
      editForm: {
        user_name: '',
        permission: ''
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.listLoading = true;
      var reqData = 'action=findData&whereJson=';
      findData(reqData).then(data => {
        //console.log(data)
        this.list = data.rows
        this.listLoading = false
      });
    },
    view(row) {
       //console.log(row);
    },
    edit(row) {
       //console.log(row);
       this.$set(this.editForm, 'user_name', row['user_name']);
       this.$set(this.editForm, 'permission', row['permission']+'');
       this.dialogVisible = true;
    },
    delete(row) {
       //console.log(row);
    },
    editSubmitForm() {
        var _this = this;
        this.$refs["editForm"].validate (function (valid) {
            if(valid) {
              //console.log(_this.editForm);
              _this.editForm.permission = new Number(_this.editForm.permission);
              var whereJson = {"user_name": _this.editForm.user_name};
              var updateJson = {"permission": _this.editForm.permission};
              var reqData = 'action=updateData&whereJson=' + JSON.stringify(whereJson) + '&updateJson=' + JSON.stringify(updateJson);
              updateData(reqData).then(data => {
                //console.log(data)
                if(data != "Success"){return;}
                _this.dialogVisible = false;
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
      this.dialogVisible = false;
    }
  }
  
}
</script>
