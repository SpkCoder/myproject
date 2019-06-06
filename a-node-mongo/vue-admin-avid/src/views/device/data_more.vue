<template>
  <div class="app-container">
    <h2 class="title">{{Title}}</h2>
    <div class="box box1" v-if='row.Type=="U"'>
      <h4 class="title">Usage Data</h4>
      <div class="row"><span>Date Of Treatment</span><span>Time Of Treatment</span><span>Preset#</span><span>Min Of Use</span><span>Min Of Pause</span><span>Channel1 Max Amp Used</span><span>Channel1 Average Amp</span><span>Channel2 Max Amp Used</span><span>Channel2 Average Amp</span>
      </div>
      <div class="row">
      <span>{{row.DateOfTreatment}}</span><span>{{row.TimeOfTreatment}}</span><span>{{row.PresetNumber}}</span><span>{{row.MinOfUse}}</span><span>{{row.MinOfPause}}</span><span>{{row.Channel1MaxAmpUsed}}</span><span>{{row.Channel1AverageAmpUsed}}</span><span>{{row.Channel2MaxAmpUsed}}</span><span>{{row.Channel2AverageAmpUsed}}</span>
      </div>

      <h4 class="title" style="margin-top: 30px;">Config Data</h4>
      <div class="row"><span>Compliance Time</span><span>Language</span><span>Brightness</span><span>Audible</span><span>Night Mode</span>
      </div>
      <div class="row">
      <span>{{ConfigData.ComplianceTime}}</span><span>{{ConfigData.Language}}</span><span>{{ConfigData.Brightness/10}}</span><span>{{ConfigData.Audible == 'true' ? 'on' : 'off'}}</span><span>{{ConfigData.NightMode == 'true' ? 'on' : 'off'}}</span><span>{{ConfigData.Channel1MaxAmpUsed}}</span><span>{{ConfigData.Channel1AverageAmpUsed}}</span><span>{{ConfigData.Channel2MaxAmpUsed}}</span><span>{{ConfigData.Channel2AverageAmpUsed}}</span>
      </div>

      <h4 class="title" style="margin-top: 30px;">Preset Data</h4>
      <div class="row"><span>Preset#</span><span>Electrode Size</span><span>Stimulation Type</span><span>Mode Settings</span><span>Treatment Time</span><span>Number Of Cycles</span><span>Next Preset To Use</span><span>Beat Frequency</span>
      </div>
      <div class="row">
      <span>{{PresetData.PresetNumber}}</span><span>{{PresetData.ElectrodeSize}}</span><span>{{PresetData.StimulationType}}</span><span>{{PresetData.ModeSettings}}</span><span>{{PresetData.TreatmentTime}}</span><span>{{PresetData.NumberOfCycles}}</span><span>{{PresetData.NextPresetToUse}}</span><span>{{PresetData.BeatFrequency}}</span>
      </div>

    </div>
    <div class="box box2" v-else>
      <h4 class="title">Question Data</h4>
      <div class="row"><span>Date Of Treatment</span><span>Time Of Treatment</span><span>Pain Before</span><span>Pain After</span><span>Decr Meds</span><span>Help Work</span><span>HelpHome</span>
      </div>
      <div class="row">
      <span>{{row.DateOfTreatment}}</span><span>{{row.TimeOfTreatment}}</span><span>{{row.PainBefore }}</span><span>{{row.PainAfter }}</span><span>{{row.DecrMeds }}</span><span>{{row.HelpWork }}</span><span>{{row.HelpHome }}</span>
      </div>
    </div>
  </div>
  
</template>

<script>
import {findData} from '@/api/device'

export default {
  data() {
    return {
      row: {}, 
      ConfigData: {},
      PresetData: {},
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
      var index = this.$route.params.index;
      this.listLoading = true;
      var reqData = 'action=findData&whereJson='+JSON.stringify({"SerialNumber": SerialNumber});
      findData(reqData).then(data => {
        //console.log(data)
        var device_data = data.rows[0];
        // var serial = "";
        //   if(device_data.SerialNumber.length % 2 == 0){
        //     for(var i=0; i < device_data.SerialNumber.length; i++){
        //       if((i+1)%2 == 0){
        //         var number_10 = parseInt(device_data.SerialNumber[i-1] +""+ device_data.SerialNumber[i],16);
        //         serial += String.fromCharCode(number_10);
        //       }
        //     }
        //   }else{
        //     for(var i=0; i < device_data.SerialNumber.length-1; i++){
        //       if((i+1)%2 == 0){
        //         var number_10 = parseInt(device_data.SerialNumber[i-1] +""+ device_data.SerialNumber[i],16);
        //         serial += String.fromCharCode(number_10);
        //       }
        //     }
        //     var number_10 = parseInt(device_data.SerialNumber[device_data.SerialNumber.length-1],16);
        //     serial += String.fromCharCode(number_10);
        // }
        this.Title = device_data.UserInfo.DeviceName + " Device - " + device_data.SerialNumber + " (Usage Data Detail)";
        this.row = device_data.UpdateData[0].UsageData[index];
        this.ConfigData = this.row.ConfigData;
        this.PresetData = this.row.PresetData;
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
      font-size: 16px;
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

