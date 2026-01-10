# Project Name
AlertWise – Disaster Readiness & Response

# Problem Statement
Communities in disaster-prone areas frequently lack access to structured, engaging disaster preparedness training. Furthermore, during actual emergencies, critical information like immediate action checklists and local emergency contacts is often scattered or hard to access, leading to panic and ineffective response. There is a need for a unified platform that bridges the gap between educational preparedness and real-time emergency coordinate.

# Project Description
AlertWise is a dual-purpose platform designed to transform disaster management through education and rapid response. It functions in two main modes:
1.  **Preparedness (Education)**: A gamified learning hub where users (students, citizens) can study hazard-specific modules, take quizzes, and track their preparedness scores.
2.  **Response (Action)**: A critical utility tool providing real-time alerts, emergency contact directories, and step-by-step safety checklists tailored to the user's region.

# Solution
The solution provides a robust web application featuring:
*   **Role-Based Access**: Specialized interfaces for Citizens/Students (learners), Trainers/Teachers (group managers), and Admins (content/system managers).
*   **Interactive Learning**: Micro-learning modules for hazards like Floods, Earthquakes, and Fires, backed by quizzes and progress tracking.
*   **Emergency Toolkit**: Live alert broadcasting, one-tap emergency calling, and "Do/Don't" checklists for immediate disaster response.
*   **Analytics**: Dashboards for tracking user progress and community readiness levels.

# Technology Stack
*   **MERN Stack**: (Modified to use Supabase Postgres)
*   **Supabase Auth**: Secure user management
*   **Microservices Architecture**: (Optional / Logical separation in API)

# Architecture
*   **Frontend**: React (with React Router, Tailwind/MUI)
*   **Backend**: Node.js + Express.js
*   **Database**: Supabase (PostgreSQL)
*   **Authentication**: Supabase Auth (JWT based)
*   **Real-time**: Supabase Realtime (for live alerts)
*   **Deployment**: Vercel for Frontend and Render for Backend

# Database
*   **Supabase**: Utilizing PostgreSQL for structured data (profiles, hazards, modules, quizzes, alerts) and Row Level Security (RLS) for data protection.

# Authentication
*   **Supabase Auth**: Handles secure sign-up/login (Email/Password, OTP) and session management.

# Authorization
*   **Role-based access control (RBAC)**: secure permissions ensuring:
    *   **Admins** manage global content and alerts.
    *   **Trainers** manage drills and view student progress.
    *   **Citizens/Students** access learning content and personal dashboards.

# Deployment
*   **Frontend**: Vercel
*   **Backend**: Render

# Future Work
*   **Scalability**: Expand to support multiple regions with dynamic content localization.
*   **Integration**: Connect with real government APIs for official alert synchronization.
*   **Advanced Analytics**: Deep dive metrics for regional preparedness to aid policy decisions.
*   **Native Mobile Apps**: Wrapper or native builds for better offline access during disasters.
