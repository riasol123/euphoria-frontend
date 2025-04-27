import { ModalAction, ModalInitialState } from '../../types/modal/types';

import { CHANGE_MODAL_PROPS } from '../actionTypes';

const initialState: ModalInitialState = {
  isModalOpen: false,
  modalType: '',
};

const modalReducer = (state = initialState, action: ModalAction) => {
  switch (action.type) {
    case CHANGE_MODAL_PROPS:
      return {
        ...state,
        isModalOpen: action.payload.isOpen,
        modalType: action.payload.type,
      };
    default:
      return state;
  }
};

export default modalReducer;
