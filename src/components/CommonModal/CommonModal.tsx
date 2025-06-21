import { FC } from 'react';
import { Box, Typography, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SuccessIcon from '../../assets/success.png';
import ErrorIcon from '../../assets/error.png';
import { emailVerificationModalStyles as styles } from './CommonModalStyles';
import { AppDispatch, RootState } from '../../hooks/getTypedSelector';
import { ModalType } from '../../types/modal/types';
import { closeModal } from '../../redux/actions/modal';

const CommonModal: FC= () => {
  const { isOpen, type, title, description } = useSelector((state: RootState) => state.modal);
  const dispatch: AppDispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      sx={styles.modal}
    >
      <Box sx={styles.container}>
        <img
          src={type === ModalType.success ? SuccessIcon : ErrorIcon}
          alt={type}
          style={{ width: '50px', height: '50px' }}
        />
        <Typography variant="h6" sx={styles.title}>
          {title}
        </Typography>
        <Typography sx={styles.text}>
          {description}
        </Typography>
      </Box>
    </Modal>
  );
};

export default CommonModal; 