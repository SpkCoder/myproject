<template>
  <div class="app-container">
    <h2 class="title">{{Title}}</h2>
    <div class="box box1">
      <div class="row"><span>Patient Name</span><span>Patient Email</span><span>Doctor Email</span><span>Device Name</span><span>Serial Number</span></div>
      <div class="row"><span>{{PatientName}}</span><span>{{PatientEmail}}</span><span>{{DoctorEmail}}</span><span>{{DeviceName}}</span><span>{{SerialNumber | SerialNumber_filter}}</span></div>
    </div>
    <div class="box box2">
      <div class="row"><span>Update Time</span><span>Usage Data</span><!-- <span>Preset Data</span> --></div>
      <div class="row">
      <span>{{UpdateTime}}</span>
      <span>
            <router-link :to="'/device/usage_data/' + SerialNumber">Detail</router-link> 
      </span>
      <!-- <span>
           <router-link :to="'/device/preset_data/' + SerialNumber">Detail</router-link> 
      </span> -->
      </div>
    </div>
  </div>
  
</template>

<script>
import {findData} from '@/api/device'

export default {
  filters: {
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
          // console.log(serial);
          return serial;
        }
      }
  },
  data() {
    return {
      list: null,
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
        this.Title = device_data.UserInfo.DeviceName + " Device - " + device_data.SerialNumber;
        this.PatientName = device_data.UserInfo.PatientName;
        this.PatientEmail = device_data.UserInfo.PatientEmail;
        this.DoctorEmail = device_data.UserInfo.DoctorEmail;
        this.DeviceName = device_data.UserInfo.DeviceName;
        this.SerialNumber = device_data.SerialNumber;
        this.UpdateTime = device_data.UpdateData[0].UpdateTime;
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
      text-align: center;
      .row {
        padding: 10px 0px;
        border-bottom: 1px solid #ccc;
        a {
          color: #0097e2;
        }
      }
    }
    .box1 {
      span {
        display: inline-block;
        width: 20%;
      }
    }
    .box2 {
      span {
        display: inline-block;
        width: 33%;
      }
    }
  }
</style>

