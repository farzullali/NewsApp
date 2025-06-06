import axiosInstance from '../config/axios';
import { ENDPOINTS } from '../config/endpoints';
import type { NewsApiResponse as NewsResponse, NewsQueryParams } from 'types';

export const newsService = {
  getLatestNews: async (params: NewsQueryParams = {}): Promise<NewsResponse> => {
    const response = await axiosInstance.get<NewsResponse>(ENDPOINTS.LATEST_NEWS, { params });
    return response.data;
  },

  searchNews: async (query: string, params: Omit<NewsQueryParams, 'q'> = {}): Promise<NewsResponse> => {
    const response = await axiosInstance.get<NewsResponse>(ENDPOINTS.LATEST_NEWS, {
      params: { ...params, q: query },
    });
    return response.data;
  },

  getNewsByCategory: async (category: string, params: Omit<NewsQueryParams, 'category'> = {}): Promise<NewsResponse> => {
    const response = await axiosInstance.get<NewsResponse>(ENDPOINTS.LATEST_NEWS, {
      params: { ...params, category },
    });
    return response.data;
  },

  getNewsByCountry: async (country: string, params: Omit<NewsQueryParams, 'country'> = {}): Promise<NewsResponse> => {
    const response = await axiosInstance.get<NewsResponse>(ENDPOINTS.LATEST_NEWS, {
      params: { ...params, country },
    });
    return response.data;
  },
};
