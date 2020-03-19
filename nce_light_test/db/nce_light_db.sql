-- MySQL dump 10.13  Distrib 8.0.16, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: nce_light_db
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
CREATE DATABASE IF NOT EXISTS nce_light_db;
USE nce_light_db;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `light_power_list`
--

DROP TABLE IF EXISTS `light_power_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `light_power_list` (
  `id` INT(11) UNSIGNED AUTO_INCREMENT, 
  `time` varchar(19) NOT NULL DEFAULT '' COMMENT '时间',
  `city` varchar(50) NOT NULL DEFAULT '' COMMENT '地市名称',
  `city_area` varchar(50) NOT NULL DEFAULT '' COMMENT '区县名称',
  `olt_produce` varchar(50) NOT NULL DEFAULT '' COMMENT 'OLT厂商',
  `olt_ip` varchar(50) NOT NULL DEFAULT '' COMMENT 'OLT管理IP',
  `olt_name` varchar(100) NOT NULL DEFAULT '' COMMENT 'OLT名称',
  `pon_name` varchar(100) NOT NULL DEFAULT '' COMMENT 'PON口拼装名称',
  `sn_name` varchar(50) NOT NULL DEFAULT '' COMMENT '网关SN',
  `ont_id` varchar(11) NOT NULL DEFAULT 0 COMMENT 'ONTID',
  `ont_name` varchar(50) NOT NULL DEFAULT '' COMMENT 'ONT名称',
  `password` varchar(50) NOT NULL COMMENT 'ONU密码',
  `account` varchar(50) NOT NULL DEFAULT '' COMMENT '帐号',
  `run_time` int(11) NOT NULL DEFAULT 0 COMMENT '网关运行时长(秒)',
  `cpu_rate` int(11) NOT NULL DEFAULT 0 COMMENT 'CPU占有率(%)',
  `ram_rate` int(11) NOT NULL DEFAULT 0 COMMENT '内存占有率(%)',
  `power_send` float(2) NOT NULL DEFAULT 0 COMMENT 'PON口发射光功率(dBm)',
  `power_receive` float(2) NOT NULL DEFAULT 0 COMMENT 'PON口接收光功率(dBm)',
  PRIMARY KEY (`id`),
  KEY (`pon_name`),
  KEY (`password`),
  KEY (`time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `light_power_list`
--

LOCK TABLES `light_power_list` WRITE;
/*!40000 ALTER TABLE `light_power_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `light_power_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

DROP TABLE IF EXISTS `light_distance_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `light_distance_list` (
  `id` INT(11) UNSIGNED AUTO_INCREMENT, 
  `time` varchar(19) NOT NULL DEFAULT '' COMMENT '时间',
  `password` varchar(50) NOT NULL COMMENT 'ONU注册码',
  `distance` int(11) NOT NULL DEFAULT 0 COMMENT 'PON端口至ONU的距离',
  PRIMARY KEY (`id`),
  KEY (`password`),
  KEY (`time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `light_distance_list`
--

LOCK TABLES `light_distance_list` WRITE;
/*!40000 ALTER TABLE `light_distance_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `light_distance_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-05 10:40:38
