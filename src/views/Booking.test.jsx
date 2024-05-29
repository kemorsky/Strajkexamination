import { screen, fireEvent, render, waitFor } from '@testing-library/react';
import Booking from './Booking';
import { expect } from 'vitest';


describe('Booking', () => {
  it('should be able to make a booking and get a total price and a booking number', async () => {

    const { container } = render(<Booking />);

        const dateInput = screen.getByTestId('input-Date');
        const timeInput = screen.getByTestId('input-Time');
        const peopleInput = screen.getByTestId('input-Number of awesome bowlers');
        const lanesInput = screen.getByTestId('input-Number of lanes');

        fireEvent.change(dateInput, { target: { value: '2024-05-31' } });
        fireEvent.change(timeInput, { target: { value: '13:00' } });
        fireEvent.change(peopleInput, { target: { value: '2' } });
        fireEvent.change(lanesInput, { target: { value: '1' } });

        const addButton = screen.getByText("+");

        fireEvent.click(addButton);
        fireEvent.click(addButton);

        await waitFor(() => {

            const shoeInput = container.querySelectorAll(".shoes__input");

            fireEvent.change(shoeInput[0], { target: { value: '42' } });
            fireEvent.change(shoeInput[1], { target: { value: '38' } });

        });

        fireEvent.click(screen.getByText('strIIIIIike!'));

        await waitFor(() => {

            expect(screen.getByText('See you soon!')).toBeInTheDocument();
            expect(screen.getByDisplayValue(/2024-05-28 12:00/i)).toBeInTheDocument();
            expect(screen.getByDisplayValue('STR3643ZVUZ')).toBeInTheDocument();
            expect(screen.getByText('580 sek')).toBeInTheDocument();
        })

screen.debug();
    });

});