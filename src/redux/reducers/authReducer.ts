import { AuthInformation, InitialStateTypes } from '../../types/auth/types';
import { USER_UPDATE_FAILURE, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from '../actions/auth';

import {
  AUTH_LOGOUT,
  WHOAMI_REQUEST,
  WHOAMI_SUCCESS,
  WHOAMI_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_GENERATE_VERIFY_CODE_REQUEST,
  AUTH_GENERATE_VERIFY_CODE_SUCCESS,
  AUTH_GENERATE_VERIFY_CODE_FAILURE,
  AUTH_VERIFY_EMAIL_REQUEST,
  AUTH_VERIFY_EMAIL_SUCCESS,
  AUTH_VERIFY_EMAIL_FAILURE,
  GET_ORGANIZER_STATUS_SUCCESS,
  POST_ORGANIZER_REQUEST,
} from '../actionTypes';

interface AuthAction {
  type: string;
  payload: AuthInformation;
  error: string | null;
}

const initialState: InitialStateTypes & {
  isGeneratingCode?: boolean;
  isVerifying?: boolean;
  verificationError?: string | null;
  applicationStatus?: string;
} = {
  authUser: null,
  isLogged: Boolean(localStorage.getItem('authToken')),
  isLoading: false,
  error: null,
  isGeneratingCode: false,
  isVerifying: false,
  verificationError: null,
};

export default function authReducer(state = initialState, action: AuthAction) {
  switch (action.type) {
    case AUTH_LOGOUT:
      return {
        ...state,
        isLogged: false,
        error: null,
      };
    case WHOAMI_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case WHOAMI_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLogged: true,
        authUser: action.payload,
        error: null,
      };
    case WHOAMI_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLogged: false,
        authUser: null,
        error: action.error,
      };
    case USER_UPDATE_REQUEST:
    case AUTH_LOGIN_REQUEST:
    case AUTH_REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case AUTH_LOGIN_SUCCESS:
    case AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLogged: true,
        authUser: action.payload.user,
        error: null,
      };
    case AUTH_LOGIN_FAILURE:
    case AUTH_REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLogged: false,
        error: action.error,
      };
    case AUTH_GENERATE_VERIFY_CODE_REQUEST:
      return {
        ...state,
        isGeneratingCode: true,
        verificationError: null,
      };
    case AUTH_GENERATE_VERIFY_CODE_SUCCESS:
      return {
        ...state,
        isGeneratingCode: false,
        verificationError: null,
      };
    case AUTH_GENERATE_VERIFY_CODE_FAILURE:
      return {
        ...state,
        isGeneratingCode: false,
        verificationError: action.error,
      };
    case AUTH_VERIFY_EMAIL_REQUEST:
      return {
        ...state,
        isVerifying: true,
        verificationError: null,
      };
    case AUTH_VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        isVerifying: false,
        verificationError: null,
        isLogged: true,
        authUser: action.payload,
        isVerified: true,
      };
    case AUTH_VERIFY_EMAIL_FAILURE:
      return {
        ...state,
        isVerifying: false,
        verificationError: action.error,
      };
    case USER_UPDATE_FAILURE: 
          return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case USER_UPDATE_SUCCESS: 
      return {
        ...state,
        isLoading: false,
        authUser: { ...state.authUser, ...action.payload } ,
        error: null,
      };
    case POST_ORGANIZER_REQUEST: 
      return {
        ...state,
        applicationStatus: 'pending',
      };
    case GET_ORGANIZER_STATUS_SUCCESS: 
      return {
        ...state,
        applicationStatus: (action.payload as any)[0].adminApprove,
      };
    default:
      return state;
  }
}
