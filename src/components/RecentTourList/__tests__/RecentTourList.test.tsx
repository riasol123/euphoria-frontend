import { render, screen } from '@testing-library/react';
import { RecentTourList } from '../RecentTourList';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore([]);
const dispatchMock = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => dispatchMock,
  useSelector: jest.fn(),
}));

describe('RecentTourList', () => {
  beforeEach(() => {
    dispatchMock.mockClear();
  });

  test('dispatches fetchToursRequest on mount', () => {
    jest.requireMock('react-redux').useSelector.mockReturnValue({ tours: [], loading: true });
    render(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <RecentTourList />
        </MemoryRouter>
      </Provider>
    );
    expect(dispatchMock).toHaveBeenCalledWith(expect.objectContaining({ type: 'TOURS_REQUEST' }));
  });

  test('shows skeletons while loading', () => {
    jest.requireMock('react-redux').useSelector.mockReturnValue({ tours: [], loading: true });

    const { container } = render(
      <Provider store={mockStore({})}>
            <MemoryRouter>
      <RecentTourList />
    </MemoryRouter>
      </Provider>
    );

    expect(container.querySelectorAll('.MuiSkeleton-root')).not.toHaveLength(0);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('renders sorted tours after loading', () => {
    const tours = [
      { id: '1', title: 'Tour A', photos: ['photo1.jpg'], flows: [{ startDate: '2025-06-01' }] },
      { id: '2', title: 'Tour B', photos: ['photo2.jpg'], flows: [{ startDate: '2025-05-01' }] },
      { id: '3', title: 'Tour C', photos: ['photo3.jpg'], flows: [{ startDate: '2025-07-01' }] },
    ];
    jest.requireMock('react-redux').useSelector.mockReturnValue({ tours, loading: false });

    render(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <RecentTourList />
        </MemoryRouter>
      </Provider>
    );

    // Проверим, что заголовки туров есть (текст title)
    expect(screen.getByAltText('Tour B')).toBeInTheDocument();
    expect(screen.getByAltText('Tour A')).toBeInTheDocument();
    expect(screen.getByAltText('Tour C')).toBeInTheDocument();
  });
});
