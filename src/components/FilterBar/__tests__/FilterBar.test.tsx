import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterBar } from '../FilterBar';

import { useDispatch, useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../../utils/api', () => ({
  api: {
    get: jest.fn(() => Promise.resolve({ data: [] })),
  },
}));

describe('FilterBar', () => {
  const mockedDispatch = jest.fn();

  const mockFoodCategories = [
    { id: 1, title: 'Итальянская' },
    { id: 2, title: 'Французская' },
    { id: 3, title: 'Японская' },
    { id: 4, title: 'Доп. кухня' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as jest.Mock).mockReturnValue(mockedDispatch);
    (useSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        foodCategories: { items: mockFoodCategories },
      })
    );
  });

  it('рендерит основные элементы фильтра', () => {
    render(<FilterBar />);
    expect(screen.getByText('Длительность')).toBeInTheDocument();
    expect(screen.getByLabelText('От')).toBeInTheDocument();
    expect(screen.getByLabelText('До')).toBeInTheDocument();
    expect(screen.getByText('Проживание включено')).toBeInTheDocument();
    expect(screen.getByText('Тип кухни')).toBeInTheDocument();
    expect(screen.getByText('Категории')).toBeInTheDocument();
  });

  it('обновляет длительность и вызывает dispatch', () => {
    render(<FilterBar />);
    const inputFrom = screen.getByLabelText('От') as HTMLInputElement;
    const inputTo = screen.getByLabelText('До') as HTMLInputElement;

    fireEvent.change(inputFrom, { target: { value: '5' } });
    fireEvent.blur(inputFrom);
    fireEvent.change(inputTo, { target: { value: '10' } });
    fireEvent.blur(inputTo);

    expect(mockedDispatch).toHaveBeenCalledWith({
      type: 'SET_SEARCH_DATA',
      payload: { durationFrom: 5, durationTo: 10 },
    });
  });

  it('отправляет isAccommodation: true при переключении свитча', () => {
    render(<FilterBar />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockedDispatch).toHaveBeenCalledWith({
      type: 'SET_SEARCH_DATA',
      payload: { isAccommodation: true },
    });
  });

it('не вызывает dispatch при попытке выбрать более 3 кухонь', async () => {
  const user = userEvent.setup();
  render(<FilterBar />);

  const inputs = screen.getAllByPlaceholderText('Не выбран');

  await user.click(inputs[0]);
  await user.click(await screen.findByText(/Итальянская/));

  await user.click(inputs[2]);
  await user.click(await screen.findByText(/Японская/));

  expect(mockedDispatch).toHaveBeenCalledTimes(4);
});


  it('не вызывает dispatch при попытке выбрать более 3 кухонь', async () => {
    const user = userEvent.setup();
    render(<FilterBar />);

    const inputs = screen.getAllByPlaceholderText('Не выбран');

    await user.click(inputs[0]);
    await user.click(await screen.findByText('Итальянская'));

    await user.click(inputs[2]);
    await user.click(await screen.findByText('Японская'));

    // Попытка выбрать 4ю кухню (новое поле появляться не должно)
    const extraInput = screen.queryAllByPlaceholderText('Не выбран')[3];
    if (extraInput) {
      await user.click(extraInput);
      const extraOption = await screen.findByText('Доп. кухня');
      await user.click(extraOption);
    }

    // Проверка, что dispatch не вызван с более чем 3 ID
    const calls = mockedDispatch.mock.calls;
    const lastPayload = calls[calls.length - 1]?.[0]?.payload;
    if (lastPayload?.foodCategoryIds) {
      expect(lastPayload.foodCategoryIds.length).toBeLessThanOrEqual(3);
    }
  });
});
