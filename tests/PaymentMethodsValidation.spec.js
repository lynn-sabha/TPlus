import { test, expect } from '@playwright/test';

test('Verify available payment options', async ({ page }) => {

  // Open the checkout page and wait for the initial page to load
  await page.goto(
    'https://stg-fe.tamatemplus.com/checkout?item_id=PI25000615&product_id=PR25000146',
    {waitUntil: 'domcontentloaded'},
  );

  // Click the change language button 
  await page.locator('[data-test-id="language_button"]').click();

  // Choose English language
  await page.locator('[data-test-id="language_english_button"]').click();

  // Verify the T+ wallet image is displayed
  await expect(page.getByRole('img',{name: 'Tamatem-wallet'})).toBeVisible();

  // Verify the CliQ payment option and its image are displayed
  const cliq = page.locator('[title="CliQ"]');
  await expect(cliq).toBeVisible();
  await expect(cliq.locator('img')).toBeVisible();

  // Verify the Visa/Mastercard payment option and its image are displayed
  const card = page.locator('[title="Visa/MasterCard-JO-SDK"]');
  await expect(card).toBeVisible();
  await expect(card.locator('img')).toBeVisible();

});