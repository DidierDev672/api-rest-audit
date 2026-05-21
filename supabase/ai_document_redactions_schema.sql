CREATE TABLE IF NOT EXISTS ai_document_redactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_upload_id UUID NOT NULL,
  analysis_id UUID,
  content TEXT NOT NULL,
  model VARCHAR(255) NOT NULL DEFAULT 'gemini-3-flash-preview',
  notes_count INTEGER NOT NULL DEFAULT 0,
  original_filename VARCHAR(500) NOT NULL,
  redaction_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT check_content_not_empty CHECK (TRIM(content) != '')
);

ALTER TABLE ai_document_redactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for ai_document_redactions" ON ai_document_redactions FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX idx_ai_document_redactions_document_upload_id ON ai_document_redactions(document_upload_id);
CREATE INDEX idx_ai_document_redactions_created_at ON ai_document_redactions(created_at DESC);
CREATE INDEX idx_ai_document_redactions_analysis_id ON ai_document_redactions(analysis_id);
