from hamcrest import *
from httplib import OK
from server import app

def test_hello_endpoint():
    test_client = app.test_client()
    response = test_client.get('/')

    assert_that(response.status_code, is_(OK))
