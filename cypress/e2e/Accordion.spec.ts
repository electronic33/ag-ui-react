/// <reference types="Cypress" />

describe("Accordion", () => {
  it("should respond to click on button with warning", () => {
    cy.visit("http://localhost:6006/iframe.html?id=accordion--default");
  });
});
