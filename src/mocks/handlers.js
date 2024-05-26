import { https, HttpsResponse } from 'msw';

const bowlers = [
  {
    "when": "2024-05-26T12:00",
    "lanes": "1",
    "people": "2",
    "shoes": [
      "48",
      "46"
    ],
    "price": 340,
    "id": "STR7517XGYE",
    "active": true
  }
]

export const handlers = [
  // https.get('https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com/', ({request}) => {

  //   return  HttpsResponse.json(bowlers)
  // })
];
