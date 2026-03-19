# Todo App - Fullstack Next.js Application

A fullstack todo application built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and TypeORM with SQLite.

## Features
- Create, read, update, and delete todos
- SQLite database for data persistence
- Responsive UI with Tailwind CSS
- TypeScript for type safety
- API routes for backend logic
- Docker support for deployment

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Docker (optional, for containerized deployment)

### Installation
1. Clone the repository
2. Run `npm install`
3. Copy `.env.example` to `.env` (already provided)
4. Run `npm run dev` for development

### Database
- SQLite database is automatically created at `./dev.db`
- TypeORM synchronizes the schema in development
- In production, use migrations (see package.json scripts)

### Deployment with Coolify
1. Push to your Git repository
2. Connect to Coolify with the repository
3. Coolify will automatically detect the Dockerfile and deploy

### API Endpoints
- `GET /api/todos` - Fetch all todos
- `POST /api/todos` - Create a new todo (requires `title` and optional `description`)
- `PATCH /api/todos` - Update todo completion (requires `id` and `completed`)
- `DELETE /api/todos` - Delete a todo (requires `id`)

## Docker
- Uses Node 20-alpine base image
- Multi-stage build for production
- Exposes port 3000

## License
MIT