import { create } from "zustand";
import { User } from "@/entities/user/model/types";

export type AuthStatus = "booting" | "authenticated" | "unauthenticated";

interface SessionState {
  authStatus: AuthStatus;
  user: User | null;
  accessToken: string | null;
  setAuthStatus: (status: AuthStatus) => void;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  clearSession: () => void;
  isAuthenticated: () => boolean;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  authStatus: "booting",
  user: null,
  accessToken: null,
  setAuthStatus: (authStatus) => set({ authStatus }),
  setUser: (user) =>
    set({
      user,
      authStatus: user ? "authenticated" : "unauthenticated",
    }),
  setAccessToken: (accessToken) => set({ accessToken }),
  clearSession: () =>
    set({
      authStatus: "unauthenticated",
      user: null,
      accessToken: null,
    }),
  isAuthenticated: () => get().authStatus === "authenticated",
}));
