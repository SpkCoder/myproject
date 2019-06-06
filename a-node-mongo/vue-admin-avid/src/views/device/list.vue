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
      style="width:885px">
      <el-table-column label="SerialNumber" width="150">
        <template slot-scope="scope">
          {{ scope.row.SerialNumber }}
        </template>
      </el-table-column>
      <el-table-column label="PatientName" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.PatientName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="PatientEmail" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.PatientEmail }}
        </template>
      </el-table-column>
      <el-table-column label="DoctorEmail" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.DoctorEmail }}
        </template>
      </el-table-column>
      <el-table-column label="DeviceName" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.DeviceName }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operation" width="130"> 
          <template slot-scope="scope"> 
          <!-- <el-button @click="view(scope.row)" type="text" size="medium" icon="el-icon-view">&nbsp;</el-button> -->
          <router-link :to="'/device/check/' + scope.row.id"><el-button type="text" size="medium">check</el-button></router-link>
          <!-- <el-button @click="delete(scope.row)" type="text" size="medium" icon="el-icon-delete">&nbsp;</el-button> -->
          </template> 
      </el-table-column>
    </el-table>

  </div>
  
</template>

<script>
import {findData, updateData} from '@/api/device'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
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
    }
    
  }
  
}
</script>
