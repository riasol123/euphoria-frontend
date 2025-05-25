import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Путь для правильной типизации стейта
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { Box, Button, Divider, IconButton, Menu, MenuItem, Typography, Tooltip } from '@mui/material';
import { ConfigProvider, DatePicker } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import SearchIcon from '../../assets/search.svg';
import DateIcon from '../../assets/date.svg';
import DropDown from '../../assets/dropdown.svg';
import PeopleIcon from '../../assets/people.svg';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { searchStyles } from './SearchBarStyle';
import { RootState } from '../../hooks/getTypedSelector';
import { setSearchData } from '../../redux/actions/search';
import { api } from '../../utils/api';
import { setTours } from '../../redux/actions/tour';

dayjs.locale('ru');

// Компонент SearchBar
export const SearchBar = () => {
  const { RangePicker } = DatePicker;

  // Получаем данные из Redux Store
  const { city, dateRange } = useSelector((state: RootState) => state.search);
  const searchData = useSelector((state: RootState) => state.search);

  // Локальные состояния для инпутов
  const [placeInput, setPlace] = useState(city || '');  // Место
  const [dateRangeInput, setDateRange] = useState(dateRange || null);  // Даты
  const [adults, setAdults] = useState(2);  // Количество взрослых
  const [children, setChildren] = useState(0);  // Количество детей

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [showTooltip, setShowTooltip] = useState(false);

  const dispatch = useDispatch();

  // Только буквы (русские, латинские), пробелы и дефисы
  const allowedPattern = /^[a-zA-Zа-яА-ЯёЁ\-\s]*$/;

  // Обработчик изменения поля "Место"
  const handlePlaceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (allowedPattern.test(value)) {
      setPlace(value);
      dispatch(setSearchData({ city: value }));
      if (value.trim()) {
        setShowTooltip(false);
      }
    }
    // Если не проходит по паттерну, не обновляем значение
  };

  // Обработчик изменения дат
  const handleDateChange = (dates: any) => {
    setDateRange(dates);
    dispatch(setSearchData({ dateRange: dates }));
  };

  // Функция для отправки данных (например, в Redux Store или на сервер)
  const handleSearch = async () => {
    if (!placeInput.trim()) {
      setShowTooltip(true);
      return;
    }
    setShowTooltip(false);
    try {
      const params = new URLSearchParams();
  
      if (searchData.city) params.append('city', searchData.city);
      if (searchData.dateRange?.[0]) params.append('startDate', searchData.dateRange[0].format('YYYY-MM-DD'));
      if (searchData.dateRange?.[1]) params.append('endDate', searchData.dateRange[1].format('YYYY-MM-DD'));
      if (searchData.durationFrom) params.append('durationFrom', String(searchData.durationFrom));
      if (searchData.durationTo) params.append('durationTo', String(searchData.durationTo));
      if (searchData.isAccomodation !== undefined) params.append('isAccomodation', String(searchData.isAccomodation));
  
      const response = await api.get('/tour', {
        params: Object.fromEntries(params),
      });
  
      console.log('Результат поиска:', response.data);
      dispatch(setTours(response.data));
    } catch (error) {
      console.error('Ошибка при поиске:', error);
    }
  };
  

  // Обработчик клика по кнопке для изменения количества людей
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Закрытие меню выбора людей
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Функция для обновления количества людей (взрослых и детей)
  const updateCount = (type: 'adults' | 'children', increment: boolean) => {
    if (type === 'adults') {
      setAdults((prev) => Math.max(1, prev + (increment ? 1 : -1)));
    } else {
      setChildren((prev) => Math.max(0, prev + (increment ? 1 : -1)));
    }
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
          <Button
            id="people-count"
            aria-controls={open ? 'people-count-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <img src={PeopleIcon} alt="people" />
            {adults} взрослых · {children} детей
            <img
              src={DropDown}
              alt="dropdown"
              style={{
                // transition: 'transform 0.2s',
                transform: open ? 'rotate(180deg)' : 'none',
                width: '16px',
                height: '16px',
              }}
            />
          </Button>
          <Menu
            id="people-count-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={searchStyles.menu}
            MenuListProps={{ 'aria-labelledby': 'people-count' }}
          >
            <MenuItem>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '200px' }}>
                <Typography>Взрослые</Typography>
                <Box>
                  <IconButton size="small" onClick={() => updateCount('adults', false)}><RemoveIcon /></IconButton>
                  <Typography component="span" sx={{ mx: 1 }}>{adults}</Typography>
                  <IconButton size="small" onClick={() => updateCount('adults', true)}><AddIcon /></IconButton>
                </Box>
              </Box>
            </MenuItem>
            <MenuItem>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '200px' }}>
                <Typography>Дети</Typography>
                <Box>
                  <IconButton size="small" onClick={() => updateCount('children', false)}><RemoveIcon /></IconButton>
                  <Typography component="span" sx={{ mx: 1 }}>{children}</Typography>
                  <IconButton size="small" onClick={() => updateCount('children', true)}><AddIcon /></IconButton>
                </Box>
              </Box>
            </MenuItem>
          </Menu>
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
