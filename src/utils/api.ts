import axios from 'axios';

const API_BASE_URL = process.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Добавляем интерцептор для автоматического добавления токена
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getImageUrl = (path: string) => {
  if (!path) return '';
  return `${API_BASE_URL}/${path}`;
}; 