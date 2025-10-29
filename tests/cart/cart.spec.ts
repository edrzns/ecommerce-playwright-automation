import { test, expect } from '@playwright/test';
import { CartPage } from '../../pages/cart.page.js';
import { navigateToHome } from 'utils/commonHelpers.js';

test.describe('Shopping Cart', () => {
  test('should add single product to cart', async ({ page }) => {
    await navigateToHome(page);

    await expect(page.getByRole('heading', { name: 'Features Items' })).toBeVisible();
    await page.getByRole('link', { name: 'Products' }).click();
    await page.locator('div').filter({ hasText: 'Blue Top' }).nth(4).hover();
    await page.getByText('Add to cart').nth(1).click();
    await page.getByRole('link', { name: 'View Cart' }).click();

    const productRows = page.getByRole('row', { name: /product image/i });
    await expect(productRows).toHaveCount(1);

    const blueRow = page.getByRole('row', { name: /blue top women/i });
    await expect(blueRow.locator('.cart_price')).toHaveText(/Rs\. 500/);
    await expect(blueRow.locator('.cart_quantity')).toHaveText('1');
    await expect(blueRow.locator('.cart_total')).toHaveText(/Rs\. 500/);
  });

  test('should add multiple products to cart', async ({ page }) => {});
  test('should remove product from cart', async ({ page }) => {});
  test('verify cart persists after logout/login', async ({ page }) => {});
});
