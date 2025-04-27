import { AuthUserAction } from '../../../types/auth/types';

import api from '../api';

const getVerifyUser = async (): Promise<AuthUserAction> => {
  const { data } = await api.get('/auth/whoami');
  return data;
};

export default getVerifyUser;
