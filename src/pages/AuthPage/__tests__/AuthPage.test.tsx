import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthPage from '../AuthPage';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as api from '../../../utils/getImageUrl';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../utils/api');

describe('AuthPage', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AuthPage />
        </MemoryRouter>
      </Provider>
    );

  test('отображает форму входа по умолчанию', () => {
    renderComponent();
    expect(screen.getByText(/^Вход$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Почта/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Войти/i })).toBeInTheDocument();
  });

  test('переключается на форму регистрации', () => {
    renderComponent();
    fireEvent.click(screen.getByText(/Зарегистрироваться/i));

    expect(screen.getByText(/Регистрация/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Имя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Фамилия/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Подтвердите пароль/i)).toBeInTheDocument();
  });

  test('отправляет запрос на вход при submit', async () => {
    const mockedResponse = {
      data: {
        token: 'fake-token',
        user: { email: 'test@example.com' },
      },
    };

    (api.api.post as jest.Mock).mockResolvedValueOnce(mockedResponse);

    renderComponent();

    fireEvent.change(screen.getByLabelText(/Почта/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Пароль/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Войти/i }));

    await waitFor(() => {
      expect(api.api.post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@example.com',
        password: '123456',
      });
    });
  });

  test('отправляет запрос на регистрацию при submit', async () => {
    const mockedResponse = {
      data: {
        token: 'fake-token',
        user: { email: 'newuser@example.com' },
      },
    };

    (api.api.post as jest.Mock).mockResolvedValueOnce(mockedResponse);

    renderComponent();
    fireEvent.click(screen.getByText(/Зарегистрироваться/i));

    fireEvent.change(screen.getByLabelText(/Имя/i), {
      target: { value: 'Иван' },
    });
    fireEvent.change(screen.getByLabelText(/Фамилия/i), {
      target: { value: 'Иванов' },
    });
    fireEvent.change(screen.getByLabelText(/Почта/i), {
      target: { value: 'newuser@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Пароль$/i), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Зарегистрироваться/i }));

    await waitFor(() => {
      expect(api.api.post).toHaveBeenCalledWith('/auth/registration', {
        name: 'Иван',
        surname: 'Иванов',
        email: 'newuser@example.com',
        password: '123456',
      });
    });
  });
});
