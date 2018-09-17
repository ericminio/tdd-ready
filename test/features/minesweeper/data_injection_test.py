import unittest
from hamcrest import assert_that, is_
from nose.plugins.attrib import attr
from nose.tools import istest
import requests
from testconfig import config
from splinter import Browser

from selenium import webdriver

@attr(needs_server=True)
class PlayingTest(unittest.TestCase):

    def setUp(self):
        import logging
        selenium_logger = logging.getLogger('selenium.webdriver.remote.remote_connection')
        selenium_logger.setLevel(logging.WARNING)
        self.browser = webdriver.Firefox()
        self.addCleanup(self.browser.quit)
        self.browser.get(config['server_url'] + '/minesweeper')
        self.browser.execute_script('document.grid=[["empty", "bomb"]]')
        self.browser.execute_script('load()')

    @istest
    def can_detect_lost(self):                
        cell = self.browser.find_element_by_id('cell-1x2')
        cell.click()

        assert_that(cell.get_attribute('class'), is_('cell lost'))

    @istest
    def can_detect_safe(self):        
        cell = self.browser.find_element_by_id('cell-1x1')
        cell.click()

        assert_that(cell.get_attribute('class'), is_('cell safe surrounded-by-1'))

    @istest
    def displays_bomb_count(self):        
        cell = self.browser.find_element_by_id('cell-1x1')
        cell.click()

        assert_that(cell.text, is_('1'))
            
