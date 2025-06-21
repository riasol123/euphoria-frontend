import { useState, useEffect } from "react";
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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { itemStyles } from "./BookBarStyle";
import getDaysAmountLiteral from "../../utils/getDaysAmountLiteral";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../hooks/getTypedSelector";
import { getTourRequest, postBookingsRequest } from "../../redux/actions/tour";
import { useParams } from "react-router-dom";
import api from "../../redux/api/api";

export function BookBar() {
  const tour = useSelector((state: RootState) => state.tour.currentTour);
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const [selectedFlowId, setSelectedFlowId] = useState<number | null>(null);
  const [participants, setParticipants] = useState(2);
  const [freeSeats, setFreeSeats] = useState<number | null>(null);

  // Устанавливаем первую дату по умолчанию, когда тур загружен
  useEffect(() => {
    if (tour?.flows?.length && selectedFlowId === null) {
      setSelectedFlowId(tour.flows[0].id);
    }
  }, [tour, selectedFlowId]);

  const selectedFlow = tour?.flows?.find(flow => flow.id === selectedFlowId);

  // Загружаем брони по выбранному потоку и вычисляем свободные места
  useEffect(() => {
    if (selectedFlowId && selectedFlow) {
      api.get(`/bookings/flow/${selectedFlowId}`)
        .then(res => {
          const bookings = res.data; // ожидается массив броней
          const booked = bookings.reduce((sum: number, booking: { participant: number }) => {
            return sum + (booking.participant || 0);
          }, 0);
          setFreeSeats(selectedFlow.participant - booked);
        })
        .catch(() => setFreeSeats(null));
    }
  }, [selectedFlowId, selectedFlow]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedFlowId(Number(event.target.value));
  };

  const updateParticipants = (increment: boolean) => {
    setParticipants((prev) => Math.max(1, prev + (increment ? 1 : -1)));
  };

  const handleSubmit = () => {
    if (selectedFlow) {
      dispatch(postBookingsRequest({ participant: participants, flowId: selectedFlow.id }));
      dispatch(getTourRequest(Number(id)));
    }
  };

  if (!tour || !tour.flows?.length || selectedFlowId === null) return null;

  return (
    <Box sx={itemStyles.container}>
      <Typography sx={itemStyles.title}>Бронирование</Typography>
      <Divider />

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography>Участники</Typography>
        <Box>
          <IconButton size="small" onClick={() => updateParticipants(false)}><RemoveIcon /></IconButton>
          <Typography component="span" sx={{ mx: 1 }}>{participants}</Typography>
          <IconButton size="small" onClick={() => updateParticipants(true)}><AddIcon /></IconButton>
        </Box>
      </Box>

      <Divider />
      <Typography>Даты</Typography>
      <FormControl fullWidth>
        <Select
          value={selectedFlowId?.toString()}
          onChange={handleChange}
          sx={itemStyles.select}
        >
          {tour.flows.map(flow => {
            const start = new Date(flow.startDate);
            const end = new Date(flow.endDate);
            const formatter = new Intl.DateTimeFormat('ru-RU', {
              weekday: 'short', day: 'numeric', month: 'short'
            });
            return (
              <MenuItem key={flow.id} value={flow.id}>
                {formatter.format(start)} – {formatter.format(end)}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Divider />
      <Box sx={itemStyles.availability}>
        <Typography>Свободных мест:</Typography>
        <Typography>{freeSeats !== null ? freeSeats : "–"}</Typography>
      </Box>

      <Divider />
      <Box sx={itemStyles.price}>
        <Typography>Итого:</Typography>
        <Typography>
          {(Number(selectedFlow?.currentPrice ?? 0) * participants).toLocaleString()} ₽
        </Typography>
        <Typography>
          / {tour.duration} {getDaysAmountLiteral(tour.duration)}
        </Typography>
      </Box>

      <Button
        variant="contained"
        className="searchButton"
        disableElevation
        onClick={handleSubmit}
        disabled={freeSeats !== null && participants > freeSeats}
      >
        Забронировать
      </Button>
    </Box>
  );
}
