import config from '../../playwright.config';

const BASE_URL = config.use?.baseURL as string;

async function createBooking(): Promise<{ token: string; bookingId: number }> {
  const token = await getToken();

  const response = await fetch(`${BASE_URL}/booking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Cookie: `token=${token}`,
    },
    body: JSON.stringify({
      firstname: 'Jim',
      lastname: 'Brown',
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-01-01',
        checkout: '2019-01-01',
      },
      additionalneeds: 'Breakfast',
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create booking: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as { bookingid?: number };

  if (typeof data.bookingid !== 'number') {
    throw new Error('Create booking response did not include bookingid');
  }

  return { token, bookingId: data.bookingid };
}

async function getBooking(bookingId: number) {
  const response = await fetch(`${BASE_URL}/booking/${bookingId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get booking: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function getToken(): Promise<string> {
  const response = await fetch(`${BASE_URL}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'admin',
      password: 'password123',
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get token: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as { token?: string };

  if (!data.token) {
    throw new Error('Authentication response did not include a token');
  }

  return data.token;
}

export { createBooking, getBooking, getToken };
