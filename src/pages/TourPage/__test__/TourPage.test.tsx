import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import TourPage from '../TourPage';

// Мокаем компоненты с правильными путями (2 уровня вверх)
jest.mock('../../../components/ImageGallery/ImageGallery', () => () => <div data-testid="image-gallery" />);
jest.mock('../../../components/BookBar/BookBar', () => () => <div data-testid="book-bar" />);
jest.mock('../../../assets/star.svg', () => 'star.svg');

const renderPage = () => {
  render(
    <MemoryRouter initialEntries={['/tours/1']}>
      <Routes>
        <Route path="/tours/:id" element={<TourPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('TourPage', () => {
  test('отрисовывает компонент ImageGallery и BookBar', () => {
    renderPage();

    expect(screen.getByTestId('image-gallery')).toBeInTheDocument();
    expect(screen.getByTestId('book-bar')).toBeInTheDocument();
  });

  test('отображает заголовок тура и рейтинг', () => {
    renderPage();

    expect(screen.getByText(/тур в сердце осетии/i)).toBeInTheDocument();
    expect(screen.getByText(/27 отзывов/i)).toBeInTheDocument();
  });

  test('отображает заголовки разделов', () => {
    renderPage();

    expect(screen.getByText(/о туре/i)).toBeInTheDocument();
    expect(screen.getByText(/проживание/i)).toBeInTheDocument();
    expect(screen.getByText(/включено в стоимость/i)).toBeInTheDocument();
  });

  test('отображает ключевые тексты', () => {
    renderPage();

    expect(screen.getByText(/Порог неба/i)).toBeInTheDocument();
    expect(screen.getByText(/Авиаперелет/i)).toBeInTheDocument();
  });
});
