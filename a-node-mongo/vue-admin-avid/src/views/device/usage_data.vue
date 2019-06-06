<template>
  <div class="app-container">
    <h2 class="title">{{Title}}</h2>
    <template>
      <el-tabs v-model="tabPosition" type="card">
        <el-tab-pane label="Usage" name="first">
          <div class="row head"><span class="col-10">Code</span><span class="col-5">Date</span><span class="col-5">Time</span><span class="col-5">Preset#</span><span class="col-5">Min. of Use</span><span class="col-10"></span></div>
          <div class="row" v-for='(item, index) in list' v-if='item.Type == "U"'>
            <span class="col-10">{{index}}</span>
            <span class="col-5">{{item.DateOfTreatment}}</span>
            <span class="col-5">{{item.TimeOfTreatment}}</span>
            <span class="col-5">{{item.PresetNumber}}</span>
            <span class="col-5">{{item.MinOfUse}}</span>
            <span class="col-20">
              <router-link :to="'/device/data_more/' + SerialNumber + '/' + index">&gt;&gt;</router-link>
            </span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Question" name="second">
          <div class="row head"><span class="col-10">Code</span><span class="col-5">Date</span><span class="col-5">Time</span><span class="col-5">Preset#</span><span class="col-5">Min. of Use</span><span class="col-10"></span></div>
          <div class="row" v-for='(item, index) in list' v-if='item.Type == "A"'>
            <span class="col-10">{{index}}</span>
            <span class="col-5">{{item.DateOfTreatment}}</span>
            <span class="col-5">{{item.TimeOfTreatment}}</span>
            <!-- <span class="col-5">{{item.PainBefore | default_filter}}</span> -->
            <!-- <span class="col-5">{{item.PainAfter | default_filter}}</span> -->
            <!-- <span class="col-5">{{item.DecrMeds | default_filter}}</span> -->
            <!-- <span class="col-5">{{item.HelpWork | default_filter}}</span> -->
            <!-- <span class="col-5">{{item.HelpHome | default_filter}}</span> -->
            <span class="col-5">&nbsp;</span>
            <span class="col-5">&nbsp;</span>
            <span class="col-20">
              <router-link :to="'/device/data_more/' + SerialNumber + '/' + index">&gt;&gt;</router-link>
            </span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="All" name="third">
          <div class="row head"><span class="col-10">Code</span><span class="col-5">Date</span><span class="col-5">Time</span><span class="col-5">Preset#</span><span class="col-5">Min. of Use</span><span class="col-10"></span></div>
          <div class="row" v-for='(item, index) in list'>
            <template v-if='item.Type == "U"'>
              <span class="col-10">{{index}}</span><span class="col-5">{{item.DateOfTreatment}}</span><span class="col-5">{{item.TimeOfTreatment}}</span><span class="col-5">{{item.PresetNumber}}</span><span class="col-5">{{item.MinOfUse}}</span><span class="col-10">
                <router-link :to="'/device/data_more/' + SerialNumber + '/' + index">&gt;&gt;</router-link>
              </span>
            </template>
            <template v-if='item.Type == "A"'>
              <span class="col-10">{{index}}</span>
              <span class="col-5">{{item.DateOfTreatment}}</span>
              <span class="col-5">{{item.TimeOfTreatment}}</span>
              <!-- <span class="col-5">{{item.PainBefore | default_filter}}</span> -->
              <!-- <span class="col-5">{{item.PainAfter | default_filter}}</span> -->
              <!-- <span class="col-5">{{item.DecrMeds | default_filter}}</span> -->
              <!-- <span class="col-5">{{item.HelpWork | default_filter}}</span> -->
              <!-- <span class="col-5">{{item.HelpHome | default_filter}}</span> -->
              <span class="col-5">&nbsp;</span>
              <span class="col-5">&nbsp;</span>
              <span class="col-20">
                <router-link :to="'/device/data_more/' + SerialNumber + '/' + index">&gt;&gt;</router-link>
              </span>
            </template>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>

  </div>

</template>

<script>
import {findData} from '@/api/device'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      Title: null,
      SerialNumber: null,
      tabPosition: 'first'
    }
  },
  filters: {
    PresetNumber_filter: function (value) {
      if (value) return Number(value)-127+"";
    },
    default_filter: function (value) {
      if (value == "default") return 'UA';
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      var SerialNumber = this.$route.params.id;
      this.listLoading = true;
      var reqData = 'action=findData&whereJson='+JSON.stringify({"SerialNumber": SerialNumber});
      findData(reqData).then(data => {
        //console.log(data)
        var device_data = data.rows[0];
        this.Title = device_data.UserInfo.DeviceName + " Device - " + device_data.SerialNumber + " (Usage Data)";
        this.SerialNumber = device_data.SerialNumber;
        this.list = device_data.UpdateData[0].UsageData;
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
<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container{
    .title {
      margin: 0px;
    }
    .row {
      padding: 10px 0px;
      border-bottom: 1px solid #ccc;
      span {display: inline-block};
      .col-5 { width: 20%;}
      .col-10 { width: 10%;}
      span {text-align: center;}
      .more {text-align: right;}
      a {color: #0097e2; }
    }
    .head { font-weight: bold;}

  }
</style>

