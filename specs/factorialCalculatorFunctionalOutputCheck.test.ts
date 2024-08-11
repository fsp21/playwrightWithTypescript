import { test, expect } from '@playwright/test';
import * as testData from '../fixtures/factorialCalculator.json';

// *** New Test ***

test("Clicking 'Calculate!' without any inputs in text box", async ({ page }) => {
  // Navigate to the page
  await page.goto(testData.factorialPage.url);

  // Clicking "Calculate!" button to check result when no number has been passed
  await page.click('#getFactorial')

  // Check if text "Please enter an integer" appears in the div specified (id = resultDiv)
  const textLocator = page.locator('#resultDiv');
  await expect(textLocator).toBeVisible();
  const textContent = await textLocator.textContent();
  expect(textContent).toContain("Please enter an integer");
});


// *** New Test ***

test("Check if page title matches value specified in testData.json", async ({ page }) => {
  await page.goto(testData.factorialPage.url);

    // Checking if title matches value stored in testData.json file
  const pageTitle = await page.title();
  expect(pageTitle).toEqual(testData.factorialPage.expectedTitle);
});


// *** New Test ***

test('Checking API response after adding value 99999 and calculating', async ({ page }) => {
  await page.goto(testData.factorialPage.url);

    // Intercept the response
  const [response] = await Promise.all([
    page.waitForResponse(response => 
    response.url().includes('/factorial')
    ),

  // Add a value to be calculated
  await page.fill('#number', '99999'),

  // Perform the action that triggers the request, e.g., clicking a button
  page.click('#getFactorial')
  ]);

  // Check the status code of the intercepted response
  expect(response.status()).toBe(500);
});



// *** New Test ***

test('Check API response for different numbers submitted', async ({ page }) => {
  await page.goto(testData.factorialPage.url);

    // Input values and expected responses:
  const testCases = [
    { input: '1', expected: 1 },
    { input: '5', expected: 120 },
    { input: '10', expected:3628800 },
    { input: '11', expected:39916800 },
  ];

  // Naming objects in the array as 'testCase' and declaring for loop:
  for (const testCase of testCases) {

  // Wait for the API response and verify it after all steps have been completed:
  const [response] = await Promise.all([
    page.waitForResponse(response => 
      response.url().includes('/factorial')
    ),

  // Fill the textbox with the input value
  await page.fill('#number', testCase.input),

  // Click the button to trigger the API request
  await page.click('#getFactorial')]
  );
    
  // Parse the JSON response and declare expectation:
  const responseBody = await response.json();
  let finalValue = responseBody.answer;
  expect(finalValue).toEqual(testCase.expected);
  }
});



// *** New Test ***

test('Check if UI presents correct values retrieved from API', async ({ page }) => {
  await page.goto(testData.factorialPage.url);

    // Input values and expected responses:
  const testCases = ['1', '5', '10', '11'];

    // Naming objects in the array as 'numberInput' and declaring for loop with its functions:
  for (const numberInput of testCases) {
    const [response] = await Promise.all([
               page.waitForResponse(response => 
               response.url().includes('/factorial')
             ),
      page.fill('#number', numberInput),
      page.click('#getFactorial')
    ]);

  // Const and expectation declaration
    const textLocator = page.locator('#resultDiv');
    const textContent = await textLocator.textContent();
    const responseBody = await response.json();
    const finalValue = String(responseBody.answer);
    expect(textContent).toContain(finalValue);
  }
  });