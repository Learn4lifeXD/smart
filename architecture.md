# Architecture

# Smart Dossier — Production Architecture (100% Open Source)

---

## Executive Summary

A cloud-native, AI-augmented property dossier management platform built exclusively on open-source software. No vendor lock-in, no SaaS dependencies, no licensing costs. Deployable on any cloud provider or on-premise Albanian government infrastructure. Every component can be self-hosted, audited, and modified.

---

## Open Source Stack — Master Reference

| Layer | Tool | License | Replaces |
|---|---|---|---|
| Frontend framework | Next.js | MIT | — |
| UI components | shadcn/ui + Tailwind CSS | MIT | — |
| API Gateway | Traefik | MIT | Kong EE, AWS API GW |
| Backend | FastAPI (Python) | MIT | — |
| AI Orchestration | LangChain + LangGraph | MIT | — |
| LLM (local) | Ollama + Llama 3.1 / Mistral | MIT / Apache 2 | OpenAI, Anthropic |
| LLM (alt) | vLLM inference server | Apache 2.0 | OpenAI API |
| Embeddings | nomic-embed-text via Ollama | Apache 2.0 | OpenAI embeddings |
| OCR | Tesseract + pdf2image | Apache 2.0 | AWS Textract |
| Document parsing | Unstructured.io (OSS) | Apache 2.0 | Azure Form Recognizer |
| Vector DB | Weaviate | BSD 3-Clause | Pinecone |
| Primary DB | PostgreSQL 16 | PostgreSQL License | RDS, Cloud SQL |
| Cache | Redis 7 (Valkey fork) | BSD 3-Clause | ElastiCache |
| Object storage | MinIO | AGPL v3 | AWS S3 |
| Message bus | Apache Kafka (via Redpanda) | BSL / Apache 2 | AWS MSK, Confluent |
| Search | Meilisearch | MIT | Elasticsearch (Elastic License) |
| Container orchestration | Kubernetes (K3s / K8s) | Apache 2.0 | EKS, GKE |
| Service mesh | Cilium | Apache 2.0 | Istio |
| Secrets management | OpenBao (Vault fork) | MPL 2.0 | HashiCorp Vault |
| CI/CD | Gitea + Woodpecker CI | MIT | GitHub Actions |
| Container registry | Gitea Packages | MIT | ECR, GHCR |
| Metrics | Prometheus + Grafana | Apache 2.0 | Datadog, CloudWatch |
| Logging | Grafana Loki + Promtail | AGPL v3 | ELK (Elastic License) |
| Tracing | Tempo + OpenTelemetry | Apache 2.0 | Jaeger (CNCF) |
| Alerting | Grafana Alerting + Alertmanager | Apache 2.0 | PagerDuty |
| IaC | OpenTofu (Terraform fork) | MPL 2.0 | HashiCorp Terraform |
| Helm charts | Helm | Apache 2.0 | — |
| DB migrations | Flyway Community | Apache 2.0 | — |
| Connection pooling | PgBouncer | ISC License | — |
| PDF generation | WeasyPrint | BSD 3-Clause | Puppeteer (Chrome dep) |
| Email | Postal | MIT | SendGrid, SES |
| Auth | Keycloak | Apache 2.0 | Auth0, Okta |

---

## High-Level System Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER                                │
│                                                                      │
│   ┌──────────────────────────┐    ┌──────────────────────────────┐  │
│   │  Civil Servant Web App   │    │   Citizen Tracking PWA       │  │
│   │  Next.js 14 (App Router) │    │   Next.js 14 (PWA / offline) │  │
│   │  shadcn/ui + Tailwind    │    │   Read-only, no AI exposed   │  │
│   └────────────┬─────────────┘    └──────────────┬───────────────┘  │
└────────────────┼──────────────────────────────────┼──────────────────┘
                 │                                  │
                 ▼                                  ▼
┌──────────────────────────────────────────────────────────────────────┐
│                      API GATEWAY — Traefik v3                        │
│                                                                      │
│  TLS Termination · JWT Middleware · Rate Limiting (plugin)           │
│  Request Routing · Load Balancing · Health Checks · Access Logs      │
│  Keycloak OIDC Integration · CORS · API Versioning (/api/v1/)        │
└──────────────────────────────┬───────────────────────────────────────┘
                               │
          ┌────────────────────┼─────────────────────┐
          ▼                    ▼                     ▼
┌──────────────────────────────────────────────────────────────────────┐
│                      MICROSERVICES LAYER                             │
│              (FastAPI per service, containerized)                    │
│                                                                      │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌───────────┐  │
│  │   Dossier    │ │   Workflow   │ │   Document   │ │  Notif.   │  │
│  │   Service    │ │   Engine     │ │   Service    │ │  Service  │  │
│  └──────────────┘ └──────────────┘ └──────────────┘ └───────────┘  │
│                                                                      │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌───────────┐  │
│  │   User &     │ │   Audit &    │ │  Letter/Doc  │ │ Dashboard │  │
│  │   Role Svc   │ │   Log Svc    │ │   Gen Svc    │ │ Analytics │  │
│  └──────────────┘ └──────────────┘ └──────────────┘ └───────────┘  │
└──────────────────────────────┬───────────────────────────────────────┘
                               │
┌──────────────────────────────▼───────────────────────────────────────┐
│                     AI / ML PLATFORM LAYER                           │
│                                                                      │
│  ┌──────────────────────┐  ┌──────────────────┐  ┌───────────────┐  │
│  │   AI Orchestrator    │  │   RAG Engine     │  │  LLM Server   │  │
│  │   LangChain +        │  │   LangChain +    │  │  Ollama       │  │
│  │   LangGraph          │  │   Weaviate       │  │  (Llama 3.1 / │  │
│  └──────────────────────┘  └──────────────────┘  │   Mistral)    │  │
│                                                   └───────────────┘  │
│  ┌──────────────────────┐  ┌──────────────────┐                     │
│  │  Document Extraction │  │  Vector Store    │                     │
│  │  Tesseract + Unstruct│  │  Weaviate OSS    │                     │
│  │  + LLM structured    │  │  (self-hosted)   │                     │
│  │    output            │  │                  │                     │
│  └──────────────────────┘  └──────────────────┘                     │
└──────────────────────────────┬───────────────────────────────────────┘
                               │
┌──────────────────────────────▼───────────────────────────────────────┐
│                      MESSAGE BUS LAYER                               │
│                   Redpanda (Kafka-compatible)                        │
│                                                                      │
│  Topics: dossier.created · dossier.phase-changed                    │
│          document.uploaded · ai.extraction-complete                 │
│          notification.send · audit.event · ai.alert                 │
└──────────────────────────────┬───────────────────────────────────────┘
                               │
┌──────────────────────────────▼───────────────────────────────────────┐
│                         DATA LAYER                                   │
│                                                                      │
│  ┌───────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────┐  │
│  │  PostgreSQL   │ │    MinIO     │ │  Valkey      │ │Weaviate  │  │
│  │  16           │ │  (S3-compat) │ │  (Redis OSS) │ │(vectors) │  │
│  │  + PgBouncer  │ │              │ │              │ │          │  │
│  └───────────────┘ └──────────────┘ └──────────────┘ └──────────┘  │
│                                                                      │
│  ┌───────────────┐                                                   │
│  │  Meilisearch  │                                                   │
│  │  (full-text   │                                                   │
│  │   search)     │                                                   │
│  └───────────────┘                                                   │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Component Deep-Dives

---

### 1. Client Layer

#### 1.1 Civil Servant Web App

```
┌──────────────────────────────────────────────────────────┐
│               Civil Servant Dashboard                    │
│               Next.js 14 — App Router                    │
│                                                          │
│  ┌──────────────────┐  ┌─────────────────────────────┐  │
│  │  Dossier Board   │  │   AI Assistant Side Panel   │  │
│  │                  │  │                             │  │
│  │  Kanban by phase │  │  • Dossier summary          │  │
│  │  OR Table view   │  │  • Next step suggestion     │  │
│  │                  │  │  • Missing document alerts  │  │
│  │  Filter by:      │  │  • Critical point warnings  │  │
│  │  - Institution   │  │  • RAG process Q&A          │  │
│  │  - Process type  │  │                             │  │
│  │  - Phase         │  │  Source citations shown     │  │
│  │  - Urgency       │  │  for every AI answer        │  │
│  └──────────────────┘  └─────────────────────────────┘  │
│                                                          │
│  ┌──────────────────┐  ┌─────────────────────────────┐  │
│  │  Document Upload │  │  Phase Timeline             │  │
│  │                  │  │                             │  │
│  │  Drag-and-drop   │  │  Visual stepper per         │  │
│  │  Chunked upload  │  │  process diagram            │  │
│  │  OCR progress    │  │  Institution per step       │  │
│  │  Field review UI │  │  Legal basis tooltip        │  │
│  └──────────────────┘  └─────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Global Dashboard: Blocked / Deadlines / Alerts  │   │
│  └──────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘

Technology:
  Framework     : Next.js 14 (App Router, RSC)
  UI            : shadcn/ui + Tailwind CSS + Radix UI
  State         : Zustand (client) + TanStack Query (server)
  Forms         : React Hook Form + Zod validation
  Charts        : Apache ECharts (OSS, MIT)
  Real-time     : native WebSocket (ws library)
  File upload   : Uppy (OSS, MIT) — resumable chunked upload
  Dates         : date-fns (MIT)
  i18n          : next-intl (MIT) — Albanian + English
```

#### 1.2 Citizen Tracking PWA

```
Technology:
  Same Next.js 14 codebase, separate route group /citizen
  Access method : unique reference code (no login required)
  Features      : dossier status, phase history, estimated timeline
  Offline       : service worker via next-pwa (MIT)
  Mobile-first  : Tailwind responsive, installable on phone
  No AI exposed : cost boundary + no citizen-facing AI needed
```

---

### 2. API Gateway — Traefik v3

```
┌───────────────────────────────────────────────────────────┐
│                    Traefik v3                             │
│                                                           │
│  EntryPoints:                                             │
│    :443 (HTTPS) → TLS via cert-manager + Let's Encrypt   │
│    :80  (HTTP)  → permanent redirect to HTTPS            │
│                                                           │
│  Middlewares (applied in order):                          │
│  ┌──────────────────────────────────────────────────┐    │
│  │ 1. Rate Limiter                                  │    │
│  │    - /api/v1/ai/*  : 20 req/min per user         │    │
│  │    - /api/v1/*     : 200 req/min per user        │    │
│  │    - /citizen/*    : 60 req/min per IP           │    │
│  ├──────────────────────────────────────────────────┤    │
│  │ 2. Keycloak ForwardAuth Middleware               │    │
│  │    - Validates JWT Bearer token                  │    │
│  │    - Citizen routes: reference-code header only  │    │
│  ├──────────────────────────────────────────────────┤    │
│  │ 3. CORS Headers                                  │    │
│  │    - Strict origin allowlist                     │    │
│  ├──────────────────────────────────────────────────┤    │
│  │ 4. Request Logging (structured JSON → Loki)      │    │
│  ├──────────────────────────────────────────────────┤    │
│  │ 5. Compress (gzip / brotli)                      │    │
│  └──────────────────────────────────────────────────┘    │
│                                                           │
│  Routing table:                                           │
│  /api/v1/dossiers/*   → dossier-service:8001            │
│  /api/v1/workflow/*   → workflow-service:8002            │
│  /api/v1/documents/*  → document-service:8003            │
│  /api/v1/ai/*         → ai-orchestrator:8004            │
│  /api/v1/notify/*     → notification-service:8005       │
│  /api/v1/users/*      → user-service:8006               │
│  /api/v1/audit/*      → audit-service:8007              │
│  /api/v1/letters/*    → letter-service:8008             │
│  /api/v1/analytics/*  → dashboard-service:8009          │
│  /api/v1/search/*     → meilisearch:7700 (proxied)      │
│  /citizen/*           → Next.js citizen routes          │
└───────────────────────────────────────────────────────────┘

Health checks:
  Traefik pings /health on each service every 10s
  Unhealthy replicas removed from load balancer automatically

Config format: YAML (declarative, Git-tracked)
Dashboard: Traefik OSS dashboard on internal port only
```

---

### 3. Identity & Auth — Keycloak

```
┌────────────────────────────────────────────────────────┐
│                      Keycloak                          │
│                  (Apache 2.0 License)                  │
│                                                        │
│  Realm: smart-dossier                                  │
│                                                        │
│  Clients:                                              │
│    civil-servant-web   → confidential OIDC client      │
│    citizen-pwa         → public OIDC client (PKCE)     │
│    service-accounts    → M2M (client credentials)      │
│                                                        │
│  Roles (realm-level):                                  │
│    CIVIL_SERVANT   → dossier management own institution│
│    SUPERVISOR      → read all + approve transitions    │
│    ADMIN           → user + config management          │
│    CITIZEN         → reference-code based, no login    │
│                                                        │
│  Token config:                                         │
│    Access token TTL  : 1 hour (JWT RS256)              │
│    Refresh token TTL : 24 hours (rotated on use)       │
│    Claims included   : user_id, role, institution_id   │
│                                                        │
│  Login flow:                                           │
│    Civil servants → username/password (internal DB)    │
│    Future option  → SAML federation with govt IdP      │
│                                                        │
│  Admin UI: Keycloak web console (internal only)        │
└────────────────────────────────────────────────────────┘
```

---

### 4. Microservices Layer

All services follow the same internal structure:

```
service/
├── main.py              # FastAPI app + lifespan events
├── routers/             # Route handlers grouped by resource
├── models/              # SQLAlchemy ORM models
├── schemas/             # Pydantic v2 request/response schemas
├── services/            # Business logic layer
├── repositories/        # DB access layer (no SQL in routes)
├── events/              # Kafka producer/consumer
├── migrations/          # Flyway SQL migration files
├── tests/               # pytest unit + integration tests
└── Dockerfile
```

Each service owns its own PostgreSQL database (separate DB, same cluster).
Services never share a database or query each other's tables directly.

---

#### 4.1 Dossier Service — Port 8001

```
Core responsibility:
  Lifecycle management of every property dossier

Data model:

  Dossier
  ├── id                  UUID primary key
  ├── reference_code      string (human-readable, e.g. EXP-2026-00142)
  ├── process_type        enum: EXPROPRIATION | EKB_PRIVATIZATION
  ├── current_phase_id    FK → Phase
  ├── citizen_name        string (encrypted at column level)
  ├── citizen_id_number   string (encrypted at column level)
  ├── property_id         string
  ├── property_address    string
  ├── assigned_to_user_id UUID
  ├── institution_id      UUID
  ├── status              enum: ACTIVE | BLOCKED | COMPLETED | ARCHIVED
  ├── deadline            date
  ├── created_at          timestamptz
  ├── updated_at          timestamptz
  └── metadata            JSONB (flexible extra fields)

  PhaseHistory
  ├── id                  UUID
  ├── dossier_id          UUID
  ├── phase_name          string
  ├── institution         string
  ├── legal_basis         string
  ├── entered_at          timestamptz
  ├── exited_at           timestamptz (null if current)
  ├── duration_days       integer (computed)
  ├── notes               text
  └── completed_by_user   UUID

REST API:
  GET    /api/v1/dossiers                   list + filter + paginate
  POST   /api/v1/dossiers                   create
  GET    /api/v1/dossiers/:id               detail + phase history
  PATCH  /api/v1/dossiers/:id               update metadata
  POST   /api/v1/dossiers/:id/advance-phase advance to next phase
  GET    /api/v1/dossiers/:id/timeline      phase timeline for UI
  GET    /api/v1/dossiers/:id/documents     documents linked to dossier
  DELETE /api/v1/dossiers/:id               soft delete (ADMIN only)

Events emitted to Redpanda:
  dossier.created         → payload: dossier_id, process_type
  dossier.phase-changed   → payload: dossier_id, from_phase, to_phase
  dossier.deadline-approaching → payload: dossier_id, days_remaining
  dossier.blocked         → payload: dossier_id, blocked_in_phase

Phase advance logic:
  1. Call Workflow Engine to validate transition is legal
  2. If valid: write new PhaseHistory record, update current_phase_id
  3. Emit dossier.phase-changed
  4. Return updated dossier
  5. If invalid: return 422 with explanation
```

---

#### 4.2 Workflow Engine Service — Port 8002

```
Core responsibility:
  Encode the two real Albanian property process diagrams
  as executable state machines. This is the authoritative
  source of what is and is not allowed.

Process definitions stored in:
  - YAML files (version-controlled in Git)
  - Loaded into PostgreSQL at startup
  - Hot-reloadable without redeployment (admin trigger)

Process definition schema (YAML):
  process_type: EXPROPRIATION
  version: "1.0"
  phases:
    - id: phase_01_identification
      name: "Property Identification"
      institution: "ALUIZNI"
      legal_basis: "Law No. 8561, Article 4"
      required_documents:
        - "Property registration certificate"
        - "Land registry extract"
      allowed_next_phases:
        - phase_02_commission_formation
      max_duration_days: 30
      is_critical_point: false
      notes: "Institution must verify coordinates"

    - id: phase_02_commission_formation
      name: "Expropriation Commission Formation"
      institution: "Ministry of Infrastructure"
      legal_basis: "Law No. 8561, Article 7"
      required_documents:
        - "Commission formation order"
      allowed_next_phases:
        - phase_03_valuation
      max_duration_days: 15
      is_critical_point: true
      notes: "Known bottleneck — commission quorum issues"
  # ... all phases ...

REST API:
  GET  /api/v1/workflow/processes              list all processes
  GET  /api/v1/workflow/:process_type          full process definition
  GET  /api/v1/workflow/:process_type/phases   all phases
  GET  /api/v1/workflow/:process_type/phase/:id single phase detail
  POST /api/v1/workflow/validate-transition    is this legal?
  GET  /api/v1/workflow/:process_type/critical-points
  POST /api/v1/workflow/reload                 reload from YAML (ADMIN)

validate-transition payload:
  { dossier_id, from_phase, to_phase, documents_present: [] }

validate-transition response:
  {
    valid: true | false,
    reason: "Missing required document: Commission formation order",
    missing_documents: ["Commission formation order"],
    legal_basis: "Law No. 8561, Article 7"
  }
```

---

#### 4.3 Document Service — Port 8003

```
Core responsibility:
  File storage, metadata management, AI extraction trigger

Upload flow (presigned URL pattern):
  1. Client POST /documents/upload-url  → gets presigned MinIO URL
  2. Client uploads directly to MinIO (no data through app server)
  3. Client POST /documents/confirm     → service records metadata
  4. Service emits document.uploaded to Redpanda
  5. AI Extraction Pipeline consumes async (client is not waiting)
  6. Extraction complete → document.extraction-complete emitted
  7. WebSocket pushes update to civil servant browser

Data model:

  Document
  ├── id                UUID
  ├── dossier_id        UUID
  ├── phase_id          string
  ├── filename          string
  ├── original_filename string
  ├── mime_type         string
  ├── storage_bucket    string
  ├── storage_key       string (path in MinIO)
  ├── size_bytes        bigint
  ├── checksum_sha256   string
  ├── uploaded_by       UUID
  ├── uploaded_at       timestamptz
  ├── extraction_status enum: PENDING|PROCESSING|COMPLETE|FAILED|SKIPPED
  ├── extracted_fields  JSONB
  ├── ai_confidence     float (0.0–1.0 overall)
  ├── field_confidences JSONB  { field_name: confidence_score }
  ├── needs_review      boolean (true if any field confidence < 0.75)
  └── reviewed_at       timestamptz

REST API:
  POST /api/v1/documents/upload-url   request presigned URL
  POST /api/v1/documents/confirm      confirm upload, trigger extraction
  GET  /api/v1/documents/:id          metadata + extracted fields
  GET  /api/v1/documents/:id/download presigned download URL (short TTL)
  PATCH /api/v1/documents/:id/fields  human correction of extracted fields
  GET  /api/v1/documents/:id/preview  presigned URL for thumbnail
  DELETE /api/v1/documents/:id        soft delete (audit trail kept)

MinIO bucket structure:
  smart-dossier-raw/
    {institution_id}/{year}/{dossier_id}/{document_id}/{filename}

  smart-dossier-generated/
    {dossier_id}/letters/{letter_id}.pdf

  smart-dossier-thumbnails/
    {document_id}/page-{n}.webp
```

---

#### 4.4 AI Orchestrator Service — Port 8004

```
Core responsibility:
  Single entry point for all AI features.
  Routes to appropriate pipeline, manages LLM calls,
  handles caching, cost tracking, and fallbacks.

Internal pipeline registry:
  EXTRACTION    → DocumentExtractionPipeline
  SUMMARY       → DossierSummaryPipeline
  NEXT_STEP     → NextStepPipeline
  RAG_QUERY     → RAGAssistantPipeline
  ALERT_CHECK   → CriticalPointAlertPipeline
  LETTER_GEN    → LetterGenerationPipeline

REST API (called by other services and frontend):
  POST /api/v1/ai/extract/:document_id      trigger extraction
  GET  /api/v1/ai/summary/:dossier_id       get dossier summary
  GET  /api/v1/ai/next-step/:dossier_id     get next step suggestion
  POST /api/v1/ai/ask                       RAG process question
  POST /api/v1/ai/check-alerts/:dossier_id  run alert check
  POST /api/v1/ai/generate-letter           generate standard letter

Internal components:
  ┌──────────────────────────────────────────────────────┐
  │               LLM Gateway (internal)                 │
  │                                                      │
  │  Primary: Ollama (Llama 3.1 70B or Mistral 7B)      │
  │  Fallback: vLLM with quantized model                 │
  │                                                      │
  │  Routing logic:                                      │
  │  - Extraction: Mistral 7B (fast, structured output)  │
  │  - Summary: Llama 3.1 8B (good writing quality)      │
  │  - RAG: Llama 3.1 8B (reasoning quality)             │
  │  - Letter gen: Llama 3.1 70B (quality critical)      │
  │                                                      │
  │  All calls logged: model, tokens, latency, cost=0    │
  └──────────────────────────────────────────────────────┘

Caching strategy (Valkey/Redis):
  Key: ai:summary:{dossier_id}:{phase_id}  TTL: 15 min
  Key: ai:next-step:{dossier_id}:{hash}    TTL: 15 min
  Key: ai:rag:{query_hash}:{process_type}  TTL: 1 hour
  Invalidated by: dossier.phase-changed, document.extraction-complete
```

---

#### 4.5 Notification Service — Port 8005

```
Core responsibility:
  Deliver all platform notifications across channels

Kafka consumer topics:
  dossier.phase-changed         → civil servant: phase update
  dossier.deadline-approaching  → civil servant + supervisor: deadline
  document.extraction-complete  → civil servant: AI done, review fields
  ai.critical-point-detected    → supervisor: escalation
  dossier.blocked               → supervisor: blocked alert

Channels:
  IN_APP   → stored in DB, pushed via WebSocket
  EMAIL    → sent via Postal (self-hosted SMTP / mail relay)

Template engine:
  - Jinja2 templates stored in DB
  - One template per (event_type × channel × language)
  - Languages: Albanian (SQ), English (EN)
  - Editable by ADMIN without redeployment

Data model:
  NotificationTemplate
  ├── id, event_type, channel, language
  ├── subject (email), body_html (email), body_text (in-app)
  └── variables[]  (documented slot names)

  Notification
  ├── id, recipient_id, template_id, channel
  ├── payload JSONB (filled slots)
  ├── status  enum: PENDING|SENT|DELIVERED|FAILED|READ
  ├── sent_at, read_at, failed_reason
  └── retry_count

WebSocket:
  Service maintains WebSocket connections per user_id
  On new in-app notification: push JSON payload to all
  active connections for that user
  Library: websockets (Python, MIT)

Email (Postal):
  Self-hosted Postal instance
  Handles SMTP delivery, bounce tracking, delivery logs
  REST API from Notification Service to Postal
```

---

#### 4.6 User & Role Service — Port 8006

```
Core responsibility:
  User profiles, institutional assignment, Keycloak sync

Note: Authentication itself is handled by Keycloak.
This service stores application-level user data and
syncs with Keycloak via admin API.

Data model:
  User
  ├── id              UUID (matches Keycloak user ID)
  ├── name            string
  ├── email           string
  ├── role            enum: CIVIL_SERVANT|SUPERVISOR|ADMIN
  ├── institution_id  UUID
  ├── is_active       boolean
  ├── created_at      timestamptz
  └── last_seen       timestamptz

  Institution
  ├── id              UUID
  ├── name            string
  ├── name_sq         string (Albanian)
  ├── type            string
  └── responsible_phases  JSONB  { process_type: [phase_ids] }

REST API:
  GET  /api/v1/users/me          current user profile
  GET  /api/v1/users             list users (ADMIN)
  POST /api/v1/users             create user (ADMIN) → also creates in KC
  PATCH /api/v1/users/:id        update (ADMIN)
  DELETE /api/v1/users/:id       deactivate (ADMIN, soft delete)
  GET  /api/v1/institutions      list institutions
  GET  /api/v1/institutions/:id  single institution + phases
```

---

#### 4.7 Audit & Log Service — Port 8007

```
Core responsibility:
  Immutable, tamper-evident audit trail for all state changes.
  Regulatory requirement for government systems.

Kafka consumer:
  audit.event topic (all services publish here)

AuditEvent structure published by every service:
  {
    event_id:     UUID,
    timestamp:    ISO8601,
    actor_id:     UUID,
    actor_role:   string,
    actor_ip:     string,
    session_id:   string,
    service:      string,
    action:       string,  (e.g. DOSSIER_PHASE_ADVANCED)
    entity_type:  string,  (e.g. Dossier)
    entity_id:    UUID,
    before_state: {},
    after_state:  {},
    metadata:     {}
  }

Storage:
  PostgreSQL append-only table (enforced by trigger that blocks
  UPDATE and DELETE at DB level, not just application level)

  After 90 days: archived to MinIO as compressed NDJSON
  Meilisearch index updated for search

REST API (ADMIN + SUPERVISOR only):
  GET  /api/v1/audit/dossier/:id    full history of one dossier
  GET  /api/v1/audit/user/:id       all actions by one user
  GET  /api/v1/audit/search         full-text search across events
  GET  /api/v1/audit/export         CSV download for compliance
  GET  /api/v1/audit/events         paginated log with filters

Immutability enforcement (defense in depth):
  Layer 1: PostgreSQL row-level trigger: DENY UPDATE/DELETE
  Layer 2: Application-level: no UPDATE/DELETE methods in repo
  Layer 3: DB user for audit service has INSERT-only privileges
  Layer 4: Archive to MinIO is write-once (object lock enabled)
```

---

#### 4.8 Letter & Document Generation Service — Port 8008

```
Core responsibility:
  Auto-generate standard Albanian government letters and
  decisions using LLM + fixed templates → output as PDF

Letter types:
  - Expropriation notification to citizen
  - Commission formation decision
  - Compensation amount notification
  - Phase completion certificate
  - Inter-institution transfer memo

Generation flow:
  1. Civil servant clicks "Generate Letter" and picks template
  2. Service fetches: dossier data + extracted document fields
     + phase history + civil servant identity
  3. Template rendered by Jinja2 with known-safe data slots
  4. LLM fills only the "narrative summary" slot
     (LLM never generates legal article numbers or amounts)
  5. Civil servant reviews generated draft in browser
  6. Civil servant approves → PDF generated by WeasyPrint
  7. PDF stored in MinIO, linked to dossier
  8. Audit event written (who generated, when, which template)

Safety constraints (critical for government use):
  - LLM fills narrative slots only
  - Legal articles: pulled from workflow definition (not LLM)
  - Property amounts: pulled from extracted document fields (not LLM)
  - Names/IDs: pulled from dossier DB record (not LLM)
  - ALL generated letters require human review before finalization
  - Draft watermarked until approved by civil servant

REST API:
  GET  /api/v1/letters/templates            list templates
  POST /api/v1/letters/generate             generate draft
  GET  /api/v1/letters/:id/preview          HTML preview in browser
  POST /api/v1/letters/:id/approve          finalize → generate PDF
  GET  /api/v1/letters/:id/download         presigned PDF URL
  GET  /api/v1/letters/dossier/:dossier_id  all letters for dossier
```

---

#### 4.9 Dashboard & Analytics Service — Port 8009

```
Core responsibility:
  Aggregated operational intelligence for supervisors

Metrics served:
  - Dossiers per phase (count, average time in phase)
  - Blocked dossiers: in phase longer than max_duration_days
  - Phase bottleneck heatmap: which phases cause most delays
  - Documents pending AI extraction review
  - Inter-institution handoffs pending > N days
  - Process comparison: EKP vs EKB average completion times

Architecture:
  - Reads from PostgreSQL read replica (never primary)
  - Materialized views refresh every 15 minutes
  - Heavy aggregations pre-computed by pg_cron (extension)
  - Results cached in Valkey for 5 minutes

REST API:
  GET /api/v1/analytics/overview          top-level KPIs
  GET /api/v1/analytics/blocked           blocked dossier list + reasons
  GET /api/v1/analytics/deadlines         upcoming deadline list
  GET /api/v1/analytics/phase-heatmap     delay heatmap per phase
  GET /api/v1/analytics/institution-load  workload per institution
  GET /api/v1/analytics/ai-stats          extraction success rates
```

---

### 5. AI / ML Platform Layer — Full Detail

#### 5.1 LLM Infrastructure

```
┌───────────────────────────────────────────────────────────────┐
│                     Ollama Server                             │
│                   (MIT License)                               │
│                                                               │
│  Models loaded (quantized for CPU/GPU efficiency):            │
│                                                               │
│  llama3.1:8b-instruct-q4_K_M                                 │
│    Use: summaries, next-step, RAG answers                    │
│    VRAM: ~5GB   Speed: ~30 tok/s on A10G                     │
│                                                               │
│  llama3.1:70b-instruct-q4_K_M                                │
│    Use: letter generation (quality critical)                 │
│    VRAM: ~40GB  Speed: ~10 tok/s on A100                     │
│                                                               │
│  mistral:7b-instruct-v0.3-q4_K_M                             │
│    Use: structured data extraction (fast, reliable JSON)     │
│    VRAM: ~4GB   Speed: ~40 tok/s on A10G                     │
│                                                               │
│  nomic-embed-text:v1.5                                        │
│    Use: generating embeddings for RAG                        │
│    VRAM: ~1GB   Very fast inference                          │
│                                                               │
│  Ollama REST API exposed internally at port 11434             │
│  Compatible with OpenAI API format                           │
│    → LangChain ChatOllama / OllamaEmbeddings connectors      │
│                                                               │
│  Fallback strategy:                                           │
│    If Ollama GPU node unavailable → vLLM on CPU node         │
│    (slower but available — no external dependency)           │
└───────────────────────────────────────────────────────────────┘

Hardware recommendation for production:
  GPU node: 1× NVIDIA A10G (24GB VRAM) for 8B models
  GPU node: 1× NVIDIA A100 (80GB VRAM) for 70B model
  Or: 2× A10G in tensor parallel for 70B
  CPU fallback: 64GB RAM, 16 cores (quantized models run fine)
```

---

#### 5.2 Document Extraction Pipeline

```
Trigger: document.uploaded Kafka event consumed by AI Orchestrator

Full pipeline (LangGraph StateGraph):

  ┌─────────────────────────────────────────────────────────┐
  │          DocumentExtractionGraph (LangGraph)            │
  │                                                         │
  │  State: { document_id, file_path, mime_type, text,     │
  │           chunks, extracted, confidence, errors }       │
  │                                                         │
  │  Node 1: FETCH                                          │
  │    Retrieve file from MinIO to temp storage             │
  │                                                         │
  │  Node 2: PREPROCESS                                     │
  │    Detect mime type                                     │
  │    If PDF: check if text-based or scanned               │
  │    If image: route to OCR                               │
  │                                                         │
  │  Node 3: OCR (conditional)                              │
  │    Tool: Tesseract 5 via pytesseract                    │
  │    Language: Albanian (alb) + English (eng)             │
  │    DPI: 300 for accuracy                                │
  │    Fallback: pdf2image → Tesseract                      │
  │                                                         │
  │  Node 4: PARSE_STRUCTURED (conditional)                 │
  │    Tool: Unstructured.io (OSS partition_pdf)            │
  │    Extracts: tables, headers, paragraphs separately     │
  │    Preserves document structure metadata                │
  │                                                         │
  │  Node 5: CHUNK                                          │
  │    Strategy: semantic chunking by section               │
  │    Max chunk: 500 tokens with 50-token overlap          │
  │    Tag each chunk with page number, section type        │
  │                                                         │
  │  Node 6: EXTRACT                                        │
  │    LLM: Mistral 7B via Ollama                           │
  │    Method: structured output (JSON mode)                │
  │    Prompt includes: document context + target schema    │
  │                                                         │
  │    Target schema (Albanian property documents):         │
  │    {                                                    │
  │      property_id:          string | null,               │
  │      property_address:     string | null,               │
  │      property_area_m2:     number | null,               │
  │      owner_full_name:      string | null,               │
  │      owner_id_number:      string | null,               │
  │      institution_name:     string | null,               │
  │      decision_number:      string | null,               │
  │      decision_date:        date | null,                 │
  │      valuation_amount_lek: number | null,               │
  │      valuation_date:       date | null,                 │
  │      legal_references:     string[],                    │
  │      commission_members:   string[],                    │
  │      key_dates:            {label, date}[]              │
  │    }                                                    │
  │                                                         │
  │  Node 7: VALIDATE                                       │
  │    Albanian ID format: regex check                      │
  │    Property ID format: regex check                      │
  │    Dates: parse and validate (not future dates)         │
  │    Amounts: positive numbers only                       │
  │    Cross-check: does owner name appear in raw text?     │
  │                                                         │
  │  Node 8: CONFIDENCE_SCORE                               │
  │    Per-field scoring:                                   │
  │    1.0: validated + appears verbatim in text            │
  │    0.7: extracted but not exact match in text           │
  │    0.3: extracted but validation failed                 │
  │    0.0: null / not found                                │
  │                                                         │
  │    Fields below 0.75 → needs_review = true              │
  │                                                         │
  │  Node 9: EMBED_AND_STORE                                │
  │    Embed chunks via nomic-embed-text                    │
  │    Store in Weaviate DocumentChunks collection          │
  │    For future retrieval in RAG queries                  │
  │                                                         │
  │  Node 10: PERSIST                                       │
  │    Write extracted_fields + confidences to PostgreSQL   │
  │    Update extraction_status = COMPLETE                  │
  │    Emit document.extraction-complete to Redpanda        │
  │                                                         │
  │  Error handler: any node failure                        │
  │    → status = FAILED, error logged, alert emitted       │
  │    → civil servant notified to enter fields manually    │
  └─────────────────────────────────────────────────────────┘
```

---

#### 5.3 RAG — Process Assistant Pipeline

```
Purpose:
  Civil servant asks "What documents do I need for phase 3?"
  System answers from the real process diagrams — never invents.

Knowledge base construction (one-time setup + on update):

  Source documents:
    ├── Expropriation process diagram (provided by I4AL)
    ├── EKB Privatization process diagram (provided by I4AL)
    ├── Referenced Albanian laws (scraped/provided as PDF)
    └── Phase descriptions + institution responsibilities

  Ingestion pipeline:
    1. Parse each source (PDF/DOCX → Unstructured.io)
    2. Split by semantic sections (per phase, per article)
    3. Embed each chunk via nomic-embed-text (Ollama)
    4. Store in Weaviate ProcessKnowledge collection:
       {
         text, embedding,
         source_document, process_type,
         phase_id, institution, legal_ref,
         chunk_index, language
       }

Query pipeline (LangGraph):

  User question: "Sa ditë ka institucioni për të kthyer përgjigje?"
  (How many days does the institution have to respond?)
       │
       ▼
  ┌──────────────────────────────────────────────────────┐
  │  Step 1: Query Translation (if needed)               │
  │  Detect language (Albanian/English)                  │
  │  Translate to English for embedding (better quality) │
  │  Keep original for response                          │
  └──────────────────────────────────────────────────────┘
       │
       ▼
  ┌──────────────────────────────────────────────────────┐
  │  Step 2: Embed Query                                 │
  │  nomic-embed-text via Ollama                         │
  │  Filter context: process_type if known               │
  └──────────────────────────────────────────────────────┘
       │
       ▼
  ┌──────────────────────────────────────────────────────┐
  │  Step 3: Retrieve                                    │
  │  Weaviate hybrid search (vector + BM25 keyword)      │
  │  Top 8 chunks returned                               │
  │  Filtered by: process_type, language                 │
  └──────────────────────────────────────────────────────┘
       │
       ▼
  ┌──────────────────────────────────────────────────────┐
  │  Step 4: Re-rank                                     │
  │  Cross-encoder re-ranking for precision              │
  │  Tool: sentence-transformers (cross-encoder/ms-marco)│
  │  Keep top 4 chunks after re-ranking                  │
  └──────────────────────────────────────────────────────┘
       │
       ▼
  ┌──────────────────────────────────────────────────────┐
  │  Step 5: Generate                                    │
  │  Model: Llama 3.1 8B via Ollama                     │
  │                                                      │
  │  System prompt:                                      │
  │  "Ti je asistent i procedurës pronësore shqiptare.  │
  │   Përgjigju VETËM duke përdorur kontekstin e dhënë. │
  │   Nëse përgjigja nuk është në kontekst, thuaj:      │
  │   'Nuk e kam këtë informacion në dokumentacionin    │
  │   e procesit.'                                       │
  │   MOS krijon hapa ose ligje që nuk janë në kontekst.│
  │   Cito gjithmonë burimin (faza, neni i ligjit)."     │
  │                                                      │
  │  Context: [top 4 re-ranked chunks with source tags] │
  │  Question: [original user question]                  │
  └──────────────────────────────────────────────────────┘
       │
       ▼
  ┌──────────────────────────────────────────────────────┐
  │  Step 6: Response + Citations                        │
  │  {                                                   │
  │    answer: "Institucioni ka 30 ditë...",             │
  │    sources: [                                        │
  │      { phase: "Faza 3 - Vlerësimi",                 │
  │        legal_ref: "Ligji Nr. 8561, Neni 12",        │
  │        excerpt: "...30 ditë kalendarike..." }        │
  │    ],                                                │
  │    confidence: "HIGH | MEDIUM | LOW",               │
  │    found_in_context: true                            │
  │  }                                                   │
  └──────────────────────────────────────────────────────┘

Guardrails:
  - found_in_context: false → refuse to answer (say so explicitly)
  - System prompt is immutable at service level (not user-editable)
  - All queries + responses logged for quality review
  - Cached in Valkey for identical queries (TTL: 1 hour)
```

---

#### 5.4 Next-Step Suggestion Pipeline

```
Trigger: dossier opened by civil servant, or phase changed

Input assembled by orchestrator:
  - current dossier state (from Dossier Service)
  - current phase definition (from Workflow Engine)
  - documents present (from Document Service)
  - phase history with durations (from Dossier Service)
  - critical points definition (from Workflow Engine)

LangGraph pipeline:

  Node 1: GATHER_CONTEXT
    Parallel fetch: dossier + workflow + documents
    Compute: days in current phase
    Compute: which required_documents are present vs. missing

  Node 2: CLASSIFY_SITUATION
    Rule-based checks (deterministic, no LLM):
    - OVERDUE: days_in_phase > max_duration_days
    - MISSING_DOCS: required_documents not all present
    - CRITICAL: is_critical_point == true
    - INTER_INSTITUTION: waiting for another institution
    - READY: all docs present, not overdue → can advance

  Node 3: GENERATE_RECOMMENDATION
    LLM: Llama 3.1 8B via Ollama
    Structured output (JSON):
    {
      next_action:         string,
      action_description:  string,
      urgency:             LOW | MEDIUM | HIGH | CRITICAL,
      missing_documents:   string[],
      legal_basis:         string,
      institution_to_contact: string | null,
      estimated_days:      number | null,
      warning_message:     string | null
    }

    LLM prompt is tightly scoped:
    - Receives only structured context (no free text)
    - Told to use ONLY the workflow rules provided
    - Cannot invent steps not in the workflow definition

  Node 4: ENRICH
    Add: link to relevant law article (from workflow DB)
    Add: historical data ("similar dossiers took X days here")
    Add: contact info for responsible institution

Output rendered in UI as:
  ┌─────────────────────────────────────────────────────┐
  │  ⚠️ Next Step (HIGH urgency)                        │
  │                                                     │
  │  Upload the Commission Formation Order              │
  │                                                     │
  │  Why: Phase 2 requires this document before         │
  │  advancing to valuation. Dossier has been in        │
  │  this phase for 18 days (limit: 15).               │
  │                                                     │
  │  Legal basis: Law No. 8561, Article 7              │
  │  Contact: Ministry of Infrastructure, Dept. X       │
  │                                                     │
  │  [Upload Document]  [Mark as Blocked]               │
  └─────────────────────────────────────────────────────┘
```

---

#### 5.5 Dossier Summary Pipeline

```
Trigger: civil servant opens a dossier detail view

Cache-first strategy:
  1. Check Valkey: ai:summary:{dossier_id}:{updated_at_hash}
  2. Cache hit → return immediately (no LLM call)
  3. Cache miss → run pipeline → cache result for 15 min

Pipeline:
  Input:
    - Dossier metadata
    - Full phase history with durations
    - Key extracted fields from all documents
    - Next-step suggestion (fetched in parallel)
    - Days since creation / days until deadline

  LLM: Llama 3.1 8B via Ollama
  Output (structured JSON, not free prose):
  {
    one_line:          string,  max 120 chars
    current_status:    string,
    phase_duration:    string,  "45 days (limit: 30)"
    risk_level:        LOW | MEDIUM | HIGH | CRITICAL,
    risk_reason:       string,
    key_missing:       string[],
    brief_history:     string,  max 3 sentences
    days_until_deadline: number | null,
    institutions_involved: string[]
  }

Rendered in UI as:
  ┌─────────────────────────────────────────────────────┐
  │  📋 AI Summary                    🔴 HIGH RISK      │
  │                                                     │
  │  Eksproprimi i pronës Nr. 123/4 për projektin       │
  │  rrugor, aktualisht në pritje të certifikatës       │
  │  së vlerësimit nga ALUIZNI.                        │
  │                                                     │
  │  Faza aktuale: Vlerësimi · 45 ditë (limit: 30)     │
  │  Afati: 12 Mars 2026 (18 ditë mbetur)              │
  │                                                     │
  │  Mungon: Certifikata e vlerësimit                  │
  │                                                     │
  │  Historia: Dosja u hap 14 Jan. Komisioni u formua  │
  │  20 Jan. Vlerësimi u kërkua 28 Jan. Pa përgjigje.  │
  │                           [Bazuar në të dhënat e dosjes] │
  └─────────────────────────────────────────────────────┘
```

---

#### 5.6 Critical Point Alert Engine

```
Runs as: Kubernetes CronJob every 60 minutes

Also triggered by: dossier.phase-changed event (immediate check)

Alert conditions evaluated per dossier:

  Rule engine (deterministic, no LLM needed here):
  ┌──────────────────────────────────────────────────────┐
  │  DEADLINE_7_DAYS                                     │
  │  deadline - today <= 7 AND status = ACTIVE           │
  │  → severity: WARNING                                 │
  ├──────────────────────────────────────────────────────┤
  │  DEADLINE_BREACH                                     │
  │  deadline < today AND status = ACTIVE                │
  │  → severity: CRITICAL                               │
  ├──────────────────────────────────────────────────────┤
  │  PHASE_OVERTIME                                      │
  │  days_in_phase > max_duration_days                   │
  │  → severity: WARNING or CRITICAL (>2× limit)        │
  ├──────────────────────────────────────────────────────┤
  │  CRITICAL_PHASE_ENTERED                              │
  │  current phase has is_critical_point = true          │
  │  → severity: INFO (proactive warning)                │
  ├──────────────────────────────────────────────────────┤
  │  MISSING_DOCS_STALE                                  │
  │  required docs missing AND no upload in > 7 days    │
  │  → severity: WARNING                                 │
  ├──────────────────────────────────────────────────────┤
  │  INTER_INSTITUTION_STALL                             │
  │  dossier waiting for other institution > 14 days     │
  │  → severity: WARNING                                 │
  └──────────────────────────────────────────────────────┘

Deduplication:
  Alert already sent for this (dossier, rule) in last 24h → skip
  Track sent alerts in Valkey with TTL

Output:
  → Emit ai.critical-point-detected to Redpanda
  → Notification Service handles delivery
  → Dashboard Service updates blocked dossier list
```

---

### 6. Message Bus — Redpanda

```
Why Redpanda over Kafka:
  - Same Kafka API (100% compatible, no client changes)
  - Single binary, no ZooKeeper dependency
  - Lower resource usage (better for self-hosted govt infra)
  - MIT/BSL license (BSL for production, Apache for dev)
  - Built-in Kafka-compatible REST API (Pandaproxy)
  - Built-in Schema Registry

┌────────────────────────────────────────────────────────────┐
│                    Redpanda Cluster                        │
│                   3-node for HA                            │
│                                                            │
│  Topics (all configured with retention and replication):   │
│                                                            │
│  dossier.created                                           │
│    Partitions: 6  Retention: 7 days  RF: 3               │
│    Consumers: ai-orchestrator, audit-service              │
│                                                            │
│  dossier.phase-changed                                     │
│    Partitions: 6  Retention: 7 days  RF: 3               │
│    Consumers: ai-orchestrator, notification-service,      │
│               audit-service, dashboard-service            │
│                                                            │
│  document.uploaded                                         │
│    Partitions: 12 Retention: 7 days  RF: 3               │
│    Consumers: ai-orchestrator                             │
│                                                            │
│  document.extraction-complete                             │
│    Partitions: 12 Retention: 3 days  RF: 3               │
│    Consumers: notification-service, dossier-service       │
│                                                            │
│  ai.critical-point-detected                               │
│    Partitions: 3  Retention: 3 days  RF: 3               │
│    Consumers: notification-service, dashboard-service     │
│                                                            │
│  notification.send                                        │
│    Partitions: 6  Retention: 1 day   RF: 3               │
│    Consumers: notification-service                        │
│                                                            │
│  audit.event                                              │
│    Partitions: 12 Retention: 30 days RF: 3               │
│    Consumers: audit-service                               │
│                                                            │
│  Consumer group guarantees:                               │
│    At-least-once delivery                                 │
│    Idempotency keys on all consumers                      │
│    Dead letter topic: {topic}.dlq for failed events       │
│    DLQ monitored → Grafana alert if messages accumulate   │
│                                                            │
│  Schema Registry:                                         │
│    All events use Avro schemas (version-controlled)       │
│    Schema evolution: backward compatible only             │
│                                                            │
│  Admin UI: Redpanda Console (OSS, included)               │
└────────────────────────────────────────────────────────────┘
```

---

### 7. Data Layer

#### 7.1 PostgreSQL 16

```
Cluster topology:
  1× Primary (writes + reads)
  1× Read Replica (analytics queries, dashboard service)
  1× Standby (failover, promoted automatically via Patroni)

Connection pooling:
  PgBouncer in front of each Postgres instance
  Mode: transaction pooling
  Pool size: 20 per service

Database-per-service (enforced):
  dossier_db          → Dossier Service
  workflow_db         → Workflow Engine
  document_db         → Document Service
  user_db             → User & Role Service
  audit_db            → Audit Service (append-only user)
  notification_db     → Notification Service
  letter_db           → Letter Gen Service
  analytics_db        → Dashboard (or read replica of dossier_db)

Migrations: Flyway Community Edition
  All SQL migrations in Git
  Applied at service startup (never manually)
  Versioned: V1__initial.sql, V2__add_extraction_fields.sql

Key PostgreSQL features used:
  JSONB              → metadata, extracted_fields, event payloads
  UUID               → all primary keys (uuid-ossp extension)
  pg_cron            → scheduled analytics aggregation
  Row-level security → institution data isolation
  pg_trgm            → trigram search fallback
  pgcrypto           → column-level encryption for PII fields

Audit DB extra constraints:
  CREATE RULE no_update_audit AS ON UPDATE TO audit_events
    DO INSTEAD NOTHING;
  CREATE RULE no_delete_audit AS ON DELETE TO audit_events
    DO INSTEAD NOTHING;
  -- DB user: audit_writer has INSERT only privilege
```

#### 7.2 Valkey (Redis OSS fork)

```
Why Valkey:
  Redis 7.4+ changed to non-OSS license (SSPL)
  Valkey is the Linux Foundation fork, Apache 2.0 license
  100% Redis API compatible, drop-in replacement

Cluster: 3-node Valkey cluster (HA)

Namespace usage:
  session:{user_id}                    TTL: 24h
  ai:summary:{dossier_id}:{hash}       TTL: 15min
  ai:next-step:{dossier_id}:{hash}     TTL: 15min
  ai:rag:{query_hash}:{process_type}   TTL: 1h
  rate-limit:{user_id}:{endpoint}      TTL: 60s (sliding window)
  lock:dossier:{dossier_id}            TTL: 30s (optimistic lock)
  alert:sent:{dossier_id}:{rule}       TTL: 24h (deduplication)
  ws:connections:{user_id}             TTL: session duration

Eviction policy: allkeys-lru
  Cache is best-effort, never source of truth
  All data also in PostgreSQL
```

#### 7.3 MinIO

```
Deployment: 4-node distributed MinIO (erasure coding)
License: AGPL v3 (self-hosted use is free)
API: S3-compatible (same as AWS S3)

Bucket structure:
  smart-dossier-raw/
    {institution_id}/{year}/{month}/{dossier_id}/{doc_id}_{filename}

  smart-dossier-generated/
    {dossier_id}/letters/{letter_id}_{timestamp}.pdf

  smart-dossier-thumbnails/
    {document_id}/page-{n}.webp

  smart-dossier-audit-archive/
    {year}/{month}/{audit_events_YYYYMMDD}.ndjson.gz

  smart-dossier-exports/
    {user_id}/{timestamp}_{export_type}.csv

Security:
  Bucket policies: service accounts with least-privilege
  Presigned URLs: max 15-minute TTL for downloads
  Presigned upload URLs: max 10-minute TTL
  Server-side encryption: AES-256 (MinIO SSE)
  Object lock on audit-archive bucket (WORM compliance)
  TLS between MinIO nodes

MinIO Console: built-in web UI for admin operations
```

#### 7.4 Weaviate

```
License: BSD 3-Clause (self-hosted)
Deployment: single node (or 3-node for HA)

Schema:

  Class: ProcessKnowledge
  ├── text             text
  ├── source_document  text
  ├── process_type     text  (EXPROPRIATION | EKB_PRIVATIZATION)
  ├── phase_id         text
  ├── phase_name       text
  ├── institution      text
  ├── legal_ref        text
  ├── chunk_index      int
  ├── language         text  (sq | en)
  └── Vectorizer: text2vec-transformers (nomic-embed-text via Ollama)

  Class: DocumentChunks
  ├── text             text
  ├── document_id      text
  ├── dossier_id       text
  ├── page_number      int
  ├── chunk_index      int
  ├── section_type     text  (paragraph | table | header)
  └── Vectorizer: text2vec-transformers

Search modes:
  Pure vector search   → semantic similarity
  BM25 keyword search  → exact term matching
  Hybrid search        → both combined (α = 0.75 default)

Weaviate modules enabled:
  text2vec-transformers   → embeddings via local model
  reranker-transformers   → cross-encoder reranking
  (both self-hosted, no external API calls)
```

#### 7.5 Meilisearch

```
License: MIT
Use: full-text search across dossiers and audit logs
     (replaces Elasticsearch which now has non-OSS license)

Indices:
  dossiers
    searchable_attributes: [reference_code, citizen_name,
                             property_id, property_address,
                             current_phase_name]
    filterable_attributes: [process_type, status, institution_id,
                             assigned_to_user_id]
    sortable_attributes: [created_at, deadline, updated_at]

  audit_events
    searchable_attributes: [action, entity_type, actor_role]
    filterable_attributes: [actor_id, entity_id, service]
    sortable_attributes: [timestamp]

Sync strategy:
  Redpanda consumer listens for dossier.created and
  dossier.phase-changed → updates Meilisearch index
  PostgreSQL is always source of truth
  Meilisearch is search projection only

Typo tolerance enabled (Albanian name variations)
```

---

### 8. Infrastructure & Deployment

#### 8.1 Kubernetes — K3s for Self-Hosted

```
Why K3s:
  Lightweight Kubernetes (Apache 2.0)
  Designed for resource-constrained / edge environments
  Single binary, runs on modest hardware
  Full K8s API compatibility
  Ideal for Albanian government on-premise deployment

Cluster topology:
  3× control plane nodes (HA)
  3× general worker nodes (microservices)
  1× GPU worker node (Ollama, AI workloads)
  1× storage node (MinIO, Weaviate, PostgreSQL)

Namespaces:
  production    → live services
  staging       → pre-prod testing
  monitoring    → Prometheus, Grafana, Loki, Tempo
  messaging     → Redpanda cluster
  data          → PostgreSQL, Valkey, MinIO, Weaviate, Meilisearch
  ai            → Ollama, AI Orchestrator, Weaviate

Per-service K8s resources:
  Deployment           2 replicas minimum
  HorizontalPodAutoscaler  CPU >70% → scale up, max 6 replicas
  PodDisruptionBudget  min 1 available during node maintenance
  Service              ClusterIP (internal only)
  ConfigMap            non-secret config
  ExternalSecret       pulls from OpenBao (Vault fork)
  NetworkPolicy        allowlist: only necessary service-to-service
  ResourceQuota        CPU/memory limits per service

Persistent storage:
  Local-path-provisioner (K3s built-in) for single node
  Longhorn (CNCF, Apache 2.0) for distributed block storage
  Used by: PostgreSQL, MinIO, Weaviate, Valkey, Redpanda

Cert-manager (Apache 2.0):
  Automatic TLS certificate provisioning
  Let's Encrypt ACME for public endpoints
  Internal CA for service mesh mTLS
```

#### 8.2 Service Mesh — Cilium

```
License: Apache 2.0
Why Cilium over Istio:
  eBPF-based (kernel level, lower overhead)
  Apache 2.0 (Istio has some non-OSS adjacent complexity)
  Built-in network policy enforcement
  Better performance, simpler operational model

Features used:
  mTLS between all services (identity-based)
  Network policies (allowlist pod-to-pod communication)
  Hubble UI: built-in network observability
  Envoy proxy for L7 load balancing
  No sidecar injection overhead (eBPF at kernel level)
```

#### 8.3 CI/CD Pipeline — Gitea + Woodpecker CI

```
Why Gitea + Woodpecker:
  Both MIT license
  Self-hosted (code never leaves government infrastructure)
  GitHub/GitLab compatible API (easy migration)
  Woodpecker is native for Gitea

Git hosting: Gitea
  Repository per service + monorepo option
  Branch protection rules
  PR review requirements (2 approvals for main)
  Webhook triggers Woodpecker CI

Container registry: Gitea Packages
  Built-in OCI-compatible registry
  Images stay on-premise

Woodpecker CI pipeline per service:

  trigger: push to any branch
  ┌──────────────────────────────────────────────┐
  │  Stage 1: Validate                           │
  │  ├── Python lint: ruff + mypy                │
  │  ├── JS lint: ESLint + TypeScript check      │
  │  └── Security: bandit (Python SAST)          │
  │                                              │
  │  Stage 2: Test                               │
  │  ├── Unit tests: pytest                      │
  │  ├── Integration: docker-compose test env    │
  │  └── Coverage report: must be > 70%          │
  │                                              │
  │  Stage 3: Build                              │
  │  ├── Docker build (multi-stage)              │
  │  ├── Image vulnerability scan: Trivy (Apache)│
  │  └── Push to Gitea Package Registry          │
  │                                              │
  │  Stage 4: Deploy to Staging (auto on main)   │
  │  ├── Helm upgrade --install (staging values) │
  │  ├── Wait for rollout complete               │
  │  └── Smoke tests (health endpoint)           │
  │                                              │
  │  Stage 5: Deploy to Production (manual gate) │
  │  ├── Requires manual approval in Gitea PR    │
  │  ├── Helm upgrade (production values)        │
  │  ├── Rolling deployment (zero downtime)      │
  │  └── Auto rollback if health fails in 5 min  │
  └──────────────────────────────────────────────┘

Helm charts:
  charts/
    dossier-service/
    workflow-engine/
    document-service/
    ai-orchestrator/
    ... (one per service)
    infrastructure/
      postgresql/     (Bitnami Helm chart, Apache)
      valkey/         (Bitnami Helm chart, Apache)
      minio/          (MinIO Helm chart, Apache)
      redpanda/       (Redpanda Helm chart, Apache)
      weaviate/       (Weaviate Helm chart, Apache)
      meilisearch/    (Meilisearch Helm chart, MIT)
      keycloak/       (Bitnami Helm chart, Apache)
      traefik/        (Traefik Helm chart, MIT)
```

#### 8.4 Infrastructure as Code — OpenTofu

```
Why OpenTofu:
  Community fork of Terraform (MPL 2.0)
  HashiCorp changed Terraform to BSL license
  OpenTofu is drop-in compatible, Linux Foundation project

Directory structure:
  infrastructure/
  ├── environments/
  │   ├── production/
  │   │   ├── main.tf
  │   │   ├── variables.tf
  │   │   └── terraform.tfvars
  │   └── staging/
  │       └── ...
  ├── modules/
  │   ├── k3s-cluster/
  │   ├── postgresql/
  │   ├── minio/
  │   ├── networking/
  │   └── openbao/        (secrets management)
  └── backend.tf          (OpenTofu state in MinIO S3-compat)

State backend: MinIO (S3-compatible)
  Remote state stored on-premise (no Terraform Cloud)
  State locking via MinIO object metadata
```

---

### 9. Secrets Management — OpenBao

```
Why OpenBao:
  Community fork of HashiCorp Vault (MPL 2.0)
  HashiCorp changed Vault to BSL license
  OpenBao is drop-in compatible, Linux Foundation project

Secrets engines:
  kv-v2/smart-dossier/     → static secrets (DB passwords, API keys)
  database/                → dynamic PostgreSQL credentials
                             (short-lived, rotated per deployment)
  pki/                     → internal CA for mTLS certificates

K8s integration:
  OpenBao Agent Sidecar Injector
  Injects secrets as files into pods at startup
  Pods never fetch secrets directly from OpenBao
  Secret rotation: pods restarted automatically on rotation

Secret categories managed:
  PostgreSQL passwords (dynamic, 24h TTL)
  MinIO access keys
  Redpanda SASL credentials
  Keycloak client secrets
  Weaviate API key
  Ollama API key (if auth enabled)
  JWT signing private key
  Encryption keys for PII column encryption
```

---

### 10. Observability Stack

```
┌──────────────────────────────────────────────────────────────┐
│                  Observability Platform                      │
│              (all Apache 2.0 / AGPL v3 / MIT)               │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │               Grafana (AGPL v3)                     │    │
│  │         Single pane of glass for all signals        │    │
│  │                                                     │    │
│  │  Datasources:                                       │    │
│  │  ├── Prometheus (metrics)                           │    │
│  │  ├── Loki (logs)                                    │    │
│  │  ├── Tempo (traces)                                 │    │
│  │  └── PostgreSQL (direct SQL panels for analytics)   │    │
│  │                                                     │    │
│  │  Dashboards:                                        │    │
│  │  ├── Platform Overview (all services health)        │    │
│  │  ├── AI Pipeline (latency, success rate, cost=0)   │    │
│  │  ├── Dossier Operations (phase transitions, counts) │    │
│  │  ├── Kafka/Redpanda (lag, throughput)               │    │
│  │  ├── PostgreSQL (query times, connections)          │    │
│  │  └── Ollama (inference latency, queue depth)        │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌──────────────────┐ ┌──────────────┐ ┌────────────────┐  │
│  │   Prometheus     │ │  Grafana     │ │ OpenTelemetry  │  │
│  │   (Apache 2.0)   │ │  Loki        │ │ Collector      │  │
│  │                  │ │  (AGPL v3)   │ │ (Apache 2.0)   │  │
│  │  Scrape targets: │ │              │ │                │  │
│  │  - All FastAPI   │ │  Log sources:│ │ Receives from: │  │
│  │    /metrics      │ │  - Promtail  │ │ - All services │  │
│  │  - Redpanda      │ │    (each pod)│ │   (OTLP gRPC) │  │
│  │  - PostgreSQL    │ │  - Traefik   │ │                │  │
│  │  - K8s nodes     │ │  - Keycloak  │ │ Exports to:    │  │
│  │  - Ollama        │ │  - Ollama    │ │ - Tempo        │  │
│  │  - Weaviate      │ │              │ │ - Prometheus   │  │
│  │  - Meilisearch   │ │  Retention:  │ │ - Loki         │  │
│  │                  │ │  30 days     │ │                │  │
│  │  Retention: 15d  │ │              │ │                │  │
│  └──────────────────┘ └──────────────┘ └────────────────┘  │
│                                                              │
│  ┌──────────────────┐ ┌──────────────────────────────────┐  │
│  │  Grafana Tempo   │ │   Grafana Alerting +             │  │
│  │  (Apache 2.0)    │ │   Alertmanager (Apache 2.0)      │  │
│  │                  │ │                                  │  │
│  │  Distributed     │ │  Channels:                       │  │
│  │  request tracing │ │  - Email via Postal              │  │
│  │  across all      │ │  - Webhook to custom endpoint    │  │
│  │  microservices   │ │                                  │  │
│  │                  │ │  Alert rules:                    │  │
│  │  Sampling: 10%   │ │  - Error rate > 1% (5 min)       │  │
│  │  in production   │ │  - P99 latency > 3s              │  │
│  │  100% in staging │ │  - Kafka consumer lag > 1000     │  │
│  │                  │ │  - Ollama queue > 10 requests    │  │
│  │  Retention: 7d   │ │  - PostgreSQL conn > 80%         │  │
│  └──────────────────┘ │  - MinIO disk > 80%              │  │
│                        │  - Any DLQ message received      │  │
│                        └──────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘

AI-specific metrics (custom Prometheus metrics):
  ai_extraction_total{status="success|failed", mime_type}
  ai_extraction_duration_seconds{model}
  ai_extraction_confidence_histogram{field_name}
  ai_rag_query_total{found_in_context="true|false"}
  ai_rag_latency_seconds
  ai_next_step_suggestions_total{urgency}
  ai_llm_tokens_total{model, pipeline}
  ai_cache_hit_total{pipeline}
  ai_cache_miss_total{pipeline}
  ollama_model_load_seconds{model}
  ollama_inference_queue_depth
```

---

### 11. Security Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    Security Layers                           │
│                                                              │
│  Network perimeter:                                          │
│  ├── All external traffic: TLS 1.3 only (Traefik)           │
│  ├── Internal services: mTLS via Cilium (eBPF)              │
│  ├── Kubernetes NetworkPolicy: allowlist per service         │
│  └── MinIO nodes: private subnet, no public access          │
│                                                              │
│  Identity & access:                                          │
│  ├── Keycloak: OIDC/OAuth2 for all human users              │
│  ├── JWT RS256: short-lived (1h access, 24h refresh)        │
│  ├── RBAC enforced at API route level (FastAPI deps)        │
│  ├── Service-to-service: mTLS client certificates           │
│  └── Least-privilege DB users per service                   │
│                                                              │
│  Data protection:                                            │
│  ├── PostgreSQL: column-level encryption (pgcrypto)         │
│  │   Encrypted: citizen_name, citizen_id_number             │
│  ├── MinIO: server-side encryption AES-256                  │
│  ├── Valkey: TLS for all connections                        │
│  ├── Secrets: OpenBao, dynamic credentials, auto-rotated    │
│  └── Audit log: append-only, object-locked in MinIO        │
│                                                              │
│  AI safety:                                                  │
│  ├── Ollama runs entirely on-premise (no data leaves)       │
│  ├── System prompts immutable at service level              │
│  ├── Prompt injection: input sanitized before LLM call      │
│  ├── LLM output: never directly used as DB value            │
│  │   without confidence check + human review for PII        │
│  ├── Letter generation: LLM fills slots only                │
│  │   (legal articles, amounts from DB, not LLM)            │
│  └── All AI calls logged with input/output for audit        │
│                                                              │
│  Operational security:                                       │
│  ├── Trivy: container image scanning in CI pipeline         │
│  ├── Bandit: Python SAST in CI pipeline                     │
│  ├── Dependabot equivalent: Renovate Bot (self-hosted)      │
│  ├── Gitea branch protection: no force push to main         │
│  └── All infra changes via OpenTofu PRs (no manual)        │
│                                                              │
│  Compliance:                                                 │
│  ├── GDPR-aligned: PII encrypted, retention policies        │
│  ├── Audit trail: every mutation logged immutably           │
│  ├── Right to access: export API for citizen data           │
│  └── Data residency: everything self-hosted in Albania      │
└──────────────────────────────────────────────────────────────┘
```

---

### 12. Data Flow — Complete End-to-End (Open Source Only)

```
Civil servant uploads valuation certificate to Dossier #1042
─────────────────────────────────────────────────────────────

Browser (Next.js)
  │  POST /api/v1/documents/upload-url
  ▼
Traefik (JWT validated via Keycloak ForwardAuth)
  │  Routes to document-service:8003
  ▼
Document Service (FastAPI)
  │  Generates presigned PUT URL → MinIO
  │  Returns URL + document_id to browser
  ▼
Browser
  │  PUT directly to MinIO presigned URL (bypasses app)
  │  (no file data goes through our app servers)
  ▼
Browser  POST /api/v1/documents/confirm { document_id }
  ▼
Document Service
  │  Records Document{status=PENDING} in document_db (PostgreSQL)
  │  Publishes to Redpanda: document.uploaded
  │  Publishes to Redpanda: audit.event
  │  Returns 202 Accepted to browser
  ▼
Redpanda (async from here — civil servant sees "Processing...")
  │
  ├─→ AI Orchestrator (consumer group: ai-consumers)
  │     Starts DocumentExtractionGraph (LangGraph)
  │     Fetches file from MinIO
  │     Tesseract OCR (if scanned) → Unstructured.io parse
  │     Mistral 7B via Ollama → structured JSON extraction
  │     Validates fields, scores confidence
  │     Embeds chunks → Weaviate DocumentChunks
  │     Writes extracted_fields to document_db (PostgreSQL)
  │     Publishes: document.extraction-complete
  │
  └─→ Audit Service (consumer group: audit-group)
        Writes immutable AuditEvent to audit_db

Redpanda (document.extraction-complete)
  │
  └─→ Notification Service
        Fetches civil servant WebSocket connection from Valkey
        Pushes WebSocket message:
        { type: "EXTRACTION_COMPLETE", document_id, needs_review: false }

Browser (WebSocket push received)
  │  "✅ AI extracted 9 fields from certificate.pdf. Review →"
  ▼
Civil servant clicks Review
  │  GET /api/v1/documents/{id}  → Document Service → PostgreSQL
  ▼
UI shows extraction results:
  property_id:         P-2024-1234  ✅ confidence: 0.98
  owner_name:          Artan Hoxha  ✅ confidence: 0.95
  valuation_amount:    4,500,000 L  ✅ confidence: 0.92
  valuation_date:      2026-01-15   ✅ confidence: 0.97
  commission_chair:    [unreadable] ⚠️ confidence: 0.41 → manual entry

Civil servant corrects commission_chair → PATCH /documents/{id}/fields
  → Document Service updates field + audit.event emitted

Civil servant clicks "What's next?"
  │  GET /api/v1/ai/next-step/1042
  ▼
AI Orchestrator
  │  Check Valkey cache: miss
  │  Parallel fetch:
  │    Dossier Service → current phase, history, documents
  │    Workflow Engine → phase rules, required_documents
  │  All required_documents now present ✅
  │  Days in phase: 12 (limit: 15) → GREEN
  │  LLM (Llama 3.1 8B via Ollama) generates recommendation
  │  Write result to Valkey (TTL: 15 min)
  ▼
UI shows:
  "✅ Ready to advance to Phase 4 — Commission Review
   All required documents present.
   Legal basis: Law No. 8561, Article 14.
   Responsible: Ministry of Infrastructure."

Civil servant clicks "Advance Phase"
  │  POST /api/v1/dossiers/1042/advance-phase { to_phase: "phase_04" }
  ▼
Dossier Service
  │  POST to Workflow Engine: validate-transition → 200 valid
  │  Write PhaseHistory record (PostgreSQL)
  │  Update current_phase_id (PostgreSQL)
  │  Publish to Redpanda:
  │    dossier.phase-changed
  │    audit.event
  ▼
Redpanda (dossier.phase-changed) — parallel consumers:
  │
  ├─→ AI Orchestrator
  │     Invalidate Valkey: ai:summary:1042:*, ai:next-step:1042:*
  │     Pre-warm new summary async
  │
  ├─→ Notification Service
  │     Email + in-app: "Dossier 1042 advanced to Phase 4"
  │     To: assigned civil servant + Ministry contact
  │     Via: Postal (self-hosted SMTP)
  │
  ├─→ Audit Service
  │     Immutable log entry written
  │
  └─→ Dashboard Service
        Materialized views invalidated, Meilisearch index updated
        Grafana dashboard reflects new phase count in real-time
```

---

## Architecture Decision Records

| # | Decision | Choice | Rationale |
|---|---|---|---|
| ADR-001 | LLM provider | Ollama (self-hosted) | Zero cost, data sovereignty, works offline on govt infra |
| ADR-002 | LLM model | Llama 3.1 + Mistral (quantized) | Best OSS quality, Apache/MIT license, runs on single A10G |
| ADR-003 | Kafka alternative | Redpanda | Same Kafka API, no ZooKeeper, MIT license, lower ops burden |
| ADR-004 | Redis alternative | Valkey | Redis changed license to SSPL; Valkey is Apache 2.0 fork |
| ADR-005 | Terraform alternative | OpenTofu | HashiCorp changed to BSL; OpenTofu is MPL 2.0, LF project |
| ADR-006 | Vault alternative | OpenBao | Same reason as OpenTofu; OpenBao is MPL 2.0, LF project |
| ADR-007 | Elasticsearch alternative | Meilisearch | Elastic changed license; Meilisearch is MIT, simpler ops |
| ADR-008 | Service mesh | Cilium | Apache 2.0, eBPF-based (lower overhead than Istio sidecar) |
| ADR-009 | API Gateway | Traefik | MIT license, Kubernetes-native, simple config, no paid tiers |
| ADR-010 | CI/CD | Gitea + Woodpecker | Both MIT, self-hosted, code stays on-premise (govt requirement) |
| ADR-011 | Auth | Keycloak | Apache 2.0, battle-tested for govt use, SAML + OIDC |
| ADR-012 | K8s distribution | K3s | Apache 2.0, runs on modest hardware, perfect for on-premise |
| ADR-013 | RAG approach vs fine-tuning | RAG | Process diagrams change; RAG updates in minutes, no retraining |
| ADR-014 | Letter generation safety | LLM fills slots only | Legal amounts/articles from DB, not LLM — government safety |
| ADR-015 | Data residency | 100% self-hosted | All data stays in Albania; no SaaS calls for any feature |
