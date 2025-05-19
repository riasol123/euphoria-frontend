import {
  Avatar,
  Button,
  TextField,
  Typography,
  Box,
  Badge,
} from '@mui/material';
import { styles } from './EditUserFormStyle';

import EditIcon from '../../assets/edit.png';
import { authReceived } from '../../redux/actions/auth';
import { AppDispatch, RootState } from '../../hooks/getTypedSelector';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const EditUserForm = () => {
  const { authUser } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const [values, setValues] = useState({
    name: authUser?.name || '',
    email: authUser?.email || '',
    surname: authUser?.surname || '',
    avatar: authUser?.avatarPath || '',
    patronymic: authUser?.patronymic || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'avatar' && files?.[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValues((prev) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData();
    if (values.surname) formData.append('surname', values.surname);
    if (values.name) formData.append('name', values.name);
    if (values.patronymic) formData.append('patronymic', values.patronymic);
    if (values.email) formData.append('email', values.email);
  
    if (values.avatar) {
      const blob = await fetch(values.avatar).then(res => res.blob());
      formData.append('avatarPath', blob, 'avatar.png');
    }

    const token = localStorage.getItem('token');

    try {
      const response = await axios.patch('https://82grrc2b-3001.euw.devtunnels.ms/user/personal-info', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      dispatch(authReceived(response.data));
      setValues(authUser);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  const whoami = async () => {

    const url = 'https://82grrc2b-3001.euw.devtunnels.ms/auth/whoami';
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      dispatch(authReceived(response.data));
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
  };

  useEffect(() => {
    whoami();
  }, []);
  

  return (
    <Box component="form" onSubmit={handleSubmit} sx={styles.container}>
      <Typography sx={styles.title}>
        Редактирование личных данных
      </Typography>
      <label htmlFor="avatar-upload" style={{ cursor: 'pointer', width: 'fit-content' }}>
        <input
          id="avatar-upload"
          hidden
          type="file"
          accept="image/*"
          name="avatar"
          onChange={handleChange}
        />
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <img src={EditIcon} style={styles.editIcon} alt="Редактировать" />
          }
        >
         <Avatar src={'https://82grrc2b-3001.euw.devtunnels.ms/' + values.avatar} sx={{ width: 110, height: 110 }} />
        </Badge>
      </label>
      <TextField
        label="Фамилия"
        name="surname"
        fullWidth
        sx={styles.input}
        value={values.surname}
        onChange={handleChange}
      />
      <TextField
        label="Имя"
        name="name"
        fullWidth
        sx={styles.input}
        value={values.name}
        onChange={handleChange}
      />
      <TextField
        label="Отчество"
        name="patronymic"
        fullWidth
        sx={styles.input}
        value={values.patronymic}
        onChange={handleChange}
      />
      <TextField
        label="Почта"
        name="email"
        type="email"
        sx={styles.input}
        fullWidth
        value={values.email}
        onChange={handleChange}
      />

      <Button type="submit" variant="contained" sx={styles.saveButton} disableElevation>
        Сохранить изменения
      </Button>
    </Box>
  );
}
