import { test, expect } from '@playwright/test';

test('Verify valid search and selecting a monthly package', async ({ page }) => {

  // Open the main homepage and wait for the initial page to load
  await page.goto('https://stg-fe.tamatemplus.com/home', {waitUntil: 'domcontentloaded'});

  // Close the shown Ad
  await page.locator('#close').click();

  // Click the change language button 
  await page.locator('[data-test-id="language_button"]').click();

  // Choose English language
  await page.locator('[data-test-id="language_english_button"]').click();

  // Close the shown Ad again
  await page.locator('#close').click();

  // Click inside the search bar
  await page.getByRole('textbox', {name: 'Search for...'}).click();

  // Type the 'Land of Heroes' characters one by one 
  await page.getByRole('textbox', {name: 'Search for...'}).pressSequentially('Land of Heroes', {delay: 100});

  // Select the 'Land of Heroes' autocomplete option
  await page.locator('#cdk-overlay-0').getByRole('heading', {name: 'Land Of Heroes'}).click(); 

  // Verify that 'Land of Heroes' option is selected and shown correctly 
  await expect(page.getByRole('heading', {name: 'Land Of Heroes'})).toBeVisible(); 

  // Find the first exact 'Monthly Card' label and store it in a const variable
  const monthlyCard = page.getByText('Monthly Card', {exact: true}).first();

  // Verify the 'Monthly Card' label is displayed
  await expect(monthlyCard).toBeVisible();

  // Move up two parent elements from the 'Monthly Card' label
  const monthlyCardContainer = monthlyCard.locator('xpath=../..');

  // Find the direct <div> children of 'monthlyCardContainer' variable and click the second one
  await monthlyCardContainer.locator(':scope > div').nth(1).click();

  // Verify that the 'Player ID' label is shown
  await expect(page.getByText('Player ID')).toBeVisible();
  
});