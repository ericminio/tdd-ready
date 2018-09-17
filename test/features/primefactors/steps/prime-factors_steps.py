from behave import fixture, given, when, then, step
import json

@when('we look for the prime factors of {number:d}')
def request_decomposition(context, number):    
    context.browser.get('http://localhost:5000/primeFactors?number=' + str(number))

@then('we see the answer is {expected}')
def verify_result(context, expected):
    answer = json.loads(context.browser.find_element_by_id('json').text)
    assert answer['decomposition'] == [2, 2, 2, 2]