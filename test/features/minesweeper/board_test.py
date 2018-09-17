import unittest
from hamcrest import assert_that, is_
from nose.plugins.attrib import attr
from nose.tools import istest
import requests
from testconfig import config
from splinter import Browser

@attr(needs_server=True)
class BoardChallengeFeatureTest(unittest.TestCase):

    def setUp(self):
        import logging
        selenium_logger = logging.getLogger('selenium.webdriver.remote.remote_connection')
        selenium_logger.setLevel(logging.WARNING)

    @istest
    def has_expected_title(self):        
        with Browser('firefox', headless=True) as browser:
            browser.visit(config['server_url'] + '/minesweeper')
            assert_that(browser.is_element_present_by_xpath('//label[@id="title" and text()="Minesweeper"]', wait_time=1), is_(True))

    
    @istest
    def has_expected_grid(self):        
        with Browser('firefox', headless=True) as browser:
            browser.visit(config['server_url'] + '/minesweeper')
            assert_that(browser.is_element_present_by_css('#cell-1x1', wait_time=1), is_(True))
            assert_that(browser.is_element_present_by_css('#cell-1x2', wait_time=1), is_(True))
            assert_that(browser.is_element_present_by_css('#cell-8x8', wait_time=1), is_(True))