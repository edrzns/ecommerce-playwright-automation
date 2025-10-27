import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page.js';
import { navigateToHome } from '../../utils/commonHelpers.js';
import { createUser } from '../../utils/userHelpers.js';

test.describe('User Authentication', () => {
  test.describe('Login', () => {
    test('should log in user with valid email and password', async ({ page }) => {
      const email = `user_${Date.now()}@test.com`;
      const password = 'Test123!';
      const name = 'John Doe';

      await createUser(page, name, email, password);
      await page.getByRole('link', { name: 'Logout' }).click();
      await navigateToHome(page);

      const loginPage = new LoginPage(page);
      await expect(page.getByRole('heading', { name: 'Features Items' })).toBeVisible();
      await page.getByRole('link', { name: 'Signup / Login' }).click();
      await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
      await loginPage.login(email, password);
      await loginPage.verifyLoginSuccess(name);

      await page.getByRole('link', { name: 'Delete Account' }).click();
      await expect(page.getByText('Account Deleted!')).toBeVisible;
      await page.getByRole('link', { name: 'Continue' }).click();
    });

    test('should show error for invalid email and password', async ({ page }) => {
      const email = `user_${Date.now()}@test.com`;
      const password = 'Test123!';
      const wrongPassword = '!321tesT'
      const name = 'John Doe';

      await createUser(page, name, email, password);
      await page.getByRole('link', { name: 'Logout' }).click();
      await navigateToHome(page);

      const loginPage = new LoginPage(page);
      await expect(page.getByRole('heading', { name: 'Features Items' })).toBeVisible();
      await page.getByRole('link', { name: 'Signup / Login' }).click();
      await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
      await loginPage.login(email, wrongPassword);
      await loginPage.verifyLoginError();
    });
  });

  test.describe('Logout', () => {
    test('should log out user successfully', async ({ page }) => {
      const email = `user_${Date.now()}@test.com`;
      const password = 'Test123!';
      const name = 'John Doe';

      await createUser(page, name, email, password);
      await page.getByRole('link', { name: 'Logout' }).click();
      await navigateToHome(page);

      const loginPage = new LoginPage(page);
      await expect(page.getByRole('heading', { name: 'Features Items' })).toBeVisible();
      await page.getByRole('link', { name: 'Signup / Login' }).click();
      await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
      await loginPage.login(email, password);
      await loginPage.verifyLoginSuccess(name);
      await page.getByRole('link', { name: 'Logout' }).click();
      await expect(page).toHaveURL('/login');
    });
  });
});
