(window.webpackJsonp=window.webpackJsonp||[]).push([["istY"],{istY:function(t,e,n){"use strict";n.r(e);var i=n("t3Un");var a={data:function(){return{list:null,listLoading:!0}},created:function(){this.getData()},methods:{getData:function(){var t=this;this.listLoading=!0;(function(t){return Object(i.a)({url:"/nodejs/deviceList?"+t,method:"get"})})("action=findData&whereJson=").then(function(e){t.list=e.rows,t.listLoading=!1})},view:function(t){},edit:function(t){this.$set(this.editForm,"user_name",t.user_name),this.$set(this.editForm,"permission",t.permission+""),this.dialogVisible=!0},delete:function(t){}}},l=n("KHd+"),o=Object(l.a)(a,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"885px"},attrs:{data:t.list,"element-loading-text":"Loading",border:"",fit:"",stripe:"","highlight-current-row":"",size:"medium"}},[n("el-table-column",{attrs:{label:"SerialNumber",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.SerialNumber)+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"PatientName",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.PatientName))])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"PatientEmail",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.PatientEmail)+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"DoctorEmail",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.DoctorEmail)+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"DeviceName",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(e.row.DeviceName)+"\n      ")]}}])}),t._v(" "),n("el-table-column",{attrs:{fixed:"right",label:"Operation",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("router-link",{attrs:{to:"/device/check/"+e.row.id}},[n("el-button",{attrs:{type:"text",size:"medium"}},[t._v("check")])],1)]}}])})],1)],1)},[],!1,null,null,null);o.options.__file="list.vue";e.default=o.exports}}]);