import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import { styles } from './AccountSettingStyle';

import { authReceived, userLogOut } from '../../redux/actions/auth';
import { AppDispatch } from '../../hooks/getTypedSelector';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Divider } from 'antd';
import { useNavigate } from 'react-router-dom';

export function AccountSetting() {
  const defaultValues = {
    oldPassword: '',
    newPassword: '',
  };
  const dispatch: AppDispatch = useDispatch();
  const [values, setValues] = useState(defaultValues);
  const navigate = useNavigate();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await axios.patch('https://82grrc2b-3001.euw.devtunnels.ms/user/password', values, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      dispatch(authReceived(response.data));
      setValues(defaultValues);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(userLogOut());
    navigate('/');
  };


  return (
    <Box component="form" onSubmit={handleSubmit} sx={styles.container}>
      <Typography sx={styles.title}>Установка нового пароля</Typography>
      <TextField
        label="Новый пароль"
        name="newPassword"
        fullWidth
        sx={styles.input}
        value={values.newPassword}
        onChange={handleChange}
      />
      <TextField
        label="Старый пароль"
        name="oldPassword"
        fullWidth
        sx={styles.input}
        value={values.oldPassword}
        onChange={handleChange}
      />

      <Button type="submit" variant="contained" sx={styles.saveButton} disableElevation>
        Сохранить изменения
      </Button>
      <Divider></Divider>
      <Button type="button" variant="outlined" sx={styles.saveButton} disableElevation onClick={handleLogout}>
        Выйти
      </Button>
    </Box>
  );
}
