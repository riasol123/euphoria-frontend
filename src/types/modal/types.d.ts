export interface ModalDataAction {
  isOpen: boolean;
  type: string;
}

export interface ModalAction {
  type: string,
  payload: ModalDataAction
}

export interface AuthFormProps {
  type: string;
}

export interface ModalInitialState { 
  isModalOpen: boolean;
  modalType: string;
}

