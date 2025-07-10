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

## Recent Changes (July 10, 2024)

### Major Updates
- **Expanded Question Sets**: MBTI and Enneagram tests now feature 40 questions each for more accurate results
- **Page Structure Overhaul**: Converted from modal-based to dedicated page-based navigation
- **Advertisement Integration**: Added comprehensive ad space system supporting multiple formats
- **Legal Framework**: Implemented privacy policy, terms of service, and contact pages
- **Enhanced Security**: Updated palm reading model URLs with proper encryption
- **Improved User Experience**: Better navigation flow and responsive design across all devices

### Technical Improvements
- **Model URL Security**: Encrypted URLs for all 5 palm reading models (ability, emotion, life, fate, intelligence lines)
- **Routing Enhancement**: Full page routing system with dedicated URLs for each test
- **Ad Space Component**: Flexible advertisement component supporting banner, rectangle, skyscraper, and mobile formats
- **Footer Integration**: Added footer with legal links and branding
- **Mobile Optimization**: Enhanced mobile experience with appropriate ad placements

The application is designed to be maintainable, scalable, and user-friendly while providing engaging personality insights through both traditional and innovative assessment methods, with a strong focus on privacy and user data protection.