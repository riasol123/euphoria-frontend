import { ChangeEvent, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { Box, Button, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { ConfigProvider, DatePicker } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import SearchIcon from '../../assets/search.svg';
import DateIcon from '../../assets/date.svg';
import DropDown from '../../assets/dropdown.svg';
import PeopleIcon from '../../assets/people.svg';

import { searchStyles } from './SearchBarStyle';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

dayjs.locale('ru');

export const SearchBar = () => {
  const { RangePicker } = DatePicker;

  const [place, setPlace] = useState('');
  const [dateRange, setDateRange] = useState(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handlePlaceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlace(event.target.value);
  };

  const handleDateChange = (dates: any) => {
    setDateRange(dates);
  };

  const handleSearch = () => {
    console.log('Место:', place);
    console.log('Даты:', dateRange);
    console.log('Взрослые:', adults, 'Дети:', children);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateCount = (type: 'adults' | 'children', increment: boolean) => {
    if (type === 'adults') {
      setAdults((prev) => Math.max(1, prev + (increment ? 1 : -1)));
    } else {
      setChildren((prev) => Math.max(0, prev + (increment ? 1 : -1)));
    }
  };

  return (
    <Box sx={searchStyles.barWrapper}>
      <Box sx={searchStyles.mainContainer}>
        <FormControl variant="outlined" className="barItem">
          <OutlinedInput
            type="text"
            placeholder="Место"
            value={place}
            onChange={handlePlaceChange}
            sx={searchStyles.input}
            startAdornment={
              <InputAdornment position="start">
                <img src={SearchIcon} alt="search" />
              </InputAdornment>
            }
          />
        </FormControl>

        <Divider orientation="vertical" />

        <ConfigProvider locale={ruRU} theme={searchStyles.datePickerTheme}>
          <RangePicker
            format="dd, D MMM"
            placeholder={['Заезд', 'Отъезд']}
            disabledDate={(current) => current && current < dayjs().startOf('day')}
            prefix={<img src={DateIcon} alt="date" />}
            suffixIcon={null}
            style={searchStyles.input}
            inputReadOnly
            value={dateRange}
            onChange={handleDateChange}
            className="barItem"
          />
        </ConfigProvider>

        <Divider orientation="vertical" />

        <Box sx={searchStyles.peopleWrapper} className="barItem">
          <Button
            id="people-count"
            aria-controls={open ? 'people-count-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <img src={PeopleIcon} alt="people"/>
            {adults} взрослых · {children} детей
            <img src={DropDown} alt="dropdown" />
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
