# Features

## Civil Servant Workspace

### 1. Kanban Dashboard
- Visualizes all active dossiers across different institutional phases.
- Live-updates via Supabase Realtime when another institution moves a dossier.
- Top-level statistical widgets (Total, Active, Blocked, Due this Week).

### 2. Multi-Step Dossier Creation & OCR
- Civil servants can drag and drop physical application forms or property certificates.
- The OCR pipeline extracts raw Albanian text.
- The `ai-extract` Edge Function structures the data into fields (Owner Name, Address, ID) to pre-fill the form, showing a confidence score for each field to ensure human-in-the-loop validation.

### 3. Dossier Details & AI Assistant
- **AI Summary:** Auto-generates a rapid status report of complex, multi-document dossiers.
- **Next Step Prediction:** Clearly highlights the exact action required (e.g., "Mungon Harta Topografike").
- **RAG Chatbot:** Ask questions like "Cili është afati ligjor për vlerësimin teknik?", and the bot answers strictly based on indexed `knowledge_chunks`.
- **Letter Generation:** 1-click generation of official approval, rejection, or notification letters tailored to the dossier context.

### 4. Alert Management System
- Automatically monitors dossier age and phase duration limits.
- Generates categorized alerts (Critical, High, Medium).
- E.g., "Dosja e bllokuar për më shumë se 30 ditë."

## Citizen Tracking Portal

### 1. Anonymous Read-Only Tracking
- Located at `/track/[tracking_code]`.
- Citizens enter their unique 13-character tracking code (e.g., `EXP-2024-0001`).
- Displays a sanitized progress bar and human-readable Albanian status text.
- Hides all sensitive internal documents and civil servant comments to ensure privacy.
