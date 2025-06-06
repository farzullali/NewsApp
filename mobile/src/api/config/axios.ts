import axios from 'axios';
import { API_CONFIG } from './endpoints';
import { setupInterceptors } from './interceptors';
import { handleApiError } from '../utils/errorHandler';
import { parseNewsResponse } from '../utils/responseParser';

const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Setup interceptors
setupInterceptors(axiosInstance);

// Add response transformer for news endpoints
axiosInstance.interceptors.response.use(
  (response) => {
    // Only transform news responses
    if (response.config.url?.includes('/news')) {
      return {
        ...response,
        data: parseNewsResponse(response),
      };
    }
    return response;
  },
  (error) => {
    return Promise.reject(handleApiError(error));
  }
);

export default axiosInstance;
