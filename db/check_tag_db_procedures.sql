/* Values for testing
 https://www.tagesspiegel.de/politik/1
 Asien_Australien
 "Hongkong", "China"
*/

/* Prepare the database by inserting main domains*/
INSERT INTO tag_db.domains
	(Domain)
VALUES
	("Afrika"),
    ("Amerka"),
    ("Asien_Australien"),
    ("Berlin"),
    ("Dtl"),
    ("Europa"),
    ("Sonstiges"),
    ("Weltweit");


/* Test Procedures*/

CALL tag_db.sop_links_addLink(
	"https://www.tagesspiegel.de/politik/1",
    "Asien_Australien",
    "2020-02-20");

/* Here tag_db.sop_tags_addTag is also tested*/
CALL tag_db.sop_tagging_linkTagToLink(
	1, "Hongkong");
CALL tag_db.sop_tagging_linkTagToLink(
	1, "China");

CALL tag_db.sop_descriptions_addDescription(
	1, "Beschreibung");

CALL tag_db.sop_domains_getDomains();

CALL tag_db.sop_links_getTag_byDomain(3);

/* Test test procedures */

CALL tag_db.sop_test_links_addLink(
	"https://www.tagesspiegel.de/politik/1",
    "Asien_Australien",
    "2020-02-20");

CALL tag_db.sop_test_tagging_linkTagToLink(
	1, "Hongkong");
CALL tag_db.sop_test_tagging_linkTagToLink(
	1, "China");

CALL tag_db.sop_test_descriptions_addDescription(
	1, "Beschreibung");

CALL tag_db.sop_test_tags_addTag("Kultur");