import { test, expect } from '@playwright/test'
import * as theInternet from "../fixtures/theInternet.json"

// *** New Test ***
test("'The Internet' website simple access and title check", async ({ page }) => {
    
    await page.goto(theInternet.baseUrl);

    expect(page.isVisible).toBeTruthy;
    const isVisibleResult = await page.isVisible('body');
    console.log('Expected Page to be visible, output value: ' + isVisibleResult)

    const title = await page.title();

    expect(title).toBe(theInternet.title);
    console.log('Expected Page Title to be: "' + theInternet.title + '", received: "' + title + '"');
});

// *** New Test ***
test("Check error if 'Login' is clicked without submitting username/password", async ({ page }) => {
    
    await page.goto(theInternet.loginUrl);
    expect(await page.isVisible('#login')).toBeTruthy();

    await page.click('#login button');
    expect(await page.isVisible('#flash')).toBeTruthy();

    const alertContent = await page.locator('#flash').textContent();
    expect(alertContent).toContain('Your username is invalid!')
    
    console.log('Content of alert banner: ' + alertContent);
});
