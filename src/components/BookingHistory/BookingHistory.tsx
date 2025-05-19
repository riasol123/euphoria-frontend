import { FC } from 'react';
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
} from '@mui/material';
import { styles } from './BookingHistoryStyle';

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

// Временные данные для примера
const mockBookings = [
  {
    id: 1,
    checkIn: '2024-03-15',
    checkOut: '2024-03-20',
    guests: 2,
    price: 25000,
    status: 'confirmed',
    tourName: 'Винный тур по Тоскане',
  },
  {
    id: 2,
    checkIn: '2024-02-10',
    checkOut: '2024-02-15',
    guests: 4,
    price: 45000,
    status: 'cancelled',
    tourName: 'Гастротур по Испании',
  },
  {
    id: 3,
    checkIn: '2024-01-01',
    checkOut: '2024-01-05',
    guests: 2,
    price: 30000,
    status: 'completed',
    tourName: 'Сырный тур по Франции',
  },
  {
    id: 4,
    checkIn: '2024-04-20',
    checkOut: '2024-04-25',
    guests: 3,
    price: 35000,
    status: 'upcoming',
    tourName: 'Морской гастротур',
  },
];

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU');
};

const formatDateRange = (checkIn: string, checkOut: string) => {
  return `${formatDate(checkIn)} - ${formatDate(checkOut)}`;
};

const formatPrice = (price: number) => {
  return price.toLocaleString('ru-RU') + ' ₽';
};

export const BookingHistory: FC = () => {
  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title}>
        История бронирования
      </Typography>
      <TableContainer component={Paper} elevation={0}>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell className="tour-name-column">Название тура</TableCell>
              <TableCell className="dates-column">Даты</TableCell>
              <TableCell>Участники</TableCell>
              <TableCell>Стоимость</TableCell>
              <TableCell>Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="tour-name-column">{booking.tourName}</TableCell>
                <TableCell className="dates-column">{formatDateRange(booking.checkIn, booking.checkOut)}</TableCell>
                <TableCell>{booking.guests}</TableCell>
                <TableCell>{formatPrice(booking.price)}</TableCell>
                <TableCell>
                  <Box 
                    sx={{
                      ...styles.statusChip,
                      ...styles[statusMap[booking.status].status],
                    }}
                  >
                    {statusMap[booking.status].label}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}; 