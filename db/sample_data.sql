-- MySQL dump 10.13  Distrib 5.7.30, for Linux (x86_64)
--
-- Host: localhost    Database: tag_db
-- ------------------------------------------------------
-- Server version	5.7.30-0ubuntu0.18.04.1

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
-- Dumping data for table `chronology`
--

LOCK TABLES `chronology` WRITE;
/*!40000 ALTER TABLE `chronology` DISABLE KEYS */;
INSERT INTO `chronology` VALUES (1,'2020-02-20'),(97,'2019-09-03'),(132,'2018-08-04'),(198,'2017-04-06'),(383,'2017-01-11'),(398,'2016-04-11'),(434,'12'),(521,'2018-11-13'),(536,'14'),(553,'2020-05-14'),(614,'2016-09-15'),(651,'2020-05-16'),(663,'2018-09-16'),(699,'2020-05-17'),(738,'2020-02-18'),(754,'2016-06-18'),(815,'2018-01-20'),(833,'2020-05-20'),(893,'2018-10-21'),(950,'2019-03-23'),(1067,'2018-06-26'),(1125,'2017-01-28'),(1174,'2018-04-29'),(1202,'3'),(1206,'2020-01-30'),(1335,'2020-05-27');
/*!40000 ALTER TABLE `chronology` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `descriptions`
--

LOCK TABLES `descriptions` WRITE;
/*!40000 ALTER TABLE `descriptions` DISABLE KEYS */;
INSERT INTO `descriptions` VALUES (4,6032,'Islam und der säkulare Staat'),(79,6293,'Französische Berufe aus dem Jahre 1292'),(112,6330,'Privilegien'),(318,6543,'Hyperloop in den USA erste Strecke geplant');
/*!40000 ALTER TABLE `descriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `domains`
--

LOCK TABLES `domains` WRITE;
/*!40000 ALTER TABLE `domains` DISABLE KEYS */;
INSERT INTO `domains` VALUES (1,'Afrika'),(2,'Amerka'),(3,'Asien_Australien'),(4,'Berlin'),(5,'Dtl'),(6,'Europa'),(7,'Sonstiges'),(8,'Weltweit');
/*!40000 ALTER TABLE `domains` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `links`
--

LOCK TABLES `links` WRITE;
/*!40000 ALTER TABLE `links` DISABLE KEYS */;
INSERT INTO `links` VALUES (669,198,'http://www.der-postillon.com/2017/04/giftgas-syrien.html',5),(885,1174,'http://www.sueddeutsche.de/muenchen/verkehr-s-bahn-muenchen-zuverlaessig-am-kunden-vorbei-1.3702631',5),(1066,893,'https://www.heise.de/newsticker/meldung/Bundesrat-bringt-Schadenersatz-bei-lahmen-Internet-ins-Spiel-4197502.html',5),(1088,521,'https://www.heise.de/newsticker/meldung/Intelligente-Videoueberwachung-von-Dieselfahrverboten-gefordert-4220092.html',5),(1236,950,'http://www.spiegel.de/wissenschaft/technik/plastikmuell-deutschland-recycelt-nur-5-6-prozent-des-abfalls-a-1248715.html',5),(1666,1206,'https://www.dw.com/en/germanys-corporate-battle-of-the-sexes/a-44087390',5),(1871,553,'https://www.tagesspiegel.de/wissen/risiken-und-nebenwirkungen-der-coronakrise-welche-gesundheitlichen-schaeden-der-lockdown-verursacht/25778410.html',5),(1877,651,'https://www.tagesspiegel.de/politik/kritik-an-spahns-digitalgesetz-gruene-fordern-mehr-patientenmitsprache/25833440.html',5),(1883,699,'https://www.tagesspiegel.de/politik/absage-an-steuererhoehungen-merz-will-nach-corona-krise-alle-staatlichen-leistungen-ueberpruefen/25836074.html',5),(1889,833,'https://www.tagesspiegel.de/politik/schmetterlinge-libellen-kaefer-besonders-bedroht-intensive-landwirtschaft-nimmt-immer-mehr-arten-den-lebensraum/25843482.html',5),(3471,815,'http://www.faz.net/aktuell/politik/trumps-praesidentschaft/donald-trump-wie-er-das-politische-system-amerikas-zerstoeren-will-15401042.html',2),(3625,738,'https://www.forbes.com/sites/chuckjones/2019/08/30/amid-trump-tariffs-farm-bankruptcies-and-suicides-rise/',2),(4021,434,'http://unioneuropeenne.blog.lemonde.fr/2014/01/27/christine-lagarde-saffiche-a-bruxelles/',6),(4050,536,'http://www.lemonde.fr/economie/article/2014/12/04/l-industrie-ferroviaire-appelle-l-etat-a-l-aide_4533911_3234.html',6),(4288,614,'https://www.euractiv.com/section/climate-environment/news/wednesday-special-report-investors-fear-next-financial-crisis-will-be-climate-related/',6),(4308,383,'http://www.euractiv.com/section/social-europe-jobs/news/finland-first-in-europe-to-take-basic-income-plunge/',6),(4565,663,'https://www.heise.de/newsticker/meldung/Urheberrechtsreform-Was-hat-das-EU-Parlament-tatsaechlich-beschlossen-4165818.html',6),(4763,97,'https://www.spiegel.de/wirtschaft/soziales/brexit-boris-johnson-riskiert-das-restvertrauen-der-eu-a-1283749.html',6),(5036,398,'http://www.euractiv.com/section/euro-finance/news/germany-and-us-wage-silent-war-over-greece/',8),(5334,1067,'https://www.nytimes.com/2018/06/24/business/trump-trade-war-cheese-exports.html',8),(6032,1202,'http://www.spiegel.de/spiegel/0,1518,751138,00.html',7),(6293,754,'http://www.vieuxmetiers.org/paris_1292.htm',7),(6330,1125,'https://brightside.me/article/what-you-should-think-about-before-you-judge-others-10155/',7),(6543,132,'https://www.golem.de/news/hyperloop-transportation-technologies-cupertino-will-den-hyperloop-1808-135827.html',7),(6973,1335,'https://www.tagesspiegel.de/wissen/zum-110-todestag-des-beruehmten-mediziners-die-zwielichtige-karriere-des-dr-robert-koch/25858566.html',5);
/*!40000 ALTER TABLE `links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tagging`
--

LOCK TABLES `tagging` WRITE;
/*!40000 ALTER TABLE `tagging` DISABLE KEYS */;
INSERT INTO `tagging` VALUES (175,885,205),(211,1066,446),(224,1088,85),(265,1236,884),(410,1666,336),(534,1871,187),(540,1883,187),(544,1889,884),(1040,3471,867),(1129,3625,867),(1238,4288,505),(1244,4308,392),(1345,4565,892),(1454,4763,156),(1548,5036,389),(1699,5334,867),(1827,6032,69),(2088,6293,742),(2125,6330,183),(2338,6543,69),(3413,669,576),(3629,885,865),(3810,1066,966),(3832,1088,865),(3980,1236,966),(4410,1666,966),(4615,1871,378),(4621,1877,378),(4627,1883,660),(4633,1889,966),(6215,3471,876),(6369,3625,876),(6765,4021,242),(6794,4050,333),(7032,4288,242),(7052,4308,309),(7309,4565,242),(7507,4763,157),(7780,5036,966),(8078,5334,404),(8775,6032,713),(9060,6543,843),(10444,6973,370);
/*!40000 ALTER TABLE `tagging` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (69,'Artikel'),(85,'Auto und Umwelt'),(156,'Brexit'),(157,'Britannien'),(183,'Comic'),(187,'Coronavirus'),(205,'Deutsche Bahn'),(242,'EU'),(309,'Finnland'),(333,'Frankreich'),(336,'Frauen'),(370,'Geschichtliches'),(378,'Gesundheitswesen'),(389,'Griechenland'),(392,'Grundeinkommen'),(404,'Handelskrieg'),(446,'Internet'),(505,'Klimawandel'),(576,'Medien'),(660,'Politiker & Parteien'),(713,'Religion'),(742,'Sammlung'),(843,'Technik'),(865,'Transportmittel'),(867,'Trump'),(876,'USA'),(884,'Umwelt'),(892,'Urheberrecht'),(966,'Wirtschaft');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-05 12:17:34
