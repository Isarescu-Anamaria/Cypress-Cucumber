import { homePage } from "../../ui-manager/ana/pages/pages";
import { openChat,verifyChatText,chatTypeMessage,clickSendButton,formIsSentBack } from "../../ui-manager/ana/helpers/functions";
import { formTypeName, formTypeEmail, formTypeMessage,clickSubmitButton } from "../../ui-manager/ana/helpers/functions";
import { formClearEmail,formClearName } from "../../ui-manager/ana/helpers/functions";
import { chatElementIsVisible, chatClickOnElement } from "../../ui-manager/ana/helpers/functions";

beforeEach(() => {
    cy.visit("/")
  })

it("Chat Button Test", () => {
    openChat()
    cy.wait(2000);
    verifyChatText('.QfkqU','Intern');
    verifyChatText('.m-WA9','Online');
})

it("Chat Send Message Test", () => {
    openChat();
    cy.wait(2000);
    chatTypeMessage('._3nFws','Test Message');
    clickSendButton('.sk1yM.S66IV');

    //verify the message was sent
    cy.get('iframe.nKphmK[title="Wix Chat"]')
        .its('0.contentDocument')
        .find('.ZCbUH.zSgqw')
        .should('be.visible')
        .should('have.text','Test Message');

})

it("Chat Auto Response Test", () => {
    openChat();
    cy.wait(2000);
    chatTypeMessage('._3nFws','Test Message');
    clickSendButton('.sk1yM.S66IV');
    cy.wait(2000);
    formIsSentBack('.zd18O');
})

it("Form Valid Data Test", () => {
    openChat();
    cy.wait(2000);
    chatTypeMessage('._3nFws','Test Message');
    clickSendButton('.sk1yM.S66IV');
    cy.wait(2000);
    formIsSentBack('.zd18O');
    //Complete the form with valid data
    formTypeName('#name','John McGinn');
    formTypeEmail('#email','johnmcginn@gmail.com');
    formTypeMessage('#message','Lorem ipsum dolor sit amet');
    //Click Submit button
    clickSubmitButton('.dUbg3');
    //Verify that the confirmation message was sent
    chatElementIsVisible('.aGtJq');
})

it("After Submission Test", () => {
    openChat();
    cy.wait(2000);
    chatTypeMessage('._3nFws','Test Message');
    clickSendButton('.sk1yM.S66IV');
    cy.wait(2000);
    formIsSentBack('.zd18O');
    //Complete the form with valid data
    formTypeName('#name','John McGinn');
    formTypeEmail('#email','johnmcginn@gmail.com');
    formTypeMessage('#message','Lorem ipsum dolor sit amet');
    //Click Submit button
    clickSubmitButton('.dUbg3');
    cy.wait(2000);
    chatTypeMessage('._3nFws','I have a problem');
    clickSendButton('.sk1yM.S66IV');
    cy.wait(2000);
    //verify the number of messages from the list is 4
    cy.get('iframe.nKphmK[title="Wix Chat"]')
        .its('0.contentDocument')
        .find('.zmP1y.undefined.chat-list-item')
        .should('have.length', 4);
})

it("No Name Data Form Test", () => {
    openChat();
    cy.wait(2000);
    chatTypeMessage('._3nFws','Test Message');
    clickSendButton('.sk1yM.S66IV');
    cy.wait(2000);
    formIsSentBack('.zd18O');
     // Clear the name field
    formClearName('#name');
    // Type the test name
    formTypeName('#name','\n');
    chatElementIsVisible('#name-error');
    
})

it("No Name Data Form Test", () => {
    openChat();
    cy.wait(2000);
    chatTypeMessage('._3nFws','Test Message');
    clickSendButton('.sk1yM.S66IV');
    cy.wait(2000);
    formIsSentBack('.zd18O');
     // Clear the name field
    formClearName('#email');
    // Type the test name
    formTypeName('#email','\n');
    chatElementIsVisible('#email-error');
})

it("Invalid Name Data Form Test", () => {
    openChat();
    cy.wait(2000);
    chatTypeMessage('._3nFws','Test Message');
    clickSendButton('.sk1yM.S66IV');
    cy.wait(2000);
    formIsSentBack('.zd18O');
    //type invalid name
     // Clear the name field
    formClearName('#name');
    // Type the test name
    formTypeName('#name','Ana1234haf  bx %417');
    chatElementIsVisible('#name-error');
    
})


it("Invalid Email Data Form Test", () => {
    openChat();
    cy.wait(2000);
    chatTypeMessage('._3nFws','Test Message');
    clickSendButton('.sk1yM.S66IV');
    cy.wait(2000);
    formIsSentBack('.zd18O');
    //type invalid name
     // Clear the name field
    formClearName('#email');
    // Type the test name
    formTypeName('#email','angdab');
    chatElementIsVisible('#email-error');
    
})

it("Emoji Message Test", () => {
    openChat();
    cy.wait(2000);
    //test emoji button is visible
    chatClickOnElement('#root > div > div > div:nth-child(2) > div > div._2Evtw > div > div.hhrXY > div.OIbFf > div > button:nth-child(2)');
    //test emoji widget is visible
    chatElementIsVisible('.uiapb');
    //click on emoji
    chatClickOnElement('#emojis-tab-content-0 > button:nth-child(1)');
    clickSendButton('.sk1yM.S66IV');
    //test emoji was sent
    cy.wait(2000);
    chatElementIsVisible('._8Wp2u');
    
})

it.only("Chat Close Button Test", () => {
    openChat()
    cy.wait(2000);
    //test chat button is displayed
    chatClickOnElement('#root > div > div > div:nth-child(2) > div > div.ZD7tN > div > button');
    //test minimized chat is displayed
    cy.get('#comp-jr4sqg2g iframe').should('be.visible');
})



