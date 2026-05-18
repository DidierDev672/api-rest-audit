-- =====================================================
-- MIGRATION 003: Tablas de integración N8N
-- Equivalente a supabase/n8n_integration_schema.sql
-- =====================================================

CREATE TABLE IF NOT EXISTS n8n_webhook_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  http_method VARCHAR(10) NOT NULL DEFAULT 'POST',
  endpoint VARCHAR(50) NOT NULL
    CHECK (endpoint IN ('send', 'receive', 'markdown/upload')),
  direction VARCHAR(10) NOT NULL
    CHECK (direction IN ('inbound', 'outbound')),
  payload_type VARCHAR(20) NOT NULL
    CHECK (payload_type IN ('text', 'gemini', 'markdown', 'legacy_text')),
  status VARCHAR(20) NOT NULL DEFAULT 'success'
    CHECK (status IN ('success', 'failed')),
  request_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  response_payload JSONB,
  error_message TEXT,
  duration_ms INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS n8n_text_exchanges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  webhook_log_id UUID REFERENCES n8n_webhook_logs(id) ON DELETE SET NULL,
  request_text TEXT NOT NULL,
  response_text TEXT,
  request_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  response_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS n8n_markdown_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  webhook_log_id UUID REFERENCES n8n_webhook_logs(id) ON DELETE SET NULL,
  filename VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  content_length INTEGER NOT NULL CHECK (content_length >= 0),
  storage_path TEXT,
  source_type VARCHAR(20) NOT NULL
    CHECK (source_type IN ('gemini', 'direct_upload', 'legacy_text')),
  task TEXT,
  source_timestamp TIMESTAMP WITH TIME ZONE,
  gemini_finish_reason VARCHAR(50),
  gemini_role VARCHAR(50),
  gemini_raw_response JSONB,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE n8n_webhook_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE n8n_text_exchanges ENABLE ROW LEVEL SECURITY;
ALTER TABLE n8n_markdown_documents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all for n8n_webhook_logs" ON n8n_webhook_logs;
CREATE POLICY "Allow all for n8n_webhook_logs"
  ON n8n_webhook_logs FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all for n8n_text_exchanges" ON n8n_text_exchanges;
CREATE POLICY "Allow all for n8n_text_exchanges"
  ON n8n_text_exchanges FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all for n8n_markdown_documents" ON n8n_markdown_documents;
CREATE POLICY "Allow all for n8n_markdown_documents"
  ON n8n_markdown_documents FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_n8n_webhook_logs_endpoint_created
  ON n8n_webhook_logs(endpoint, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_n8n_webhook_logs_direction_status
  ON n8n_webhook_logs(direction, status);

CREATE INDEX IF NOT EXISTS idx_n8n_webhook_logs_payload_type
  ON n8n_webhook_logs(payload_type);

CREATE INDEX IF NOT EXISTS idx_n8n_text_exchanges_webhook_log_id
  ON n8n_text_exchanges(webhook_log_id);

CREATE INDEX IF NOT EXISTS idx_n8n_text_exchanges_created_at
  ON n8n_text_exchanges(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_n8n_markdown_documents_filename
  ON n8n_markdown_documents(filename);

CREATE INDEX IF NOT EXISTS idx_n8n_markdown_documents_source_type
  ON n8n_markdown_documents(source_type);

CREATE INDEX IF NOT EXISTS idx_n8n_markdown_documents_created_at
  ON n8n_markdown_documents(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_n8n_markdown_documents_task
  ON n8n_markdown_documents(task)
  WHERE task IS NOT NULL;

CREATE OR REPLACE VIEW n8n_integration_summary AS
SELECT
  l.id AS log_id,
  l.endpoint,
  l.direction,
  l.payload_type,
  l.status,
  l.created_at,
  t.id AS text_exchange_id,
  m.id AS markdown_document_id,
  m.filename AS markdown_filename
FROM n8n_webhook_logs l
LEFT JOIN n8n_text_exchanges t ON t.webhook_log_id = l.id
LEFT JOIN n8n_markdown_documents m ON m.webhook_log_id = l.id;
