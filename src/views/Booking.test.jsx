import {screen, fireEvent, render, waitFor} from '@testing-library/react'

import Booking from './Booking'

describe('Booking', () => {
    test('it should let me select date, time, and number of players', async () => {
        render(<Booking />)

        const dateInput = screen.getByLabelText('Date')
        const timeInput = screen.getByLabelText('Time')
        const playersInput = screen.getByLabelText('Number of awesome bowlers');
        const lanesInput = screen.getByLabelText('Number of lanes');
        
        fireEvent.change(dateInput, {target: { value: '2024-05-22'}})
        fireEvent.change(timeInput, { target: { value: '10:00' } });
        fireEvent.change(playersInput, { target: { value: '4' } });
        fireEvent.change(lanesInput, { target: { value: '2' } });

        await waitFor(() => {
            expect(dateInput.value).toBe('2024-05-22')
            expect(timeInput.value).toBe('10:00')
            expect(playersInput.value).toBe('4')
            expect(lanesInput.value).toBe('2')
        })

        const bookButton = screen.getByText('strIIIIIike!')
        fireEvent.click(bookButton)

        const errorMessage = screen.queryByText('Error');
        await waitFor(() => {
            expect(errorMessage).not.toBeInTheDocument()
        })
    })

})