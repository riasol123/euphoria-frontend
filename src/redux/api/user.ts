import api from './api';

export const userUpdate = async (
  payload: any,
): Promise<any> => {
  const { data } = await api.patch('/user/personal-info',
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  return data;
};

export const userPasswordChange = async (
  payload: any,
): Promise<any> => {
  const { data } = await api.patch('/user/password', payload);
  return data;
};
