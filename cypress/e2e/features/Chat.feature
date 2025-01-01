
Feature: Chat form to provide assistance to a user
 
  Background:
    Given the Home Page is opened
    And the user sees the Chat icon
 
#  Chat textbox
  Scenario: Open chat window
    When the user clicks on the chat button 
    Then the chat window is visible
    And the user can see an operator online
    And the user can see the textbox with the message "Write your message"

  Scenario: The user can send a message
	  Given the Home Page Chat is opened
	  When the user write a message in the given textbox
      And the user clicks on the send button
	  Then the user should see that the message was sent 
      And the user should see that a form is sent back

  Scenario: The user can send emojis
	  Given the Home Page Chat is opened
	  When the user clicks on the emoji button in the given textbox
      And the user chooses an emoji
      And the user clicks on the send button
	  Then the user should see that the emojis was sent 

  Scenario: The user can send attachments
	  Given the Home Page Chat is opened 
	  When the user clicks on the attachment button in the given textbox
      And the user chooses an attachment
    # And the user clicks on the send button
	  Then the user should see that the attachment was sent 

# Chat form
# Chat form name field
Scenario: The user can type a single letter in the name field from the chat form
	Given the Home Page Chat form name field is visible
	When the user clicks on the Name field
    And the user types a single letter in the form name field
	Then the user should see that the name is not validated
    And the user should see a warning message to type a correct name

Scenario: The user can type a single number in the name field from the chat form
	Given the Home Page Chat form name field is visible
	When the user clicks on the Name field
    And the user types a single number in the form name field
	Then the user should see that the name is not validated
    And the user should see a warning message to type a correct name 

Scenario: The user can type a special character in the name field from the chat form
	Given the Home Page Chat form name field is visible
	When the user clicks on the Name field
    And the user types a special character in the form name field
	Then the user should see that the name is not validated
    And the user should see a warning message to type a correct name 

Scenario: The user can type a space character in the name field from the chat form
	Given the Home Page Chat form name field is visible
	When the user clicks on the Name field
    And the user types a space character in the form name field
	Then the user should see that the name is not validated
    And the user should see a warning message to type a correct name 

Scenario: The user can type characters and numbers in the name field from the chat form
	Given the Home Page Chat form name field is visible
	When the user clicks on the Name field
    And the user types characters and numbers in the form name field
	Then the user should see that the name is not validated
    And the user should see a warning message to type a correct name 

Scenario: The user types a correct name in the name field from the chat form
	Given the Home Page Chat form name field is visible
	When the user clicks on the Name field
    And the user types a correct name in the form name field
	Then the user should see that the name is validated

# Chat form email field

Scenario: The user can type an email without @ in the email field from the chat form
	Given the Home Page Chat form email field is visible
	When the user clicks on the email field
    And the user types of an email without @ in the form email field
	Then the user should see that the email is not validated
    And the user should see a warning message to type a correct email address

Scenario: The user can type an email with @ and without domain name in the email field from the chat form
	Given the Home Page Chat form email field is visible
	When the user clicks on the email field
    And the user types of an email with @ and without domain name in the form email field
    Then the user should see that the email is not validated
    And the user should see a warning message to type a correct email address

Scenario: The user can type an email with @ and without domain name identifier in the email field from the chat form
	Given the Home Page Chat form email field is visible
	When the user clicks on the email field
    And the user types an email with @ and without domain name identifier in the form name field
    Then the user should see that the email is not validated
    And the user should see a warning message to type a correct email address

Scenario: The user can type a correct email in the email field from the chat form
	Given the Home Page Chat form email field is visible
	When the user clicks on the email field
    And the user types a correct email in the form name field
    Then the user should see that the email is validated

  # Chat form message field

Scenario: The user can type a message with less than 80 characters in the message field from the chat form
	Given the Home Page Chat form message field is visible
	When the user clicks on the message field
    And the user types a message with less than 80 characters in the form message field
	Then the user should see that the message is validated

Scenario: The user can type a message with more than 80 characters in the message field from the chat form
	Given the Home Page Chat form message field is visible
	When the user clicks on the message field
    And the user types a message with more than 80 characters in the form message field
	Then the user should see that the message is not validated

  
#Chat form submit button

Scenario: The user can submit the form after entering valid data in the form
	Given the Home Page Chat form is visible
	When the user enters valid data in the form
    And the user clicks on the submit button
	Then the user should see that the form was submitted

  #Chat exit button
  @focus
  Scenario: The user can close the chat by clicking on the exit button
	Given the Home Page Chat form is visible
	When the user clicks on the exit button from the chat
	Then the user should see that the chat is closed

