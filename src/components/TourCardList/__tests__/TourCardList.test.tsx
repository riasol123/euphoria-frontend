import { render, screen } from '@testing-library/react';
import { TourCardList } from '../TourCardList';
import * as reactRedux from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

// Мок для TourCard, чтобы не рендерить сложный компонент
jest.mock('../../TourCard/TourCard', () => ({
  TourCard: (props: any) => (
    <div data-testid="tour-card">
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <p>{props.location}</p>
      <p>{props.duration}</p>
      <p>{props.price}</p>
      <p>{props.rate}</p>
    </div>
  ),
}));

describe('TourCardList', () => {
  const useSelectorMock = reactRedux.useSelector as jest.Mock;

  afterEach(() => {
    useSelectorMock.mockReset();
  });

  it('не рендерит ничего, если tours пустой или undefined', () => {
    useSelectorMock.mockReturnValue({ tours: [] });
    const { container } = render(<TourCardList />);
    expect(container.firstChild).toBeNull();

    useSelectorMock.mockReturnValue({ tours: undefined });
    const { container: container2 } = render(<TourCardList />);
    expect(container2.firstChild).toBeNull();
  });

  it('рендерит список карточек туров', () => {
    const toursMock = [
      {
        id: 1,
        title: 'Тур 1',
        description: 'Описание 1',
        city: 'Москва',
        duration: 5,
        flows: [{ currentPrice: '1000' }],
        photos: ['photo1.jpg'],
        rate: '4.5',
      },
      {
        id: 2,
        title: 'Тур 2',
        description: 'Описание 2',
        city: 'Санкт-Петербург',
        duration: 3,
        flows: [],
        photos: [],
        rate: null,
      },
    ];

    useSelectorMock.mockReturnValue({ tours: toursMock });

    render(<TourCardList />);

    const cards = screen.getAllByTestId('tour-card');
    expect(cards).toHaveLength(2);

    expect(screen.getByText('Тур 1')).toBeInTheDocument();
    expect(screen.getByText('Описание 1')).toBeInTheDocument();
    expect(screen.getByText('Москва')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();

    expect(screen.getByText('Тур 2')).toBeInTheDocument();
    expect(screen.getByText('Описание 2')).toBeInTheDocument();
    expect(screen.getByText('Санкт-Петербург')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getAllByText('—')).toHaveLength(1);
  });
});
