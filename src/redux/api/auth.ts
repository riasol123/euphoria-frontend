import { AuthAction, AuthInformation } from '../../types/auth/types';

import api from './api';

export const register = async (
  value: AuthAction,
): Promise<AuthInformation> => {
  const { data } = await api.post('/auth/login', value);
  return data;
};

export const login = async (
  value: AuthAction,
): Promise<AuthInformation> => {
  const { data } = await api.post('/auth/login', value);
  return data;
};
