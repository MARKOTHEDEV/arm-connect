import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { encryptData, decryptData } from "@/lib/encrypt";
import type { User } from "@/types";
import Cookies from "js-cookie";

// Encrypted storage adapter
const encryptedStorage = {
  getItem: (name: string) => {
    const value = localStorage.getItem(name);
    if (!value) return null;
    try {
      return decryptData(value);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string) => {
    localStorage.setItem(name, encryptData(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

interface UserState {
  user: User | null;
  refreshToken: string | null;
  expiresAt: string | null;
  isAuthenticated: boolean;
  isFirstLogin: boolean;
  hasHydrated: boolean;
  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string, expiresAt: string) => void;
  setFirstLogin: (value: boolean) => void;
  setHasHydrated: (value: boolean) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      refreshToken: null,
      expiresAt: null,
      isAuthenticated: false,
      isFirstLogin: false,
      hasHydrated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      setFirstLogin: (value) => set({ isFirstLogin: value }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
      setAccessToken: (token) => {
        Cookies.set("accessToken", token, { sameSite: "lax" });
      },
      setRefreshToken: (refreshToken, expiresAt) =>
        set({ refreshToken, expiresAt }),
      logout: () => {
        Cookies.remove("accessToken");
        set({
          user: null,
          refreshToken: null,
          expiresAt: null,
          isAuthenticated: false,
          isFirstLogin: false,
        });
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => encryptedStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        user: state.user,
        refreshToken: state.refreshToken,
        expiresAt: state.expiresAt,
        isAuthenticated: state.isAuthenticated,
        isFirstLogin: state.isFirstLogin,
      }),
    },
  ),
);
