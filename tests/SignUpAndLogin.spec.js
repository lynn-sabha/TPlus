import { test, expect } from '@playwright/test';

// Create a unique email each time by adding the current timestamp to the email
// and store it in a const variable
const testEmail = `testLeen${Date.now()}@gmail.com`;
// Create a fixed password and store it in a const variable
const testPassword = 'Test@1234';

// Force the first test (valid registraion test) to be executed before the second test (valid login test)
test.describe.configure({ mode: 'serial' });

test('Verify valid registration', async ({ page }) => {
  // Open the sign up using email page and wait for the initial page to load
  await page.goto('https://stg-fe.tamatemplus.com/sign-up/by/email', {waitUntil: 'domcontentloaded'});

  // Enter a valid email 
  await page.locator('[data-test-id="email"]').fill(testEmail);

  // Enter a valid password
  await page.locator('[data-test-id="password"]').fill(testPassword);
 
  // Enter a valid full name
  await page.locator('[data-test-id="full_name"]').fill('Leen test');
  
  // Check the captcha
  const captcha = page.locator('iframe[title="reCAPTCHA"]').contentFrame().locator('#recaptcha-anchor');
  await captcha.click();

  // The captcha take few seconds to be checked after clicking it, this is to make sure it's checked before proceeding 
  await expect(captcha).toHaveAttribute('aria-checked', 'true', {timeout: 70000});

  // Click the create account button
  await page.locator('[data-test-id="signup_email_submitForm"]').click();

  // Wait for the OTP fields to be shown
  await expect(page.locator('[data-test-id="fisrtOTPDigit"]')).toBeVisible();

  // Fill in the OTP four fields
  await page.locator('[data-test-id="fisrtOTPDigit"]').fill('0');
  await page.locator('[data-test-id="secondOTPDigit"]').fill('0');
  await page.locator('[data-test-id="thirdOTPDigit"]').fill('0');
  await page.locator('[data-test-id="fourthOTPDigit"]').fill('0');

  // Check the captcha and wait until it's checked 
  await captcha.click();
  await expect(captcha).toHaveAttribute('aria-checked', 'true', {timeout: 70000});

  // Click the proceed button
  await page.locator('.mdc-button__label').click();

  // Close the Ad
  await page.locator('#close').click();
  
  // Verify the first letter from the entered full name is shown
  await expect(page.getByText('L', { exact: true })).toBeVisible();
});

test('Verify valid login', async ({ page }) => {
  // Open the login page and wait for the initial page to load
  await page.goto('https://stg-fe.tamatemplus.com/login',{waitUntil: 'domcontentloaded'});

  // Enter the registered email 
  await page.locator('[data-test-id="email"]').fill(testEmail);

  // Enter the correct password
  await page.locator('[data-test-id="password"]').fill(testPassword);
 
  // Check the captcha and wait until it's checked 
  const captcha = page.locator('iframe[title="reCAPTCHA"]').contentFrame().locator('#recaptcha-anchor');
  await captcha.click();
  await expect(captcha).toHaveAttribute('aria-checked', 'true', {timeout: 70000});

  // Click the login button
  await page.locator('[data-test-id="submitForm_signin_by_email"]').click();

  // Close the Ad 
  await page.locator('#close').click();
  
  // Verify the first letter from the entered full name is shown
  await expect(page.getByText('L', { exact: true })).toBeVisible();

  // Click the first letter from the entered full name
  await page.locator('.mat-mdc-menu-trigger').click();

  // Click the profile page link 
  await page.locator('[data-test-id="user_menu_my_profile_button"]').click();

  // Verify the user info label is shown on the profile page
  await expect(page.getByText('معلومات المستخدم')).toBeVisible();

  // Verify the registered full name is shown on the profile page
  await expect(page.getByRole('textbox', {name: 'الاسم الكامل'})).toHaveValue('Leen test');
});