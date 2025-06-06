import { Platform } from 'react-native';

const getBaseUrl = () => {
  if (Platform.OS === 'android') {
    // 10.0.2.2 is the special alias to your host loopback interface (localhost) in Android emulator
    return 'http://10.0.2.2:3000';
  }
  return 'http://localhost:3000';
};

export const API_CONFIG = {
  //   BASE_URL: 'https://newsdata.io/api/1',
  BASE_URL: getBaseUrl(),
  API_KEY: 'pub_c8280806793b460b9ea26739090ebeb9',
  TIMEOUT: 10000,
} as const;

export const ENDPOINTS = {
  //   LATEST_NEWS: '/latest',
  LATEST_NEWS: '/news',
  SOURCES: '/sources',
  CATEGORIES: '/categories',
} as const;

export type Endpoint = (typeof ENDPOINTS)[keyof typeof ENDPOINTS];
