import { News } from './news.types';

/**
 * State management types for the application
 */

export interface NewsState {
  news: News[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  refreshing: boolean;
  cachedNews: News[];
  setNews: (news: News[]) => void;
  addNews: (news: News[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;
  setRefreshing: (refreshing: boolean) => void;
  setCachedNews: (news: News[]) => void;
  reset: () => void;
}

export interface FavoritesState {
  favorites: News[];
  addFavorite: (news: News) => void;
  removeFavorite: (newsId: string) => void;
  isFavorite: (newsId: string) => boolean;
}

export interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
} 