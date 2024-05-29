// src/setupTest.js
import { Response, Request, Headers } from 'node-fetch';
import fetch from "node-fetch";
import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

global.Response = Response;
global.Request = Request;
global.Headers = Headers;
global.fetch = fetch;

afterEach(() => {
  cleanup();
});

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);