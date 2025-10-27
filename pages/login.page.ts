import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailAddress: Locator;
  readonly userPassword: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailAddress = page
      .locator('form')
      .filter({ hasText: 'Login' })
      .getByPlaceholder('Email Address');
    this.userPassword = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByText('Your email or password is');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailAddress.fill(email);
    await this.userPassword.fill(password);
    await this.loginButton.click();
  }

  async verifyLoginSuccess(username: string) {
    await expect(this.page.getByText(`Logged in as ${username}`)).toBeVisible();
  }

  async verifyLoginError() {
    await expect(this.errorMessage).toBeVisible();
  }
}
