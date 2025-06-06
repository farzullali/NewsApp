import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from 'types/navigation.types';
import { CachedImage } from '../components/CachedImage';
import { ScreenLayout } from '../components/ScreenLayout';
import { useThemeStore } from '../store/useThemeStore';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { lightTheme, darkTheme } from '../utils/theme';
import { scale, isTablet } from '../utils/dimensions';

type NewsDetailRouteProp = RouteProp<RootStackParamList, 'NewsDetail'>;

export const NewsDetailScreen: React.FC = () => {
  const route = useRoute<NewsDetailRouteProp>();
  const navigation = useNavigation();
  const { isDarkMode } = useThemeStore();
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const { news } = route.params;
  const isNewsLiked = isFavorite(news.id);

  const handleFavoritePress = () => {
    if (isNewsLiked) {
      removeFavorite(news.id);
    } else {
      addFavorite(news);
    }
  };

  return (
    <ScreenLayout>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.backButton, { color: theme.colors.primary }]}>
            ← Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleFavoritePress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.favoriteIcon}>
            {isNewsLiked ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {news.urlToImage && (
          <CachedImage
            uri={news.urlToImage}
            height={scale(isTablet ? 400 : 300)}
          />
        )}

        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {news.title}
          </Text>

          <View style={styles.metadata}>
            <Text style={[styles.source, { color: theme.colors.primary }]}>
              {news.source.name}
            </Text>
            {news.author && (
              <Text style={[styles.author, { color: theme.colors.textSecondary }]}>
                By {news.author}
              </Text>
            )}
          </View>

          {news.description && (
            <Text style={[styles.description, { color: theme.colors.text }]}>
              {news.description}
            </Text>
          )}

          {news.content && (
            <Text style={[styles.content, { color: theme.colors.text }]}>
              {news.content}
            </Text>
          )}
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingTop: scale(8),
  },
  backButton: {
    fontSize: scale(16),
    fontWeight: '600',
  },
  favoriteIcon: {
    fontSize: scale(24),
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: scale(16),
  },
  title: {
    fontSize: scale(isTablet ? 28 : 24),
    fontWeight: '700',
    marginBottom: scale(16),
  },
  metadata: {
    marginBottom: scale(16),
  },
  source: {
    fontSize: scale(isTablet ? 16 : 14),
    fontWeight: '600',
    marginBottom: scale(4),
  },
  author: {
    fontSize: scale(isTablet ? 14 : 12),
  },
  description: {
    fontSize: scale(isTablet ? 18 : 16),
    lineHeight: scale(isTablet ? 28 : 24),
    marginBottom: scale(16),
  },
}); 