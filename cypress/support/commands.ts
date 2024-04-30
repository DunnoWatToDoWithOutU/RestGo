// commands.ts

/// <reference types="cypress" />

// declare module 'cypress' {
//     interface Chainable<Subject = any> {
//         signup(): Chainable<string>;
//     }
// }

// Cypress.Commands.add('signup', () => {
//     // Go to sign up page
//     cy.visit('https://rest-go.vercel.app/auth/SignUp');

//     // Generate random 6-digit number
//     const randomNumber = Math.floor(100000 + Math.random() * 900000);

//     // Create email address
//     const email = `${randomNumber}@gmail.com`;

//     // Fill sign up form
//     cy.get('input[placeholder=""]').eq(0).type(randomNumber.toString()); // Name
//     cy.get('input[placeholder=""]').eq(1).type(email); // Email
//     cy.get('input[placeholder=""]').eq(2).type('0123456789'); // Telephone
//     cy.get('input[placeholder=""]').eq(3).type('123'); // Password
//     cy.get('input[placeholder=""]').eq(4).type('123'); // Confirm Password

//     // Click Sign Up button
//     cy.contains('button', 'Sign Up').click();

//     // Wait for sign up completion
//     cy.wait(4000); // Adjust as needed

//     // Return the email address for later use
//     return email;
// });
