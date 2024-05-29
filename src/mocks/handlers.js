import { http, HttpsResponse } from 'msw';
import handlers from './handlers';

const mockResponse = { status: 'success' };

const handlers = [
  http.post(
    'https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com/',
    async ({ request }) => {
      // Read the intercepted request body as JSON
      const newBooking = await request.json();
      console.log('Mock POST request body:', newBooking);

      // Return the newly created booking with a status of 201 Created
      return HttpResponse.json(
        {
          when: "2024-05-28T12:00",
          lanes: "1",
          people: "4",
          shoes: ["42", "43", "46", "48"],
          price: 580,
          id: "STR3643ZVUZ",
          active: true
        },
        { status: 201 }
      );
    }
  ),
];

// Set up the server
const server = setupServer(...handlers);

// Start server before all tests
beforeAll(() => server.listen());

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Stop server after all tests
afterAll(() => server.close());
