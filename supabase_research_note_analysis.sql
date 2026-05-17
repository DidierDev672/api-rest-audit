-- Schema de Supabase para Research Note Analysis
-- Ejecutar en el SQL Editor de Supabase

CREATE TABLE IF NOT EXISTS research_note_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  research_id UUID NOT NULL,
  analysis_text TEXT NOT NULL,
  notes_count INTEGER NOT NULL DEFAULT 0,
  source VARCHAR(50) NOT NULL DEFAULT 'gemini',
  model_name VARCHAR(100),
  language VARCHAR(10) NOT NULL DEFAULT 'es',
  created_by_user_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE research_note_analysis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on research_note_analysis"
ON research_note_analysis FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE INDEX idx_research_note_analysis_research_id ON research_note_analysis(research_id);
CREATE INDEX idx_research_note_analysis_created_by_user_id ON research_note_analysis(created_by_user_id);
CREATE INDEX idx_research_note_analysis_created_at ON research_note_analysis(created_at DESC);
