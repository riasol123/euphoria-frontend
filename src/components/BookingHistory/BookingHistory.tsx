import { FC, useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Pagination,
} from '@mui/material';
import { styles } from './BookingHistoryStyle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../hooks/getTypedSelector';
import { fetchBookingsRequest } from '../../redux/actions/tour';
import formatMoney from '../../utils/formatMoney';

interface Booking {
  id: number;
  tourName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  price: number;
  status: string;
}

interface BookingStatus {
  status: 'confirmed' | 'cancelled' | 'completed' | 'upcoming';
  label: string;
}

const statusMap: Record<string, BookingStatus> = {
  confirmed: { status: 'confirmed', label: 'Забронирован' },
  cancelled: { status: 'cancelled', label: 'Отменён' },
  completed: { status: 'completed', label: 'Завершён' },
  upcoming: { status: 'upcoming', label: 'Предстоящий' },
};

const ITEMS_PER_PAGE = 8;

export const BookingHistory: FC = () => {
  const dispatch = useDispatch();

  // Получаем сырые данные из Redux (пример структуры твоих данных)
  const rawBookings = useSelector((state: RootState) => state.tour.bookings);
  const bookingsError = useSelector((state: RootState) => state.tour.bookingsError);

  // Локальный стейт для пагинации
  const [page, setPage] = useState(1);

  // Запрашиваем бронирования при монтировании
  useEffect(() => {
    dispatch(fetchBookingsRequest());
  }, [dispatch]);

  const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('ru-RU');
};

const formatDateRange = (checkIn: string, checkOut: string) => {
  return `${formatDate(checkIn)} - ${formatDate(checkOut)}`;
};

  // Преобразуем данные под нужный формат для таблицы
  const bookings: Booking[] = rawBookings?.map((b: any) => ({
    id: b.id,
    tourName: b.flow.tour?.title || 'Без названия',
    checkIn: (b.flow.startDate),
    checkOut: b.flow.endDate,
    guests: b.participant,
    price: (b.flow.currentPrice),
    status: b.status || 'confirmed',
  })) || [];

  // Подсчёт количества страниц
  const pageCount = Math.ceil(bookings.length / ITEMS_PER_PAGE);

  // Срез бронирований для текущей страницы
  const paginatedBookings = bookings.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title}>История бронирования</Typography>

      {bookingsError && (
        <Typography color="error" sx={{ textAlign: 'center', mt: 2 }}>
          {bookingsError}
        </Typography>
      )}

      <TableContainer component={Paper} elevation={0} sx={{ height: '100%' }}>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell className="tour-name-column">Тур</TableCell>
              <TableCell className="dates-column">Даты</TableCell>
              <TableCell>Участники</TableCell>
              <TableCell>Стоимость</TableCell>
              <TableCell>Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Нет бронирований
                </TableCell>
              </TableRow>
            ) : (
              paginatedBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="tour-name-column">{booking.tourName}</TableCell>
                  <TableCell className="dates-column">
                    {formatDateRange(booking.checkIn, booking.checkOut)}
                  </TableCell>
                  <TableCell>{booking.guests}</TableCell>
                  <TableCell>{formatMoney(booking.price)} ₽</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        ...styles.statusChip,
                        ...styles[statusMap[booking.status]?.status],
                      }}
                    >
                      {statusMap[booking.status]?.label || booking.status}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};
