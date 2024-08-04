import { test, expect } from '@playwright/test';
import * as testData from '../fixtures/testData.json';

test("Clicking 'Calculate!' without any inputs in text box", async ({ page }) => {
  // Opening URL specified in testData.json
  await page.goto(testData.exampleTestData.url);
  
  // Clicking "Calculate!" button to check result when no number has been passed
  await page.click('#getFactorial')
  
  // Check if text "Please enter an integer" appears in the div specified (id = resultDiv)
  const textLocator = page.locator('#resultDiv');
  await expect(textLocator).toBeVisible();
  const textContent = await textLocator.textContent();
  expect(textContent).toContain("Please enter an integer");
})
;

test('Check if page title matches value specified in testData.json', async ({ page }) => {
  // Opening URL specified in testData.json
  await page.goto(testData.exampleTestData.url);
  
  // Checking if title matches value stored in testData.json file
  const pageTitle = await page.title();
  expect(pageTitle).toEqual(testData.exampleTestData.expectedTitle);
})
;