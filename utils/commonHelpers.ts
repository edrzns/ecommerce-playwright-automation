import { Page } from '@playwright/test';

export async function handleConsent(page: Page) {
  try {
    const consentButton = page.getByRole('button', { name: 'Consent' });
    await consentButton.click({ timeout: 2000 });
  } catch {
    // Consent not present, continue
  }
}

export async function navigateToHome(page: Page) {
  await page.goto('/');
  await handleConsent(page);
}