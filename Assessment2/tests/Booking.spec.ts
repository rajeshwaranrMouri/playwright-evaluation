import { test, expect, request } from '@playwright/test';
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

test('@web Read Browser URL after token Injection', async ({ page ,context,request}) => {

await context.addCookies([
    {
      name: 'token',
      value: token,
      domain: new URL(config.use?.baseURL as string).hostname,
      path: '/',
      httpOnly: false,
      secure: false,
    },
  ]);


   await page.goto(`${config.use?.baseURL}/booking/${bookingId}`);

    const response = await request.get(
    `${config.use?.baseURL}/booking/${bookingId}`
  );

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(body.firstname).toBe('Jim');
  expect(body.lastname).toBe('Brown');
});


