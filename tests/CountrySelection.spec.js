import { test, expect } from '@playwright/test';

test('Verify Jordan is the default selected country', async ({ page }) => {

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

  // Verify the country dropdown is showing Jordan as the default selected option
  await expect(page.locator('#mat-select-value-3')).toContainText('Jordan');

  // Verify that Jordan flag is displayed 
  await expect(page.locator('#mat-select-value-3').getByRole('img', { name: 'Jordan' })).toBeVisible();
  
});