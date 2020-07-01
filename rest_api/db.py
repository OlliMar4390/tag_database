#!/home/olli/miniconda3/envs/cgi/bin/python3
# -*- coding: utf-8 -*-

import pymysql
import configparser
import logging
import sys
import datetime

config = configparser.ConfigParser()
config.read('config.ini')

logger = logging.getLogger('mysql')
logger.level = logging.INFO


class MySQL_DB:

	def __init__(self, db):
		self.conn = None
		self.db = db
	
	# connection related methods

	def connection(self):
		try:
			if self.conn is None:
				self.conn = pymysql.connect(
					config['default']['DATABASE_HOST'],
					db= self.db,
					user= config['default']['DATABASE_USERNAME'],
					passwd= config['default']['DATABASE_PASSWORD'],
					connect_timeout=5
					)
		except pymysql.MySQLError as e:
			logging.error(e)
			sys.exit()
		finally:
			logging.info('Connection opened successfully.')

	def close_connection(self):
		if self.conn:
			self.conn.close()
			self.conn = None
			logger.info('Database connection closed.')

	# different ways of interaction with mysql

	def _get_data(self, cur, query):
		cur.execute(query)
		return cur.fetchall()

	def _execute(self, cur, query):
		cur.execute(query)
		if 'SELECT @' in query:
			return cur.fetchall()
		else:
			self.conn.commit()
			return f'{cur.rowcount} rows affected.'

	def _call_procedure(self, cur, proc_name, arguments=None, conn=None):
		if arguments:
			cur.callproc(proc_name, arguments)
		else:
			cur.callproc(proc_name)
		if conn:
			self.conn.commit()
			response = cur.fetchall()
			if response:
				return response, f'{cur.rowcount} rows affected.'
			else:
				return f'{cur.rowcount} rows affected.'
		else:
			return cur.fetchall()

	# interact with mysql

	def run_query(self, query, query_type='get', arguments=None, bexecute=False, btable=True):
		"""Execute SQL query."""
		try:
			self.connection()
			with self.conn.cursor() if btable else self.conn.cursor(pymysql.cursors.DictCursor) as cur:
				if query_type == 'get':
					return self._get_data(cur, query)
				elif query_type == 'ex':
					return self._execute(cur, query)
				else:
					if bexecute:
						return self._call_procedure(cur, query, arguments, self.conn)
					else:
						return self._call_procedure(cur, query, arguments)

		except pymysql.MySQLError as e:
			logging.error(e)
		finally:
			if self.conn:
				self.conn.close()
				self.conn = None
				logging.info('Database connection closed.')

	# provide concise, intelligible methods to interact with mysql

	def get_data(self, query):
		return self.run_query(query)

	def execute(self, query):
		return self.run_query(query, 'ex')

	def call_procedure(self, proc_name, arguments=None, bexecute=False, btable=True):
		return self.run_query(proc_name, '', arguments, bexecute, btable)


class Table(tuple):
	""" process the mysql data """

	def __init__(self, table):
		self.table = table
		self.shape = self.get_shape(self.table)

	def get_shape(self, array):
		""" returns the shape of a list or tuple based on
			the number of elements and on
			the number of elements of the first element
			if the ladder is also a tuple or list
		"""
		return [len(array)] + self.get_shape(array[0]) if isinstance(array, list) or isinstance(array, tuple) else []

	def flat_list(self):
		""" mysql tables with one column wrap their elements in row tuples
			flattens such tables
			input data should not be ragged
		"""
		if len(self.shape) > 1:
			flat_array = [x for xs in self.table for x in xs]
			return Table(flat_array)
		else:
			return self.table

	def id_dict(self):
		""" converts a table to a dictionary mapping the data to the ids
			the id column should be the first column
		"""
		if len(self.shape) == 2 and self.shape[1] == 2:
			return {datum: idx for idx, datum in self.table}
		else:
			if len(self.shape) == 1 or self.shape[1] == 1:
				return {'Error': 'Data array has only one dimension.'}
			elif len(self.shape) > 2:
				return {'Error': 'Data array has more than two dimensions.'}
			else:
				return {'Error': 'Data array is probably ragged.'}


class Tag_DB:
	def __init__(self):
		self.db = 'tag_db'

		self.proc_get_dom = 'sop_domains_getDomains'
		self.proc_get_tags_by_dom = 'sop_links_getTag_byDomain'
		self.proc_add_link = 'sop_links_addLink'
		self.proc_link_tag_link = 'sop_tagging_linkTagToLink'
		self.proc_add_description = 'sop_descriptions_addDescription'
		self.proc_get_tags = 'sop_tags_getTags'

	def test_proc(self, proc_name):
		return proc_name.replace('sop_', 'sop_test_')

	def get_domains(self):
		return Table(MySQL_DB(self.db).call_procedure(self.proc_get_dom))

	def get_tags_by_domain(self, idx):
		return Table(MySQL_DB(self.db).call_procedure(self.proc_get_tags_by_dom, [idx]))

	def get_tags(self):
		return Table(MySQL_DB(self.db).call_procedure(self.proc_get_tags))

	def add_link(self, json_obj, btest=False):
		link = json_obj['url']
		domain = json_obj['domain']
		tags = json_obj['tags']
		description = json_obj['description']
		date =  datetime.datetime.now().strftime('%Y-%m-%d')

		if btest:
			self.proc_add_link = self.test_proc(self.proc_add_link)
			self.proc_link_tag_link = self.test_proc(self.proc_link_tag_link)
			self.proc_add_description = self.test_proc(self.proc_add_description)

		linkid, aff_rows = MySQL_DB(self.db).call_procedure(
			self.proc_add_link, [link, domain, date], bexecute=True)

		mysql_response = [aff_rows]

		for tag in tags:
			mysql_response.append(
				MySQL_DB(self.db).call_procedure(
					self.proc_link_tag_link, [linkid, tag], bexecute=True))

		if description:
			mysql_response.append(
				MySQL_DB(self.db).call_procedure(
					self.proc_add_description, [linkid, description], bexecute=True))

		return mysql_response



