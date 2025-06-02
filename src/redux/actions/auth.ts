import {
  AUTH_VERIFY_REQUESTED,
  AUTH_LOGOUT,
  WHOAMI_REQUEST,
  WHOAMI_SUCCESS,
  WHOAMI_FAILURE,
  AUTH_GENERATE_VERIFY_CODE_REQUEST,
  AUTH_GENERATE_VERIFY_CODE_SUCCESS,
  AUTH_GENERATE_VERIFY_CODE_FAILURE,
  AUTH_VERIFY_EMAIL_REQUEST,
  AUTH_VERIFY_EMAIL_SUCCESS,
  AUTH_VERIFY_EMAIL_FAILURE,
} from '../actionTypes';

export const verificationUser = () => ({
  type: AUTH_VERIFY_REQUESTED,
});

export const userLogOut = () => ({
  type: AUTH_LOGOUT,
});

export const whoamiRequest = () => ({ type: WHOAMI_REQUEST });
export const whoamiSuccess = (data: any) => ({ type: WHOAMI_SUCCESS, payload: data });
export const whoamiFailure = (error: string) => ({ type: WHOAMI_FAILURE, error });

export const authLoginRequest = (payload: { email: string; password: string }) => ({
  type: 'AUTH_LOGIN_REQUEST',
  payload,
});
export const authLoginSuccess = (data: any) => ({ type: 'AUTH_LOGIN_SUCCESS', payload: data });
export const authLoginFailure = (error: string) => ({ type: 'AUTH_LOGIN_FAILURE', error });

export const authRegisterRequest = (payload: { email: string; password: string; name: string; surname: string }) => ({
  type: 'AUTH_REGISTER_REQUEST',
  payload,
});
export const authRegisterSuccess = (data: any) => ({ type: 'AUTH_REGISTER_SUCCESS', payload: data });
export const authRegisterFailure = (error: string) => ({ type: 'AUTH_REGISTER_FAILURE', error });

export const authGenerateVerifyCodeRequest = (payload: { email: string; name: string }) => ({
  type: AUTH_GENERATE_VERIFY_CODE_REQUEST,
  payload,
});

export const authGenerateVerifyCodeSuccess = (data: any) => ({
  type: AUTH_GENERATE_VERIFY_CODE_SUCCESS,
  payload: data,
});

export const authGenerateVerifyCodeFailure = (error: string) => ({
  type: AUTH_GENERATE_VERIFY_CODE_FAILURE,
  payload: error,
});

export const authVerifyEmailRequest = (payload: { email: string; code: string }) => ({
  type: AUTH_VERIFY_EMAIL_REQUEST,
  payload,
});

export const authVerifyEmailSuccess = (data: any) => ({
  type: AUTH_VERIFY_EMAIL_SUCCESS,
  payload: data,
});

export const authVerifyEmailFailure = (error: string) => ({
  type: AUTH_VERIFY_EMAIL_FAILURE,
  payload: error,
});

export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_FAILURE = 'USER_UPDATE_FAILURE';

export const userUpdateRequest = (payload: FormData) => ({
  type: USER_UPDATE_REQUEST,
  payload,
});

export const userUpdateSuccess = (user: any) => ({
  type: USER_UPDATE_SUCCESS,
  payload: user,
});

export const userUpdateFailure = (error: string) => ({
  type: USER_UPDATE_FAILURE,
  payload: error,
});

export const USER_PASSWORD_CHANGE_REQUEST = 'USER_PASSWORD_CHANGE_REQUEST';
export const USER_PASSWORD_CHANGE_SUCCESS = 'USER_PASSWORD_CHANGE_SUCCESS';
export const USER_PASSWORD_CHANGE_FAILURE = 'USER_PASSWORD_CHANGE_FAILURE';

export const userPasswordChangeRequest = (payload: { oldPassword: string; newPassword: string }) => ({
  type: USER_PASSWORD_CHANGE_REQUEST,
  payload,
});

export const userPasswordChangeSuccess = () => ({
  type: USER_PASSWORD_CHANGE_SUCCESS,
});

export const userPasswordChangeFailure = (error: string) => ({
  type: USER_PASSWORD_CHANGE_FAILURE,
  payload: error,
});
