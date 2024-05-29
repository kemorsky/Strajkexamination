import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import BookingInfo from "./BookingInfo";

describe("Bookinginfo Component", () => {
    let mockBookingDetails;
  
    beforeEach(() => {
      mockBookingDetails = vi.fn();
      render(<BookingInfo updateBookingDetails={mockBookingDetails} />);
      console.log(mockBookingDetails);
    });

    it("should book a lane at a specific time and date", async () => {
      const dateInput = screen.getByLabelText("Date");
      const timeInput = screen.getByLabelText("Time");
      const peopleInput = screen.getByLabelText("Number of awesome bowlers");
      const lanesInput = screen.getByLabelText("Number of lanes");
      console.log(mockBookingDetails);
  
      fireEvent.change(dateInput, { target: { value: "2024-06-06" } });
      fireEvent.change(timeInput, { target: { value: "12:00" } });
      fireEvent.change(peopleInput, { target: { value: "1" } });
      fireEvent.change(lanesInput, { target: { value: "1" } });
  
      expect(mockBookingDetails).toHaveBeenCalled();
      expect(dateInput.value).toBe("2024-06-06");
      expect(timeInput.value).toBe("12:00");
      expect(peopleInput.value).toBe("1");
      expect(lanesInput.value).toBe("1");

    });
  });