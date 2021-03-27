/// <reference types="Cypress" />

describe('Accordion', () => {
  it('should respond to click on button with warning', () => {
    cy.visit(
      'http://localhost:6006/iframe.html?id=disclosure-accordion--default',
    );

    const accordion = cy.findByText('Open me!');

    accordion.should('exist');
  });
});
