import { test, expect } from '@playwright/test';
import { SignupPage } from 'pages/signup.page.js';
import { handleConsent } from 'utils/commonHelpers.js';
import { generateTestUser, generateAccountDetails } from 'utils/testData.js';

test.describe('User Registration', () => {
  test('should register a new user successfully', async ({ page }) => {
    const user = generateTestUser();
    const email = user.email;
    const name = user.name;
    const password = user.password;
    const account = generateAccountDetails(user);

    await page.goto('/');
    await handleConsent(page);
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    const regPage = new SignupPage(page);
    await regPage.fillSignupForm(name, email);
    await regPage.submitSignup();

    await regPage.fillAccountDetails(password, account);

    await regPage.submitAccount();
    await page.getByRole('link', { name: 'Continue' }).click();

    await expect(page.getByText(`Logged in as ${name}`)).toBeVisible();

    // Cleanup
    await page.getByRole('link', { name: 'Delete Account' }).click();
    await expect(page.getByText('Account Deleted!')).toBeVisible();
  });

  test('should display error when registering with an existing email', async ({ page }) => {
    const user = generateTestUser();
    const email = user.email;
    const name = user.name;
    const password = user.password;
    const account = generateAccountDetails(user);
    
    await page.goto('/');
    await handleConsent(page);
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    const regPage = new SignupPage(page);
    await regPage.fillSignupForm(name, email);
    await regPage.submitSignup();

    await regPage.fillAccountDetails(password, account);

    await regPage.submitAccount();
    await page.getByRole('link', { name: 'Continue' }).click();

    await expect(page.getByText(`Logged in as ${name}`)).toBeVisible();
    await page.getByRole('link', { name: 'Logout' }).click();

    await regPage.goto();
    await regPage.fillSignupForm(name, email);
    await page.getByRole('button', { name: 'Signup' }).click();

    await expect(page.getByText('Email Address already exist!')).toBeVisible();
  });
});
