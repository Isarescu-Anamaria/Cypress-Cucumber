Feature: A home page with navigation bar.User can navigate through more pages like Explore, Rooms, Contact and Book Now,can select a check-in,check-out dates,persons number and search for results.

Background:
	Given the Home page is opened
    #And a navigation bar

Scenario: The user hover over the Explore button
	Given the Home page Explore button from the navigation bar is displayed
	When the user hover over the Explore button from the navigation bar
	Then the user should see that the color of the Explore button should change to white

Scenario: The user hover over the Rooms button
	Given the Home page Rooms button from the navigation bar is displayed
	When the user hover over the Rooms button from the navigation bar
	Then the user should see that the color of the Rooms button should change to white

Scenario: The user hover over the Contact button
	Given the Home page Contact button from the navigation bar is displayed
	When the user hover over the Contact button from the navigation bar
	Then the user should see that the color of the Contact button should change to white

Scenario: The user hover over the Book Now button
	Given the Home page Book Now button from the navigation bar is displayed
	When the user hover over the Book Now button from the navigation bar
	Then the user should see that the color of the Book Now button should change to white

Scenario: The user clicks on the Explore button
	Given the Home page Explore button from the navigation bar is displayed
	When the user clicks on the Explore button from the navigation bar
	Then the user should see that the Explore page is loaded

Scenario: The user clicks on the Rooms button
	Given the Home page Rooms button from the navigation bar is displayed
	When the user clicks on the Rooms button from the navigation bar
	Then the user should see that the Rooms page is loaded

Scenario: The user clicks on the Contact button
	Given the Home page Contact button from the navigation bar is displayed
	When the user clicks on the Contact button from the navigation bar
	Then the user should see that the Contact page is loaded

Scenario: The user clicks on the Book Now button
	Given the Home page Book Now button from the navigation bar is displayed
	When the user clicks on the Book Now button from the navigation bar
	Then the user should see that the Book Now page is loaded


# Feature: A home page with a check in calendar.User can choose a check in date.

# Background:
# 	Given the Home page is opened

@focus
Scenario: The user clicks on the check in calendar
	Given the Home page Check in calendar button is displayed
	When the user clicks on the check in calendar button
	Then the user should see that check in calendar with the current month is displayed
	And current day highlighted should appear

Scenario: The user selects the current day in the check in calendar
	Given the Home page Check in calendar button is displayed
	When the user clicks on the check in calendar button
	And select the current day in the calendar
	Then the user should see that current day date is displayed 

Scenario: The user selects a future day in the check in calendar
	Given the Home page Check in calendar button is displayed
	When the user clicks on the check in calendar button
	And select a future day in the calendar
	Then the user should see that future day date is displayed 

Scenario: The user selects a past day in the check in calendar
	Given the Home page Check in calendar button is displayed
	When the user clicks on the check in calendar button
	And select a past day in the calendar
	Then the user should see that past date is not selected

Scenario: The user navigates to the previous month in the check in calendar
	Given the Home page Check in calendar button is displayed
	When the user clicks on the check in calendar button
	And clicks on the previous month button
	Then the user should see that the previous month is displayed

Scenario: The user navigates to the next month in the check in calendar
	Given the Home page Check in calendar button is displayed
	When the user clicks on the check in calendar button
	And clicks on the next month button
	Then the user should see that the next month is displayed

Scenario: The user closes the check in calendar that is displayed
	Given the Home page Check in calendar button is displayed
	When the user clicks on the check in calendar button
	And the user clicks on the exit button from the check in calendar
	Then the user should see that the check in calendar is closed

Scenario: The check out calendar is automatically opened after choosing a check in date
	Given the Home page calendars are displayed
	When the user selects a valid check in date
	Then the user should see that chosen check in date is selected
	And the check out calendar is automatically displayed

Scenario: The user chooses to book 1 or 2 nights
	Given the Home page calendars are displayed
	When the user selects a valid check in date
	And the user selects a next day or 2 days later checkout date
	Then the user should see that chosen check out date should be selected

Scenario: The user selects a future day in the check out calendar
	Given the Home page calendars are displayed
	When the user selects a valid check in date
	And select a future day in the checkout calendar
	Then the user should see that check out future day date is displayed 

Scenario: The user select a past day in the check out calendar
	Given the Home page calendars are displayed
	When the user selects a valid check in date
	And select a past day in the checkout calendar
	Then the user should see that the check out past date is not selected

Scenario: The user navigate to the previous month in the check out calendar
	Given the Home page Check out calendar button is displayed
	When the user clicks on the check out calendar button
	And clicks on the previous month button
	Then the user should see that the previous month is displayed

Scenario: The user navigate to the next month in the check out calendar
	Given the Home page Check out calendar button is displayed
	When the user clicks on the check out calendar button
	And clicks on the next month button
	Then the user should see that the next month is displayed

Scenario: The user closes the check out calendar that is displayed
	Given the Home page Check out calendar button is displayed
	When the user clicks on the check out calendar button
	And the user clicks on the exit button from the check out calendar
	Then the user should see that the check out calendar is closed

Scenario: The user increase the number of adults to 2
	Given the Home page increase the number of adults button
	When the user clicks on the increase button 
	Then the user should see that the number of adults is increased

Scenario: The user decrease the number of adults
	Given the Home page decrease the number of adults button
	And the number of adults is 2
	When the user clicks on the decrease button 
	Then the user should see that the number of adults is decreased to 1

Scenario: The user decrease the number of adults below 1
	Given the Home page decrease the number of adults button
	And the number of adults is set to 1
	When the user clicks on the decrease button 
	Then the user should see that the number of adults is not decreased

Scenario: The user increase the number of kids
	Given the Home page increase the number of kids button
	When the user clicks on the increase kids button 
	Then the user should see that the number of kids is increased

Scenario: The user decrease the number of kids
	Given the Home page decrease the number of kids button
	And the number of kids 1
	When the user clicks on the decrease kids button 
	Then the user should see that the number of kids is decreased to 0

Scenario: The user decrease the number of kids below 0
	Given the Home page decrease the number of kids button
	And the number of kids is set to 0
	When the user clicks on the decrease kids button 
	Then the user should see that the number of kids is not decreased

@focus
Scenario: The user searches valid data
	Given the Home search button
	And valid dates are selected
	When the user clicks on the search button
	Then the user should see that the Rooms page load
	And the Rooms button color changed to white
	
