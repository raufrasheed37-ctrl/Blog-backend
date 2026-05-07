import axios from 'axios';
import useAuthStore from '@/store/authstore';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token automatically
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'API Error';

    throw new Error(message);
  }
);

// AUTH API
export const authAPI = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  register: (email, password, name) =>
    api.post('/auth/register', { email, password, name }),
};

// BLOG API
export const blogAPI = {
  getAll: () => api.get('/posts'),

  getById: (id) => api.get(`/posts/${id}`),

  create: (title, content, excerpt, coverImage) => {
    const user = useAuthStore.getState().user;

    return api.post('/posts', {
      title,
      content,
      excerpt,
      coverImage,
      published: true,
      author: user?.id,
    });
  },

  update: (id, title, content, excerpt) =>
    api.put(`/posts/${id}`, {
      title,
      content,
      excerpt,
    }),

  delete: (id) =>
    api.delete(`/posts/${id}`),
};
