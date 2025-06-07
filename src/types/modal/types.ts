export interface ModalState {
  isOpen: boolean;
  type: string | null;
  data: any | null;
}

export interface ModalAction {
  type: string;
  payload?: any;
} 