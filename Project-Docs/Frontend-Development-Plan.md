# Frontend Development Plan: AlertWise

This document outlines the detailed plan for building the frontend of **AlertWise – Disaster Readiness & Response**. The goal is to create a high-performance, visually stunning, and responsive web application using the MERN stack (React focus) managed with Vite.

## 1. Technology Stack & Tools

*   **Framework**: React (Vite) - Fast, modern build tool.
*   **Language**: TypeScript - For type safety and better developer experience.
*   **Styling**: Tailwind CSS - Utility-first CSS for rapid design.
*   **UI Components**: Headless UI / Radix UI (for accessibility) + Custom tailored components for the "Premium" look.
*   **Icons**: Lucide React - Clean, consistent iconography.
*   **State Management**: Zustand (lightweight, easy for global state) + React Context (for Auth).
*   **Routing**: React Router DOM (v6+).
*   **Data Fetching**: TanStack Query (React Query) - For server state management, caching, and loading states.
*   **Animations**: Framer Motion - For smooth page transitions and micro-interactions.
*   **Forms**: React Hook Form + Zod (Validation).
*   **Notifications**: Sonner (Toast notifications).
*   **Maps**: Leaflet / React Leaflet (for visual alerts monitoring).

## 2. Design System & Aesthetics (Premium Quality)

*   **Design Philosophy**: "Clean, Urgent, & Empowering".
    *   **Colors**:
        *   Primary: `Safety Orange` (#FF5A1F) or `Alert Red` (#E63946) for critical actions.
        *   Secondary: `Deep Navy` (#1D3557) for trust and stability.
        *   Backgrounds: `Off-white` (#F8FAFC) for light mode, `Charcoal` (#0F172A) for dark mode.
        *   Accents: Soft gradients and glassmorphism effects for cards/modals.
    *   **Typography**: `Inter` or `Plus Jakarta Sans` for clean, modern readability.
*   **Components**:
    *   **Glass Containers**: Translucent backgrounds with blur for alert cards.
    *   **Micro-animations**: Hover states on buttons, smooth drawer openings, progress bars filling up.
    *   **Responsive**: Mobile-first design is critical for emergency scenarios.

## 3. Directory Structure

```text
src/
├── assets/             # Static assets (images, fonts)
├── components/         # Reusable UI components
│   ├── common/         # Buttons, Inputs, Cards, Modals
│   ├── layout/         # Navbar, Sidebar, Footer, LayoutWrappers
│   └── features/       # Feature-specific components (e.g., AlertCard, QuizQuestion)
├── config/             # Configuration files (Supabase, Constants)
├── hooks/              # Custom React hooks (useAuth, useGeolocation)
├── pages/              # Page components (routed)
│   ├── public/         # Landing, Login, Register
│   ├── app/            # Dashboard, Alerts, Learn, Settings
│   └── admin/          # Admin specific panels
├── services/           # API services (Supabase calls, Backend API)
├── store/              # Zustand stores (useUserStore, useAlertStore)
├── styles/             # Global styles, Tailwind directives
├── types/              # TypeScript interfaces/types
├── utils/              # Helper functions (date formatting, validators)
└── App.tsx             # Main App component with Providers
```

## 4. Implementation Phases

### Phase 1: Project Initialization & Setup
1.  Initialize Vite project with TypeScript.
2.  Install & Configure Tailwind CSS.
3.  Set up Folder Structure.
4.  Configure ESLint & Prettier for code quality.
5.  Initialize Supabase Client (environment variables).

### Phase 2: Design System & Core Components
1.  Define color palette in `tailwind.config.ts`.
2.  Create core "Atoms":
    *   `Button` (Primary, Secondary, Ghost, Destructive).
    *   `Input` / `Label` / `FormGroup`.
    *   `Card` (Base, Glass).
    *   `Badge` (levels: Info, Warning, Critical).
3.  Implement Layouts:
    *   `PublicLayout`: Header with transparency, Footer.
    *   `AppLayout`: Sidebar navigation (collapsible), Top bar with User Profile.

### Phase 3: Authentication & Authorization
1.  Implement Supabase Auth (Sign Up, Login, Forgot Password).
2.  Create `AuthContext` to manage session state.
3.  Implement `PrivateRoute` and `RoleBasedRoute` components to protect pages.
4.  Create Login and Sign-up pages with:
    *   Form validation (Zod).
    *   Error handling (Toasts).
    *   Loading states.

### Phase 4: Core Features - "Preparedness" (Learn)
1.  **Dashboard**:
    *   User Welcome & Preparedness Score visualization (Circular progress).
    *   "Continue Learning" carousel.
2.  **Modules List**:
    *   Filterable grid of disaster modules (Flood, Fire, etc.).
    *   Progress indicators on cards.
3.  **Module Detail & Learning View**:
    *   Markdown renderer for content.
    *   Video embed support.
4.  **Quiz System**:
    *   Interactive quiz interface.
    *   Immediate feedback & score calculation.
    *   Confetti animation on pass!

### Phase 5: Core Features - "Response" (Alerts)
1.  **Alerts Feed**:
    *   Real-time subscription to `alerts` table (Supabase Realtime).
    *   Live indicators for new alerts.
2.  **Emergency Mode**:
    *   Red clear button to toggle "Emergency View" (High contrast, big buttons).
    *   **Quick Actions**: Call Ambulance, Police, Fire (tel: links).
    *   **Checklists**: Interactive checkboxes for immediate "Do's and Don'ts".

### Phase 6: Admin & Trainer Portals
1.  **Content Management**:
    *   Forms to Create/Edit Hazards and Modules.
    *   Question bank editor.
2.  **Alert Management**:
    *   Interface to broadcast new alerts (select region, severity).
3.  **Analytics Dashboard**:
    *   Charts (Recharts) showing user adoption and quiz scores.

### Phase 7: Polish & Optimization
1.  **Gamification**: Add Badge popups and "Level Up" animations.
2.  **Loading Skeletons**: Ensure smooth loading states for all data fetching.
3.  **404 & Error Pages**: Friendly error visuals.
4.  **Responsiveness Check**: Verify UI on Mobile (iPhone SE size) vs Desktop.

### Phase 8: Deployment
1.  Build optimization (split chunks).
2.  Deploy to **Vercel**.
3.  Environment variable configuration on Vercel dashboard.

## 5. Development Timeline (Estimated)

| Phase | Duration | Key Deliverables |
| :--- | :--- | :--- |
| **Setup & Design** | Day 1 | Repo setup, UI Kit, Routing |
| **Auth & Layouts** | Day 2 | Fully functional Auth, Responsive Layouts |
| **Preparedness Features** | Day 3-4 | Dashboard, Modules, Quizzes |
| **Response Features** | Day 5 | Alerts, Real-time integration, Emergency contacts |
| **Admin & Polish** | Day 6 | Admin CRUD, Animations, Final Testing |

## 6. Key Libraries Summary

*   `react-router-dom`: Routing.
*   `@tanstack/react-query`: API State.
*   `zustand`: Client State.
*   `framer-motion`: Animations.
*   `lucide-react`: Icons.
*   `react-hook-form` + `zod`: Forms.
*   `recharts`: Analytics Charts.
*   `sonner`: Notifications.
