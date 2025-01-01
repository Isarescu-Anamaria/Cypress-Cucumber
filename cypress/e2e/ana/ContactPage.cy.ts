import { contactPage } from "../../ui-manager/ana/pages/pages";
import { homePage } from "../../ui-manager/ana/pages/pages";
import { typeEmailInContactForm, typeNameInContactForm, typeMessageInContactForm,typePhoneInContactForm } from "../../ui-manager/ana/helpers/functions";

const contactPageURL = "https://ancabota09.wixsite.com/intern/contact";

beforeEach(() => {
    cy.visit("/")
  })

  it("Contact Text Section Test", () => {
    cy.visit(contactPageURL)

    contactPage.title()
        .should('exist')
        .should('have.text', 'CONTACT US')
    
    contactPage.textBlock()
        .should('exist')
        .should('have.text',"If you have any questions, please contact us by telephone or email and we'll get back to you as soon as possible.\n\nWe look forward to hearing from you.\n")
  })

  it("Map Fullscreen Test", () => {
    cy.visit(contactPageURL)

    //fullscreen 
    cy.get('iframe[title="Google Maps"]').its('0.contentDocument')
        .find('#map_canvas > div > div.gm-style > div:nth-child(8) > button')
        .should('exist')
        .should('have.attr', 'aria-pressed', 'false')
        .and('have.attr', 'title', 'Toggle fullscreen view')
        .click()
        .should('have.attr', 'aria-pressed', 'true')
    
    cy.wait(2000);
    
  })

  it("Facebook Button Test", () => {
    cy.visit(contactPageURL)

    contactPage.facebookButton()
      .should("exist")
      .invoke('attr', 'href')
      .should('equal', 'http://www.facebook.com/wix')
  })

  it("X Button Test", () => {
    cy.visit(contactPageURL)

    contactPage.xButton()
      .should("be.visible")
      .invoke('attr', 'href')
      .should('equal', 'https://x.com/wix')
  })

  it("Pinterest Button Test", () => {
    cy.visit(contactPageURL)

    contactPage.pinterestButton()
      .should("be.visible")
      .invoke('attr', 'href')
      .should('equal', 'http://pinterest.com/wixcom/')
  })

  it("Verify Name Required Test", () => {
    cy.visit(contactPageURL)

    contactPage.form()
      .should('be.visible');

    contactPage.submitButton()
      .should('be.visible')
      .click();

    contactPage.nameField()
      .invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.')
  })

  it("Verify Email Required Test", () => {
    cy.visit(contactPageURL)

    contactPage.form()
      .should('be.visible');

    contactPage.submitButton()
      .should('be.visible');

    contactPage.nameField()
      .type('Ana')
      .invoke('attr','value')
      .should('equal','Ana');

    contactPage.submitButton()
      .click();
    
    contactPage.emailField()
      .invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.');

  })

  it("Verify Message Required Test", () => {
    cy.visit(contactPageURL)

    contactPage.form()
      .should('be.visible');

    contactPage.submitButton()
      .should('be.visible');

    typeNameInContactForm(contactPage.nameField, 'Ana');
    typeEmailInContactForm(contactPage.emailField,'ana@gmail.com');

    contactPage.submitButton()
      .click();
    
    contactPage.commentField()
      .invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.');

  })

  it("Verify Phone Required Test", () => {
    cy.visit(contactPageURL)

    contactPage.form()
      .should('be.visible');

    contactPage.submitButton()
      .should('be.visible');

    typeEmailInContactForm(contactPage.emailField,'ana@gmail.com');
    typeMessageInContactForm(contactPage.commentField,'Test Message');

    contactPage.submitButton()
      .click();
    
    contactPage.phoneField()
      .invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.');

  })

  it("Invalid Name Test", () => {
    cy.visit(contactPageURL)

    contactPage.form()
      .should('be.visible');

    contactPage.submitButton()
      .should('be.visible');

    typeNameInContactForm(contactPage.nameField, '12345#@!gfa');
    typeEmailInContactForm(contactPage.emailField,'ana@gmail.com');
    typePhoneInContactForm(contactPage.phoneField,'0712345678');
    typeMessageInContactForm(contactPage.commentField,'Test Message');

    contactPage.submitButton()
      .click();

    contactPage.nameField()
      .invoke('prop', 'validationMessage')
      .should('equal', 'Cannot type numbers or special characters.');
    
  })

  it("Invalid Email Test", () => {
    cy.visit(contactPageURL)

    contactPage.form()
      .should('be.visible');

    contactPage.submitButton()
      .should('be.visible');

    typeNameInContactForm(contactPage.nameField, 'Ana');
    typeEmailInContactForm(contactPage.emailField,'mailgresit');
    typePhoneInContactForm(contactPage.phoneField,'0712345678');
    typeMessageInContactForm(contactPage.commentField,'Test Message');

    contactPage.submitButton()
      .click();

    contactPage.emailField()
      .invoke('prop', 'validationMessage')
      .should('contain', "Please include an '@' in the email address.");
    
  })

  it("Invalid Email Test Again", () => {
    cy.visit(contactPageURL)

    contactPage.form()
      .should('be.visible');

    contactPage.submitButton()
      .should('be.visible');

    typeNameInContactForm(contactPage.nameField, 'Ana');
    typeEmailInContactForm(contactPage.emailField,'mailgresit@');
    typePhoneInContactForm(contactPage.phoneField,'0712345678');
    typeMessageInContactForm(contactPage.commentField,'Test Message');

    contactPage.submitButton()
      .click();

    contactPage.emailField()
      .invoke('prop', 'validationMessage')
      .should('contain', "Please enter a part following '@'.");
    
  })

  it("Invalid Email Test Again x2", () => {
    cy.visit(contactPageURL)

    contactPage.form()
      .should('be.visible');

    contactPage.submitButton()
      .should('be.visible');

    typeNameInContactForm(contactPage.nameField, 'Ana');
    typeEmailInContactForm(contactPage.emailField,'mailgresit@greseala@');
    typePhoneInContactForm(contactPage.phoneField,'0712345678');
    typeMessageInContactForm(contactPage.commentField,'Test Message');

    contactPage.submitButton()
      .click();

    contactPage.emailField()
      .invoke('prop', 'validationMessage')
      .should('contain', "A part following '@' should not contain the symbol '@'.");
    
  })

  it("Invalid Phone Test", () => {
    cy.visit(contactPageURL)

    contactPage.form()
      .should('be.visible');

    contactPage.submitButton()
      .should('be.visible');

    typeNameInContactForm(contactPage.nameField, 'Ana');
    typeEmailInContactForm(contactPage.emailField,'mail@corect.com');
    typePhoneInContactForm(contactPage.phoneField,'qwerty');
    typeMessageInContactForm(contactPage.commentField,'Test Message');

    contactPage.submitButton()
      .click();

    contactPage.phoneField()
      .invoke('prop', 'validationMessage')
      .should('equal', "Cannot type letters or special characters.");
    
  })

  it("Valid Data Test", () => {
    cy.visit(contactPageURL)

    contactPage.form()
      .should('be.visible');

    contactPage.submitButton()
      .should('be.visible');

    typeNameInContactForm(contactPage.nameField, 'Ana');
    typeEmailInContactForm(contactPage.emailField,'mail@corect.com');
    typePhoneInContactForm(contactPage.phoneField,'0725754442');
    typeMessageInContactForm(contactPage.commentField,'Test Message');

    contactPage.confirmationMessage()
      .should('not.be.visible');

    contactPage.submitButton()
      .click();

    contactPage.confirmationMessage()
      .should('be.visible')
      .should('equal','Thanks for submitting!');
    
  })

