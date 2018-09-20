from behave import fixture, given, when, then, step
from hamcrest import *

@given('Database is clean')
def clean_database(context):
    pass

@given('Database is seeded with message "{seed}"')
def seed_database(context, seed):
    pass

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
