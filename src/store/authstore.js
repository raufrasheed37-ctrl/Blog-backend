import { create } from 'zustand';

const useAuthStore = create((set) => ({
  // State
  user: null,
  token: null,
  isLoading: false,
  error: null,

  // Actions
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // Login action
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      set({ user: data.user, token: data.token, isLoading: false });
      localStorage.setItem('token', data.token);
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Register action
  register: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      set({ user: data.user, token: data.token, isLoading: false });
      localStorage.setItem('token', data.token);
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Logout action
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem('token');
  },

  // Load from localStorage on app start
  hydrate: () => {
    const token = localStorage.getItem('token');
    if (token) set({ token });
  },
}));

export default useAuthStore;
