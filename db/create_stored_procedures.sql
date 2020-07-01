-- create stored procedures



USE `tag_db`;
DROP procedure IF EXISTS `sop_descriptions_addDescription`;

DELIMITER $$
USE `tag_db`$$
CREATE PROCEDURE `sop_descriptions_addDescription`(
	IN in_link INT,
	IN in_description TEXT)
BEGIN
	INSERT INTO tag_db.descriptions
		(LinkID, Description)
	VALUES
		(in_link,
		in_description);
END$$

DELIMITER ;


USE `tag_db`;
DROP procedure IF EXISTS `sop_domains_addDomain`;

DELIMITER $$
USE `tag_db`$$
CREATE PROCEDURE `sop_domains_addDomain`(
	IN in_domain CHAR(100))
BEGIN
	INSERT INTO tag_db.domains
		(Domain)
	Values
		(in_domain);
END$$

DELIMITER ;


USE `tag_db`;
DROP procedure IF EXISTS `sop_domains_getDomains`;

DELIMITER $$
USE `tag_db`$$
CREATE PROCEDURE `sop_domains_getDomains`()
BEGIN
	SELECT * FROM tag_db.domains;
END$$

DELIMITER ;


USE `tag_db`;
DROP procedure IF EXISTS `sop_links_addLink`;

DELIMITER $$
USE `tag_db`$$
CREATE PROCEDURE `sop_links_addLink`(
	IN in_link TEXT,
	IN in_domain CHAR(100),
	IN in_date CHAR(10))
BEGIN
	IF NOT EXISTS (SELECT Chronology FROM tag_db.chronology WHERE in_date = Chronology) THEN
		INSERT INTO tag_db.chronology
			(Chronology)
		VALUES
			(in_date);	
	END IF;

	IF NOT EXISTS (SELECT Link FROM tag_db.links WHERE in_link = Link) THEN
		INSERT INTO tag_db.links
			(ChronologyID, Link, DomainID)
		VALUES
			((SELECT IDChronology FROM tag_db.chronology WHERE Chronology = in_date),
			in_link,
			(SELECT IDDomain FROM tag_db.domains WHERE Domain = in_domain));
	END IF;
	SELECT LAST_INSERT_ID();
END$$

DELIMITER ;


USE `tag_db`;
DROP procedure IF EXISTS `sop_links_delLink`;

DELIMITER $$
USE `tag_db`$$
CREATE PROCEDURE `sop_links_delLink`(
	IN in_linkid INT)
BEGIN
	SET @Chronology = (SELECT ChronologyID
						 FROM tag_db.links
						WHERE IDLink = in_linkid);
	SELECT SQL_CALC_FOUND_ROWS IDLink FROM tag_db.links
	 WHERE ChronologyID = @Chronology;
	SET @ROWSCOUNT = (SELECT FOUND_ROWS());
	IF
		EXISTS (SELECT * FROM tag_db.chronology WHERE IDChronology= @ChronologyID)
		AND @ROWSCOUNT = 1
	THEN
		DELETE FROM tag_db.chronology WHERE IDChronology= @ChronologyID;
	END IF;
	SET @Safe_updating = (SELECT @@sql_safe_updates);
	IF @Safe_updating = 1 THEN
		SET SQL_SAFE_UPDATES = 0;
	END IF;
	IF EXISTS (SELECT * FROM tag_db.tagging WHERE LinkID = in_linkid) THEN
		DELETE FROM tag_db.tagging WHERE LinkID = in_linkid;
	END IF;
	IF EXISTS (SELECT * FROM tag_db.descriptions WHERE LinkID = in_linkid) THEN
		DELETE FROM tag_db.descriptions WHERE LinkID = in_linkid;
	END IF;
	DELETE FROM tag_db.links WHERE IDLink = in_linkid;
	IF @Safe_updating = 1 THEN
		SET SQL_SAFE_UPDATES = 1;
	END IF;
END$$

DELIMITER ;


USE `tag_db`;
DROP procedure IF EXISTS `sop_links_getTag_byDomain`;

DELIMITER $$
USE `tag_db`$$
CREATE PROCEDURE `sop_links_getTag_byDomain`(IN in_domainid INT)
BEGIN
	SELECT DISTINCT Tag FROM tags
	  JOIN tagging ON TagID = IDTag
	  JOIN links ON LinkID = IDLink 
	  JOIN domains ON DomainID = IDDomain 
	 WHERE DomainID = in_domainid
	 ORDER BY Tag;
END$$

DELIMITER ;


USE `tag_db`;
DROP procedure IF EXISTS `sop_tagging_linkTagToLink`;

DELIMITER $$
USE `tag_db`$$
CREATE PROCEDURE `sop_tagging_linkTagToLink`(
	IN in_link INT,
	IN in_tags TEXT)
BEGIN
	IF NOT EXISTS (SELECT Tag FROM tag_db.tags WHERE Tag = in_tags) THEN
		CALL sop_tags_addTag(in_tags);
	END IF;
	INSERT INTO tag_db.tagging
		(LinkID, TagID)
	VALUES
		(in_link,
		(SELECT IDTag FROM tag_db.tags WHERE Tag = in_tags));
END$$

DELIMITER ;


USE `tag_db`;
DROP procedure IF EXISTS `sop_tags_addTag`;

DELIMITER $$
USE `tag_db`$$
CREATE PROCEDURE `sop_tags_addTag`(
	IN in_tags CHAR(120))
BEGIN
	INSERT INTO tag_db.tags
		(Tag)
	VALUES
		(in_tags);
END$$

DELIMITER ;


USE `tag_db`;
DROP procedure IF EXISTS `sop_tags_getTags`;

DELIMITER $$
USE `tag_db`$$
CREATE PROCEDURE `sop_tags_getTags`()
BEGIN
SELECT Tag FROM tag_db.tags;
END$$

DELIMITER ;


USE `tag_db`;
DROP procedure IF EXISTS `sop_test_descriptions_addDescription`;

DELIMITER $$
USE `tag_db`$$
CREATE PROCEDURE `sop_test_descriptions_addDescription`(
	IN in_link INT,
	IN in_description TEXT)
BEGIN
	DROP TABLE IF EXISTS test_descriptions;
	CREATE TABLE test_descriptions LIKE descriptions;
	INSERT INTO tag_db.test_descriptions
		(LinkID, Description)
	VALUES
		(in_link,
		in_description);
END$$

DELIMITER ;


USE `tag_db`;
DROP procedure IF EXISTS `sop_test_links_addLink`;

DELIMITER $$
USE `tag_db`$$
CREATE PROCEDURE `sop_test_links_addLink`(
	IN in_link TEXT,
	IN in_domain CHAR(100),
	IN in_date CHAR(10))
BEGIN
	DROP TABLE IF EXISTS test_links;
	DROP TABLE IF EXISTS test_chronology;
	CREATE TABLE test_links LIKE links;
	CREATE TABLE test_chronology LIKE chronology;
	IF NOT EXISTS (SELECT Chronology FROM tag_db.test_chronology WHERE in_date = Chronology) THEN
		INSERT INTO tag_db.test_chronology
			(Chronology)
		VALUES
			(in_date);	
	END IF;

	IF NOT EXISTS (SELECT Link FROM tag_db.test_links WHERE in_link = Link) THEN
		INSERT INTO tag_db.test_links
			(ChronologyID, Link, DomainID)
		VALUES
			((SELECT IDChronology FROM tag_db.test_chronology WHERE Chronology = in_date),
			in_link,
			(SELECT IDDomain FROM tag_db.domains WHERE Domain = in_domain));
	END IF;
	SELECT LAST_INSERT_ID();
END$$

DELIMITER ;


USE `tag_db`;
DROP procedure IF EXISTS `sop_test_tagging_linkTagToLink`;

DELIMITER $$
USE `tag_db`$$
CREATE PROCEDURE `sop_test_tagging_linkTagToLink`(
	IN in_link INT,
	IN in_tags TEXT)
BEGIN
	DROP TABLE IF EXISTS test_tagging;
	DROP TABLE IF EXISTS test_tags;
	CREATE TABLE test_tagging LIKE tagging;
	CREATE TABLE test_tags LIKE tags;
	IF NOT EXISTS (SELECT Tag FROM tag_db.test_tags WHERE Tag = in_tags) THEN
	INSERT INTO tag_db.test_tags
		(Tag)
	VALUES
		(in_tags);
	END IF;
	INSERT INTO tag_db.test_tagging
		(LinkID, TagID)
	VALUES
		(in_link,
		(SELECT IDTag FROM tag_db.test_tags WHERE Tag = in_tags));
END$$

DELIMITER ;


USE `tag_db`;
DROP procedure IF EXISTS `sop_test_tags_addTag`;

DELIMITER $$
USE `tag_db`$$
CREATE PROCEDURE `sop_test_tags_addTag`(IN in_tags CHAR(120))
BEGIN
	DROP TABLE IF EXISTS test_tags;
	CREATE TABLE test_tags LIKE tags;
	INSERT INTO tag_db.test_tags
		(Tag)
	VALUES
		(in_tags);
END$$

DELIMITER ;