/// <reference types="Cypress" />

describe('MultiSelect', () => {
  it('Opens, adds an option, closes, removes an option', () => {
    cy.visit('http://localhost:6006/iframe.html?id=forms-multiselect--default');
    cy.findByTestId('select-button').should('exist').click();
    cy.findByText('Option 3').click();
    cy.findByTestId('select-button').should('exist').click();
    cy.findByTestId('second-option-close').click();
  });

  it('Opens, adds an option, closes, removes an option', () => {
    cy.findByTestId('select-button')
      .focus()
      .trigger('keydown', { code: 'ArrowDown' })
      .trigger('keydown', { code: 'ArrowUp' });
    cy.findByText('Option 2').click();
    cy.findAllByText('Option 2').spread((...args) => {
      cy.wrap(args).should('have.length', 2);

      const [pill] = args;

      cy.wrap(pill).parent().parent().click('right');
    });
  });
});
