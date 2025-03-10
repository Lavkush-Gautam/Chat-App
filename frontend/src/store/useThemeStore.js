import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
    persist(
        (set) => ({
            theme: 'coffee', // Default theme
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: 'chat-theme', // Key used to store the theme in localStorage
            storage: localStorage, // Use localStorage to persist the theme
        }
    )
);
