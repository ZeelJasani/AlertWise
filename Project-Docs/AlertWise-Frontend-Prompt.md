# AlertWise Frontend Prototype Generation Prompt

This prompt is designed to generate a high-end, premium frontend prototype for **AlertWise – Disaster Readiness & Response**. Use this prompt with an advanced AI model (like GPT-4, Claude 3.5 Sonnet, or Gemini 1.5 Pro) to build the application.

---

## 🚀 The Mission

Create a world-class, premium disaster management web application called **"AlertWise"**. The design must be inspired by the official **Vercel** and **Next.js** websites—sleek, minimalist, high-performance, and "alive" with micro-animations.

## 🎨 Design System & Aesthetics

- **Theme**: Pure **Black & White** (Monochrome).
- **Features**: Toggle between **Dark Mode** (Deep obsidian, charcoal) and **Light Mode** (Paper white, soft grey).
- **Style**:
  - Use **Glassmorphism** for cards and navigation bars.
  - Implement **High-contrast** borders (1px) like Vercel's documentation.
  - Use **Inter** or **Geist** typography for a professional, technical look.
  - Add **subtle gradients** and **glow effects** behind key elements.
- **Animations**: Use **Framer Motion** for:
  - Smooth page transitions.
  - Hover effects that feel organic (scale, glow).
  - Skeleton loaders for data-fetching states.

## 🛠 Technology Stack

- **Framework**: Next.js 14+ (App Router).
- **Styling**: Tailwind CSS.
- **Components**: Radix UI / Shadcn UI (Customized for B&W theme).
- **Icons**: Lucide React.
- **State Management**: Zustand or React Context.
- **Animations**: Framer Motion.
- **Backend Ready**: Integrated with **Supabase** (Auth, DB, Realtime).

## 🧩 Key Modules & Features

### 1. Landing Page (The "Wow" Factor)

- **Hero Section**: A bold headline with a glowing gradient effect. A "Get Started" button that feels premium.
- **Feature Grid**: B&W grid layout showing "Learn", "Alert", "Respond", and "Track".

### 2. Education Hub (Theory & Articles)

- **Article Viewer**: A clean, distraction-free reading experience for disaster theory.
- **Disaster Detail**: For each disaster (Earthquake, Flood, etc.), show:
  - **Key Points**: Critical "Before, During, After" facts.
  - **Tips & Tricks**: Expert advice for survival.
- **Universal Safety**: A dedicated section for "Survival 101" tips that apply to all disasters.

### 3. Interactive Quiz System

- **Quiz Interface**: Minimalist multi-step forms with progress bars.
- **Immediate Feedback**: Correct/Incorrect animations.
- **Results Dashboard**: A premium score breakdown with circular progress bars and "Preparedness Level" badges.

### 4. SOS & Geo-Location (Critical Feature)

- **Auto-Location**: Use the Geolocation API to detect coordinates on mounting.
- **SOS Trigger**: A prominent, pulsing SOS button.
- **Notification Simulation**: On trigger, show a "Connecting to Services..." animation and a toast notification saying "Alert sent to nearest emergency service".
- **Map View**: A Dark-themed map (Leaflet) showing the user's location and active alerts.

### 5. Live Alerts & Emergency Dashboard

- **Real-time Feed**: A vertical timeline of active alerts with severity tags (Info, Warning, Critical).
- **One-Tap Actions**: Quick-dial buttons for local emergency services (Ambulance, Fire, Police).

---

## 📝 Generation Instructions

"Act as a Senior Frontend Engineer. Build this prototype using Next.js. **CRITICAL CONSTRAINT: Use custom Tailwind classes for ALL styling in every single file. Do NOT create or use a `globals.css` file.** All design tokens (colors, spacing, etc.) should be handled via the `tailwind.config.ts` or as inline utility classes. Start by building the `Layout.tsx` with a Vercel-style Navbar and Footer using these inline styles. Implement the Home page with a high-impact Hero. Create the `/learn` route for articles and the `/quiz` route for the interactive module. For the SOS feature, mock the backend call but ensure the UI feels urgent and technical. Use `framer-motion` for every entrance animation to give it that premium 'Next.js Official' feel."
