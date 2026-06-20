# Smart Dossier

Smart Dossier is an AI-powered property procedure management platform designed for Albanian civil servants. It streamlines and automates property-related processes like "Shpronësimi i Pronës" (Property Expropriation) and "Privatizimi EKB" (EKB Privatization).

## Documentation Index

Please refer to the following documentation files for deep dives into specific topics:

1. [Project Overview](docs/project_overview.md) - A high-level look at the project's goals, target users, and capabilities.
2. [System Architecture](docs/system_architecture.md) - Details on the tech stack, database schema, OCR pipeline, and Edge Functions.
3. [Features](docs/features.md) - A breakdown of all the core functionalities available to civil servants and citizens.
4. [Implementation Plan](docs/implementation_plan.md) - The step-by-step agentic execution plan used to build the platform.
5. [Tasks & Deliverables](docs/tasks.md) - The checklist of all completed development milestones.

## Getting Started

### Prerequisites
- Node.js 18+
- Docker (for PaddleOCR fallback)
- Supabase CLI

### Setup
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   GEMINI_API_KEY=your_gemini_api_key
   NEXT_PUBLIC_PADDLE_OCR_URL=http://localhost:8001
   ```

3. Setup local database and edge functions:
   ```bash
   supabase init
   supabase start
   supabase db push
   ```

4. Start the frontend:
   ```bash
   npm run dev
   ```
