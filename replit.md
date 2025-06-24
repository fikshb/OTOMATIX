# Otomatix - Business Chatbot & Digital Automation Platform

## Overview

Otomatix is a business-focused digital automation platform that provides chatbot solutions and automation services for Indonesian businesses. The application is built as a full-stack web application with a static frontend and a Node.js API backend, designed to capture leads and manage customer inquiries through a simple contact form system.

## System Architecture

The application follows a **hybrid architecture** combining:
- **Static Frontend**: HTML/CSS/JavaScript served via Python HTTP server
- **API Backend**: Node.js server handling business logic and database operations
- **PostgreSQL Database**: Managed through Drizzle ORM for data persistence
- **Parallel Deployment**: Both frontend and backend run simultaneously on different ports

### Architecture Decision Rationale
- **Hybrid approach** chosen for simplicity and rapid deployment on Replit
- **Separate servers** allow independent scaling and maintenance of frontend/backend
- **Static frontend** ensures fast loading and minimal server resources
- **PostgreSQL with Drizzle** provides type-safe database operations with modern ORM features

## Key Components

### Frontend (Port 5000)
- **Technology**: Vanilla HTML/CSS/JavaScript
- **Styling**: Custom CSS with Google Fonts (Poppins, Inter)
- **Icons**: Font Awesome 6.0
- **Purpose**: Landing page for lead capture and business information
- **Language**: Indonesian (target market)

### Backend API (Port 3001)
- **Technology**: Node.js with native HTTP module  
- **Database**: Neon PostgreSQL via @neondatabase/serverless
- **ORM**: Drizzle ORM with TypeScript schema
- **Features**: 
  - Contact form submission endpoint
  - CORS enabled for cross-origin requests
  - Input validation and error handling

### Database Schema
Two main entities with relationship:
- **Contacts**: Customer contact information and inquiries
- **Inquiries**: Follow-up tracking linked to contacts
- **Features**: Timestamps, status tracking, lead source attribution

## Data Flow

1. **Lead Capture**: User fills contact form on landing page
2. **API Submission**: Frontend sends POST request to `/api/contact`
3. **Validation**: Backend validates required fields (name, email)
4. **Database Storage**: Contact information stored in PostgreSQL
5. **Response**: Success/error response sent back to frontend
6. **Follow-up**: Inquiries table tracks lead management progress

## External Dependencies

### Runtime Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **drizzle-orm**: Type-safe ORM for database operations
- **drizzle-kit**: Database migration and schema management
- **ws**: WebSocket support for Neon database connections
- **@types/ws**: TypeScript definitions for WebSocket

### External Services
- **Neon Database**: Hosted PostgreSQL database service
- **Google Fonts**: Typography (Poppins, Inter fonts)
- **Font Awesome**: Icon library
- **WhatsApp Integration**: Contact links for direct communication

## Deployment Strategy

### Replit Configuration
- **Parallel Workflow**: Frontend and backend run simultaneously
- **Port Mapping**: 
  - Frontend: Internal 5000 → External 80 (main site)
  - API: Internal 3001 → External 3001 (API access)
- **Environment**: Node.js 20 with web modules
- **Database**: Environment variable `DATABASE_URL` for connection

### Deployment Features
- **Auto-start**: Both servers launch on project start
- **Hot Reload**: Changes reflected immediately
- **CORS Enabled**: Frontend can communicate with API
- **Error Handling**: Graceful failure management

## Changelog

```
Changelog:
- June 24, 2025. Initial setup
- June 24, 2025. Successfully migrated from Replit Agent to Replit environment - all dependencies installed, database configured, both frontend and API servers running properly
- June 24, 2025. Added complete AI automation demo section with local video player, 2-column responsive layout, and Indonesian content as requested
- June 24, 2025. Fixed text visibility issues across all sections with proper contrast and readable colors
- June 24, 2025. Updated contact information: email to otomatixdigital@gmail.com and phone to +62 821-3166-0176
- June 24, 2025. Added playful hover animations to all interactive elements including buttons, cards, form inputs with smooth transitions, scaling effects, shimmer animations, and bounce effects
- June 24, 2025. Updated location from Jakarta to Bandung, Indonesia in contact information
- June 24, 2025. Added Instagram contact link (@otomatix.digital) with clickable link to https://www.instagram.com/otomatix.digital/
- June 24, 2025. Updated all "Minta Penawaran" buttons to link to contact form (#hubungi-kami) with smooth scroll behavior, added proper section ID
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```