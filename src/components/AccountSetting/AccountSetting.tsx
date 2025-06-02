import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { styles } from './AccountSettingStyle';

import { userLogOut, userPasswordChangeRequest } from '../../redux/actions/auth';
import { AppDispatch } from '../../hooks/getTypedSelector';
import { useDispatch } from 'react-redux';
import { Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';

export function AccountSetting() {
  const defaultValues = {
    oldPassword: '',
    newPassword: '',
  };
  const dispatch: AppDispatch = useDispatch();
  const [values, setValues] = useState(defaultValues);
  const navigate = useNavigate();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(userPasswordChangeRequest(values));
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
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
        type={showNewPassword ? 'text' : 'password'}
        fullWidth
        sx={styles.input}
        value={values.newPassword}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle new password visibility"
                onClick={() => setShowNewPassword((show) => !show)}
                edge="end"
                sx={{ p: 0.5, background: 'none', '&:hover': { background: 'none' }, '&:active': { background: 'none' }, mr: 0, opacity: 0.5 }}
              >
                {showNewPassword ? <VisibilityOffOutlined sx={{ fontSize: 20 }} /> : <VisibilityOutlined sx={{ fontSize: 20 }} />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Старый пароль"
        name="oldPassword"
        type={showOldPassword ? 'text' : 'password'}
        fullWidth
        sx={styles.input}
        value={values.oldPassword}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle old password visibility"
                onClick={() => setShowOldPassword((show) => !show)}
                edge="end"
                sx={{ p: 0.5, background: 'none', '&:hover': { background: 'none' }, '&:active': { background: 'none' }, mr: 0, opacity: 0.5 }}
              >
                {showOldPassword ? <VisibilityOffOutlined sx={{ fontSize: 20 }} /> : <VisibilityOutlined sx={{ fontSize: 20 }} />}
              </IconButton>
            </InputAdornment>
          ),
        }}
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
