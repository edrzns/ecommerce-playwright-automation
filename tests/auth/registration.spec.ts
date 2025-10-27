import { test, expect } from '@playwright/test';
import { SignupPage } from 'pages/signup.page.js';
import { createUser } from 'utils/userHelpers.js';
import { handleConsent } from 'utils/commonHelpers.js';

test.describe('User Registration', () => {
  test('should register a new user successfully', async ({ page }) => {
    const email = `user_${Date.now()}@test.com`;
    const password = 'Test123!';
    const name = 'John Doe';

    await page.goto('/');
    await handleConsent(page);
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    const regPage = new SignupPage(page);
    await regPage.fillSignupForm(name, email);
    await regPage.submitSignup();

    await regPage.fillAccountDetails(password, {
      firstName: name.split(' ')[0],
      lastName: name.split(' ')[1] || 'User',
      address: '123 Test St',
      country: 'Canada',
      state: 'Ontario',
      city: 'Toronto',
      zipcode: 'M5H2N2',
      mobile: '+15551234567',
    });

    await regPage.submitAccount();
    await page.getByRole('link', { name: 'Continue' }).click();

    await expect(page.getByText(`Logged in as ${name}`)).toBeVisible();

    // Cleanup
    await page.getByRole('link', { name: 'Delete Account' }).click();
    await expect(page.getByText('Account Deleted!')).toBeVisible();
  });

  test('should display error when registering with an existing email', async ({ page }) => {
    const email = `user_${Date.now()}@test.com`;
    const password = 'Test123!';
    const name = 'John Doe';

    await page.goto('/');
    await handleConsent(page);
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    const regPage = new SignupPage(page);
    await regPage.fillSignupForm(name, email);
    await regPage.submitSignup();

    await regPage.fillAccountDetails(password, {
      firstName: name.split(' ')[0],
      lastName: name.split(' ')[1] || 'User',
      address: '123 Test St',
      country: 'Canada',
      state: 'Ontario',
      city: 'Toronto',
      zipcode: 'M5H2N2',
      mobile: '+15551234567',
    });

    await regPage.submitAccount();
    await page.getByRole('link', { name: 'Continue' }).click();

    await expect(page.getByText(`Logged in as ${name}`)).toBeVisible();

    await regPage.goto();
    await regPage.fillSignupForm(name, email);
    await page.getByRole('button', { name: 'Signup' }).click();

    await expect(page.getByText('Email Address already exist!')).toBeVisible();
  });
});
