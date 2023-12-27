-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bap
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Additional_Information`
--

DROP TABLE IF EXISTS `Additional_Information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Additional_Information` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nationality` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `audienceId` int DEFAULT NULL,
  `departmentId` int DEFAULT NULL,
  `occupationId` int DEFAULT NULL,
  `sexId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Additional_Information_userId_key` (`userId`),
  KEY `Additional_Information_audienceId_fkey` (`audienceId`),
  KEY `Additional_Information_sexId_fkey` (`sexId`),
  KEY `Additional_Information_occupationId_fkey` (`occupationId`),
  KEY `Additional_Information_departmentId_fkey` (`departmentId`),
  CONSTRAINT `Additional_Information_audienceId_fkey` FOREIGN KEY (`audienceId`) REFERENCES `AgeCategory` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Additional_Information_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Additional_Information_occupationId_fkey` FOREIGN KEY (`occupationId`) REFERENCES `Occupation` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Additional_Information_sexId_fkey` FOREIGN KEY (`sexId`) REFERENCES `Sex` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Additional_Information_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Additional_Information`
--

LOCK TABLES `Additional_Information` WRITE;
/*!40000 ALTER TABLE `Additional_Information` DISABLE KEYS */;
INSERT INTO `Additional_Information` VALUES (1,'j01z5rrinpz78mt','België',5,32,6,2),(2,'i8nftj6qhzbmwgw','België',4,3,3,2),(3,'kitjg4kzby4lx7m','België',3,40,6,3);
/*!40000 ALTER TABLE `Additional_Information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AgeCategory`
--

DROP TABLE IF EXISTS `AgeCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AgeCategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AgeCategory`
--

LOCK TABLES `AgeCategory` WRITE;
/*!40000 ALTER TABLE `AgeCategory` DISABLE KEYS */;
INSERT INTO `AgeCategory` VALUES (1,'iedereen'),(2,'jongeren (16-18)'),(3,'jongvolwassen (19-25)'),(4,'jonge volwassenen (26-35)'),(5,'middelbare volwassenen (36-50)'),(6,'oudere volwassenen (51-64)'),(7,'senioren (65-79)'),(8,'bejaarden (80-...)');
/*!40000 ALTER TABLE `AgeCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Department`
--

DROP TABLE IF EXISTS `Department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Department`
--

LOCK TABLES `Department` WRITE;
/*!40000 ALTER TABLE `Department` DISABLE KEYS */;
INSERT INTO `Department` VALUES (1,'Onderwijs'),(2,'Energie'),(3,'Informatietechnologie (IT)'),(4,'Gezondheidszorg'),(5,'Financiën'),(6,'Marketing'),(7,'Productie'),(8,'Detailhandel'),(9,'Overheid'),(10,'Kunst en Cultuur'),(11,'Wetenschap en Onderzoek'),(12,'Sport en Recreatie'),(13,'Toerisme en Gastvrijheid'),(14,'Transport en Logistiek'),(15,'Landbouw en Voeding'),(16,'Milieu en Duurzaamheid'),(17,'Mens en Maatschappij'),(18,'Juridisch'),(19,'Media en Communicatie'),(20,'Human Resources (HR)'),(21,'Bouw en Vastgoed'),(22,'Automobielindustrie'),(23,'Mode en Textiel'),(24,'Veiligheid en Defensie'),(25,'Psychologie en Welzijn'),(26,'Internationale Betrekkingen'),(27,'Ruimtevaart'),(28,'Telecommunicatie'),(29,'E-commerce'),(30,'Klantenservice'),(31,'Non-profit en Sociaal Werk'),(32,'Voedsel en Dranken'),(33,'Luchtvaart'),(34,'Cosmetica en Persoonlijke Verzorging'),(35,'Muziek en Entertainment'),(36,'Dier en Natuur'),(37,'Politiek'),(38,'Religie en Spiritualiteit'),(39,'Gaming'),(40,'Architectuur en Ontwerp'),(41,'Geografie en Cartografie'),(42,'Geschiedenis'),(43,'Linguïstiek en Talen'),(44,'Fotografie en Videografie');
/*!40000 ALTER TABLE `Department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Enquete`
--

DROP TABLE IF EXISTS `Enquete`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Enquete` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `explanation` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `deadline` datetime(3) NOT NULL,
  `quota` int NOT NULL,
  `isVisible` tinyint(1) NOT NULL DEFAULT '1',
  `isPaid` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `audienceId` int DEFAULT NULL,
  `departmentId` int DEFAULT NULL,
  `isCreated` tinyint(1) NOT NULL DEFAULT '0',
  `occupationId` int DEFAULT NULL,
  `sexId` int DEFAULT NULL,
  `instituteId` int DEFAULT NULL,
  `nationality` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `respondents` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Enquete_userId_key` (`userId`),
  KEY `Enquete_audienceId_fkey` (`audienceId`),
  KEY `Enquete_sexId_fkey` (`sexId`),
  KEY `Enquete_occupationId_fkey` (`occupationId`),
  KEY `Enquete_departmentId_fkey` (`departmentId`),
  KEY `Enquete_instituteId_fkey` (`instituteId`),
  CONSTRAINT `Enquete_audienceId_fkey` FOREIGN KEY (`audienceId`) REFERENCES `AgeCategory` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Enquete_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Enquete_instituteId_fkey` FOREIGN KEY (`instituteId`) REFERENCES `Institute` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Enquete_occupationId_fkey` FOREIGN KEY (`occupationId`) REFERENCES `Occupation` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Enquete_sexId_fkey` FOREIGN KEY (`sexId`) REFERENCES `Sex` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Enquete_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Enquete`
--

LOCK TABLES `Enquete` WRITE;
/*!40000 ALTER TABLE `Enquete` DISABLE KEYS */;
/*!40000 ALTER TABLE `Enquete` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EnqueteAnswer`
--

DROP TABLE IF EXISTS `EnqueteAnswer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EnqueteAnswer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `questionId` int NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `response` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `enqueteId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `EnqueteAnswer_questionId_fkey` (`questionId`),
  KEY `EnqueteAnswer_userId_fkey` (`userId`),
  KEY `EnqueteAnswer_enqueteId_fkey` (`enqueteId`),
  CONSTRAINT `EnqueteAnswer_enqueteId_fkey` FOREIGN KEY (`enqueteId`) REFERENCES `Enquete` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `EnqueteAnswer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `EnqueteQuestion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `EnqueteAnswer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EnqueteAnswer`
--

LOCK TABLES `EnqueteAnswer` WRITE;
/*!40000 ALTER TABLE `EnqueteAnswer` DISABLE KEYS */;
/*!40000 ALTER TABLE `EnqueteAnswer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EnqueteOption`
--

DROP TABLE IF EXISTS `EnqueteOption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EnqueteOption` (
  `id` int NOT NULL AUTO_INCREMENT,
  `questionId` int NOT NULL,
  `text` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `EnqueteOption_questionId_fkey` (`questionId`),
  CONSTRAINT `EnqueteOption_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `EnqueteQuestion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EnqueteOption`
--

LOCK TABLES `EnqueteOption` WRITE;
/*!40000 ALTER TABLE `EnqueteOption` DISABLE KEYS */;
/*!40000 ALTER TABLE `EnqueteOption` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EnqueteQuestion`
--

DROP TABLE IF EXISTS `EnqueteQuestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EnqueteQuestion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `enqueteId` int NOT NULL,
  `text` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `EnqueteQuestion_enqueteId_fkey` (`enqueteId`),
  CONSTRAINT `EnqueteQuestion_enqueteId_fkey` FOREIGN KEY (`enqueteId`) REFERENCES `Enquete` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EnqueteQuestion`
--

LOCK TABLES `EnqueteQuestion` WRITE;
/*!40000 ALTER TABLE `EnqueteQuestion` DISABLE KEYS */;
/*!40000 ALTER TABLE `EnqueteQuestion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EnqueteResponse`
--

DROP TABLE IF EXISTS `EnqueteResponse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EnqueteResponse` (
  `id` int NOT NULL AUTO_INCREMENT,
  `enqueteId` int NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `endTime` datetime(3) DEFAULT NULL,
  `startTime` datetime(3) DEFAULT NULL,
  `time` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `EnqueteResponse_enqueteId_fkey` (`enqueteId`),
  KEY `EnqueteResponse_userId_fkey` (`userId`),
  CONSTRAINT `EnqueteResponse_enqueteId_fkey` FOREIGN KEY (`enqueteId`) REFERENCES `Enquete` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `EnqueteResponse_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EnqueteResponse`
--

LOCK TABLES `EnqueteResponse` WRITE;
/*!40000 ALTER TABLE `EnqueteResponse` DISABLE KEYS */;
/*!40000 ALTER TABLE `EnqueteResponse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Institute`
--

DROP TABLE IF EXISTS `Institute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Institute` (
  `id` int NOT NULL AUTO_INCREMENT,
  `school` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Institute`
--

LOCK TABLES `Institute` WRITE;
/*!40000 ALTER TABLE `Institute` DISABLE KEYS */;
INSERT INTO `Institute` VALUES (1,'Arteveldehogeschool'),(2,'Ugent'),(3,'HOGENT'),(4,'KASK'),(5,'Odisee');
/*!40000 ALTER TABLE `Institute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Key`
--

DROP TABLE IF EXISTS `Key`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Key` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hashed_password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Key_id_key` (`id`),
  KEY `Key_user_id_idx` (`user_id`),
  CONSTRAINT `Key_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Key`
--

LOCK TABLES `Key` WRITE;
/*!40000 ALTER TABLE `Key` DISABLE KEYS */;
INSERT INTO `Key` VALUES ('email:admin@test.com','s2:ro5klkrfwy68duq2:884bf5866e1250084fe71c08847dd0b161729445a569b43b215ebe97a487b5abdf36bc4954ddc5d5c6ac11c9abd21f98f37165f8cc385c52e8e61d6cbf7e7e21','27p2cq3vi7vxgex'),('email:febe@test.com','s2:lwxk05a4i65cm7wl:00f88e4260dca74a16258d65364d72480b229c63fcfff4e6838956f0b8b6236d4ac56b32ca2d9a9e41d79266c1ca71e871110a6c6ba5d6c74a8a0ecbc27c2855','kitjg4kzby4lx7m'),('email:stef@test.com','s2:ol88sfs5n5dgwyn0:a2e13aa9148fb63ec2e4b7f3b5bb6163c9a77077d1207c27c53b4e5dce9928230cec46282d9c3655591c5587b6d089ca02b8256c5fb36b9586f363786fe3fbb3','i8nftj6qhzbmwgw'),('email:stefaan@test.com','s2:s7v5hy3sxrnjzigc:b9768046c8fa3820f7b2b69a45172c1e6eb885a10cb737f90b614580a3d6d781c600903c58e2c19a4dea6e452745b13c709bd0cdbd355ddbf7499dc278fb7004','j01z5rrinpz78mt');
/*!40000 ALTER TABLE `Key` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Occupation`
--

DROP TABLE IF EXISTS `Occupation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Occupation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `occupation` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Occupation`
--

LOCK TABLES `Occupation` WRITE;
/*!40000 ALTER TABLE `Occupation` DISABLE KEYS */;
INSERT INTO `Occupation` VALUES (1,'iedereen'),(2,'student'),(3,'werkstudent'),(4,'arbeider'),(5,'bediende'),(6,'zelfstandige'),(7,'werkloos'),(8,'gepensioneerd');
/*!40000 ALTER TABLE `Occupation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `points` int NOT NULL,
  `sponsorId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `rewardCategoryId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Product_sponsorId_fkey` (`sponsorId`),
  KEY `Product_rewardCategoryId_fkey` (`rewardCategoryId`),
  CONSTRAINT `Product_rewardCategoryId_fkey` FOREIGN KEY (`rewardCategoryId`) REFERENCES `RewardCategories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Product_sponsorId_fkey` FOREIGN KEY (`sponsorId`) REFERENCES `Sponsor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` VALUES (1,'Boulet Speciaal','Een snack die mij doet denken aan mijn kindertijd',20,1,'2023-12-26 13:59:45.039','2023-12-26 13:59:45.039',1),(2,'Semi-vegitarisch julientje','Een julientje zoals we het kennen, maar dan met kaaskrokketen in plaats van een viandel',30,1,'2023-12-26 14:17:46.279','2023-12-26 14:17:46.279',1);
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RewardCategories`
--

DROP TABLE IF EXISTS `RewardCategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RewardCategories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RewardCategories`
--

LOCK TABLES `RewardCategories` WRITE;
/*!40000 ALTER TABLE `RewardCategories` DISABLE KEYS */;
INSERT INTO `RewardCategories` VALUES (1,'Eten'),(2,'Drinken'),(3,'Diensten');
/*!40000 ALTER TABLE `RewardCategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Session`
--

DROP TABLE IF EXISTS `Session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Session` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active_expires` bigint NOT NULL,
  `idle_expires` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Session_id_key` (`id`),
  KEY `Session_user_id_idx` (`user_id`),
  CONSTRAINT `Session_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Session`
--

LOCK TABLES `Session` WRITE;
/*!40000 ALTER TABLE `Session` DISABLE KEYS */;
INSERT INTO `Session` VALUES ('ukdfjgcsd8mjh9nmgmedc8a0d7rz5eitf0vnutg1','i8nftj6qhzbmwgw',1703687951136,1704897551136);
/*!40000 ALTER TABLE `Session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sex`
--

DROP TABLE IF EXISTS `Sex`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sex` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sex` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sex`
--

LOCK TABLES `Sex` WRITE;
/*!40000 ALTER TABLE `Sex` DISABLE KEYS */;
INSERT INTO `Sex` VALUES (1,'iedereen'),(2,'man'),(3,'vrouw'),(4,'andere');
/*!40000 ALTER TABLE `Sex` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sponsor`
--

DROP TABLE IF EXISTS `Sponsor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sponsor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `ownerId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Sponsor_ownerId_key` (`ownerId`),
  CONSTRAINT `Sponsor_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sponsor`
--

LOCK TABLES `Sponsor` WRITE;
/*!40000 ALTER TABLE `Sponsor` DISABLE KEYS */;
INSERT INTO `Sponsor` VALUES (1,'Frituur Stefanos','Overpoortstraat 12','Gent','2023-12-26 13:42:24.958','2023-12-26 13:42:24.958','j01z5rrinpz78mt','https://www.facebook.com/p/Stefanos-Place-100063656286660/');
/*!40000 ALTER TABLE `Sponsor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `additional` tinyint(1) NOT NULL DEFAULT '0',
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `credits` int NOT NULL DEFAULT '0',
  `sponsor` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_id_key` (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('27p2cq3vi7vxgex','admin@test.com','Stef Verniers',1,1,0,0),('i8nftj6qhzbmwgw','stef@test.com','Stef Verniers',1,0,350,0),('j01z5rrinpz78mt','stefaan@test.com','Stefaan De Meyer',1,0,0,1),('kitjg4kzby4lx7m','febe@test.com','Febe Raes',1,0,290,0);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('036f1d87-1970-411c-8941-e8c563b222f0','19e2f10650406c194c061f909da30117b6be40bcc09f3eb31925306a19cecc6e','2023-12-26 06:36:08.421','20231226020638_',NULL,NULL,'2023-12-26 06:36:08.385',1),('1962162f-8c0b-4ac4-8d34-56763863312b','a5f907e7c10d86a78f31bc50f73545d539bdfdf6f734dc1ae6b00c37e37439d1','2023-12-26 06:36:03.106','20231202131553_',NULL,NULL,'2023-12-26 06:36:03.082',1),('1bbf4146-086d-46ee-8b37-bb3b7008f942','32883e3996200bdfde9096d56cd060fa6c56eafecc64028fed56d7745f9389e0','2023-12-26 06:36:03.717','20231202193340_auto_id',NULL,NULL,'2023-12-26 06:36:03.613',1),('2048765e-f4d6-4ecd-b90e-6c731e928632','f925a3883fd7b24373e21e4a184911273c919d8013045ba9c9fddc81b708cec7','2023-12-26 06:36:06.031','20231217135652_',NULL,NULL,'2023-12-26 06:36:05.865',1),('2754bec6-c7d7-4601-a4a2-bee7ca71d32e','c47f09b0f545537e90846969819fa927a6deb0ce90d34f55524606c841d6b119','2023-12-26 06:36:03.438','20231202171629_',NULL,NULL,'2023-12-26 06:36:03.162',1),('28c3ca95-e9e8-411d-a5c8-73f78fd84026','0613f293e194370c443df91fde006d99e257459d4394253b3c1eca34006a7b72','2023-12-26 06:36:08.643','20231226025059_',NULL,NULL,'2023-12-26 06:36:08.485',1),('2b186b29-c7de-465e-a2e2-c2d59e5cf92f','1470b8010f82d4593d1c1244dfc29eab775b46e5ed1398a8af3cce8f4c8a5d4a','2023-12-26 06:36:08.474','20231226024426_',NULL,NULL,'2023-12-26 06:36:08.431',1),('2f7e3f1f-c22b-46a6-9c97-86a594a9c05a','c25550b393d9e05250674226cfcf0eb46d2ea7466cc92bf565fcf3c6131683db','2023-12-26 06:36:06.666','20231218235722_',NULL,NULL,'2023-12-26 06:36:06.514',1),('360cd869-6acf-4e83-8fe0-000b22a321b7','b0cc0085db702d5b7d7684b7990fe8ed68f7eecdab829987d188e854a7e8a383','2023-12-26 14:35:58.482','20231226143558_fix_sponsor_constraint',NULL,NULL,'2023-12-26 14:35:58.366',1),('3f13db34-565c-45cc-8678-5cb0addcb46e','d55d3d7a4be47e3cf4adf45881eba6768b7e3f8302a870a3c4a393f05e60e7ac','2023-12-26 06:36:03.895','20231205202814_enquete',NULL,NULL,'2023-12-26 06:36:03.762',1),('5164a5cc-7888-4409-b8c5-eadf4de29faf','de9be522ca8776300dc74f23b960eb87b8ee343311200d7ca3c16132cbf37bf6','2023-12-26 06:36:03.605','20231202193046_additional_info',NULL,NULL,'2023-12-26 06:36:03.448',1),('5c504483-147c-4fc5-b0c5-1ca1d68f1369','f2bec0f11e7a5cdbcbcc9b42bb2beb75d238728da211f1a7af2f982a122f38c2','2023-12-26 06:36:06.192','20231217154053_',NULL,NULL,'2023-12-26 06:36:06.037',1),('601ac98d-c132-475b-ab96-d5b04f5018dc','b7e46142ca5500b6abb3dce2131a0d84070d4d2cba9e8b901cb1c8b544996d7e','2023-12-26 06:36:05.860','20231217134858_',NULL,NULL,'2023-12-26 06:36:05.008',1),('61ecc0fb-e8f6-4090-912b-ebb98b5a167e','66767ae35c785ec43efdcd6e472197b4fbc370dcf360a04931fea13c90f45a83','2023-12-26 06:36:03.146','20231202131847_add_info',NULL,NULL,'2023-12-26 06:36:03.113',1),('798e9a2e-a571-4b21-a685-7e0ad05176c9','f6a5421bf0bff41e2f9f1b9eb3c7075b97373a0039a1f164a20b6d6eda085ebd','2023-12-26 06:36:07.935','20231221143315_',NULL,NULL,'2023-12-26 06:36:07.715',1),('8eb08eab-1da9-4632-b82f-4538907a0743','e00abd24ef3ab2888b11a5f2de9552a309c0e5be34e822d630f0e470e9d6fe9e','2023-12-26 06:36:04.384','20231210110407_',NULL,NULL,'2023-12-26 06:36:04.106',1),('8f5b38b2-7d11-4ffb-b7a6-89944cccedb5','9ac907f9df211b81406995e30f12341c982ca0c4adec53a43115ffa11d134f4c','2023-12-26 06:36:08.213','20231224031048_',NULL,NULL,'2023-12-26 06:36:07.946',1),('a66129ea-2d47-44c9-a779-87d52a78cde9','18dbb4fa262b12a1881e571d30f7ec305c18bb6f757a5bdd411ce2de4b035d8d','2023-12-26 06:36:08.380','20231226003136_',NULL,NULL,'2023-12-26 06:36:08.220',1),('ac124a71-d64c-46ac-a13c-97d74c7e0515','fc1d0428ad070143d1950baae712f912e64cc55992fc26c2704fa270b12511dc','2023-12-26 06:36:03.756','20231203144249_unique_user_id',NULL,NULL,'2023-12-26 06:36:03.722',1),('b4ffcad0-010c-47f1-a88b-e3c49f071eaf','77d08d30bd8a20d47b349476ebf8a210df4442d4151820d93004faa91b2b1060','2023-12-26 06:36:07.709','20231221004605_',NULL,NULL,'2023-12-26 06:36:07.679',1),('b7e003ac-3c1a-49f3-add3-270e8fc713fd','524e8f9cc6f49dea2792ebc4ea1fc4bcfb929a735b57d8934a661f41d0c90f8a','2023-12-26 06:36:07.673','20231221002108_',NULL,NULL,'2023-12-26 06:36:07.432',1),('be751316-253f-465a-97c4-b1d02526daa9','d17fbe4d0852f7dcd70a63462666a0429d0373f4e11bd4ed8e05485cb56e2be0','2023-12-26 06:36:02.881','20231127203741_',NULL,NULL,'2023-12-26 06:36:02.574',1),('c3793e3f-4c63-4a57-a1ef-e10d8f3d82df','16797e2c630027e6a47bec1cd6cc6be3901fcb8e1a09b0017e996e5a65fddc96','2023-12-26 06:36:04.429','20231210144843_',NULL,NULL,'2023-12-26 06:36:04.391',1),('c7583a1c-167c-4bd1-92b5-5be3de6ba322','1eb27560e4900ac5af5457b2eb9354fd52bc94dd30acc06f73613c0f5ed2494e','2023-12-26 06:36:05.002','20231216142848_',NULL,NULL,'2023-12-26 06:36:04.475',1),('c8bc18e7-c700-4902-92ca-8bfceb16ecc7','cd311bfb13ab816d78209d5c5e42e35a59dbc056f3e641583089f2d9ec049ff5','2023-12-26 06:36:04.095','20231209131959_sponsors',NULL,NULL,'2023-12-26 06:36:03.902',1),('d1e899f0-d3c4-4a37-93c8-00690077b000','ead465ac140461014fb4621211cedb26b1f0119c738e65c19352c8b5c6e0d68f','2023-12-26 06:36:06.507','20231217220743_',NULL,NULL,'2023-12-26 06:36:06.200',1),('d3e8b36b-dbfa-4950-9bb5-41396919e93b','40519ca33a6c7b9b762e7b282a2c7b2a1a8b006b8b9da04124189d52f1f6f2bc','2023-12-26 06:36:03.075','20231202131409_',NULL,NULL,'2023-12-26 06:36:02.887',1),('d820f357-22d6-45dc-99af-6eefee4f11e5','82a2d06d261aefca17787922fa9a1a4c7433c381ad274fa8f5516751d0624e4d','2023-12-26 06:36:04.470','20231215213439_',NULL,NULL,'2023-12-26 06:36:04.437',1),('e0870e9c-5bc8-49e6-9bb2-940b555b8edb','3a63131f8f8715668c24d5709c2c4d2092f2541769e215566d904bd943b015bc','2023-12-26 06:36:07.295','20231219193601_',NULL,NULL,'2023-12-26 06:36:07.240',1),('e728f298-904e-4bb7-b5ab-ee5b8e4756dd','55061b7fa6915ae7e1b2279b49494c553aa0a64bdd7786c817b5176e9e2d1f25','2023-12-26 06:36:07.234','20231219190728_',NULL,NULL,'2023-12-26 06:36:06.672',1),('f0016b0a-49dd-4735-8ea9-1305f3cc62e7','37c203642e86ee4d4fafe385a7a7b96db1970dd9d7bc74762b9b25523f542940','2023-12-26 06:36:07.424','20231219195642_',NULL,NULL,'2023-12-26 06:36:07.306',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exchangedReward`
--

DROP TABLE IF EXISTS `exchangedReward`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exchangedReward` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `exchangedReward_userId_fkey` (`userId`),
  KEY `exchangedReward_productId_fkey` (`productId`),
  CONSTRAINT `exchangedReward_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `exchangedReward_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exchangedReward`
--

LOCK TABLES `exchangedReward` WRITE;
/*!40000 ALTER TABLE `exchangedReward` DISABLE KEYS */;
INSERT INTO `exchangedReward` VALUES (1,'i8nftj6qhzbmwgw',1,'2023-12-26 14:00:02.148','2023-12-26 14:00:02.148'),(5,'kitjg4kzby4lx7m',2,'2023-12-26 14:37:03.160','2023-12-26 14:37:03.160'),(6,'i8nftj6qhzbmwgw',2,'2023-12-26 14:39:13.750','2023-12-26 14:39:13.750');
/*!40000 ALTER TABLE `exchangedReward` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-27 14:31:03
