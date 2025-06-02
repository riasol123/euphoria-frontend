import * as React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Collapse,
  Divider,
  Pagination,
} from '@mui/material';
import { styles } from './OrganizerToursStyle';
import { useState } from 'react';
import DropDown from '../../assets/dropdown.svg';
import EditTourIcon from '../../assets/edit-tour.png';
import DeleteIconImg from '../../assets/delete.png';

interface Tour {
  id: string;
  name: string;
  dates: string[];
  bookings: number;
  totalCapacity: number;
  status: 'active' | 'paused';
}

const ITEMS_PER_PAGE = 8;

export const OrganizerTours = () => {
  const [tours, setTours] = useState<Tour[]>([
    {
      id: '1',
      name: 'Тур по Кавказу',
      dates: [
        '15.03.2024 - 20.03.2024',
        '22.03.2024 - 27.03.2024',
        '29.03.2024 - 03.04.2024',
      ],
      bookings: 12,
      totalCapacity: 30,
      status: 'active',
    },
    {
      id: '2',
      name: 'Тур по Кавказу',
      dates: [
        '15.03.2024 - 20.03.2024',
        '22.03.2024 - 27.03.2024',
        '29.03.2024 - 03.04.2024',
      ],
      bookings: 12,
      totalCapacity: 30,
      status: 'active',
    },
    {
      id: '3',
      name: 'Тур по Кавказу',
      dates: [
        '15.03.2024 - 20.03.2024',
        '22.03.2024 - 27.03.2024',
        '29.03.2024 - 03.04.2024',
      ],
      bookings: 12,
      totalCapacity: 30,
      status: 'active',
    },
    {
      id: '4',
      name: 'Тур по Кавказу',
      dates: [
        '15.03.2024 - 20.03.2024',
        '22.03.2024 - 27.03.2024',
        '29.03.2024 - 03.04.2024',
      ],
      bookings: 12,
      totalCapacity: 30,
      status: 'active',
    },
    {
      id: '5',
      name: 'Тур по Кавказу',
      dates: [
        '15.03.2024 - 20.03.2024',
        '22.03.2024 - 27.03.2024',
        '29.03.2024 - 03.04.2024',
      ],
      bookings: 12,
      totalCapacity: 30,
      status: 'active',
    },
    {
      id: '6',
      name: 'Тур по Кавказу',
      dates: [
        '15.03.2024 - 20.03.2024',
        '22.03.2024 - 27.03.2024',
        '29.03.2024 - 03.04.2024',
      ],
      bookings: 12,
      totalCapacity: 30,
      status: 'active',
    },
    {
      id: '7',
      name: 'Тур по Кавказу',
      dates: [
        '15.03.2024 - 20.03.2024',
        '22.03.2024 - 27.03.2024',
        '29.03.2024 - 03.04.2024',
      ],
      bookings: 12,
      totalCapacity: 30,
      status: 'active',
    },
    {
      id: '8',
      name: 'Тур по Кавказу',
      dates: [
        '15.03.2024 - 20.03.2024',
        '22.03.2024 - 27.03.2024',
        '29.03.2024 - 03.04.2024',
      ],
      bookings: 12,
      totalCapacity: 30,
      status: 'active',
    },
    {
      id: '9',
      name: 'Тур по Кавказу',
      dates: [
        '15.03.2024 - 20.03.2024',
        '22.03.2024 - 27.03.2024',
        '29.03.2024 - 03.04.2024',
      ],
      bookings: 12,
      totalCapacity: 30,
      status: 'active',
    },
  ]);

  const [expandedTours, setExpandedTours] = useState<{ [key: string]: boolean }>({});
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(tours.length / ITEMS_PER_PAGE);
  const paginatedTours = tours.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleEdit = (tourId: string) => {
    // TODO: Implement edit functionality
    console.log('Edit tour:', tourId);
  };

  const handleDelete = (tourId: string) => {
    // TODO: Implement delete functionality
    console.log('Delete tour:', tourId);
  };

  const handleStatusChange = (tourId: string, newStatus: 'active' | 'paused') => {
    setTours(tours.map(tour => 
      tour.id === tourId ? { ...tour, status: newStatus } : tour
    ));
  };

  const toggleDates = (tourId: string) => {
    setExpandedTours(prev => ({
      ...prev,
      [tourId]: !prev[tourId]
    }));
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h5" sx={styles.title}>
        Мои туры
      </Typography>
      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Тур</TableCell>
              <TableCell>Даты</TableCell>
              <TableCell>Брони</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTours.map((tour) => (
              <React.Fragment key={tour.id}>
                <TableRow>
                  <TableCell className="tour-name-column">{tour.name}</TableCell>
                  <TableCell>
                    <Box sx={styles.datesCell}>
                      <Box sx={styles.datesHeader} onClick={() => toggleDates(tour.id)}>
                        <Typography>{tour.dates[0]}</Typography>
                        <Typography sx={styles.datesCount}>
                          {tour.dates.length > 1 ? `+${tour.dates.length - 1}` : ''}
                        </Typography>
                      </Box>
                      <Collapse in={expandedTours[tour.id]} timeout="auto" unmountOnExit>
                        <Box sx={styles.datesList}>
                          {tour.dates.slice(1).map((date, index) => (
                            <>
                              <Divider></Divider>
                              <Typography key={index} sx={styles.dateItem}>
                                {date}
                              </Typography>
                            </>
                          ))}
                        </Box>
                      </Collapse>
                    </Box>
                  </TableCell>
                  <TableCell>{`${tour.bookings}/${tour.totalCapacity}`}</TableCell>
                  <TableCell className="status-cell">
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select
                        value={tour.status}
                        onChange={(e) => handleStatusChange(tour.id, e.target.value as 'active' | 'paused')}
                        sx={styles.statusSelect(tour.status)}
                        IconComponent={(props) => (
                          <img
                            {...props}
                            src={DropDown}
                            alt="dropdown"
                            style={{
                              width: 16,
                              height: 16,
                              opacity: 0.7,
                              transition: 'transform 0.2s',
                              transform: props.className?.includes('MuiSelect-iconOpen') ? 'rotate(180deg)' : 'none',
                            }}
                          />
                        )}
                      >
                        <MenuItem value="active" sx={styles.menuItem}>Активен</MenuItem>
                        <MenuItem value="paused" sx={styles.menuItem}>Остановлен</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(tour.id)} color="primary">
                      <img src={EditTourIcon} alt="edit" style={{ width: 22, height: 22, opacity: 0.7 }} />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(tour.id)} color="error">
                      <img src={DeleteIconImg} alt="delete" style={{ width: 22, height: 22, opacity: 0.7 }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
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