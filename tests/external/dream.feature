Feature: Dreams

Scenario: will help you push the limits
    Given the inspiring quote:
        """
            Whatever your past has been
            You can decide what to do today
        """
    When I access the home page
    Then I see the greetings "You can decide what to do today"
