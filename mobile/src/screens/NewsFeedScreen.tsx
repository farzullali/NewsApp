import React, {useEffect, useCallback, useMemo} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {News} from '../types';
import {NewsItem} from '../components/NewsItem';
import {NewsListSkeleton} from '../components/SkeletonLoader';
import {ScreenLayout} from '../components/ScreenLayout';
import {useNewsStore} from '../store/useNewsStore';
import {useThemeStore} from '../store/useThemeStore';
import {useNetworkStatus} from '../hooks/useNetworkStatus';
import {useNewsLoader} from '../hooks/useNewsLoader';
import {lightTheme, darkTheme} from '../utils/theme';
import {scale} from '../utils/dimensions';
import { RootStackParamList } from 'types/navigation.types';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const NewsFeedScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const {isDarkMode} = useThemeStore();
  const {isOffline} = useNetworkStatus();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const {news, error, page, hasMore} = useNewsStore();

  const {loadNews, refreshNews, isInitialLoading, isLoadingMore, isRefreshing} =
    useNewsLoader({
      pageSize: 10,
      isOffline,
    });

  const onEndReached = useCallback(() => {
    if (!isLoadingMore && hasMore && !isOffline) {
      loadNews(page);
    }
  }, [isLoadingMore, hasMore, page, loadNews, isOffline]);

  const onNewsPress = useCallback(
    (newsItem: News) => {
      navigation.navigate('NewsDetail', {news: newsItem});
    },
    [navigation],
  );

  const renderNewsItem = useCallback(
    ({item}: {item: News}) => <NewsItem news={item} onPress={onNewsPress} />,
    [onNewsPress],
  );

  const renderFooter = useCallback(() => {
    if (!isLoadingMore || isRefreshing) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={theme.colors.primary} />
        <Text style={[styles.footerText, {color: theme.colors.textSecondary}]}>
          Loading more news...
        </Text>
      </View>
    );
  }, [isLoadingMore, isRefreshing, theme]);

  const keyExtractor = useCallback((item: News) => item.id, []);

  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: 280,
      offset: 280 * index,
      index,
    }),
    [],
  );

  useEffect(() => {
    loadNews(1);
  }, []);

  const flatListProps = useMemo(
    () => ({
      data: news,
      renderItem: renderNewsItem,
      keyExtractor,
      onEndReached,
      onEndReachedThreshold: 0.5,
      refreshControl: (
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={refreshNews}
          colors={[theme.colors.primary]}
          tintColor={theme.colors.primary}
        />
      ),
      ListFooterComponent: renderFooter,
      showsVerticalScrollIndicator: false,
      removeClippedSubviews: true,
      maxToRenderPerBatch: 5,
      initialNumToRender: 10,
      windowSize: 10,
      getItemLayout,
    }),
    [
      news,
      renderNewsItem,
      keyExtractor,
      onEndReached,
      isRefreshing,
      refreshNews,
      renderFooter,
      theme,
      getItemLayout,
    ],
  );

  if (isInitialLoading && news.length === 0) {
    return (
      <ScreenLayout>
        <NewsListSkeleton count={5} />
      </ScreenLayout>
    );
  }

  if (error && news.length === 0) {
    return (
      <ScreenLayout>
        <View style={styles.centerContent}>
          <Text style={[styles.errorText, {color: theme.colors.error}]}>
            {error}
          </Text>
          <Text style={[styles.retryText, {color: theme.colors.textSecondary}]}>
            Pull down to retry
          </Text>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      {isOffline && (
        <View style={[styles.offlineBanner, {backgroundColor: theme.colors.error}]}>
          <Text style={styles.offlineText}>
            📱 You're offline. Showing cached news.
          </Text>
        </View>
      )}
      <FlatList {...flatListProps} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  errorText: {
    fontSize: scale(18),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: scale(8),
  },
  retryText: {
    fontSize: scale(14),
    textAlign: 'center',
  },
  footerLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(16),
    gap: scale(8),
  },
  footerText: {
    fontSize: scale(14),
  },
  offlineBanner: {
    padding: scale(8),
    alignItems: 'center',
  },
  offlineText: {
    color: 'white',
    fontSize: scale(14),
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: scale(16),
  },
});
