import { ChangeEvent, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { Box, Typography, Button, Tooltip } from '@mui/material';
import { ConfigProvider, DatePicker } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');

import SearchIcon from '../../assets/search.svg';
import DateIcon from '../../assets/date.svg';

import { searchStyles } from './SmallSearchFormStyle';
import { setSearchData } from '../../redux/actions/search';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const SmallSearchForm = () => {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [city, setCity] = useState('');
  const [dateRange, setDateRange] = useState<any>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  // Только буквы (русские, латинские), пробелы и дефисы
  const allowedPattern = /^[a-zA-Zа-яА-ЯёЁ\-\s]*$/;

  const handlePlaceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (allowedPattern.test(value)) {
      setCity(value);
      if (value.trim()) {
        setShowTooltip(false);
      }
    }
  };

  const handleDateChange = (dates: any) => {
    setDateRange(dates);
  };

  const handleSearch = () => {
    if (!city.trim()) {
      setShowTooltip(true);
      return;
    }
    setShowTooltip(false);
    dispatch(setSearchData({ 
      city, 
      dateRange,
      adults: 2,
      children: 0
    }));
    navigate('/search');
  };

  return (
    <Box sx={searchStyles.mainContainer}>
      <Box sx={searchStyles.textContainer}>
        <Typography variant='h6'>Путешествуй со вкусом!</Typography>
        <Typography>А мы поможем тебе с выбором</Typography>
      </Box>
      <Box sx={searchStyles.inputContainer}>
        <FormControl sx={searchStyles.formControl} variant="outlined">
          <Tooltip
            title={showTooltip ? 'Место не может быть пустым' : ''}
            open={showTooltip}
            arrow
            placement="top"
          >
            <OutlinedInput
              id="outlined-adornment-password"
              type='text'
              placeholder='Место'
              value={city}
              onChange={handlePlaceChange}
              sx={searchStyles.input}
              startAdornment={
                <InputAdornment position="start">
                  <img src={SearchIcon} alt="search"/>
                </InputAdornment>
              }
            />
          </Tooltip>
        </FormControl>
        <ConfigProvider 
          locale={ruRU}
          theme={searchStyles.datePickerTheme}>
          <RangePicker
            format="dd, D MMM"
            placeholder={['Заезд', 'Отъезд']}
            disabledDate={(current) => current && current < dayjs().startOf('day')}
            prefix={<img src={DateIcon} alt="date"/>}
            suffixIcon={null}
            style={searchStyles.input}
            inputReadOnly
            value={dateRange}
            onChange={handleDateChange}
          />
        </ConfigProvider>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleSearch}
        >
          Найти туры
        </Button>
      </Box>
    </Box>
  );
};
