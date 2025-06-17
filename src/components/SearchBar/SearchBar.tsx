import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Путь для правильной типизации стейта
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { Box, Button, Divider, IconButton, Typography, Tooltip } from '@mui/material';
import { ConfigProvider, DatePicker } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import SearchIcon from '../../assets/search.svg';
import DateIcon from '../../assets/date.svg';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { searchStyles } from './SearchBarStyle';
import { RootState } from '../../hooks/getTypedSelector';
import { setSearchData } from '../../redux/actions/search';
import { getToursRequest } from '../../redux/actions/tour';

dayjs.locale('ru');

// Компонент SearchBar
export const SearchBar = () => {
  const { RangePicker } = DatePicker;

  // Получаем данные из Redux Store
  const { city, dateRange } = useSelector((state: RootState) => state.search);

  // Локальные состояния для инпутов
  const [placeInput, setPlace] = useState(city || '');  // Место
  const [dateRangeInput, setDateRange] = useState(dateRange || null);  // Даты
  const [participants, setParticipants] = useState(2);
  const [showTooltip, setShowTooltip] = useState(false);

  const dispatch = useDispatch();

  // Только буквы (русские, латинские), пробелы и дефисы
  const allowedPattern = /^[a-zA-Zа-яА-ЯёЁ\-\s]*$/;

  // Обработчик изменения поля "Место"
  const handlePlaceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (allowedPattern.test(value)) {
      setPlace(value);
      dispatch(setSearchData({ 
        city: value,
        dateRange,
      }));
      if (value.trim()) {
        setShowTooltip(false);
      }
    }
    // Если не проходит по паттерну, не обновляем значение
  };

  // Обработчик изменения дат
  const handleDateChange = (dates: any) => {
    setDateRange(dates);
    dispatch(setSearchData({ 
      city: placeInput,
      dateRange: dates,
    }));
  };

  // Функция для отправки данных (например, в Redux Store или на сервер)
  const handleSearch = async () => {
    if (!placeInput.trim()) {
      setShowTooltip(true);
      return;
    }
    setShowTooltip(false);
    try {
      dispatch(getToursRequest({
        isAccommodation: false,
        categoryIds: '',
        startDate: dateRangeInput?.[0]?.format ? dateRangeInput[0].format('YYYY-MM-DD') : '',
        endDate: dateRangeInput?.[1]?.format ? dateRangeInput[1].format('YYYY-MM-DD') : '',
        city: placeInput,
        durationFrom: 1,
        durationTo: 30,
      }));
    } catch (error) {
      console.error('Ошибка при поиске:', error);
    }
  };
  

  const updateParticipants = (increment: boolean) => {
    setParticipants((prev: number) => Math.max(1, prev + (increment ? 1 : -1)));
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <Box sx={searchStyles.barWrapper}>
      <Box sx={searchStyles.mainContainer}>
        {/* Поле для ввода места */}
        <FormControl variant="outlined" className="barItem">
          <Tooltip
            title={showTooltip ? 'Место не может быть пустым' : ''}
            open={showTooltip}
            arrow
            placement="bottom"
          >
            <OutlinedInput
              type="text"
              placeholder="Место"
              value={placeInput}
              onChange={handlePlaceChange}
              sx={{
                ...searchStyles.input,
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
              startAdornment={
                <InputAdornment position="start">
                  <img src={SearchIcon} alt="search" />
                </InputAdornment>
              }
            />
          </Tooltip>
        </FormControl>

        <Divider orientation="vertical" />

        {/* Поле для выбора дат */}
        <ConfigProvider locale={ruRU} theme={searchStyles.datePickerTheme}>
          <RangePicker
            format="dd, D MMM"
            placeholder={['Заезд', 'Отъезд']}
            disabledDate={(current) => current && current < dayjs().startOf('day')}
            prefix={<img src={DateIcon} alt="date" />}
            suffixIcon={null}
            style={searchStyles.input}
            inputReadOnly
            value={dateRangeInput}
            onChange={handleDateChange}
            className="barItem"
          />
        </ConfigProvider>

        <Divider orientation="vertical" />

        {/* Меню для выбора количества людей */}
        <Box sx={searchStyles.peopleWrapper} className="barItem">
          <Typography sx={{ mr: 2, minWidth: '90px', alignContent: 'center' }}>Участники</Typography>
          <IconButton size="small" aria-label="minus participants" onClick={() => updateParticipants(false)}><RemoveIcon /></IconButton>
          <Typography component="span" sx={{ mx: 1, alignContent: 'center' }}>{participants}</Typography>
          <IconButton size="small" aria-label="plus participants" onClick={() => updateParticipants(true)}><AddIcon /></IconButton>
        </Box>

        {/* Кнопка поиска */}
        <Button
          variant="contained"
          className="searchButton"
          disableElevation
          onClick={handleSearch}
        >
          Найти
        </Button>
      </Box>
    </Box>
  );
};
