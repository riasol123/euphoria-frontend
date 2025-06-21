import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { styles } from './OrganizerFormStyle';
import { useEffect, useState } from 'react';
import { fetchOrganizerRequest, getOrganizerStatusRequest } from '../../redux/actions/organizer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../hooks/getTypedSelector';
import { ModalType } from '../../types/modal/types';
import { openModal } from '../../redux/actions/modal';

export const OrganizerForm = () => {
  const [documentNumber, setDocumentNumber] = useState('');
  const { applicationStatus } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDocumentNumber(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(fetchOrganizerRequest(documentNumber));
      dispatch(getOrganizerStatusRequest());
      dispatch(openModal({ title: 'Готово!', description: 'Ваша заявка была отправлена.', type: ModalType.success }));
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
    }
  };

  const handleCheckStatus = () => {
    dispatch(getOrganizerStatusRequest())
  }

  useEffect(() => {
    handleCheckStatus();
  }, []);

  return (
    <Box component="form" onSubmit={(!applicationStatus) ? handleSubmit : handleCheckStatus} sx={styles.container}>
      <Typography sx={styles.title}>
        Стать организатором туров
      </Typography>
      { applicationStatus === 'pending' && 
        <>
          <Divider></Divider>
          <Typography sx={styles.status}>
            Заявка в обработке.
          </Typography>
          <Divider></Divider>
        </>
      }
      { !applicationStatus && <>
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
      </>}
      <Typography sx={styles.sectionTitle}>
        После подтверждения вы получите доступ к следующим функциям:
      </Typography>
      <Typography sx={styles.listItem}>• Создание, редактирование и удаление собственных туров</Typography>
      <Typography sx={styles.listItem}>• Просмотр и управление заявками на бронирование</Typography>
      <Typography sx={styles.listItem}>• Отслеживание статуса заявок и взаимодействие с туристами</Typography>

      { !applicationStatus && <><Typography sx={styles.warning}>
        Важно: Указанные данные будут проверены. Убедитесь в корректности введённой информации.
      </Typography>

      <TextField
        label={'ИНН или ОГРН'}
        name="documentNumber"
        fullWidth
        required
        sx={styles.input}
        value={documentNumber}
        onChange={handleChange}
      />

      <Button type="submit" variant="contained" sx={styles.submitButton} disableElevation>
        Отправить заявку
      </Button>
      </>}  
      { applicationStatus === 'pending' &&
        <Button type="submit" variant="contained" sx={styles.submitButton} disableElevation>
        Обновить статус
        </Button>}
    </Box>
  );
}; 