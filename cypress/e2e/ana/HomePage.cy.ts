import { homePage } from "../../ui-manager/ana/pages/pages";
import { selectDateInIframe } from "../../ui-manager/ana/helpers/functions";
import { formatDateForSearch } from "../../ui-manager/ana/helpers/functions";
import { navigateMonthsInCalendarIframe } from "../../ui-manager/ana/helpers/functions";
import { formatDateForAriaLabel } from "../../ui-manager/ana/helpers/functions";

beforeEach(() => {
    cy.visit("/")
  })

  //navbar buttons

  it("Home Button Test", () => {
    homePage.homeButton().should("be.visible").click()
    cy.url().should("eq", "https://ancabota09.wixsite.com/intern")
  })

  it("Explore Button Test", () => {
    homePage.exploreButton().should("be.visible").click()
    cy.url().should("eq", "https://ancabota09.wixsite.com/intern/explore")
  })

  it("Rooms Button Test", () => {
    homePage.roomsButton().should("be.visible").click()
    cy.url().should("eq", "https://ancabota09.wixsite.com/intern/rooms")
  }) 

  it("Contact Button Test", () => {
    homePage.contactButton().should("be.visible").click()
    cy.url().should("eq", "https://ancabota09.wixsite.com/intern/contact")
  })

  it("Book Now Button Test", () => {
    homePage.contactButton().should("be.visible").click()
    cy.url().should("eq", "https://ancabota09.wixsite.com/intern/booknow")
  })

  it("Page Title Button Test", () => {
    homePage.pageTitleButton().should("be.visible").click()
    cy.url().should("eq", "https://ancabota09.wixsite.com/intern/")
  })

  //footer social media buttons

  it("Facebook Button Test", () => {
    homePage.facebookButton()
      .should("be.visible")
      .then(($link) => {
        $link.removeAttr('target')
        cy.wrap($link).click()
        cy.wait(2000)
        cy.url().should('not.eq', 'https://ancabota09.wixsite.com/intern') // Ensure URL has changed
        cy.url().should('include', 'https://www.facebook.com')
        cy.url().should('include', 'wix');
      })
    // homePage.facebookButton()
    //   .should("be.visible")
    //   .invoke('attr', 'href')
    //   .should('equal', 'http://www.facebook.com/wix')
  })

  it("X Button Test", () => {
    homePage.xButton()
    .should("be.visible")
    .then(($link) => {
      $link.removeAttr('target')
      cy.wrap($link).click()
      cy.wait(2000)
      cy.url().should('not.eq', 'https://ancabota09.wixsite.com/intern')
      cy.url().should('include', 'https://x.com/wix');
    })
  })

  it("Pinterest Button Test", () => {
    homePage.pinterestButton()
    .should("be.visible")
    .then(($link) => {
      $link.removeAttr('target')
      cy.wrap($link).click();
    });
    cy.wait(2000);
    cy.url().should('include', 'https://www.pinterest.com/wixcom/');
  })

  //footer buttons

  it("Wix Page Button Test", () => {
    homePage.wixPageButton()
      .should("be.visible")
      .then(($link) => {
        $link.removeAttr('target')
        cy.wrap($link).click()
        cy.wait(2000)
        cy.url().should('not.eq', 'https://ancabota09.wixsite.com/intern')
        cy.url().should('include', 'https://www.wix.com/?utm_campaign=vir_created_with');
      })

  })

  it("Contact Mail Button Test", () => {
    homePage.contactMailButton()
      .should("be.visible")
      .should('have.attr', 'href')
      .should('contain', 'info@mysite.com');
  })
  
  //Search Widget
  it("Check In Future Day Test", () => {

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    const today = new Date();
    today.setDate(today.getDate());

    const monthsToClick = (futureDate.getFullYear() - today.getFullYear()) * 12 + (futureDate.getMonth() - today.getMonth());

    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget #check-in')
    .should('exist')
    .click()

    for (let i = 0; i < monthsToClick; i++) {
      navigateMonthsInCalendarIframe('.navigate-right');
    }

    //future date
    selectDateInIframe(futureDate);
    const formattedDate = formatDateForSearch(futureDate);

    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget #check-in-value')
      .should('have.text', (formattedDate));

  })

  it("Check In Past Day Test", () => {

    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget #check-in')
    .should('exist')
    .click()

    //past date
    
    let formattedDate = formatDateForAriaLabel(pastDate);
    //selectDateInIframe(pastDate);
    cy.get('iframe.U73P_q')
      .its('0.contentDocument')
      .find(`button[aria-label="${formattedDate}"]`)
      .should('exist')
      .should('have.attr', 'disabled');

    formattedDate = formatDateForSearch(pastDate);
    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget #check-in-value')
      .should('not.have.text', (formattedDate));

  })

  it("Check In Today Test", () => {

    const today = new Date();
    today.setDate(today.getDate());

    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget #check-in')
    .should('exist')
    .click()

    //today
    selectDateInIframe(today);
    const formattedDate = formatDateForSearch(today);

    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget #check-in-value')
      .should('have.text', (formattedDate));

  })

  it("Check In Navigation Test", () => {

    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget #check-in')
    .should('exist')
    .click()

    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    const previousMonth = new Date();
    previousMonth.setMonth(previousMonth.getMonth() - 1);

    //next month
    navigateMonthsInCalendarIframe('.navigate-right')
    let expectedText = nextMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' });

    cy.get('iframe.U73P_q').its('0.contentDocument').find('.title.ng-binding')
      .should('have.text', (expectedText));

    //previous month
    navigateMonthsInCalendarIframe('.navigate-left')
    navigateMonthsInCalendarIframe('.navigate-left')
    expectedText = previousMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' });

    cy.get('iframe.U73P_q').its('0.contentDocument').find('.title.ng-binding')
      .should('have.text', (expectedText));
  })

  it.only("Check Out Future Day Test", () => {

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 8);
    const today = new Date();
    today.setDate(today.getDate());

    const monthsToClick = (futureDate.getFullYear() - today.getFullYear()) * 12 + (futureDate.getMonth() - today.getMonth());

    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget #check-out')
    .should('exist')
    .click()

    for (let i = 0; i < monthsToClick; i++) {
      navigateMonthsInCalendarIframe('.navigate-right');
    }

    //future date
    selectDateInIframe(futureDate);
    const formattedDate = formatDateForSearch(futureDate);

    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget #check-out-value')
      .should('have.text', (formattedDate));

  })

  it("Check Out Past Day Test", () => {

    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget #check-out')
    .should('exist')
    .click()

    //selectDateInIframe(pastDate);
    let formattedDate = formatDateForAriaLabel(pastDate);
    cy.get('iframe.U73P_q')
      .its('0.contentDocument')
      .find(`button[aria-label="${formattedDate}"]`)
      .should('exist')
      .should('have.attr', 'disabled');

    formattedDate = formatDateForSearch(pastDate);
    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget #check-out-value')
      .should('not.have.text', (formattedDate));

  })

  it("Check Out 3 Days Later Test", () => {

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 3);

    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget #check-out')
    .should('exist')
    .click()

    selectDateInIframe(futureDate);
    const formattedDate = formatDateForSearch(futureDate);

    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget #check-out-value')
      .should('have.text', (formattedDate));

  })

  it("Check Out Navigation Test", () => {

    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget #check-out')
    .should('exist')
    .click()

    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    const previousMonth = new Date();
    previousMonth.setMonth(previousMonth.getMonth() - 1);

    //next month
    navigateMonthsInCalendarIframe('.navigate-right')
    let expectedText = nextMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' });

    cy.get('iframe.U73P_q').its('0.contentDocument').find('.title.ng-binding')
      .should('have.text', (expectedText));

    //previous month
    navigateMonthsInCalendarIframe('.navigate-left')
    navigateMonthsInCalendarIframe('.navigate-left')
    expectedText = previousMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' });

    cy.get('iframe.U73P_q').its('0.contentDocument').find('.title.ng-binding')
      .should('have.text', (expectedText));
  })

  it("Adults Button Test", () => {

    //default number is 1 test
    let adultsNumber = 1
    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#adults > span.value.ng-binding')
      .should('have.text', (adultsNumber));

    //decrement under 1 test
    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#adults > a.down')
      .click()
    adultsNumber--

    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#adults > span.value.ng-binding')
      .should('not.have.text', (adultsNumber));
    adultsNumber = 1

    //increment the adults number test
    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#adults > a.up')
      .click()
    adultsNumber++

    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#adults > span.value.ng-binding')
      .should('have.text', (adultsNumber));
    
    //decrement number back to 1 test
    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#adults > a.down')
      .click()
    adultsNumber--

    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#adults > span.value.ng-binding')
      .should('have.text', (adultsNumber));
  })

  it("Kids Button Test", () => {

    //default number is 0 test
    let kidsNumber = 0
    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#children > span.value.ng-binding')
      .should('have.text', (kidsNumber));

    //decrement under 0 test
    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#children > a.down')
      .click()
    kidsNumber--

    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#children > span.value.ng-binding')
      .should('not.have.text', (kidsNumber));
    kidsNumber = 0

    //increment the kids number test
    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#children > a.up')
      .click()
    kidsNumber++

    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#children > span.value.ng-binding')
      .should('have.text', (kidsNumber));
    
    //decrement number back to 1 test
    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#children > a.down')
      .click()
    kidsNumber--

    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#children > span.value.ng-binding')
      .should('have.text', (kidsNumber));
  })

  it("Search Button Test", () => {

    //check if search button exists
    let searchButton = cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget > form > ul > li.search > button')
    .should('exist')

    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget #check-in')
    .should('exist')
    .click()

    //select today for check in
    const today = new Date();
    today.setDate(today.getDate());
    selectDateInIframe(today);
    let formattedDate = formatDateForSearch(today);

    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget #check-in-value')
      .should('have.text', (formattedDate));

    //select a day after 5 days for checkout
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);

    const monthsToClick = (futureDate.getFullYear() - today.getFullYear()) * 12 + (futureDate.getMonth() - today.getMonth());

    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget #check-out')
    .should('exist')
    .click()

    for (let i = 0; i < monthsToClick; i++) {
      navigateMonthsInCalendarIframe('.navigate-right');
    }

    selectDateInIframe(futureDate);
    formattedDate = formatDateForSearch(futureDate);

    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#search-widget #check-out-value')
      .should('have.text', (formattedDate));

    //number of adults 3
    let desiredNumberOfAdults = 3;
    let adultsNumber = 1;
    //increment the adults number test
    for (let i = 1; i < desiredNumberOfAdults; i++) {
      cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#adults > a.up')
        .click();
      adultsNumber++;
    }

    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#adults > span.value.ng-binding')
      .should('have.text', (adultsNumber));

    //number of kids 0
    let desiredNumberOfKids = 0;
    let kidsNumber = 0;
    //increment the adults number test
    for (let i = 1; i < desiredNumberOfKids; i++) {
      cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#children > a.up')
        .click();
      kidsNumber++;
    }

    cy.get('iframe.nKphmK[title="Wix Hotels"]').its('0.contentDocument').find('#children > span.value.ng-binding')
      .should('have.text', (kidsNumber));

    searchButton.click();
    cy.url().should("contains", "https://ancabota09.wixsite.com/intern/rooms")

  })


