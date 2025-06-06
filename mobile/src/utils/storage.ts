import AsyncStorage from '@react-native-async-storage/async-storage';
import { News } from '../types';

const STORAGE_KEYS = {
  NEWS_CACHE: '@news_cache',
  FAVORITES: '@favorites',
  LAST_FETCH: '@last_fetch_time',
} as const;

const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes

export const storage = {
  async saveNewsCache(news: News[]): Promise<void> {
    try {
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.NEWS_CACHE, JSON.stringify(news)],
        [STORAGE_KEYS.LAST_FETCH, Date.now().toString()],
      ]);
    } catch (error) {
      console.error('Error saving news cache:', error);
    }
  },

  async getNewsCache(): Promise<{ news: News[] | null; isExpired: boolean }> {
    try {
      const [newsData, lastFetch] = await AsyncStorage.multiGet([
        STORAGE_KEYS.NEWS_CACHE,
        STORAGE_KEYS.LAST_FETCH,
      ]);

      const cachedNews = newsData[1] ? JSON.parse(newsData[1]) : null;
      const lastFetchTime = lastFetch[1] ? parseInt(lastFetch[1]) : 0;
      const isExpired = Date.now() - lastFetchTime > CACHE_EXPIRY;

      return {
        news: cachedNews,
        isExpired,
      };
    } catch (error) {
      console.error('Error getting news cache:', error);
      return { news: null, isExpired: true };
    }
  },

  async saveFavorites(favorites: News[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  },

  async getFavorites(): Promise<News[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  },

  async clearCache(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.NEWS_CACHE,
        STORAGE_KEYS.LAST_FETCH,
      ]);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  },
}; 