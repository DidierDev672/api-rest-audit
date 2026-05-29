-- Notas vinculadas a análisis de documentos IA
CREATE TABLE IF NOT EXISTS public.ai_document_analysis_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ai_document_analysis_id UUID NOT NULL REFERENCES public.ai_document_analyses(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  color VARCHAR(32) NOT NULL,
  color_name VARCHAR(64) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_document_analysis_notes_analysis_id
  ON public.ai_document_analysis_notes (ai_document_analysis_id);

ALTER TABLE public.ai_document_analysis_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for ai_document_analysis_notes"
  ON public.ai_document_analysis_notes
  FOR ALL USING (true) WITH CHECK (true);

COMMENT ON TABLE public.ai_document_analysis_notes IS 'Notas de usuario asociadas a un ai_document_analyses';
