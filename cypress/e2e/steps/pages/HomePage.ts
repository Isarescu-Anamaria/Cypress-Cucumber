export const baseUrl = "https://ancabota09.wixsite.com/intern";

export const homePage = {
    //Navbar
    roomsButton: () => cy.get("#i6kl732v2label"),
    clickOnRoomsButton: () => cy.get("#i6kl732v2label").should("be.visible").click(),
    exploreButton: () => cy.get("#i6kl732v1label"),
    contactButton: () => cy.get("#i6kl732v3label"),
    bookNowButton: () => cy.get('[data-testid="linkElement"] > .l7_2fn'),
    homeButton: () => cy.get("#i6kl732v0label"),
    pageTitleButton: () => cy.get('.font_0 > .wixui-rich-text__text'),
    //footer social media buttons
    facebookButton: () => cy.get('#i0odz-i6rlbitx > a'),
    xButton: () => cy.get('#i220sc-i6rlbitx > a'),
    pinterestButton: () => cy.get('#i3175p-i6rlbitx > a'),
    //footer buttons
    wixPageButton: () => cy.get('#i71wwqnj > p:nth-child(2) > span > a'),
    contactMailButton: () => cy.get('#i71ww6nk > p:nth-child(1) > a'),
    //Search Widget
    searchWidgetIframe: () => cy.get('#i6kppi75 > iframe'),
    calendarCheckInButton: () => cy.get('.check-in button'),

  }