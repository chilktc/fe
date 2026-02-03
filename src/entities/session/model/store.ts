import { create } from 'zustand';

interface SessionState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clearSession: () => void;
  isAuthenticated: () => boolean;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  clearSession: () => set({ accessToken: null }),
  isAuthenticated: () => !!get().accessToken,
}));
