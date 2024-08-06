import { test, expect } from '@playwright/test';
import * as apiTestData from '../fixtures/catApi.json';

interface CatApiResponse {
    breeds: { name: string,
              temperament: string }[]; // [] at the end indicates "breeds" is an array of objects that contain name and temperament attributes
  }

// *** New Test ***
test("Check if specific Cat ID returns the expected name", async ({ request }) => {

    // Make the API request
    const response = await request.get(apiTestData.payload.url);
    expect(response.status()).toBe(200);

    // Specify properties/type expectation for TS to compile adequately
    const responseBody = await response.json() as CatApiResponse;

    // Check the name attribute specifically of the first object in the array
    expect(responseBody.breeds[0].name).toContain("Abyssinian");
  });