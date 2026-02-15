import { create } from 'zustand';

interface SessionState {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  clearSession: () => void;
  isAuthenticated: () => boolean;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  clearSession: () => set({ isLoggedIn: false }),
  isAuthenticated: () => get().isLoggedIn,
}));
