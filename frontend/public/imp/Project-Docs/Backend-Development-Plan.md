# Backend Development Plan: AlertWise

This document outlines the strategy for building the robust backend of **AlertWise**. The backend acts as a thin, secure API layer on top of Supabase, handling business logic, role verification, and third-party integrations, while delegating heavy lifting (Auth, DB, Realtime) to Supabase's managed services.

## 1. Technology Stack

*   **Runtime**: Node.js (v18+ LTS).
*   **Framework**: Express.js (Lightweight, robust, middleware-heavy).
*   **Database**: Supabase (PostgreSQL) - Accessed via `@supabase/supabase-js`.
*   **Authentication**: Supabase Auth (JWT handling).
*   **Validation**: Zod (Runtime request schema validation).
*   **Testing**: Jest + Supertest (Integration testing).
*   **Logging**: Winston/Morgan (Structured logging).
*   **Hosting**: Render (Web Service).

## 2. Architecture & Design

### API Gateway / Service Layer Pattern
Even though Supabase *can* be called directly from the frontend, we will implement an Express Middleware layer for critical business logic to ensure security and scalability.

*   **Logic Flow**:
    `Client (React)` -> `Express API` -> `Supabase Client` -> `Postgres DB`

### Key Responsibilities of Backend Node API:
1.  **Admin Actions**: Creating hazards, broadcasting alerts to thousands of users (batching).
2.  **Validation**: Ensuring data integrity before it hits the DB (Zod middleware).
3.  **Cross-Service logic**: e.g., When an alert is created, also trigger a push notification or email (future work).
4.  **Sensitive Data**: Handling logic we don't want exposed in frontend JS bundles.

## 3. Database Schema (Supabase PostgreSQL)

We will use SQL migrations. Key tables and relationships:

*   **`profiles`**:
    *   `id` (UUID, PK, references auth.users)
    *   `role` (enum: 'citizen', 'student', 'trainer', 'admin')
    *   `region_id` (FK)
    *   `preparedness_score` (INT)
    *   `avatar_url` (TEXT)
*   **`hazards`**:
    *   `id` (UUID, PK)
    *   `name` (TEXT)
    *   `description` (TEXT)
    *   `preparation_content` (JSONB)
*   **`modules`**:
    *   `id` (UUID, PK)
    *   `hazard_id` (FK)
    *   `title` (TEXT)
    *   `difficulty` (enum: 'basic', 'advanced')
*   **`quizzes`** & **`questions`**: Standard One-to-Many relationships.
*   **`alerts`**:
    *   `id` (UUID, PK)
    *   `region` (TEXT)
    *   `severity` (enum: 'info', 'warning', 'critical')
    *   `content` (TEXT)
    *   `expires_at` (TIMESTAMPTZ)
*   **`emergency_contacts`**:
    *   `id`, `name`, `phone`, `region`, `type`.

### Security Policies (RLS)
*   **Public**: Everyone can read `hazards`, `alerts`.
*   **Authenticated**: Users can read/update their own `profiles`.
*   **Admin-Only**: Full CRUD on `hazards`, `modules`, `alerts`.

## 4. API Endpoint Design

Prefix: `/api/v1`

| Method | Endpoint | Description | Role |
| :--- | :--- | :--- | :--- |
| **Auth** | | | |
| `POST` | `/auth/sync` | Sync Supabase session details | Public |
| **Hazards** | | | |
| `GET` | `/hazards` | List all hazards | Public |
| `POST` | `/hazards` | Create new hazard | Admin |
| **Alerts** | | | |
| `GET` | `/alerts` | Get alerts (filter by region) | Public |
| `POST` | `/alerts` | Broadcast new alert | Admin |
| **User** | | | |
| `GET` | `/user/me` | Get full user profile | Auth |
| `POST` | `/user/quiz-attempt` | Submit quiz score | Auth |

## 5. Directory Structure

```text
server/
├── src/
│   ├── config/             # Env vars, Supabase Admin Client
│   ├── controllers/        # Request handlers (logic)
│   ├── middlewares/        # Auth verify, Zod Validation, Error handling
│   ├── routes/             # Express Routers
│   ├── services/           # Business logic & Database interactions
│   ├── utils/              # Helper functions (Logger, Response formatter)
│   └── app.ts              # Express App setup
├── tests/                  # Jest tests
├── .env.example
├── package.json
└── tsconfig.json
```

## 6. Implementation Plan

### Phase 1: Setup & Environment
1.  Initialize Node.js project (TypeScript).
2.  Set up `express`, `cors`, `helmet`, `dotenv`.
3.  Configure Supabase Admin Client (Service Role Key).
4.  Set up Nodemon for dev.

### Phase 2: Database Setup
1.  Write SQL scripts for Table creation.
2.  Write SQL scripts for RLS policies.
3.  Execute generic "Seed" data for Hazards (Earthquake, Flood, etc.).

### Phase 3: Auth Middleware
1.  Create `requireAuth` middleware:
    *   Extract JWT from `Authorization` header.
    *   Verify with Supabase Auth API.
    *   Attach user to `req.user`.
2.  Create `requireRole('admin')` middleware.

### Phase 4: Core Logic Implementation
1.  **Hazards/Modules**: CRUD endpoints. Use Zod to validate input JSON content.
2.  **Quiz Logic**: Endpoint to calculate score securely on backend (prevents cheating).
3.  **Alerts System**:
    *   POST `/alerts`: Validate admin rights -> Insert into DB.
    *   (Supabase Realtime will handle the push to frontend).

### Phase 5: Security & Optimization
1.  Rate Limiting (`express-rate-limit`).
2.  Input sanitization.
3.  Error Handling middleware (Global try-catch wrapper).

## 7. Deployment (Render)
1.  Create `render.yaml` for infrastructure as code.
2.  Set Environment Variables in Render Dashboard (`SUPABASE_URL`, `SERVICE_KEY`).
3.  Configure Health Check endpoint (`/health`).

## 8. Dev Milestones
*   **Day 1**: Server boilerplate, Supabase connection, Auth Middleware.
*   **Day 2**: DB Schema finalization, Seeding data.
*   **Day 3**: Education API (Modules, Quizzes).
*   **Day 4**: Alerts API & Admin controls.
*   **Day 5**: Testing, Documentation (Swagger/OpenAPI), Deployment.
