-- Registro de análisis IA sobre notas de tareas/investigaciones (calendario)
CREATE TABLE IF NOT EXISTS public.calendar_analysis_note_analysis_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  calendar_ai_analysis_id UUID NOT NULL REFERENCES public.calendar_ai_analyses(id) ON DELETE CASCADE,
  analysis TEXT NOT NULL,
  note_count INTEGER NOT NULL DEFAULT 0 CHECK (note_count >= 0),
  model VARCHAR(100),
  analyzed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cal_note_analysis_logs_analysis_id
  ON public.calendar_analysis_note_analysis_logs (calendar_ai_analysis_id);

CREATE INDEX IF NOT EXISTS idx_cal_note_analysis_logs_analyzed_at
  ON public.calendar_analysis_note_analysis_logs (analyzed_at DESC);

ALTER TABLE public.calendar_analysis_note_analysis_logs ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'calendar_analysis_note_analysis_logs'
      AND policyname = 'Allow all for calendar_analysis_note_analysis_logs'
  ) THEN
    CREATE POLICY "Allow all for calendar_analysis_note_analysis_logs"
      ON public.calendar_analysis_note_analysis_logs
      FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

COMMENT ON TABLE public.calendar_analysis_note_analysis_logs IS 'Log de análisis IA sobre notas vinculadas a calendar_ai_analyses';
