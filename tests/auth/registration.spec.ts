import { test, expect } from '@playwright/test';
import { SignupPage } from 'pages/signup.page.js';
import { handleConsent } from 'utils/commonHelpers.js';
import { generateTestUser } from 'utils/testData.js';

test.describe('User Registration', () => {
  test('should register a new user successfully', async ({ page }) => {
    const user = generateTestUser();
    const email = user.email;
    const name = user.name;
    const password = user.password;

    await page.goto('/');
    await handleConsent(page);
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    const regPage = new SignupPage(page);
    await regPage.fillSignupForm(name, email);
    await regPage.submitSignup();

    await regPage.fillAccountDetails(password, {
      firstName: user.name.split(' ')[0],
      lastName: user.name.split(' ')[1] || 'User',
      address: user.address,
      country: 'Canada',
      state: user.state,
      city: user.city,
      zipcode: user.zipcode,
      mobile: user.zipcode,
    });

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
    
    await page.goto('/');
    await handleConsent(page);
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    const regPage = new SignupPage(page);
    await regPage.fillSignupForm(name, email);
    await regPage.submitSignup();

    await regPage.fillAccountDetails(password, {
      firstName: user.name.split(' ')[0],
      lastName: user.name.split(' ')[1] || 'User',
      address: user.address,
      country: 'Canada',
      state: user.state,
      city: user.city,
      zipcode: user.zipcode,
      mobile: user.zipcode,
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
