import { AuthDate, AuthUserAction } from '../../types/auth/types';

import {
  AUTH_FAILED,
  AUTH_SUCCESS,
  AUTH_REQUESTED,
  AUTH_VERIFY_REQUESTED,
  AUTH_LOGOUT,
} from '../actionTypes';

interface AuthReceivedAction {
  type: typeof AUTH_SUCCESS;
  payload: AuthUserAction;
}

interface AuthFaildAction {
  type: typeof AUTH_FAILED;
  error: string | null;
}

export const verificationUser = () => ({
  type: AUTH_VERIFY_REQUESTED,
});

export const userLogOut = () => ({
  type: AUTH_LOGOUT,
});

export const getAuthUser = (payload: AuthDate) => ({
  type: AUTH_REQUESTED,
  payload,
});

export const authReceived = (payload: any): AuthReceivedAction => ({
  type: AUTH_SUCCESS,
  payload,
});

export const authFailed = (error: string | null): AuthFaildAction => ({
  type: AUTH_FAILED,
  error,
});
