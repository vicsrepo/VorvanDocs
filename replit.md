# MicroVorvanDocs Project Guide

## Overview

MicroVorvanDocs is an ultralightweight documentation system that renders Markdown to HTML with WebAssembly for speed. It's designed to be a minimalist alternative to Docsify, focusing on speed and simplicity without dependencies like AI, playgrounds, or collaboration features.

The project follows a modern web application architecture with React for the frontend and Express for the backend. It uses Drizzle ORM for database operations and includes a WebAssembly-powered Markdown parser for efficient document rendering.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

- **React**: The frontend is built with React and uses Vite as the build tool.
- **UI Components**: Uses shadcn/ui component library with Tailwind CSS for styling.
- **Routing**: Simple hash-based routing (#) without page reloads, automatically detecting README.md as the default page.
- **WebAssembly**: Utilizes a WebAssembly-based Markdown parser for 3x faster rendering than traditional JavaScript solutions.
- **Theming**: Supports both light and dark themes with CSS variables.

### Backend

- **Express.js**: Serves the API endpoints and static assets.
- **Server Routes**: Handles page retrieval and WebAssembly file serving.
- **Storage Interface**: Abstracts database operations for page management.

### Database

- **Drizzle ORM**: Used for database operations with a PostgreSQL schema.
- **Schema Design**: Simple schema focused on page content, with fields for title, content, icon, and published status.

### Integration Points

- **API Endpoints**: Backend API endpoints for fetching and managing documentation pages.
- **Static File Serving**: Server routes for markdown files and WebAssembly modules.

## Key Components

### Frontend Components

1. **Markdown Renderer**: React component that displays rendered Markdown content.
2. **Table of Contents**: Automatically generated from the document headings.
3. **Sidebar**: Navigation component showing available documentation pages.
4. **Header**: Contains search and theme toggle functionality.
5. **WebAssembly Markdown Parser**: High-performance parser for converting Markdown to HTML.

### Backend Components

1. **Express Server**: Entry point for handling HTTP requests.
2. **Storage Module**: Interface for handling page data persistence.
3. **API Routes**: Endpoints for retrieving and managing pages.
4. **WebAssembly Loader**: Serves the WebAssembly modules for the frontend.

### Database Schema

```typescript
// The pages table schema
const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  pageId: text("page_id").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  icon: text("icon").default("📄"),
  published: boolean("published").default(true),
  order: integer("order").default(0),
});
```

## Data Flow

1. **Page Load**:
   
   - User visits the application
   - React app initializes
   - The current page is determined from the URL hash
   - Backend fetches the markdown file for the requested page
   - WebAssembly module parses Markdown to HTML
   - Content is displayed with the Table of Contents

2. **Page Navigation**:
   
   - User clicks a link in the sidebar
   - URL hash is updated
   - React detects hash change and requests the new page
   - Content is updated without full page reload

3. **Theme Toggle**:
   
   - User toggles theme
   - CSS variables are updated
   - UI appearance changes between light and dark modes

## External Dependencies

### Frontend Dependencies

- React and React DOM
- Radix UI components (@radix-ui/*)
- Tailwind CSS with class-variance-authority
- React Query for data fetching

### Backend Dependencies

- Express.js for server functionality
- Drizzle ORM for database operations
- Vite for development and production builds

### WebAssembly

- The project uses a WebAssembly module for Markdown parsing, with a fallback to marked.js when WebAssembly fails to load

## Deployment Strategy

The application is configured for deployment on Replit with:

1. **Build Process**:
   
   - Frontend is built with Vite
   - Backend is bundled with esbuild
   - Combined into a single distribution package

2. **Runtime**:
   
   - Node.js serves the Express application
   - Serves both the API and static assets

3. **Database**:
   
   - PostgreSQL for production (configured via DATABASE_URL environment variable)
   - In-memory storage available as fallback during development

4. **Environment Configuration**:
   
   - NODE_ENV determines development or production mode
   - DATABASE_URL connects to the PostgreSQL instance

5. **Scaling**:
   
   - Configured for auto-scaling in the Replit environment
   - Optimized for minimal resource usage with the WebAssembly approach

## Development Workflow

1. **Local Development**:
   
   - `npm run dev`: Starts development server with hot-reloading
   - Frontend accessible at http://localhost:5000
   - Changes to React code are immediately reflected

2. **Database Management**:
   
   - `npm run db:push`: Updates the database schema based on Drizzle definitions

3. **Production Build**:
   
   - `npm run build`: Creates optimized production build
   - `npm run start`: Starts the production server

4. **Project Architecture**:
   
   - `/client`: React frontend code
   - `/server`: Express backend code
   - `/shared`: Shared code between frontend and backend
   - `/public`: Static assets including markdown pages and WebAssembly modules