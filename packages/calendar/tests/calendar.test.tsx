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

describe('MultiSelect', () => {
  it('Opens, adds an option, closes, removes an option', () => {
    cy.visit('http://localhost:6006/iframe.html?id=others-calendar--default');

    cy.findByText('22').should('exist').click();
  });
});
