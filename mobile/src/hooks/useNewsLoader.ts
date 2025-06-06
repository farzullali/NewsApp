import {useCallback, useMemo, useState, useRef, useEffect} from 'react';
import {Alert, Platform} from 'react-native';
import {NewsArticle, newsService} from '../api/services';
import {transformNewsArticles} from '../utils/newsTransformer';
import {useNewsStore} from '../store/useNewsStore';
import {useLoadingState} from './useLoadingState';
import {NewsQueryParams} from 'types';

interface UseNewsLoaderOptions {
  pageSize?: number;
  isOffline: boolean;
}

interface LoaderState {
  currentPage: number;
  hasMorePages: boolean;
  lastError: string | null;
  lastUpdated: number;
  retryCount: number;
}

interface NewsResponse {
  results: NewsArticle[];
  nextPage: string | null;
}

const MAX_RETRIES = Platform.select({
  android: 3,
  ios: 1,
  default: 1,
});

const REQUEST_TIMEOUT = Platform.select({
  android: 15000, // 15 seconds for Android
  ios: 10000, // 10 seconds for iOS
  default: 10000,
});

const INITIAL_STATE: LoaderState = {
  currentPage: 1,
  hasMorePages: true,
  lastError: null,
  lastUpdated: Date.now(),
  retryCount: 0,
};

export const useNewsLoader = ({
  pageSize = 10,
  isOffline,
}: UseNewsLoaderOptions) => {
  // Store access
  const {
    cachedNews,
    setNews,
    addNews,
    setError,
    setPage,
    setHasMore,
    setCachedNews,
  } = useNewsStore();

  // Loading states
  const {
    isInitialLoading,
    isLoadingMore,
    isRefreshing,
    startLoading,
    stopLoading,
    resetLoading,
  } = useLoadingState('NewsLoader');

  // Internal state management
  const [loaderState, setLoaderState] = useState<LoaderState>(INITIAL_STATE);

  // Refs for tracking async operations
  const isMounted = useRef(true);
  const activeRequests = useRef(new Set<string>());
  const abortControllerRef = useRef<AbortController | null>(null);

  // Memoized conditions and states
  const hasCachedNews = useMemo(() => cachedNews.length > 0, [cachedNews]);
  const isFirstPageLoad = useMemo(
    () => loaderState.currentPage === 1,
    [loaderState.currentPage],
  );
  const canLoadMore = useMemo(
    () => loaderState.hasMorePages && !isOffline,
    [loaderState.hasMorePages, isOffline],
  );

  // Request tracking helpers
  const trackRequest = useCallback((requestId: string) => {
    activeRequests.current.add(requestId);
  }, []);

  const untrackRequest = useCallback((requestId: string) => {
    activeRequests.current.delete(requestId);
  }, []);

  const hasActiveRequests = useCallback(() => {
    return activeRequests.current.size > 0;
  }, []);

  // Handle offline mode with cached data
  const handleOfflineMode = useCallback(
    (isRefresh: boolean) => {
      const shouldShowCachedNews = hasCachedNews;
      const isRefreshAttempt = isRefresh;

      if (shouldShowCachedNews) {
        if (!isRefreshAttempt) {
          setNews(cachedNews);
        } else {
          Alert.alert(
            'Offline Mode',
            'You are currently offline. Showing cached news.',
            [{text: 'OK', style: 'default'}],
          );
          stopLoading('isRefreshing');
        }
        return true;
      }
      return false;
    },
    [hasCachedNews, cachedNews, setNews, stopLoading],
  );

  // Error handling with proper context
  const handleError = useCallback(
    (error: unknown, pageNum: number) => {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to load news';
      const isInitialLoad = pageNum === 1;
      const hasFallbackData = hasCachedNews;

      setError(errorMessage);
      setLoaderState(prev => ({
        ...prev,
        lastError: errorMessage,
        lastUpdated: Date.now(),
      }));

      if (isInitialLoad && hasFallbackData) {
        setNews(cachedNews);
        Alert.alert(
          'Error',
          'Failed to load latest news. Showing cached articles.',
          [{text: 'OK', style: 'default'}],
        );
      } else {
        Alert.alert('Error', errorMessage, [{text: 'OK', style: 'default'}]);
      }
    },
    [hasCachedNews, cachedNews, setNews, setError],
  );

  const createAbortController = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    return abortControllerRef.current;
  }, []);

  const handleNetworkError = useCallback(
    (error: unknown) => {
      const isAndroid = Platform.OS === 'android';
      const shouldRetry = isAndroid && loaderState.retryCount < MAX_RETRIES;

      if (shouldRetry) {
        setLoaderState(prev => ({
          ...prev,
          retryCount: prev.retryCount + 1,
        }));
        return true;
      }

      setLoaderState(prev => ({
        ...prev,
        retryCount: 0,
        lastError:
          error instanceof Error ? error.message : 'Network error occurred',
      }));
      return false;
    },
    [loaderState.retryCount],
  );

  // Main news loading logic
  const loadNews = useCallback(
    async (pageNum: number = 1, isRefresh: boolean = false) => {
      const requestId = `load-${pageNum}-${Date.now()}`;
      const isInitialLoad = pageNum === 1;

      if (hasActiveRequests()) {
        console.warn('News loading already in progress');
        return;
      }

      if (isOffline && handleOfflineMode(isRefresh)) {
        return;
      }

      try {
        trackRequest(requestId);
        const abortController = createAbortController();

        if (isInitialLoad) {
          isRefresh
            ? startLoading('isRefreshing')
            : startLoading('isInitialLoading');
        } else {
          startLoading('isLoadingMore');
        }

        // Create timeout promise
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            abortController.abort();
            reject(new Error('Request timeout'));
          }, REQUEST_TIMEOUT);
        });

        // Create fetch promise with abort signal
        const fetchPromise = newsService.getLatestNews({
          size: pageSize,
          page: isInitialLoad ? undefined : String(pageNum),
          signal: abortController.signal,
        } as NewsQueryParams);

        const response = (await Promise.race([
          fetchPromise,
          timeoutPromise,
        ])) as NewsResponse;

        if (!isMounted.current) return;

        const hasResults = response?.results?.length > 0;
        const hasNextPage = !!response?.nextPage;

        if (!hasResults) {
          setHasMore(false);
          setLoaderState(prev => ({
            ...prev,
            hasMorePages: false,
            lastUpdated: Date.now(),
            retryCount: 0,
          }));
          return;
        }

        const transformedNews = transformNewsArticles(response.results);

        if (isInitialLoad) {
          setNews(transformedNews);
          setCachedNews(transformedNews);
        } else {
          addNews(transformedNews);
        }

        setPage(pageNum + 1);
        setHasMore(hasNextPage);
        setError(null);
        setLoaderState(prev => ({
          ...prev,
          currentPage: pageNum + 1,
          hasMorePages: hasNextPage,
          lastError: null,
          lastUpdated: Date.now(),
          retryCount: 0,
        }));
      } catch (err) {
        if (!isMounted.current) return;

        const shouldRetry = handleNetworkError(err);
        if (shouldRetry) {
          console.warn(
            `Retrying request (${loaderState.retryCount}/${MAX_RETRIES})`,
          );
          await loadNews(pageNum, isRefresh);
          return;
        }

        handleError(err, pageNum);
      } finally {
        if (isMounted.current) {
          resetLoading();
          untrackRequest(requestId);
        }
      }
    },
    [
      isOffline,
      pageSize,
      loaderState.retryCount,
      handleOfflineMode,
      handleNetworkError,
      hasActiveRequests,
      trackRequest,
      untrackRequest,
      createAbortController,
      setNews,
      addNews,
      setError,
      setPage,
      setHasMore,
      setCachedNews,
      startLoading,
      resetLoading,
      handleError,
    ],
  );

  // Refresh functionality
  const refreshNews = useCallback(() => {
    const canRefresh = !isOffline && !hasActiveRequests();

    if (!canRefresh) {
      if (isOffline) {
        Alert.alert(
          'Offline Mode',
          'Cannot refresh while offline. Please check your connection.',
          [{text: 'OK', style: 'default'}],
        );
      } else {
        console.warn('Refresh attempted while loading');
      }
      return;
    }

    setLoaderState(prev => ({
      ...prev,
      currentPage: 1,
      lastUpdated: Date.now(),
    }));
    startLoading('isRefreshing');
    setPage(1);
    loadNews(1, true);
  }, [isOffline, hasActiveRequests, loadNews, startLoading, setPage]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
      activeRequests.current.clear();
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    loadNews,
    refreshNews,
    isInitialLoading,
    isLoadingMore,
    isRefreshing,
    canLoadMore,
    hasActiveRequests: hasActiveRequests(),
    lastError: loaderState.lastError,
    lastUpdated: loaderState.lastUpdated,
    currentPage: loaderState.currentPage,
  };
};
