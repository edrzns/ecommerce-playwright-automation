import { test, expect } from '@playwright/test';

test.describe('User Authentication', () => {
  test.describe('Login', () => {
    test('should log in user with valid email and password', async ({ page }) => {
      // 1. Launch browser
      // 2. Navigate to url 'http://automationexercise.com'
      // 3. Verify that home page is visible successfully
      // 4. Click on 'Signup / Login' button
      // 5. Verify 'Login to your account' is visible
      // 6. Enter correct email address and password
      // 7. Click 'login' button
      // 8. Verify that 'Logged in as username' is visible
      // 9. Click 'Delete Account' button
      // 10. Verify that 'ACCOUNT DELETED!' is visible
    });
    test('should show error for invalid email and password', async ({ page }) => {
      // 1. Launch browser
      // 2. Navigate to url 'http://automationexercise.com'
      // 3. Verify that home page is visible successfully
      // 4. Click on 'Signup / Login' button
      // 5. Verify 'Login to your account' is visible
      // 6. Enter incorrect email address and password
      // 7. Click 'login' button
      // 8. Verify error 'Your email or password is incorrect!' is visible
    });
  });

  test.describe('Logout', () => {
    test('should log out user successfully', async ({ page }) => {
      // 1. Launch browser
      // 2. Navigate to url 'http://automationexercise.com'
      // 3. Verify that home page is visible successfully
      // 4. Click on 'Signup / Login' button
      // 5. Verify 'Login to your account' is visible
      // 6. Enter correct email address and password
      // 7. Click 'login' button
      // 8. Verify that 'Logged in as username' is visible
      // 9. Click 'Logout' button
      // 10. Verify that user is navigated to login page
    });
  });
});
