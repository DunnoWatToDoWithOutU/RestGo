describe('Test Suite', () => {

  beforeEach(() => {
    cy.visit('https://rest-go.vercel.app/hotellist');
  });
  //search testing
  it('Empty search query', () => {
    cy.get('#search-input').type('{enter}');
    cy.wait(1000);
    cy.get('.hotel-card').should('not.exist');
  });

  it('Valid search query', () => {
    cy.get('#search-input').type('Surawong').type('{enter}');
    cy.wait(1000);
    cy.contains('Surawong').should('be.visible');
  });

  it('Search query with no matching results', () => {
    cy.get('#search-input').type('ChokeDee69 Hotel').type('{enter}');
    cy.get('.hotel-card').should('not.exist');
  });

  it('Search query with special characters', () => {
    cy.get('#search-input').type('Aukoi!').type('{enter}');
    cy.contains('AuKoi').should('be.visible');
  });

  it('Search query with number', () => {
    cy.get('#search-input').type('56 Surawong').type('{enter}');
    cy.contains('Surawong').should('be.visible');
  });

  it('Search query with mixed case', () => {
    cy.get('#search-input').type('bUaLOy').type('{enter}');
    cy.contains('Bualoy').should('be.visible');
  });

  it('Search query with leading and trailing spaces', () => {
    cy.get('#search-input').type('  hotel ').type('{enter}');
    cy.contains('Hotel').should('be.visible');
  });

  it('Search query with single character', () => {
    cy.get('#search-input').type('H').type('{enter}');
    cy.contains('H').should('be.visible');
  });

  it('Search query matching multiple results', () => {
    cy.get('#search-input').type('Surawong').type('{enter}');
    cy.contains('Every Surawong').should('be.visible');
    cy.contains('The Tarntawan').should('be.visible');
  });
// end of search testing

});

describe('Notification Test', () => {

  // Log in before each test 
  beforeEach(() => {
  cy.visit('https://rest-go.vercel.app/auth/SignIn'); 

 
  cy.get('input#email') 
    .type('test12345@gmail.com');


  cy.get('input#password') 
    .type('123'); 


  cy.contains('button', 'Sign In').click();


  cy.wait(7000);


  cy.get('button.inline-flex.w-full.justify-center.rounded-md') 
  .should('be.visible') 

});
  // Notification functionality test
  it('verifies notification dropdown and content', () => {

    cy.get('button#headlessui-menu-button\\:R1ela:').click(); 

    cy.get('.text-[0.7rem] .text-[1rem] font-bold') 
      .should('be.visible')
      .and('contain.text', 'The Rose Hotel'); 

    cy.get('.text-[0.7rem] .text-sm')
      .should('be.visible')
      .and('contain.text', 'Test Promotion2-3');

    cy.get('.text-[0.7rem] p:nth-child(3)') 
      .should('be.visible')
      .and('contain.text', 'Discount :30%');

    cy.get('.text-[0.7rem] p:nth-child(4)')
      .should('be.visible')
      .and('contain.text', 'Code : LFG6O');
  });

  it('verifies discount redirection', () => {

    cy.get('headlessui-menu-button-:R1ela:').click();

    cy.get('.text-[0.7rem] .text-[1rem] font-bold').and('contain.text', 'The Rose Hotel').click();


    cy.url().should('include', '/hotel/'); 
    cy.get('body').should('contain.text', 'The Rose Hotel'); 
  });

  it('verifies discount presence', () => {
 
   cy.get('button#headlessui-menu-button\\:R1ela:').click(); 


    cy.get('.text-[0.7rem] a').click();

    cy.get('.text-[0.7rem] p:nth-child(3)')
      .should('be.visible')
      .and('contain.text', 'Discount');

    cy.get('.text-[0.7rem] p:nth-child(3)') 
      .should('contain.text', 'Discount :30%');
  });

});

describe('Filter and Sorting Test', () => {
  beforeEach(() => {
    cy.visit('https://rest-go.vercel.app/hotellist');
  });

  it('Filter Hotels by Wi-Fi', () => {
    cy.contains('Wi-Fi').click();
    cy.get('.hotel-card').each($hotel => {
      cy.wrap($hotel).should('contain', 'Wi-Fi');
    });
  });

  it('Filter Hotels by Multiple Amenities', () => {
    cy.contains('Wi-Fi').click();
    cy.contains('Pool').click();
    cy.get('.hotel-card').each($hotel => {
      cy.wrap($hotel).should('contain', 'Wi-Fi');
      cy.wrap($hotel).should('contain', 'Pool');
    });
  });


   it('Verify Price Sorting in Ascending Order', () => {
    cy.contains('Price').click(); 
    cy.wait(2000);

    cy.get('.hotel-card').find('.text-3xl').then($prices => {
        const prices = $prices.toArray().map(price => parseInt(price.innerText.replace(' ฿', '').replace(',', '')));
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).to.deep.equal(sortedPrices);
    });
  });

  it('Verify Price Sorting in Descending Order', () => {
    cy.contains('Price').click(); 
    cy.get('#sortButton').should('be.visible').click();
    cy.wait(2000); 

    cy.get('.hotel-card').find('.text-3xl').then($prices => {
        const prices = $prices.toArray().map(price => parseInt(price.innerText.replace(' ฿', '').replace(',', '')));
        const sortedPrices = [...prices].sort((a, b) => b - a);
        expect(prices).to.deep.equal(sortedPrices);
    });
  });

   it('Verify Ratings Sorting in Ascending Order', () => {
    cy.contains('Rating').click(); 
    cy.wait(2000); 

    cy.get('.hotel-card').find('.MuiRating-root').then($ratings => {
        const ratings = $ratings.toArray().map(rating => parseFloat(rating.getAttribute('aria-label')));
        const sortedRatings = [...ratings].sort((a, b) => a - b);
        expect(ratings).to.deep.equal(sortedRatings);
    });
  });

 
  it('Verify Ratings Sorting in Descending Order', () => {
    cy.contains('Rating').click(); 
    cy.get('#sortButton').should('be.visible').click();
    cy.wait(2000);

    cy.get('.hotel-card').find('.MuiRating-root').then($ratings => {
        const ratings = $ratings.toArray().map(rating => parseFloat(rating.getAttribute('aria-label')));
        const sortedRatings = [...ratings].sort((a, b) => b - a);
        expect(ratings).to.deep.equal(sortedRatings);
    });
  });

});

describe('Review Test', () => {

  // Log in before each test
  beforeEach(() => {
    cy.visit('https://rest-go.vercel.app/auth/SignIn');

    cy.get('input#email')
      .type('test12345@gmail.com');

    cy.get('input#password')
      .type('123');

    cy.contains('button', 'Sign In').click();

    cy.wait(4000);

    cy.visit('https://rest-go.vercel.app/hotellist');

    cy.get('#search-input').type('The Rose Hotel').type('{enter}');

    cy.wait(1000);

    cy.get('.hotel-card') // Adjust selector if needed
      .contains('The Rose Hotel')
      .click();

    cy.wait(2000);

    cy.url().should('include', '/hotel/');
    cy.get('body').should('contain.text', 'The Rose Hotel');
  });

  it('verifies review', () => {
    // 1. Write with random 5 digit number review
    const randomReview = Math.floor(Math.random() * 100000).toString().padStart(5, '0'); // Generate random 5-digit string
    cy.get('.h-full.rounded-md.px-3.py-2.w-[70%].focus:outline-none') // Adjust selector if needed
      .type(randomReview);

    // 2. Submit the review
    cy.get('button.h-10.w-10.bg-cover.bg-center.hover:scale-110.transition-all.duration-200').click(); // Adjust selector if needed

    // 3. Wait for processing (modify wait time as needed)
    cy.wait(3000); // Adjust wait time based on expected processing time

    // 4. Verify the review is displayed (modify selector as needed)
    cy.get('.review-content').should('contain.text', randomReview); // Adjust selector to target the displayed review content
  });

  it('verifies review submission with empty review', () => {
    // 1. Submit the review without writing any text
    cy.get('button.h-10.w-10.bg-cover.bg-center.hover:scale-110.transition-all.duration-200').click(); // Adjust selector if needed

    // 2. Wait for processing (modify wait time as needed)
    cy.wait(3000); // Adjust wait time based on expected processing time

    // 3. Verify error message for empty review (modify selector as needed)
    cy.get('.error-message').should('contain.text', 'Please write a review before submitting.'); // Adjust selector to target the error message
  });

});
