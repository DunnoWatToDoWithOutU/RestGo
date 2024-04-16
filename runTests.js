const cypress = require('cypress');

async function runTests() {
  try {
    await cypress.run({
      spec: './tests/HotelList_TC1.js',
      e2e: {
        specPattern: 'HotelList_TC1.js'
      }
    });
  } catch (error) {
    console.error('Error occurred while running tests:', error);
    process.exit(1);
  }
}

runTests();
