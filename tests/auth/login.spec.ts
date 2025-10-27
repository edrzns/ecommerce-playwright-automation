import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page.js';
import { generateTestUser } from '../../utils/testData.js';
import { createUser } from '../../utils/userHelpers.js';

test.describe('User Authentication', () => {
  let testEmail: string;
  let testPassword: string;
  let testName: string;
  test.beforeEach(async ({ page }) => {
    const user = generateTestUser();

    await createUser(page, user.name, user.email, user.password);
    await page.getByRole('link', { name: 'Logout' }).click();

    testEmail = user.email;
    testPassword = user.password;
    testName = user.name;
  });

  test.describe('Login', () => {
    test('should log in user with valid email and password', async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.login(testEmail, testPassword);
      await loginPage.verifyLoginSuccess(testName);
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
