#!/home/olli/miniconda3/envs/cgi/bin/python3
# -*- coding: utf-8 -*-

from flask import Flask, jsonify, abort, request
from flask_cors import CORS
import json
from db import Tag_DB
import sys


app = Flask(__name__)
cors = CORS(app, resources={r'/api/*': {'origins': ['http://127.0.1.1', 'http://127.0.0.1:4200']}})

btest = False
if 'unittest' in sys.argv[0]:
    btest = True


@app.route('/api/domains', methods=['GET'])
def get_domains():
    """ fetch and map the domains to their ids """
    data = Tag_DB().get_domains().id_dict()
    return jsonify(data)


@app.route('/api/default_domain', methods=['GET'])
def show_default_domain():
    with open('options.json') as f:
        options = json.load(f)
    return jsonify(options['default_domain'])


@app.route('/api/tags_per_domain/<int:idx>', methods=['GET'])
def get_tags_by_domain(idx):
    """ return the tags filtered by domain using the domain id """
    data = Tag_DB().get_tags_by_domain(idx).flat_list()
    return jsonify(data)


@app.route('/api/tags', methods=['GET'])
def get_tags():
    """ return the all tags """
    data = Tag_DB().get_tags().flat_list()
    return jsonify(data)


@app.route('/api/add_link', methods=['POST'])
def add_link_and_tags():
    """ add the link, the domain, today's date,
        the tags and a description if available
    """
    if not request.json:
        abort(400)
    else:
        mysql_response = Tag_DB().add_link(request.json, btest)
    return jsonify(mysql_response)


@app.route('/sitemap')
def list_routes():
    """ list all routes of the app"""
    return jsonify(['%s' % rule for rule in app.url_map.iter_rules()])


if __name__ == '__main__':
    if len(sys.argv) == 2:
        if sys.argv[1] == "test":
            btest = True
    if btest:
        app.run(debug=True, port=8080)
    else:
        app.run()
