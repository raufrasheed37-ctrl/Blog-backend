import { create } from 'zustand';
import { clearAuthTokenCookie, readAuthTokenCookie, setAuthTokenCookie } from '@/utils/auth-cookie';

// 🔥 Toggle this to bypass authentication during development
const DEV_BYPASS_AUTH = true;

const useAuthStore = create((set) => ({
  // State
  user: DEV_BYPASS_AUTH ? { name: "Dev User", email: "dev@test.com" } : null,
  token: DEV_BYPASS_AUTH ? "dev-token" : null,
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
      setAuthTokenCookie(data.token);
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
      setAuthTokenCookie(data.token);
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Logout action
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem('token');
    clearAuthTokenCookie();
  },

  // Load from localStorage on app start
  hydrate: () => {
    if (DEV_BYPASS_AUTH) return; // ⛔ skip real auth in dev mode

    const token = localStorage.getItem('token') || readAuthTokenCookie();
    if (token) set({ token });
    if (token) setAuthTokenCookie(token);
  },
}));

export default useAuthStore;


// 🔑 Get token (with bypass support)
export function getClientAuthToken() {
  if (typeof window === "undefined") {
    return null;
  }

  if (DEV_BYPASS_AUTH) return "dev-token";

  return (
    useAuthStore.getState().token ||
    localStorage.getItem("token") ||
    readAuthTokenCookie()
  );
}


// 🔐 Auth check (bypassed in dev)
export function isClientAuthenticated() {
  if (DEV_BYPASS_AUTH) return true;
  return Boolean(getClientAuthToken());
}