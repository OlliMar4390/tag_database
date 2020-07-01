/* Create database, tables and dependencies. */


CREATE DATABASE tag_db DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tag_db`.`domains` (
  `IDDomain` 		INT(11) 	NOT NULL AUTO_INCREMENT,
  `Domain` 			CHAR(100) 	NOT NULL,
  PRIMARY KEY (`IDDomain`));

CREATE TABLE IF NOT EXISTS `tag_db`.`tags` (
  `IDTag` 			INT(11) 	NOT NULL AUTO_INCREMENT,
  `Tag` 			CHAR(120) 	NOT NULL,
  PRIMARY KEY (`IDTag`));

CREATE TABLE IF NOT EXISTS `tag_db`.`chronology` (
  `IDChronology` 	INT(11) 	NOT NULL AUTO_INCREMENT,
  `Chronology` 		CHAR(10) 	NOT NULL,
  PRIMARY KEY (`IDChronology`));

CREATE TABLE IF NOT EXISTS `tag_db`.`links` (
  `IDLink` 			INT(11) 	NOT NULL AUTO_INCREMENT,
  `ChronologyID` 	INT(11) 	NOT NULL,
  `Link` 			TEXT 		NOT NULL,
  `DomainID` 		INT(11) 	NOT NULL,
  PRIMARY KEY (`IDLink`),
  INDEX `fk_links_1_idx` (`ChronologyID` ASC),
  INDEX `fk_links_2_idx` (`DomainID` ASC),
  CONSTRAINT `fk_links_1`
    FOREIGN KEY (`ChronologyID`)
    REFERENCES `tag_db`.`chronology` (`IDChronology`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_links_2`
    FOREIGN KEY (`DomainID`)
    REFERENCES `tag_db`.`domains` (`IDDomain`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `tag_db`.`tagging` (
  `IDTagging` 		INT(11) 	NOT NULL AUTO_INCREMENT,
  `LinkID` 			INT(11) 	NOT NULL,
  `TagID` 			INT(11) 	NOT NULL,
  PRIMARY KEY (`IDTagging`),
  INDEX `fk_tagging_1_idx` (`LinkID` ASC),
  INDEX `fk_tagging_2_idx` (`TagID` ASC),
  CONSTRAINT `fk_tagging_1`
    FOREIGN KEY (`LinkID`)
    REFERENCES `tag_db`.`links` (`IDLink`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tagging_2`
    FOREIGN KEY (`TagID`)
    REFERENCES `tag_db`.`tags` (`IDTag`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `tag_db`.`descriptions` (
  `IDDescription` 	INT(11) 	NOT NULL AUTO_INCREMENT,
  `LinkID` 			INT(11) 	NOT NULL,
  `Description` 	TEXT 		NOT NULL,
  PRIMARY KEY (`IDDescription`),
  INDEX `fk_descriptions_1_idx` (`LinkID` ASC),
  CONSTRAINT `fk_descriptions_1`
   FOREIGN KEY (`LinkID`)
   REFERENCES `links` (`IDLink`)
   ON DELETE NO ACTION
   ON UPDATE NO ACTION);