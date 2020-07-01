#!/home/olli/miniconda3/envs/cgi/bin/python3
# -*- coding: utf-8 -*-

import db
import json
from myproject import app, btest
import unittest

class Test_Flask(unittest.TestCase):

    def setUp(self):
        self.mysql_db = db.MySQL_DB('tag_db')
        app.config['TESTING'] = True
        self.app = app.test_client()

    def tearDown(self):
        self.mysql_db.close_connection()

    def get_data(self, path):
        return self.app.get(path)

    def post_data(self, path, data):
        return self.app.post(path, data=data, content_type='application/json')

    def fetching_test(self, path):
        # test whether something is fetched
        res = self.get_data(path)
        self.assertEqual(res.status_code, 200)
        return res

    def list_test(self, res):
        # test array output
        data = json.loads(res.data)
        self.assertNotEqual(len(data), 0)
        self.assertIsInstance(data[0], str)
        self.assertIsInstance(data[-1], str)

    def test_get_domains(self):
        # test whether something is fetched
        res = self.fetching_test('/api/domains')

        # test output
        data = json.loads(res.data)
        first_key = next(iter(data))
        self.assertIsInstance(first_key, str)
        self.assertIsInstance(data[first_key], int)

    def test_get_tags_by_domain(self):
        # test whether something is fetched
        idx = self.mysql_db.get_data('SELECT IDDomain FROM domains LIMIT 1;')
        data = self.fetching_test('/api/tags_per_domain/{}'.format(idx[0][0]))

        # test output
        self.list_test(data)

    def test_get_tags(self):
        # test whether something is fetched
        data = self.fetching_test('/api/tags')

        # test output
        self.list_test(data)

    def test_add_link(self):
        if not btest:
            self.tearDown()
            self.skipTest('Variable "btest" in myproject.py must be set to True.')

        # create mock data
        domain = self.mysql_db.get_data('SELECT Domain FROM domains LIMIT 1;')
        json_obj = {'url': 'test.de', 'domain': domain, 'tags': ['tag1', 'tag2'],
                    'description': 'Description of the web page.'}

        # test output

        res = self.post_data('/api/add_link', json.dumps(json_obj))
        self.assertEqual(res.status_code, 200)

        data = json.loads(res.data)
        self.assertEqual(len(data), 4)
        for d in data:
            self.assertEqual(d, '1 rows affected.')

        # test whether the data is actually in the database

        link = self.mysql_db.get_data('SELECT * FROM test_links LIMIT 1;')
        self.assertEqual(link, ((1, 1, 'test.de', 1),))

        tag = self.mysql_db.get_data('SELECT Tag FROM test_tags LIMIT 1;')
        self.assertEqual(tag, (('tag2',),))

        description = self.mysql_db.get_data('SELECT Description FROM test_descriptions LIMIT 1;')
        self.assertEqual(description, (('Description of the web page.',),))

    def test_show_default_domain(self):
        # test whether something is fetched
        res = self.fetching_test('/api/default_domain')

        # test output
        data = json.loads(res.data)
        self.assertIsInstance(data, str)
        self.assertGreater(len(data), 0)


if __name__ == '__main__':
    unittest.main()
