import { AuthInformation, InitialStateTypes } from '../../types/auth/types';

import {
  AUTH_FAILED,
  AUTH_LOGOUT,
  AUTH_REQUESTED,
  AUTH_SUCCESS,
} from '../actionTypes';

interface AuthAction {
  type: string;
  payload: AuthInformation;
  error: string | null;
}

const initialState: InitialStateTypes = {
  authUser: null,
  isLogged: Boolean(localStorage.getItem('authToken')),
  isLoading: false,
  error: null,
};

export default function authReducer(state = initialState, action: AuthAction) {
  switch (action.type) {
    case AUTH_LOGOUT:
      return {
        ...state,
        isLogged: false,
        error: null,
      };
    case AUTH_REQUESTED:
      return {
        ...state,
        isLoading: true,
        isLogged: false,
        error: null,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLogged: true,
        authUser: action.payload,
        error: null,
      };
    case AUTH_FAILED:
      return {
        ...state,
        isLoading: false,
        isLogged: false,
        authUser: null,
        error: action.error,
      };
    default:
      return state;
  }
}
