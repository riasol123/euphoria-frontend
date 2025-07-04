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
import { userUpdateRequest } from '../../redux/actions/auth';
import { AppDispatch, RootState } from '../../hooks/getTypedSelector';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { getImageUrl } from '../../utils/getImageUrl';

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
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === 'avatar' && files?.[0]) {
      const file = files[0];

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 10 * 1024 * 1024; // 10 MB

      if (!allowedTypes.includes(file.type)) {
        alert('Допустимы только изображения форматов JPG, JPEG и PNG.');
        return;
      }

      if (file.size > maxSize) {
        alert('Размер изображения не должен превышать 10 МБ.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setValues((prev) => ({ ...prev, avatar: reader.result as string }));
        setIsAvatarChanged(true);
      };
      reader.readAsDataURL(file);
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
  
    if (values.avatar && isAvatarChanged) {
      const blob = await fetch(values.avatar).then(res => res.blob());
      formData.append('avatar', blob, 'avatar.png');
    }

    dispatch(userUpdateRequest(formData));
  };

  useEffect(() => {
    setValues({
      name: authUser?.name || '',
      email: authUser?.email || '',
      surname: authUser?.surname || '',
      avatar: authUser?.avatarPath || '',
      patronymic: authUser?.patronymic || '',
    });
  }, [authUser]);

  useEffect(() => {
    setIsAvatarChanged(false);
  }, [authUser?.avatarPath]);

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
          accept="image/jpeg,image/jpg,image/png"
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
        <Avatar
          src={
            values.avatar?.startsWith('data:')
              ? values.avatar
              : values.avatar
              ? getImageUrl(values.avatar)
              : undefined
          }
          sx={{ width: 110, height: 110 }}
        />
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
        disabled
      />

      <Button type="submit" variant="contained" sx={styles.saveButton} disableElevation>
        Сохранить изменения
      </Button>
    </Box>
  );
}
