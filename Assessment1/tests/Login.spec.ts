import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login success', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('Admin', 'admin123');
  // Expect the page URL to contain the dashboard path.
  await expect(page).toHaveURL(/dashboard\/index/);
});
test('Login - Invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('Admin', 'invalidpassword');
  // Expect the page URL to contain the dashboard path.
  const errorMessage = await loginPage.getErrorMessage();
  await expect(errorMessage).toContain('Invalid credentials');
});

  // Expect the page URL to contain the dashboard path.


