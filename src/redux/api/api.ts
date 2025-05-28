import axios from 'axios';

console.log(process.env.VITE_API_BASE_URL);
const api = axios.create({ baseURL: process.env.VITE_API_BASE_URL });

api.interceptors.request.use(
  (config) => {
    const { headers } = config;
    const authToken = localStorage.getItem('tokenx');
    if (authToken !== null) {
      headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
