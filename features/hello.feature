Feature: Hello

    Background:
        Given Database is clean

    Scenario: display hello message
        Given Database is seeded with message "Hello world"
        When I access the home page
        Then I see no error
        Then I see the greetings "Hello world"
