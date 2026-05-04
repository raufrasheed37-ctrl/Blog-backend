import useAuthStore from '@/store/authstore';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

/**
 * Fetch wrapper with automatic auth token injection
 * @param {string} endpoint - API endpoint (e.g., '/blogs')
 * @param {object} options - Fetch options
 * @returns {Promise} JSON response
 */
export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = useAuthStore.getState().token;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'API Error');
  }

  return res.json();
};

// Auth endpoints
export const authAPI = {
  login: (email, password) =>
    fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (email, password, name) =>
    fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    }),
};

// Blog endpoints
export const blogAPI = {
  getAll: () => fetchWithAuth('/blogs'),

  getById: (id) => fetchWithAuth(`/blogs/${id}`),

  create: (title, content, excerpt) =>
    fetchWithAuth('/blogs', {
      method: 'POST',
      body: JSON.stringify({ title, content, excerpt }),
    }),

  update: (id, title, content, excerpt) =>
    fetchWithAuth(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content, excerpt }),
    }),

  delete: (id) =>
    fetchWithAuth(`/blogs/${id}`, {
      method: 'DELETE',
    }),
};
