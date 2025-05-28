import { render, screen } from '@testing-library/react';
import { TourCard } from '../TourCard';

describe('TourCard', () => {
  const defaultProps = {
    title: 'Тестовый тур',
    description: 'Описание тура',
    location: 'Москва',
    duration: 5,
    price: 12345,
    img: 'test-image.jpg',
    rate: '4.5',
  };

  it('рендерит все переданные пропсы', () => {
    render(<TourCard {...defaultProps} />);

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.location)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.rate)).toBeInTheDocument();
    expect(screen.getByText(/12\s*345\s*₽/)).toBeInTheDocument();
    expect(screen.getByText(`/ ${defaultProps.duration} дней`)).toBeInTheDocument();

    const image = screen.getByAltText('tour image') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(defaultProps.img);
  });

  it('корректно рендерит пустой рейтинг', () => {
    render(<TourCard {...defaultProps} rate="" />);

    const ratingElements = screen.getAllByText((content, element) => {
      // Ищем элементы, у которых текст равен пустой строке
      return element.tagName.toLowerCase() === 'p' && content === '';
    });

    expect(ratingElements.length).toBeGreaterThan(0);
  });
});
