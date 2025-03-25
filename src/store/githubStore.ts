import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GitHubUser, GitHubRepo, GitHubEvent } from "@/lib/types";

interface GitHubState {
  searchedUsername: string | null;
  user: GitHubUser | null;
  repos: GitHubRepo[];
  events: GitHubEvent[];
  setSearchedUsername: (username: string) => void;
  fetchUser: (username: string) => Promise<void>;
  fetchRepos: (username: string, page?: number) => Promise<void>;
  fetchEvents: (username: string) => Promise<void>;
  clearData: () => void;
  layout: "compact" | "comfortable";
  setLayout: (layout: "compact" | "comfortable") => void;
}

export const useGitHubStore = create<GitHubState>()(
  persist(
    (set) => ({
      searchedUsername: null,
      user: null,
      repos: [],
      events: [],
      layout: "comfortable",
      setLayout: (layout) => set({ layout }),

      setSearchedUsername: (username) => set({ searchedUsername: username }),

      fetchUser: async (username) => {
        try {
          const response = await fetch(`/api/users/${username}`);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch user");
          }
          const data: GitHubUser = await response.json();
          set({ user: data, searchedUsername: username });
        } catch (error) {
          throw error;
        }
      },

      fetchRepos: async (username, page = 1) => {
        try {
          const response = await fetch(
            `/api/users/${username}/repos?page=${page}&per_page=10`
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch repositories");
          }
          const data: GitHubRepo[] = await response.json();
          set((state) => ({
            repos: page === 1 ? data : [...state.repos, ...data],
            searchedUsername: username,
          }));
        } catch (error) {
          throw error;
        }
      },

      fetchEvents: async (username) => {
        try {
          const response = await fetch(`/api/users/${username}/events`);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch events");
          }
          const data: GitHubEvent[] = await response.json();
          set({ events: data, searchedUsername: username });
        } catch (error) {
          throw error;
        }
      },

      clearData: () =>
        set({ user: null, repos: [], events: [], searchedUsername: null }),
    }),
    { name: "github-storage" }
  )
);
