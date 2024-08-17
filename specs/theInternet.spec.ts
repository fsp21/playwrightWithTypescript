import { test, expect } from '@playwright/test'
import * as theInternet from "../fixtures/theInternet.json"

test.describe('Using Base Url', async() => {
    //Navigate to the home page before each test is executed
    test.beforeEach(async({page}) => {
        await page.goto(theInternet.baseUrl);
    })

    // *** New Test ***
    test("'The Internet' website simple access and title check", async ({ page }) => {
        //Simple title check to verify if page loaded as expected
        const title = await page.title();
        expect(title).toBe(theInternet.title);
    });

    // *** New Test ***
    test("Check services", async ({ page }) => {
        //Verifying page loaded successfully and waiting for element to be visible
        expect(await page.isVisible('#content h2')).toBeTruthy();

        //Clicking one link using the text inside click method
        await page.click('text="Broken Images"');

        //Checking if element in new page is available
        expect(await page.isVisible('#content h3')).toBeTruthy();

        //Checking if the URL matches the expected redirected page's URL
        expect(page.url()).toBe('https://the-internet.herokuapp.com/broken_images');
    });

    // Click all links and check if redirection worked as expected
    test("Clicking on all pages", async ({ page })=> {

        // Declaring a constant to store an array containing all 'list items' (each link plus it's descriptive text)
        const namesOfLinks = await page.getByRole('listitem').all();


        // For loop to iterate through each element of the array
        for (const nameOfLink of namesOfLinks){

            // Navigate back to the home page after each iteration
            await page.goto(theInternet.baseUrl);
            //Store value of initial URL to compare if redirected
            const firstUrl = page.url();

            // Locating and clicking specifically the link stored in the current element in the loop
            await nameOfLink.getByRole('link').click();
            //Store value of URL after click to compare if redirected
            const secondUrl = page.url();

            // Ensuring the URLs are different
            expect(firstUrl).not.toBe(secondUrl);
            
        }
            
    });

})

test.describe('Using Login Url', async() => {

    test.beforeEach(async({page}) => {
        await page.goto(theInternet.loginUrl);
    });
    // *** New Test ***
    test("Check error if 'Login' is clicked without submitting username/password", async ({ page }) => {
        
        expect(await page.isVisible('#login')).toBeTruthy();

        await page.click('#login button');
        expect(await page.isVisible('#flash')).toBeTruthy();

        const alertContent = await page.locator('#flash').textContent();
        expect(alertContent).toContain('Your username is invalid!')
    });

    // *** New Test ***
    test("Check error if 'Login' is clicked with a username but no password submitted", async ({ page }) => {

        expect(await page.isVisible('#login')).toBeTruthy();

        await page.fill('#username', 'test');
        await page.click('#login button');
        expect(await page.isVisible('#flash')).toBeTruthy();

        const alertContent = await page.locator('#flash').textContent();
        expect(alertContent).toContain('Your username is invalid!');
    });

    // *** New Test ***
    test("Check error if 'Login' is clicked with a password but no username submitted", async ({ page }) => {

        expect(await page.isVisible('#login')).toBeTruthy();

        await page.fill('#password', 'test');
        await page.click('#login button');
        expect(await page.isVisible('#flash')).toBeTruthy();

        const alertContent = await page.locator('#flash').textContent();
        expect(alertContent).toContain('Your username is invalid!');
    });

    // *** New Test ***
    test("Check message if 'Login' is clicked with correct password and username", async ({ page }) => {
        
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
});

test.describe('Proposed ChatGPT exercises to practice', async()=> {

    test.beforeEach(async({page}) => {
        await page.goto(theInternet.baseUrl);
    })

    //___New Test
    test('Checkboxes page validation', async({ page }) => {
    
        await page.getByText('Checkboxes').click();
        await page.waitForURL(theInternet.baseUrl + '/checkboxes');

        const firstCheckbox = page.getByRole('checkbox').nth(0)
        const secondCheckbox = page.getByRole('checkbox').nth(1)

        await expect(firstCheckbox).not.toBeChecked();
        await expect(secondCheckbox).toBeChecked();

        await firstCheckbox.check();
        await secondCheckbox.uncheck();
        
        await expect(firstCheckbox).toBeChecked();
        await expect(secondCheckbox).not.toBeChecked();
    });

    test('Dropdown page validation', async({ page }) => {
    
        await page.getByText('Dropdown').click();
        await page.waitForURL(theInternet.baseUrl + '/dropdown');
        const dropdownElement = page.locator('select');

        await expect(dropdownElement).toBeVisible();
        await dropdownElement.selectOption({ label: 'Option 2' })
        await expect(page.getByText('Option 2')).toHaveAttribute('selected');

        await page.screenshot()
    
    });
})