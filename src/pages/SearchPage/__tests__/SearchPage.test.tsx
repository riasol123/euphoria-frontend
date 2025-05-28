import { render, screen } from '@testing-library/react';
import SearchPage from '../SearchPage';

// Мокаем дочерние компоненты
jest.mock('../../../components/SearchBar/SearchBar', () => ({
  SearchBar: () => <div data-testid="search-bar">SearchBar Component</div>,
}));

jest.mock('../../../components/FilterBar/FilterBar', () => ({
  FilterBar: () => <div data-testid="filter-bar">FilterBar Component</div>,
}));

jest.mock('../../../components/TourCardList/TourCardList', () => ({
  TourCardList: () => <div data-testid="tour-card-list">TourCardList Component</div>,
}));

describe('SearchPage', () => {
  test('рендерится без ошибок', () => {
    render(<SearchPage />);
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('filter-bar')).toBeInTheDocument();
    expect(screen.getByTestId('tour-card-list')).toBeInTheDocument();
  });

  test('отображает SearchBar компонент', () => {
    render(<SearchPage />);
    const searchBar = screen.getByTestId('search-bar');
    expect(searchBar).toHaveTextContent('SearchBar Component');
  });

  test('отображает FilterBar компонент', () => {
    render(<SearchPage />);
    const filterBar = screen.getByTestId('filter-bar');
    expect(filterBar).toHaveTextContent('FilterBar Component');
  });

  test('отображает TourCardList компонент', () => {
    render(<SearchPage />);
    const tourList = screen.getByTestId('tour-card-list');
    expect(tourList).toHaveTextContent('TourCardList Component');
  });

  test('структура страницы соответствует ожиданиям', () => {
    render(<SearchPage />);
    const container = screen.getByTestId('search-bar').parentElement; // верхний Box
    expect(container).toHaveStyle('flex-direction: column');
    expect(container).toHaveStyle('width: 100%');
  });

  test('блок с фильтрами и турами имеет горизонтальный layout', () => {
    render(<SearchPage />);
    const filterBlock = screen.getByTestId('filter-bar').parentElement;
    expect(filterBlock).toHaveStyle('display: flex');
    expect(filterBlock).toHaveStyle('gap: 20px');
  });
});
