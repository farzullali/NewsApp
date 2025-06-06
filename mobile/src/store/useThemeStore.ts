import React from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { ThemeState } from '../types';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDarkMode: false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setTheme: (isDark: boolean) => set({ isDarkMode: isDark }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Hook to sync with system theme
export const useSystemTheme = () => {
  const systemColorScheme = useColorScheme();
  const { setTheme } = useThemeStore();

  React.useEffect(() => {
    const isDark = systemColorScheme === 'dark';
    setTheme(isDark);
  }, [systemColorScheme, setTheme]);
}; 