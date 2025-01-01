export const formatDateForAriaLabel = (date: Date): string => {
    const day = date.getDate();
    const dayName = date.toLocaleDateString('en-GB', { weekday: 'long' });
    const monthName = date.toLocaleDateString('en-GB', { month: 'long' });
    const year = date.getFullYear();
 
    return `${day}, ${dayName} ${monthName} ${year}`;
};
 
  export function selectDateInIframe(date: Date)  {
    const formattedDate = formatDateForAriaLabel(date);
    cy.get('iframe.U73P_q')
            .its('0.contentDocument')
            .find(`button[aria-label="${formattedDate}"]`)
            .click();
};

export const formatDateForSearch = (date: Date): string => {
    const day = date.getDate();
    const year = date.getFullYear(); 
    const monthMap = {
      0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun',
      6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec'
    };

    const month = monthMap[date.getMonth()]; 

    return `${day} ${month} ${year}`;
  };

  export function navigateMonthsInCalendarIframe(selector: string)  {
    
    cy.get('iframe.U73P_q')
            .its('0.contentDocument')
            .find(selector)
            .click();
};

export function navigateMonthsInCalendarInRoomsPage(selector: string)  {
    
  cy.get('iframe.nKphmK[title="Book a Room"]')
         .its('0.contentDocument')
         .find('.calendar-popup.s-field.s-separator.visible')
         .should('be.visible')
         .find(selector)
         .should('exist')
         .click();
};

export function typeEmailInContactForm(emailField: () => Cypress.Chainable, email: string) {

  emailField()
    .type(email)
    .invoke('attr', 'value')
    .should('equal', email);
}

export function typeNameInContactForm(nameField: () => Cypress.Chainable, name: string) {

  nameField()
    .type(name)
    .invoke('attr', 'value')
    .should('equal', name);
}

export function typeMessageInContactForm(nameField: () => Cypress.Chainable, message: string) {
  
  nameField()
    .type(message)
    .invoke('val')
    .should('equal', message);
}

export function typePhoneInContactForm(phoneField: () => Cypress.Chainable, phone: string) {
  
  phoneField()
      .type(phone)
      .invoke('attr','value')
      .should('equal',phone);
}

export function roomButton(selector: string)  {
  
  cy.get('iframe.nKphmK[title="Book a Room"]')
        .its('0.contentDocument')
        .find(selector)
        .should('be.visible')
        .click();
};

export function clickElementRoomsPage(selector: string)  {
  
  cy.get('iframe.nKphmK[title="Book a Room"]')
    .its('0.contentDocument')
    .find(selector)
    .click()
    
};

export function elementVisibilityRoomsPage(selector: string)  {
  
  cy.get('iframe.nKphmK[title="Book a Room"]')
    .its('0.contentDocument')
    .find(selector)
    .should('be.visible');
    
};


export function textEqualRoomsPage(selector: string, adultsNumber: string)  {
  
  cy.get('iframe.nKphmK[title="Book a Room"]')
  .its('0.contentDocument')
  .find(selector)
  .invoke('text')
  .should('equal',adultsNumber);
    
};


export function textNotEqualRoomsPage(selector: string, number: string)  {
  
  cy.get('iframe.nKphmK[title="Book a Room"]')
  .its('0.contentDocument')
  .find(selector)
  .invoke('text')
  .should('not.equal', number);
    
};

export function selectDateInRoomPicker(selector, formattedDate) {

  cy.get('iframe.nKphmK[title="Book a Room"]')
    .its('0.contentDocument')
    .find(selector)
    .should('be.visible')
    .find(`button[aria-label="${formattedDate}"]`)
    .click();
}

export function verifyDateRoomsPage(selector, expectedDate) {
  cy.get('iframe.nKphmK[title="Book a Room"]')
    .its('0.contentDocument')
    .find(selector)
    .should('have.text', expectedDate);
}

export function navigateToFutureMonth(futureDate, today, navigateSelector) {
  const monthsToClick = (futureDate.getFullYear() - today.getFullYear()) * 12 + (futureDate.getMonth() - today.getMonth()) - 1;

  for (let i = 0; i < monthsToClick; i++) {
    navigateMonthsInCalendarInRoomsPage(navigateSelector);
  }
}

export function incrementAdultsNumber(desiredNumberOfAdults) {
  let adultsNumber = 1; // Default initial number of adults

  for (let i = 1; i < desiredNumberOfAdults; i++) {
    cy.get('iframe.nKphmK[title="Book a Room"]')
      .its('0.contentDocument')
      .find('#adults > a.up')
      .click(); // Increment the number of adults by clicking the "up" button
    adultsNumber++;
  }
}

export function verifyAdultsNumberInIframe(selector, expectedNumber) {
  cy.get('iframe.nKphmK[title="Book a Room"]')
    .its('0.contentDocument')
    .find(selector)
    .invoke('text')
    .should('equal', expectedNumber.toString());
}

export function incrementKidsNumber(desiredNumberOfKids) {
  let kidsNumber = 0;
    for (let i = 1; i <= desiredNumberOfKids; i++) {
      cy.get('iframe.nKphmK[title="Book a Room"]').
        its('0.contentDocument')
        .find('#children > a.up')
        .click();
      kidsNumber++;
    }
}

export function verifyKidsNumberInIframe(selector, expectedNumber) {
  cy.get('iframe.nKphmK[title="Book a Room"]')
    .its('0.contentDocument')
    .find(selector)
    .invoke('text')
    .should('equal', expectedNumber.toString());
}

export function verifyClearButtonExists(selector) {
  //verify if clear button exists
  cy.get('iframe.nKphmK[title="Book a Room"]')
  .its('0.contentDocument')
  .find(selector)
  .should('be.visible')
  .click();
}

export function verifyErrorMessageExists(selector) {
   //error message
   cy.get('iframe.nKphmK[title="Book a Room"]')
   .its('0.contentDocument')
   .find(selector)
   .should('be.visible')
}

export function verifyTryMessageExists(selector) {
  //try another search message
  cy.get('iframe.nKphmK[title="Book a Room"]')
  .its('0.contentDocument')
  .find(selector)
  .should('be.visible')
  .should('contain.text', "We can’t seem to find what you’re looking for. Try another search.");
}

export function searchAgainButtonClick(selector) {
  cy.get('iframe.nKphmK[title="Book a Room"]')
      .its('0.contentDocument')
      .find(selector)
      .should('be.visible')
      .click();
}

export function verifyRoomTitle(selector: string, roomTitle: string) {
  cy.get('iframe.nKphmK[title="Book a Room"]')
      .its('0.contentDocument')
      .find(selector)
      .should('be.visible')
      .invoke('text')
      .then(text => text.trim()) // Trim whitespace because it contains /n
      .should('equal',roomTitle);
}

export function verifyRoomProperties(selector) {
  cy.get('iframe.nKphmK[title="Book a Room"]')
      .its('0.contentDocument')
      .find(selector)
      .should('be.visible')
      .invoke('text') 
          .then((propertiesText) => {
            const trimmedText = propertiesText.trim();
            expect(trimmedText).to.not.be.empty; 
            expect(trimmedText).to.contain("Accommodates","a room must specify the number of accomodates");
            expect(trimmedText).to.contain("Beds","a room must provide beds info");
          });
}

export function verifyRoomAmenities(selector, amenities) {
  cy.get('iframe.nKphmK[title="Book a Room"]')
  .its('0.contentDocument')
  .find(selector)
  .should('be.visible')
  .invoke('text') 
      .then((propertiesText) => {
        const trimmedText = propertiesText.trim();
        expect(trimmedText).to.not.be.empty; 
        
        amenities.forEach((amenity) => {
          expect(trimmedText).to.contain(amenity, `The room should have ${amenity}`); // Verificăm dacă fiecare amenitate există
        });
      });
}

export function verifyRoomCheckInCheckOut(selector) {
  cy.get('iframe.nKphmK[title="Book a Room"]')
      .its('0.contentDocument')
      .find(selector)
      .should('be.visible')
      .invoke('text') 
          .then((propertiesText) => {
            const trimmedText = propertiesText.trim();
            expect(trimmedText).to.not.be.empty; 
            expect(trimmedText).to.contain("Check-In",`A room should have a Check-In hour`);
            expect(trimmedText).to.contain("Check-Out",`A room should have a Check-Out hour`);
          });
}

export function verifyRoomTerms(selector) {
  cy.get('iframe.nKphmK[title="Book a Room"]')
      .its('0.contentDocument')
      .find(selector)
      .should('be.visible')
      .invoke('text') 
          .then((propertiesText) => {
            const trimmedText = propertiesText.trim();
            expect(trimmedText).to.not.be.empty; 
            expect(trimmedText).to.contain("Minimum nights","A room should have a minimim number of nights term");
            expect(trimmedText).to.contain("3","A room should have a minimim number of nights set to 3");
          });
}

export function verifyRoomPolicies(selector) {
  cy.get('iframe.nKphmK[title="Book a Room"]')
      .its('0.contentDocument')
      .find(selector)
      .should('be.visible')
      .then(($link) => {
        $link.removeAttr('target');
        cy.wrap($link).click();
        cy.wait(2000)
        cy.url().should('not.eq', 'https://ancabota09.wixsite.com/intern/rooms/rooms/afda6ba1-efd1-4432-bd42-dd678bd4beb4'); // Ensure URL has changed
        cy.url().should('include', '/terms');
    })
}

export function openChat() {
  cy.get('iframe.nKphmK[title="Wix Chat"]')
  .its('0.contentDocument')
  .find('#minimized-chat')
  .should('exist')
  .click()
}

export function verifyChatText(selector, text) {
  cy.get('iframe.nKphmK[title="Wix Chat"]')
        .its('0.contentDocument')
        .find(selector)
        .should('exist')
        .should('have.text',text);
}

export function chatTypeMessage(selector, message) {
  cy.get('iframe.nKphmK[title="Wix Chat"]')
        .its('0.contentDocument')
        .find(selector)
        .should('exist')
        .type(message);
}

export function clickSendButton(selector) {
  cy.get('iframe.nKphmK[title="Wix Chat"]')
        .its('0.contentDocument')
        .find(selector)
        .should('be.visible')
        .click();
}

export function formIsSentBack(selector) {
  cy.get('iframe.nKphmK[title="Wix Chat"]')
        .its('0.contentDocument')
        .find(selector)
        .should('be.visible')
}

export function formTypeName(selector, name) {
  cy.get('iframe.nKphmK[title="Wix Chat"]')
        .its('0.contentDocument')
        .find(selector)
        .should('exist')
        .type(name);
}

export function formTypeEmail(selector, email) {
  cy.get('iframe.nKphmK[title="Wix Chat"]')
        .its('0.contentDocument')
        .find(selector)
        .should('exist')
        .type(email);
}

export function formTypeMessage(selector, message) {
  cy.get('iframe.nKphmK[title="Wix Chat"]')
        .its('0.contentDocument')
        .find(selector)
        .should('exist')
        .type(message);
}

export function clickSubmitButton(selector) {
  cy.get('iframe.nKphmK[title="Wix Chat"]')
        .its('0.contentDocument')
        .find(selector)
        .should('be.visible')
        .click();
}

export function formClearName(selector) {
  cy.get('iframe.nKphmK[title="Wix Chat"]')
        .its('0.contentDocument')
        .find(selector)
        .should('exist')
        .clear();
}

export function formClearEmail(selector) {
  cy.get('iframe.nKphmK[title="Wix Chat"]')
        .its('0.contentDocument')
        .find(selector)
        .should('exist')
        .clear(); 
}

export function chatElementIsVisible(selector) {
  cy.get('iframe.nKphmK[title="Wix Chat"]')
        .its('0.contentDocument')
        .find(selector)
        .should('be.visible');
}

export function chatClickOnElement(selector) {
  cy.get('iframe.nKphmK[title="Wix Chat"]')
        .its('0.contentDocument')
        .find(selector)
        .should('be.visible')
        .click();
}

