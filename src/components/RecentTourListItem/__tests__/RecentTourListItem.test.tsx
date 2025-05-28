import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RecentTourListItem } from '../RecentTourListItem';
import { MemoryRouter } from 'react-router-dom';

// Мокаем useNavigate из react-router-dom
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('RecentTourListItem', () => {
  const defaultProps = {
    img: 'test.jpg',
    title: 'Test Tour',
    day: 15,
    month: 'May',
    featured: false,
    onMouseEnter: jest.fn(),
    onImageLoad: jest.fn(),
    showSkeleton: false,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('рендерит скелетоны, если showSkeleton=true', () => {
    render(
      <MemoryRouter>
        <RecentTourListItem {...defaultProps} showSkeleton={true} />
      </MemoryRouter>
    );

    // Проверяем, что скелетоны (Skeleton) отображаются
    expect(screen.getAllByText('', { selector: '.MuiSkeleton-root' }).length).toBeGreaterThan(0);

    // Проверяем, что изображение невидимо (opacity: 0)
    const img = screen.getByAltText(defaultProps.title);
    expect(img).toHaveStyle('opacity: 0');
  });

  test('рендерит данные тура, если showSkeleton=false', () => {
    const { container } = render(
      <MemoryRouter>
        <RecentTourListItem {...defaultProps} featured={true} />
      </MemoryRouter>
    );

    // Проверяем изображение
    const img = screen.getByAltText(defaultProps.title);
    expect(img).toHaveAttribute('src', defaultProps.img);
    expect(img).toHaveStyle('opacity: 1');

    // Проверяем заголовок
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();

    // Находим все элементы Typography
    const typographyElements = container.querySelectorAll('.MuiTypography-root');

    // Проверяем, есть ли элемент с датой (например: "15May", "15 May", и т.д.)
    const dateElement = Array.from(typographyElements).find(el =>
      el.textContent?.replace(/\s+/g, '').includes(`${defaultProps.day}${defaultProps.month}`)
    );

    expect(dateElement).toBeTruthy(); // Убедиться, что элемент найден
  });

  test('вызывает onImageLoad при загрузке изображения', () => {
    render(
      <MemoryRouter>
        <RecentTourListItem {...defaultProps} />
      </MemoryRouter>
    );

    const img = screen.getByAltText(defaultProps.title);

    fireEvent.load(img);

    expect(defaultProps.onImageLoad).toHaveBeenCalledTimes(1);
  });

  test('переходит на страницу тура при клике', () => {
    render(
      <MemoryRouter>
        <RecentTourListItem {...defaultProps} />
      </MemoryRouter>
    );

    const item = screen.getByRole('img', { name: defaultProps.title }).parentElement;
    if (!item) throw new Error('Не найден элемент ImageListItem');

    fireEvent.click(item);

    expect(mockedNavigate).toHaveBeenCalledWith('/tour/1');
  });

  test('применяет стили featured, если featured=true', () => {
    const { container } = render(
      <MemoryRouter>
        <RecentTourListItem {...defaultProps} featured={true} />
      </MemoryRouter>
    );

    expect(container.firstChild).toHaveStyle('transition: all 1s ease');
  });
});
