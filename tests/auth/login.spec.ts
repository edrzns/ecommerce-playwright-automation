import { test, expect } from '@playwright/test';

const fullName = 'Test Testinsky';
const userEmail = 'test.testinsky_20251027@example.com';
const userPassword = 'Welcome12#';
const wrongEmail = 'jhgfdd@kjsdfs.com';
const wrongPassword = 'Pgb3EwRJQSKkMj9f';

test.describe('User Authentication', () => {
  test.describe('Login', () => {
    test('should log in user with valid email and password', async ({ page }) => {
      // 1. Launch browser
      // 2. Navigate to url 'http://automationexercise.com'
      await page.goto('/');
      // 2.1 If cookies/consent appear handle it
      try {
        const consentButton = page.getByRole('button', { name: 'Consent' });
        if (await consentButton.isVisible()) await consentButton.click();
      } catch {}
      // 3. Verify that home page is visible successfully
      await expect(page.getByRole('heading', { name: 'Features Items' })).toBeVisible();
      // 4. Click on 'Signup / Login' button
      await page.getByRole('link', { name: 'Signup / Login' }).click();
      // 5. Verify 'Login to your account' is visible
      await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
      // 6. Enter correct email address and password
      await page
        .locator('form')
        .filter({ hasText: 'Login' })
        .getByPlaceholder('Email Address')
        .fill(userEmail);
      await page.getByRole('textbox', { name: 'Password' }).fill(userPassword);
      // 7. Click 'login' button
      await page.getByRole('button', { name: 'Login' }).click();
      // 8. Verify that 'Logged in as username' is visible
      await expect(page.getByText(`Logged in as ${fullName}`)).toBeVisible();
      // 9. Click 'Delete Account' button
      // await page.getByRole('link', { name: 'Delete Account' }).click();
      // 10. Verify that 'ACCOUNT DELETED!' is visible
      // await expect(page.getByText('Account Deleted!')).toBeVisible;
      // await page.getByRole('link', { name: 'Continue' }).click();
    });

    test('should show error for invalid email and password', async ({ page }) => {
      // 1. Launch browser
      // 2. Navigate to url 'http://automationexercise.com'
      await page.goto('/');
      // 2.1 If cookies/consent appear handle it
      try {
        const consentButton = page.getByRole('button', { name: 'Consent' });
        if (await consentButton.isVisible()) await consentButton.click();
      } catch {}
      // 3. Verify that home page is visible successfully
      await expect(page.getByRole('heading', { name: 'Features Items' })).toBeVisible();
      // 4. Click on 'Signup / Login' button
      await page.getByRole('link', { name: 'Signup / Login' }).click();
      // 5. Verify 'Login to your account' is visible
      await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
      // 6. Enter incorrect email address and password
      await page
        .locator('form')
        .filter({ hasText: 'Login' })
        .getByPlaceholder('Email Address')
        .fill(wrongEmail);
      await page.getByRole('textbox', { name: 'Password' }).fill(wrongPassword);
      // 7. Click 'login' button
      await page.getByRole('button', { name: 'Login' }).click();
      // 8. Verify error 'Your email or password is incorrect!' is visible
      await expect(page.getByText('Your email or password is')).toBeVisible();
    });
  });

  test.describe('Logout', () => {
    test('should log out user successfully', async ({ page }) => {
      // 1. Launch browser
      // 2. Navigate to url 'http://automationexercise.com'
      await page.goto('/');
      // 2.1 If cookies/consent appear handle it
      try {
        const consentButton = page.getByRole('button', { name: 'Consent' });
        if (await consentButton.isVisible()) await consentButton.click();
      } catch {}
      // 3. Verify that home page is visible successfully
      await expect(page.getByRole('heading', { name: 'Features Items' })).toBeVisible();
      // 4. Click on 'Signup / Login' button
      await page.getByRole('link', { name: 'Signup / Login' }).click();
      // 5. Verify 'Login to your account' is visible
      await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
      // 6. Enter correct email address and password
      await page
        .locator('form')
        .filter({ hasText: 'Login' })
        .getByPlaceholder('Email Address')
        .fill(userEmail);
      await page.getByRole('textbox', { name: 'Password' }).fill(userPassword);
      // 7. Click 'login' button
      await page.getByRole('button', { name: 'Login' }).click();
      // 8. Verify that 'Logged in as username' is visible
      await expect(page.getByText(`Logged in as ${fullName}`)).toBeVisible();
      // 9. Click 'Logout' button
      await page.getByRole('link', { name: 'Logout' }).click();
      // 10. Verify that user is navigated to login page
      await expect(page).toHaveURL('/login');
    });
  });
});
