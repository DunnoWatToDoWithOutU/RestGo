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
    cy.wait(2000);
    cy.get('.hotel-card').within(() => {
    // Select the price element for each hotel card
    cy.get('.font-bold.text-3xl').each(($price, index, $prices) => {
      // If it's not the last price, compare with the next price
      if (index < $prices.length - 1) {
        const currentPrice = parseFloat($price.text().replace(' ฿', '').replace(',', ''));
        const nextPrice = parseFloat($prices.eq(index + 1).text().replace(' ฿', '').replace(',', ''));
        // Verify that the current price is less than or equal to the next price
        expect(currentPrice).to.be.at.most(nextPrice);
      }
    });
    });
  });

  it('Verify Price Sorting in Descending Order', () => {
    cy.contains('Price').click()
     cy.get('#sortButton').should('be.visible').click();
    cy.get('.hotel-card').each(($card, index, $list) => {
      if (index < $list.length - 1) {
        const currentPrice = parseFloat($card.find('.hotel-price').text().replace('฿', '').trim());
        const nextPrice = parseFloat($list.eq(index + 1).find('.hotel-price').text().replace('฿', '').trim());
        expect(currentPrice).to.be.at.least(nextPrice);
      }
    });
  });

  it('Verify Ratings Sorting in Ascending Order', () => {
    cy.contains('Rating').click();
    cy.get('.hotel-card').each(($card, index, $list) => {
      if (index < $list.length - 1) {
        const currentRating = parseFloat($card.find('.hotel-rating').text());
        const nextRating = parseFloat($list.eq(index + 1).find('.hotel-rating').text());
        expect(currentRating).to.be.at.most(nextRating);
      }
    });
  });

  it('Verify Ratings Sorting in Descending Order', () => {
    cy.contains('Rating').click()
    cy.get('#sortButton').should('be.visible').click();; 
    cy.get('.hotel-card').each(($card, index, $list) => {
      if (index < $list.length - 1) {
        const currentRating = parseFloat($card.find('.hotel-rating').text());
        const nextRating = parseFloat($list.eq(index + 1).find('.hotel-rating').text());
        expect(currentRating).to.be.at.least(nextRating);
      }
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
});
