<template>
  <div class="app-container">
    <h2 class="title">{{Title}}</h2>
    <div class="box box1">
      <h4 class="title">Config Data</h4>
      <div class="row"><span>Compliance Time</span><span>Language</span><span>Brightness</span><span>Audible</span><span>Night Mode</span>
      </div>
      <div class="row">
      <span>{{row.ComplianceTime}}</span><span>{{row.Language}}</span><span>{{row.Brightness/10}}</span><span>{{row.Audible == 'true' ? 'on' : 'off'}}</span><span>{{row.NightMode == 'true' ? 'on' : 'off'}}</span><span>{{row.Channel1MaxAmpUsed}}</span><span>{{row.Channel1AverageAmpUsed}}</span><span>{{row.Channel2MaxAmpUsed}}</span><span>{{row.Channel2AverageAmpUsed}}</span>
      </div>
    </div>
    <div class="box box2">
      <h4 class="title">Preset Data</h4>
      <div class="row"><span>Preset#</span><span>Electrode Size</span><span>Stimulation Type</span><span>Mode Settings</span><span>Treatment Time</span><span>Number Of Cycles</span><span>Next Preset To Use</span><span>Beat Frequency</span>
      </div>
      <div class="row" v-for='(item, index) in list'>
      <span>{{item.PresetNumber}}</span><span>{{item.ElectrodeSize}}</span><span>{{item.StimulationType}}</span><span>{{item.ModeSettings}}</span><span>{{item.TreatmentTime}}</span><span>{{item.NumberOfCycles}}</span><span>{{item.NextPresetToUse}}</span><span>{{item.BeatFrequency}}</span>
      </div>
    </div>
  </div>
  
</template>

<script>
import {findData} from '@/api/device'

export default {
  data() {
    return {
      list: [],
      row: {},
      listLoading: true,
      Title: null,
      PatientName: null,
      PatientEmail: null,
      DoctorEmail: null,
      DeviceName: null,
      SerialNumber: null,
      UpdateTime: null
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
        this.Title = device_data.UserInfo.DeviceName + " Device - " + device_data.SerialNumber + " (Config Data & Preset Data)";
        this.row = device_data.UpdateData[0].ConfigData;
        this.list = device_data.UpdateData[0].PresetData;
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
    .box {
      margin-top: 20px;
      font-size: 18px;
      .row {
        padding: 10px 0px;
        border-bottom: 1px solid #ccc;
        span {text-align: center;}
        a {
          color: #0097e2;
        }
      }
    }
    .box1 {
      span {
        display: inline-block;
        width: 10%;
      }
    }
    .box2 {
      span {
        display: inline-block;
        width: 10%;
      }
    }
  }
</style>

