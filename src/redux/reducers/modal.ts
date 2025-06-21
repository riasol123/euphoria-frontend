import { ModalState, ModalType } from '../../types/modal/types';
import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../actionTypes';

const initialState: ModalState = {
  isOpen: false,
  type: ModalType.success,
  title: '',
  description: '',
};

export const modalReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        ...action.payload,
        isOpen: true,
      };
    case CLOSE_MODAL:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}; 