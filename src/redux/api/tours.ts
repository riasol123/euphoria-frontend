import { Tour } from '../reducers/tourReducer';
import api from './api';

export const getTours = async (params: Tour) => {
  const { data } = await api.get('/tour', {
    params,
  });
  return data;
};
