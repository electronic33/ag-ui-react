// import React from 'react';
// import { render } from '@testing-library/react';
// import { Default } from './Calendar.stories';

// describe('Calendar', () => {
//   const { queryByText } = render(<Default />);

//   it('Should have a Su column', () => {
//     const sundayHtmlElement = queryByText('Su');

//     expect(sundayHtmlElement).not.toBeNull();
//   });
// });

/// <reference types="Cypress" />

describe('Calendar-default', () => {
  it('Selects', () => {
    cy.visit('http://localhost:6006/iframe.html?id=others-calendar--default');

    const day22Container = cy.findByText('22').should('exist').parent();
    day22Container.click();
    day22Container.should('have.class', 'selected-tiles');
    const day23Container = cy.findByText('23').should('exist').parent();
    day23Container.click();
    day23Container.should('have.class', 'selected-tiles');
    // cy.wait(500);
    const newDay22Container = cy.findByText('22').parent();
    newDay22Container.should('not.have.class', 'selected-tiles');
  });
});
