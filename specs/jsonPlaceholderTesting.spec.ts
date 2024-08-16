import { test, expect } from '@playwright/test';
import * as apiTestData from '../fixtures/jsonPlaceHolder.json';
import * as jsonPlaceholderServicesBody from '../fixtures/jsonPlaceholderServicesBody.ts';

// Declare type of variable as array of objects declared in jsonPlaceholderServicesBody.ts;
type jsonFormatResponse = jsonPlaceholderServicesBody.todos[]; 

test("Practice importing and using interfaces with jsonPlaceHolder API", async ({ request }) => {

    // Make the jsonPlaceHolder API request to "todos" service 
    const response = await request.get(apiTestData.apiRequest.todosUrl);

    // Return JSON of response using the interface imported from jsonPlaceholderServicesBody.ts;
    const responseBody = await response.json() as jsonFormatResponse;

    // Somewhat random check just to ensure response had content
    expect(responseBody.length).toBeGreaterThan(0);

  });