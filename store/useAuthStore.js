import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isInitialized: false,

      setAuth: (userData, token) => 
        set({ 
          user: userData, 
          token: token, 
          isAuthenticated: true,
          isInitialized: true 
        }),

      logout: () => 
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false,
          isInitialized: true 
        }),

      setUser: (userData) => set({ user: userData }),
      setInitialized: (value) => set({ isInitialized: value }),
    }),
    {
      name: "auth-storage", // local storage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
