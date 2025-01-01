import { roomsPage } from "../../ui-manager/ana/pages/pages";
import { homePage } from "../../ui-manager/ana/pages/pages";
import { incrementAdultsNumber, selectDateInIframe } from "../../ui-manager/ana/helpers/functions";
import { formatDateForSearch } from "../../ui-manager/ana/helpers/functions";
import { navigateMonthsInCalendarInRoomsPage } from "../../ui-manager/ana/helpers/functions";
import { formatDateForAriaLabel } from "../../ui-manager/ana/helpers/functions";
import { roomButton, clickElementRoomsPage, elementVisibilityRoomsPage} from "../../ui-manager/ana/helpers/functions";
import { textEqualRoomsPage, textNotEqualRoomsPage } from "../../ui-manager/ana/helpers/functions";
import { selectDateInRoomPicker, verifyDateRoomsPage, navigateToFutureMonth } from "../../ui-manager/ana/helpers/functions";
import {verifyAdultsNumberInIframe,verifyKidsNumberInIframe,incrementKidsNumber} from "../../ui-manager/ana/helpers/functions";
import { verifyClearButtonExists, verifyErrorMessageExists,verifyTryMessageExists } from "../../ui-manager/ana/helpers/functions";
import { searchAgainButtonClick, verifyRoomTitle, verifyRoomProperties } from "../../ui-manager/ana/helpers/functions";
import { verifyRoomAmenities, verifyRoomCheckInCheckOut, verifyRoomTerms, verifyRoomPolicies } from "../../ui-manager/ana/helpers/functions";

const roomsPageURL = "https://ancabota09.wixsite.com/intern/rooms";

beforeEach(() => {
    cy.visit("/")
  })

  it("Selector Check In Button Test", () => {

    cy.visit(roomsPageURL)
    cy.wait(10000);
    clickElementRoomsPage('#check-in');
    elementVisibilityRoomsPage('.calendar-popup.s-field.s-separator.visible');

  })
  
  it("Selector Check Out Button Test", () => {

    cy.visit(roomsPageURL)
    cy.wait(10000);
    clickElementRoomsPage('#check-out');
    elementVisibilityRoomsPage('.calendar-popup.s-field.s-separator.visible');

  })

  it("Adults Button Test", () => {
    cy.visit(roomsPageURL);
    cy.wait(10000);
    //default number is 1 test
    let stringAdultsNumber = '1'
    let adultsNumber = 1;
    textEqualRoomsPage('#adults .value',stringAdultsNumber);

    //decrement under 1 test
    clickElementRoomsPage('#adults > a.down');
    adultsNumber--
    stringAdultsNumber = adultsNumber.toString();
    textNotEqualRoomsPage('#adults .value',stringAdultsNumber);
    adultsNumber = 1

    //increment the adults number test
    clickElementRoomsPage('#adults > a.up');
    adultsNumber++
    stringAdultsNumber = adultsNumber.toString();
    textEqualRoomsPage('#adults .value',stringAdultsNumber);
    
    //decrement number back to 1 test
    clickElementRoomsPage('#adults > a.down');
    adultsNumber--
    stringAdultsNumber = adultsNumber.toString();
    textEqualRoomsPage('#adults .value',stringAdultsNumber);
  })

  it("Kids Button Test", () => {
    cy.visit(roomsPageURL);
    cy.wait(10000);
    //default number is 0 test
    let stringKidsNumber = '0'
    let kidsNumber = 0;
    textEqualRoomsPage('#children .value',stringKidsNumber);

    //decrement under 0- test
    clickElementRoomsPage('#children > a.down')
    kidsNumber--;
    stringKidsNumber = kidsNumber.toString();
    textNotEqualRoomsPage('#children .value',stringKidsNumber);
    kidsNumber = 0

    //increment the adults number test
    clickElementRoomsPage('#children > a.up')
    kidsNumber++
    stringKidsNumber = kidsNumber.toString();
    textEqualRoomsPage('#children .value',stringKidsNumber);
    
    //decrement number back to 1 test
    clickElementRoomsPage('#children > a.down')
    kidsNumber--
    stringKidsNumber = kidsNumber.toString();
    textEqualRoomsPage('#children .value',stringKidsNumber);
  })

  it("Search Button Valid Input Test", () => {
    cy.visit(roomsPageURL);
    cy.wait(2000);
    //check if search button exists
    let searchButton = cy.get('iframe.nKphmK[title="Book a Room"]')
        .its('0.contentDocument')
        .find('#hotel-container > section > div > div > form > ul > li.search-btn > button > span:nth-child(1)')
        .should('be.visible')

    //select today for check in
    const today = new Date();
    today.setDate(today.getDate());
    let formattedDateForText = formatDateForSearch(today);
    let formattedDate = formatDateForAriaLabel(today);
    clickElementRoomsPage('#check-in');
    
    cy.wait(2000);
    selectDateInRoomPicker('.calendar-popup.s-field.s-separator.visible',formattedDate);
    verifyDateRoomsPage('#check_in-value',formattedDateForText);

    //select a day after 10 days for checkout
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    formattedDate = formatDateForAriaLabel(futureDate);
    navigateToFutureMonth(futureDate, today,'.navigate-right');
    selectDateInRoomPicker('.calendar-popup.s-field.s-separator.visible',formattedDate);
    formattedDateForText = formatDateForSearch(futureDate);
    verifyDateRoomsPage('#check_out-value',formattedDateForText);

    //number of adults 3
    let desiredNumberOfAdults = 3;
    incrementAdultsNumber(desiredNumberOfAdults)
    verifyAdultsNumberInIframe('#adults .value',desiredNumberOfAdults)
  
    //number of kids 0
    let desiredNumberOfKids = 1;
    incrementKidsNumber(desiredNumberOfKids);
    verifyKidsNumberInIframe('#children .value',desiredNumberOfKids);

    searchButton.click();
    cy.url().should("contains", "https://ancabota09.wixsite.com/intern/rooms")

  })

  it("Clear Button Test", () => {
    cy.visit(roomsPageURL);
    cy.wait(2000);
    //check if search button exists
    let searchButton = cy.get('iframe.nKphmK[title="Book a Room"]')
        .its('0.contentDocument')
        .find('#hotel-container > section > div > div > form > ul > li.search-btn > button > span:nth-child(1)')
        .should('be.visible')

     //select today for check in
     const today = new Date();
     today.setDate(today.getDate());
     let formattedDateForText = formatDateForSearch(today);
     let formattedDate = formatDateForAriaLabel(today);
     clickElementRoomsPage('#check-in');
     
     cy.wait(2000);
     selectDateInRoomPicker('.calendar-popup.s-field.s-separator.visible',formattedDate);
     verifyDateRoomsPage('#check_in-value',formattedDateForText);
 
     //select a day after 10 days for checkout
     const futureDate = new Date();
     futureDate.setDate(futureDate.getDate() + 10);
     formattedDate = formatDateForAriaLabel(futureDate);
     navigateToFutureMonth(futureDate, today,'.navigate-right');
     selectDateInRoomPicker('.calendar-popup.s-field.s-separator.visible',formattedDate);
     formattedDateForText = formatDateForSearch(futureDate);
     verifyDateRoomsPage('#check_out-value',formattedDateForText);
 
     //number of adults 3
     let desiredNumberOfAdults = 3;
     incrementAdultsNumber(desiredNumberOfAdults)
     verifyAdultsNumberInIframe('#adults .value',desiredNumberOfAdults)
   
     //number of kids 1
     let desiredNumberOfKids = 1;
     incrementKidsNumber(desiredNumberOfKids);
     verifyKidsNumberInIframe('#children .value',desiredNumberOfKids);

     searchButton.click();
     cy.url().should("contains", "https://ancabota09.wixsite.com/intern/rooms")
     verifyClearButtonExists('.back.s-button-color');
     cy.url().should("equal", "https://ancabota09.wixsite.com/intern/rooms/rooms")

  })

  it("Standard Suite Name Button Test", () => {
    cy.visit(roomsPageURL)
    cy.wait(10000);
    roomButton('#content > div > div.content-body > div > ul > li:nth-child(1) > div > div.info > div.description > h3 > a > span');
    cy.url().should("equal", "https://ancabota09.wixsite.com/intern/rooms/rooms/afda6ba1-efd1-4432-bd42-dd678bd4beb4");
  })

  it("Cottage Name Button Test", () => {
    cy.visit(roomsPageURL)
    cy.wait(10000);
    roomButton('#content > div > div.content-body > div > ul > li:nth-child(2) > div > div.info > div.description > h3 > a > span');
    cy.url().should("equal", "https://ancabota09.wixsite.com/intern/rooms/rooms/4e2820f3-0564-4bd0-9258-e7594d617297");
  })

  it("Clasic App Name Button Test", () => {
    cy.visit(roomsPageURL)
    cy.wait(10000);
    roomButton('#content > div > div.content-body > div > ul > li:nth-child(3) > div > div.info > div.description > h3 > a > span');
    cy.url().should("equal", "https://ancabota09.wixsite.com/intern/rooms/rooms/1739582a-003e-49e7-a9e6-b6fdb55a9027");
  })

  it("Rooms Buttons Test", () => {
    const testCases = [
      {
        name: "Standard Suite More Info",
        selector: '#content > div > div.content-body > div > ul > li:nth-child(1) > div > div.info > div.bottom > button',
        expectedUrl: 'https://ancabota09.wixsite.com/intern/rooms/rooms/afda6ba1-efd1-4432-bd42-dd678bd4beb4'
      },
      {
        name: "Cottage More Info",
        selector: '#content > div > div.content-body > div > ul > li:nth-child(2) > div > div.info > div.bottom > button',
        expectedUrl: 'https://ancabota09.wixsite.com/intern/rooms/rooms/4e2820f3-0564-4bd0-9258-e7594d617297'
      },
      {
        name: "Classic App More Info",
        selector: '#content > div > div.content-body > div > ul > li:nth-child(3) > div > div.info > div.bottom > button',
        expectedUrl: 'https://ancabota09.wixsite.com/intern/rooms/rooms/1739582a-003e-49e7-a9e6-b6fdb55a9027'
      },
      {
        name: "Standard Suite Image Button",
        selector: '#content > div > div.content-body > div > ul > li:nth-child(1) > div > div.image > span > span',
        expectedUrl: 'https://ancabota09.wixsite.com/intern/rooms/rooms/afda6ba1-efd1-4432-bd42-dd678bd4beb4'
      },
      {
        name: "Cottage Image Button",
        selector: '#content > div > div.content-body > div > ul > li:nth-child(2) > div > div.image > span > span',
        expectedUrl: 'https://ancabota09.wixsite.com/intern/rooms/rooms/4e2820f3-0564-4bd0-9258-e7594d617297'
      },
      {
        name: "Classic App Image Button",
        selector: '#content > div > div.content-body > div > ul > li:nth-child(3) > div > div.image > span > span',
        expectedUrl: 'https://ancabota09.wixsite.com/intern/rooms/rooms/1739582a-003e-49e7-a9e6-b6fdb55a9027'
      }
    ];

    cy.visit(roomsPageURL);
    cy.wait(10000);
  
    testCases.forEach((testCase) => {
      cy.log(`Testing ${testCase.name}`);
      roomButton(testCase.selector); 
      cy.url().should('equal', testCase.expectedUrl);
      cy.visit(roomsPageURL);
      cy.wait(10000);
    });

  })

  it("One Night Test", () => {
    cy.visit(roomsPageURL);
    cy.wait(2000);
    //check if search button exists
    let searchButton = cy.get('iframe.nKphmK[title="Book a Room"]')
        .its('0.contentDocument')
        .find('#hotel-container > section > div > div > form > ul > li.search-btn > button > span:nth-child(1)')
        .should('be.visible')

    //select today for check in
    const today = new Date();
    today.setDate(today.getDate());
    let formattedDateForText = formatDateForSearch(today);
    let formattedDate = formatDateForAriaLabel(today);
    clickElementRoomsPage('#check-in');
     
    cy.wait(2000);
    selectDateInRoomPicker('.calendar-popup.s-field.s-separator.visible',formattedDate);
    verifyDateRoomsPage('#check_in-value',formattedDateForText);
 
    //select a day after 1 day for checkout
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    formattedDate = formatDateForAriaLabel(futureDate);
    navigateToFutureMonth(futureDate, today,'.navigate-right');
    selectDateInRoomPicker('.calendar-popup.s-field.s-separator.visible',formattedDate);
    formattedDateForText = formatDateForSearch(futureDate);
    verifyDateRoomsPage('#check_out-value',formattedDateForText);
    //number of adults 1

    searchButton.click();
    cy.url().should("equals", "https://ancabota09.wixsite.com/intern/rooms/rooms/%3FcheckIn%3D1724198400000%26checkOut%3D1724457600000%26adults%3D1%26children%3D0");

  })

  it("More than 180 Nights Test", () => {
    cy.visit(roomsPageURL);
    cy.wait(2000);
    //check if search button exists
    let searchButton = cy.get('iframe.nKphmK[title="Book a Room"]')
        .its('0.contentDocument')
        .find('#hotel-container > section > div > div > form > ul > li.search-btn > button > span:nth-child(1)')
        .should('be.visible')

     //select today for check in
     const today = new Date();
     today.setDate(today.getDate());
     let formattedDateForText = formatDateForSearch(today);
     let formattedDate = formatDateForAriaLabel(today);
     clickElementRoomsPage('#check-in');
      
     cy.wait(2000);
     selectDateInRoomPicker('.calendar-popup.s-field.s-separator.visible',formattedDate);
     verifyDateRoomsPage('#check_in-value',formattedDateForText);
  
     //select a day after 181 day for checkout
     const futureDate = new Date();
     futureDate.setDate(futureDate.getDate() + 181);
     formattedDate = formatDateForAriaLabel(futureDate);
     navigateToFutureMonth(futureDate, today,'.navigate-right');
     selectDateInRoomPicker('.calendar-popup.s-field.s-separator.visible',formattedDate);
     formattedDateForText = formatDateForSearch(futureDate);
     verifyDateRoomsPage('#check_out-value',formattedDateForText);
    //number of adults 1

    searchButton.click();
    //error message
    verifyErrorMessageExists('.alert.alert-danger.clearfix');

  })

  it("Search 8 Adults Test", () => {
    cy.visit(roomsPageURL);
    cy.wait(2000);
    //check if search button exists
    let searchButton = cy.get('iframe.nKphmK[title="Book a Room"]')
        .its('0.contentDocument')
        .find('#hotel-container > section > div > div > form > ul > li.search-btn > button > span:nth-child(1)')
        .should('be.visible')

    
    //select today for check in
    const today = new Date();
    today.setDate(today.getDate());
    let formattedDateForText = formatDateForSearch(today);
    let formattedDate = formatDateForAriaLabel(today);
    clickElementRoomsPage('#check-in');
     
    cy.wait(2000);
    selectDateInRoomPicker('.calendar-popup.s-field.s-separator.visible',formattedDate);
    verifyDateRoomsPage('#check_in-value',formattedDateForText);
 
    //select a day after 10 days for checkout
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    formattedDate = formatDateForAriaLabel(futureDate);
    navigateToFutureMonth(futureDate, today,'.navigate-right');
    selectDateInRoomPicker('.calendar-popup.s-field.s-separator.visible',formattedDate);
    formattedDateForText = formatDateForSearch(futureDate);
    verifyDateRoomsPage('#check_out-value',formattedDateForText);
 
    //number of adults 8
    let desiredNumberOfAdults = 8;
    incrementAdultsNumber(desiredNumberOfAdults)
    verifyAdultsNumberInIframe('#adults .value',desiredNumberOfAdults)
   
    //number of kids 0
    searchButton.click();
    //try another search message
    verifyTryMessageExists('p[stranslate="rooms.error.SORRY"] > span.strans');
  })

  it("Search 2 Adults 2 Kids Test", () => {
    cy.visit(roomsPageURL);
    cy.wait(2000);
    //check if search button exists
    let searchButton = cy.get('iframe.nKphmK[title="Book a Room"]')
        .its('0.contentDocument')
        .find('#hotel-container > section > div > div > form > ul > li.search-btn > button > span:nth-child(1)')
        .should('be.visible')

    //select today for check in
    const today = new Date();
    today.setDate(today.getDate());
    let formattedDateForText = formatDateForSearch(today);
    let formattedDate = formatDateForAriaLabel(today);
    clickElementRoomsPage('#check-in');
     
    cy.wait(2000);
    selectDateInRoomPicker('.calendar-popup.s-field.s-separator.visible',formattedDate);
    verifyDateRoomsPage('#check_in-value',formattedDateForText);
 
    //select a day after 10 days for checkout
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    formattedDate = formatDateForAriaLabel(futureDate);
    navigateToFutureMonth(futureDate, today,'.navigate-right');
    selectDateInRoomPicker('.calendar-popup.s-field.s-separator.visible',formattedDate);
    formattedDateForText = formatDateForSearch(futureDate);
    verifyDateRoomsPage('#check_out-value',formattedDateForText);
 
    //number of adults 2
    let desiredNumberOfAdults = 2;
    incrementAdultsNumber(desiredNumberOfAdults)
    verifyAdultsNumberInIframe('#adults .value',desiredNumberOfAdults)
   
    //number of kids 2
    let desiredNumberOfKids = 2;
    incrementKidsNumber(desiredNumberOfKids);
    verifyKidsNumberInIframe('#children .value',desiredNumberOfKids);

    searchButton.click();
    //try another search message
    verifyTryMessageExists('p[stranslate="rooms.error.SORRY"] > span.strans');
  })

  it("Search Again Button Test", () => {
    cy.visit(roomsPageURL);
    cy.wait(2000);
    //check if search button exists
    let searchButton = cy.get('iframe.nKphmK[title="Book a Room"]')
        .its('0.contentDocument')
        .find('#hotel-container > section > div > div > form > ul > li.search-btn > button > span:nth-child(1)')
        .should('be.visible')

    //select today for check in
    const today = new Date();
    today.setDate(today.getDate());
    let formattedDateForText = formatDateForSearch(today);
    let formattedDate = formatDateForAriaLabel(today);
    clickElementRoomsPage('#check-in');
     
    cy.wait(2000);
    selectDateInRoomPicker('.calendar-popup.s-field.s-separator.visible',formattedDate);
    verifyDateRoomsPage('#check_in-value',formattedDateForText);
 
    //select a day after 5 days for checkout
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);
    formattedDate = formatDateForAriaLabel(futureDate);
    navigateToFutureMonth(futureDate, today,'.navigate-right');
    selectDateInRoomPicker('.calendar-popup.s-field.s-separator.visible',formattedDate);
    formattedDateForText = formatDateForSearch(futureDate);
    verifyDateRoomsPage('#check_out-value',formattedDateForText);
 
    //number of adults 2
    let desiredNumberOfAdults = 2;
    incrementAdultsNumber(desiredNumberOfAdults)
    verifyAdultsNumberInIframe('#adults .value',desiredNumberOfAdults)
   
    //number of kids 1
    let desiredNumberOfKids = 1;
    incrementKidsNumber(desiredNumberOfKids);
    verifyKidsNumberInIframe('#children .value',desiredNumberOfKids);

    searchButton.click();
    verifyTryMessageExists('p[stranslate="rooms.error.SORRY"] > span.strans');
    searchAgainButtonClick('.search.s-button');
    verifyTryMessageExists('p[stranslate="rooms.error.SORRY"] > span.strans');
    
  })

  it("Amenities Test",() => {
    cy.visit(roomsPageURL);
    cy.wait(2000);

    cy.get('iframe.nKphmK[title="Book a Room"]')
      .its('0.contentDocument')
      .find('ul.amenities.s-separator li')
      .each(($amenity) => {
        const amenityText = $amenity.text().trim();
        cy.wrap($amenity) 
          .trigger('mouseenter') 
          .find('[tooltip]') 
          .invoke('attr', 'tooltip') 
          .should('equal', amenityText);
      });
  })

  it("Book Now Button Test",() => {
    cy.visit(roomsPageURL);
    cy.wait(2000);

    roomButton('#content > div > div.content-body > div > ul > li:nth-child(1) > div > div.info > div.description > h3 > a > span');
    cy.url().should("equal", "https://ancabota09.wixsite.com/intern/rooms/rooms/afda6ba1-efd1-4432-bd42-dd678bd4beb4");
    
    //select today for check in
    const today = new Date();
    today.setDate(today.getDate());
    let formattedDateForText = formatDateForSearch(today);
    let formattedDate = formatDateForAriaLabel(today);
    clickElementRoomsPage('#check-in');
     
    cy.wait(2000);
    selectDateInRoomPicker('.calendar-popup.s-field.s-separator.visible',formattedDate);
    verifyDateRoomsPage('#check_in-value',formattedDateForText);
 
    //select a day after 5 days for checkout
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);
    formattedDate = formatDateForAriaLabel(futureDate);
    navigateToFutureMonth(futureDate, today,'.navigate-right');
    selectDateInRoomPicker('.calendar-popup.s-field.s-separator.visible',formattedDate);
    formattedDateForText = formatDateForSearch(futureDate);
    verifyDateRoomsPage('#check_out-value',formattedDateForText);
 
    //number of adults 2
    let desiredNumberOfAdults = 2;
    incrementAdultsNumber(desiredNumberOfAdults)
    verifyAdultsNumberInIframe('#adults .value',desiredNumberOfAdults)

    //Book Now Button
    cy.get('iframe.nKphmK[title="Book a Room"]')
      .its('0.contentDocument')
      .find('#singleroom > div.widget.s-separator.s-background2.breakdown-widget > div.booknow > span > button')
      .should('be.visible')
      .trigger('mouseenter') 
      .invoke('attr', 'tooltip') 
      .should('equal', 'Please contact the hotel directly to book your room.');
     
  })

  it('Standard Room Details Test', () => {
    cy.visit(roomsPageURL);
    cy.wait(2000);

    roomButton('#content > div > div.content-body > div > ul > li:nth-child(1) > div > div.info > div.description > h3 > a > span');
    cy.url().should("equal", "https://ancabota09.wixsite.com/intern/rooms/rooms/afda6ba1-efd1-4432-bd42-dd678bd4beb4");

    //title
    verifyRoomTitle('.s-title',"Standard Suite");
    //room description
    //properties
    verifyRoomProperties('.content-block.properties.s-separator.clearfix > div > ul > li');
    //amenities
    const amenities = ["A/C", "Shower", "Bath", "TV", "Telephone"];
    verifyRoomAmenities('.content-block.amenities.s-separator.clearfix > ul > li', amenities);
    //Check In and Check Out
    verifyRoomCheckInCheckOut('.content-block.s-separator.terms.clearfix > ul > li');
    //Terms
    verifyRoomTerms('#singleroom > div.singleroom.clearfix > div:nth-child(3) > div.content-block.s-separator.tac.clearfix > ul > li:nth-child(1) > div > div');
    //policies button test
    verifyRoomPolicies('.policies');

});

it('Cottage Room Details Test', () => {
  cy.visit(roomsPageURL);
  cy.wait(2000);

  roomButton('#content > div > div.content-body > div > ul > li:nth-child(2) > div > div.info > div.description > h3 > a > span');
  cy.url().should("equal", "https://ancabota09.wixsite.com/intern/rooms/rooms/4e2820f3-0564-4bd0-9258-e7594d617297");

  //title
  verifyRoomTitle('.s-title',"Cottage");
  verifyRoomProperties('.content-block.properties.s-separator.clearfix > div > ul > li');
  const amenities = ["A/C", "Shower", "TV"];
  verifyRoomAmenities('.content-block.amenities.s-separator.clearfix > ul > li', amenities);
  verifyRoomCheckInCheckOut('.content-block.s-separator.terms.clearfix > ul > li');
  verifyRoomTerms('#singleroom > div.singleroom.clearfix > div:nth-child(3) > div.content-block.s-separator.tac.clearfix > ul > li:nth-child(1) > div > div');
  verifyRoomPolicies('.policies');

});

it.only('Clasic App Room Details Test', () => {
  cy.visit(roomsPageURL);
  cy.wait(2000);

  roomButton('#content > div > div.content-body > div > ul > li:nth-child(3) > div > div.info > div.description > h3 > a > span');
  cy.url().should("equal", "https://ancabota09.wixsite.com/intern/rooms/rooms/1739582a-003e-49e7-a9e6-b6fdb55a9027");

  //title
  verifyRoomTitle('.s-title',"Classic App");
  verifyRoomProperties('.content-block.properties.s-separator.clearfix > div > ul > li');
  const amenities = ["A/C", "TV","Minibar","Telephone","WiFi","Safe","Shower","Bath"];
  verifyRoomAmenities('.content-block.amenities.s-separator.clearfix > ul > li', amenities);
  verifyRoomCheckInCheckOut('.content-block.s-separator.terms.clearfix > ul > li');
  verifyRoomTerms('#singleroom > div.singleroom.clearfix > div:nth-child(3) > div.content-block.s-separator.tac.clearfix > ul > li:nth-child(1) > div > div');
  verifyRoomPolicies('.policies');

});




