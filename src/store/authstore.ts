import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  searchedUsername: string | null;
  login: (username: string) => void;
  logout: () => void;
  setSearchedUsername: (searchedUsername: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      username: null,
      searchedUsername: null,

      login: (username) => {
        if (!get().isAuthenticated) {
          set({ isAuthenticated: true, username });
        }
      },

      logout: () => {
        if (get().isAuthenticated) {
          set({
            isAuthenticated: false,
            username: null,
            searchedUsername: null,
          });
        }
      },

      setSearchedUsername: (searchedUsername) => {
        set({ searchedUsername });
      },
    }),
    { name: "auth-storage" }
  )
);
