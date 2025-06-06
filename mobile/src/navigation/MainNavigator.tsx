import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NewsDetailScreen } from '../screens/NewsDetailScreen';
import { TabNavigator } from './TabNavigator';
import { ROUTES } from './routes';
import { useThemeStore } from '../store/useThemeStore';
import { lightTheme, darkTheme } from '../utils/theme';
import { RootStackParamList } from 'types/navigation.types';

const Stack = createStackNavigator<RootStackParamList>();

const STACK_SCREENS = [
  {
    name: ROUTES.TABS.HOME,
    component: TabNavigator,
  },
  {
    name: ROUTES.STACKS.NEWS_DETAIL,
    component: NewsDetailScreen,
  },
] as const;

export const MainNavigator: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background },
      }}
    >
      {STACK_SCREENS.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Stack.Navigator>
  );
}; 