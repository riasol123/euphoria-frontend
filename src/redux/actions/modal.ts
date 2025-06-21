import { ModalAction, ModalState } from '../../types/modal/types';

import { CLOSE_MODAL, OPEN_MODAL } from '../actionTypes';

export const openModal = (payload: Omit<ModalState, 'isOpen'>): ModalAction => ({
  type: OPEN_MODAL,
  payload,
});

export const closeModal = (): ModalAction => ({
  type: CLOSE_MODAL,
});

