import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SmallSearchForm } from '../SmallSearchForm';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore([]);
const dispatchMock = jest.fn();
const navigateMock = jest.fn();
jest.mock('../../../assets/search.svg', () => 'search.svg');
jest.mock('../../../assets/date.svg', () => 'date.svg');

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => dispatchMock,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigateMock,
}));

describe('SmallSearchForm', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({});
    dispatchMock.mockClear();
    navigateMock.mockClear();
  });

  test('renders input and button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SmallSearchForm />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/место/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /найти туры/i })).toBeInTheDocument();
  });

  test('shows tooltip error when city input is empty and search clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SmallSearchForm />
        </MemoryRouter>
      </Provider>
    );

    const button = screen.getByRole('button', { name: /найти туры/i });
    fireEvent.click(button);

    expect(screen.getByText(/место не может быть пустым/i)).toBeInTheDocument();
  });

  test('dispatches search data and navigates on valid search', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SmallSearchForm />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByPlaceholderText(/место/i);
    const button = screen.getByRole('button', { name: /найти туры/i });

    fireEvent.change(input, { target: { value: 'Сочи' } });
    fireEvent.click(button);

    expect(dispatchMock).toHaveBeenCalledWith(expect.objectContaining({
      type: expect.any(String), // setSearchData action type
      payload: expect.objectContaining({ city: 'Сочи' }),
    }));

    expect(navigateMock).toHaveBeenCalledWith('/search');
  });

  test('accepts only allowed characters in city input', async () => {
    render(<SmallSearchForm />);
    const input = screen.getByPlaceholderText(/место/i);

    // Очищаем поле
    await userEvent.clear(input);

    // Пробуем ввести строку с цифрами
    await userEvent.type(input, 'Москва-123');

    // Проверяем, что в поле нет цифр
    expect(input).toHaveValue('Москва-');

    // Проверяем ввод без цифр
    await userEvent.clear(input);
    await userEvent.type(input, 'New York');
    expect(input).toHaveValue('New York');
  });
});
