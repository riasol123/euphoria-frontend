import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

api.interceptors.request.use(
  (config) => {
    const { headers } = config;
    const authToken = localStorage.getItem('token');
    if (authToken !== null) {
      headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
