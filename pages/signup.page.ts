import { expect, type Locator, type Page } from '@playwright/test';

export interface AccountDetails {
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  address2?: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile: string;
  day?: string;
  month?: string;
  year?: string;
}

export class SignupPage {
  readonly page: Page;
  readonly signupName: Locator;
  readonly signupEmail: Locator;
  readonly signupButton: Locator;
  readonly submitAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.signupName = page.getByRole('textbox', { name: 'Name' });
    this.signupEmail = page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address');
    this.signupButton = page.getByRole('button', { name: 'Signup' });
    this.submitAccountButton = page.getByRole('button', { name: 'Create Account' });
  }

  async goto() {
    await this.page.goto('/signup');
  }

  async fillSignupForm(name: string, email: string) {
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
  }

  async submitSignup() {
    await this.signupButton.click();
    await expect(this.page.getByText('Enter Account Information')).toBeVisible();
  }

  async fillAccountDetails(password: string, details: AccountDetails) {
    // Title
    await this.page.getByRole('radio', { name: 'Mr.' }).check();

    // Password
    await this.page.getByRole('textbox', { name: 'Password *' }).fill(password);

    // Date of birth (use provided or defaults)
    await this.page.locator('#days').selectOption(details.day || '9');
    await this.page.locator('#months').selectOption(details.month || '5');
    await this.page.locator('#years').selectOption(details.year || '1992');

    // Checkboxes
    await this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
    await this.page.getByRole('checkbox', { name: 'Receive special offers from' }).check();

    // Address details
    await this.page.getByRole('textbox', { name: 'First name *' }).fill(details.firstName);
    await this.page.getByRole('textbox', { name: 'Last name *' }).fill(details.lastName);

    if (details.company) {
      await this.page.getByRole('textbox', { name: 'Company', exact: true }).fill(details.company);
    }

    await this.page
      .getByRole('textbox', { name: 'Address * (Street address, P.' })
      .fill(details.address);

    if (details.address2) {
      await this.page.getByRole('textbox', { name: 'Address 2' }).fill(details.address2);
    }

    await this.page.getByLabel('Country *').selectOption(details.country);
    await this.page.getByRole('textbox', { name: 'State *' }).fill(details.state);
    await this.page.getByRole('textbox', { name: 'City * Zipcode *' }).fill(details.city);
    await this.page.locator('#zipcode').fill(details.zipcode);
    await this.page.getByRole('textbox', { name: 'Mobile Number *' }).fill(details.mobile);
  }

  async submitAccount() {
    await this.submitAccountButton.click();
    await expect(this.page.getByText('Account Created!')).toBeVisible();
  }
}
