import api from './api';

export const postApplication = async (payload: any) => {
  const { data } = await api.post(`/application/${payload}`);
  return data;
};

export const getApplicationStatus = async () => {
  const { data } = await api.get('/application');
  return data;
};