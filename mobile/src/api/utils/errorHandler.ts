import { AxiosError } from 'axios';
import { NewsApiError as ErrorResponse } from 'types/news.types';

export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number = 500) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: AxiosError<ErrorResponse>): never => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const status = error.response.status;
    const message = error.response.data?.message || 'An unknown error occurred';
    
    throw new ApiError(message, status);
  } else if (error.request) {
    // The request was made but no response was received
    throw new ApiError('Network error - no response received', 0);
  } else {
    // Something happened in setting up the request
    throw new ApiError(error.message || 'Failed to make request', 0);
  }
};
