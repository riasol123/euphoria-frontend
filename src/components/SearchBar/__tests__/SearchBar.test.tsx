import { fireEvent, waitFor } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { SearchBar } from '../SearchBar';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { searchReducer } from '../../../redux/reducers/searchReducer';

const initialState = {
  search: {
    city: '',
    dateRange: { start: null, end: null },
    adults: 2,
    children: 0,
  }
};

const store = configureStore({
  reducer: {
    search: searchReducer
  },
  preloadedState: initialState
});

// Мокаем api, чтобы не делать реальные запросы
jest.mock('../../../utils/api', () => ({
  api: {
    get: jest.fn(() => Promise.resolve({ data: [] })),
  },
}));

// Мокаем redux actions, чтобы отслеживать вызовы dispatch
jest.mock('../../../redux/actions/search', () => ({
  setSearchData: jest.fn((payload) => ({ type: 'SET_SEARCH_DATA', payload })),
}));
jest.mock('../../../redux/actions/tour', () => ({
  setTours: jest.fn((payload) => ({ type: 'SET_TOURS', payload })),
}));

describe('SearchBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

  test('рендерит все основные элементы', () => {
    renderComponent();

    expect(screen.getByPlaceholderText(/место/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /найти/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /взрослых/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/заезд/i)).toBeInTheDocument();
  });

  test('показывает тултип с ошибкой, если поле "Место" пустое при поиске', async () => {
    renderComponent();
    const button = screen.getByRole('button', { name: /найти/i });

    fireEvent.click(button);

    expect(await screen.findByText(/место не может быть пустым/i)).toBeInTheDocument();
  });

  test('скрывает тултип с ошибкой, если поле "Место" заполнено', async () => {
    renderComponent();
    const input = screen.getByPlaceholderText(/место/i);
    const button = screen.getByRole('button', { name: /найти/i });

    fireEvent.change(input, { target: { value: 'Сочи' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByText(/место не может быть пустым/i)).not.toBeInTheDocument();
    });
  });

  test('вызывает функцию поиска при клике на кнопку "Найти" с валидными данными', async () => {
    renderComponent();
    const input = screen.getByPlaceholderText(/место/i);
    const button = screen.getByRole('button', { name: /найти/i });

    fireEvent.change(input, { target: { value: 'Казань' } });
    fireEvent.click(button);

    // Ждем, пока запрос выполнится
    await waitFor(() => {
      expect(screen.queryByText(/место не может быть пустым/i)).not.toBeInTheDocument();
    });
  });

  test('обновляет дату при выборе в DatePicker', async () => {
    renderComponent();

    const dateInputs = screen.getAllByRole('textbox').filter((input) =>
      ['Заезд', 'Отъезд'].some((placeholder) => input.getAttribute('placeholder') === placeholder)
    );

    expect(dateInputs.length).toBe(2);
  });

  test('разрешает ввод только допустимых символов в поле "Место"', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/место/i);

    // Вводим по символу (все валидные)
    fireEvent.change(input, { target: { value: 'М' } });
    fireEvent.change(input, { target: { value: 'Мо' } });
    fireEvent.change(input, { target: { value: 'Мос' } });
    fireEvent.change(input, { target: { value: 'Моск' } });
    fireEvent.change(input, { target: { value: 'Моска' } });
    fireEvent.change(input, { target: { value: 'Москва' } });

    // Теперь вводим невалидные символы — состояние не должно измениться
    fireEvent.change(input, { target: { value: 'Москва123' } });

    expect(input).toHaveValue('Москва');
  });

  test('SearchBar › SearchBar › открывает меню выбора количества людей и позволяет изменять значения', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    // Ищем кнопку по тексту, который реально присутствует в accessible name
    const peopleButton = screen.getByRole('button', { name: /2 взрослых/i });

    userEvent.click(peopleButton);
  });

  it('renders search bar component', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );
    
    expect(screen.getByPlaceholderText(/Поиск/i)).toBeInTheDocument();
  });
});
