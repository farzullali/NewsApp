export const lightTheme = {
  colors: {
    primary: '#2196F3',
    primaryDark: '#1976D2',
    secondary: '#03DAC6',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    error: '#B00020',
    text: '#000000',
    textSecondary: '#666666',
    border: '#E0E0E0',
    cardBackground: '#FFFFFF',
    shadow: 'rgba(0, 0, 0, 0.1)',
    placeholder: '#9E9E9E',
    accent: '#FF5722',
  },
  typography: {
    h1: {
      fontSize: 24,
      fontWeight: 'bold' as const,
      lineHeight: 32,
    },
    h2: {
      fontSize: 20,
      fontWeight: 'bold' as const,
      lineHeight: 28,
    },
    h3: {
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 24,
    },
    body1: {
      fontSize: 16,
      fontWeight: 'normal' as const,
      lineHeight: 22,
    },
    body2: {
      fontSize: 14,
      fontWeight: 'normal' as const,
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: 'normal' as const,
      lineHeight: 16,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
  },
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    primary: '#64B5F6',
    primaryDark: '#42A5F5',
    secondary: '#80CBC4',
    background: '#121212',
    surface: '#1E1E1E',
    error: '#CF6679',
    text: '#FFFFFF',
    textSecondary: '#B3B3B3',
    border: '#333333',
    cardBackground: '#2C2C2C',
    shadow: 'rgba(0, 0, 0, 0.3)',
    placeholder: '#757575',
    accent: '#FF7043',
  },
};

export type Theme = typeof lightTheme; 