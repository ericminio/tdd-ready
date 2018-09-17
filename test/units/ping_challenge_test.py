from httplib import OK
import unittest
from flask import json
from hamcrest import assert_that, is_
from nose.tools import istest
from yose import app


class PingChallengeTest(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        test_client = app.test_client()
        self.response = test_client.get('/ping')

    @istest
    def server_responds_status_OK(self):
        assert_that(self.response.status_code, is_(OK))

    @istest
    def server_responds_json_content_type(self):
        assert_that(self.response.headers['content-type'], is_('application/json'))

    @istest
    def server_says_its_alive(self):
        data = json.loads(self.response.data)
        assert_that(data['alive'], is_(True))