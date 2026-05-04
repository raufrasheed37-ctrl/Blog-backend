import axios from 'axios';
import useAuthStore from '@/store/authstore';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

/**
 * Axios instance with automatic auth token injection
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'API Error';
    throw new Error(message);
  }
);

// Auth endpoints
export const authAPI = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  register: (email, password, name) =>
    api.post('/auth/register', { email, password, name }),
};

// Blog endpoints
export const blogAPI = {
  getAll: () => api.get('/blogs'),

  getById: (id) => api.get(`/blogs/${id}`),

  create: (title, content, excerpt) =>
    api.post('/blogs', { title, content, excerpt }),

  update: (id, title, content, excerpt) =>
    api.put(`/blogs/${id}`, { title, content, excerpt }),

  delete: (id) =>
    api.delete(`/blogs/${id}`),
};
