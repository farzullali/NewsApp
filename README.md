# News App

A full-stack news application with a React Native mobile app and NestJS backend API.

## 🏗️ Architecture

**Frontend**: React Native app with offline support, favorites, and theming  
**Backend**: NestJS REST API for news content delivery

## 📱 Features

- **News Feed**: Browse latest articles with pagination
- **Offline Support**: Read cached articles without internet
- **Favorites**: Save and manage favorite articles
- **Dark/Light Theme**: Customizable app appearance
- **Cross-Platform**: iOS and Android support

## 🚀 Quick Start

### Prerequisites
- Node.js (Latest LTS)
- React Native CLI
- Xcode (iOS) / Android Studio (Android)

### Installation

```bash
# Clone repository
git clone [repository-url]
cd news-app

# Install backend dependencies
cd newsBack
npm install
cd ..

# Install mobile dependencies
cd mobile
npm install

# iOS setup
cd ios && pod install && cd ..
cd ..
```

### Running the App

```bash
# Start backend API (from newsBack folder)
cd newsBack
npm run dev

# In another terminal, start mobile app (from mobile folder)
cd mobile
npm run ios     # iOS
npm run android # Android
```

## 📁 Project Structure

```
├── mobile/                # React Native App
│   ├── src/
│   │   ├── api/          # API services
│   │   ├── components/   # Reusable UI components
│   │   ├── screens/      # App screens
│   │   ├── hooks/        # Custom React hooks
│   │   ├── store/        # State management
│   │   └── utils/        # Utilities
│   ├── ios/              # iOS native code
│   └── android/          # Android native code
└── newsBack/             # NestJS Backend API
    ├── src/
    │   ├── controllers/  # Request handlers
    │   ├── services/     # Business logic
    │   ├── dtos/         # Data transfer objects
    │   └── models/       # Data models
    └── dist/             # Compiled output
```

## 🛠️ Tech Stack

**Frontend**
- React Native
- TypeScript
- Zustand (State Management)
- React Navigation

**Backend**
- NestJS
- TypeScript
- Express
- Swagger/OpenAPI

## 📚 API Documentation

Access the API documentation at `http://localhost:3000/api` when the backend is running.

## 🧪 Development

```bash
# Format code
npm run format

# Lint code
npm run lint

# Build for production
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details.
