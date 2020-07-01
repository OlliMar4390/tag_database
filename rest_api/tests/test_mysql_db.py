#!/home/olli/miniconda3/envs/cgi/bin/python3
# -*- coding: utf-8 -*-

import db
import unittest


DB = 'tag_db'


class Test_MySQL_DB(unittest.TestCase):

    def setUp(self):
        self.mysql_db = db.MySQL_DB(DB)

    def tearDown(self):
        self.mysql_db.close_connection()

    def test_connection(self):
        # test the logging info when connecting

        with self.assertLogs('mysql', 'INFO') as logs:
            self.mysql_db.connection()
            self.mysql_db.close_connection()
            self.assertIn('INFO:mysql:Database connection closed.', logs.output)

    # test the responses of the MySQL database

    def test_get_data(self):
        dbs = self.mysql_db.get_data("SHOW DATABASES;")
        self.assertIn((DB,), dbs)

    def test_execute(self):
        response = self.mysql_db.execute("CREATE TEMPORARY TABLE test_table LIKE domains;")
        self.assertEqual(response, "0 rows affected.")

    def test_call_procedure(self):
        domains = self.mysql_db.call_procedure('sop_domains_getDomains')
        self.assertIsInstance(domains, tuple)
        self.assertNotEqual(len(domains), 0)

    def test_call_procedure_execute(self):
        response = self.mysql_db.call_procedure("sop_test_tags_addTag", ["tag1"], bexecute=True)
        self.assertEqual(response, "1 rows affected.")


class Test_Table(unittest.TestCase):
    # test the result of Table functions

    def test_shape(self):
        test_tuple_one_column = db.Table((("33",), ("a",), ("soie",), ("l",), ("ser",)))
        self.assertEqual(test_tuple_one_column.shape, [5, 1])

        test_tuple_two_columns = db.Table((("33", 8), ("a", 2), ("soie", 3), ("l", 1), ("ser", 9)))
        self.assertEqual(test_tuple_two_columns.shape, [5, 2])

        test_tuple_multidimensional = db.Table(((("33", 8), ("a", 2)), (("soie", 3), ("l", 1)), (("ser", 9),)))
        self.assertEqual(test_tuple_multidimensional.shape, [3, 2, 2])

    def test_flat_list(self):
        test_tuple_one_column = db.Table((("33",), ("a",), ("soie",), ("l",), ("ser",)))
        self.assertEqual(test_tuple_one_column.flat_list(), ("33", "a", "soie", "l", "ser"))

    def test_id_dict(self):
        test_id_dict = db.Table(((8, "33"), (2, "a"), (3, "soie"), (1, "l"), (9, "ser"))).id_dict()
        self.assertEqual(test_id_dict, {"33": 8, "a": 2, "soie": 3, "l": 1, "ser": 9})


class Test_Tag_DB(unittest.TestCase):

    def setUp(self):
        self.mysql_db = db.MySQL_DB(DB)
        self.tag_db = db.Tag_DB()

    def tearDown(self):
        self.mysql_db.close_connection()

    def flat_list_test(self, data):
        self.assertNotEqual(len(data), 0)

        # test whether flatten of the nested tuple works
        shape = data.shape
        self.assertNotEqual(len(shape), 1)
        data_flat_list = data.flat_list()
        self.assertNotEqual(len(data_flat_list), 1)
        shape = data_flat_list.shape
        self.assertEqual(len(shape), 1)

        # test whether fetched data contains strings
        self.assertIsInstance(data_flat_list[-1], str)

    def test_get_domains(self):
        # test whether something is fetched
        data = self.tag_db.get_domains()
        self.assertNotEqual(len(data), 0)

        # test whether converting nested tuple into id dictionary works
        id_dict = data.id_dict()
        first_key = next(iter(id_dict))
        self.assertIsInstance(first_key, str)
        self.assertIsInstance(id_dict[first_key], int)

    def test_get_tags_by_domain(self):
        # test whether something is fetched
        idx = self.mysql_db.get_data('SELECT IDDomain FROM domains LIMIT 1;')
        data = self.tag_db.get_tags_by_domain(idx[0][0])

        # test output
        self.flat_list_test(data)

    def test_get_tags(self):
        # test whether something is fetched
        data = self.tag_db.get_tags()

        # test output
        self.flat_list_test(data)

    def test_add_link(self):
        # create mock data
        domain = self.mysql_db.get_data('SELECT Domain FROM domains LIMIT 1;')
        json_obj = {'url': 'test.de', 'domain': domain, 'tags': ['tag1', 'tag2'],
                    'description': 'Description of the web page.'}

        # test output
        res = self.tag_db.add_link(json_obj, btest=True)
        self.assertEqual(len(res), 4)
        for r in res:
            self.assertEqual(r, '1 rows affected.')

        # test whether the data is actually in the database
        link = self.mysql_db.get_data('SELECT * FROM test_links LIMIT 1;')
        self.assertEqual(link, ((1, 1, 'test.de', 1),))

        tag = self.mysql_db.get_data('SELECT Tag FROM test_tags LIMIT 1;')
        self.assertEqual(tag, (('tag2',),))

        description = self.mysql_db.get_data('SELECT Description FROM test_descriptions LIMIT 1;')
        self.assertEqual(description, (('Description of the web page.',),))


if __name__ == '__main__':
    unittest.main()
