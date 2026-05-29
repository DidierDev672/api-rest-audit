-- Notas vinculadas a análisis IA de calendario (tareas / investigaciones)
CREATE TABLE IF NOT EXISTS public.calendar_analysis_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  calendar_ai_analysis_id UUID NOT NULL REFERENCES public.calendar_ai_analyses(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  color VARCHAR(32) NOT NULL,
  color_name VARCHAR(64) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_calendar_analysis_notes_analysis_id
  ON public.calendar_analysis_notes (calendar_ai_analysis_id);

ALTER TABLE public.calendar_analysis_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for calendar_analysis_notes"
  ON public.calendar_analysis_notes
  FOR ALL USING (true) WITH CHECK (true);

COMMENT ON TABLE public.calendar_analysis_notes IS 'Notas de usuario asociadas a un calendar_ai_analyses';
