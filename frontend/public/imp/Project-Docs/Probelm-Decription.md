“AlertWise – Disaster Readiness & Response”

Detailed feature breakdown
1. User roles and journeys
Citizen/Student: Learn about disasters, take quizzes, view alerts, see local contacts, track preparedness score.

Trainer/Teacher: Assign modules, monitor group progress, schedule drills, mark drill completion.

Admin: Manage content (hazards, modules, quizzes), manage alerts, manage emergency contacts, basic analytics.

Think of 2–3 sample personas (e.g., college student in Mumbai, school teacher in Chennai) and design around them.

2. Preparedness (education) module
Core flows:

Hazard catalog:

Cards for Earthquake, Flood, Cyclone, Fire, Heatwave, etc.

Click → see: “Before, During, After” sections + do/don’t do + visuals.

Learning modules:

Short, focused lessons (5–10 minutes), not huge articles.

Each module tied to a hazard and difficulty level (basic, intermediate).

Content stored as Markdown/JSON and rendered in React.

Quizzes:

MCQs with explanations for correct/incorrect answers.

Time limit optional; show score + explanation at the end.

Store results per user with timestamps.

UX details that help in hackathons:

Progress bar within a module.

“You’re 70% prepared for Earthquakes” based on quiz average.

Badge popups when a user hits milestones.

3. Response (during/after disaster) module
Core flows:

Region selection:

Capture region (state/city) at signup or via first-time wizard.

Use that to filter alerts and emergency contacts.

Live alerts:

List of active alerts with severity tags (Info, Warning, Critical).

Clicking an alert shows:

Short description.

Recommended immediate actions.

When it was issued, who issued it.

One-tap emergency actions:

Cards like “Call Fire Brigade”, “Call Ambulance”, “Helpline”.

Direct tel: links on web/mobile.

Quick checklist:

For each hazard, 5–7 bullet points for “Do this now” and “Avoid this”.

This gives a clear “during disaster” use case beyond just education.

4. Analytics and dashboards
For admins:

Cards like:

Total users.

Average preparedness score by hazard.

Most completed modules.

Simple charts (even static) help you look serious:

Bar: Users per hazard completion.

Line: Alerts created over time.

For trainers:

Class/group view:

List of students with their module completions and scores.

Filter by hazard or date range.

5. Tech depth (what to highlight)
On frontend (React):

Protected routes for logged-in users.

Role-based rendering (show admin menu items only for admins).

Global state for auth/user using Context or Zustand/Redux.

Custom hooks:

useAlerts(region), useModules(hazardId), etc.

On backend (Node/Express):

Clean separation:

routes, controllers, services (Supabase queries).

Auth middleware verifying tokens from Supabase.

Input validation on every POST/PUT.

Consistent response shape { success, data, error }.

On Supabase:

Auth (email/password).

Row Level Security for:

Users only reading/writing their own quiz attempts.

Good schema with indexes on region, hazard_id, etc.

6. Demo story (for judges)
Narrative you can use in your pitch:

“Imagine a college in a flood-prone area. Students rarely get structured training.”

Show:

Student logs in, selects “Floods”, finishes a short interactive module.

Takes a quiz, gets feedback, sees preparedness score improve.

Trainer dashboard shows which students haven’t completed the module.

Admin issues a test alert for a planned flood drill.

Students receive the alert and see step-by-step actions and emergency contacts.

Mention that the same platform can be scaled to other regions and integrated with real government APIs in the future.