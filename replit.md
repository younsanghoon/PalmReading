# Personality Testing Web Application

## Overview

This is a React-based personality testing web application that combines traditional psychology tests (MBTI, Enneagram) with AI-powered analysis (animal face recognition and palm reading). The app provides users with personalized insights through multiple personality assessment methods, built with modern web technologies and machine learning integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **UI Library**: Radix UI components with shadcn/ui styling
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React Query for server state, React hooks for local state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and build processes

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Storage**: In-memory storage for development (with interface for easy database switching)
- **API**: RESTful API structure with Express routes

### AI/ML Integration
- **TensorFlow.js**: For running machine learning models in the browser
- **Teachable Machine**: Pre-trained models for image classification
- **Model Storage**: Local model files with encrypted URL references
- **Browser-based Processing**: All AI processing happens client-side

## Key Components

### Personality Tests
1. **Animal Face Test**: Uses camera/uploaded images with TensorFlow.js for facial feature analysis
2. **MBTI Test**: 40-question comprehensive personality assessment covering E/I, S/N, T/F, J/P dimensions
3. **Enneagram Test**: 40-question assessment for Egen(주도적) vs Teto(수용적) personality types
4. **Palm Reading Test**: AI-powered palm analysis using 5 different models (능력선, 감정선, 생명선, 운명선, 지능선)

### UI Components
- **Dialog System**: Modal interfaces for test administration
- **Progress Tracking**: Visual progress indicators for multi-step tests
- **Result Visualization**: Charts and graphs for displaying personality insights
- **Image Upload**: Drag-and-drop and file selection for image-based tests
- **Ad Spaces**: Strategic advertisement placement (banner, rectangle, skyscraper, mobile formats)
- **Routing System**: Separate pages for each test type with dedicated URLs

### Custom Hooks
- **useImageUpload**: Handles image file processing and validation
- **useTeachableMachine**: Manages AI model loading and prediction
- **useMobile**: Responsive design detection

### Navigation Structure
- **Home Page** (/): Main landing page with test overview and links
- **Test Pages**: Dedicated pages for each test (/animal-test, /mbti-test, /enneagram-test, /palm-test)
- **Legal Pages**: Privacy policy, terms of service, contact information

## Data Flow

1. **User Interaction**: Users select tests from the main interface
2. **Test Execution**: Tests run either through questionnaires or image analysis
3. **AI Processing**: For image-based tests, TensorFlow.js processes data client-side
4. **Result Generation**: Personality insights calculated and formatted
5. **Storage**: Results saved to localStorage for persistence
6. **Visualization**: Charts and detailed explanations presented to users

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React 18 with hooks, React Query for data fetching
- **UI Framework**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with PostCSS processing
- **AI/ML**: TensorFlow.js and Teachable Machine for model execution
- **Charts**: Chart.js for data visualization
- **Form Handling**: React Hook Form with Zod validation

### Development Dependencies
- **TypeScript**: Full type safety across the application
- **Vite**: Fast development server and build tool
- **ESBuild**: Fast JavaScript bundling for production
- **Drizzle Kit**: Database migrations and schema management

## Deployment Strategy

### Development Environment
- **Hot Module Replacement**: Vite provides fast development feedback
- **TypeScript Checking**: Continuous type checking during development
- **Database Migrations**: Drizzle Kit handles schema changes

### Production Build
- **Client Build**: Vite builds optimized React application
- **Server Build**: ESBuild bundles Node.js server code
- **Static Assets**: AI models and images served as static files
- **Database**: PostgreSQL with connection pooling via Neon

### Architecture Decisions

1. **Client-side AI Processing**: Chosen for privacy and reduced server load, though requires larger initial download
2. **Hybrid Storage**: Memory storage for development with easy database switching for production
3. **Component-based UI**: Modular design allows for easy test addition and maintenance
4. **Type Safety**: TypeScript throughout for better developer experience and fewer runtime errors
5. **Responsive Design**: Mobile-first approach with progressive enhancement
6. **URL Encryption**: Security layer for AI model URLs using base64 encoding with character substitution
7. **No Data Storage**: Strict privacy policy - no personal information or test results are stored on servers
8. **Monetization Strategy**: Strategic ad placement for revenue generation through multiple ad networks

## Recent Changes (July 10, 2025)

### Major Updates (Latest)
- **Expanded Question Pools**: Massively expanded question databases for better test variety
  - MBTI: Expanded to 160 total questions (40 per dimension: E/I, S/N, T/F, J/P)
  - 에겐-테토: Expanded to 100 total questions (balanced between personality types)
- **Improved Random Sampling**: Enhanced randomization system for test quality
  - MBTI: Random selection of 40 questions from 160-question pool per test session
  - 에겐-테토: Random selection of 25 questions from 100-question pool per test session
- **Separate Question Management**: Created dedicated question files for better organization
  - `/lib/mbti-questions.ts`: Contains all 160 MBTI questions
  - `/lib/enneagram-questions.ts`: Contains all 100 에겐-테토 questions
- **Enhanced Test Restart**: Improved reset functionality with fresh question selection

### Previous Updates
- **Compatibility/Matching Features**: Added comprehensive compatibility analysis for all tests (MBTI, 에겐-테토, animal face, palm reading)
- **Enhanced Visual Design**: Implemented modern gradient backgrounds, improved card animations, and enhanced overall styling
- **Question Randomization**: Fixed MBTI test to properly use randomized questions instead of original question order
- **Cross-Test Integration**: Compatibility results now reference other test types for comprehensive matching insights
- **Improved User Experience**: Better visual feedback, animations, and responsive design improvements

### Technical Improvements  
- **Question Pool Architecture**: Implemented scalable question management system with random sampling functions
- **MBTI Question Distribution**: Balanced 160 questions across four personality dimensions (40 each)
- **에겐-테토 Question Balance**: Distributed 100 questions evenly between personality types
- **Random Selection Functions**: Added `getRandomMBTIQuestions()` and `getRandomEnneagramQuestions()` utilities
- **MBTI Compatibility System**: 16-type comprehensive compatibility matrix with detailed descriptions
- **Animal Face Compatibility**: Cross-referenced compatibility with MBTI types and 에겐-테토 results
- **Palm Reading Integration**: Added compatibility analysis based on palm reading characteristics
- **Enhanced CSS Framework**: Added custom animations, gradient backgrounds, and improved card hover effects
- **Progress Bar Fixes**: Corrected MBTI test progress calculation to use randomized question count
- **Visual Consistency**: Unified design language across all test components with improved color schemes

The application is designed to be maintainable, scalable, and user-friendly while providing engaging personality insights through both traditional and innovative assessment methods, with a strong focus on privacy and user data protection.