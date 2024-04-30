describe('Test Suite', () => {

  beforeEach(() => {
    cy.visit('https://rest-go.vercel.app/hotellist');
  });
  //search testing
  it('TC_1_Empty search query', () => {
    cy.get('#search-input').type('{enter}');
    cy.wait(1000);
    cy.get('.hotel-card').should('not.exist');
  });

  it('TC_2_Valid search query', () => {
    cy.get('#search-input').type('Surawong').type('{enter}');
    cy.wait(1000);
    cy.contains('Surawong').should('be.visible');
  });

  it('TC_3_Search query with no matching results', () => {
    cy.get('#search-input').type('ChokeDee69 Hotel').type('{enter}');
    cy.get('.hotel-card').should('not.exist');
  });

  it('TC_4_Search query with special characters', () => {
    cy.get('#search-input').type('Aukoi!').type('{enter}');
    cy.contains('AuKoi').should('be.visible');
  });

  it('TC_5_Search query with number', () => {
    cy.get('#search-input').type('56 Surawong').type('{enter}');
    cy.contains('Surawong').should('be.visible');
  });

  it('TC_6_Search query with mixed case', () => {
    cy.get('#search-input').type('bUaLOy').type('{enter}');
    cy.contains('Bualoy').should('be.visible');
  });

  it('TC_7_earch query with leading and trailing spaces', () => {
    cy.get('#search-input').type('  surawong ').type('{enter}');
    cy.contains('Surawong').should('be.visible');
  });

  it('TC_8_Search query with single character', () => {
    cy.get('#search-input').type('H').type('{enter}');
    cy.contains('H').should('be.visible');
  });

  it('TC_9_Search query matching multiple results', () => {
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
  cy.get('.hotel-card').each(($card, index, $list) => {
    if (index < $list.length - 1) {
      const currentPrice = parseFloat($card.find('.hotel-price').text().replace(' ฿', '').trim());
      const nextPrice = parseFloat($list.eq(index + 1).find('.hotel-price').text().replace(' ฿', '').trim());
      expect(currentPrice).to.be.at.most(nextPrice);
    }
  });
});

it('Verify Price Sorting in Descending Order', () => {
  cy.contains('Price').click();
  cy.get('#sortButton').should('be.visible').click();
  cy.wait(2000);
  cy.get('.hotel-card').each(($card, index, $list) => {
    if (index < $list.length - 1) {
      const currentPrice = parseFloat($card.find('.hotel-price').text().replace(' ฿', '').trim());
      const nextPrice = parseFloat($list.eq(index + 1).find('.hotel-price').text().replace(' ฿', '').trim());
      expect(currentPrice).to.be.at.least(nextPrice);
    }
  });
});

it('Verify Ratings Sorting in Ascending Order', () => {
  cy.contains('Rating').click();
  cy.wait(2000);
  cy.get('.hotel-card').each(($card, index, $list) => {
    if (index < $list.length - 1) {
      const currentRating = parseFloat($card.find('.hotel-rating').text().trim());
      const nextRating = parseFloat($list.eq(index + 1).find('.hotel-rating').text().trim());
      expect(currentRating).to.be.at.most(nextRating);
    }
  });
});

it('Verify Ratings Sorting in Descending Order', () => {
  cy.contains('Rating').click();
  cy.get('#sortButton').should('be.visible').click();
  cy.wait(2000);
  cy.get('.hotel-card').each(($card, index, $list) => {
    if (index < $list.length - 1) {
      const currentRating = parseFloat($card.find('.hotel-rating').text().trim());
      const nextRating = parseFloat($list.eq(index + 1).find('.hotel-rating').text().trim());
      expect(currentRating).to.be.at.least(nextRating);
    }
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

    cy.get('.hotel-card') 
      .contains('The Rose Hotel')
      .click();

    cy.wait(2000);

    cy.url().should('include', '/hotel/');
    cy.get('body').should('contain.text', 'The Rose Hotel');
  });

  it('verifies review', () => {

    const randomReview = Math.floor(Math.random() * 100000).toString().padStart(5, '0'); 
    cy.get('.h-full.rounded-md.px-3.py-2.w-[70%].focus:outline-none') 
      .type(randomReview);


    cy.get('button.h-10.w-10.bg-cover.bg-center.hover:scale-110.transition-all.duration-200').click(); 

    cy.wait(3000);

    
    cy.get('.review-content').should('contain.text', randomReview); 
  });

  it('verifies review submission with empty review', () => {
  
    cy.get('button.h-10.w-10.bg-cover.bg-center.hover:scale-110.transition-all.duration-200').click();

    cy.wait(3000); 

    cy.get('.error-message').should('contain.text', 'Please write a review before submitting.'); 
  });

});
