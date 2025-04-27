import axios from 'axios';

console.log(import.meta.env.VITE_APP_API_URL);
const api = axios.create({ baseURL: import.meta.env.VITE_APP_API_URL });

api.interceptors.request.use(
  (config) => {
    const { headers } = config;
    const authToken = localStorage.getItem('authToken');
    if (authToken !== null) {
      headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
