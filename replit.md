# Overview

This is a Madison food cart discovery web application called "Carts on State" that helps users find and explore food carts throughout Madison, Wisconsin. The application provides features for browsing food carts, searching by name/description, filtering by categories, viewing detailed cart information including menus and schedules, and discovering carts around the city with a focus on State Street and nearby locations.

## Recent Changes (August 2025)
- **Theme Update**: Transitioned entire website color scheme from orange/amber to red-maroon and white theme
- **Color Scheme**: Updated primary colors to red-maroon (hsl(0 80% 45%)) with yellow accent buttons
- **Contact Form**: Implemented responsive contact form with 250-word limit and live counter, matching new theme
- **Descriptive Naming**: Applied comprehensive semantic CSS class naming throughout codebase

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React with TypeScript**: Modern React application using functional components and hooks
- **Wouter**: Lightweight client-side routing library for navigation between pages
- **Tailwind CSS + shadcn/ui**: Utility-first CSS framework with pre-built component library for consistent design
- **Tanstack Query**: Data fetching and caching library for API state management
- **Vite**: Build tool and development server for fast development experience

## Backend Architecture
- **Express.js**: Node.js web framework serving REST API endpoints
- **TypeScript**: Type-safe server-side development
- **In-Memory Storage**: MemStorage class implements food cart data storage with seeded sample data
- **RESTful API Design**: Endpoints for retrieving food carts, searching, filtering by category, and getting individual cart details

## Data Storage Solutions
- **Drizzle ORM**: Type-safe SQL query builder configured for PostgreSQL
- **Neon Database**: Serverless PostgreSQL database (configured but not actively used, using in-memory storage instead)
- **Schema Definition**: Shared TypeScript schema defining food cart data structure with JSON fields for menu items and schedules

## Authentication and Authorization
- **No Authentication**: Current implementation has no user authentication system
- **Public Access**: All food cart data is publicly accessible without restrictions

## External Dependencies
- **Neon Database**: Serverless PostgreSQL hosting service
- **Unsplash**: Image hosting service for food cart photos
- **Replit**: Development and deployment platform with specific Vite plugins for development environment
- **React Icons**: Icon library for social media and UI icons
- **Radix UI**: Headless UI components for accessibility and functionality
- **Date-fns**: Date manipulation library for schedule handling

## Key Design Patterns
- **Monorepo Structure**: Client, server, and shared code organized in separate directories
- **Shared Types**: Common TypeScript interfaces and schemas used across frontend and backend
- **Component Composition**: Reusable UI components built with shadcn/ui and Radix primitives
- **API-First Design**: Clear separation between frontend and backend with RESTful endpoints
- **Mobile-Responsive**: Tailwind CSS utilities ensure responsive design across devices