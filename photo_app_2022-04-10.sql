# ************************************************************
# Sequel Ace SQL dump
# Version 20031
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: localhost (MySQL 5.7.34)
# Database: photo_app
# Generation Time: 2022-04-10 16:43:27 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table albums
# ------------------------------------------------------------

DROP TABLE IF EXISTS `albums`;

CREATE TABLE `albums` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`user_id`),
  CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `albums` WRITE;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;

INSERT INTO `albums` (`id`, `title`, `user_id`)
VALUES
	(1,'My first album',1),
	(2,'Users album',2),
	(3,'My second album',1),
	(4,'Test album to see if it works',1),
	(5,'Semester 2022',6),
	(6,'Paris resan',8);

/*!40000 ALTER TABLE `albums` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table albums_photos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `albums_photos`;

CREATE TABLE `albums_photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `photo_id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `photo_id` (`photo_id`),
  KEY `album_id` (`album_id`),
  CONSTRAINT `albums_photos_ibfk_1` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`),
  CONSTRAINT `albums_photos_ibfk_2` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `albums_photos` WRITE;
/*!40000 ALTER TABLE `albums_photos` DISABLE KEYS */;

INSERT INTO `albums_photos` (`id`, `photo_id`, `album_id`)
VALUES
	(1,1,1);

/*!40000 ALTER TABLE `albums_photos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table photos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(500) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user` (`user_id`),
  CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;

INSERT INTO `photos` (`id`, `title`, `url`, `comment`, `user_id`)
VALUES
	(1,'An orange','http://www.unsplash.com/an-orange/','My first photo',1),
	(2,'just a nice picture','https://www.google.com','just a nice picture',1),
	(3,'A picture','http://www.google.com','I updated it now',1),
	(4,'Min födelsedag','https://unsplash.com/photos/BQrzI0vi9x0','En bild på tårtan som min dotter gjorde',6),
	(5,'Eiffeltornet','https://unsplash.com/photos/Q0-fOL2nqZc','En fin bild på Eiffeltornet',8);

/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`)
VALUES
	(1,'test@mail.com','$2b$10$pkVEuvmpmvx8sww90Q0FxORWHEiTVQ4nFn2le5Qi8yyRuteaJF6Ra','Test','Testsson'),
	(2,'user2@mail.com','$2b$10$XUbAxPzUYru7ndrR8sGjyenNhMm8vNMQEzqAE6RwKnqjGcfgkT1mu','User','Two'),
	(6,'anders@mail.se','$2b$10$U9V8JHWG6GN2VuooVIlL..Rw54nolJMAWyuI2V0x/tpZ5ZXnhIYEq','Anders','Svensson'),
	(7,'anna@mail.se','$2b$10$mnAd1XoptfC.k1zBjrEZsuNVgcq3i/10/oupNUScm7Gd8yRq0T8Y.','Anna','Olsson'),
	(8,'anna.olsson@mail.se','$2b$10$PbXVJYvuTu49N02fr4AXSuoXcoaGJEhOj9UgHweKR4w5bCJK.9X2C','Anna','Olsson');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
