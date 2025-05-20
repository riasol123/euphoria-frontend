import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from '@mui/material';
import { styles } from './OrganizerFormStyle';
import { useState } from 'react';
import axios from 'axios';

export const OrganizerForm = () => {
  const [values, setValues] = useState({
    organizationName: '',
    documentType: 'inn',
    documentNumber: '',
    address: '',
    phone: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'https://82grrc2b-3001.euw.devtunnels.ms/organizer/request',
        values,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      // Handle success
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={styles.container}>
      <Typography sx={styles.title}>
        Стать организатором туров
      </Typography>
      <Typography sx={styles.subtitle}>
        Хотите размещать собственные туры и управлять ими?
      </Typography>
      <Typography sx={styles.subtitle}>
        Заполните форму ниже и подтвердите данные вашей организации.
      </Typography>

      <Typography sx={styles.sectionTitle}>
        Для регистрации в качестве организатора, укажите один из реквизитов:
      </Typography>
      <Typography sx={styles.listItem}>• ИНН (Идентификационный номер налогоплательщика)</Typography>
      <Typography sx={styles.listItem}>• ОГРН (Основной государственный регистрационный номер)</Typography>

      <Typography sx={styles.sectionTitle}>
        После подтверждения вы получите доступ к следующим функциям:
      </Typography>
      <Typography sx={styles.listItem}>• Создание, редактирование и удаление собственных туров</Typography>
      <Typography sx={styles.listItem}>• Просмотр и управление заявками на бронирование</Typography>
      <Typography sx={styles.listItem}>• Отслеживание статуса заявок и взаимодействие с туристами</Typography>

      <Typography sx={styles.warning}>
        Важно: Указанные данные будут проверены. Убедитесь в корректности введённой информации.
      </Typography>

      <TextField
        label={'ИНН или ОГРН'}
        name="documentNumber"
        fullWidth
        required
        sx={styles.input}
        value={values.documentNumber}
        onChange={handleChange}
      />

      <Button type="submit" variant="contained" sx={styles.submitButton} disableElevation>
        Отправить заявку
      </Button>
    </Box>
  );
}; 