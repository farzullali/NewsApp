import { News } from './news.types';
import { ROUTES } from '../navigation/routes';

/**
 * Navigation parameter types for the application
 */

/**
 * Root stack navigation parameters
 */
export type RootStackParamList = {
  [ROUTES.TABS.HOME]: undefined;
  [ROUTES.STACKS.NEWS_DETAIL]: { news: News };
};

/**
 * Bottom tab navigation parameters
 */
export type BottomTabParamList = {
  [ROUTES.TABS.NEWS_FEED]: undefined;
  [ROUTES.TABS.FAVORITES]: undefined;
}; 