export const ROUTES = {
  // Tab Routes
  TABS: {
    HOME: 'Home',
    NEWS_FEED: 'NewsFeed',
    FAVORITES: 'Favorites',
  },
  
  // Stack Routes
  STACKS: {
    NEWS_DETAIL: 'NewsDetail',
  },
} as const;

// Screen mapping for better organization
export const TAB_SCREENS = [
  {
    name: ROUTES.TABS.NEWS_FEED,
    label: 'News',
    icon: '📰',
  },
  {
    name: ROUTES.TABS.FAVORITES,
    label: 'Favorites',
    icon: '❤️',
  },
] as const; 