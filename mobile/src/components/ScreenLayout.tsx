import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '../store/useThemeStore';
import { lightTheme, darkTheme } from '../utils/theme';
import { ThemeToggle } from './ThemeToggle';
import { scale } from '../utils/dimensions';

interface ScreenLayoutProps {
  children: React.ReactNode;
  showThemeToggle?: boolean;
  contentStyle?: any;
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  showThemeToggle = true,
  contentStyle,
}) => {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView 
      style={[
        styles.container, 
        { backgroundColor: theme.colors.background }
      ]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      
      {showThemeToggle && (
        <View style={styles.header}>
          <View style={styles.headerLeft} />
          <ThemeToggle />
        </View>
      )}

      <View style={[styles.content, contentStyle]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
  },
  headerLeft: {
    width: scale(40), // Same width as ThemeToggle for balance
  },
  content: {
    flex: 1,
  },
}); 