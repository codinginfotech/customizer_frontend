import { create } from 'zustand';
import { api, refreshAccessToken, setAccessToken, setSessionExpiredHandler } from '../services/apiClient';
import { signInWithGoogle, signOutOfFirebase } from '../lib/firebase';
import type { PublicUser } from '../types/catalog';

interface AuthState {
  user: PublicUser | null;
  /** True while the app boots and attempts a silent refresh. */
  initializing: boolean;
  login: (email: string, password: string) => Promise<PublicUser>;
  /** Google sign-in via Firebase; creates the account on first use. */
  loginWithGoogle: () => Promise<PublicUser>;
  register: (name: string, email: string, password: string) => Promise<PublicUser>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
  setUser: (user: PublicUser | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  initializing: true,

  async initialize() {
    // Attempt silent session restore via the httpOnly refresh cookie.
    try {
      const token = await refreshAccessToken();
      if (token) {
        const res = await api.get('/auth/me');
        set({ user: res.data.data.user });
      }
    } catch {
      /* stay logged out */
    } finally {
      set({ initializing: false });
    }
    setSessionExpiredHandler(() => {
      if (get().user) set({ user: null });
    });
  },

  async login(email, password) {
    const res = await api.post('/auth/login', { email, password });
    const { user, accessToken } = res.data.data;
    setAccessToken(accessToken);
    set({ user });
    return user;
  },

  async loginWithGoogle() {
    // Firebase only proves who the person is; the API owns the session.
    const idToken = await signInWithGoogle();
    const res = await api.post('/auth/google', { idToken });
    const { user, accessToken } = res.data.data;
    setAccessToken(accessToken);
    set({ user });
    return user;
  },

  async register(name, email, password) {
    const res = await api.post('/auth/register', { name, email, password });
    const { user, accessToken } = res.data.data;
    setAccessToken(accessToken);
    set({ user });
    return user;
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } finally {
      setAccessToken(null);
      set({ user: null });
      void signOutOfFirebase();
    }
  },

  setUser(user) {
    set({ user });
  },
}));
