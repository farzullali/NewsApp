import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { scale, isTablet, getResponsiveWidth } from '../utils/dimensions';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  gutter?: boolean;
  center?: boolean;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  style,
  gutter = true,
  center = false,
}) => {
  return (
    <View
      style={[
        styles.container,
        gutter && styles.gutter,
        center && styles.center,
        isTablet && styles.tabletContainer,
        style,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  gutter: {
    paddingHorizontal: scale(16),
  },
  center: {
    alignItems: 'center',
  },
  tabletContainer: {
    maxWidth: getResponsiveWidth(80),
    alignSelf: 'center',
  },
});

// Predefined spacing values
export const spacing = {
  xs: scale(4),
  sm: scale(8),
  md: scale(16),
  lg: scale(24),
  xl: scale(32),
  xxl: scale(48),
} as const;

// Predefined sizes for common UI elements
export const sizes = {
  icon: {
    small: scale(16),
    medium: scale(24),
    large: scale(32),
  },
  button: {
    height: scale(48),
    borderRadius: scale(8),
  },
  input: {
    height: scale(44),
    borderRadius: scale(8),
  },
  card: {
    borderRadius: scale(12),
    padding: scale(16),
  },
} as const; 