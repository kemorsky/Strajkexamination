import { http, HttpsResponse } from 'msw';

const mockResponse = { status: 'success' };

const bowlers = [
  {
    when: "2024-05-28T12:00",
    lanes: "1",
    people: "4",
    shoes: [
      "42",
      "43",
      "46",
      "48"
    ],
    price: 580,
    id: "STR3643ZVUZ",
    active: true
  }

]

export const handlers = [
  http.post('https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com/', () => {
    return  HttpsResponse.json(bowlers)
  }),

  // http.post('https://example.com/api/confirmation', () => {
  //   return HttpsResponse.json(mockResponse)
  // })
 
];
