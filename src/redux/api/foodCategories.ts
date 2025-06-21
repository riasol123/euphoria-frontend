import api from './api';

export const getFoodCategories = async () => {
  const { data } = await api.get('/food-categories');
  return data;
};
