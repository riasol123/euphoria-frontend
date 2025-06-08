import axios from 'axios';

const api = axios.create({ 
  baseURL: 'http://62.109.17.167:3001',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

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
