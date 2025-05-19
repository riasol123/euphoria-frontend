export interface AuthInformation {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    surname: string;
    patronymic?: string;
    avatarPath?: string;
  };
}

export interface AuthUserAction {
  id: number;
  email: string;
  login: string;
  avatarPath: string;
}

export interface AuthDate {
  [k: string]: FormDataEntryValue;
}

export interface InitialStateTypes {
  authUser: AuthInformation | null;
  isLogged: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthAction {
  type: string;
  payload: AuthDataAction;
  error?: string | null;
}
