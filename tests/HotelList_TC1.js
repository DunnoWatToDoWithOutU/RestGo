describe('Test Suite', () => {

  beforeEach(() => {
    cy.visit('https://rest-go.vercel.app/hotellist');
  });


  it('Verify Handling of Empty Search', () => {
    cy.get('#search-input').type('{enter}');
    cy.wait(2000);
    cy.contains('Chulalongkhorn').should('be.visible');
  });

  it('Verify Handling of Valid Search', () => {
    cy.get('#search-input').type('Chula').type('{enter}');
    cy.wait(2000);
    cy.contains('Chulalongkhorn Hotel').should('be.visible');
    cy.contains('Aukoi').should('not.exist');
  });

  it('Verify Handling of Invalid Search', () => {
    cy.get('#search-input').type('invalid query').type('{enter}');
    cy.contains('No results found').should('be.visible');
  });

  it('Verify Price Sorting in Ascending Order', () => {
    cy.contains('Price').click();
    cy.get('[data-testid=hotel-price]').then($prices => {
      const prices = $prices.map((index, elem) => Cypress.$(elem).text()).get();
      const sortedPrices = [...prices].sort((a, b) => parseFloat(a) - parseFloat(b));
      expect(prices).to.deep.equal(sortedPrices);
    });
  });

  it('Verify Price Sorting in Descending Order', () => {
    cy.contains('Price').click()
    cy.contains('#sortButton').click();
    cy.get('[data-testid=hotel-price]').then($prices => {
      const prices = $prices.map((index, elem) => Cypress.$(elem).text()).get();
      const sortedPrices = [...prices].sort((a, b) => parseFloat(b) - parseFloat(a));
      expect(prices).to.deep.equal(sortedPrices);
    });
  });

  it('Verify Ratings Sorting in Ascending Order', () => {
    cy.contains('Rating').click();
    cy.get('[data-testid=hotel-rating]').then($ratings => {
      const ratings = $ratings.map((index, elem) => parseFloat(Cypress.$(elem).attr('aria-label'))).get();
      const sortedRatings = [...ratings].sort((a, b) => a - b);
      expect(ratings).to.deep.equal(sortedRatings);
    });
  });

  it('Verify Ratings Sorting in Descending Order', () => {
    cy.contains('Rating').click()
    cy.contains('#sortButton').click();
    cy.get('[data-testid=hotel-rating]').then($ratings => {
      const ratings = $ratings.map((index, elem) => parseFloat(Cypress.$(elem).attr('aria-label'))).get();
      const sortedRatings = [...ratings].sort((a, b) => b - a);
      expect(ratings).to.deep.equal(sortedRatings);
    });
  });

  it('Normal loading time', () => {
    cy.window().then(win => {
      const startTime = Date.now();
      cy.visit('https://rest-go.vercel.app/hotellist');
      cy.window().its('performance').then(perf => {
        const loadTime = perf.timing.domContentLoadedEventEnd - perf.timing.navigationStart;
        expect(loadTime).to.be.lessThan(3000); // Adjust this value based on your acceptable loading time
      });
    });
  });

  it('Valid Data Retrieval', () => {
    cy.get('[data-testid=hotel-card]').should('exist');
  });

  it('Empty Data Retrieval', () => {
    cy.intercept('GET', 'https://rest-go.vercel.app/api/v1/hotels', { body: [] }).as('getHotels');
    cy.reload();
    cy.wait('@getHotels');
    cy.contains('No results found').should('be.visible');
  });

  it('Error in Data Retrieval', () => {
    cy.intercept('GET', 'https://rest-go.vercel.app/api/v1/hotels', { statusCode: 500 }).as('getHotels');
    cy.reload();
    cy.wait('@getHotels');
    cy.contains('Error retrieving data').should('be.visible');
  });
});
