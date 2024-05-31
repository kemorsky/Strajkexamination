import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Confirmation from "./Confirmation";

describe("Confirmation", () => {
  const mockSetConfirmation = vi.fn();
  const confirmationDetails = {
    active: true,
    when: "2024-06-12T18:00",
    people: 4,
    shoes: [
        "42",
        "43",
        "46",
        "48"
      ],
    lanes: 1,
    id: "STR3643ZVUZ",
    price: 580,
  };

  beforeEach(() => {
    render(
      <Confirmation
        confirmationDetails={confirmationDetails}
        setConfirmation={mockSetConfirmation}
      />
    );
  });

  it("should display my active booking details correctly", () => {
    expect(screen.getByLabelText(/when/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/who/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/lanes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/booking number/i)).toBeInTheDocument();
    expect(screen.getByText(/total/i)).toBeInTheDocument();
  });

  it("should call upon setConfirmation and navigate back when the Sweet, lets go! button is clicked", () => {
    const backButton = screen.getByText(/sweet, let's go!/i);
    fireEvent.click(backButton);
    expect(mockSetConfirmation).toHaveBeenCalledWith({});
  });

  it("should display inga bookning gjord! when there are no active bookings", () => {
    render(
        <Confirmation
        confirmationDetails={{...confirmationDetails, active: false }}   // confirmationDetails is an object that contains details about a booking. If active is false, no booking is active.
        setConfirmation={mockSetConfirmation}
        />
    )
    const element = screen.queryByText(/inga bokning gjord!/i);
    console.log(element);
    expect(element).toBeInTheDocument();
  });

});