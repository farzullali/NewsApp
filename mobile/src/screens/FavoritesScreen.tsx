import React, { useCallback } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { News } from '../types';
import { NewsItem } from '../components/NewsItem';
import { ThemeToggle } from '../components/ThemeToggle';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { useThemeStore } from '../store/useThemeStore';
import { lightTheme, darkTheme } from '../utils/theme';
import { RootStackParamList } from 'types/navigation.types';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const FavoritesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { isDarkMode } = useThemeStore();
  const { favorites } = useFavoritesStore();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const onNewsPress = useCallback((newsItem: News) => {
    navigation.navigate('NewsDetail', { news: newsItem });
  }, [navigation]);

  const renderNewsItem = useCallback(({ item }: { item: News }) => (
    <NewsItem news={item} onPress={onNewsPress} />
  ), [onNewsPress]);

  const keyExtractor = useCallback((item: News) => item.id, []);

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={[styles.container, styles.emptyContainer, { backgroundColor: theme.colors.background }]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
        <View style={styles.headerWithToggle}>
          <View />
          <ThemeToggle />
        </View>
        <Text style={[styles.emptyIcon, { color: theme.colors.textSecondary }]}>
          🤍
        </Text>
        <Text style={[styles.emptyTitle, { color: theme.colors.text }, theme.typography.h2]}>
          No Favorites Yet
        </Text>
        <Text style={[styles.emptyDescription, { color: theme.colors.textSecondary }, theme.typography.body1]}>
          Start exploring news and tap the heart icon to save articles you love!
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }, theme.typography.h1]}>
            Favorites
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }, theme.typography.body2]}>
            {favorites.length} saved {favorites.length === 1 ? 'article' : 'articles'}
          </Text>
        </View>
        <ThemeToggle />
      </View>
      <FlatList
        data={favorites}
        renderItem={renderNewsItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  headerWithToggle: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyDescription: {
    textAlign: 'center',
    lineHeight: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    marginBottom: 4,
  },
  headerSubtitle: {
    opacity: 0.7,
  },
  listContent: {
    paddingBottom: 16,
  },
}); 