import { create } from "zustand";

interface AuthState {
  token: string | null;
  user_email: string | null;
  isAuthenticated: boolean;
  login: (token: string, email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user_email: null,
  isAuthenticated: false,

  login: (token, email) =>
    set(() => ({
      token,
      user_email: email,
      isAuthenticated: true,
    })),

  logout: () =>
    set(() => ({
      token: null,
      user_email: null,
      isAuthenticated: false,
    })),
}));
