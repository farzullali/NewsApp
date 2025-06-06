import React, { memo, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { News } from '../types';
import { useThemeStore } from '../store/useThemeStore';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { lightTheme, darkTheme } from '../utils/theme';
import { scale, isTablet, getResponsiveWidth } from '../utils/dimensions';
import { CachedImage } from './CachedImage';

interface NewsItemProps {
  news: News;
  onPress: (news: News) => void;
  testID?: string;
}

const NewsItemComponent: React.FC<NewsItemProps> = ({ news, onPress, testID }) => {
  const { isDarkMode } = useThemeStore();
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const theme = useMemo(() => isDarkMode ? darkTheme : lightTheme, [isDarkMode]);

  const isNewsLiked = isFavorite(news.id);

  const handlePress = useCallback(() => {
    onPress(news);
  }, [news, onPress]);

  const handleFavoritePress = useCallback(() => {
    if (isNewsLiked) {
      removeFavorite(news.id);
    } else {
      addFavorite(news);
    }
  }, [isNewsLiked, news, addFavorite, removeFavorite]);

  const formattedDate = useMemo(() => {
    const date = new Date(news.publishedAt);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  }, [news.publishedAt]);

  const containerStyle = useMemo(() => [
    styles.container,
    {
      backgroundColor: theme.colors.cardBackground,
      shadowColor: theme.colors.shadow,
    },
  ], [theme]);

  const titleStyle = useMemo(() => [
    styles.title,
    { color: theme.colors.text },
    theme.typography.h3,
  ], [theme]);

  const descriptionStyle = useMemo(() => [
    styles.description,
    { color: theme.colors.textSecondary },
    theme.typography.body2,
  ], [theme]);

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={handlePress}
      activeOpacity={0.7}
      testID={testID}
    >
      <View style={styles.content}>
        {news.urlToImage && (
          <View style={styles.imageContainer}>
            <CachedImage
              uri={news.urlToImage}
              style={styles.image}
              resizeMode="cover"
              testID={`${testID}-image`}
            />
          </View>
        )}
        <View style={styles.textContent}>
          <Text
            style={titleStyle}
            numberOfLines={2}
            testID={`${testID}-title`}
          >
            {news.title}
          </Text>
          {news.description && (
            <Text
              style={descriptionStyle}
              numberOfLines={3}
              testID={`${testID}-description`}
            >
              {news.description}
            </Text>
          )}
          <View style={styles.bottomRow}>
            <View style={styles.metadata}>
              <Text
                style={[
                  styles.source,
                  { color: theme.colors.primary },
                  theme.typography.caption,
                ]}
                testID={`${testID}-source`}
              >
                {news.source.name}
              </Text>
              <Text
                style={[
                  styles.date,
                  { color: theme.colors.textSecondary },
                  theme.typography.caption,
                ]}
                testID={`${testID}-date`}
              >
                {formattedDate}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={handleFavoritePress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              testID={`${testID}-favorite-button`}
            >
              <Text style={[
                styles.favoriteIcon,
                { color: isNewsLiked ? theme.colors.accent : theme.colors.textSecondary }
              ]}>
                {isNewsLiked ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const NewsItem = memo(NewsItemComponent);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: scale(16),
    marginVertical: scale(8),
    borderRadius: scale(12),
    shadowOffset: {
      width: 0,
      height: scale(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 3,
  },
  content: {
    padding: scale(16),
  },
  imageContainer: {
    height: scale(isTablet ? 300 : 200),
    borderRadius: scale(8),
    overflow: 'hidden',
    marginBottom: scale(12),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: scale(isTablet ? 22 : 18),
    marginBottom: scale(8),
  },
  description: {
    fontSize: scale(isTablet ? 16 : 14),
    marginBottom: scale(12),
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(8),
  },
  metadata: {
    flex: 1,
  },
  source: {
    fontSize: scale(isTablet ? 14 : 12),
    fontWeight: '600',
    marginBottom: scale(2),
  },
  date: {
    fontSize: scale(isTablet ? 13 : 11),
    opacity: 0.7,
  },
  favoriteButton: {
    padding: scale(4),
  },
  favoriteIcon: {
    fontSize: scale(isTablet ? 24 : 20),
  },
}); 