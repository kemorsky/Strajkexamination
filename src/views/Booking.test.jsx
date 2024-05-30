import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import Booking from "./Booking";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const handlers = [
  http.post(
    'https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com/',
    async ({ request }) => {
      // Read the intercepted request body as JSON
      const newBooking = await request.json();
      console.log('new Mock POST request', newBooking);

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


describe("Booking Component", () => {
    it("should let the user can make a booking request", async () => {
      render(<Booking />);
  
      // Fill in the form with test data
      fireEvent.change(screen.getByLabelText(/Date/i), {
        target: { value: "2024-05-04" },
      });
      fireEvent.change(screen.getByLabelText(/Time/i), {
        target: { value: "10:01" },
      });
      fireEvent.change(screen.getByLabelText(/Number of lanes/i), {
        target: { value: "1" },
      });
      fireEvent.change(screen.getByLabelText(/Number of awesome bowlers/i), {
        target: { value: "4" },
      });
  
      // Add shoe sizes
      fireEvent.click(screen.getByText("+"));
      fireEvent.change(screen.getByLabelText(/Shoe size \/ person 1/i), {
        target: { value: "42" },
      });
      fireEvent.click(screen.getByText("+"));
      fireEvent.change(screen.getByLabelText(/Shoe size \/ person 2/i), {
        target: { value: "43" },
      });
      fireEvent.click(screen.getByText("+"));
      fireEvent.change(screen.getByLabelText(/Shoe size \/ person 3/i), {
        target: { value: "46" },
      });
      fireEvent.click(screen.getByText("+"));
      fireEvent.change(screen.getByLabelText(/Shoe size \/ person 4/i), {
        target: { value: "48" },
      });
  
      // Submit the form
      fireEvent.click(screen.getByText(/strIIIIIike!/i));
  
      // Wait for the confirmation message to appear
      await waitFor(() => {
        // Check for the confirmation message
        expect(screen.getByText(/see you soon!/i)).toBeInTheDocument();
      });
  
      // Verify form input values in the Booking component
      expect(screen.getByDisplayValue("2024-05-28 12:00")).toBeInTheDocument();
      expect(screen.getByDisplayValue("1")).toBeInTheDocument();
      expect(screen.getByDisplayValue("4")).toBeInTheDocument();
    
      screen.debug()
      expect(screen.getByDisplayValue("STR3643ZVUZ")).toBeInTheDocument();
    });
  
  
  });