import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoritesState, News } from '../types';

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (news: News) => {
        const { favorites } = get();
        if (!favorites.find(item => item.id === news.id)) {
          set({ favorites: [...favorites, news] });
        }
      },
      removeFavorite: (newsId: string) => {
        const { favorites } = get();
        set({ favorites: favorites.filter(item => item.id !== newsId) });
      },
      isFavorite: (newsId: string) => {
        const { favorites } = get();
        return favorites.some(item => item.id === newsId);
      },
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 