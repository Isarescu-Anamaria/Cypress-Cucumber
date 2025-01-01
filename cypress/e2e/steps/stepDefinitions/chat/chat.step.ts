import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import {chatFrame, baseUrl} from  '../../pages/ChatForm'
import { type } from 'cypress/types/jquery';
 
function getIframeBody(selector) {
    return cy
      .get(selector) 
      .scrollIntoView() 
      .its('0.contentDocument.body') // get the document of the iframe
      .should('not.be.empty') // ensure the body exists
      .then(cy.wrap); // wrap it so we can interact with it
}

function clickOnChatButton() {
  getIframeBody(chatFrame.iframeSelector)
      .find(chatFrame.chatBtn)
      .click();
}

function chatWindowIsVisible(selector) {
  getIframeBody(chatFrame.iframeSelector)
      .find(selector)
      .should('be.visible')
      .and('contain', 'Online');
}

function typeMessage(selector, message){
  getIframeBody(chatFrame.iframeSelector)
      .find(selector)
      .should('be.visible')
      .type(message);
}

function clickOnSendButton() {
  getIframeBody(chatFrame.iframeSelector)
      .find(chatFrame.sendBtn)
      .should('be.visible')
      .click();
}

function formIsSentBack(){
  getIframeBody(chatFrame.iframeSelector)
    .find(chatFrame.chatForm)
    .should('be.visible');
}

function typeName(name){
  getIframeBody(chatFrame.iframeSelector)
      .find(chatFrame.formNameField)
      .should('be.visible')
      .type(name);
}

function typeEmail(email){
  getIframeBody(chatFrame.iframeSelector)
      .find(chatFrame.formEmailField)
      .should('be.visible')
      .type(email);
}
 
Given('the Home Page is opened', ()=> {
    cy.visit(baseUrl)
    cy.wait(3000);
});
 
Given('the user sees the Chat icon', () => {
    getIframeBody(chatFrame.iframeSelector)
      .find(chatFrame.chatBtn)
      .should('be.visible');
});
 
When('the user clicks on the chat button', () => {
    clickOnChatButton();
});
 
Then('the chat window is visible', () => {
    chatWindowIsVisible(chatFrame.chatWindow);
});
 
Then('the user can see an operator online', () => {
    getIframeBody(chatFrame.iframeSelector)
      .find('.QfkqU')
      .should('contain', 'Intern');
});

Then('the user can see the textbox with the message "Write your message"', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find(chatFrame.chatTextbox)
    .should('have.attr', 'placeholder', 'Write your message...');
});

Given('the Home Page Chat is opened', ()=> {
  clickOnChatButton();
  cy.wait(3000);
  chatWindowIsVisible(chatFrame.chatWindow);
});

When('the user write a message in the given textbox', () => {
  typeMessage(chatFrame.chatTextbox,'Hello');
});

When('the user clicks on the send button', () => {
  clickOnSendButton();
});

Then('the user should see that the message was sent', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find(chatFrame.sentMessage)
    .should('be.visible')
    .should('have.text','Hello');
});

Then('the user should see that a form is sent back', () => {
  cy.wait(5000);
  formIsSentBack();
});

When('the user clicks on the emoji button in the given textbox', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find(chatFrame.emojiButton)
    .should('be.visible')
    .click();
});

When('the user chooses an emoji', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find('#emojis-tab-content-0 > button:nth-child(1)')
    .should('be.visible')
    .click();
});

Then('the user should see that the emojis was sent', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find(chatFrame.sentEmoji)
    .should('be.visible');
});

When('the user clicks on the attachment button in the given textbox', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find(chatFrame.attachmentButton)
    .should('be.visible')
    .click();
});

When('the user chooses an attachment', () => {
  getIframeBody(chatFrame.iframeSelector).then((iframeBody) => {
    cy.wrap(iframeBody)
      .find('.Ye4pj')
      .should('exist')
      .then((input) => {
        cy.wrap(input).selectFile('cypress/fixtures/hamsternou.jpg', { force: true });
      });
  });
});

Then('the user should see that the attachment was sent', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find(chatFrame.sentAttachment)
    .should('be.visible');
});

Given('the Home Page Chat form name field is visible', ()=> {
  clickOnChatButton();
  cy.wait(3000);
  chatWindowIsVisible(chatFrame.chatWindow);
  typeMessage(chatFrame.chatTextbox, 'Hello');
  clickOnSendButton();
  cy.wait(10000);
  formIsSentBack();

  getIframeBody(chatFrame.iframeSelector)
      .find(chatFrame.formNameField)
      .should('be.visible');
});

When('the user clicks on the Name field', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find(chatFrame.formNameField)
    .should('be.visible')
    .click();
});

When('the user types a single letter in the form name field', () => {
  typeName('a');
});

Then('the user should see that the name is not validated', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find('#name-valid')
    .should('not.be.visible');
});


Then('the user should see a warning message to type a correct name', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find('#name-error')
    .should('be.visible');
});


When('the user types a single number in the form name field', () => {
  typeName('8');
});

When('the user types a special character in the form name field', () => {
  typeName('$');
});

When('the user types a space character in the form name field', () => {
  typeName(' ')
});

When('the user types characters and numbers in the form name field', () => {
  typeName('dch#2453xzj');
});

When('the user types a correct name in the form name field', () => {
  typeName('Ana');
});

Then('the user should see that the name is validated', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find('#name-valid')
    .should('be.visible');
});

Given('the Home Page Chat form email field is visible', ()=> {
  clickOnChatButton();
  cy.wait(3000);
  chatWindowIsVisible(chatFrame.chatWindow);
  typeMessage(chatFrame.chatTextbox, 'Hello');
  clickOnSendButton();
  cy.wait(10000);
  formIsSentBack();

  getIframeBody(chatFrame.iframeSelector)
      .find(chatFrame.formEmailField)
      .should('be.visible');
});

When('the user clicks on the email field', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find(chatFrame.formEmailField)
    .should('be.visible')
    .click();
});

When('the user types of an email without @ in the form email field', () => {
  typeEmail('anagmail.com');
});

Then('the user should see a warning message to type a correct email address', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find('#email-error')
    .should('be.visible');
});

Then('the user should see that the email is not validated', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find('#email-valid')
    .should('not.exist');
});

When('the user types of an email with @ and without domain name in the form email field', () => {
  typeEmail('username@');
});

When('the user types an email with @ and without domain name identifier in the form name field', () => {
  typeEmail('username@domain');
});

When('the user types a correct email in the form name field', () => {
  typeEmail('username@domain.com');
});

Then('the user should see that the email is validated', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find('#email-valid')
    .should('be.visible');
});

Given('the Home Page Chat form message field is visible', ()=> {
  clickOnChatButton();
  cy.wait(3000);
  chatWindowIsVisible(chatFrame.chatWindow);
  typeMessage(chatFrame.chatTextbox, 'Hello');
  clickOnSendButton();
  cy.wait(10000);
  formIsSentBack();

  getIframeBody(chatFrame.iframeSelector)
      .find(chatFrame.formMessageField)
      .should('be.visible');
});

When('the user clicks on the message field', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find(chatFrame.formMessageField)
    .should('be.visible')
    .click();
});

When('the user types a message with less than 80 characters in the form message field', () => {
  typeMessage(chatFrame.formMessageField,"Hello! I'd like to get more information about the current offer. Thank you!");
});

Then('the user should see that the message is validated', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find('#message-valid')
    .should('be.visible');
});

When('the user types a message with more than 80 characters in the form message field', () => {
  typeMessage(chatFrame.formMessageField,"Hello! I saw your offer and would like to know more about the services included and the associated costs. I’m also interested in any available customization options. Thank you very much!");
});

Then('the user should see that the message is not validated', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find('#message-valid')
    .should('not.be.visible');
});

Given('the Home Page Chat form is visible', ()=> {
  clickOnChatButton();
  cy.wait(3000);
  chatWindowIsVisible(chatFrame.chatWindow);
  typeMessage(chatFrame.chatTextbox, 'Hello');
  clickOnSendButton();
  cy.wait(10000);
  formIsSentBack();
});

When('the user enters valid data in the form', () => {
  typeName('Ana');
  typeEmail('username@domain.com');
  typeMessage(chatFrame.formMessageField,"Hello! I'd like to get more information about the current offer. Thank you!");
});

When('the user clicks on the submit button', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find(chatFrame.submitButton)
    .should('be.visible')
    .click();
});

Then('the user should see that the form was submitted', () => {
  //Verify that the confirmation message was sent
  getIframeBody(chatFrame.iframeSelector)
    .find(chatFrame.confirmationMessage)
    .should('be.visible');
});

When('the user clicks on the exit button from the chat', () => {
  getIframeBody(chatFrame.iframeSelector)
    .find(chatFrame.closeButton)
    .should('be.visible')
    .click();
});

Then('the user should see that the chat is closed', () => {
  //test minimized chat is displayed
  cy.get('#comp-jr4sqg2g iframe')
    .should('be.visible');
});