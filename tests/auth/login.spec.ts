import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page.js';
import { navigateToHome } from '../../utils/commonHelpers.js';
import { createUser } from '../../utils/userHelpers.js';

test.describe('User Authentication', () => {
  let testEmail: string;
  let testPassword: string;
  let testName: string;
  test.beforeEach(async ({ page }) => {
    // Create unique user for each test
    testEmail = `user_${Date.now()}@test.com`;
    testPassword = 'Test123!';
    testName = 'John Doe';

    await createUser(page, testName, testEmail, testPassword);
    await page.getByRole('link', { name: 'Logout' }).click();

    // Now every test starts on /login page with a fresh user
  });
  test.describe('Login', () => {
    test('should log in user with valid email and password', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.login(testEmail, testPassword);
      await loginPage.verifyLoginSuccess(testName);

      // await page.getByRole('link', { name: 'Delete Account' }).click();
      // await expect(page.getByText('Account Deleted!')).toBeVisible;
      // await page.getByRole('link', { name: 'Continue' }).click();
    });

    test('should show error for invalid email and password', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.login(testEmail, 'WrongPassword123!');
      await loginPage.verifyLoginError();
    });
  });

  test.describe('Logout', () => {
    test('should log out user successfully', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.login(testEmail, testPassword);
      await loginPage.verifyLoginSuccess(testName);
      await page.getByRole('link', { name: 'Logout' }).click();
      await expect(page).toHaveURL('/login');
    });
  });
});
