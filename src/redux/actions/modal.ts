import { ModalAction, ModalDataAction } from '../../types/modal/types';

import { CHANGE_MODAL_PROPS } from '../actionTypes';

export const changeModalProps = (payload: ModalDataAction): ModalAction => ({
  type: CHANGE_MODAL_PROPS,
  payload,
})

