<template>
  <div class="app-container">

    <!-- <div style="margin-bottom:10px;">
      <el-button-group>
        <el-button type="primary" size="medium" @click="btn_add()"></i>Add</el-button>
        <el-button type="primary" size="medium" @click="btn_del()"></i>Delete</el-button>
      </el-button-group>
    </div> -->

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
      style="width:1695px">
      <el-table-column fixed="left" type="selection" width="40"> </el-table-column>
      <el-table-column show-overflow-tooltip sortable="custom" prop="BluetoothNumber" label="Bluetooth #" width="150"> </el-table-column>
      <el-table-column show-overflow-tooltip sortable="custom" prop="SerialNumber" label="Serial #" width="200">
        <template slot-scope="scope">
          {{ scope.row.SerialNumber | SerialNumber_filter}}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable="custom" prop="PCBNumber" label="PCB #" width="100"> </el-table-column>
      <el-table-column show-overflow-tooltip sortable="custom" prop="status" label="Status" width="100">
        <template slot-scope="scope">
          {{ scope.row.status | status_filter}}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip sortable="custom" prop="register_name" label="Mfg" width="100"> </el-table-column>
      <el-table-column show-overflow-tooltip sortable="custom" prop="register_time" label="Mfg Time" width="150"> </el-table-column>
      <el-table-column show-overflow-tooltip sortable="custom" prop="activate_name" label="Final" width="100"> </el-table-column>
      <el-table-column show-overflow-tooltip sortable="custom" prop="activate_time" label="Final Time" width="150"> </el-table-column>
      <el-table-column show-overflow-tooltip sortable="custom" prop="check_name" label="Incoming" width="120"> </el-table-column>
      <el-table-column show-overflow-tooltip sortable="custom" prop="check_time" label="Incoming Time" width="150"> </el-table-column>
      <el-table-column show-overflow-tooltip label="Mfg Test" width="100"> 
        <template slot-scope="scope">
            <router-link v-if="scope.row.register_data.length>0" :to="'/device/test_data/' + scope.row.BluetoothNumber + '/register_data'">
                <el-button type="text" size="medium" icon="el-icon-view">&nbsp;</el-button>
            </router-link>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="Final Test" width="100"> 
        <template slot-scope="scope">
            <router-link v-if="scope.row.activate_data.length>0" :to="'/device/test_data/' + scope.row.BluetoothNumber + '/activate_data'">
                <el-button type="text" size="medium" icon="el-icon-view">&nbsp;</el-button>
            </router-link>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operation" width="130"> 
          <template slot-scope="scope"> 
            <router-link v-if="scope.row.status==2" :to="'/device/data/' + scope.row.SerialNumber">
                <el-button type="text" size="medium" icon="el-icon-view">&nbsp;</el-button>
            </router-link>
            <el-button v-else type="text" size="medium">&nbsp;&nbsp;&nbsp;</el-button>
            <!-- <el-button @click="edit(scope.row)" type="text" size="medium" icon="el-icon-edit">&nbsp;</el-button> -->
            <el-button @click="del(scope.row)" type="text" size="medium" icon="el-icon-delete">&nbsp;</el-button>
          </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currPage" :page-sizes="[10,50,100,500,1000]" :page-size="prePageNum" layout="prev, pager, next, jumper, total, sizes" :total="count"> 
       </el-pagination>
    
    
  </div>
  
</template>

<script>
import {findData, delData} from '@/api/register'

export default {
  filters: {
      status_filter(value) {
        if(value==0){return "Registered"}
        if(value==1){return "Activated"}
        if(value==2){return "Activated"}
        if(value==3){return "Incoming"}
      },
      SerialNumber_filter(value) {
        if(value){
          var serial = "";
          if(value.length % 2 == 0){
            for(var i=0; i < value.length; i++){
              if((i+1)%2 == 0){
                var number_10 = parseInt(value[i-1] +""+ value[i],16);
                serial += String.fromCharCode(number_10);
              }
            }
          }else{
            for(var i=0; i < value.length-1; i++){
              if((i+1)%2 == 0){
                var number_10 = parseInt(value[i-1] +""+ value[i],16);
                serial += String.fromCharCode(number_10);
              }
            }
            var number_10 = parseInt(value[value.length-1],16);
            serial += String.fromCharCode(number_10);
          }
          serial = value;
          // console.log(serial);
          return serial;
        }
      }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      multipleSelection: [],
      rules: {},
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
    },
    del(row) {
        //console.log(row);
        var _this = this;
        _this.$confirm('delete?', 'Delete', {
          confirmButtonText: 'CONFIRM',
          cancelButtonText: 'CANCEL',
          type: 'warning'
        }).then(function () {
          var dataJson = {"BluetoothNumber":{"$in":[row.BluetoothNumber]}};
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
    },
    btn_del(){
    }

  }
  
}
</script>
