from httplib import OK
import unittest
from hamcrest import assert_that, is_, contains_string
from nose.plugins.attrib import attr
from nose.tools import istest
import requests
from testconfig import config


@attr(needs_server=True)
class ShareChallengeFeatureTest(unittest.TestCase):
    def setUp(self):
        self.response = requests.get('{0}/'.format(config['server_url']))

    @istest
    def server_responds_status_OK(self):
        assert_that(self.response.status_code, is_(OK))

    @istest
    def server_responds_html_content_type(self):
        assert_that(self.response.headers['content-type'], is_('text/html; charset=utf-8'))

    @istest
    def server_responds_expected_content(self):
        assert_that(self.response.text, contains_string('<a id="repository-link" href="https://github.com/ericminio/yose-python">'))

