# ProjEN - Project Management System

ProjEN is a comprehensive project management system with task organization capabilities, providing an intuitive interface for managing your projects and tracking progress.

## Overview

ProjEN is a full-stack application built with:
- **Frontend**: React, TypeScript, Material UI, Vite
- **Backend**: Java Spring Boot, PostgreSQL
- **Security**: JWT Authentication

## Features

- **Task Management**: Organize projects into tasks and categories with priority assignments
- **User Authentication**: Secure login and registration system
- **Dashboard**: Overview of all your projects and their statuses
- **Project Creation**: Easily create and manage new projects
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Getting Started

### Prerequisites

- Java 11 or higher
- Node.js and npm
- PostgreSQL database
- OpenAI API key (for AI features)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Configure your database settings in `src/main/resources/application.yml`:
   ```yaml
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5432/projen
       username: your_username
       password: your_password
   ```

3. Set your OpenAI API key as an environment variable:
   ```
   export OPENAI_API_KEY=your_api_key
   ```

4. Build and run the Spring Boot application:
   ```
   ./mvnw spring-boot:run
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Access the application at `http://localhost:5173`

## API Endpoints

### Projects
- `GET /api/projects`: Get all projects
- `GET /api/projects/{id}`: Get project by ID
- `POST /api/projects`: Create a new project
- `PUT /api/projects/{id}`: Update an existing project
- `DELETE /api/projects/{id}`: Delete a project

### Tasks
- `GET /api/tasks`: Get all tasks
- `POST /api/tasks`: Create a new task
- `PUT /api/tasks/{id}`: Update task details

## Project Structure

```
ProjEN/
├── backend/                # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/projen/backend/
│   │       ├── controller/ # REST controllers
│   │       ├── dto/        # Data Transfer Objects
│   │       ├── model/      # Entity models
│   │       ├── repository/ # Database repositories
│   │       └── service/    # Business logic
│   └── src/main/resources/ # Configuration files
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   └── services/       # API service connectors
```

## Security

The application uses JWT for authentication. The token is generated upon successful login and must be included in the header of subsequent API requests.


## Known Issues 

- There are problems related to creating overly detailed projects in the system
- The current frontend is primarily a study of TypeScript and Material UI technologies, utilizing many heterogeneous features that should be refactored
- This frontend will eventually be abandoned in favor of a completely new frontend built with TypeScript and Tailwind CSS

## Future Implementations

- AI-powered project description suggestions
- Team sharing and collaboration system
- Improved project management workflow

## License

This project is licensed under the MIT License - see the LICENSE file for details.