import { test, expect } from '@playwright/test';
import * as apiTestData from '../fixtures/catApi.json';
import * as catData from '../fixtures/catData.json';
import * as utils from '../helpers/utils.ts';

interface CatApiResponse {
    breeds: { name: string,
              temperament: string }[]; // [] at the end indicates "breeds" is an array of objects that contain name and temperament attributes
  }

  interface image {
    "id": string,
        "url": string,
        "width": number,
        "height": number };
  
  type multipleImageSearch = image[];

// *** New Test ***
test("Check if specific Cat ID returns the expected name", async ({ request }) => {

    // Make the API request
    const response = await request.get(apiTestData.apiRequest.url + catData.cats.abyssinian.id);
    expect(response.status()).toBe(200);

    // Specify properties/type expectation for TS to compile adequately
    const responseBody = await response.json() as CatApiResponse;

    // Check the name attribute specifically of the first object in the array
    expect(responseBody.breeds[0].name).toContain(catData.cats.abyssinian.name);
  });


  // *** New Test ***
test("Check if search with limit 10 return 10 objects", async ({ request }) => {
  // Import random number generator function (numbers from 1 to 10), but API only returns 1 object if limit=0 or limit=1, else returns 10
  const randomNumber = utils.rng();

  // Make the API request
  const response = await request.get(apiTestData.apiRequest.url + '/search?limit=' + randomNumber);
  expect(response.status()).toBe(200);

  // Specify properties/type expectation for TS to compile adequately
  const responseBody = await response.json() as multipleImageSearch;

  // Check if we have either 1 or 10 as length of the response
    expect(responseBody.length === 1 || responseBody.length === 10).toBeTruthy();
});
