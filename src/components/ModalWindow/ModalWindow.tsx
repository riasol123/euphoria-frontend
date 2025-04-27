import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { AppDispatch, RootState } from '../../hooks/getTypedSelector';
import { changeModalProps } from '../../redux/actions/modal';
import { AuthForm } from '../AuthContent/AuthForm';

import { modalWindowStyles } from './ModalWindowStyle';

export const ModalAuth: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const closeModal = () => {
    dispatch(changeModalProps({ isOpen: false, type: '' }));
  };

  const { modalType, isModalOpen } = useSelector((state: RootState) => state.modal);
  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalWindowStyles.modalBox}>
        <Typography sx={modalWindowStyles.modalTitle}>{modalType}</Typography>
        <AuthForm type={modalType} />
      </Box>
    </Modal>
  );
};
