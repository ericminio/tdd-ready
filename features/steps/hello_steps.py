from behave import fixture, given, when, then, step
from hamcrest import *
import os
import psycopg2

@given('Database is clean')
def clean_database(context):
    database = os.environ['PGDATABASE']
    user = os.environ['PGUSER']
    password = os.environ['PGPASSWORD']
    with psycopg2.connect(host='localhost',dbname=database, user=user, password=password) as connection:
        with connection.cursor() as cursor:
            try:
                cursor.execute('create table if not exists message(content varchar(50));')
                cursor.execute('TRUNCATE TABLE message;')
            except Exception, e:
                print e
                raise e


@given('Database is seeded with message "{content}"')
def seed_database(context, content):
    database = os.environ['PGDATABASE']
    user = os.environ['PGUSER']
    password = os.environ['PGPASSWORD']
    with psycopg2.connect(host='localhost',dbname=database, user=user, password=password) as connection:
        with connection.cursor() as cursor:
            try:
                cursor.execute('INSERT INTO message(content) values(%s);', (content,))
            except Exception, e:
                print e
                raise e

@when('I access the home page')
def request_decomposition(context):
    context.browser.get('http://localhost:5000')

@then('I see the greetings "{expected}"')
def verify_greetings(context, expected):
    value = context.browser.find_element_by_id('message').text
    assert_that(value, equal_to(expected))

@then('I see no error')
def verify__no_error(context):
    value = context.browser.find_element_by_id('error').text
    assert_that(value, equal_to(''))
