import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import { itemStyles } from "./BookBarStyle";
import formatMoney from "../../utils/formatMoney";
import getDaysAmountLiteral from "../../utils/getDaysAmountLiteral";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export function BookBar({ tour }: { tour?: any }) {
  const [dates, setDates] = useState('10');

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);


  const handleChange = (event: SelectChangeEvent) => {
    setDates(event.target.value as string);
  };

  const updateCount = (type: 'adults' | 'children', increment: boolean) => {
    if (type === 'adults') {
      setAdults((prev) => Math.max(1, prev + (increment ? 1 : -1)));
    } else {
      setChildren((prev) => Math.max(0, prev + (increment ? 1 : -1)));
    }
  };

  return (
    <Box sx={itemStyles.container}>
      <Typography sx={itemStyles.title}>Бронирование</Typography>
      <Divider></Divider>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '200px' }}>
          <Typography>Взрослые</Typography>
          <Box>
            <IconButton size="small" onClick={() => updateCount('adults', false)}><RemoveIcon /></IconButton>
            <Typography component="span" sx={{ mx: 1 }}>{adults}</Typography>
            <IconButton size="small" onClick={() => updateCount('adults', true)}><AddIcon /></IconButton>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '200px' }}>
          <Typography>Дети</Typography>
          <Box>
            <IconButton size="small" onClick={() => updateCount('children', false)}><RemoveIcon /></IconButton>
            <Typography component="span" sx={{ mx: 1 }}>{children}</Typography>
            <IconButton size="small" onClick={() => updateCount('children', true)}><AddIcon /></IconButton>
          </Box>
        </Box>
      </Box>
      <Divider></Divider>
      <Typography>Даты</Typography>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={dates}
          onChange={handleChange}
          sx={itemStyles.select}
        >
          <MenuItem value={10}>чт, 1 мая – сб, 4 мая</MenuItem>
          <MenuItem value={20}>сб, 10 мая – вт, 13 мая</MenuItem>
          <MenuItem value={30}>вт, 20 мая – пт, 23 мая</MenuItem>
        </Select>
      </FormControl>
      <Divider></Divider>
      <Box sx={itemStyles.availability}>
        <Typography>Свободных мест:</Typography>
        <Typography>{tour?.availableSeats ?? 25}</Typography>
      </Box>
      <Divider></Divider>
      <Box sx={itemStyles.price}>
        <Typography>Итого:</Typography>
        <Typography>
          {formatMoney((tour?.price ?? 10000) * adults + (tour?.price ?? 10000) * children)} ₽
        </Typography>
        <Typography>
          / {tour?.duration ?? 4} {getDaysAmountLiteral(tour?.duration ?? 4)}
        </Typography>
      </Box>
      <Button
        variant="contained"
        className="searchButton"
        disableElevation
      >
        Забронировать
      </Button>
    </Box>
  );
}
