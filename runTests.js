const cypress = require('cypress');

async function runTests() {
  try {
    await cypress.run({
      spec: './tests/SearchTest.js',
      e2e: {
        specPattern: 'SearchTest.js'
      }
    });
  } catch (error) {
    console.error('Error occurred while running tests:', error);
    process.exit(1);
  }
}

runTests();
