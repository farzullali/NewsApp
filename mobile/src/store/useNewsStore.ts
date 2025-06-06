import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NewsState, News } from '../types';

export const useNewsStore = create<NewsState>()(
  persist(
    (set, get) => ({
      news: [],
      loading: false,
      error: null,
      page: 1,
      hasMore: true,
      refreshing: false,
      cachedNews: [],
      setNews: (news: News[]) => set({ news }),
      addNews: (newNews: News[]) => {
        const { news } = get();
        const existingIds = new Set(news.map(item => item.id));
        const uniqueNews = newNews.filter(item => !existingIds.has(item.id));
        set({ news: [...news, ...uniqueNews] });
      },
      setLoading: (loading: boolean) => set({ loading }),
      setError: (error: string | null) => set({ error }),
      setPage: (page: number) => set({ page }),
      setHasMore: (hasMore: boolean) => set({ hasMore }),
      setRefreshing: (refreshing: boolean) => set({ refreshing }),
      setCachedNews: (cachedNews: News[]) => set({ cachedNews }),
      reset: () => set({
        news: [],
        loading: false,
        error: null,
        page: 1,
        hasMore: true,
        refreshing: false,
      }),
    }),
    {
      name: 'news-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ 
        cachedNews: state.news.slice(0, 50), // Cache only first 50 items
      }),
    }
  )
); 