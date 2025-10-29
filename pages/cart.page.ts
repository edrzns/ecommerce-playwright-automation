import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/view_cart');
  }

  async getCartItems() {
    return await this.page.locator('.cart-item').count();
  }

  async isProductInCart(productName: string) {
    return await this.page.locator('.cart-item').filter({ hasText: productName }).isVisible();
  }

  async removeProduct(productName: string) {
    const item = this.page.locator('.cart-item').filter({ hasText: productName });
    await item.getByRole('button', { name: 'Remove' }).click();
  }
}
