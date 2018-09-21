from hamcrest import *
from httplib import OK
from flask import json
from server import app
from server.sql.postgres import Postgres

def test_hello_endpoint():
    Postgres().execute('truncate table message')
    Postgres().execute('INSERT INTO message(content) values(%s);', ('Hi!',))
    test_client = app.test_client()
    response = test_client.get('/hello')

    assert_that(response.status_code, is_(OK))
    assert_that(response.headers['content-type'], is_('application/json'))
    assert_that(json.loads(response.data), equal_to({ 'message':'Hi!' }))
