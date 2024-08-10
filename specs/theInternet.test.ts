import { test, expect } from '@playwright/test'
import * as theInternet from "../fixtures/theInternet.json"

// *** New Test ***
test("The Internet Simple Automation", async ({ page }) => {
    
    await page.goto(theInternet.baseUrl);

    expect(page.isVisible).toBeTruthy;
    const isVisibleResult = await page.isVisible('body');
    console.log('Expected Page to be visible, output value: ' + isVisibleResult)

    const title = await page.title();

    expect(title).toBe(theInternet.title);
    console.log('Expected Page Title to be: "' + theInternet.title + '", received: "' + title + '"');
});

