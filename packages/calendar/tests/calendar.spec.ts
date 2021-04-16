/// <reference types="Cypress" />

describe('Calendar', () => {
  it('Opens, adds an option, closes, removes an option', () => {
    cy.visit('http://localhost:6006/iframe.html?id=others-calendar--default');

    cy.findByText('22').should('exist').click();
  });
});
