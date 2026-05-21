CREATE TABLE IF NOT EXISTS ai_document_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_upload_id UUID NOT NULL,
  content TEXT NOT NULL,
  model VARCHAR(255) NOT NULL DEFAULT 'gemini-3-flash-preview',
  analysis_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT check_content_not_empty CHECK (TRIM(content) != '')
);

ALTER TABLE ai_document_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for ai_document_analyses" ON ai_document_analyses FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX idx_ai_document_analyses_document_upload_id ON ai_document_analyses(document_upload_id);
CREATE INDEX idx_ai_document_analyses_created_at ON ai_document_analyses(created_at DESC);
