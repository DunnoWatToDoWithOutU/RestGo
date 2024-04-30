/*describe('Test Suite', () => {

  beforeEach(() => {
    cy.visit('https://rest-go.vercel.app/hotellist');
  });
  //search testing
  it('TC_1_Empty search query', () => {
    cy.get('#search-input').type('{enter}');
    cy.contains('Surawong', { timeout: 10000 }).should('be.visible');
  });

  it('TC_2_Valid search query', () => {
    cy.get('#search-input').type('Surawong').type('{enter}');
    cy.contains('Surawong', { timeout: 10000 }).should('be.visible');
  });

  it('TC_3_Search query with no matching results', () => {
    cy.get('#search-input').type('ChokeDee69 Hotel').type('{enter}');
    cy.wait(5000);
    cy.get('.hotel-card').should('not.exist');
  });

  it('TC_4_Search query with special characters', () => {
    cy.get('#search-input').type('Aukoi!').type('{enter}');
    cy.contains('AuKoi', { timeout: 10000 }).should('be.visible');
  });

  it('TC_5_Search query with number', () => {
    cy.get('#search-input').type('56 Surawong').type('{enter}');   
    cy.contains('Surawong', { timeout: 10000 }).should('be.visible');
  });

  it('TC_6_Search query with mixed case', () => {
    cy.get('#search-input').type('bUaLOy').type('{enter}');
    cy.contains('Bualoy', { timeout: 10000 }).should('be.visible');
  });

  it('TC_7_earch query with leading and trailing spaces', () => {
    cy.get('#search-input').type('  surawong ').type('{enter}');
    cy.contains('Surawong', { timeout: 10000 }).should('be.visible');
  });

  it('TC_8_Search query with single character', () => {
    cy.get('#search-input').type('H').type('{enter}');
    cy.contains('H', { timeout: 10000 }).should('be.visible');
  });

  it('TC_9_Search query matching multiple results', () => {
    cy.get('#search-input').type('Surawong').type('{enter}');
    cy.contains('Every Surawong', { timeout: 10000 }).should('be.visible');
    cy.contains('The Tarntawan', { timeout: 10000 }).should('be.visible');
  });
// end of search testing

});
*/
/*describe('Notification Test', () => {

  // Log in before each test 
  beforeEach(() => {
  cy.visit('https://rest-go.vercel.app/auth/SignIn'); 

 
  cy.get('input#email') 
    .type('test12345@gmail.com');


  cy.get('input#password') 
    .type('123'); 


  cy.contains('button', 'Sign In').click();


  cy.get('button.inline-flex.w-full.justify-center.rounded-md', { timeout: 10000 }) 
  .should('be.visible') 

});
  // Notification functionality test
  it('TC_10_verifies notification dropdown and content', () => {

    cy.get('[data-testid="noti-button"]').click(); 

    cy.get('[data-testid="noti-The Rose Hotel"]') 
      .should('be.visible')

  });

  it('TC_11_verifies discount redirection', () => {

    cy.get('[data-testid="noti-button"]').click();

    cy.get('[data-testid="noti-The Rose Hotel"]').click();

    cy.url().should('include', '/hotel/'); 
    cy.get('body').should('contain.text', 'The Rose Hotel'); 
  });

  it('TC_11_Make Reservation With No Promotion', () => {

    cy.get('[data-testid="noti-button"]').click();

    cy.get('[data-testid="noti-The Rose Hotel"]').click();

    cy.get('[data-testid="promotiondropdown"]').click();

    cy.get('[data-testid="Discount-The Rose Hotel0"]').click();

    cy.get('[data-testid="totalPrice"]').should('contain.text', '1184');
  });

    it('TC_12_Make Reservation With Promotion', () => {

    cy.get('[data-testid="noti-button"]').click();

    cy.get('[data-testid="noti-The Rose Hotel"]').click();

    cy.get('[data-testid="promotiondropdown"]').click();

    cy.get('[data-testid="Discount-The Rose Hotel30"]').click();

    cy.get('[data-testid="totalPrice"').should('contain.text', '828.8');
  });

});*/

/*describe('Filter and Sorting Test', () => {
  beforeEach(() => {
    cy.visit('https://rest-go.vercel.app/hotellist');
  });

 it('Filter Hotels by Wi-Fi', () => {
  cy.contains('Wi-Fi').click();
  cy.get('.hotel-card', { timeout: 10000 }).each($hotel => {
    cy.wrap($hotel).find('#tag-wifi').should('exist');
  });
});

it('Filter Hotels by Multiple Amenities', () => {
  cy.contains('Wi-Fi').click();
  cy.contains('Pool').click();
  cy.get('.hotel-card', { timeout: 10000 }).each($hotel => {
    cy.wrap($hotel).find('#tag-wifi').should('exist');
    cy.wrap($hotel).find('#tag-pool').should('exist');
  });
});



  it('Verify Price Sorting in Ascending Order', () => {
    cy.contains('Price').click();
  cy.wait(4000);
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
  cy.wait(4000);
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
  cy.wait(4000);
  cy.get('.hotel-card').each(($card, index, $list) => {
    if (index < $list.length - 1) {
      const currentRating = parseFloat($card.find('.hotel-rating').text().trim());
      const nextRating = parseFloat($list.eq(index + 1).find('.hotel-rating').text().trim());
      expect(currentRating).to.be.at.least(nextRating);
    }
  });
});

it('Verify Ratings Sorting in Descending Order', () => {
  cy.contains('Rating').click();
  cy.get('#sortButton').should('be.visible').click();
  cy.wait(4000);
  cy.get('.hotel-card').each(($card, index, $list) => {
    if (index < $list.length - 1) {
      const currentRating = parseFloat($card.find('.hotel-rating').text().trim());
      const nextRating = parseFloat($list.eq(index + 1).find('.hotel-rating').text().trim());
      expect(currentRating).to.be.at.most(nextRating);
    }
  });
});
  
  // TC20: Ascending Location Sort (Alphabetical)
it('Sort Hotels by Ascending Location (Alphabetical)', () => {
  cy.contains('Location').click();
  cy.get('#sortButton').should('be.visible').click();
  cy.get('.hotel-card').each(($card, index, $list) => {
    if (index < $list.length - 1) {
      const currentLocation = $card.find('.hotel-address').text().trim();
      const nextLocation = $list.eq(index + 1).find('.hotel-address').text().trim();
      expect(currentLocation.localeCompare(nextLocation)).to.be.at.most(0);
    }
  });
});

// TC21: Descending Location Sort (Alphabetical)
it('Sort Hotels by Descending Location (Alphabetical)', () => {
  cy.contains('Location').click();
  cy.wait(4000);
  cy.get('.hotel-card').each(($card, index, $list) => {
    if (index < $list.length - 1) {
      const currentLocation = $card.find('.hotel-address').text().trim();
      const nextLocation = $list.eq(index + 1).find('.hotel-address').text().trim();
      expect(nextLocation.localeCompare(currentLocation)).to.be.at.most(0);
    }
  });
});

// TC22: Ascending Name Sort (Alphabetical)
it('Sort Hotels by Ascending Name (Alphabetical)', () => {
  cy.contains('Name').click();
  cy.get('#sortButton').should('be.visible').click();
  cy.get('.hotel-card').each(($card, index, $list) => {
    if (index < $list.length - 1) {
      const currentName = $card.find('.hotel-name').text().trim();
      const nextName = $list.eq(index + 1).find('.hotel-name').text().trim();
      expect(currentName.localeCompare(nextName)).to.be.at.most(0);
    }
  });
});

// TC23: Descending Name Sort (Alphabetical)
it('Sort Hotels by Descending Name (Alphabetical)', () => {
  cy.contains('Name').click();
  cy.wait(4000);
  cy.get('.hotel-card').each(($card, index, $list) => {
    if (index < $list.length - 1) {
      const currentName = $card.find('.hotel-name').text().trim();
      const nextName = $list.eq(index + 1).find('.hotel-name').text().trim();
      expect(nextName.localeCompare(currentName)).to.be.at.most(0);
    }
  });
});


// TC24: Filter Hotels by Wi-Fi, Pool, and Ascending Price Sort
it('Filter Hotels by Wi-Fi, Pool, and Ascending Price Sort', () => {
  cy.contains('Wi-Fi').click();
  cy.contains('Pool').click();
  cy.contains('Price').click();
  cy.get('#sortButton').should('be.visible').click();
  cy.wait(4000);
  cy.get('.hotel-card').each(($card, index, $list) => {
    if (index < $list.length - 1) {
      const currentPrice = parseFloat($card.find('.hotel-price').text().replace('฿', '').trim());
      const nextPrice = parseFloat($list.eq(index + 1).find('.hotel-price').text().replace('฿', '').trim());
      expect(currentPrice).to.be.at.most(nextPrice);
    }
  });
});

// TC25: Filter Hotels by Air-con, Breakfast, and Descending Rating Sort
it('Filter Hotels by Air-con, Parking, and Descending Rating Sort', () => {
  cy.contains('Air-Con').click();
  cy.contains('Parking').click();
  cy.contains('Rating').click();
  cy.get('#sortButton').should('be.visible').click();
  cy.get('.hotel-card').each(($card, index, $list) => {
    if (index < $list.length - 1) {
      const currentRating = parseFloat($card.find('.hotel-rating').text());
      const nextRating = parseFloat($list.eq(index + 1).find('.hotel-rating').text());
      expect(nextRating).to.be.at.least(currentRating);
    }
  });
});


it('Filter Hotels by Air-Con, Breakfast, Wifi, and Ascending Location Sort', () => {
  cy.contains('Air-Con').click();
  cy.contains('Breakfast').click();
  cy.contains('Wi-Fi').click();
  cy.contains('Location').click();
  cy.get('#sortButton').should('be.visible').click();
  cy.wait(4000);
  cy.get('.hotel-card').each(($card, index, $list) => {
    if (index < $list.length - 1) {
      const currentLocation = $card.find('.hotel-address').text().trim();
      const nextLocation = $list.eq(index + 1).find('.hotel-address').text().trim();
      expect(currentLocation.localeCompare(nextLocation)).to.be.at.most(0);
    }
  });
});
  
  });*/
 

describe('Review Test', () => {
  let randomNumber;

  beforeEach(() => {

    cy.visit('https://rest-go.vercel.app/auth/SignUp');

    // Generate random 6-digit number
    const randomNumber1 = Math.floor(100000 + Math.random() * 900000);

    // Create email address
    const email = `${randomNumber1}@gmail.com`;

    // Fill sign up form
    cy.get('input[placeholder=""]').eq(0).type(randomNumber1.toString()); // Name
    cy.get('input[placeholder=""]').eq(1).type(email); // Email
    cy.get('input[placeholder=""]').eq(2).type('0123456789'); // Telephone
    cy.get('input[placeholder=""]').eq(3).type('123'); // Password
    cy.get('input[placeholder=""]').eq(4).type('123'); // Confirm Password

    // Click Sign Up button
    cy.contains('button', 'Sign Up').click();

    // Wait for sign up completion
    cy.wait(4000); // Adjust as needed


    randomNumber = randomNumber1;

    cy.visit('https://rest-go.vercel.app/auth/SignIn');
    cy.get('input#email').type(email);
    cy.get('input#password').type('123');
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
    


  it('TC27 - Hotel rating of 3', () => {
  // Click on the rating input to set the rating to 3 stars
  cy.get('[data-testid="ratingInput"] label:nth-child(3)').click();

  // Click on the button to submit the review
    cy.get('[data-testid="sentButton"]').click();
    
  cy.reload();

  // Verify that the review card with the given random number is visible
  cy.get(`[data-testid="review-card-${randomNumber}"]`).should('be.visible');

  // Verify that the review rating displayed in the review card is 3
  cy.get(`[data-testid="review-rating-${randomNumber}"]`).should('contain.text', '3');
});

  it('TC28 - Input "The hotel was clean and comfortable" in the review box', () => {
  const review = "The hotel was clean and comfortable";
  cy.get('[data-testid="inputPanel"]').type(review);
  cy.get('[data-testid="sentButton"]').click();
  cy.get(`[data-testid="review-text-${randomNumber}"]`).should('contain.text', review);
  cy.get(`[data-testid="review-username-${randomNumber}"]`).should('contain.text', randomNumber);
});



  it('TC29 - Hotel rating of 3 and Input "The hotel was clean and comfortable" in the review box', () => {
  // Verify hotel rating is displayed as 3 stars
  cy.get('[data-testid="rating-stars"]').should('have.attr', 'data-rating', '3');
  const review = "The hotel was clean and comfortable";
  cy.get('[data-testid="review-input"]').type(review);
  cy.get('[data-testid="sentButton"]').click();
  cy.get(`[data-testid="review-content-${randomNumber}"]`).should('contain.text', review);
  cy.get(`[data-testid="review-username-${randomNumber}"]`).should('contain.text', randomNumber);
});

it('TC30 - Empty input in the review box', () => {
  cy.get('[data-testid="sentButton"]').click();
  cy.get('.error-message').should('contain.text', 'Please write a review before submitting.');
});

it('TC31 - Empty input in the rating box', () => {
  cy.get('[data-testid="review-input"]').type('Test review');
  cy.get('[data-testid="sentButton"]').click();
  cy.get('.error-message').should('contain.text', 'Please select a rating before submitting.');
});

it('TC32 - Both Empty input in the review box and rating box', () => {
  cy.get('[data-testid="sentButton"]').click();
  cy.get('.error-message').should('contain.text', 'Please write a review and select a rating before submitting.');
});

it('TC33 - Input a review exceeding 500 characters in the review box', () => {
  const longReview = 'a'.repeat(501);
  cy.get('[data-testid="review-input"]').type(longReview);
  cy.get('[data-testid="sentButton"]').click();
  cy.get(`[data-testid="review-content-${randomNumber}"]`).should('contain.text', longReview.slice(0, 500));
  cy.get(`[data-testid="review-username-${randomNumber}"]`).should('contain.text', randomNumber);
});

it('TC34 - Input "The hotel was great! ★★★" in the review box', () => {
  const review = 'The hotel was great! ★★★';
  cy.get('[data-testid="review-input"]').type(review);
  cy.get('[data-testid="sentButton"]').click();
  cy.get(`[data-testid="review-content-${randomNumber}"]`).should('contain.text', review);
  cy.get(`[data-testid="review-username-${randomNumber}"]`).should('contain.text', randomNumber);
});

it('TC35 - Input "5" in the review box', () => {
  const review = '5';
  cy.get('[data-testid="review-input"]').type(review);
  cy.get('[data-testid="sentButton"]').click();
  cy.get(`[data-testid="review-content-${randomNumber}"]`).should('contain.text', review);
  cy.get(`[data-testid="review-username-${randomNumber}"]`).should('contain.text', randomNumber);
});

it('TC36 - Input "The hotel was fantastic! 5 stars" in the review box', () => {
  const review = 'The hotel was fantastic! 5 stars';
  cy.get('[data-testid="review-input"]').type(review);
  cy.get('[data-testid="sentButton"]').click();
  cy.get(`[data-testid="review-content-${randomNumber}"]`).should('contain.text', review);
  cy.get(`[data-testid="review-username-${randomNumber}"]`).should('contain.text', randomNumber);
});

});
