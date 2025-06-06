import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types/navigation';
import { NewsFeedScreen } from '../screens/NewsFeedScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { useThemeStore } from '../store/useThemeStore';
import { lightTheme, darkTheme } from '../utils/theme';
import { ROUTES, TAB_SCREENS } from './routes';
import { getTabNavigatorConfig } from './config';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const SCREEN_COMPONENTS = {
  [ROUTES.TABS.NEWS_FEED]: NewsFeedScreen,
  [ROUTES.TABS.FAVORITES]: FavoritesScreen,
} as const;

export const TabNavigator: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;
  
  const screenOptions = useMemo(() => 
    getTabNavigatorConfig(theme),
    [theme]
  );

  const screens = useMemo(() => 
    TAB_SCREENS.map((screen) => ({
      ...screen,
      component: SCREEN_COMPONENTS[screen.name],
      options: {
        tabBarLabel: screen.label,
        tabBarIcon: ({ color, size }: { color: string; size: number }) => (
          <Text style={{ fontSize: size, color }}>{screen.icon}</Text>
        ),
      },
    })),
    []
  );

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {screens.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Tab.Navigator>
  );
}; 