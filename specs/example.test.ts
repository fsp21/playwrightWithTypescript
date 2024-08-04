import { test, expect } from '@playwright/test';
import * as testData from '../fixtures/testData.json';

test('click test', async ({ page }) => {
  await page.goto(testData.exampleTestData.url);
  await page.click('#getFactorial')
  const textLocator = page.locator('#resultDiv');
  await expect(textLocator).toBeVisible();
  const textContent = await textLocator.textContent();
  expect(textContent).toContain("Please enter an integer");
})
;