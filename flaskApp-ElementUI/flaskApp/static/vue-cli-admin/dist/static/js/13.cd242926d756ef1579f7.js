webpackJsonp([13],{Xmu0:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("mvHQ"),r=a.n(i),o=a("pFYg"),l=a.n(o),n=(a("PJh5"),a("b/lj")),d=a("K3RZ"),s={name:"model_list",filters:{field_width_filter:function(e){if(e)return e+"px"}},data:function(){return{modelName1:null,modelName2:null,url:null,tabelwidth:null,list:null,listLoading:!0,data_type:null,field_ch:null,field_en:null,field_sort:null,field_width:null,editFormBox:!1,addFormBox:!1,searchFormBox:!1,multipleSelection:[],permissionList:[],editForm:{},addForm:{},searchForm:{},modelList:[],currPage:1,prePageNum:10,count:0,sortStr:"",whereStr:"",rules:{}}},methods:{getData:function(){var e=this;e.listLoading=!0;var t="action=findData&whereStr="+e.whereStr+"&sortStr="+e.sortStr+"&prePageNum="+e.prePageNum+"&currPage="+e.currPage;n.a.findData(e,e.url,t,function(t){e.listLoading=!1,"object"==(void 0===t?"undefined":l()(t))?(e.list=t.rows,e.data_type=t.data_type.split(";"),e.field_ch=t.field_ch.split(";"),e.field_en=t.field_en.split(";"),e.field_sort=t.field_sort.split(";"),e.field_width=t.field_width.split(";"),e.field_width.forEach(function(t){e.tabelwidth+=Number(t)}),e.tabelwidth=e.tabelwidth+40+130+5+"px",e.currPage=t.currPage,e.prePageNum=t.prePageNum,e.count=t.count,e.rules=d.a.rules(e.field_en,e.data_type)):e.$message({duration:1e3,message:t})});t="action=findData&whereStr=level=2&sortStr=id ASC&prePageNum=100000&currPage=1";n.a.findData(e,e.GLOBAL.host+"/python/model_list",t,function(t){t&&(e.modelList=t.rows)})},selectionChange:function(e){this.multipleSelection=e},sortChange:function(e){var t="descending"==e.order?"desc":"asc";this.sortStr=e.prop+" "+t,this.getData()},handleSizeChange:function(e){this.prePageNum=e,this.getData()},handleCurrentChange:function(e){this.currPage=e,this.getData()},view:function(e){},edit:function(e){var t=this;t.field_en.forEach(function(a,i){t.$set(t.editForm,a,e[a])}),this.editFormBox=!0},editSubmitForm:function(){var e=this;e.$refs.editForm.validate(function(t){if(!t)return!1;e.field_en.forEach(function(t,a){var i=e.data_type[a];"int"!=i&&"int(6)"!=i&&"decimal(2)"!=i&&"decimal(4)"!=i||(e.editForm[t]=Number(e.editForm[t]))});var a="id="+e.editForm.id,i=e.editForm;delete i.id;var o={action:"updateData",whereStr:a,updateJson:r()(i)};n.a.updateData(e,e.url,o,function(t){e.$message({duration:1e3,message:t}),"操作成功"==t&&(e.editFormBox=!1,e.getData())})})},editCancelSubmit:function(){this.$refs.editForm.resetFields(),this.editFormBox=!1},del:function(e){var t=this;100001!=e.model_id&&100002!=e.model_id&&100003!=e.model_id&&100004!=e.model_id&&100005!=e.model_id&&100006!=e.model_id&&100007!=e.model_id&&100008!=e.model_id?t.$confirm("确认删除?","删除",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var a={id:[e.id]},i={action:"delData",whereJson:r()(a)};n.a.delData(t,t.url,i,function(e){t.$message({duration:1e3,message:e}),"操作成功"==e&&(t.addFormBox=!1,t.getData())})}).catch(function(){}):t.$message({duration:1e3,message:"禁止操作系统模块！"})},btn_add:function(){this.$set(this.addForm,"id",this.modelList[0].id),this.$set(this.addForm,"function_en","findData"),this.addFormBox=!0},addSubmitForm:function(){var e=this;e.$refs.addForm.validate(function(t){if(!t)return!1;e.addForm.id=Number(e.addForm.id),e.addForm.model_id=e.addForm.id,e.addForm.model_name=document.querySelector("#id_select").value,e.addForm.function_ch=document.querySelector("#function_en_select").value;var a="action=findData&whereStr=modelId="+e.addForm.model_id+"&prePageNum=1&currPage=1";n.a.findData(e,e.GLOBAL.host+"/python/data_list",a,function(t){e.addForm.db_name=t.rows[0].name,delete e.addForm.id;var a=[];a.push(e.addForm);var i={action:"insertData",dataArr:r()(a)};n.a.insertData(e,e.url,i,function(t){e.$message({duration:1e3,message:t}),"操作成功"==t&&(e.addFormBox=!1,e.getData())})})})},addCancelSubmit:function(){this.$refs.addForm.resetFields(),this.addFormBox=!1},btn_del:function(){var e=this;0!=e.multipleSelection.length?e.$confirm("确认删除?","删除",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){for(var t=[],a=0;a<e.multipleSelection.length;a++)t.push(e.multipleSelection[a].id);var i={id:t},o={action:"delData",whereJson:r()(i)};n.a.delData(e,e.url,o,function(t){e.$message({duration:1e3,message:t}),"操作成功"==t&&e.getData()})}).catch(function(){}):e.$message({duration:1e3,message:"请勾选要删除的行"})},btn_search:function(){this.searchFormBox=!0},searchSubmitForm:function(){var e=this;e.$refs.searchForm.validate(function(t){if(!t)return!1;var a="",i=0;e.field_en.forEach(function(t,r){var o=e.data_type[r];"int"==o||"int(6)"==o||"decimal(2)"==o||"decimal(4)"==o?e.searchForm[t]&&(e.searchForm[t]=Number(e.searchForm[t]),a+=0==i?t+"="+e.searchForm[t]:" and "+t+"="+e.searchForm[t],i++):"date(YYYY-MM-DD HH:mm:ss)"==o||"date(YYYY)"==o||"date(YYYY-MM)"==o||"date(YYYY-MM-DD)"==o||"date(HH:mm:ss)"==o?e.searchForm[t]&&(a+=0==i?t+'>="'+e.searchForm[t]+'"':" and "+t+'>="'+e.searchForm[t]+'"',i++):e.searchForm[t]&&(a+=0==i?t+'="'+e.searchForm[t]+'"':" and "+t+'="'+e.searchForm[t]+'"',i++)}),e.whereStr=a,e.getData()})},searchCancelSubmit:function(){this.searchForm={},this.$refs.searchForm.resetFields(),this.searchFormBox=!1,this.whereStr="",this.getData()}},watch:{msg:function(e,t){}},created:function(){this.url=this.GLOBAL.host+this.$route.path.replace(/\/page/,"/python"),this.modelName1=this.$route.meta.pname,this.modelName2=this.$route.name,this.getData()}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"view-body clearfix"},[a("div",{staticClass:"list-page-point"},[a("div",{staticClass:"container"},[a("p",[a("i",{staticClass:"el-icon-location",staticStyle:{"font-size":"14px"}}),a("span",[e._v(e._s(e.modelName1)+">>"+e._s(e.modelName2))])])])]),e._v(" "),a("div",{staticClass:"list-page-box clearfix"},[a("div",{staticClass:"container clearfix"},[a("div",{staticClass:"list-page"},[a("div",{staticStyle:{"margin-bottom":"10px"}},[a("el-button-group",[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.btn_add()}}},[e._v("增加")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.btn_search()}}},[e._v("查询")])],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],style:{width:e.tabelwidth},attrs:{data:e.list,"element-loading-text":"Loading",border:"",stripe:"","highlight-current-row":"","tooltip-effect":"dark",size:"small"},on:{"selection-change":e.selectionChange,"sort-change":e.sortChange}},[a("el-table-column",{attrs:{fixed:"left",type:"selection",width:"40"}}),e._v(" "),e._l(e.field_en,function(t,i){return[a("el-table-column",{key:t.id,attrs:{"show-overflow-tooltip":"",sortable:"custom",prop:t,label:e.field_ch[i],width:e._f("field_width_filter")(e.field_width[i])}})]}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small",icon:"el-icon-delete"},on:{click:function(a){e.del(t.row)}}},[e._v(" ")])]}}])})],2),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currPage,"page-sizes":[10,50,100,500],"page-size":e.prePageNum,layout:"prev, pager, next, jumper, total, sizes",total:e.count},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),e._v(" "),a("el-dialog",{attrs:{title:"增加",visible:e.addFormBox,width:"600px"},on:{"update:visible":function(t){e.addFormBox=t}}},[a("el-form",{ref:"addForm",attrs:{model:e.addForm,rules:e.rules,size:"small","label-width":"150px"}},[e._l(e.field_en,function(t,i){return["id"==t||"model_id"==t||"db_name"==t||"function_en"==t?void 0:"model_name"==t?[a("el-form-item",{key:i,attrs:{label:e.field_ch[i]}},[a("el-select",{attrs:{id:"id_select",placeholder:""},model:{value:e.addForm.id,callback:function(t){e.$set(e.addForm,"id",t)},expression:"addForm['id']"}},e._l(e.modelList,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1)]:"function_ch"==t?[a("el-form-item",{key:i,attrs:{label:e.field_ch[i]}},[a("el-select",{attrs:{id:"function_en_select",placeholder:""},model:{value:e.addForm.function_en,callback:function(t){e.$set(e.addForm,"function_en",t)},expression:"addForm['function_en']"}},[a("el-option",{attrs:{label:"查询",value:"findData"}}),e._v(" "),a("el-option",{attrs:{label:"增加",value:"insertData"}}),e._v(" "),a("el-option",{attrs:{label:"修改",value:"updateData"}}),e._v(" "),a("el-option",{attrs:{label:"删除",value:"delData"}})],1)],1)]:[a("el-form-item",{key:i,attrs:{label:e.field_ch[i],prop:t}},[a("el-input",{model:{value:e.addForm[t],callback:function(a){e.$set(e.addForm,t,a)},expression:"addForm[item]"}})],1)]]}),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.addSubmitForm}},[e._v("提交")]),e._v(" "),a("el-button",{on:{click:e.addCancelSubmit}},[e._v("取消")])],1)],2)],1),e._v(" "),a("el-dialog",{attrs:{title:"修改",visible:e.editFormBox,width:"600px"},on:{"update:visible":function(t){e.editFormBox=t}}},[a("el-form",{ref:"editForm",attrs:{model:e.editForm,rules:e.rules,size:"small","label-width":"150px"}},[e._l(e.field_en,function(t,i){return[a("el-form-item",{key:i,attrs:{label:e.field_ch[i],prop:t}},[a("el-input",{model:{value:e.editForm[t],callback:function(a){e.$set(e.editForm,t,a)},expression:"editForm[item]"}})],1)]}),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.editSubmitForm}},[e._v("提交")]),e._v(" "),a("el-button",{on:{click:e.editCancelSubmit}},[e._v("取消")])],1)],2)],1),e._v(" "),a("el-dialog",{attrs:{title:"查询",visible:e.searchFormBox,width:"600px"},on:{"update:visible":function(t){e.searchFormBox=t}}},[a("el-form",{ref:"searchForm",attrs:{model:e.searchForm,rules:e.rules,size:"small","label-width":"150px"}},[e._l(e.field_en,function(t,i){return[/date/.test(e.data_type[i])?a("el-form-item",{key:i,attrs:{label:e.field_ch[i]}},[a("el-date-picker",{attrs:{type:"datetime",placeholder:"选择日期时间"},model:{value:e.searchForm[t],callback:function(a){e.$set(e.searchForm,t,a)},expression:"searchForm[item]"}})],1):a("el-form-item",{key:i,attrs:{label:e.field_ch[i]}},[a("el-input",{model:{value:e.searchForm[t],callback:function(a){e.$set(e.searchForm,t,a)},expression:"searchForm[item]"}})],1)]}),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.searchSubmitForm}},[e._v("查询")]),e._v(" "),a("el-button",{on:{click:e.searchCancelSubmit}},[e._v("取消")])],1)],2)],1)],1)])])])},staticRenderFns:[]};var m=a("VU/8")(s,c,!1,function(e){a("dbVJ")},"data-v-0326f5df",null);t.default=m.exports},dbVJ:function(e,t){}});
//# sourceMappingURL=13.cd242926d756ef1579f7.js.map