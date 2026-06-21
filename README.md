# Sovereign Tier

Sovereign Tier is a high-fidelity, secure executive dashboard designed for "Project Sovereign." It provides high-stakes, real-time analytics, geospatial topography intelligence, dossier management, and direct regulatory tracking.

## Architecture
The repository consists of:
- **`frontend/`**: A Next.js (React) front-end leveraging Tailwind CSS for precise, glassmorphism-inspired UI designs.
- **`backend/`**: A modular Python backend designed for Dockerized deployments, housing services such as an `ai-orchestrator` and `dossier-service`.

## Features
- **Executive Analytics Intelligence**: Real-time tracking of asset portfolios, risk scoring, and global compliance tracking.
- **Directives & Compliance Modules**: Dedicated interfaces for Sovereign Mandates, Executive Transers, and Regulatory Audits.
- **AI Dossier Analyst**: Integrated Gemini AI chatbot for querying active dossiers and legal frameworks.
- **Geospatial Topography**: Interactive UI components utilizing Three.js and custom CSS shaders for displaying mapped intelligence.

## Getting Started

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the Sovereign Tier interface.

### Backend Infrastructure
Backend services can be spun up using Docker:
```bash
docker-compose up --build
```
Ensure a `.env` file is present in the root directory providing necessary API keys (such as `GOOGLE_API_KEY`).
