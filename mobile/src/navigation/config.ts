import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { StackNavigationOptions } from '@react-navigation/stack';
import { scale } from '../utils/dimensions';
import { Theme } from '../types/theme';

export const getTabNavigatorConfig = (theme: Theme): BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarStyle: {
    backgroundColor: theme.colors.surface,
    borderTopColor: theme.colors.border,
    paddingBottom: scale(8),
    paddingTop: scale(8),
    height: scale(60),
  },
  tabBarActiveTintColor: theme.colors.primary,
  tabBarInactiveTintColor: theme.colors.textSecondary,
  tabBarLabelStyle: {
    fontSize: scale(12),
    fontWeight: '500' as const,
  },
});

export const getStackNavigatorConfig = (theme: Theme): StackNavigationOptions => ({
  headerShown: false,
  cardStyle: { 
    backgroundColor: theme.colors.background 
  },
}); 