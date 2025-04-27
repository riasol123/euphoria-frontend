import { AuthAction, AuthInformation } from '../../../types/auth/types';

import api from '../api';

const getAuthData = async (
  value: AuthAction,
  requestType: string
): Promise<AuthInformation> => {
  const { data } = await api.post(`/auth/${requestType}`, value);
  return data;
};

export default getAuthData;
