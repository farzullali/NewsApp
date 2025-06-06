import { newsService } from '../api/services';
import { storage } from '../utils/storage';
import { transformNewsArticles } from '../utils/newsTransformer';
import type { News, NewsQueryParams } from '../types';

class NewsRepository {
  private cache: Map<string, News[]> = new Map();

  private getCacheKey(params: NewsQueryParams): string {
    return `news_${JSON.stringify(params)}`;
  }

  async getLatestNews(params: NewsQueryParams): Promise<News[]> {
    const cacheKey = this.getCacheKey(params);

    // Check memory cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // Check persistent storage
    const { news: cachedNews, isExpired } = await storage.getNewsCache();
    if (cachedNews && !isExpired) {
      this.cache.set(cacheKey, cachedNews);
      return cachedNews;
    }

    // Fetch from API
    try {
      const response = await newsService.getLatestNews(params);
      const news = transformNewsArticles(response.articles);
      
      // Update both caches
      this.cache.set(cacheKey, news);
      await storage.saveNewsCache(news);
      
      return news;
    } catch (error) {
      // Return cached data on error, even if expired
      if (cachedNews) {
        return cachedNews;
      }
      throw error;
    }
  }

  async getFavorites(): Promise<News[]> {
    return storage.getFavorites();
  }

  async addToFavorites(news: News): Promise<void> {
    const favorites = await this.getFavorites();
    if (!favorites.some(item => item.id === news.id)) {
      await storage.saveFavorites([...favorites, news]);
    }
  }

  async removeFromFavorites(newsId: string): Promise<void> {
    const favorites = await this.getFavorites();
    await storage.saveFavorites(
      favorites.filter(item => item.id !== newsId)
    );
  }

  async clearCache(): Promise<void> {
    this.cache.clear();
    await storage.clearCache();
  }
}

export const newsRepository = new NewsRepository(); 