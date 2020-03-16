-- MySQL dump 10.13  Distrib 8.0.16, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: xty_db
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
CREATE DATABASE IF NOT EXISTS mydb;
USE mydb;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


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
  `modelId` int(10) NOT NULL DEFAULT 0,
  `name` varchar(100) NOT NULL DEFAULT '',
  `name_ch` varchar(100) NOT NULL DEFAULT '',
  `field_en` varchar(100) NOT NULL DEFAULT '',
  `field_ch` varchar(100) NOT NULL DEFAULT '',
  `data_type` varchar(100) NOT NULL DEFAULT '',
  `field_width` int(10) NOT NULL DEFAULT 0,
  `field_sort` int(10) NOT NULL DEFAULT 0,
  `create_name` varchar(100) NOT NULL DEFAULT '',
  `create_time` varchar(100) NOT NULL DEFAULT '',
  `update_name` varchar(100) NOT NULL DEFAULT '',
  `update_time` varchar(100) NOT NULL DEFAULT ''
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
(46, 100004, 'user_list', '用户列表', 'name', '姓名', 'text', 100, 4, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(47, 100005, 'power_list', '角色权限', 'id', 'ID', 'int', 100, 1, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(48, 100005, 'power_list', '角色权限', 'power_id', '角色ID', 'int', 100, 2, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(49, 100005, 'power_list', '角色权限', 'power_name', '角色名称', 'text', 100, 3, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(50, 100005, 'power_list', '角色权限', 'model_id', '模块ID', 'int(6)', 100, 4, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(51, 100005, 'power_list', '角色权限', 'model_name', '模块名称', 'text', 100, 5, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(52, 100005, 'power_list', '角色权限', 'db_name', '数据表名称', 'text', 100, 6, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(53, 100005, 'power_list', '角色权限', 'function_ch', '功能中文名称', 'text', 150, 7, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(54, 100005, 'power_list', '角色权限', 'function_en', '功能英文名称', 'text', 150, 8, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(55, 100003, 'model_list_fn', '模块功能', 'id', 'ID', 'int', 100, 1, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(56, 100003, 'model_list_fn', '模块功能', 'model_id', '模块ID', 'int(6)', 100, 4, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(57, 100003, 'model_list_fn', '模块功能', 'model_name', '模块名称', 'text', 100, 5, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(58, 100003, 'model_list_fn', '模块功能', 'db_name', '数据表名称', 'text', 100, 6, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(59, 100003, 'model_list_fn', '模块功能', 'function_ch', '功能中文名称', 'text', 150, 7, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(60, 100003, 'model_list_fn', '模块功能', 'function_en', '功能英文名称', 'text', 150, 8, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(61, 100006, 'file_list', '文件列表', 'id', 'ID', 'int', 100, 1, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(62, 100006, 'file_list', '文件列表', 'class_name', '文件分类', 'text', 100, 2, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(63, 100006, 'file_list', '文件列表', 'name', '文件名称', 'text', 100, 3, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(64, 100006, 'file_list', '文件列表', 'url', 'URL', 'text', 150, 4, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(65, 100006, 'file_list', '文件列表', 'size', '文件大小', 'int', 100, 5, 'yuxian', '2018-02-10 14:45:58', 'yuxian', '2018-02-22 18:23:23'),
(70, 110001, 'sale_list', '月销售额统计表', 'id', 'ID', 'int', 100, 1, 'yuxian', '2018-09-30 15:09:02', '', ''),
(71, 110001, 'sale_list', '月销售额统计表', 'name', '商品名称', 'text', 100, 2, 'yuxian', '2018-09-30 15:10:33', '', ''),
(72, 110001, 'sale_list', '月销售额统计表', 'm1', '1月份', 'int', 100, 3, 'yuxian', '2018-09-30 15:27:41', '', ''),
(73, 110001, 'sale_list', '月销售额统计表', 'm2', '2月份', 'int', 100, 4, 'yuxian', '2018-09-30 15:28:19', '', ''),
(74, 110001, 'sale_list', '月销售额统计表', 'm3', '3月份', 'int', 100, 5, 'yuxian', '2018-09-30 15:28:44', '', ''),
(75, 110001, 'sale_list', '月销售额统计表', 'm4', '4月份', 'int', 100, 6, 'yuxian', '2018-09-30 15:29:08', '', ''),
(76, 110001, 'sale_list', '月销售额统计表', 'm5', '5月份', 'int', 100, 7, 'yuxian', '2018-09-30 15:29:32', '', ''),
(77, 110001, 'sale_list', '月销售额统计表', 'm6', '6月份', 'int', 100, 8, 'yuxian', '2018-09-30 15:29:58', '', ''),
(78, 110001, 'sale_list', '月销售额统计表', 'm7', '7月份', 'int', 100, 9, 'yuxian', '2018-09-30 15:30:37', '', ''),
(79, 110001, 'sale_list', '月销售额统计表', 'm8', '8月份', 'int', 100, 10, 'yuxian', '2018-09-30 15:31:00', '', ''),
(80, 110001, 'sale_list', '月销售额统计表', 'm9', '9月份', 'int', 100, 11, 'yuxian', '2018-09-30 15:31:23', '', ''),
(81, 110001, 'sale_list', '月销售额统计表', 'm10', '10月份', 'int', 100, 12, 'yuxian', '2018-09-30 15:31:55', '', ''),
(82, 110001, 'sale_list', '月销售额统计表', 'm11', '11月份', 'int', 100, 13, 'yuxian', '2018-09-30 15:32:19', '', ''),
(83, 110001, 'sale_list', '月销售额统计表', 'm12', '12月份', 'int', 100, 14, 'yuxian', '2018-09-30 15:32:40', '', '');

-- --------------------------------------------------------

--
-- 表的结构 `file_list`
--

CREATE TABLE `file_list` (
  `id` int(10) UNSIGNED NOT NULL,
  `class_name` varchar(100) NOT NULL DEFAULT '',
  `name` varchar(100) NOT NULL DEFAULT '',
  `size` varchar(100) NOT NULL DEFAULT '',
  `url` varchar(100) NOT NULL DEFAULT '',
  `create_name` varchar(100) NOT NULL DEFAULT '',
  `create_time` varchar(100) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `file_list`
--

INSERT INTO `file_list` (`id`, `class_name`, `name`, `size`, `url`, `create_name`, `create_time`) VALUES
(2, 'banner', 'mytest.png', '2727', '/static/uploadFile/2018-09-27-11-32-12-5797___mytest.png', 'yuxian', '2018-09-27 11:32:12'),
(5, '图片', 'mytest02.jpg', '8529', '/static/uploadFile/2018-09-27-13-08-27-7041___mytest02.jpg', 'yuxian', '2018-09-27 13:08:27');

-- --------------------------------------------------------

--
-- 表的结构 `http_test`
--

CREATE TABLE `http_test` (
  `id` int(6) UNSIGNED NOT NULL,
  `firstname` varchar(30) NOT NULL DEFAULT '',
  `lastname` varchar(30) NOT NULL DEFAULT '',
  `email` varchar(50) NOT NULL DEFAULT '',
  `create_time` varchar(30) NOT NULL DEFAULT '',
  `update_time` varchar(30) NOT NULL DEFAULT '',
  `create_name` varchar(30) NOT NULL DEFAULT '',
  `update_name` varchar(30) NOT NULL DEFAULT ''
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
  `name` varchar(100) NOT NULL DEFAULT '',
  `level` int(10) NOT NULL DEFAULT 0,
  `parentId` int(6) NOT NULL DEFAULT 0,
  `position` varchar(100) NOT NULL DEFAULT '',
  `sort` int(10) NOT NULL DEFAULT 0,
  `href` varchar(100) NOT NULL DEFAULT '',
  `iconfont` varchar(100) NOT NULL DEFAULT '',
  `show` varchar(100) NOT NULL DEFAULT '',
  `create_name` varchar(100) NOT NULL DEFAULT '',
  `create_time` varchar(100) NOT NULL DEFAULT '',
  `update_name` varchar(100) NOT NULL DEFAULT '',
  `update_time` varchar(100) NOT NULL DEFAULT ''
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
(110000, '示例模块', 1, 0, 'left', 2, '', '', 'true', 'yuxian', '2018-02-04 13:02:21', 'yuxian', '2018-02-21 19:39:58'),
(110001, '月销售额统计表', 2, 110000, 'left', 1, '#/page/sale_list', '', 'true', 'yuxian', '2018-09-27 14:39:16', 'yuxian', '2018-09-30 14:55:52');

-- --------------------------------------------------------

--
-- 表的结构 `model_list_fn`
--

CREATE TABLE `model_list_fn` (
  `id` int(10) UNSIGNED NOT NULL,
  `model_id` int(6) NOT NULL DEFAULT 0,
  `model_name` varchar(100) NOT NULL DEFAULT '',
  `db_name` varchar(100) NOT NULL DEFAULT '',
  `function_ch` varchar(100) NOT NULL DEFAULT '',
  `function_en` varchar(100) NOT NULL DEFAULT '',
  `create_name` varchar(100) NOT NULL DEFAULT '',
  `create_time` varchar(100) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `model_list_fn`
--

INSERT INTO `model_list_fn` (`id`, `model_id`, `model_name`, `db_name`, `function_ch`, `function_en`, `create_name`, `create_time`) VALUES
(1, 100001, '模块列表', 'model_list', '查询', 'findData', 'yuxian', '2018-02-11 00:50:55'),
(2, 100001, '模块列表', 'model_list', '增加', 'insertData', 'yuxian', '2018-02-11 00:50:55'),
(3, 100001, '模块列表', 'model_list', '修改', 'updateData', 'yuxian', '2018-02-11 00:50:55'),
(4, 100001, '模块列表', 'model_list', '删除', 'delData', 'yuxian', '2018-02-11 00:50:55'),
(5, 100002, '数据列表', 'data_list', '查询', 'findData', 'yuxian', '2018-02-11 00:50:55'),
(6, 100002, '数据列表', 'data_list', '增加', 'insertData', 'yuxian', '2018-02-11 00:50:55'),
(7, 100002, '数据列表', 'data_list', '修改', 'updateData', 'yuxian', '2018-02-11 00:50:55'),
(8, 100002, '数据列表', 'data_list', '删除', 'delData', 'yuxian', '2018-02-11 00:50:55'),
(9, 100003, '模块功能', 'data_list_fn', '查询', 'findData', 'yuxian', '2018-02-11 00:50:55'),
(10, 100003, '模块功能', 'data_list_fn', '增加', 'insertData', 'yuxian', '2018-02-11 00:50:55'),
(11, 100003, '模块功能', 'data_list_fn', '删除', 'delData', 'yuxian', '2018-02-11 00:50:55'),
(12, 100004, '用户列表', 'user_list', '查询', 'findData', 'yuxian', '2018-02-11 00:50:55'),
(13, 100004, '用户列表', 'user_list', '增加', 'insertData', 'yuxian', '2018-02-11 00:50:55'),
(14, 100004, '用户列表', 'user_list', '修改', 'updateData', 'yuxian', '2018-02-11 00:50:55'),
(15, 100004, '用户列表', 'user_list', '删除', 'delData', 'yuxian', '2018-02-11 00:50:55'),
(16, 100005, '角色权限', 'power_list', '查询', 'findData', 'yuxian', '2018-02-11 00:50:55'),
(17, 100005, '角色权限', 'power_list', '增加', 'insertData', 'yuxian', '2018-02-11 00:50:55'),
(18, 100005, '角色权限', 'power_list', '删除', 'delData', 'yuxian', '2018-02-11 00:50:55'),
(19, 100008, '角色分类', 'role_class', '查询', 'findData', 'yuxian', '2018-02-11 00:50:55'),
(20, 100008, '角色分类', 'role_class', '增加', 'insertData', 'yuxian', '2018-02-11 00:50:55'),
(21, 100008, '角色分类', 'role_class', '修改', 'updateData', 'yuxian', '2018-02-11 00:50:55'),
(22, 100008, '角色分类', 'role_class', '删除', 'delData', 'yuxian', '2018-02-11 00:50:55'),
(23, 100006, '文件列表', 'file_list', '查询', 'findData', 'yuxian', '2018-02-11 00:50:55'),
(24, 100006, '文件列表', 'file_list', '增加', 'insertData', 'yuxian', '2018-02-11 00:50:55'),
(25, 100006, '文件列表', 'file_list', '删除', 'delData', 'yuxian', '2018-02-11 00:50:55'),
(26, 100007, '操作记录', 'record_list', '查询', 'findData', 'yuxian', '2018-02-11 00:50:55'),
(32, 110001, '月销售额统计表', 'sale_list', '查询', 'findData', 'yuxian', '2018-09-30 15:35:53'),
(33, 110001, '月销售额统计表', 'sale_list', '增加', 'insertData', 'yuxian', '2018-09-30 15:35:59'),
(34, 110001, '月销售额统计表', 'sale_list', '修改', 'updateData', 'yuxian', '2018-09-30 15:36:07'),
(35, 110001, '月销售额统计表', 'sale_list', '删除', 'delData', 'yuxian', '2018-09-30 15:36:14');

-- --------------------------------------------------------

--
-- 表的结构 `power_list`
--

CREATE TABLE `power_list` (
  `id` int(10) UNSIGNED NOT NULL,
  `power_id` int(10) NOT NULL DEFAULT 0,
  `power_name` varchar(100) NOT NULL DEFAULT '',
  `model_id` int(6) NOT NULL DEFAULT 0,
  `model_name` varchar(100) NOT NULL DEFAULT '',
  `db_name` varchar(100) NOT NULL DEFAULT '',
  `function_ch` varchar(100) NOT NULL DEFAULT '',
  `function_en` varchar(100) NOT NULL DEFAULT '',
  `create_name` varchar(100) NOT NULL DEFAULT '',
  `create_time` varchar(100) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `power_list`
--

INSERT INTO `power_list` (`id`, `power_id`, `power_name`, `model_id`, `model_name`, `db_name`, `function_ch`, `function_en`, `create_name`, `create_time`) VALUES
(1, 1, '超级用户', 100001, '模块列表', 'model_list', '查询', 'findData', 'yuxian', '2018-02-11 00:50:55'),
(2, 1, '超级用户', 100001, '模块列表', 'model_list', '增加', 'insertData', 'yuxian', '2018-02-11 00:50:55'),
(3, 1, '超级用户', 100001, '模块列表', 'model_list', '修改', 'updateData', 'yuxian', '2018-02-11 00:50:55'),
(4, 1, '超级用户', 100001, '模块列表', 'model_list', '删除', 'delData', 'yuxian', '2018-02-11 00:50:55'),
(5, 1, '超级用户', 100002, '数据列表', 'data_list', '查询', 'findData', 'yuxian', '2018-02-11 00:50:55'),
(6, 1, '超级用户', 100002, '模块列表', 'data_list', '增加', 'insertData', 'yuxian', '2018-02-11 00:50:55'),
(7, 1, '超级用户', 100002, '模块列表', 'data_list', '修改', 'updateData', 'yuxian', '2018-02-11 00:50:55'),
(8, 1, '超级用户', 100002, '模块列表', 'data_list', '删除', 'delData', 'yuxian', '2018-02-11 00:50:55'),
(14, 1, '超级用户', 100003, '模块功能', 'model_list_fn', '查询', 'findData', 'yuxian', '2018-09-30 14:42:41'),
(15, 1, '超级用户', 100003, '模块功能', 'model_list_fn', '增加', 'insertData', 'yuxian', '2018-09-30 14:43:28'),
(16, 1, '超级用户', 100003, '模块功能', 'model_list_fn', '删除', 'delData', 'yuxian', '2018-09-30 14:43:53'),
(17, 1, '超级用户', 100004, '用户列表', 'user_list', '查询', 'findData', 'yuxian', '2018-09-30 14:44:13'),
(18, 1, '超级用户', 100004, '用户列表', 'user_list', '增加', 'insertData', 'yuxian', '2018-09-30 14:44:23'),
(19, 1, '超级用户', 100004, '用户列表', 'user_list', '修改', 'updateData', 'yuxian', '2018-09-30 14:44:33'),
(20, 1, '超级用户', 100004, '用户列表', 'user_list', '删除', 'delData', 'yuxian', '2018-09-30 14:44:39'),
(21, 1, '超级用户', 100005, '角色权限', 'power_list', '查询', 'findData', 'yuxian', '2018-09-30 14:44:51'),
(22, 1, '超级用户', 100005, '角色权限', 'power_list', '增加', 'insertData', 'yuxian', '2018-09-30 14:44:59'),
(23, 1, '超级用户', 100005, '角色权限', 'power_list', '删除', 'delData', 'yuxian', '2018-09-30 14:45:05'),
(24, 1, '超级用户', 100006, '文件列表', 'file_list', '查询', 'findData', 'yuxian', '2018-09-30 14:45:16'),
(25, 1, '超级用户', 100006, '文件列表', 'file_list', '增加', 'insertData', 'yuxian', '2018-09-30 14:45:24'),
(26, 1, '超级用户', 100006, '文件列表', 'file_list', '删除', 'delData', 'yuxian', '2018-09-30 14:45:32'),
(27, 1, '超级用户', 100007, '操作记录', 'record_list', '查询', 'findData', 'yuxian', '2018-09-30 14:46:00'),
(28, 1, '超级用户', 100008, '角色分类', 'role_class', '查询', 'findData', 'yuxian', '2018-09-30 14:46:10'),
(29, 1, '超级用户', 100008, '角色分类', 'role_class', '增加', 'insertData', 'yuxian', '2018-09-30 14:46:16'),
(30, 1, '超级用户', 100008, '角色分类', 'role_class', '修改', 'updateData', 'yuxian', '2018-09-30 14:46:25'),
(31, 1, '超级用户', 100008, '角色分类', 'role_class', '删除', 'delData', 'yuxian', '2018-09-30 14:46:37'),
(32, 2, '普通用户', 100001, '模块列表', 'model_list', '查询', 'findData', 'yuxian', '2018-09-30 14:47:35'),
(33, 2, '普通用户', 100002, '数据列表', 'data_list', '查询', 'findData', 'yuxian', '2018-09-30 14:47:42'),
(34, 2, '普通用户', 100003, '模块功能', 'model_list_fn', '查询', 'findData', 'yuxian', '2018-09-30 14:47:53'),
(35, 2, '普通用户', 100004, '用户列表', 'user_list', '查询', 'findData', 'yuxian', '2018-09-30 14:48:00'),
(36, 2, '普通用户', 100005, '角色权限', 'power_list', '查询', 'findData', 'yuxian', '2018-09-30 14:48:17'),
(37, 2, '普通用户', 100006, '文件列表', 'file_list', '查询', 'findData', 'yuxian', '2018-09-30 14:48:26'),
(38, 2, '普通用户', 100007, '操作记录', 'record_list', '查询', 'findData', 'yuxian', '2018-09-30 14:48:44'),
(39, 2, '普通用户', 100008, '角色分类', 'role_class', '查询', 'findData', 'yuxian', '2018-09-30 14:49:03'),
(40, 1, '超级用户', 110001, '月销售额统计表', 'sale_list', '查询', 'findData', 'yuxian', '2018-09-30 15:36:44'),
(41, 1, '超级用户', 110001, '月销售额统计表', 'sale_list', '增加', 'insertData', 'yuxian', '2018-09-30 15:36:52'),
(42, 1, '超级用户', 110001, '月销售额统计表', 'sale_list', '修改', 'updateData', 'yuxian', '2018-09-30 15:37:04'),
(43, 1, '超级用户', 110001, '月销售额统计表', 'sale_list', '删除', 'delData', 'yuxian', '2018-09-30 15:37:19'),
(44, 2, '普通用户', 110001, '月销售额统计表', 'sale_list', '查询', 'findData', 'yuxian', '2018-09-30 15:37:31');

-- --------------------------------------------------------

--
-- 表的结构 `record_list`
--

CREATE TABLE `record_list` (
  `id` int(6) UNSIGNED NOT NULL,
  `username` varchar(100) NOT NULL DEFAULT '',
  `modelId` int(10) NOT NULL DEFAULT 0,
  `dbName` varchar(100) NOT NULL DEFAULT '',
  `dbName_ch` varchar(100) NOT NULL DEFAULT '',
  `action` varchar(100) NOT NULL DEFAULT '',
  `content` varchar(1000) NOT NULL DEFAULT '',
  `os` varchar(100) NOT NULL DEFAULT '',
  `px` varchar(100) NOT NULL DEFAULT '',
  `ip` varchar(100) NOT NULL DEFAULT '',
  `time` varchar(100) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `record_list`
--

INSERT INTO `record_list` (`id`, `username`, `modelId`, `dbName`, `dbName_ch`, `action`, `content`, `os`, `px`, `ip`, `time`) VALUES
(1, 'yuxian', 100004, 'user_list', '用户列表', '退出', 'action=SignOut', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 13:34:46'),
(2, 'yuxian', 100004, 'user_list', '用户列表', '登录', 'action=SignIn', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 13:34:49'),
(3, 'yuxian', 100003, 'model_list_fn', '模块功能', '增加', 'dataArr=[{''function_en'': ''insertData'', ''function_ch'': ''增加'', ''db_name'': ''test_list'', ''model_id'': 110001, ''model_name'': ''测试'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:13:54''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:13:54'),
(4, 'yuxian', 100003, 'model_list_fn', '模块功能', '增加', 'dataArr=[{''function_en'': ''updateData'', ''function_ch'': ''修改'', ''db_name'': ''test_list'', ''model_id'': 110001, ''model_name'': ''测试'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:14:03''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:14:03'),
(5, 'yuxian', 100003, 'model_list_fn', '模块功能', '增加', 'dataArr=[{''function_en'': ''delData'', ''function_ch'': ''删除'', ''db_name'': ''test_list'', ''model_id'': 110001, ''model_name'': ''测试'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:14:11''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:14:11'),
(6, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 110001, ''function_en'': ''insertData'', ''power_name'': ''超级用户'', ''model_name'': ''测试'', ''function_ch'': ''增加'', ''db_name'': ''test_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:14:21''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:14:21'),
(7, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 110001, ''function_en'': ''updateData'', ''power_name'': ''超级用户'', ''model_name'': ''测试'', ''function_ch'': ''修改'', ''db_name'': ''test_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:14:30''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:14:30'),
(8, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 110001, ''function_en'': ''delData'', ''power_name'': ''超级用户'', ''model_name'': ''测试'', ''function_ch'': ''删除'', ''db_name'': ''test_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:14:39''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:14:39'),
(9, 'yuxian', 110001, 'test_list', '测试', '增加', 'dataArr=[{''meg'': ''tttt'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:15:00'', ''update_name'': '''', ''update_time'': ''''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:15:00'),
(10, 'yuxian', 110001, 'test_list', '测试', '修改', 'whereStr=id=5&updateJson={''meg'': ''mmm'', ''update_name'': ''yuxian'', ''update_time'': ''2018-09-30 14:15:09''}', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:15:09'),
(11, 'yuxian', 110001, 'test_list', '测试', '删除', 'whereJson={''id'': [5]}', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:15:12'),
(12, 'yuxian', 100003, 'model_list_fn', '模块功能', '删除', 'whereJson={''id'': [31]}', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:32:17'),
(13, 'yuxian', 100003, 'model_list_fn', '模块功能', '删除', 'whereJson={''id'': [29]}', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:32:19'),
(14, 'yuxian', 100003, 'model_list_fn', '模块功能', '删除', 'whereJson={''id'': [30]}', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:32:22'),
(15, 'yuxian', 100003, 'model_list_fn', '模块功能', '删除', 'whereJson={''id'': [28]}', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:32:24'),
(16, 'yuxian', 100005, 'power_list', '角色权限', '删除', 'whereJson={''id'': [13]}', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:42:14'),
(17, 'yuxian', 100005, 'power_list', '角色权限', '删除', 'whereJson={''id'': [12]}', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:42:18'),
(18, 'yuxian', 100005, 'power_list', '角色权限', '删除', 'whereJson={''id'': [11]}', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:42:21'),
(19, 'yuxian', 100005, 'power_list', '角色权限', '删除', 'whereJson={''id'': [10]}', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:42:24'),
(20, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 100003, ''function_en'': ''findData'', ''power_name'': ''超级用户'', ''model_name'': ''模块功能'', ''function_ch'': ''查询'', ''db_name'': ''model_list_fn'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:42:41''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:42:41'),
(21, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 100003, ''function_en'': ''insertData'', ''power_name'': ''超级用户'', ''model_name'': ''模块功能'', ''function_ch'': ''增加'', ''db_name'': ''model_list_fn'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:43:28''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:43:28'),
(22, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 100003, ''function_en'': ''delData'', ''power_name'': ''超级用户'', ''model_name'': ''模块功能'', ''function_ch'': ''删除'', ''db_name'': ''model_list_fn'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:43:53''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:43:53'),
(23, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 100004, ''function_en'': ''findData'', ''power_name'': ''超级用户'', ''model_name'': ''用户列表'', ''function_ch'': ''查询'', ''db_name'': ''user_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:44:13''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:44:13'),
(24, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 100004, ''function_en'': ''insertData'', ''power_name'': ''超级用户'', ''model_name'': ''用户列表'', ''function_ch'': ''增加'', ''db_name'': ''user_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:44:23''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:44:23'),
(25, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 100004, ''function_en'': ''updateData'', ''power_name'': ''超级用户'', ''model_name'': ''用户列表'', ''function_ch'': ''修改'', ''db_name'': ''user_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:44:33''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:44:33'),
(26, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 100004, ''function_en'': ''delData'', ''power_name'': ''超级用户'', ''model_name'': ''用户列表'', ''function_ch'': ''删除'', ''db_name'': ''user_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:44:39''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:44:39'),
(27, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 100005, ''function_en'': ''findData'', ''power_name'': ''超级用户'', ''model_name'': ''角色权限'', ''function_ch'': ''查询'', ''db_name'': ''power_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:44:51''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:44:51'),
(28, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 100005, ''function_en'': ''insertData'', ''power_name'': ''超级用户'', ''model_name'': ''角色权限'', ''function_ch'': ''增加'', ''db_name'': ''power_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:44:59''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:44:59'),
(29, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 100005, ''function_en'': ''delData'', ''power_name'': ''超级用户'', ''model_name'': ''角色权限'', ''function_ch'': ''删除'', ''db_name'': ''power_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:45:05''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:45:05'),
(30, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 100006, ''function_en'': ''findData'', ''power_name'': ''超级用户'', ''model_name'': ''文件列表'', ''function_ch'': ''查询'', ''db_name'': ''file_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:45:16''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:45:16'),
(31, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 100006, ''function_en'': ''insertData'', ''power_name'': ''超级用户'', ''model_name'': ''文件列表'', ''function_ch'': ''增加'', ''db_name'': ''file_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:45:24''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:45:24'),
(32, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 100006, ''function_en'': ''delData'', ''power_name'': ''超级用户'', ''model_name'': ''文件列表'', ''function_ch'': ''删除'', ''db_name'': ''file_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:45:32''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:45:32'),
(33, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 100007, ''function_en'': ''findData'', ''power_name'': ''超级用户'', ''model_name'': ''操作记录'', ''function_ch'': ''查询'', ''db_name'': ''record_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:46:00''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:46:00'),
(34, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 100008, ''function_en'': ''findData'', ''power_name'': ''超级用户'', ''model_name'': ''角色分类'', ''function_ch'': ''查询'', ''db_name'': ''role_class'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:46:10''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:46:10'),
(35, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 100008, ''function_en'': ''insertData'', ''power_name'': ''超级用户'', ''model_name'': ''角色分类'', ''function_ch'': ''增加'', ''db_name'': ''role_class'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:46:16''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:46:16'),
(36, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 100008, ''function_en'': ''updateData'', ''power_name'': ''超级用户'', ''model_name'': ''角色分类'', ''function_ch'': ''修改'', ''db_name'': ''role_class'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:46:25''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:46:25'),
(37, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 100008, ''function_en'': ''delData'', ''power_name'': ''超级用户'', ''model_name'': ''角色分类'', ''function_ch'': ''删除'', ''db_name'': ''role_class'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:46:37''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:46:37'),
(38, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 2, ''model_id'': 100001, ''function_en'': ''findData'', ''power_name'': ''普通用户'', ''model_name'': ''模块列表'', ''function_ch'': ''查询'', ''db_name'': ''model_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:47:35''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:47:35'),
(39, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 2, ''model_id'': 100002, ''function_en'': ''findData'', ''power_name'': ''普通用户'', ''model_name'': ''数据列表'', ''function_ch'': ''查询'', ''db_name'': ''data_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:47:42''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:47:42'),
(40, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 2, ''model_id'': 100003, ''function_en'': ''findData'', ''power_name'': ''普通用户'', ''model_name'': ''模块功能'', ''function_ch'': ''查询'', ''db_name'': ''model_list_fn'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:47:53''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:47:53'),
(41, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 2, ''model_id'': 100004, ''function_en'': ''findData'', ''power_name'': ''普通用户'', ''model_name'': ''用户列表'', ''function_ch'': ''查询'', ''db_name'': ''user_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:48:00''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:48:00'),
(42, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 2, ''model_id'': 100005, ''function_en'': ''findData'', ''power_name'': ''普通用户'', ''model_name'': ''角色权限'', ''function_ch'': ''查询'', ''db_name'': ''power_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:48:17''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:48:17'),
(43, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 2, ''model_id'': 100006, ''function_en'': ''findData'', ''power_name'': ''普通用户'', ''model_name'': ''文件列表'', ''function_ch'': ''查询'', ''db_name'': ''file_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:48:26''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:48:26'),
(44, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 2, ''model_id'': 100007, ''function_en'': ''findData'', ''power_name'': ''普通用户'', ''model_name'': ''操作记录'', ''function_ch'': ''查询'', ''db_name'': ''record_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:48:44''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:48:44'),
(45, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 2, ''model_id'': 100008, ''function_en'': ''findData'', ''power_name'': ''普通用户'', ''model_name'': ''角色分类'', ''function_ch'': ''查询'', ''db_name'': ''role_class'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 14:49:03''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:49:03'),
(46, 'yuxian', 100002, 'data_list', '数据列表', '删除', 'whereJson={''modelId'': [110001]}', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:54:50'),
(47, 'yuxian', 100001, 'model_list', '模块列表', '修改', 'whereStr=id=110001&updateJson={''level'': 2, ''parentId'': 110000, ''name'': ''月销售额统计表'', ''position'': ''left'', ''sort'': 1, ''href'': ''#/page/sale_list'', ''iconfont'': '''', ''show'': ''true'', ''update_name'': ''yuxian'', ''update_time'': ''2018-09-30 14:55:52''}', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 14:55:52'),
(48, 'yuxian', 100002, 'data_list', '数据列表', '增加', 'dataArr=[{''name'': ''sale_list'', ''name_ch'': ''月销售额统计表'', ''field_ch'': ''ID'', ''field_en'': ''id'', ''data_type'': ''int'', ''field_width'': 100, ''field_sort'': 1, ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:09:02'', ''update_name'': '''', ''update_time'': '''', ''modelId'': 110001}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:09:02'),
(49, 'yuxian', 100002, 'data_list', '数据列表', '增加', 'dataArr=[{''field_ch'': ''商品名称'', ''field_en'': ''name'', ''data_type'': ''text'', ''field_width'': 100, ''field_sort'': 2, ''name'': ''sale_list'', ''name_ch'': ''月销售额统计表'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:10:33'', ''update_name'': '''', ''update_time'': '''', ''modelId'': 110001}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:10:33'),
(50, 'yuxian', 100002, 'data_list', '数据列表', '增加', 'dataArr=[{''field_ch'': ''1月份'', ''field_en'': ''m1'', ''data_type'': ''int'', ''field_width'': 100, ''field_sort'': 3, ''name'': ''sale_list'', ''name_ch'': ''月销售额统计表'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:27:41'', ''update_name'': '''', ''update_time'': '''', ''modelId'': 110001}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:27:42'),
(51, 'yuxian', 100002, 'data_list', '数据列表', '增加', 'dataArr=[{''field_ch'': ''2月份'', ''field_en'': ''m2'', ''data_type'': ''int'', ''field_width'': 100, ''field_sort'': 4, ''name'': ''sale_list'', ''name_ch'': ''月销售额统计表'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:28:19'', ''update_name'': '''', ''update_time'': '''', ''modelId'': 110001}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:28:19'),
(52, 'yuxian', 100002, 'data_list', '数据列表', '增加', 'dataArr=[{''field_ch'': ''3月份'', ''field_en'': ''m3'', ''data_type'': ''int'', ''field_width'': 100, ''field_sort'': 5, ''name'': ''sale_list'', ''name_ch'': ''月销售额统计表'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:28:44'', ''update_name'': '''', ''update_time'': '''', ''modelId'': 110001}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:28:44'),
(53, 'yuxian', 100002, 'data_list', '数据列表', '增加', 'dataArr=[{''field_ch'': ''4月份'', ''field_en'': ''m4'', ''data_type'': ''int'', ''field_width'': 100, ''field_sort'': 6, ''name'': ''sale_list'', ''name_ch'': ''月销售额统计表'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:29:08'', ''update_name'': '''', ''update_time'': '''', ''modelId'': 110001}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:29:08'),
(54, 'yuxian', 100002, 'data_list', '数据列表', '增加', 'dataArr=[{''field_ch'': ''5月份'', ''field_en'': ''m5'', ''data_type'': ''int'', ''field_width'': 100, ''field_sort'': 7, ''name'': ''sale_list'', ''name_ch'': ''月销售额统计表'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:29:32'', ''update_name'': '''', ''update_time'': '''', ''modelId'': 110001}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:29:32'),
(55, 'yuxian', 100002, 'data_list', '数据列表', '增加', 'dataArr=[{''field_ch'': ''6月份'', ''field_en'': ''m6'', ''data_type'': ''int'', ''field_width'': 100, ''field_sort'': 8, ''name'': ''sale_list'', ''name_ch'': ''月销售额统计表'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:29:58'', ''update_name'': '''', ''update_time'': '''', ''modelId'': 110001}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:29:58'),
(56, 'yuxian', 100002, 'data_list', '数据列表', '增加', 'dataArr=[{''field_ch'': ''7月份'', ''field_en'': ''m7'', ''data_type'': ''int'', ''field_width'': 100, ''field_sort'': 9, ''name'': ''sale_list'', ''name_ch'': ''月销售额统计表'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:30:37'', ''update_name'': '''', ''update_time'': '''', ''modelId'': 110001}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:30:38'),
(57, 'yuxian', 100002, 'data_list', '数据列表', '增加', 'dataArr=[{''field_ch'': ''8月份'', ''field_en'': ''m8'', ''data_type'': ''int'', ''field_width'': 100, ''field_sort'': 10, ''name'': ''sale_list'', ''name_ch'': ''月销售额统计表'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:31:00'', ''update_name'': '''', ''update_time'': '''', ''modelId'': 110001}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:31:00'),
(58, 'yuxian', 100002, 'data_list', '数据列表', '增加', 'dataArr=[{''field_ch'': ''9月份'', ''field_en'': ''m9'', ''data_type'': ''int'', ''field_width'': 100, ''field_sort'': 11, ''name'': ''sale_list'', ''name_ch'': ''月销售额统计表'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:31:23'', ''update_name'': '''', ''update_time'': '''', ''modelId'': 110001}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:31:23'),
(59, 'yuxian', 100002, 'data_list', '数据列表', '增加', 'dataArr=[{''field_ch'': ''10月份'', ''field_en'': ''m10'', ''data_type'': ''int'', ''field_width'': 100, ''field_sort'': 12, ''name'': ''sale_list'', ''name_ch'': ''月销售额统计表'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:31:55'', ''update_name'': '''', ''update_time'': '''', ''modelId'': 110001}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:31:55'),
(60, 'yuxian', 100002, 'data_list', '数据列表', '增加', 'dataArr=[{''field_ch'': ''11月份'', ''field_en'': ''m11'', ''data_type'': ''int'', ''field_width'': 100, ''field_sort'': 13, ''name'': ''sale_list'', ''name_ch'': ''月销售额统计表'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:32:19'', ''update_name'': '''', ''update_time'': '''', ''modelId'': 110001}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:32:19'),
(61, 'yuxian', 100002, 'data_list', '数据列表', '增加', 'dataArr=[{''field_ch'': ''12月份'', ''field_en'': ''m12'', ''data_type'': ''int'', ''field_width'': 100, ''field_sort'': 14, ''name'': ''sale_list'', ''name_ch'': ''月销售额统计表'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:32:40'', ''update_name'': '''', ''update_time'': '''', ''modelId'': 110001}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:32:40'),
(62, 'yuxian', 100002, 'data_list', '数据列表', '增加', 'dataArr=[{''field_ch'': ''13月份'', ''field_en'': ''m13'', ''data_type'': ''textarea'', ''field_width'': 100, ''field_sort'': 20, ''name'': ''sale_list'', ''name_ch'': ''月销售额统计表'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:33:12'', ''update_name'': '''', ''update_time'': '''', ''modelId'': 110001}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:33:12'),
(63, 'yuxian', 100002, 'data_list', '数据列表', '修改', 'whereStr=id=84&updateJson={''field_ch'': ''13月份'', ''field_en'': ''m13'', ''data_type'': ''decimal(2)'', ''field_width'': 100, ''field_sort'': 20, ''update_name'': ''yuxian'', ''update_time'': ''2018-09-30 15:34:33''}', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:34:33'),
(64, 'yuxian', 100002, 'data_list', '数据列表', '删除', 'whereJson={''id'': [84]}', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:34:39'),
(65, 'yuxian', 100002, 'data_list', '数据列表', '增加', 'dataArr=[{''field_ch'': ''14月份'', ''field_en'': ''m14'', ''data_type'': ''decimal(2)'', ''field_width'': 100, ''field_sort'': 16, ''name'': ''sale_list'', ''name_ch'': ''月销售额统计表'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:34:56'', ''update_name'': '''', ''update_time'': '''', ''modelId'': 110001}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:34:56'),
(66, 'yuxian', 100002, 'data_list', '数据列表', '删除', 'whereJson={''id'': [85]}', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:35:11'),
(67, 'yuxian', 100003, 'model_list_fn', '模块功能', '增加', 'dataArr=[{''function_en'': ''findData'', ''function_ch'': ''查询'', ''db_name'': ''sale_list'', ''model_id'': 110001, ''model_name'': ''月销售额统计表'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:35:53''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:35:53'),
(68, 'yuxian', 100003, 'model_list_fn', '模块功能', '增加', 'dataArr=[{''function_en'': ''insertData'', ''function_ch'': ''增加'', ''db_name'': ''sale_list'', ''model_id'': 110001, ''model_name'': ''月销售额统计表'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:35:59''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:35:59'),
(69, 'yuxian', 100003, 'model_list_fn', '模块功能', '增加', 'dataArr=[{''function_en'': ''updateData'', ''function_ch'': ''修改'', ''db_name'': ''sale_list'', ''model_id'': 110001, ''model_name'': ''月销售额统计表'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:36:07''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:36:07'),
(70, 'yuxian', 100003, 'model_list_fn', '模块功能', '增加', 'dataArr=[{''function_en'': ''delData'', ''function_ch'': ''删除'', ''db_name'': ''sale_list'', ''model_id'': 110001, ''model_name'': ''月销售额统计表'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:36:14''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:36:14'),
(71, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 110001, ''function_en'': ''findData'', ''power_name'': ''超级用户'', ''model_name'': ''月销售额统计表'', ''function_ch'': ''查询'', ''db_name'': ''sale_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:36:44''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:36:44'),
(72, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 110001, ''function_en'': ''insertData'', ''power_name'': ''超级用户'', ''model_name'': ''月销售额统计表'', ''function_ch'': ''增加'', ''db_name'': ''sale_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:36:52''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:36:52'),
(73, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 110001, ''function_en'': ''updateData'', ''power_name'': ''超级用户'', ''model_name'': ''月销售额统计表'', ''function_ch'': ''修改'', ''db_name'': ''sale_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:37:04''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:37:04'),
(74, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 1, ''model_id'': 110001, ''function_en'': ''delData'', ''power_name'': ''超级用户'', ''model_name'': ''月销售额统计表'', ''function_ch'': ''删除'', ''db_name'': ''sale_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:37:19''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:37:19'),
(75, 'yuxian', 100005, 'power_list', '角色权限', '增加', 'dataArr=[{''power_id'': 2, ''model_id'': 110001, ''function_en'': ''findData'', ''power_name'': ''普通用户'', ''model_name'': ''月销售额统计表'', ''function_ch'': ''查询'', ''db_name'': ''sale_list'', ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:37:31''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:37:31'),
(76, 'yuxian', 110001, 'sale_list', '月销售额统计表', '增加', 'dataArr=[{''name'': ''电视机'', ''m1'': 200000, ''m2'': 100000, ''m3'': 600000, ''m4'': 300000, ''m5'': 800000, ''m6'': 1500000, ''m7'': 1000000, ''m8'': 2000000, ''m9'': 2200000, ''m10'': 1000000, ''m11'': 1200000, ''m12'': 90000, ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:42:03'', ''update_name'': '''', ''update_time'': ''''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:42:03'),
(77, 'yuxian', 110001, 'sale_list', '月销售额统计表', '增加', 'dataArr=[{''name'': ''洗衣机'', ''m1'': 600000, ''m2'': 1000000, ''m3'': 1200000, ''m4'': 800000, ''m5'': 500000, ''m6'': 1000000, ''m7'': 1200000, ''m8'': 2000000, ''m9'': 1600000, ''m10'': 1000000, ''m11'': 1400000, ''m12'': 900000, ''create_name'': ''yuxian'', ''create_time'': ''2018-09-30 15:43:18'', ''update_name'': '''', ''update_time'': ''''}]', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 15:43:18'),
(78, 'yuxian', 100004, 'user_list', '用户列表', '修改', 'change password', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 16:24:34'),
(79, 'yuxian', 100004, 'user_list', '用户列表', '退出', 'action=SignOut', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 16:24:49'),
(80, 'admin', 100004, 'user_list', '用户列表', '登录', 'action=SignIn', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 16:24:53'),
(81, 'admin', 100004, 'user_list', '用户列表', '退出', 'action=SignOut', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 16:24:56'),
(82, 'admin', 100004, 'user_list', '用户列表', '登录', 'action=SignIn', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 16:25:04'),
(83, 'admin', 100004, 'user_list', '用户列表', '退出', 'action=SignOut', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 16:25:12'),
(84, 'yuxian', 100004, 'user_list', '用户列表', '登录', 'action=SignIn', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 16:25:33'),
(85, 'yuxian', 100004, 'user_list', '用户列表', '退出', 'action=SignOut', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 16:38:42'),
(86, 'yuxian', 100004, 'user_list', '用户列表', '登录', 'action=SignIn', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 16:39:25'),
(87, 'yuxian', 100004, 'user_list', '用户列表', '退出', 'action=SignOut', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 16:39:56'),
(88, 'yuxian', 100004, 'user_list', '用户列表', '登录', 'action=SignIn', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 16:40:41'),
(89, 'yuxian', 100004, 'user_list', '用户列表', '退出', 'action=SignOut', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 16:41:44'),
(90, 'yuxian', 100004, 'user_list', '用户列表', '登录', 'action=SignIn', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 16:41:53'),
(91, 'yuxian', 100004, 'user_list', '用户列表', '退出', 'action=SignOut', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 16:43:37'),
(92, 'yuxian', 100004, 'user_list', '用户列表', '登录', 'action=SignIn', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 16:43:59'),
(93, 'yuxian', 100004, 'user_list', '用户列表', '退出', 'action=SignOut', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 16:44:20'),
(94, 'admin', 100004, 'user_list', '用户列表', '登录', 'action=SignIn', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 16:44:37'),
(95, 'admin', 100004, 'user_list', '用户列表', '退出', 'action=SignOut', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 16:45:21'),
(96, 'Rose', 100004, 'user_list', '用户列表', '登录', 'action=SignIn', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 16:45:39'),
(97, 'Rose', 100008, 'role_class', '角色分类', '修改', 'whereStr=id=4&updateJson={''class_name'': ''员工2'', ''update_name'': ''Rose'', ''update_time'': ''2018-09-30 16:46:09''}', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 16:46:09'),
(98, 'Rose', 100004, 'user_list', '用户列表', '退出', 'action=SignOut', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 16:47:31'),
(99, 'yuxian', 100004, 'user_list', '用户列表', '登录', 'action=SignIn', 'windows', '1920x1080', '127.0.0.1', '2018-09-30 16:47:39');

-- --------------------------------------------------------

--
-- 表的结构 `role_class`
--

CREATE TABLE `role_class` (
  `id` int(10) UNSIGNED NOT NULL,
  `class_name` varchar(100) NOT NULL DEFAULT '',
  `create_name` varchar(100) NOT NULL DEFAULT '',
  `create_time` varchar(100) NOT NULL DEFAULT '',
  `update_name` varchar(100) NOT NULL DEFAULT '',
  `update_time` varchar(100) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `role_class`
--

INSERT INTO `role_class` (`id`, `class_name`, `create_name`, `create_time`, `update_name`, `update_time`) VALUES
(1, '超级用户', 'yuxian', '2018-02-04 13:02:21', 'yuxian', '2018-02-21 19:39:58'),
(2, '普通用户', 'yuxian', '2018-02-04 13:02:21', 'yuxian', '2018-02-21 19:39:58'),
(3, '经理', 'yuxian', '2018-02-04 13:02:21', 'yuxian', '2018-02-21 19:39:58'),
(4, '员工', 'yuxian', '2018-02-04 13:02:21', 'Rose', '2018-09-30 16:46:09');

-- --------------------------------------------------------

--
-- 表的结构 `sale_list`
--

CREATE TABLE `sale_list` (
  `id` int(10) UNSIGNED NOT NULL,
  `create_name` varchar(100) NOT NULL DEFAULT '',
  `create_time` varchar(100) NOT NULL DEFAULT '',
  `update_name` varchar(100) NOT NULL DEFAULT '',
  `update_time` varchar(100) NOT NULL DEFAULT '',
  `name` varchar(100) NOT NULL DEFAULT '',
  `m1` int(11) NOT NULL DEFAULT 0,
  `m2` int(11) NOT NULL DEFAULT 0,
  `m3` int(11) NOT NULL DEFAULT 0,
  `m4` int(11) NOT NULL DEFAULT 0,
  `m5` int(11) NOT NULL DEFAULT 0,
  `m6` int(11) NOT NULL DEFAULT 0,
  `m7` int(11) NOT NULL DEFAULT 0,
  `m8` int(11) NOT NULL DEFAULT 0,
  `m9` int(11) NOT NULL DEFAULT 0,
  `m10` int(11) NOT NULL DEFAULT 0,
  `m11` int(11) NOT NULL DEFAULT 0,
  `m12` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `sale_list`
--

INSERT INTO `sale_list` (`id`, `create_name`, `create_time`, `update_name`, `update_time`, `name`, `m1`, `m2`, `m3`, `m4`, `m5`, `m6`, `m7`, `m8`, `m9`, `m10`, `m11`, `m12`) VALUES
(1, 'yuxian', '2018-09-30 15:42:03', '', '', '电视机', 200000, 100000, 600000, 300000, 800000, 1500000, 1000000, 2000000, 2200000, 1000000, 1200000, 90000),
(2, 'yuxian', '2018-09-30 15:43:18', '', '', '洗衣机', 600000, 1000000, 1200000, 800000, 500000, 1000000, 1200000, 2000000, 1600000, 1000000, 1400000, 900000);

-- --------------------------------------------------------

--
-- 表的结构 `user_list`
--

CREATE TABLE `user_list` (
  `id` int(6) UNSIGNED NOT NULL,
  `username` varchar(100) NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT '',
  `name` varchar(100) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL DEFAULT '',
  `phone` varchar(100) NOT NULL DEFAULT '',
  `sex` varchar(100) NOT NULL DEFAULT '',
  `age` int(10) NOT NULL DEFAULT 0,
  `create_name` varchar(100) NOT NULL DEFAULT '',
  `create_time` varchar(100) NOT NULL DEFAULT '',
  `roleId` int(6) NOT NULL DEFAULT 0,
  `update_name` varchar(100) NOT NULL DEFAULT '',
  `update_time` varchar(100) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user_list`
--

INSERT INTO `user_list` (`id`, `username`, `password`, `name`, `email`, `phone`, `sex`, `age`, `create_name`, `create_time`, `roleId`, `update_name`, `update_time`) VALUES
(1, 'yuxian', '4f6e14af56733b0f443af67b36c598fd', '匿名', '1533165085@qq.com', '13189768881', '男', 25, 'yuxian', '2018-02-04 15:23:05', 1, 'yuxian', '2018-09-30 16:24:34'),
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
-- Indexes for table `file_list`
--
ALTER TABLE `file_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_list`
--
ALTER TABLE `model_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_list_fn`
--
ALTER TABLE `model_list_fn`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `power_list`
--
ALTER TABLE `power_list`
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
-- Indexes for table `sale_list`
--
ALTER TABLE `sale_list`
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
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;
--
-- 使用表AUTO_INCREMENT `file_list`
--
ALTER TABLE `file_list`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- 使用表AUTO_INCREMENT `model_list`
--
ALTER TABLE `model_list`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110002;
--
-- 使用表AUTO_INCREMENT `model_list_fn`
--
ALTER TABLE `model_list_fn`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
--
-- 使用表AUTO_INCREMENT `power_list`
--
ALTER TABLE `power_list`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- 使用表AUTO_INCREMENT `record_list`
--
ALTER TABLE `record_list`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;
--
-- 使用表AUTO_INCREMENT `role_class`
--
ALTER TABLE `role_class`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `sale_list`
--
ALTER TABLE `sale_list`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `user_list`
--
ALTER TABLE `user_list`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
