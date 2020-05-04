-- MySQL dump 10.16  Distrib 10.1.38-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: theressa
-- ------------------------------------------------------
-- Server version	10.1.38-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `resource`
--

DROP TABLE IF EXISTS `resource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `resource` varchar(30) COLLATE armscii8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resource`
--

LOCK TABLES `resource` WRITE;
/*!40000 ALTER TABLE `resource` DISABLE KEYS */;
INSERT INTO `resource` VALUES (1,'grocery'),(2,'health');
/*!40000 ALTER TABLE `resource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phnum` varchar(10) COLLATE armscii8_bin NOT NULL,
  `request` varchar(10) COLLATE armscii8_bin NOT NULL,
  `lat` varchar(40) COLLATE armscii8_bin NOT NULL,
  `lng` varchar(40) COLLATE armscii8_bin NOT NULL,
  `status` varchar(50) COLLATE armscii8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'9199999999','2','123.234','123.234','open'),(2,'9199999999','2','41.40338','2.17403','open'),(3,'9199999999','2','41.40338','2.17403','open'),(4,'9199999999','2','41.40338','2.17403','open'),(5,'9199999999','2','41.40338','2.17403','open'),(6,'9199999999','grocery','20.951665800000004','85.0985236','open'),(7,'9888888888','grocery','20.951665800000004','85.0985236','open'),(8,'9888888888','grocery','20.951665800000004','85.0985236','open'),(9,'8989898989','health','20.951665800000004','85.0985236','open'),(10,'8888777787','health','20.951665800000004','85.0985236','open'),(11,'8878787878','grocery','20.951665800000004','85.0985236','open'),(12,'7878787878','health','20.951665800000004','85.0985236','open'),(13,'7878787867','grocery','20.2880926','85.7487257','open'),(14,'7878787878','health','20.951665800000004','85.0985236','open'),(15,'7878787878','health','20.951665800000004','85.0985236','open'),(16,'7878787878','grocery','20.951665800000004','85.0985236','open'),(17,'7878787878','health','20.951665800000004','85.0985236','open'),(18,'7878787878','grocery','20.951665800000004','85.0985236','open'),(19,'7868575654','grocery','20.951665800000004','85.0985236','open'),(20,'2434343434','grocery','20.951665800000004','85.0985236','open'),(21,'7878827372','grocery','20.951665800000004','85.0985236','open'),(22,'7272727272','health','20.951665800000004','85.0985236','open'),(23,'8989898989','health','20.951665800000004','85.0985236','open');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-04 15:16:16
