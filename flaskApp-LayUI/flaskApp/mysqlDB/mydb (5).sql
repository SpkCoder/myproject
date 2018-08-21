-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: 2018-08-21 09:40:09
-- 服务器版本： 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mydb`
--

-- --------------------------------------------------------

--
-- 表的结构 `data_list`
--

CREATE TABLE `data_list` (
  `id` int(6) UNSIGNED NOT NULL,
  `modelId` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `name_ch` varchar(100) NOT NULL,
  `field_en` varchar(100) NOT NULL,
  `field_ch` varchar(100) NOT NULL,
  `data_type` varchar(100) NOT NULL,
  `field_width` int(10) NOT NULL,
  `field_sort` int(10) NOT NULL,
  `create_name` varchar(100) NOT NULL,
  `create_time` varchar(100) NOT NULL,
  `update_name` varchar(100) NOT NULL,
  `update_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `data_list`
--

INSERT INTO `data_list` (`id`, `modelId`, `name`, `name_ch`, `field_en`, `field_ch`, `data_type`, `field_width`, `field_sort`, `create_name`, `create_time`, `update_name`, `update_time`) VALUES
(1, 100007, 'record_list', '操作记录', 'username', '用户名', 'text', 100, 1, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(2, 100007, 'record_list', '操作记录', 'modelId', '模块ID', 'int(6)', 100, 2, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(3, 100007, 'record_list', '操作记录', 'dbName_ch', '数据表中文名', 'text', 100, 3, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(4, 100007, 'record_list', '操作记录', 'dbName', '数据表名称', 'text', 150, 4, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(5, 100007, 'record_list', '操作记录', 'action', '动作', 'text', 100, 5, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(6, 100007, 'record_list', '操作记录', 'content', '内容', 'text', 200, 6, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(7, 100007, 'record_list', '操作记录', 'os', '操作系统', 'text', 100, 7, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(8, 100007, 'record_list', '操作记录', 'px', '屏幕像素', 'text', 100, 8, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(9, 100007, 'record_list', '操作记录', 'ip', 'IP', 'text', 150, 9, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(10, 100007, 'record_list', '操作记录', 'time', '时间', 'date(YYYY-MM-DD HH:mm:ss)', 150, 10, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(11, 100001, 'model_list', '模块列表', 'level', '模块级别', 'int', 100, 1, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(12, 100001, 'model_list', '模块列表', 'id', '模块ID', 'int(6)', 100, 2, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(13, 100001, 'model_list', '模块列表', 'parentId', '父模块ID', 'int(6)', 100, 3, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(14, 100001, 'model_list', '模块列表', 'name', '模块名称', 'text', 100, 4, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(15, 100001, 'model_list', '模块列表', 'position', '模块位置', 'text', 100, 5, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(16, 100001, 'model_list', '模块列表', 'sort', '排序', 'int', 100, 6, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(17, 100001, 'model_list', '模块列表', 'href', '链接', 'text', 100, 7, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(18, 100001, 'model_list', '模块列表', 'iconfont', '字体图标', 'text', 100, 8, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(19, 100001, 'model_list', '模块列表', 'show', '是否显示', 'text', 100, 9, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(20, 100002, 'data_list', '数据列表', 'id', '模块ID', 'int(6)', 100, 1, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(21, 100002, 'data_list', '数据列表', 'name', '数据表名称', 'text', 150, 2, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(22, 100002, 'data_list', '数据列表', 'name_ch', '数据表中文名', 'text', 150, 3, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(23, 100002, 'data_list', '数据列表', 'field_ch', '中文字段', 'text', 150, 4, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(24, 100002, 'data_list', '数据列表', 'field_en', '英文字段', 'text', 150, 5, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(25, 100002, 'data_list', '数据列表', 'data_type', '字段数据类型', 'text', 150, 6, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(26, 100002, 'data_list', '数据列表', 'field_width', '字段列宽', 'int', 100, 7, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(27, 100002, 'data_list', '数据列表', 'field_sort', '字段排序', 'int', 100, 8, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(36, 100008, 'role_class', '角色分类', 'id', 'ID', 'int', 100, 1, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(37, 100008, 'role_class', '角色分类', 'class_name', '分类名称', 'text', 100, 2, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(38, 100004, 'user_list', '用户列表', 'id', 'ID', 'int', 100, 1, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(39, 100004, 'user_list', '用户列表', 'username', '用户名', 'text', 100, 2, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(40, 100004, 'user_list', '用户列表', 'email', '电子邮箱', 'text', 150, 3, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(41, 100004, 'user_list', '用户列表', 'phone', '电话', 'text', 100, 5, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(42, 100004, 'user_list', '用户列表', 'sex', '性别', 'text', 100, 6, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(43, 100004, 'user_list', '用户列表', 'age', '年龄', 'int', 100, 7, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(44, 100004, 'user_list', '用户列表', 'roleId', '角色ID', 'int', 100, 8, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(45, 100004, 'user_list', '用户列表', 'roleName', '角色名称', 'text', 100, 9, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(46, 100004, 'user_list', '用户列表', 'name', '姓名', 'text', 100, 4, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23');

-- --------------------------------------------------------

--
-- 表的结构 `http_test`
--

CREATE TABLE `http_test` (
  `id` int(6) UNSIGNED NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `create_time` varchar(30) NOT NULL,
  `update_time` varchar(30) NOT NULL,
  `create_name` varchar(30) NOT NULL,
  `update_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `http_test`
--

INSERT INTO `http_test` (`id`, `firstname`, `lastname`, `email`, `create_time`, `update_time`, `create_name`, `update_name`) VALUES
(1, 'John', 'Doe', 'john@example.com', '', '2018-03-30 15:41:15', '', 'yuxian'),
(2, 'bob', 'Doe2', 'john@example.com', '', '', '', ''),
(3, 'Mary', 'Moe', 'mary@example.com', '', '', '', ''),
(4, 'test5', '', '153316521', '', '', '', ''),
(5, 'test4', '', '1533165', '2018-03-28 15:14:04', '', 'yuxian', ''),
(6, 'test6', '', '15331652', '2018-03-30 15:14:04', '', 'yuxian', '');

-- --------------------------------------------------------

--
-- 表的结构 `model_list`
--

CREATE TABLE `model_list` (
  `id` int(6) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `level` int(10) NOT NULL,
  `parentId` int(6) NOT NULL,
  `position` varchar(100) NOT NULL,
  `sort` int(10) NOT NULL,
  `href` varchar(100) NOT NULL,
  `iconfont` varchar(100) NOT NULL,
  `show` varchar(100) NOT NULL,
  `create_name` varchar(100) NOT NULL,
  `create_time` varchar(100) NOT NULL,
  `update_name` varchar(100) NOT NULL,
  `update_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `model_list`
--

INSERT INTO `model_list` (`id`, `name`, `level`, `parentId`, `position`, `sort`, `href`, `iconfont`, `show`, `create_name`, `create_time`, `update_name`, `update_time`) VALUES
(100000, '系统设置', 1, 0, 'left', 1, '', '', 'true', 'yuxian', '2018-02-04 13:02:21', 'yuxian', '2018-02-21 19:39:58'),
(100001, '模块列表', 2, 100000, 'left', 1, '#/page/model_list', '', 'true', 'yuxian', '2018-02-04 13:02:21', 'yuxian', '2018-02-21 19:39:58'),
(100002, '数据列表', 2, 100000, 'left', 2, '#/page/data_list', '', 'true', 'yuxian', '2018-02-04 13:02:21', 'yuxian', '2018-02-21 19:39:58'),
(100003, '模块功能', 2, 100000, 'left', 3, '#/page/model_list_fn', '', 'true', 'yuxian', '2018-02-04 13:02:21', 'yuxian', '2018-02-21 19:39:58'),
(100004, '用户列表', 2, 100000, 'left', 4, '#/page/user_list', '', 'true', 'yuxian', '2018-02-04 13:02:21', 'yuxian', '2018-02-21 19:39:58'),
(100005, '角色权限', 2, 100000, 'left', 5, '#/page/power_list', '', 'true', 'yuxian', '2018-02-04 13:02:21', 'yuxian', '2018-02-21 19:39:58'),
(100006, '文件列表', 2, 100000, 'left', 7, '#/page/file_list', '', 'true', 'yuxian', '2018-02-04 13:02:21', 'yuxian', '2018-02-21 19:39:58'),
(100007, '操作记录', 2, 100000, 'left', 8, '#/page/record_list', '', 'true', 'yuxian', '2018-02-04 13:02:21', 'yuxian', '2018-02-21 19:39:58'),
(100008, '角色分类', 2, 100000, 'left', 6, '#/page/role_class', '', 'true', 'yuxian', '2018-02-04 13:02:21', 'yuxian', '2018-02-21 19:39:58'),
(110000, '示例模块', 1, 0, 'left', 2, '', '', 'true', 'yuxian', '2018-02-04 13:02:21', 'yuxian', '2018-02-21 19:39:58');

-- --------------------------------------------------------

--
-- 表的结构 `record_list`
--

CREATE TABLE `record_list` (
  `id` int(6) UNSIGNED NOT NULL,
  `username` varchar(100) NOT NULL,
  `modelId` int(10) NOT NULL,
  `dbName` varchar(100) NOT NULL,
  `dbName_ch` varchar(100) NOT NULL,
  `action` varchar(100) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `os` varchar(100) NOT NULL,
  `px` varchar(100) NOT NULL,
  `ip` varchar(100) NOT NULL,
  `time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `record_list`
--

INSERT INTO `record_list` (`id`, `username`, `modelId`, `dbName`, `dbName_ch`, `action`, `content`, `os`, `px`, `ip`, `time`) VALUES
(1, 'yuxian', 100004, 'user_list', '用户列表', '登录', 'action=loginIn', 'windows', '1366x768', '::1', '2018-02-23 15:56:06'),
(2, 'yuxian', 100004, 'user_list', '用户列表', '退出', 'action=loginOut', 'windows', '1366x768', '::1', '2018-02-23 15:56:06'),
(5, 'yuxian', 100004, 'user_list', '用户列表', '退出', 'action=SignOut', 'windows', '1920x1080', '127.0.0.1', '2018-08-17 13:58:32'),
(6, 'yuxian', 100004, 'user_list', '用户列表', '登录', 'action=SignIn', 'windows', '1920x1080', '127.0.0.1', '2018-08-17 13:58:37'),
(7, 'yuxian', 100008, 'role_class', '角色分类', '增加', 'dataArr=[{''class_name'': ''员工2'', ''create_name'': ''yuxian'', ''create_time'': ''2018-08-17 17:00:18''}]', 'windows', '1920x1080', '127.0.0.1', '2018-08-17 17:00:18'),
(8, 'yuxian', 100008, 'role_class', '角色分类', '修改', 'whereStr=id=5updateJson={''class_name'': ''员工3'', ''update_name'': ''yuxian'', ''update_time'': ''2018-08-17 17', 'windows', '1920x1080', '127.0.0.1', '2018-08-17 17:00:39'),
(9, 'yuxian', 100004, 'user_list', '用户列表', '登录', 'action=SignIn', 'windows', '1920x1080', '127.0.0.1', '2018-08-20 10:05:11'),
(10, 'yuxian', 100008, 'role_class', '角色分类', '修改', 'whereStr=id=5&updateJson={''class_name'': ''员工4'', ''update_name'': ''yuxian'', ''update_time'': ''2018-08-20 1', 'windows', '1920x1080', '127.0.0.1', '2018-08-20 10:24:08'),
(11, 'yuxian', 100008, 'role_class', '角色分类', '删除', 'dataArr=[5]', 'windows', '1920x1080', '127.0.0.1', '2018-08-20 10:31:11'),
(12, 'yuxian', 100008, 'role_class', '角色分类', '增加', 'dataArr=[{''class_name'': ''员工3'', ''create_name'': ''yuxian'', ''create_time'': ''2018-08-20 10:35:17''}]', 'windows', '1920x1080', '127.0.0.1', '2018-08-20 10:35:17'),
(13, 'yuxian', 100008, 'role_class', '角色分类', '增加', 'dataArr=[{''class_name'': ''员工4'', ''create_name'': ''yuxian'', ''create_time'': ''2018-08-20 10:35:21''}]', 'windows', '1920x1080', '127.0.0.1', '2018-08-20 10:35:21'),
(14, 'yuxian', 100008, 'role_class', '角色分类', '删除', 'dataArr=[6, 7]', 'windows', '1920x1080', '127.0.0.1', '2018-08-20 10:35:43'),
(15, 'yuxian', 100004, 'user_list', '用户列表', '退出', 'action=SignOut', 'windows', '1920x1080', '127.0.0.1', '2018-08-20 11:07:14'),
(16, 'yuxian', 100004, 'user_list', '用户列表', '登录', 'action=SignIn', 'windows', '1920x1080', '127.0.0.1', '2018-08-20 11:07:18'),
(17, 'yuxian', 100004, 'user_list', '用户列表', '登录', 'action=SignIn', 'windows', '1920x1080', '127.0.0.1', '2018-08-21 09:59:17'),
(18, 'yuxian', 100004, 'user_list', '用户列表', '增加', 'dataArr=[{''username'': ''admin'', ''password'': ''123456'', ''email'': ''1533165000@qq.com'', ''phone'': '''', ''nam', 'windows', '1920x1080', '127.0.0.1', '2018-08-21 10:50:04'),
(19, 'yuxian', 100004, 'user_list', '用户列表', '增加', 'dataArr=[{''username'': ''admin'', ''password'': ''370b95d483d1f5b61854c462decafca4'', ''email'': ''1533165000@', 'windows', '1920x1080', '127.0.0.1', '2018-08-21 11:36:45'),
(20, 'yuxian', 100004, 'user_list', '用户列表', '增加', 'dataArr=[{''username'': ''admin'', ''password'': ''370b95d483d1f5b61854c462decafca4'', ''email'': ''1533165000@qq.com'', ''phone'': ''8667424618'', ''name'': ''匿名'', ''sex'': '''', ''age'': 25, ''roleId'': 1, ''create_name'': ''yuxian'', ''create_time'': ''2018-08-21 12:34:07'', ''update_name'': '''', ''update_time'': ''''}]', 'windows', '1920x1080', '127.0.0.1', '2018-08-21 12:34:07'),
(21, 'yuxian', 100004, 'user_list', '用户列表', '修改', 'whereStr=id=5&updateJson={''email'': ''1533165000@qq.com'', ''name'': ''匿名'', ''phone'': ''8667424618'', ''sex'': ''男'', ''age'': 25, ''roleId'': 1, ''update_name'': ''yuxian'', ''update_time'': ''2018-08-21 14:14:07''}', 'windows', '1920x1080', '127.0.0.1', '2018-08-21 14:14:07'),
(22, 'yuxian', 100004, 'user_list', '用户列表', '修改', 'whereStr=id=5&updateJson={''email'': ''1533165000@qq.com'', ''name'': ''匿名'', ''phone'': ''8667424618'', ''sex'': ''男'', ''age'': 26, ''roleId'': 1, ''update_name'': ''yuxian'', ''update_time'': ''2018-08-21 14:18:44''}', 'windows', '1920x1080', '127.0.0.1', '2018-08-21 14:18:44'),
(23, 'yuxian', 100008, 'role_class', '角色分类', '修改', 'whereStr=id=4&updateJson={''class_name'': ''员工2'', ''update_name'': ''yuxian'', ''update_time'': ''2018-08-21 14:20:04''}', 'windows', '1920x1080', '127.0.0.1', '2018-08-21 14:20:04'),
(24, 'yuxian', 100008, 'role_class', '角色分类', '修改', 'whereStr=id=4&updateJson={''class_name'': ''员工'', ''update_name'': ''yuxian'', ''update_time'': ''2018-08-21 14:20:10''}', 'windows', '1920x1080', '127.0.0.1', '2018-08-21 14:20:10'),
(25, 'yuxian', 100004, 'user_list', '用户列表', '修改', 'whereStr=id=5&updateJson={''email'': ''1533165000@qq.com'', ''name'': ''匿名'', ''phone'': ''8667424618'', ''sex'': ''男'', ''age'': 25, ''roleId'': 1, ''update_name'': ''yuxian'', ''update_time'': ''2018-08-21 15:10:42''}', 'windows', '1920x1080', '127.0.0.1', '2018-08-21 15:10:42'),
(26, 'yuxian', 100004, 'user_list', '用户列表', '修改', 'change password', 'windows', '1920x1080', '127.0.0.1', '2018-08-21 15:22:01');

-- --------------------------------------------------------

--
-- 表的结构 `role_class`
--

CREATE TABLE `role_class` (
  `id` int(10) UNSIGNED NOT NULL,
  `class_name` varchar(100) NOT NULL,
  `create_name` varchar(100) NOT NULL,
  `create_time` varchar(100) NOT NULL,
  `update_name` varchar(100) NOT NULL,
  `update_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `role_class`
--

INSERT INTO `role_class` (`id`, `class_name`, `create_name`, `create_time`, `update_name`, `update_time`) VALUES
(1, '超级用户', 'yuxian', '2018-02-04 13:02:21', 'yuxian', '2018-02-21 19:39:58'),
(2, '普通用户', 'yuxian', '2018-02-04 13:02:21', 'yuxian', '2018-02-21 19:39:58'),
(3, '经理', 'yuxian', '2018-02-04 13:02:21', 'yuxian', '2018-02-21 19:39:58'),
(4, '员工', 'yuxian', '2018-02-04 13:02:21', 'yuxian', '2018-08-21 14:20:10');

-- --------------------------------------------------------

--
-- 表的结构 `user_list`
--

CREATE TABLE `user_list` (
  `id` int(6) UNSIGNED NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `sex` varchar(100) NOT NULL,
  `age` int(10) NOT NULL,
  `create_name` varchar(100) NOT NULL,
  `create_time` varchar(100) NOT NULL,
  `roleId` int(6) NOT NULL,
  `update_name` varchar(100) NOT NULL,
  `update_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user_list`
--

INSERT INTO `user_list` (`id`, `username`, `password`, `name`, `email`, `phone`, `sex`, `age`, `create_name`, `create_time`, `roleId`, `update_name`, `update_time`) VALUES
(1, 'yuxian', 'd8f76ca8a2939f1cf0f200ef840a955e', '匿名', '1533165085@qq.com', '13189768881', '男', 25, 'yuxian', '2018-02-04 15:23:05', 1, 'yuxian', '2018-08-21 15:22:01'),
(2, 'Rose', '370b95d483d1f5b61854c462decafca4', '匿名', '1533167@qq.com', '13189768882', '女', 18, 'yuxian', '2018-02-04 15:23:05', 2, 'yuxian', '2018-02-23 16:24:35'),
(5, 'admin', '370b95d483d1f5b61854c462decafca4', '匿名', '1533165000@qq.com', '8667424618', '男', 25, 'yuxian', '2018-08-21 12:34:07', 1, 'yuxian', '2018-08-21 15:10:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data_list`
--
ALTER TABLE `data_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_list`
--
ALTER TABLE `model_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `record_list`
--
ALTER TABLE `record_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role_class`
--
ALTER TABLE `role_class`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_list`
--
ALTER TABLE `user_list`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `data_list`
--
ALTER TABLE `data_list`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
--
-- 使用表AUTO_INCREMENT `model_list`
--
ALTER TABLE `model_list`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110001;
--
-- 使用表AUTO_INCREMENT `record_list`
--
ALTER TABLE `record_list`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- 使用表AUTO_INCREMENT `role_class`
--
ALTER TABLE `role_class`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `user_list`
--
ALTER TABLE `user_list`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
