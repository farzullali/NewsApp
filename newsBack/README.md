# News API Backend

A NestJS-based backend service for delivering news content.

## Description

This project is a RESTful API service built with NestJS framework that provides news-related functionality. It's designed to be scalable, maintainable, and follows best practices in modern TypeScript development.

## Technologies

- Node.js
- NestJS (v10.0.0)
- TypeScript
- Express
- Swagger/OpenAPI
- Class Validator & Transformer

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager

## Installation

```bash
# Install dependencies
npm install
```

## Running the Application

```bash
# Development mode with hot-reload
npm run dev

# Build the application
npm run build

# Production mode
npm run start
```

## Project Structure

```
src/
├── controllers/    # Request handlers
├── services/      # Business logic
├── dtos/          # Data Transfer Objects
├── models/        # Data models
├── data/          # Data sources
├── app.module.ts  # Main application module
└── main.ts        # Application entry point
```

## Available Scripts

- `npm run build`: Compiles the TypeScript code
- `npm run start`: Runs the compiled application
- `npm run dev`: Runs the application in development mode with hot reload
- `npm run format`: Formats the code using Prettier
- `npm run lint`: Lints and fixes code using ESLint

## Development

The application uses the following development tools:
- TypeScript for type-safe code
- Prettier for code formatting
- ESLint for code linting
- ts-node-dev for development with hot reload

## API Documentation

The API documentation is automatically generated using Swagger/OpenAPI. Once the application is running, you can access the documentation at:
```
http://localhost:3000/api
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. 