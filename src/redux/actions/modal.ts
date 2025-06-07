import { ModalAction } from '../../types/modal/types';

import { CHANGE_MODAL_PROPS } from '../actionTypes';

export const changeModalProps = (payload: ModalAction): ModalAction => ({
  type: CHANGE_MODAL_PROPS,
  payload,
})

export const openModal = (type: string, data?: any): ModalAction => ({
  type: 'OPEN_MODAL',
  payload: { type, data },
});

export const closeModal = (): ModalAction => ({
  type: 'CLOSE_MODAL',
});

