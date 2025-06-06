import { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_CONFIG } from './endpoints';
import { handleApiError } from '../utils/errorHandler';
import { NewsApiError } from 'types';

export const setupInterceptors = (instance: AxiosInstance): void => {
  // Request interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Add API key to all requests
      config.params = {
        ...config.params,
        apikey: API_CONFIG.API_KEY,
      };

      // Log requests in development
      if (__DEV__) {
        console.log('📤 Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          params: config.params,
        });
      }

      return config;
    },
    (error: AxiosError) => {
      if (__DEV__) {
        console.error('❌ Request Error:', error.message);
      }
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log responses in development
      if (__DEV__) {
        console.log('📥 Response:', {
          status: response.status,
          url: response.config.url,
          data: response.data,
        });
      }

      return response;
    },
    (error: AxiosError<NewsApiError>) => {
      if (__DEV__) {
        console.error('❌ Response Error:', {
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
          url: error.config?.url,
        });
      }

      return Promise.reject(handleApiError(error));
    }
  );
};
