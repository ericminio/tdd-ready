from behave import fixture, given, when, then, step
from hamcrest import *
from server.sql.postgres import Postgres

@given('Database is clean')
def clean_database(context):
    try:
        Postgres().execute('truncate table message;')
    except Exception, e:
        print e
        raise e


@given('Database is seeded with message "{content}"')
def seed_database(context, content):
    try:
        Postgres().execute('INSERT INTO message(content) values(%s);', (content,))
    except Exception, e:
        print e
        raise e

@when('I access the home page')
def request_decomposition(context):
    context.browser.get('http://localhost:' + str(context.server_port))

@then('I see the greetings "{expected}"')
def verify_greetings(context, expected):
    value = context.browser.find_element_by_id('message').text
    assert_that(value, equal_to(expected))

@then('I see no error')
def verify__no_error(context):
    value = context.browser.find_element_by_id('error').text
    assert_that(value, equal_to(''))
