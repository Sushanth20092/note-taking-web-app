"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  email: string | null;
  login: (token: string, email: string) => void;
  logout: () => void;
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      email: null,
      hydrated: false,

      login: (token, email) => set({ token, email }),
      logout: () => set({ token: null, email: null }),

      setHydrated: (value) => set({ hydrated: value }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
