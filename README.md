# T+ Store - Playwright QA Tests

## Overview

This project contains four automated UI tests for the T+ Store test website using Playwright and JavaScript.

## Prerequisites

-   Node.js
-   npm
    

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Run Tests

Run all tests in headless mode:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run a specific browser:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Report

After running the tests, open the Playwright HTML report:

```bash
npx playwright show-report
```

## Notes

### Playwright Configuration

I made two small changes to the default `playwright.config.js` file to make the test execution and video recording easier to follow:

-   **`workers: 1`**  
    I changed the default setting from `process.env.CI ? 1 : undefined` to `workers: 1`. This makes Playwright run the tests one at a time instead of opening all three browsers (Chromium, Firefox, and WebKit) at the same time when running in headed mode.
    
-   **`slowMo: 1000`**  
    I added `launchOptions: { slowMo: 1000 }` to slow down the browser actions. This makes the test steps easier to see in headed mode and makes the video recording clearer and easier to follow.
    

These changes were made mainly for test demonstration and video recording purposes.

### Registration Test

-   The registration test depends on the test environment's CAPTCHA and OTP behavior.
-   During testing, I found that the OTP used in the test environment is **`0000`**, which is used in the automated registration flow.