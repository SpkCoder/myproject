(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-57d6"],{S0QU:function(e,t,s){"use strict";s.r(t);var a=s("gDS+"),n=s.n(a),i=s("qpgI"),r={data:function(){return{list:[],row:{},listLoading:!0,Title:null,PatientName:null,PatientEmail:null,DoctorEmail:null,DeviceName:null,SerialNumber:null,UpdateTime:null}},filters:{PresetNumber_filter:function(e){if(e)return Number(e)-127+""},default_filter:function(e){if("default"==e)return"UA"}},created:function(){this.getData()},methods:{getData:function(){var e=this,t=this.$route.params.id;this.listLoading=!0;var s="action=findData&whereJson="+n()({SerialNumber:t});Object(i.a)(s).then(function(t){var s=t.rows[0];e.Title=s.UserInfo.DeviceName+" Device - "+s.SerialNumber+" (Config Data & Preset Data)",e.row=s.UpdateData[0].ConfigData,e.list=s.UpdateData[0].PresetData,e.listLoading=!1})},view:function(e){},edit:function(e){},delete:function(e){}}},o=(s("d1e1"),s("KHd+")),l=Object(o.a)(r,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"app-container"},[s("h2",{staticClass:"title"},[e._v(e._s(e.Title))]),e._v(" "),s("div",{staticClass:"box box1"},[s("h4",{staticClass:"title"},[e._v("Config Data")]),e._v(" "),e._m(0),e._v(" "),s("div",{staticClass:"row"},[s("span",[e._v(e._s(e.row.ComplianceTime))]),s("span",[e._v(e._s(e.row.Language))]),s("span",[e._v(e._s(e.row.Brightness/10))]),s("span",[e._v(e._s("true"==e.row.Audible?"on":"off"))]),s("span",[e._v(e._s("true"==e.row.NightMode?"on":"off"))]),s("span",[e._v(e._s(e.row.Channel1MaxAmpUsed))]),s("span",[e._v(e._s(e.row.Channel1AverageAmpUsed))]),s("span",[e._v(e._s(e.row.Channel2MaxAmpUsed))]),s("span",[e._v(e._s(e.row.Channel2AverageAmpUsed))])])]),e._v(" "),s("div",{staticClass:"box box2"},[s("h4",{staticClass:"title"},[e._v("Preset Data")]),e._v(" "),e._m(1),e._v(" "),e._l(e.list,function(t,a){return s("div",{staticClass:"row"},[s("span",[e._v(e._s(t.PresetNumber))]),s("span",[e._v(e._s(t.ElectrodeSize))]),s("span",[e._v(e._s(t.StimulationType))]),s("span",[e._v(e._s(t.ModeSettings))]),s("span",[e._v(e._s(t.TreatmentTime))]),s("span",[e._v(e._s(t.NumberOfCycles))]),s("span",[e._v(e._s(t.NextPresetToUse))]),s("span",[e._v(e._s(t.BeatFrequency))])])})],2)])},[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"row"},[t("span",[this._v("Compliance Time")]),t("span",[this._v("Language")]),t("span",[this._v("Brightness")]),t("span",[this._v("Audible")]),t("span",[this._v("Night Mode")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"row"},[s("span",[e._v("Preset#")]),s("span",[e._v("Electrode Size")]),s("span",[e._v("Stimulation Type")]),s("span",[e._v("Mode Settings")]),s("span",[e._v("Treatment Time")]),s("span",[e._v("Number Of Cycles")]),s("span",[e._v("Next Preset To Use")]),s("span",[e._v("Beat Frequency")])])}],!1,null,"43992e28",null);l.options.__file="preset_data.vue";t.default=l.exports},"bq/S":function(e,t,s){},d1e1:function(e,t,s){"use strict";var a=s("bq/S");s.n(a).a},qpgI:function(e,t,s){"use strict";s.d(t,"a",function(){return n});var a=s("t3Un");function n(e){return Object(a.a)({url:"/nodejs/deviceList?"+e,method:"get"})}}}]);