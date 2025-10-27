import { Page, expect } from '@playwright/test';
import { SignupPage, AccountDetails } from '../pages/signup.page.js';
import { handleConsent } from '../utils/commonHelpers.js';

export async function createUser(
  page: Page,
  name: string,
  email: string,
  password: string,
  accountDetails?: Partial<AccountDetails>
) {
  await page.goto('/');
  await handleConsent(page);

  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();

  const regPage = new SignupPage(page);

  await regPage.fillSignupForm(name, email);
  await regPage.submitSignup();

  await expect(page.getByText('Enter Account Information')).toBeVisible();

  const defaultDetails = {
    firstName: name.split(' ')[0],
    lastName: name.split(' ')[1] || 'User',
    company: 'Test Company',
    address: '123 Test Street',
    address2: 'Apt 4',
    country: 'Canada',
    state: 'Ontario',
    city: 'Toronto',
    zipcode: 'M5H2N2',
    mobile: '+15551234567',
  };

  await regPage.fillAccountDetails(password, { ...defaultDetails, ...accountDetails });
  await regPage.submitAccount();

  // Wait for account creation
  await expect(page.getByText('Account Created!')).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
  await expect(page.getByText(`Logged in as ${name}`)).toBeVisible();
}
