/// <reference types="Cypress" />

describe('Calendar-range-select', () => {
  it('Selects', () => {
    cy.visit(
      'http://localhost:6006/iframe.html?id=others-calendar--range-select',
    );

    cy.findByText('22').should('exist').click();
  });
});
