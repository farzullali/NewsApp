# NewsApp

A modern React Native news application that provides users with the latest news articles, supports offline caching, favorites management, and theme customization.

## Project Structure

```
NewsAppProject/
├── src/
│   ├── api/           # API integration and services
│   ├── types/         # TypeScript type definitions
│   ├── components/    # Reusable UI components
│   ├── assets/        # Static assets (images, fonts)
│   ├── navigation/    # Navigation configuration
│   ├── utils/         # Utility functions
│   ├── repositories/  # Data access layer
│   ├── hooks/         # Custom React hooks
│   ├── screens/       # Screen components
│   └── store/         # State management
├── ios/               # iOS native code
├── android/          # Android native code
└── __tests__/        # Test files
```

## Core Modules

### 1. API Layer (`/src/api/`)
- **Services**: Handles API communication with the news service
- **Configuration**: Axios setup and endpoint management
- **Error Handling**: Centralized error handling for API requests

### 2. Types (`/src/types/`)
Key type definitions:
- `News`: Core news article structure
- `NewsSource`: News source information
- `NewsApiResponse`: API response structure
- `NewsQueryParams`: API query parameters
- `Theme`: Application theming types
- `Navigation`: Navigation parameter types

### 3. Components (`/src/components/`)
Reusable UI components including:
- `CachedImage`: Image component with caching support
- `ScreenLayout`: Common screen layout wrapper

### 4. Navigation (`/src/navigation/`)
- Stack and tab navigation configuration
- Route definitions and type-safe navigation parameters

### 5. Utils (`/src/utils/`)
Utility functions:
- `newsTransformer`: Transforms API responses to app models
- `storage`: Local storage management
- `dimensions`: Responsive sizing utilities
- `theme`: Theme configuration

### 6. Repositories (`/src/repositories/`)
Data management layer:
- `newsRepository`: Handles news data caching and retrieval
- Implements offline-first approach
- Manages favorites storage

### 7. Hooks (`/src/hooks/`)
Custom React hooks:
- `useNewsLoader`: Manages news loading, pagination, and caching
- `useLoadingState`: Loading state management
- `useThemeStore`: Theme state management
- `useFavoritesStore`: Favorites management

### 8. Screens (`/src/screens/`)
Main application screens:
- News feed
- News detail
- Favorites
- Settings

### 9. Store (`/src/store/`)
State management:
- News state
- Theme state
- Favorites state

## Key Features

1. **News Management**
   - Fetching and displaying news articles
   - Pagination support
   - Search functionality
   - Category and country filtering

2. **Offline Support**
   - Article caching
   - Offline-first approach
   - Persistent storage

3. **Favorites**
   - Save articles to favorites
   - Manage favorite articles
   - Persistent storage

4. **Theming**
   - Light/Dark mode support
   - Theme persistence
   - Customizable colors

5. **Error Handling**
   - Graceful error recovery
   - Offline fallback
   - User-friendly error messages

## Technical Implementation

### Data Flow
1. User requests news
2. `useNewsLoader` hook manages the request
3. `newsRepository` checks cache
4. If needed, `newsService` fetches from API
5. Data is transformed via `newsTransformer`
6. State is updated and UI refreshes

### Caching Strategy
- In-memory cache for quick access
- Persistent storage for offline support
- Cache invalidation based on time
- Fallback to cached data on errors

### Type Safety
- Comprehensive TypeScript types
- Type-safe navigation
- API type definitions
- State management types

### Error Handling
- API error handling
- Network error recovery
- Retry mechanism for Android
- Graceful degradation

### Performance Optimizations
- Image caching
- Pagination
- Memory cache
- Response transformation
- Responsive design

## Development Guidelines

1. **Type Safety**
   - Always use TypeScript types
   - Avoid any type
   - Use proper type imports

2. **State Management**
   - Use appropriate stores for global state
   - Leverage local state for component-specific data
   - Implement proper state updates

3. **Error Handling**
   - Always handle potential errors
   - Provide user feedback
   - Implement fallback mechanisms

4. **Testing**
   - Write unit tests for utilities
   - Test components in isolation
   - Implement integration tests

5. **Code Style**
   - Follow ESLint configuration
   - Use Prettier for formatting
   - Follow component structure guidelines

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation
1. Clone the repository
```bash
git clone [repository-url]
cd NewsApp
```

2. Install dependencies
```bash
npm install
```

3. Install iOS dependencies
```bash
cd ios
pod install
cd ..
```

### Running the App
- iOS:
```bash
npm run ios
```

- Android:
```bash
npm run android
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details. 