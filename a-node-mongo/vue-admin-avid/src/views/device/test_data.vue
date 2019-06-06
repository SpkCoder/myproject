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
      style="width:555px">
      <el-table-column label="Address" width="150">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column label="Name" width="200">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="Value" width="auto">
        <template slot-scope="scope">
          {{ scope.row.value2 }}
        </template>
      </el-table-column>
    </el-table>

  </div>
  
</template>

<script>
import {findData} from '@/api/register'

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
      var BluetoothNumber = this.$route.params.id;
      var action_data = this.$route.params.action_data;
      this.listLoading = true;
      var reqData = 'action=findData&whereJson='+JSON.stringify({"BluetoothNumber": BluetoothNumber});
      findData(reqData).then(data => {
        //console.log(data)
        if(action_data == "register_data"){
          this.list = data.rows[0].register_data
        }
        if(action_data == "activate_data"){
          this.list = data.rows[0].activate_data
        }
        this.listLoading = false
      });
    },
    view(row) {
       //console.log(row);
    },
    edit(row) {
       //console.log(row);
    },
    delete(row) {
       //console.log(row);
    }
    
  }
  
}
</script>
