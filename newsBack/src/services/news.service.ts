import { Injectable } from '@nestjs/common';
import { NewsResponse, NewsQueryParams } from '../models/news.model';
import { mockNews } from '../data/mock-news';

@Injectable()
export class NewsService {
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getNews(params: NewsQueryParams): Promise<NewsResponse> {
    // Add 1 second delay
    await this.delay(1000);

    let filteredNews = [...mockNews];

    // Apply filters
    if (params.q) {
      const searchTerm = params.q.toLowerCase();
      filteredNews = filteredNews.filter(news => 
        news.title.toLowerCase().includes(searchTerm) ||
        news.description?.toLowerCase().includes(searchTerm) ||
        news.content?.toLowerCase().includes(searchTerm) ||
        news.keywords?.some(keyword => keyword.toLowerCase().includes(searchTerm))
      );
    }

    if (params.country) {
      filteredNews = filteredNews.filter(news => 
        news.country.includes(params.country!)
      );
    }

    if (params.category) {
      filteredNews = filteredNews.filter(news => 
        news.category.includes(params.category!)
      );
    }

    if (params.language) {
      filteredNews = filteredNews.filter(news => 
        news.language === params.language
      );
    }

    // Handle pagination
    const size = params.size || 10;
    const currentPage = params.page ? parseInt(params.page) : 1;
    const startIndex = (currentPage - 1) * size;
    const endIndex = startIndex + size;
    const paginatedNews = filteredNews.slice(startIndex, endIndex);

    // Generate next page token
    const nextPage = endIndex < filteredNews.length ? (currentPage + 1).toString() : null;

    return {
      status: 'success',
      totalResults: filteredNews.length,
      results: paginatedNews,
      nextPage
    };
  }
} 