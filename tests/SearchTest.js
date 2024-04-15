describe('Test Suite', () => {
  it('Verify Handling of Empty Search', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#search-input').type('{enter}')
    cy.contains('No results found').should('be.visible')
  })

  it('Verify Handling of Valid Search', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#search-input').type('valid query').type('{enter}')
    cy.contains('Search results').should('be.visible')
  })

  it('Verify Handling of Invalid Search', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#search-input').type('invalid query').type('{enter}')
    cy.contains('No results found').should('be.visible')
  })
})
