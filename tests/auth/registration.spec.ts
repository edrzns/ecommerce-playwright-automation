import { test, expect } from '@playwright/test';
import { SignupPage } from 'pages/signup.page.js';
import { createUser } from 'utils/userHelpers.js';
import { handleConsent } from 'utils/commonHelpers.js';

test.describe('User Registration', () => {
  test('should register a new user successfully', async ({ page }) => {
    const email = `user_${Date.now()}@test.com`;
    const password = 'Test123!';
    const name = 'John Doe';

    await createUser(page, name, email, password);

    const regPage = new SignupPage(page);

    await page.getByRole('link', { name: 'Delete Account' }).click();
    await expect(page.getByText('Account Deleted!')).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
  });

  test('should display error when registering with an existing email', async ({ page }) => {
    const email = `user_${Date.now()}@test.com`;
    const password = 'Test123!';
    const name = 'John Doe';

    await createUser(page, name, email, password);

    const regPage = new SignupPage(page);
    await regPage.goto();
    await regPage.fillSignupForm(name, email);
    await page.getByRole('button', { name: 'Signup' }).click();
    
    await expect(page.getByText('Email Address already exist!')).toBeVisible();
  });
});
