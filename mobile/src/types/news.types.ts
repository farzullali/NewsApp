/**
 * Core news data types for the application
 */

export interface NewsSource {
  id?: string;
  name: string;
  url?: string | null;
  icon?: string | null;
  priority?: number;
}

export interface News {
  id: string;
  title: string;
  description?: string | null;
  content?: string | null;
  author?: string;
  url: string;
  urlToImage?: string | null;
  publishedAt: string;
  source: NewsSource;
  // Additional fields from API
  keywords?: string[] | null;
  videoUrl?: string | null;
  countries?: string[];
  categories?: string[];
  language?: string;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: News[];
  nextPage?: string | null;
}

export interface NewsQueryParams {
  query?: string;
  country?: string;
  category?: string;
  language?: string;
  page?: string;
  pageSize?: number;
}

export interface NewsApiError {
  status: string;
  code?: string;
  message: string;
} 