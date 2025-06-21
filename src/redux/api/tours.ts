import { Tour } from '../reducers/tourReducer';
import api from './api';

export const getTours = async (params: Tour) => {
  const { data } = await api.get('/tour', {
    params,
  });
  return data;
};

export const createTour = async (formData: FormData) => {
  const { data } = await api.post('/tour', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

