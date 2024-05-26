import { screen, fireEvent, render } from '@testing-library/react';
import Shoes from './Shoes';
import { describe, test, expect, vi } from 'vitest'; // Importing Vitest functions

describe('Shoes', () => {
  test('it should let me choose shoe size for each player', () => {
    const updateSize = vi.fn(); // Creating a mock function using vi.fn()
    const removeShoe = vi.fn(); // Creating a mock function using vi.fn()
    const addShoe = vi.fn(); // Creating a mock function using vi.fn()
    const shoes = [{ id: 'player1', size: '' }];

    render(<Shoes updateSize={updateSize} addShoe={addShoe} removeShoe={removeShoe} shoes={shoes} />);

    const addButton = screen.getByText('+');
    fireEvent.click(addButton);

    expect(addShoe).toHaveBeenCalledTimes(1);

    const shoeInput = screen.getByLabelText('Shoe size / person 1');
    fireEvent.change(shoeInput, { target: { value: '47' } });

    expect(updateSize).toHaveBeenCalledWith(expect.any(Object)); // Replaced any(Object) with expect.any(Object)
    expect(shoeInput).toHaveValue('47'); // Fixed typo

    const removeButton = screen.getByText('-');
    fireEvent.click(removeButton);

    expect(removeShoe).toHaveBeenCalledWith('player1'); // Fixed typo
  });

  test('it should let me remove shoes if i happen to click the button one too many times', () => {
    const removeShoe = vi.fn(); // Creating a mock function using vi.fn()
    const updateSize = vi.fn()
    const addShoe = vi.fn()
    const shoes = [{ id: 'player1', size: '9' }, {id: 'player2', size: '10'}];

    render (<Shoes updateSize = {updateSize} addShoe = {addShoe} removeShoe = {removeShoe} shoes = {shoes} />)

    const removeButtons = screen.getAllByText('-')
    fireEvent.click(removeButtons[0])
    fireEvent.click(removeButtons[0])

    console.log(screen.debug());

    expect(removeShoe).toHaveBeenCalledWith(1, 'player1'); // Fixed typo
    expect(removeShoe).toHaveBeenCalledWith(2, 'player1');

    expect(removeShoe).toHaveBeenCalledTimes(2);
  })
  
});
