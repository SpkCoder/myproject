create table user_list (
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
	username VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	phone VARCHAR(100) NOT NULL,
	sex VARCHAR(100) NOT NULL,
	age INT(10) NOT NULL,
	create_name VARCHAR(100) NOT NULL,
	create_time VARCHAR(100) NOT NULL,
	roleId INT(6) NOT NULL,
	update_name VARCHAR(100) NOT NULL,
	update_time VARCHAR(100) NOT NULL
	);


insert into user_list (username, password, name, email, phone, sex, age, create_name, create_time, roleId, update_name, update_time) values
("yuxian", "d8f76ca8a2939f1cf0f200ef840a955e", "匿名", "1533165085@qq.com", "13189768881", "男", 25, "yuxian", "2018-02-04 15:23:05", 1, "yuxian", "2018-02-23 16:24:35"),
("Rose", "370b95d483d1f5b61854c462decafca4", "匿名", "1533167@qq.com", "13189768882", "女", 18, "yuxian", "2018-02-04 15:23:05", 2, "yuxian", "2018-02-23 16:24:35");




create table record_list (
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
	username VARCHAR(100) NOT NULL,
	modelId INT(10) NOT NULL,
	dbName VARCHAR(100) NOT NULL,
	dbName_ch VARCHAR(100) NOT NULL,
	action VARCHAR(100) NOT NULL,
	content VARCHAR(1000) NOT NULL,
	os VARCHAR(100) NOT NULL,
	px VARCHAR(100) NOT NULL,
	ip VARCHAR(100) NOT NULL,
	time VARCHAR(100) NOT NULL
	);


insert into record_list (username, modelId, dbName, dbName_ch, action, content, os, px, ip, time) values
("yuxian", 100004, "user_list", "用户列表", "登录", "action=loginIn", "windows", "1366x768", "::1", "2018-02-23 15:56:06"),
("yuxian", 100004, "user_list", "用户列表", "退出", "action=loginOut", "windows", "1366x768", "::1", "2018-02-23 15:56:06");




create table data_list (
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
	modelId INT(10) NOT NULL,
	name VARCHAR(100) NOT NULL,
	name_ch VARCHAR(100) NOT NULL,
	field_en VARCHAR(100) NOT NULL,
	field_ch VARCHAR(100) NOT NULL,
	data_type VARCHAR(100) NOT NULL,
	field_width INT(10) NOT NULL,
	field_sort INT(10) NOT NULL,
	create_name VARCHAR(100) NOT NULL,
	create_time VARCHAR(100) NOT NULL,
	update_name VARCHAR(100) NOT NULL,
	update_time VARCHAR(100) NOT NULL
	);


insert into data_list (modelId, name, name_ch, field_en, field_ch, data_type, field_width, field_sort, create_name, create_time, update_name, update_time) values
(100001, "model_list", "模块列表", "level", "模块级别", "int", 100, 1, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100001, "model_list", "模块列表", "id", "模块ID", "int(6)", 100, 2, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100001, "model_list", "模块列表", "parentId", "父模块ID", "int(6)", 100, 3, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100001, "model_list", "模块列表", "name", "模块名称", "text", 100, 4, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100001, "model_list", "模块列表", "position", "模块位置", "text", 100, 5, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100001, "model_list", "模块列表", "sort", "排序", "int", 100, 6, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100001, "model_list", "模块列表", "href", "链接", "text", 100, 7, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100001, "model_list", "模块列表", "iconfont", "字体图标", "text", 100, 8, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100001, "model_list", "模块列表", "show", "是否显示", "text", 100, 9, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23");


insert into data_list (modelId, name, name_ch, field_en, field_ch, data_type, field_width, field_sort, create_name, create_time, update_name, update_time) values
(100002, "data_list", "数据列表", "id", "模块ID", "int(6)", 100, 1, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100002, "data_list", "数据列表", "name", "数据表名称", "text", 150, 2, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100002, "data_list", "数据列表", "name_ch", "数据表中文名", "text", 150, 3, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100002, "data_list", "数据列表", "field_ch", "中文字段", "text", 150, 4, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100002, "data_list", "数据列表", "field_en", "英文字段", "text", 150, 5, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100002, "data_list", "数据列表", "data_type", "字段数据类型", "text", 150, 6, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100002, "data_list", "数据列表", "field_width", "字段列宽", "int", 100, 7, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100002, "data_list", "数据列表", "field_sort", "字段排序", "int", 100, 8, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23");



insert into data_list (modelId, name, name_ch, field_en, field_ch, data_type, field_width, field_sort, create_name, create_time, update_name, update_time) values
(100007, "record_list", "操作记录", "username", "用户名", "text", 100, 1, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100007, "record_list", "操作记录", "modelId", "模块ID", "text", 100, 2, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100007, "record_list", "操作记录", "dbName_ch", "数据表中文名", "text", 100, 3, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100007, "record_list", "操作记录", "dbName", "数据表名称", "text", 150, 4, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100007, "record_list", "操作记录", "action", "动作", "text", 100, 5, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100007, "record_list", "操作记录", "content", "内容", "text", 200, 6, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100007, "record_list", "操作记录", "os", "操作系统", "text", 100, 7, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100007, "record_list", "操作记录", "px", "屏幕像素", "text", 100, 8, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100007, "record_list", "操作记录", "ip", "IP", "text", 100, 9, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100007, "record_list", "操作记录", "time", "时间", "text", 100, 10, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23");


insert into data_list (modelId, name, name_ch, field_en, field_ch, data_type, field_width, field_sort, create_name, create_time, update_name, update_time) values
(100004, "user_list", "用户列表", "id", "ID", "int", 100, 1, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100004, "user_list", "用户列表", "username", "用户名", "text", 100, 2, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100004, "user_list", "用户列表", "email", "电子邮箱", "text", 150, 3, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100004, "user_list", "用户列表", "phone", "电话", "text", 100, 5, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100004, "user_list", "用户列表", "sex", "性别", "text", 100, 6, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100004, "user_list", "用户列表", "age", "年龄", "int", 100, 7, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100004, "user_list", "用户列表", "roleId", "角色ID", "int", 100, 8, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100004, "user_list", "用户列表", "roleName", "角色名称", "text", 100, 9, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100004, "user_list", "用户列表", "name", "姓名", "text", 100, 4, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23");



insert into data_list (modelId, name, name_ch, field_en, field_ch, data_type, field_width, field_sort, create_name, create_time, update_name, update_time) values
(100008, "role_class", "角色分类", "id", "ID", "int", 100, 1, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100008, "role_class", "角色分类", "class_name", "分类名称", "text", 100, 2, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23");


insert into data_list (modelId, name, name_ch, field_en, field_ch, data_type, field_width, field_sort, create_name, create_time, update_name, update_time) values
(100005, "power_list", "角色权限", "id", "ID", "int", 100, 1, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100005, "power_list", "角色权限", "power_id", "角色ID", "int", 100, 2, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100005, "power_list", "角色权限", "power_name", "角色名称", "text", 100, 3, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100005, "power_list", "角色权限", "model_id", "模块ID", "int(6)", 100, 4, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100005, "power_list", "角色权限", "model_name", "模块名称", "text", 100, 5, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100005, "power_list", "角色权限", "db_name", "数据表名称", "text", 100, 6, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100005, "power_list", "角色权限", "function_ch", "功能中文名称", "text", 150, 7, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23"),
(100005, "power_list", "角色权限", "function_en", "功能英文名称", "text", 150, 8, "yuxian", "2018-02-10 14:45:58", "yuxian", "2018-02-22 18:23:23");





create table model_list (
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
	name VARCHAR(100) NOT NULL,
	`level` INT(10) NOT NULL,
	parentId INT(6) NOT NULL,
	position VARCHAR(100) NOT NULL,
	sort INT(10) NOT NULL,
	href VARCHAR(100) NOT NULL,
	iconfont VARCHAR(100) NOT NULL,
	`show` VARCHAR(100) NOT NULL,
	create_name VARCHAR(100) NOT NULL,
	create_time VARCHAR(100) NOT NULL,
	update_name VARCHAR(100) NOT NULL,
	update_time VARCHAR(100) NOT NULL
	);


insert into model_list (`level`, parentId, id, name, position, sort, href, iconfont, `show`, create_name, create_time, update_name, update_time) values
(1, 0, 100000, "系统设置", "left", 1, "", "", "true", "yuxian", "2018-02-04 13:02:21", "yuxian", "2018-02-21 19:39:58"),
(2, 100000, 100001, "模块列表", "left", 1, "#/page/model_list", "", "true", "yuxian", "2018-02-04 13:02:21", "yuxian", "2018-02-21 19:39:58"),
(2, 100000, 100002, "数据列表", "left", 2, "#/page/data_list", "", "true", "yuxian", "2018-02-04 13:02:21", "yuxian", "2018-02-21 19:39:58"),
(2, 100000, 100003, "用户列表", "left", 3, "#/page/model_list_fn", "", "true", "yuxian", "2018-02-04 13:02:21", "yuxian", "2018-02-21 19:39:58"),
(2, 100000, 100004, "用户列表", "left", 4, "#/page/user_list", "", "true", "yuxian", "2018-02-04 13:02:21", "yuxian", "2018-02-21 19:39:58"),
(2, 100000, 100005, "角色权限", "left", 5, "#/page/power_list", "", "true", "yuxian", "2018-02-04 13:02:21", "yuxian", "2018-02-21 19:39:58"),
(2, 100000, 100006, "文件列表", "left", 7, "#/page/file_list", "", "true", "yuxian", "2018-02-04 13:02:21", "yuxian", "2018-02-21 19:39:58"),
(2, 100000, 100007, "操作记录", "left", 8, "#/page/record_list", "", "true", "yuxian", "2018-02-04 13:02:21", "yuxian", "2018-02-21 19:39:58"),
(2, 100000, 100008, "角色分类", "left", 6, "#/page/role_class", "", "true", "yuxian", "2018-02-04 13:02:21", "yuxian", "2018-02-21 19:39:58");






create table role_class (
	id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
	class_name VARCHAR(100) NOT NULL,
	create_name VARCHAR(100) NOT NULL,
	create_time VARCHAR(100) NOT NULL,
	update_name VARCHAR(100) NOT NULL,
	update_time VARCHAR(100) NOT NULL
	);


insert into role_class (id, class_name, create_name, create_time, update_name, update_time) values
(1, "超级用户", "yuxian", "2018-02-04 13:02:21", "yuxian", "2018-02-21 19:39:58"),
(2, "普通用户", "yuxian", "2018-02-04 13:02:21", "yuxian", "2018-02-21 19:39:58"),
(3, "经理", "yuxian", "2018-02-04 13:02:21", "yuxian", "2018-02-21 19:39:58"),
(4, "员工", "yuxian", "2018-02-04 13:02:21", "yuxian", "2018-02-21 19:39:58");







create table power_list (
	id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
	power_id INT(10) NOT NULL,
	power_name VARCHAR(100) NOT NULL,
	model_id int(6) NOT NULL,
	model_name VARCHAR(100) NOT NULL,
	db_name VARCHAR(100) NOT NULL,
	function_ch VARCHAR(100) NOT NULL,
	function_en VARCHAR(100) NOT NULL,
	create_name VARCHAR(100) NOT NULL,
	create_time VARCHAR(100) NOT NULL
	);


insert into power_list (power_id, power_name, model_id, model_name, db_name, function_ch, function_en, create_name, create_time) values
(1, "超级用户", 100001, "模块列表", "model_list", "查询", "findData", "yuxian", "2018-02-11 00:50:55"),
(1, "超级用户", 100001, "模块列表", "model_list", "增加", "insertData", "yuxian", "2018-02-11 00:50:55"),
(1, "超级用户", 100001, "模块列表", "model_list", "修改", "updateData", "yuxian", "2018-02-11 00:50:55"),
(1, "超级用户", 100001, "模块列表", "model_list", "删除", "delData", "yuxian", "2018-02-11 00:50:55"),
(1, "超级用户", 100002, "数据列表", "data_list", "查询", "findData", "yuxian", "2018-02-11 00:50:55"),
(1, "超级用户", 100002, "模块列表", "data_list", "增加", "insertData", "yuxian", "2018-02-11 00:50:55"),
(1, "超级用户", 100002, "模块列表", "data_list", "修改", "updateData", "yuxian", "2018-02-11 00:50:55"),
(1, "超级用户", 100002, "模块列表", "data_list", "删除", "delData", "yuxian", "2018-02-11 00:50:55");
