<template>
	<div class="vue-body clearfix">
	    <div class="list-page-point">
		   <div class="container">
		     <p><i class="el-icon-location" style="font-size: 14px; width: 14px;"></i><span>User&gt;&gt;User List</span></p>
		   </div>
		</div>
		<div class="list-page-box clearfix">
		  	<div class="container clearfix">
				<div class="list-page">
    
					<div id="btnApp">
						<el-button-group>
						  <el-button id="btn_add" size="small" @click="add()"><i class="el-icon-plus"></i>Add</el-button>
						  <el-button id="btn_delete" size="small" @click="delAll()"><i class="el-icon-delete"></i>Delete</el-button>
						</el-button-group>
					</div>
				    
					<div id="searchApp">
						<template>
							<el-form :model="formData_search" ref="formData_search" :inline="true" label-width="120px" size="small" name="search" class="demo-ruleForm clearfix">
						    	<template v-for="item in seaColArr">
						    		<template v-if='item.field == "roleClass_id"'>
						    			<el-form-item :label="item.title" :prop="item.field"> 
								    		<el-select placeholder="" v-model="formData_search[item.field]" :data-type="item.data_type" :name="item.field">
	               	                            <el-option v-for="item2 in roleClassList" :key="item2.id" :label="item2.class_name" :value="item2.id"> </el-option>
	               	                        </el-select>
								    	</el-form-item>
						    		</template>
							    	<template v-else-if='item.field == "roleClass_name"'>
							    		
							    	</template>
							    	<template v-else>
							    		<el-form-item :label="item.title" :prop="item.field"> 
								    		<el-input v-model="formData_search[item.field]" :data-type="item.data_type" :name="item.field"></el-input> 
								    	</el-form-item>
							    	</template>
						        </template>
						        <el-form-item> <el-button size="small" type="primary" @click="submitForm_search()">SEARCH</el-button> <el-button size="small" @click="resetForm_search()">ESC</el-button> </el-form-item>

							</el-form>
						</template>
					</div>
					
				    <div id="tableApp">
				    	<template>
							<el-table :data="tableData" border ref="multipleTable" tooltip-effect="dark" size="small" :style="{width:tableWidth}" max-height="400" @selection-change="selectionChange" @sort-change="sortChange">
						        <el-table-column fixed="left" type="selection" width="40"> </el-table-column>
						        <el-table-column v-for="item in colArr" :key="item._id" show-overflow-tooltip sortable="custom" :prop="item.field" :label="item.title" :width="item.width"> </el-table-column>
						        <el-table-column fixed="right" label="Operation" width="130"> 
						        	<template slot-scope="scope"> 
						        		<el-button @click="edit(scope.row)" type="text" size="small">Edit</el-button> 
						        		<el-button @click="del(scope.row)" type="text" size="small">Delete</el-button> 
						        	</template> 
						        </el-table-column>
					        </el-table>
	                    </template>
				    </div>
				    
				    <div id="pageApp">
				    	<template>
				    		<el-pagination v-if="windowWidth > 768" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currPage" :page-sizes="[10,20,50,100,200,500,1000]" :page-size="prePageNum" layout="prev, pager, next, jumper, total, sizes" :total="count"> </el-pagination>
				    		<el-pagination v-else @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currPage" :page-sizes="[10,20,50,100,200,500,1000]" :page-size="prePageNum" layout="prev, pager, next, total" :total="count"> </el-pagination>
	        
				    	</template>
				    </div>
				    
				    
				    <div id="formApp_add" class="formBox" v-show="formBoxShow_add">
				    	<h4 class="dragbur"><span>Add</span><i class="el-icon-circle-close" @click="closeBox()"></i></h4>
				    	<el-form :model="formData_add" :rules="rules" ref="formData_add" label-width="150px" size="small" name="add" class="demo-ruleForm">
				    		<template v-for="item in colArr">
				    			    <template v-if='item.field == "UserName"'>
							    	    <el-form-item :label="item.title" :prop="item.field"> <el-input v-model="formData_add[item.field]" :data-type="item.data_type" :name="item.field"></el-input> </el-form-item>
							    	    <el-form-item label="Password" prop="Password"> <el-input type="password" v-model="formData_add.Password" auto-complete="off" data-type="text"></el-input> </el-form-item>
				    			    </template>
				    			    
							    	<template v-else-if='item.field == "roleClass_id"'>
							    		<el-form-item :label="item.title" :prop="item.field"> 
								    		<el-select placeholder="" v-model="formData_add[item.field]" :data-type="item.data_type" :name="item.field">
	               	                            <el-option v-for="item2 in roleClassList" :key="item2.id" :label="item2.class_name" :value="item2.id"> </el-option>
	               	                        </el-select>
								    	</el-form-item>
				    			    </template>	
				    			    
							    	<template v-else-if='item.field == "roleClass_name"'> 
							    	</template>
							    	
							    	<template v-else-if='item.field == "MetricImperial"'>
                                        <el-form-item :label="item.title" :prop="item.field"> 
								    		<el-select placeholder="" v-model="formData_add[item.field]" :data-type="item.data_type" :name="item.field">
	               	                           <el-option value="Metric">Metric</el-option><el-option value="Imperial">Imperial</el-option>
	               	                        </el-select>
								    	</el-form-item>				    			    
							    	</template>
							    	
							    	<template v-else> 
							    		<el-form-item :label="item.title" :prop="item.field"> <el-input v-model="formData_add[item.field]" auto-complete="off" :data-type="item.data_type" :name="item.field"></el-input> </el-form-item>
							    	</template>
							    	
						    </template>
						    <el-form-item> <el-button size="small" type="primary" @click="submitForm_add()">SUBMIT</el-button> <el-button size="small" @click="closeBox()">ESC</el-button> </el-form-item>
				    	</el-form>
				    </div>
				    
				    <div id="formApp_edit" class="formBox" v-show="formBoxShow_edit">
				    	<h4 class="dragbur"><span>Edit</span><i class="el-icon-circle-close" @click="closeBox()"></i></h4>
				    	<el-form :model="formData_edit" :rules="rules" ref="formData_edit" label-width="150px" size="small" name="edit" class="demo-ruleForm">
				    		<template v-for="item in colArr">
				    			    <template v-if='item.field == "UserName"'>
							    	    <el-form-item :label="item.title" :prop="item.field"> <el-input v-model="formData_edit[item.field]" auto-complete="off" :disabled="true" :data-type="item.data_type" :name="item.field"></el-input> </el-form-item>
				    			    </template>
				    			    
							    	<template v-else-if='item.field == "roleClass_id"'>
							    		<el-form-item :label="item.title" :prop="item.field"> 
								    		<el-select placeholder="" v-model="formData_edit[item.field]" :data-type="item.data_type" :name="item.field">
	               	                            <el-option v-for="item2 in roleClassList" :key="item2.id" :label="item2.class_name" :value="item2.id"> </el-option>
	               	                        </el-select>
								    	</el-form-item>
				    			    </template>	
				    			    
							    	<template v-else-if='item.field == "roleClass_name"'> 
							    	</template>
							    	
							    	<template v-else-if='item.field == "MetricImperial"'>
                                        <el-form-item :label="item.title" :prop="item.field"> 
								    		<el-select placeholder="" v-model="formData_edit[item.field]" :data-type="item.data_type" :name="item.field">
	               	                           <el-option value="Metric">Metric</el-option><el-option value="Imperial">Imperial</el-option>
	               	                        </el-select>
								    	</el-form-item>				    			    
							    	</template>
							    	
							    	<template v-else> 
							    		<el-form-item :label="item.title" :prop="item.field"> <el-input v-model="formData_edit[item.field]" :data-type="item.data_type" :name="item.field"></el-input> </el-form-item>
							    	</template>
							    	
						    </template>
						    <el-form-item> <el-button size="small" type="primary" @click="submitForm_edit()">SUBMIT</el-button> <el-button size="small" @click="closeBox()">ESC</el-button> </el-form-item>
				    	</el-form>
				    </div>
					
				</div>
		    </div>
        </div>
    </div>
</template>

<script>
import config from '../assets/js/config';
import dataDB from '../assets/js/dataDB';
import formVerify from '../assets/js/formVerify';
import Drag from '../assets/js/Drag';
export default {
  name: 'userList',
  data () {
    return {
      url: config.http + location.hash.replace(/#\/page\//,"/nodejs/"),
      reqDataInt: "action=findData&searchJson=&prePageNum=10&currPage=1",
      tableData: [],
      colArr: [],
      tableWidth: "" ,
      currPage: 1,
	  prePageNum: 10,
	  count: 0,
      searchStatus: { 
        	searchJson : {},
        	prePageNum : 10,
        	currPage : 1,
        	sortJson : {}
      },
      windowWidth: document.documentElement.clientWidth,
      seaColArr: [],
      formData_search: {},
      roleClassList: [],
      formBoxShow_add: false,
      formBoxShow_edit: false,
      formData_add:{},
      formData_edit:{},
      rules: {},
    }
  },
  methods: {
	    dataInt (data) {
	    	//初始化数据
	    	var _this = this;
	   	    console.log(data);
	   	    
			if(typeof data != "object"){
	          _this.$message({duration: 1000, message: data });
	          window.location.href = "/static/login.html";
	        }
			
			data.rows.forEach(function (item,index) {
	        	item.roleClass_name = item.lookup[0].class_name;
	        	delete item.lookup;
	        });
	        
	        
	        data.colArr = [
	           {"title":"UserName","field":"UserName","width":"120","data_type":"text"},
	           {"title":"FirstName","field":"FirstName","width":"120","data_type":"text"},
	           {"title":"LastName","field":"LastName","width":"120","data_type":"text"},
	           {"title":"CompanyName","field":"CompanyName","width":"150","data_type":"text"},
	           {"title":"Email","field":"Email","width":"150","data_type":"text"},
	           {"title":"Phone","field":"Phone","width":"150","data_type":"text"},
	           {"title":"Address","field":"Address","width":"150","data_type":"text"},
	           {"title":"Country","field":"Country","width":"150","data_type":"text"},
	           {"title":"Province","field":"Province","width":"150","data_type":"text"},
	           {"title":"City","field":"City","width":"150","data_type":"text"},
	           {"title":"PostCode","field":"PostCode","width":"150","data_type":"text"},
	           {"title":"CustomerNumber","field":"CustomerNumber","width":"170","data_type":"text"},
	           {"title":"MetricImperial","field":"MetricImperial","width":"150","data_type":"text"},
	           {"title":"RoleId","field":"roleClass_id","width":"100","data_type":"int"},
	           {"title":"RoleName","field":"roleClass_name","width":"190","data_type":"text"}
	        ];
	        
	        
	        var tableWidth = 40 + 130 + 5;
	        data.colArr.forEach(function (item,index) {
	        	tableWidth += Number(item.width);
	        });
	        tableWidth += "px";
	        data.tableWidth = tableWidth;
	        
	   	    _this.tableWidth = data.tableWidth;
	   	    _this.colArr = data.colArr;
	   	    _this.tableData = data.rows;
	   	    _this.currPage = data.currPage;
			_this.prePageNum = data.prePageNum;
			_this.count = data.count;
			
			
			//初始化formData_add
			var row_add = {};
	        row_add["Password"]="";
	        for(let i = 0; i < _this.colArr.length; i++){
               var field = _this.colArr[i].field;
               row_add[field]="";
            }
	        row_add["MetricImperial"] = "Metric";
		    row_add["roleClass_id"] = 2;
	        _this.formData_add = row_add;
	        _this.rules = formVerify.rules(row_add,_this.colArr);
	        
	        
	        //初始化formData_edit
			var row_edit = {};
	        for(let i = 0; i < _this.colArr.length; i++){
               var field = _this.colArr[i].field;
               row_edit[field]="";
            }
	        _this.rules = formVerify.rules(row_edit,_this.colArr);
	        
	    },
	    handleSizeChange(num) {
	    	//每页数量
	    	var _this = this;
	      	_this.searchStatus.prePageNum = num;
	        var reqData2 = 'action=findData&searchJson='+JSON.stringify(_this.searchStatus.searchJson)+'&prePageNum='+_this.searchStatus.prePageNum+'&currPage='+_this.searchStatus.currPage+'&sortJson='+JSON.stringify(_this.searchStatus.sortJson);
		    dataDB.findData(_this.url, reqData2, _this.dataInt);
	    },
	    handleCurrentChange(num) {
	    	//当前页
	    	var _this = this;
	      	_this.searchStatus.currPage = num;
	        var reqData2 = 'action=findData&searchJson='+JSON.stringify(_this.searchStatus.searchJson)+'&prePageNum='+_this.searchStatus.prePageNum+'&currPage='+_this.searchStatus.currPage+'&sortJson='+JSON.stringify(_this.searchStatus.sortJson);
		    dataDB.findData(_this.url, reqData2, _this.dataInt);
	    },
	    toggleSelection(rows) {
	    	    //复选框
		        if(rows) {
		          rows.forEach(row => {
		            this.$refs.multipleTable.toggleRowSelection(row);
		          });
		        }else {
		          this.$refs.multipleTable.clearSelection();
		        }
	    },
	    selectionChange(dataArr) {
	    	    //复选框
		        this.multipleSelection = dataArr;
		        //选中的dataArr
		        //console.log(dataArr);
	    },
	    sortChange(obj) {
		        //排序
		        var _this = this;
		        //console.log(obj.prop +":"+obj.order);
		        var sortJson = {};
		        sortJson[obj.prop] = (obj.order == "descending") ? -1 : 1;
	      	    _this.searchStatus.sortJson = sortJson;
	            var reqData2 = 'action=findData&searchJson='+JSON.stringify(_this.searchStatus.searchJson)+'&prePageNum='+_this.searchStatus.prePageNum+'&currPage='+_this.searchStatus.currPage+'&sortJson='+JSON.stringify(_this.searchStatus.sortJson);
		        dataDB.findData(_this.url, reqData2, _this.dataInt);
	    },
	    details(row){
	      	    //查看
	      	    var _this = this;
		      	//console.log(row);
		      	//window.location.hash = "/page/detail/" +row.id;
		      	_this.$message({duration: 1000, message: "查看" });
	    },
	    search(){
	    	    //搜索
	    	    var _this = this;
		        var seaColArr = [
			           {"title":"UserName","field":"UserName","width":"150","data_type":"text"},
		//	           {"title":"FirstName","field":"FirstName","width":"150","data_type":"text"},
		//	           {"title":"LastName","field":"LastName","width":"150","data_type":"text"},
			           {"title":"CompanyName","field":"CompanyName","width":"150","data_type":"text"},
		//	           {"title":"Email","field":"Email","width":"150","data_type":"text"},
		//	           {"title":"Phone","field":"Phone","width":"150","data_type":"text"},
		//	           {"title":"Address","field":"Address","width":"150","data_type":"text"},
		//	           {"title":"Country","field":"Country","width":"150","data_type":"text"},
		//	           {"title":"Province","field":"Province","width":"150","data_type":"text"},
		//	           {"title":"City","field":"City","width":"150","data_type":"text"},
		//	           {"title":"PostCode","field":"PostCode","width":"150","data_type":"text"},
			           {"title":"CustomerNumber","field":"CustomerNumber","width":"170","data_type":"text"},
		//	           {"title":"MetricImperial","field":"MetricImperial","width":"150","data_type":"text"},
			           {"title":"RoleId","field":"roleClass_id","width":"150","data_type":"int"},
		//	           {"title":"RoleName","field":"roleClass_name","width":"190","data_type":"text"}
			        ];
			        var row = {}; 
			        for(let i = 0; i < seaColArr.length; i++){
		               var field = seaColArr[i].field;
		               row[field]="";
		            }
			        
			        _this.seaColArr = seaColArr;
			        _this.formData_search = row;
			        
	    },
	    submitForm_search() {
		      //search表单提交
		      var _this = this; 
	          _this.$refs["formData_search"].validate (function (valid) {
				if(valid) {
					//console.log(_this.formData_search);
					var dataJson = {};
					_this.seaColArr.forEach(function(item,index){
	                     var field = item.field;
	                     var data_type = item.data_type;
	                  	 if(data_type == "int" || data_type == "int(6)" || data_type == "decimal(2)" || data_type == "decimal(4)"){
	                  	 	if(_this.formData_search[field]){
	                  	 		dataJson[field] = Number(_this.formData_search[field]);
	                  	 	}
	                  	 }else if(data_type == "date(YYYY-MM-DD HH:mm:ss)" || data_type == "date(YYYY)" || data_type == "date(YYYY-MM)" || data_type == "date(YYYY-MM-DD)" || data_type == "date(HH:mm:ss)"){
	                  	 	if(_this.formData_search[field]){
	                  	 		dataJson[field] = {$gte:_this.formData_search[field]};
	                  	 	}
	                  	 }else{
	                  	 	if(_this.formData_search[field]){
	                  	 		dataJson[field] =  _this.formData_search[field];
	                  	 	}
	                  	 }
	                });
	                
	                //console.log(dataJson);
	                  
	                _this.searchStatus.searchJson = dataJson;
	                var reqData2 = 'action=findData&searchJson='+JSON.stringify(_this.searchStatus.searchJson)+'&prePageNum='+_this.searchStatus.prePageNum+'&currPage='+_this.searchStatus.currPage+'&sortJson='+JSON.stringify(_this.searchStatus.sortJson);
			        dataDB.findData(_this.url, reqData2, _this.dataInt);
				}else {
					//console.log('error submit');
					return false;
				}
			});
	    },
	    resetForm_search() {
	      	//search表单重置
	      	var _this = this;
	        _this.$refs["formData_search"].resetFields();
	        _this.searchStatus = { searchJson : {}, prePageNum : 10, currPage : 1, sortJson : {}}; 
			dataDB.findData(_this.url, _this.reqDataInt, _this.dataInt);
	    },
	    add(){
	    	    //增加
	    	    var _this = this;
	    	    _this.$refs["formData_add"].resetFields();
		        _this.OpenBox("#formApp_add");
			        
	    },
	    submitForm_add() {
		      //add表单提交
		      var _this = this; 
	          _this.$refs["formData_add"].validate (function (valid) {
				if(valid) {
					//console.log(_this.formData_add);
					var dataJson = {};
					_this.colArr.forEach(function(item,index){
						var field = item.field;
                         var data_type = item.data_type;
                      	 if(data_type == "int" || data_type == "int(6)" || data_type == "decimal(2)" || data_type == "decimal(4)"){
                      	 	dataJson[field] = Number(_this.formData_add[field]);
                      	 }else{
                      	 	dataJson[field] = _this.formData_add[field];
                      	 }
                    });
                    dataJson.Password = _this.formData_add.Password;
                    delete dataJson.roleClass_name;
                    
                    var dataArr=[];
                    dataArr.push(dataJson);
                    var reqData2 = 'action=insertData&dataArr=' + JSON.stringify(dataArr);
                    dataDB.insertData(_this.url,reqData2,function (data2) {
                        _this.$message({duration: 1000, message: data2 });
                        if(data2 != "Success"){return;}

                        var reqData3 = 'action=findData&searchJson='+JSON.stringify(_this.searchStatus.searchJson)+'&prePageNum='+_this.searchStatus.prePageNum+'&currPage='+_this.searchStatus.currPage+'&sortJson='+JSON.stringify(_this.searchStatus.sortJson);
                        dataDB.findData(_this.url,reqData3,_this.dataInt);
                        _this.closeBox();
                    });
				}else {
					//console.log('error submit');
					return false;
				}
			});
	    },
        edit(row) {
	          //修改
	      	  var _this = this; 
	      	  _this.formData_edit = row;
	      	  _this.$refs["formData_edit"].resetFields();
		      _this.OpenBox("#formApp_edit");
        },
	    submitForm_edit() {
		      //edit表单提交
		      var _this = this; 
	          _this.$refs["formData_edit"].validate (function (valid) {
				if(valid) {
					//console.log(_this.formData_edit);
					var dataJson = {};
					_this.colArr.forEach(function(item,index){
                         var field =item.field;
                         var data_type =item.data_type;
                      	 if(data_type == "int" || data_type == "int(6)" || data_type == "decimal(2)" || data_type == "decimal(4)"){
                      	 	dataJson[field] = Number(_this.formData_edit[field]);
                      	 }else{
                      	 	dataJson[field] = _this.formData_edit[field];
                      	 }
                    });
                    //console.log(dataJson);
                      
                    var searchJson={"UserName":_this.formData_edit.UserName};
                    delete dataJson.UserName;
                    var reqData2 = 'action=updateData&searchJson=' + JSON.stringify(searchJson) + '&updateJson=' + JSON.stringify(dataJson);
                    dataDB.updateData(_this.url,reqData2,function (data2) {
                        _this.$message({duration: 1000, message: data2 });
                        if(data2 != "Success"){return;}

                        var reqData3 = 'action=findData&searchJson='+JSON.stringify(_this.searchStatus.searchJson)+'&prePageNum='+_this.searchStatus.prePageNum+'&currPage='+_this.searchStatus.currPage+'&sortJson='+JSON.stringify(_this.searchStatus.sortJson);
                        dataDB.findData(_this.url,reqData3,_this.dataInt);
                        _this.closeBox();
                    });
				}else {
					//console.log('error submit');
					return false;
				}
			});
	    },
        del(row){
      	     //删除
      	     //console.log(row);
	      	var _this = this;
	      	_this.$confirm('delete?', 'Delete', {
	          confirmButtonText: 'CONFIRM',
	          cancelButtonText: 'ESC',
	          type: 'warning'
	        }).then(function () {
	          var dataJson = {"UserName":{"$in":[row.UserName]}};
              var reqData2 = 'action=delData&dataJson=' +JSON.stringify(dataJson);
              dataDB.delData(_this.url,reqData2,function (data2) {
                _this.$message({duration: 1000, message: data2 });
                if(data2 != "Success"){return;}
                
                var reqData3 = 'action=findData&searchJson='+JSON.stringify(_this.searchStatus.searchJson)+'&prePageNum='+_this.searchStatus.prePageNum+'&currPage='+_this.searchStatus.currPage+'&sortJson='+JSON.stringify(_this.searchStatus.sortJson);
                dataDB.findData(_this.url,reqData3,_this.dataInt);
              });
	        }).catch(function () {
	        	//
	        });
        },
        delAll(){
      	     //批量删除
      	     var _this = this;
      	     var SelectedArr = _this.multipleSelection;
	        	//console.log(SelectedArr);
	        	if(SelectedArr.length == 0){
	        		_this.$message({duration: 1000, message: "Please check the lines to be deleted" });
	        		return;
	        	}

		       _this.$confirm('delete?', 'Delete', {
		          confirmButtonText: 'CONFIRM',
		          cancelButtonText: 'ESC',
		          type: 'warning'
		        }).then(function () {
		            var UserNameArr = [];
		            for(var i=0; i<SelectedArr.length; i++){
		            	UserNameArr.push(SelectedArr[i].UserName);
		            }
		            //console.log(idArr);
		            var dataJson = {"UserName":{"$in":UserNameArr}};
			        var reqData2 = 'action=delData&dataJson=' +JSON.stringify(dataJson);
		            dataDB.delData(_this.url,reqData2,function (data2) {
		                _this.$message({duration: 1000, message: data2 });
		                if(data2 != "Success"){return;}
		                
		                var reqData3 = 'action=findData&searchJson='+JSON.stringify(_this.searchStatus.searchJson)+'&prePageNum='+_this.searchStatus.prePageNum+'&currPage='+_this.searchStatus.currPage+'&sortJson='+JSON.stringify(_this.searchStatus.sortJson);
		                dataDB.findData(_this.url,reqData3,_this.dataInt);
		            });
		        }).catch(function () {
		        	//
		        });
        },
	    OpenBox(selector){
	      	var _this = this;
	      	var oEle = document.querySelector(selector); 
	      	function getstyle (attr) {
	      		if(oEle.currentStyle){
	                return oEle.currentStyle[attr];
		        }else{
		            return getComputedStyle(oEle,null)[attr];
		        }
	      	}
	        var oEleWidth = parseInt(getstyle("max-width"));
	        var oEleHeight = parseInt(getstyle("max-height"));
	        var left_px = (document.documentElement.clientWidth - oEleWidth)/2 +"px";
	      	var top_px = (document.documentElement.clientHeight - oEleHeight)/2 +"px";
	      	oEle.style.left = left_px;
	      	oEle.style.top = top_px;
	      	if(/_add/.test(selector)){
	      		_this.formBoxShow_add = true;
	      		_this.formBoxShow_edit = false;
	      	}else{
	      		_this.formBoxShow_edit = true;
	      		_this.formBoxShow_add = false;
	      	}
	      	//Drag.dragFn(selector,"window");
	      	var drag = new Drag(selector,"window");
			drag.dragFn();
	        
	    },
	    closeBox(obj){
	      	var _this = this;
	      	_this.formBoxShow_add = false;
	      	_this.formBoxShow_edit = false;
	    }
      
    
	},
	created: function () {
		var _this = this;
		dataDB.findData(_this.url, _this.reqDataInt, _this.dataInt);
		
		
		//加载roleClass
        var url_roleClass = config.http + '/nodejs/roleClass';
        var reqData_roleClass = 'action=findData&searchJson=&prePageNum=100000&currPage=1';
		dataDB.findData(url_roleClass,reqData_roleClass,function (data) {
			_this.roleClassList = data.rows;
			_this.search();
		});
		
//		var reqData = 'action=updateData&searchJson={"UserName":"admin"}&updateJson={"FirstName":"ad"}';
//		dataDB.updateData(_this.url, reqData, function(data){
//			console.log(data);
//		});
    }
}
</script>

