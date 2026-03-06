import { create } from "zustand";
import { User } from "@/entities/user/model/types";

interface SessionState {
  isLoggedIn: boolean;
  isInitialized: boolean;
  user: User | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setIsInitialized: (isInitialized: boolean) => void;
  setUser: (user: User | null) => void;
  clearSession: () => void;
  isAuthenticated: () => boolean;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  isLoggedIn: false,
  isInitialized: false,
  user: null,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setIsInitialized: (isInitialized) => set({ isInitialized }),
  setUser: (user) => set({ user, isLoggedIn: !!user }),
  clearSession: () =>
    set({
      isLoggedIn: false,
      isInitialized: true,
      user: null,
    }),
  isAuthenticated: () => get().isLoggedIn,
}));
