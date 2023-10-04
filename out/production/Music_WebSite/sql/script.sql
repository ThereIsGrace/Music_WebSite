-- --------------------------------------------------------
-- 호스트:                          3.35.159.211
-- 서버 버전:                        10.3.38-MariaDB-0ubuntu0.20.04.1 - Ubuntu 20.04
-- 서버 OS:                        debian-linux-gnu
-- HeidiSQL 버전:                  12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- music 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `music` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `music`;

-- 테이블 music.board 구조 내보내기
CREATE TABLE IF NOT EXISTS `board` (
  `b_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `regidate` datetime(6) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `updatedate` datetime(6) DEFAULT NULL,
  `writer` varchar(255) NOT NULL,
  PRIMARY KEY (`b_id`)
) ENGINE=InnoDB AUTO_INCREMENT=697 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 music.board:~209 rows (대략적) 내보내기
DELETE FROM `board`;
INSERT INTO `board` (`b_id`, `content`, `regidate`, `title`, `updatedate`, `writer`) VALUES
	(1, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 15:21:10.616614', 'title1', '2023-08-19 15:21:10.616614', 'test01'),
	(2, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 15:21:10.666710', 'title2', '2023-08-19 15:21:10.666710', 'test02'),
	(3, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 15:21:10.673158', 'title3', '2023-08-19 15:21:10.673158', 'test02'),
	(4, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 15:21:10.679111', 'title4', '2023-08-19 15:21:10.679111', 'test03'),
	(5, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 15:21:10.685062', 'title5', '2023-08-19 15:21:10.685062', 'test04'),
	(6, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 15:21:10.690684', 'title5', '2023-08-19 15:21:10.690684', 'test04'),
	(7, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 15:21:10.696665', 'title5', '2023-08-19 15:21:10.696665', 'test04'),
	(8, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 15:21:10.702943', 'title5', '2023-08-19 15:21:10.702943', 'test04'),
	(9, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 15:21:10.709395', 'title5', '2023-08-19 15:21:10.709395', 'test04'),
	(10, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 15:21:10.715975', 'title5', '2023-08-19 15:21:10.715975', 'test04'),
	(11, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 15:21:10.722422', 'title5', '2023-08-19 15:21:10.722422', 'test04'),
	(12, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 15:21:10.728380', 'title5', '2023-08-19 15:21:10.728380', 'test04'),
	(13, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:15:59.868167', 'title1', '2023-08-19 16:15:59.868167', 'test01'),
	(14, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:15:59.960423', 'title2', '2023-08-19 16:15:59.960423', 'test02'),
	(15, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:15:59.966872', 'title3', '2023-08-19 16:15:59.966872', 'test02'),
	(16, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:15:59.974311', 'title4', '2023-08-19 16:15:59.974311', 'test03'),
	(17, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:15:59.984231', 'title5', '2023-08-19 16:15:59.984231', 'test04'),
	(18, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:15:59.994152', 'title5', '2023-08-19 16:15:59.994152', 'test04'),
	(19, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:16:00.001095', 'title5', '2023-08-19 16:16:00.001095', 'test04'),
	(20, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:16:00.011512', 'title5', '2023-08-19 16:16:00.011512', 'test04'),
	(21, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:16:00.025400', 'title5', '2023-08-19 16:16:00.025400', 'test04'),
	(22, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:16:00.031352', 'title5', '2023-08-19 16:16:00.031352', 'test04'),
	(23, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:16:00.046727', 'title5', '2023-08-19 16:16:00.046727', 'test04'),
	(24, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:16:00.062599', 'title5', '2023-08-19 16:16:00.062599', 'test04'),
	(25, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:30:20.613760', 'title1', '2023-08-19 16:30:20.613760', 'test01'),
	(26, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:30:20.699071', 'title2', '2023-08-19 16:30:20.699071', 'test02'),
	(27, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:30:20.708496', 'title3', '2023-08-19 16:30:20.708496', 'test02'),
	(28, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:30:20.714412', 'title4', '2023-08-19 16:30:20.714412', 'test03'),
	(29, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:30:20.720888', 'title5', '2023-08-19 16:30:20.720888', 'test04'),
	(30, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:30:20.726887', 'title5', '2023-08-19 16:30:20.726887', 'test04'),
	(31, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:30:20.732876', 'title5', '2023-08-19 16:30:20.732876', 'test04'),
	(32, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:30:20.738801', 'title5', '2023-08-19 16:30:20.738801', 'test04'),
	(33, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:30:20.745749', 'title5', '2023-08-19 16:30:20.745749', 'test04'),
	(34, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:30:20.752833', 'title5', '2023-08-19 16:30:20.752833', 'test04'),
	(35, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:30:20.759281', 'title5', '2023-08-19 16:30:20.759281', 'test04'),
	(36, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:30:20.766721', 'title5', '2023-08-19 16:30:20.766721', 'test04'),
	(37, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:45:46.983738', 'title1', '2023-08-19 16:45:46.983738', 'test01'),
	(38, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:45:47.075002', 'title2', '2023-08-19 16:45:47.075002', 'test02'),
	(39, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:45:47.084426', 'title3', '2023-08-19 16:45:47.084426', 'test02'),
	(40, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:45:47.090874', 'title4', '2023-08-19 16:45:47.090874', 'test03'),
	(41, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:45:47.097321', 'title5', '2023-08-19 16:45:47.097321', 'test04'),
	(42, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:45:47.111210', 'title5', '2023-08-19 16:45:47.111210', 'test04'),
	(43, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:45:47.118650', 'title5', '2023-08-19 16:45:47.118650', 'test04'),
	(44, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:45:47.125594', 'title5', '2023-08-19 16:45:47.125594', 'test04'),
	(45, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:45:47.135018', 'title5', '2023-08-19 16:45:47.135018', 'test04'),
	(46, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:45:47.150890', 'title5', '2023-08-19 16:45:47.150890', 'test04'),
	(47, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:45:47.156842', 'title5', '2023-08-19 16:45:47.156842', 'test04'),
	(48, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:45:47.163290', 'title5', '2023-08-19 16:45:47.163290', 'test04'),
	(49, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:47:19.212635', 'title1', '2023-08-19 16:47:19.212635', 'test01'),
	(50, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:47:19.272073', 'title2', '2023-08-19 16:47:19.272073', 'test02'),
	(51, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:47:19.278822', 'title3', '2023-08-19 16:47:19.278822', 'test02'),
	(52, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:47:19.285269', 'title4', '2023-08-19 16:47:19.285269', 'test03'),
	(53, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:47:19.291222', 'title5', '2023-08-19 16:47:19.291222', 'test04'),
	(54, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:47:19.298827', 'title5', '2023-08-19 16:47:19.298827', 'test04'),
	(55, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:47:19.304282', 'title5', '2023-08-19 16:47:19.304282', 'test04'),
	(56, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:47:19.310329', 'title5', '2023-08-19 16:47:19.310329', 'test04'),
	(57, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:47:19.317789', 'title5', '2023-08-19 16:47:19.317789', 'test04'),
	(58, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:47:19.323645', 'title5', '2023-08-19 16:47:19.323645', 'test04'),
	(59, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:47:19.331188', 'title5', '2023-08-19 16:47:19.331188', 'test04'),
	(60, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:47:19.338122', 'title5', '2023-08-19 16:47:19.338122', 'test04'),
	(61, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:47:43.627742', 'title1', '2023-08-19 16:47:43.627742', 'test01'),
	(62, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:47:43.695695', 'title2', '2023-08-19 16:47:43.695695', 'test02'),
	(63, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:47:43.713055', 'title3', '2023-08-19 16:47:43.713055', 'test02'),
	(64, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:47:43.728928', 'title4', '2023-08-19 16:47:43.728928', 'test03'),
	(65, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:47:43.739343', 'title5', '2023-08-19 16:47:43.739343', 'test04'),
	(66, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:47:43.745791', 'title5', '2023-08-19 16:47:43.745791', 'test04'),
	(67, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:47:43.753232', 'title5', '2023-08-19 16:47:43.753232', 'test04'),
	(68, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:47:43.764143', 'title5', '2023-08-19 16:47:43.764143', 'test04'),
	(69, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:47:43.771088', 'title5', '2023-08-19 16:47:43.771088', 'test04'),
	(70, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:47:43.777040', 'title5', '2023-08-19 16:47:43.777040', 'test04'),
	(71, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:47:43.783487', 'title5', '2023-08-19 16:47:43.783487', 'test04'),
	(72, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:47:43.794399', 'title5', '2023-08-19 16:47:43.794399', 'test04'),
	(73, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:57:46.199340', 'title1', '2023-08-19 16:57:46.199340', 'test01'),
	(74, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:57:46.249464', 'title2', '2023-08-19 16:57:46.249464', 'test02'),
	(75, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:57:46.261340', 'title3', '2023-08-19 16:57:46.261340', 'test02'),
	(76, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:57:46.276220', 'title4', '2023-08-19 16:57:46.276220', 'test03'),
	(77, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:57:46.282667', 'title5', '2023-08-19 16:57:46.282667', 'test04'),
	(78, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:57:46.288619', 'title5', '2023-08-19 16:57:46.288619', 'test04'),
	(79, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:57:46.296088', 'title5', '2023-08-19 16:57:46.296088', 'test04'),
	(80, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:57:46.303005', 'title5', '2023-08-19 16:57:46.303005', 'test04'),
	(81, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:57:46.310444', 'title5', '2023-08-19 16:57:46.310444', 'test04'),
	(82, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:57:46.317388', 'title5', '2023-08-19 16:57:46.317388', 'test04'),
	(83, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:57:46.324331', 'title5', '2023-08-19 16:57:46.324331', 'test04'),
	(84, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:57:46.330780', 'title5', '2023-08-19 16:57:46.330780', 'test04'),
	(85, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:59:11.694994', 'title1', '2023-08-19 16:59:11.694994', 'test01'),
	(86, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:59:11.914723', 'title2', '2023-08-19 16:59:11.914723', 'test02'),
	(87, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:59:11.923652', 'title3', '2023-08-19 16:59:11.923652', 'test02'),
	(88, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:59:11.929604', 'title4', '2023-08-19 16:59:11.929604', 'test03'),
	(89, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:59:11.941507', 'title5', '2023-08-19 16:59:11.941507', 'test04'),
	(90, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:59:11.948947', 'title5', '2023-08-19 16:59:11.948947', 'test04'),
	(91, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:59:11.956387', 'title5', '2023-08-19 16:59:11.956387', 'test04'),
	(92, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:59:11.965315', 'title5', '2023-08-19 16:59:11.965315', 'test04'),
	(93, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:59:11.972755', 'title5', '2023-08-19 16:59:11.972755', 'test04'),
	(94, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:59:11.980195', 'title5', '2023-08-19 16:59:11.980195', 'test04'),
	(95, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:59:11.986644', 'title5', '2023-08-19 16:59:11.986644', 'test04'),
	(96, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 16:59:11.992595', 'title5', '2023-08-19 16:59:11.992595', 'test04'),
	(97, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:02:05.948387', 'title1', '2023-08-19 17:02:05.948387', 'test01'),
	(98, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:02:06.002449', 'title2', '2023-08-19 17:02:06.002449', 'test02'),
	(99, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:02:06.009029', 'title3', '2023-08-19 17:02:06.009029', 'test02'),
	(100, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:02:06.015020', 'title4', '2023-08-19 17:02:06.015020', 'test03'),
	(101, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:02:06.021027', 'title5', '2023-08-19 17:02:06.021027', 'test04'),
	(102, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:02:06.027079', 'title5', '2023-08-19 17:02:06.027079', 'test04'),
	(103, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:02:06.032749', 'title5', '2023-08-19 17:02:06.032749', 'test04'),
	(104, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:02:06.039196', 'title5', '2023-08-19 17:02:06.039196', 'test04'),
	(105, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:02:06.051100', 'title5', '2023-08-19 17:02:06.051100', 'test04'),
	(106, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:02:06.059037', 'title5', '2023-08-19 17:02:06.059037', 'test04'),
	(107, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:02:06.067468', 'title5', '2023-08-19 17:02:06.067468', 'test04'),
	(108, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:02:06.073917', 'title5', '2023-08-19 17:02:06.073917', 'test04'),
	(109, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:57:11.225556', 'title1', '2023-08-19 17:57:11.225556', 'test01'),
	(110, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:57:11.289539', 'title2', '2023-08-19 17:57:11.289539', 'test02'),
	(111, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:57:11.295491', 'title3', '2023-08-19 17:57:11.295491', 'test02'),
	(112, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:57:11.301443', 'title4', '2023-08-19 17:57:11.301443', 'test03'),
	(113, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:57:11.307396', 'title5', '2023-08-19 17:57:11.307396', 'test04'),
	(114, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:57:11.315332', 'title5', '2023-08-19 17:57:11.315332', 'test04'),
	(115, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:57:11.324756', 'title5', '2023-08-19 17:57:11.324756', 'test04'),
	(116, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:57:11.334180', 'title5', '2023-08-19 17:57:11.334180', 'test04'),
	(117, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:57:11.341620', 'title5', '2023-08-19 17:57:11.341620', 'test04'),
	(118, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:57:11.348564', 'title5', '2023-08-19 17:57:11.348564', 'test04'),
	(119, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:57:11.355012', 'title5', '2023-08-19 17:57:11.355012', 'test04'),
	(120, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:57:11.361955', 'title5', '2023-08-19 17:57:11.361955', 'test04'),
	(121, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:57:31.397315', 'title1', '2023-08-19 17:57:31.397315', 'test01'),
	(122, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:57:31.457332', 'title2', '2023-08-19 17:57:31.457332', 'test02'),
	(123, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:57:31.463418', 'title3', '2023-08-19 17:57:31.463418', 'test02'),
	(124, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:57:31.469333', 'title4', '2023-08-19 17:57:31.469333', 'test03'),
	(125, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:57:31.475540', 'title5', '2023-08-19 17:57:31.475540', 'test04'),
	(126, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:57:31.481514', 'title5', '2023-08-19 17:57:31.481514', 'test04'),
	(127, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:57:31.487961', 'title5', '2023-08-19 17:57:31.487961', 'test04'),
	(128, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:57:31.494905', 'title5', '2023-08-19 17:57:31.494905', 'test04'),
	(129, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:57:31.501849', 'title5', '2023-08-19 17:57:31.501849', 'test04'),
	(130, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:57:31.507801', 'title5', '2023-08-19 17:57:31.507801', 'test04'),
	(131, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:57:31.514248', 'title5', '2023-08-19 17:57:31.514248', 'test04'),
	(132, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:57:31.520203', 'title5', '2023-08-19 17:57:31.520203', 'test04'),
	(133, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:59:02.051849', 'title1', '2023-08-19 17:59:02.051849', 'test01'),
	(134, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:59:02.122780', 'title2', '2023-08-19 17:59:02.122780', 'test02'),
	(135, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:59:02.129721', 'title3', '2023-08-19 17:59:02.129721', 'test02'),
	(136, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:59:02.136665', 'title4', '2023-08-19 17:59:02.136665', 'test03'),
	(137, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:59:02.145350', 'title5', '2023-08-19 17:59:02.145350', 'test04'),
	(138, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:59:02.152790', 'title5', '2023-08-19 17:59:02.152790', 'test04'),
	(139, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:59:02.162710', 'title5', '2023-08-19 17:59:02.162710', 'test04'),
	(140, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:59:02.169157', 'title5', '2023-08-19 17:59:02.169157', 'test04'),
	(141, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:59:02.177589', 'title5', '2023-08-19 17:59:02.177589', 'test04'),
	(142, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:59:02.183541', 'title5', '2023-08-19 17:59:02.183541', 'test04'),
	(143, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:59:02.190982', 'title5', '2023-08-19 17:59:02.190982', 'test04'),
	(144, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 17:59:02.197926', 'title5', '2023-08-19 17:59:02.197926', 'test04'),
	(145, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 18:00:08.646601', 'title1', '2023-08-19 18:00:08.646601', 'test01'),
	(146, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 18:00:08.703642', 'title2', '2023-08-19 18:00:08.703642', 'test02'),
	(147, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 18:00:08.710126', 'title3', '2023-08-19 18:00:08.710126', 'test02'),
	(148, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 18:00:08.716090', 'title4', '2023-08-19 18:00:08.716090', 'test03'),
	(149, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 18:00:08.722045', 'title5', '2023-08-19 18:00:08.722045', 'test04'),
	(150, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 18:00:08.728493', 'title5', '2023-08-19 18:00:08.728493', 'test04'),
	(151, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 18:00:08.734445', 'title5', '2023-08-19 18:00:08.734445', 'test04'),
	(152, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 18:00:08.740058', 'title5', '2023-08-19 18:00:08.740058', 'test04'),
	(153, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 18:00:08.746001', 'title5', '2023-08-19 18:00:08.746001', 'test04'),
	(154, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 18:00:08.752191', 'title5', '2023-08-19 18:00:08.752191', 'test04'),
	(155, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 18:00:08.759630', 'title5', '2023-08-19 18:00:08.759630', 'test04'),
	(156, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 18:00:08.766574', 'title5', '2023-08-19 18:00:08.766574', 'test04'),
	(157, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 18:01:39.679446', 'title1', '2023-08-19 18:01:39.679446', 'test01'),
	(158, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 18:01:39.758310', 'title2', '2023-08-19 18:01:39.758310', 'test02'),
	(159, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 18:01:39.764759', 'title3', '2023-08-19 18:01:39.764759', 'test02'),
	(160, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 18:01:39.770214', 'title4', '2023-08-19 18:01:39.770214', 'test03'),
	(161, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 18:01:39.776166', 'title5', '2023-08-19 18:01:39.776166', 'test04'),
	(162, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 18:01:39.783110', 'title5', '2023-08-19 18:01:39.783110', 'test04'),
	(163, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 18:01:39.790550', 'title5', '2023-08-19 18:01:39.790550', 'test04'),
	(164, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 18:01:39.796502', 'title5', '2023-08-19 18:01:39.796502', 'test04'),
	(165, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 18:01:39.802454', 'title5', '2023-08-19 18:01:39.802454', 'test04'),
	(166, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 18:01:39.808406', 'title5', '2023-08-19 18:01:39.808406', 'test04'),
	(167, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 18:01:39.814358', 'title5', '2023-08-19 18:01:39.814358', 'test04'),
	(168, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 18:01:39.820806', 'title5', '2023-08-19 18:01:39.820806', 'test04'),
	(169, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:08:33.629348', 'title1', '2023-08-19 19:08:33.629348', 'test01'),
	(170, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:08:33.728052', 'title2', '2023-08-19 19:08:33.728052', 'test02'),
	(171, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:08:33.734032', 'title3', '2023-08-19 19:08:33.734032', 'test02'),
	(172, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:08:33.740502', 'title4', '2023-08-19 19:08:33.740502', 'test03'),
	(173, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:08:33.745957', 'title5', '2023-08-19 19:08:33.745957', 'test04'),
	(174, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:08:33.752406', 'title5', '2023-08-19 19:08:33.752406', 'test04'),
	(175, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:08:33.758075', 'title5', '2023-08-19 19:08:33.758075', 'test04'),
	(176, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:08:33.763903', 'title5', '2023-08-19 19:08:33.763903', 'test04'),
	(177, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:08:33.770267', 'title5', '2023-08-19 19:08:33.770267', 'test04'),
	(178, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:08:33.777706', 'title5', '2023-08-19 19:08:33.777706', 'test04'),
	(179, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:08:33.784155', 'title5', '2023-08-19 19:08:33.784155', 'test04'),
	(180, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:08:33.790603', 'title5', '2023-08-19 19:08:33.790603', 'test04'),
	(181, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:18:06.875858', 'title1', '2023-08-19 19:18:06.875858', 'test01'),
	(182, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:18:06.938355', 'title2', '2023-08-19 19:18:06.938355', 'test02'),
	(183, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:18:06.944104', 'title3', '2023-08-19 19:18:06.944104', 'test02'),
	(184, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:18:06.949563', 'title4', '2023-08-19 19:18:06.949563', 'test03'),
	(185, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:18:06.955515', 'title5', '2023-08-19 19:18:06.955515', 'test04'),
	(186, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:18:06.962458', 'title5', '2023-08-19 19:18:06.962458', 'test04'),
	(187, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:18:06.969900', 'title5', '2023-08-19 19:18:06.969900', 'test04'),
	(188, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:18:06.976843', 'title5', '2023-08-19 19:18:06.976843', 'test04'),
	(189, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:18:06.987260', 'title5', '2023-08-19 19:18:06.987260', 'test04'),
	(190, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:18:06.993710', 'title5', '2023-08-19 19:18:06.993710', 'test04'),
	(191, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:18:07.000651', 'title5', '2023-08-19 19:18:07.000651', 'test04'),
	(192, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:18:07.007100', 'title5', '2023-08-19 19:18:07.007100', 'test04'),
	(193, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:18:53.430817', 'title1', '2023-08-19 19:18:53.430817', 'test01'),
	(194, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:18:53.510759', 'title2', '2023-08-19 19:18:53.510759', 'test02'),
	(195, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:18:53.517325', 'title3', '2023-08-19 19:18:53.517325', 'test02'),
	(196, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:18:53.523773', 'title4', '2023-08-19 19:18:53.523773', 'test03'),
	(197, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:18:53.531709', 'title5', '2023-08-19 19:18:53.531709', 'test04'),
	(198, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:18:53.536881', 'title5', '2023-08-19 19:18:53.536881', 'test04'),
	(199, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:18:53.542515', 'title5', '2023-08-19 19:18:53.542515', 'test04'),
	(200, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:18:53.548469', 'title5', '2023-08-19 19:18:53.548469', 'test04'),
	(201, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:18:53.554521', 'title5', '2023-08-19 19:18:53.554521', 'test04'),
	(202, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:18:53.560971', 'title5', '2023-08-19 19:18:53.560971', 'test04'),
	(203, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:18:53.567913', 'title5', '2023-08-19 19:18:53.567913', 'test04'),
	(204, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:18:53.574887', 'title5', '2023-08-19 19:18:53.574887', 'test04'),
	(205, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:19:06.868772', 'title1', '2023-08-19 19:19:06.868772', 'test01'),
	(206, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:19:06.928823', 'title2', '2023-08-19 19:19:06.928823', 'test02'),
	(207, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:19:06.935767', 'title3', '2023-08-19 19:19:06.935767', 'test02'),
	(208, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:19:06.942711', 'title4', '2023-08-19 19:19:06.942711', 'test03'),
	(209, '<h3>contentcontentcontentcontentcontentcontent</h3>', '2023-08-19 19:19:06.948663', 'title5', '2023-08-19 19:19:06.948663', 'test04');

-- 테이블 music.goods 구조 내보내기
CREATE TABLE IF NOT EXISTS `goods` (
  `goods_no` int(10) NOT NULL AUTO_INCREMENT,
  `category` varchar(100) NOT NULL,
  `pname` varchar(100) NOT NULL,
  `sellPrice` int(10) NOT NULL,
  `skintype` varchar(100) NOT NULL,
  `reg_date` datetime DEFAULT current_timestamp(),
  `update_date` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `stock` int(10) NOT NULL,
  `status` enum('1','2','3') NOT NULL COMMENT '1:판매중 2:재입고중 3:품절',
  `content` text DEFAULT NULL,
  `discountPrice` int(10) DEFAULT NULL,
  `originalPrice` int(10) DEFAULT NULL,
  `UUID` varchar(100) DEFAULT NULL,
  `imagepath` varchar(200) DEFAULT NULL,
  `option_list` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`goods_no`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 music.goods:~0 rows (대략적) 내보내기
DELETE FROM `goods`;

-- 테이블 music.reply 구조 내보내기
CREATE TABLE IF NOT EXISTS `reply` (
  `r_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `regidate` datetime(6) DEFAULT NULL,
  `updatedate` datetime(6) DEFAULT NULL,
  `b_id` bigint(20) DEFAULT NULL,
  `writer` int(11) DEFAULT NULL,
  PRIMARY KEY (`r_id`),
  KEY `FK98uryntifyrkjymy7ri77bfvx` (`b_id`),
  KEY `FKqiaj17lmbpsbcuxy0yyhyg6kg` (`writer`),
  CONSTRAINT `FK98uryntifyrkjymy7ri77bfvx` FOREIGN KEY (`b_id`) REFERENCES `board` (`b_id`),
  CONSTRAINT `FKqiaj17lmbpsbcuxy0yyhyg6kg` FOREIGN KEY (`writer`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 music.reply:~0 rows (대략적) 내보내기
DELETE FROM `reply`;

-- 테이블 music.reply_album 구조 내보내기
CREATE TABLE IF NOT EXISTS `reply_album` (
  `ra_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `album_id` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `regidate` datetime(6) DEFAULT NULL,
  `updatedate` datetime(6) DEFAULT NULL,
  `writer` int(11) DEFAULT NULL,
  PRIMARY KEY (`ra_id`),
  KEY `FKgdt98ytehngmfhpeimganco07` (`writer`),
  CONSTRAINT `FKgdt98ytehngmfhpeimganco07` FOREIGN KEY (`writer`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 music.reply_album:~0 rows (대략적) 내보내기
DELETE FROM `reply_album`;

-- 테이블 music.reply_song 구조 내보내기
CREATE TABLE IF NOT EXISTS `reply_song` (
  `rs_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `regidate` datetime(6) DEFAULT NULL,
  `updatedate` datetime(6) DEFAULT NULL,
  `song_id` bigint(20) DEFAULT NULL,
  `writer` int(11) DEFAULT NULL,
  PRIMARY KEY (`rs_id`),
  KEY `FKdoy1m7s9ei6uy1tbphvwfrgq5` (`song_id`),
  KEY `FKhdptf37nt4txokx95of75e7i8` (`writer`),
  CONSTRAINT `FK_USER_ID` FOREIGN KEY (`writer`) REFERENCES `user` (`id`),
  CONSTRAINT `FKdoy1m7s9ei6uy1tbphvwfrgq5` FOREIGN KEY (`song_id`) REFERENCES `song` (`song_id`),
  CONSTRAINT `FKhdptf37nt4txokx95of75e7i8` FOREIGN KEY (`writer`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 music.reply_song:~0 rows (대략적) 내보내기
DELETE FROM `reply_song`;

-- 테이블 music.song 구조 내보내기
CREATE TABLE IF NOT EXISTS `song` (
  `song_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `artist_name` varchar(100) DEFAULT NULL,
  `imagepath` varchar(100) DEFAULT NULL,
  `like_num` int(11) NOT NULL,
  `regidate` datetime(6) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`song_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 music.song:~0 rows (대략적) 내보내기
DELETE FROM `song`;

-- 테이블 music.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_date` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `provider_id` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 music.user:~2 rows (대략적) 내보내기
DELETE FROM `user`;
INSERT INTO `user` (`id`, `create_date`, `email`, `mobile`, `name`, `password`, `provider`, `provider_id`, `role`, `username`, `refresh_token`) VALUES
	(1, '2023-08-19 15:51:39.024000', 'audwldhks@naver.com', '01000000000', '테스터', '$2a$10$ymqhEfCgxRh4vCeBnnAB7u5gG3SQHPAxefcjABISmGTdI8GjUNps2', NULL, NULL, 'ROLE_USER', 'wldhks102', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZWZyZXNoVG9rZW4iLCJpZCI6MSwiZXhwIjoxNjkyNjAxMjE1LCJ1c2VybmFtZSI6IndsZGhrczEwMiJ9.ProaFHGtkR0euco2LX1PQMml05KhesuhfBlLPOOIiJMMEQKfBWECiknQYF6M8JGxAcEA_bpDYv550bPAFZaRlw'),
	(2, '2023-08-20 20:38:44.587000', NULL, NULL, NULL, '$2a$10$e495vgzudzBdL37HYLjtKenV7hHgyqMbvHZIaRFVsPX.dVnI2uuYi', 'naver', 'Wo-ekHpCKxwOLTJ6WEEMMxJ5A8HaFI57AxLXUp2xIKs', 'ROLE_USER', 'naver_Wo-ekHpCKxwOLTJ6WEEMMxJ5A8HaFI57AxLXUp2xIKs', NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
