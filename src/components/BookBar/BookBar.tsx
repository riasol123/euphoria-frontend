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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import getDaysAmountLiteral from "../../utils/getDaysAmountLiteral";

export function BookBar({ tour }: { tour?: any }) {
  const [dates, setDates] = useState('2024-07-10_2024-07-15');
  const [participants, setParticipants] = useState(2);

  const handleChange = (event: SelectChangeEvent) => {
    setDates(event.target.value as string);
  };

  const updateParticipants = (increment: boolean) => {
    setParticipants((prev: number) => Math.max(1, prev + (increment ? 1 : -1)));
  };

  return (
    <Box sx={itemStyles.container}>
      <Typography sx={itemStyles.title}>Бронирование</Typography>
      <Divider></Divider>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Typography>Участники</Typography>
        <Box>
          <IconButton size="small" onClick={() => updateParticipants(false)}><RemoveIcon /></IconButton>
          <Typography component="span" sx={{ mx: 1 }}>{participants}</Typography>
          <IconButton size="small" onClick={() => updateParticipants(true)}><AddIcon /></IconButton>
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
          {/* {formatMoney(selectedOption.price * participants)} ₽ */}
          20 000 ₽
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
