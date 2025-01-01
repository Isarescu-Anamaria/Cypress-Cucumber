import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { baseUrl,homePage } from '../../pages/HomePage';
import { formatDateForAriaLabel,formatDateForSearch, navigateMonthsInCalendarIframe,selectDateInIframe } from '../common.step';

function buttonIsVisible(button) {
    button().should('be.visible');
}

function hoverOverButton(button) {
    button().should('be.visible').trigger('mouseover');
}

function clickOnButton(button) {
    button().should('be.visible').click();
}

function calendarIsVisible(selector) {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument')
        .find(selector)
        .should('exist');
}

function clickOnCalendarButton(selector) {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument')
        .find(selector)
        .should('exist')
        .click();
}

Given('the Home page is opened', ()=> {
    cy.visit("https://ancabota09.wixsite.com/intern", { timeout: 10000 });
    cy.wait(3000);
});

// Given('a navigation bar', ()=> {
//     cy.get('.CJF7A2')
//         .should('be.visible');
// });

Given('the Home page Explore button from the navigation bar is displayed', ()=> {
    buttonIsVisible(homePage.exploreButton)
});
 
When('the user hover over the Explore button from the navigation bar', () => {
    hoverOverButton(homePage.exploreButton);
});

Then('the user should see that the color of the Explore button should change to white', () => {
    homePage.exploreButton().should('have.css', 'color', 'rgb(47, 46, 46)');
});

Given('the Home page Rooms button from the navigation bar is displayed', ()=> {
    buttonIsVisible(homePage.roomsButton)
});
 
When('the user hover over the Rooms button from the navigation bar', () => {
    hoverOverButton(homePage.roomsButton);
});

Then('the user should see that the color of the Rooms button should change to white', () => {
    homePage.roomsButton().should('have.css', 'color', 'rgb(47, 46, 46)');
});

Given('the Home page Contact button from the navigation bar is displayed', ()=> {
    buttonIsVisible(homePage.contactButton)
});
 
When('the user hover over the Contact button from the navigation bar', () => {
    hoverOverButton(homePage.contactButton);
});

Then('the user should see that the color of the Contact button should change to white', () => {
    homePage.contactButton().should('have.css', 'color', 'rgb(47, 46, 46)');
});

Given('the Home page Book Now button from the navigation bar is displayed', ()=> {
    buttonIsVisible(homePage.bookNowButton)
});
 
When('the user hover over the Book Now button from the navigation bar', () => {
    hoverOverButton(homePage.bookNowButton);
});

Then('the user should see that the color of the Book Now button should change to white', () => {
    homePage.bookNowButton().should('have.css', 'color', 'rgb(47, 46, 46)');
});

When('the user clicks on the Explore button from the navigation bar', () => {
    clickOnButton(homePage.exploreButton);
});

Then('the user should see that the Explore page is loaded', () => {
    cy.url().should("eq", "https://ancabota09.wixsite.com/intern/explore");
});

When('the user clicks on the Rooms button from the navigation bar', () => {
    clickOnButton(homePage.roomsButton);
});

Then('the user should see that the Rooms page is loaded', () => {
    cy.url().should("eq", "https://ancabota09.wixsite.com/intern/rooms");
});

When('the user clicks on the Contact button from the navigation bar', () => {
    clickOnButton(homePage.contactButton);
});

Then('the user should see that the Contact page is loaded', () => {
    cy.url().should("eq", "https://ancabota09.wixsite.com/intern/contact");
});

When('the user clicks on the Book Now button from the navigation bar', () => {
    clickOnButton(homePage.bookNowButton);
});

Then('the user should see that the Book Now page is loaded', () => {
    cy.url().should("eq", "https://ancabota09.wixsite.com/intern/booknow");
});

Given('the Home page Check in calendar button is displayed', ()=> {
    calendarIsVisible('#search-widget #check-in');
});

When('the user clicks on the check in calendar button', () => {
    clickOnCalendarButton('#search-widget #check-in');
});

Then('the user should see that check in calendar with the current month is displayed', () => {
    cy.get('iframe.U73P_q')
            .its('0.contentDocument')
            .find('.date-picker.below')
            .should('exist');

    const today = new Date();
    today.setDate(today.getDate());
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const currentMonth = months[today.getMonth()];
    const currentYear = today.getFullYear();
    const formattedDate = `${currentMonth} ${currentYear}`;

    cy.get('iframe.U73P_q')
            .its('0.contentDocument')
            .find('.title.ng-binding')
            .should('exist')
            .should('have.text', formattedDate);
    
});

Then('current day highlighted should appear', () => {
    const today = new Date();
    today.setDate(today.getDate());
    const currentDay = today.getDate();
    const formattedDate = formatDateForAriaLabel(today);

    cy.get('iframe.U73P_q')
            .its('0.contentDocument')
            .find(`button[aria-label="${formattedDate}"]`)
            .should('exist');

    cy.get('iframe.U73P_q')
            .its('0.contentDocument')
            .find('td.current-month.visible.selectable')
            .should('have.class', 'focused');
});

When('select the current day in the calendar', () => {
    const today = new Date();
    today.setDate(today.getDate());
    const currentDay = today.getDate();
    const formattedDate = formatDateForAriaLabel(today);
    cy.wait(3000)
    cy.get('iframe.U73P_q')
            .its('0.contentDocument')
            .find(`button[aria-label="${formattedDate}"]`)
            .should('exist')
            .click();
});

Then('the user should see that current day date is displayed', () => {
    const today = new Date();
    today.setDate(today.getDate());
    const formattedDate = formatDateForSearch(today);

    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument')
        .find('#search-widget #check-in-value')
        .should('have.text', (formattedDate));
});

When('select a future day in the calendar', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    const today = new Date();
    today.setDate(today.getDate());

    const monthsToClick = (futureDate.getFullYear() - today.getFullYear()) * 12 + (futureDate.getMonth() - today.getMonth());

    for (let i = 0; i < monthsToClick; i++) {
        navigateMonthsInCalendarIframe('.navigate-right');
      }
  
    selectDateInIframe(futureDate);
});

Then('the user should see that future day date is displayed', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    const formattedDate = formatDateForSearch(futureDate);

    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument')
        .find('#search-widget #check-in-value')
        .should('have.text', (formattedDate));
});

When('select a past day in the calendar', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 10);
    const today = new Date();
    today.setDate(today.getDate());

    const monthsToClick = (today.getFullYear() - pastDate.getFullYear()) * 12 + (today.getMonth() - pastDate.getMonth());

    for (let i = 0; i < monthsToClick; i++) {
        navigateMonthsInCalendarIframe('.navigate-left');
      }
  
    let formattedDate = formatDateForAriaLabel(pastDate);

    cy.get('iframe.U73P_q')
      .its('0.contentDocument')
      .find(`button[aria-label="${formattedDate}"]`)
      .should('exist')
      .should('have.attr', 'disabled');
});

Then('the user should see that past date is not selected', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    let formattedDate = formatDateForAriaLabel(pastDate);

    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument')
        .find('#search-widget #check-in-value')
        .should('not.have.text', (formattedDate));
});

When('clicks on the previous month button', () => {
    const previousMonth = new Date();
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    navigateMonthsInCalendarIframe('.navigate-left');
});

Then('the user should see that the previous month is displayed', () => {
    const previousMonth = new Date();
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    const expectedText = previousMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' });

    cy.get('iframe.U73P_q')
        .its('0.contentDocument')
        .find('.title.ng-binding')
        .should('have.text', (expectedText));
});

When('clicks on the next month button', () => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    navigateMonthsInCalendarIframe('.navigate-right');
});

Then('the user should see that the next month is displayed', () => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const expectedText = nextMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' });

    cy.get('iframe.U73P_q')
    .its('0.contentDocument')
    .find('.title.ng-binding')
    .should('have.text', (expectedText));
});

When('the user clicks on the exit button from the check in calendar', () => {
    cy.get('iframe.U73P_q')
    .its('0.contentDocument')
    .find('.close.ng-scope')
    .should('be.visible')
    .click();
});

Then('the user should see that the check in calendar is closed', () => {
    cy.get('iframe.U73P_q').should('not.exist');
});

Given('the Home page calendars are displayed', ()=> {
    calendarIsVisible('#search-widget #check-in');
    calendarIsVisible('#search-widget #check-out');
});

When('the user selects a valid check in date', () => {
    const today = new Date();
    today.setDate(today.getDate());
    const currentDay = today.getDate();
    const formattedDate = formatDateForAriaLabel(today);
    clickOnCalendarButton('#search-widget #check-in');
    cy.wait(3000);

    cy.get('iframe.U73P_q')
            .its('0.contentDocument')
            .find(`button[aria-label="${formattedDate}"]`)
            .should('exist')
            .click();
});

Then('the user should see that chosen check in date is selected', () => {
    const today = new Date();
    today.setDate(today.getDate());
    const formattedDate = formatDateForSearch(today);

    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument')
        .find('#search-widget #check-in-value')
        .should('have.text', (formattedDate));
});

Then('the check out calendar is automatically displayed', () => {
    cy.wait(3000);
    cy.get('iframe.U73P_q')
            .its('0.contentDocument')
            .find('.date-picker.below')
            .should('exist');
});

When('the user selects a next day or 2 days later checkout date', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 2);
    const today = new Date();
    today.setDate(today.getDate());

    const monthsToClick = (futureDate.getFullYear() - today.getFullYear()) * 12 + (futureDate.getMonth() - today.getMonth());

    for (let i = 0; i < monthsToClick; i++) {
        navigateMonthsInCalendarIframe('.navigate-right');
      }
  
    selectDateInIframe(futureDate);
});

Then('the user should see that chosen check out date should be selected', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    const formattedDate = formatDateForSearch(futureDate);

    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument')
        .find('#search-widget #check-in-value')
        .should('have.text', (formattedDate));
});

When('select a future day in the checkout calendar', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    const today = new Date();
    today.setDate(today.getDate());

    const monthsToClick = (futureDate.getFullYear() - today.getFullYear()) * 12 + (futureDate.getMonth() - today.getMonth());

    for (let i = 0; i < monthsToClick; i++) {
        navigateMonthsInCalendarIframe('.navigate-right');
      }
  
    selectDateInIframe(futureDate);
});

Then('the user should see that check out future day date is displayed', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    const formattedDate = formatDateForSearch(futureDate);

    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument')
        .find('#search-widget #check-out-value')
        .should('have.text', (formattedDate));
});

When('select a past day in the checkout calendar', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 10);
    const today = new Date();
    today.setDate(today.getDate());

    const monthsToClick = (today.getFullYear() - pastDate.getFullYear()) * 12 + (today.getMonth() - pastDate.getMonth());

    for (let i = 0; i < monthsToClick; i++) {
        navigateMonthsInCalendarIframe('.navigate-left');
      }
  
    let formattedDate = formatDateForAriaLabel(pastDate);

    cy.get('iframe.U73P_q')
      .its('0.contentDocument')
      .find(`button[aria-label="${formattedDate}"]`)
      .should('exist')
      .should('have.attr', 'disabled');
});

Then('the user should see that the check out past date is not selected', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    let formattedDate = formatDateForAriaLabel(pastDate);

    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument')
        .find('#search-widget #check-out-value')
        .should('not.have.text', (formattedDate));
});

Given('the Home page Check out calendar button is displayed', ()=> {
    calendarIsVisible('#search-widget #check-out');
});

When('the user clicks on the check out calendar button', () => {
    clickOnCalendarButton('#search-widget #check-out');
});

When('the user clicks on the exit button from the check out calendar', () => {
    cy.get('iframe.U73P_q')
    .its('0.contentDocument')
    .find('.close.ng-scope')
    .should('be.visible')
    .click();
});

Then('the user should see that the check out calendar is closed', () => {
    cy.get('iframe.U73P_q').should('not.exist');
});

Given('the Home page increase the number of adults button', ()=> {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument').find('#adults > a.up')
        .should('be.visible');
});

When('the user clicks on the increase button', ()=> {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument').find('#adults > a.up')
        .should('be.visible')
        .click();
    cy.wait(3000);
});

Then('the user should see that the number of adults is increased', () => {
    let adultsNumber = 2;
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument')
        .find('#adults > span.value.ng-binding')
        .should('have.text', (adultsNumber));
});

Given('the Home page decrease the number of adults button', ()=> {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument').find('#adults > a.down')
        .should('be.visible');
});

Given('the number of adults is 2', ()=> {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument').find('#adults > a.up')
        .should('be.visible')
        .click();
    cy.wait(3000);

    let adultsNumber = 2;
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument')
        .find('#adults > span.value.ng-binding')
        .should('have.text', (adultsNumber));
});

When('the user clicks on the decrease button', ()=> {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument').find('#adults > a.down')
        .should('be.visible')
        .click();
    cy.wait(3000);
});

Then('the user should see that the number of adults is decreased to 1', () => {
    let adultsNumber = 1;
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument')
        .find('#adults > span.value.ng-binding')
        .should('have.text', (adultsNumber));
});

Given('the number of adults is set to 1', ()=> {
    let adultsNumber = 1;
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument')
        .find('#adults > span.value.ng-binding')
        .should('have.text', (adultsNumber));
});

Then('the user should see that the number of adults is not decreased', () => {
    let adultsNumber = 1;
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument')
        .find('#adults > span.value.ng-binding')
        .should('have.text', (adultsNumber));
});

Given('the Home page increase the number of kids button', ()=> {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument').find('#children > a.up')
        .should('be.visible');
});

When('the user clicks on the increase kids button', ()=> {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument').find('#children > a.up')
        .should('be.visible')
        .click();
    cy.wait(3000);
});

Then('the user should see that the number of kids is increased', () => {
    let childrenNumber = 1;
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument')
        .find('#children > span.value.ng-binding')
        .should('have.text', (childrenNumber));
});

Given('the Home page decrease the number of kids button', ()=> {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument').find('#children > a.down')
        .should('be.visible');
});

Given('the number of kids 1', ()=> {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument').find('#children > a.up')
        .should('be.visible')
        .click();
    cy.wait(3000);

    let childrenNumber = 1;
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument')
        .find('#children > span.value.ng-binding')
        .should('have.text', (childrenNumber));
});

When('the user clicks on the decrease kids button', ()=> {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument').find('#children > a.down')
        .should('be.visible')
        .click();
    cy.wait(3000);
});

Then('the user should see that the number of kids is decreased to 0', () => {
    let childrenNumber = 0;
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument')
        .find('#children > span.value.ng-binding')
        .should('have.text', (childrenNumber));
});

Given('the number of kids is set to 0', ()=> {
    let childrenNumber = 0;
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument')
        .find('#children > span.value.ng-binding')
        .should('have.text', (childrenNumber));
});

Then('the user should see that the number of kids is not decreased', () => {
    let childrenNumber = 0;
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument')
        .find('#children > span.value.ng-binding')
        .should('have.text', (childrenNumber));
});

Given('the Home search button', ()=> {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument')
        .find('#search-widget > form > ul > li.search > button')
        .should('exist')
});

Given('valid dates are selected', ()=> {
    //choose the current day for checkin
    clickOnCalendarButton('#search-widget #check-in');
    const today = new Date();
    today.setDate(today.getDate());
    const currentDay = today.getDate();
    const formattedDate = formatDateForAriaLabel(today);
    cy.wait(3000);
    cy.get('iframe.U73P_q')
            .its('0.contentDocument')
            .find(`button[aria-label="${formattedDate}"]`)
            .should('exist')
            .click();
    cy.wait(3000);
    //then choose 10 days later in the checout calendar
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);

    const monthsToClick = (futureDate.getFullYear() - today.getFullYear()) * 12 + (futureDate.getMonth() - today.getMonth());

    for (let i = 0; i < monthsToClick; i++) {
        navigateMonthsInCalendarIframe('.navigate-right');
      }
  
    selectDateInIframe(futureDate);
    cy.wait(3000);

    //then select the number of adults to 2
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument').find('#adults > a.up')
        .should('be.visible')
        .click();
    cy.wait(3000);
});

When('the user clicks on the search button', ()=> {
    cy.get('iframe.nKphmK[title="Wix Hotels"]')
        .its('0.contentDocument')
        .find('#search-widget > form > ul > li.search > button')
        .should('exist')
        .click();
    cy.wait(3000);
});

Then('the user should see that the Rooms page load', () => {
    cy.url().should("contains", "https://ancabota09.wixsite.com/intern/rooms");
});

Then('the Rooms button color changed to white', () => {
    homePage.roomsButton()
        .should('have.css', 'color', 'rgb(47, 46, 46)');
});