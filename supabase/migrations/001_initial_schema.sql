-- Enable extensions
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- DOSSIERS
CREATE TABLE dossiers (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_code     VARCHAR(20) UNIQUE,
  process_type      TEXT NOT NULL CHECK (
                      process_type IN ('expropriation', 'ekb_privatization')
                    ),
  owner_name        VARCHAR(255) NOT NULL,
  owner_id_number   VARCHAR(50),
  property_address  TEXT,
  property_id       VARCHAR(100),
  property_area_m2  DECIMAL(10,2),
  current_phase     VARCHAR(100) NOT NULL DEFAULT 'application_received',
  current_phase_idx INTEGER NOT NULL DEFAULT 0,
  status            TEXT NOT NULL DEFAULT 'active' CHECK (
                      status IN ('active', 'blocked', 'completed', 'cancelled')
                    ),
  assigned_to       VARCHAR(255),
  institution       VARCHAR(255),
  deadline_date     TIMESTAMPTZ,
  estimated_value   DECIMAL(15,2),
  notes             TEXT,
  metadata          JSONB DEFAULT '{}',
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- PHASE LOGS (full audit trail)
CREATE TABLE phase_logs (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dossier_id     UUID NOT NULL REFERENCES dossiers(id) ON DELETE CASCADE,
  phase_name     VARCHAR(100) NOT NULL,
  phase_index    INTEGER NOT NULL,
  institution    VARCHAR(255),
  started_at     TIMESTAMPTZ DEFAULT NOW(),
  completed_at   TIMESTAMPTZ,
  completed_by   VARCHAR(255),
  notes          TEXT,
  duration_days  INTEGER GENERATED ALWAYS AS (
    CASE WHEN completed_at IS NOT NULL
    THEN EXTRACT(DAY FROM completed_at - started_at)::INTEGER
    ELSE NULL END
  ) STORED
);

-- DOCUMENTS
CREATE TABLE documents (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dossier_id       UUID NOT NULL REFERENCES dossiers(id) ON DELETE CASCADE,
  file_name        VARCHAR(500) NOT NULL,
  storage_path     VARCHAR(1000),
  file_type        VARCHAR(50),
  file_size_bytes  INTEGER,
  document_type    VARCHAR(100),
  upload_date      TIMESTAMPTZ DEFAULT NOW(),
  uploaded_by      VARCHAR(255),
  ocr_raw_text     TEXT,
  extracted_fields JSONB DEFAULT '{}',
  ai_confidence    FLOAT CHECK (ai_confidence BETWEEN 0 AND 1),
  verified         BOOLEAN DEFAULT FALSE,
  verified_by      VARCHAR(255),
  verified_at      TIMESTAMPTZ,
  phase_uploaded   VARCHAR(100)
);

-- ALERTS
CREATE TABLE alerts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dossier_id    UUID NOT NULL REFERENCES dossiers(id) ON DELETE CASCADE,
  alert_type    TEXT NOT NULL CHECK (
                  alert_type IN ('deadline', 'blockage', 'missing_doc',
                                 'phase_overdue', 'critical_point')
                ),
  severity      TEXT NOT NULL CHECK (
                  severity IN ('low', 'medium', 'high', 'critical')
                ),
  message       TEXT NOT NULL,
  message_sq    TEXT,
  phase_name    VARCHAR(100),
  triggered_at  TIMESTAMPTZ DEFAULT NOW(),
  resolved_at   TIMESTAMPTZ,
  resolved_by   VARCHAR(255),
  is_active     BOOLEAN DEFAULT TRUE
);

-- GENERATED LETTERS
CREATE TABLE generated_letters (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dossier_id     UUID NOT NULL REFERENCES dossiers(id) ON DELETE CASCADE,
  letter_type    VARCHAR(100) NOT NULL,
  content        TEXT NOT NULL,
  generated_by   VARCHAR(255),
  generated_at   TIMESTAMPTZ DEFAULT NOW(),
  storage_path   VARCHAR(1000),
  status         TEXT DEFAULT 'draft' CHECK (
                   status IN ('draft', 'approved', 'sent')
                 )
);

-- RAG KNOWLEDGE BASE (pgvector)
CREATE TABLE knowledge_chunks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source      VARCHAR(255) NOT NULL,
  process_type TEXT,
  chunk_index INTEGER,
  chunk_text  TEXT NOT NULL,
  embedding   vector(768),
  metadata    JSONB DEFAULT '{}'
);

-- AI INTERACTION LOG
CREATE TABLE ai_interactions (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dossier_id       UUID REFERENCES dossiers(id) ON DELETE SET NULL,
  interaction_type VARCHAR(100),
  model_used       VARCHAR(100),
  prompt_tokens    INTEGER,
  output_tokens    INTEGER,
  response_time_ms INTEGER,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX idx_dossiers_status ON dossiers(status);
CREATE INDEX idx_dossiers_process_type ON dossiers(process_type);
CREATE INDEX idx_dossiers_current_phase ON dossiers(current_phase);
CREATE INDEX idx_dossiers_deadline ON dossiers(deadline_date);
CREATE INDEX idx_alerts_active ON alerts(is_active, severity);
CREATE INDEX idx_documents_dossier ON documents(dossier_id);
CREATE INDEX idx_phase_logs_dossier ON phase_logs(dossier_id);
CREATE INDEX knowledge_chunks_embedding_idx ON knowledge_chunks
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- REALTIME
ALTER PUBLICATION supabase_realtime ADD TABLE dossiers;
ALTER PUBLICATION supabase_realtime ADD TABLE alerts;
ALTER PUBLICATION supabase_realtime ADD TABLE phase_logs;

-- AUTO-UPDATE updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER dossiers_updated_at
  BEFORE UPDATE ON dossiers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- AUTO-GENERATE tracking codes
CREATE OR REPLACE FUNCTION generate_tracking_code()
RETURNS TRIGGER AS $$
BEGIN
  NEW.tracking_code := UPPER(
    SUBSTRING(NEW.process_type, 1, 3) || '-' ||
    TO_CHAR(NOW(), 'YYYY') || '-' ||
    LPAD(FLOOR(RANDOM() * 9999 + 1)::TEXT, 4, '0')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER dossiers_tracking_code
  BEFORE INSERT ON dossiers
  FOR EACH ROW
  WHEN (NEW.tracking_code IS NULL OR NEW.tracking_code = '')
  EXECUTE FUNCTION generate_tracking_code();
