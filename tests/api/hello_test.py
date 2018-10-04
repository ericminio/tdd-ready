from hamcrest import *
from flask import json
from api import app

def test_hello_endpoint():
    test_client = app.test_client()
    response = test_client.get('/hello')

    assert_that(response.status_code, is_(200))
    assert_that(response.headers['content-type'], is_('application/json'))
    assert_that(json.loads(response.data), equal_to({ 'message':'Hello Vue' }))
