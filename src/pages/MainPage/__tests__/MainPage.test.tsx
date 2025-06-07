import { render, screen } from '@testing-library/react';
import MainPage from '../MainPage';

// Мокаем дочерние компоненты
jest.mock('../../../components/RecentTourList/RecentTourList', () => ({
  RecentTourList: () => <div data-testid="recent-tour-list" />
}));

jest.mock('../../../components/SmallSearchForm/SmallSearchForm', () => ({
  SmallSearchForm: () => <div data-testid="small-search-form" />
}));

jest.mock('../../../components/CategoryList/CategoryList', () => ({
  CategoryList: () => <div data-testid="category-list" />
}));

describe('MainPage', () => {
  it('renders search form and recent tours', () => {
    render(<MainPage />);
    
    // Проверяем, что SmallSearchForm отрисован
    expect(screen.getByTestId('small-search-form')).toBeInTheDocument();
    
    // Проверяем, что RecentTourList отрисован
    expect(screen.getByTestId('recent-tour-list')).toBeInTheDocument();
  });

  it('renders categories section with title', () => {
    render(<MainPage />);
    
    // Проверяем, что категория заголовок присутствует
    const categoryTitle = screen.getByText(/популярные категории/i);
    expect(categoryTitle).toBeInTheDocument();
    
    // Проверяем, что CategoryList отрисован
    expect(screen.getByTestId('category-list')).toBeInTheDocument();
  });

  test('applies container styles correctly', () => {
    const { container } = render(<MainPage />);
    const mainContainer = container.firstChild as HTMLElement; // корневой Box из mainPageStyles.container
    
    // Проверяем стили через getComputedStyle
    const styles = window.getComputedStyle(mainContainer);
    expect(styles.display).toBe('flex');
    expect(styles.flexWrap).toBe('wrap');
    expect(styles.justifyContent).toBe('space-evenly');
  });
});
