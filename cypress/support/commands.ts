/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('signup', () => {
  // Go to sign up page
cy.visit('https://rest-go.vercel.app/auth/SignUp');

// Generate random 6-digit number
const randomNumber = Math.floor(100000 + Math.random() * 900000);

// Create email address
const email = `${randomNumber}@gmail.com`;

// Fill sign up form
cy.get('input[placeholder=""]').eq(0).type(randomNumber.toString()); // Name
cy.get('input[placeholder=""]').eq(1).type(email); // Email
cy.get('input[placeholder=""]').eq(2).type('0123456789'); // Telephone
cy.get('input[placeholder=""]').eq(3).type('123'); // Password
cy.get('input[placeholder=""]').eq(4).type('123'); // Confirm Password

  // Click Sign Up button
  cy.contains('button', 'Sign Up').click();

  // Wait for sign up completion
  cy.wait(4000); // Adjust as needed

  // Return the email address for later use
  return email;
});
