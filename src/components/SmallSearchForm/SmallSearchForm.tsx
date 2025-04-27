import { ChangeEvent, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { Box, Typography, Button } from '@mui/material';
import { ConfigProvider, DatePicker } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru');

import SearchIcon from '../../assets/search.svg';
import DateIcon from '../../assets/date.svg';

import { searchStyles } from './SmallSearchFormStyle';

export const SmallSearchForm = () => {
  const { RangePicker } = DatePicker;

  // Состояния для хранения значений инпута и DatePicker
  const [place, setPlace] = useState('');
  const [dateRange, setDateRange] = useState(null);

  // Функция для обработки изменений в инпуте
  const handlePlaceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlace(event.target.value);
  };

  // Функция для обработки изменений в DatePicker
  const handleDateChange = (dates: any) => {
    setDateRange(dates);
  };

  // Функция для обработки клика по кнопке
  const handleSearch = () => {
    // Здесь можно использовать собранные данные для дальнейших действий
    console.log('Место:', place);
    console.log('Даты:', dateRange);
    // Например, можно отправить их на сервер или в другой компонент
  };

  return (
    <Box sx={searchStyles.mainContainer}>
      <Box sx={searchStyles.textContainer}>
        <Typography variant='h6'>Путешествуй со вкусом!</Typography>
        <Typography>А мы поможем тебе с выбором</Typography>
      </Box>
      <Box sx={searchStyles.inputContainer}>
        <FormControl sx={searchStyles.formControl} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-password"
            type='text'
            placeholder='Место'
            value={place}
            onChange={handlePlaceChange}  // Обработчик изменения
            sx={searchStyles.input}
            startAdornment={
              <InputAdornment position="start">
                <img src={SearchIcon} alt="search"/>
              </InputAdornment>
            }
          />
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
            value={dateRange}  // Установка значения для диапазона дат
            onChange={handleDateChange}  // Обработчик изменения
          />
        </ConfigProvider>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleSearch}  // Обработчик клика по кнопке
        >
          Найти туры
        </Button>
      </Box>
    </Box>
  );
};
