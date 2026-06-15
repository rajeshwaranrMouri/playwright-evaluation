import { test, expect } from '@playwright/test';
import config from '../playwright.config';
import { createBooking, getBooking } from './api-utils/apiUtils';

let bookingId: number;
let token: string;

const payload = {
  firstname: 'Jim',
  lastname: 'Brown',
};

test.beforeAll(async () => {
  const result = await createBooking();
  bookingId = result.bookingId;
  token = result.token;
});

test('@api Get Booking details', async () => {
  const booking = await getBooking(bookingId);

  expect(booking.firstname).toBe(payload.firstname);
  expect(booking.lastname).toBe(payload.lastname);
});

test('@webRead Browser URL after token Injection', async ({ page }) => {
  await page.addInitScript((authToken: string) => {
    localStorage.setItem('token', authToken);
  }, token);

  await page.route('**/booking/*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: `<html><body>${payload.firstname} ${payload.lastname}</body></html>`,
    });
  });

  await page.goto(`${config.use?.baseURL}/booking/${bookingId}`);

  await expect(page.locator('body')).toContainText(payload.firstname);
  await expect(page.evaluate(() => localStorage.getItem('token'))).resolves.toBe(token);
});


