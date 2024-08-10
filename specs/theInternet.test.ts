import { test, expect } from '@playwright/test'
import * as theInternet from "../fixtures/theInternet.json"

// *** New Test ***
test("'The Internet' website simple access and title check", async ({ page }) => {
    
    await page.goto(theInternet.baseUrl);
    const title = await page.title();
    expect(title).toBe(theInternet.title);
});

// *** New Test ***
test("Check error if 'Login' is clicked without submitting username/password", async ({ page }) => {
    
    await page.goto(theInternet.loginUrl);
    expect(await page.isVisible('#login')).toBeTruthy();

    await page.click('#login button');
    expect(await page.isVisible('#flash')).toBeTruthy();

    const alertContent = await page.locator('#flash').textContent();
    expect(alertContent).toContain('Your username is invalid!')
});

// *** New Test ***
test("Check error if 'Login' is clicked with a username but no password submitted", async ({ page }) => {
    
    await page.goto(theInternet.loginUrl);
    expect(await page.isVisible('#login')).toBeTruthy();

    await page.fill('#username', 'test');
    await page.click('#login button');
    expect(await page.isVisible('#flash')).toBeTruthy();

    const alertContent = await page.locator('#flash').textContent();
    expect(alertContent).toContain('Your username is invalid!');
});

// *** New Test ***
test("Check error if 'Login' is clicked with a password but no username submitted", async ({ page }) => {
    
    await page.goto(theInternet.loginUrl);
    expect(await page.isVisible('#login')).toBeTruthy();

    await page.fill('#password', 'test');
    await page.click('#login button');
    expect(await page.isVisible('#flash')).toBeTruthy();

    const alertContent = await page.locator('#flash').textContent();
    expect(alertContent).toContain('Your username is invalid!');
});

// *** New Test ***
test("Check message if 'Login' is clicked with correct password and username", async ({ page }) => {
    
    await page.goto(theInternet.loginUrl);
    expect(await page.isVisible('#login')).toBeTruthy();

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('#login button');
    expect(await page.isVisible('#flash')).toBeTruthy();

    const alertContent = await page.locator('#flash').textContent();
    expect(alertContent).toContain('You logged into a secure area!')
});

// *** New Test ***
test("Check flow after successful login and logout", async ({ page }) => {
    
    await page.goto(theInternet.loginUrl);
    expect(await page.isVisible('#login')).toBeTruthy();

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('#login button');
    expect(await page.isVisible('#content')).toBeTruthy();
    expect(page.url()).toBe(theInternet.secureUrl);

    await page.click('text="Logout"');
    expect(await page.isVisible('#content h2')).toBeTruthy();
    expect(page.url()).toBe(theInternet.loginUrl);

});

// *** New Test ***
test("Check services", async ({ page }) => {
    
    await page.goto(theInternet.baseUrl);
    expect(await page.isVisible('#content h2')).toBeTruthy();
    await page.click('text="Broken Images"');
    expect(await page.isVisible('#content h3')).toBeTruthy();
    expect(page.url()).toBe('https://the-internet.herokuapp.com/broken_images');
});