export enum ModalType {
  error = 'error',
  success = 'success',
  approve = 'approve',
}

export interface ModalState {
  isOpen: boolean;
  type: ModalType;
  title: string;
  description: string;
}

export interface ModalAction {
  type: string;
  payload?: any;
} 
