import { test, expect } from '@playwright/test';

test.describe('User Registration', () => {
  test('should register a new user successfully', async ({ page }) => {
    const userEmail = `john.smith_${Date.now()}@example.com`;
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
    // 5. Verify 'New User Signup!' is visible
    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
    // 6. Enter name and email address
    await page.getByRole('textbox', { name: 'Name' }).fill('John Smith');
    await page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address')
      .fill(userEmail);
    // 7. Click 'Signup' button
    await page.getByRole('button', { name: 'Signup' }).click();
    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await expect(page.getByText('Enter Account Information')).toBeVisible();
    // 9. Fill details: Title, Name, Email, Password, Date of birth
    await page.getByRole('radio', { name: 'Mr.' }).check();
    await expect(page.getByRole('textbox', { name: 'Name *', exact: true })).toHaveValue(
      'John Smith'
    );
    await expect(page.getByRole('textbox', { name: 'Email *', exact: true })).toHaveValue(
      userEmail
    );
    await page.getByRole('textbox', { name: 'Password *' }).fill('welcome');
    await page.locator('#days').selectOption('9');
    await page.locator('#months').selectOption('5');
    await page.locator('#years').selectOption('1992');
    // 10. Select checkbox 'Sign up for our newsletter!'
    await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
    // 11. Select checkbox 'Receive special offers from our partners!'
    await page.getByRole('checkbox', { name: 'Receive special offers from' }).check();
    // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    await page.getByRole('textbox', { name: 'First name *' }).fill('John');
    await page.getByRole('textbox', { name: 'Last name *' }).fill('Smith');
    await page.getByRole('textbox', { name: 'Company', exact: true }).fill('The Company');
    await page
      .getByRole('textbox', { name: 'Address * (Street address, P.' })
      .fill('The Street 1-2');
    await page.getByRole('textbox', { name: 'Address 2' }).fill('The Street 2-2');
    await page.getByLabel('Country *').selectOption('Canada');
    await page.getByRole('textbox', { name: 'State *' }).fill('State');
    await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('City');
    await page.locator('#zipcode').fill('Zipcode');
    await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('+155567887');
    // 13. Click 'Create Account button'
    await page.getByRole('button', { name: 'Create Account' }).click();
    // 14. Verify that 'ACCOUNT CREATED!' is visible
    await expect(page.getByText('Account Created!')).toBeVisible();
    // 15. Click 'Continue' button
    await page.getByRole('link', { name: 'Continue' }).click();
    // 16. Verify that 'Logged in as username' is visible
    await expect(page.getByText('Logged in as John Smith')).toBeVisible();
    // 17. Click 'Delete Account' button
    await page.getByRole('link', { name: 'Delete Account' }).click();
    // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    await expect(page.getByText('Account Deleted!')).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
  });

  test('should display error when registering with an existing email', async ({ page }) => {
    // 0. Preacreate User
    const fullName = 'Test Testinsky';
    const userEmail = 'test.testinsky_20251027@example.com';
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
    // 5. Verify 'New User Signup!' is visible
    await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
    // 6. Enter name and already registered email address
    await page.getByRole('textbox', { name: 'Name' }).fill(fullName);
    await page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address')
      .fill(userEmail);
    // 7. Click 'Signup' button
    await page.getByRole('button', { name: 'Signup' }).click();
    // 8. Verify error 'Email Address already exist!' is visible
    await expect(page.getByText('Email Address already exist!')).toBeVisible();
  });
});
