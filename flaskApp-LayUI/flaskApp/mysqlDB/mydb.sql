-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: 2018-07-23 12:04:51
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
-- 表的结构 `record_list`
--

CREATE TABLE `record_list` (
  `id` int(6) UNSIGNED NOT NULL,
  `username` varchar(100) NOT NULL,
  `modelId` int(10) NOT NULL,
  `dbName` varchar(100) NOT NULL,
  `dbName_ch` varchar(100) NOT NULL,
  `action` varchar(100) NOT NULL,
  `content` varchar(100) NOT NULL,
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
(2, 'yuxian', 100004, 'user_list', '用户列表', '退出', 'action=loginOut', 'windows', '1366x768', '::1', '2018-02-23 15:56:06');

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
(1, 'yuxian', 'd8f76ca8a2939f1cf0f200ef840a955e', '匿名', '1533165085@qq.com', '13189768881', '男', 25, 'yuxian', '2018-02-04 15:23:05', 1, 'yuxian', '2018-07-23 14:12:07'),
(2, 'Rose', '370b95d483d1f5b61854c462decafca4', '匿名', '1533167@qq.com', '13189768882', '女', 18, 'yuxian', '2018-02-04 15:23:05', 2, 'yuxian', '2018-02-23 16:24:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `record_list`
--
ALTER TABLE `record_list`
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
-- 使用表AUTO_INCREMENT `record_list`
--
ALTER TABLE `record_list`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `user_list`
--
ALTER TABLE `user_list`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
