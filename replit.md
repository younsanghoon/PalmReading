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
2. **MBTI Test**: Traditional questionnaire-based personality assessment
3. **Enneagram Test**: Simplified personality type evaluation
4. **Palm Reading Test**: AI-powered palm analysis for entertainment purposes

### UI Components
- **Dialog System**: Modal interfaces for test administration
- **Progress Tracking**: Visual progress indicators for multi-step tests
- **Result Visualization**: Charts and graphs for displaying personality insights
- **Image Upload**: Drag-and-drop and file selection for image-based tests

### Custom Hooks
- **useImageUpload**: Handles image file processing and validation
- **useTeachableMachine**: Manages AI model loading and prediction
- **useMobile**: Responsive design detection

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

The application is designed to be maintainable, scalable, and user-friendly while providing engaging personality insights through both traditional and innovative assessment methods.