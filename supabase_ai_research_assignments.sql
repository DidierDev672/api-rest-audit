-- Schema de Supabase para investigaciones del calendario asignadas a la IA
-- Ejecutar en el SQL Editor de Supabase
--
-- ai_research_assignments: tareas/investigaciones del calendario delegadas a
--   la IA para que las trabaje durante un rango de fechas.
-- ai_research_results: resultados producidos por la IA (con mensaje psicológico)
--   que alimentan el aviso "tu investigación tiene resultados".

CREATE TABLE IF NOT EXISTS ai_research_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id VARCHAR(255) NOT NULL,
  calendar_event_id VARCHAR(255),
  research_id VARCHAR(255),
  event_type VARCHAR(20) NOT NULL DEFAULT 'task' CHECK (event_type IN ('task', 'research')),
  title VARCHAR(255) NOT NULL,
  prompt TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  recurrence VARCHAR(20) NOT NULL DEFAULT 'once' CHECK (recurrence IN ('once', 'daily')),
  status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'paused', 'cancelled')),
  continue_delivery BOOLEAN NOT NULL DEFAULT TRUE,
  model VARCHAR(120),
  next_run_at TIMESTAMPTZ,
  last_run_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  runs_count INTEGER NOT NULL DEFAULT 0,
  last_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_research_assignments_owner
  ON ai_research_assignments(owner_id);
CREATE INDEX IF NOT EXISTS idx_ai_research_assignments_due
  ON ai_research_assignments(status, next_run_at);

CREATE TABLE IF NOT EXISTS ai_research_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID NOT NULL REFERENCES ai_research_assignments(id) ON DELETE CASCADE,
  owner_id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  psychological_message TEXT NOT NULL DEFAULT '',
  model VARCHAR(120),
  seen BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_research_results_owner
  ON ai_research_results(owner_id);
CREATE INDEX IF NOT EXISTS idx_ai_research_results_unseen
  ON ai_research_results(owner_id, seen);
CREATE INDEX IF NOT EXISTS idx_ai_research_results_assignment
  ON ai_research_results(assignment_id);

-- Trigger para mantener updated_at en las asignaciones
CREATE OR REPLACE FUNCTION set_ai_research_assignments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_ai_research_assignments_updated_at ON ai_research_assignments;
CREATE TRIGGER trg_ai_research_assignments_updated_at
  BEFORE UPDATE ON ai_research_assignments
  FOR EACH ROW
  EXECUTE FUNCTION set_ai_research_assignments_updated_at();

-- Row Level Security
ALTER TABLE ai_research_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_research_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on ai_research_assignments"
ON ai_research_assignments FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow all operations on ai_research_results"
ON ai_research_results FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Notas personales vinculadas a un resultado concreto de investigación IA.
CREATE TABLE IF NOT EXISTS ai_research_result_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ai_research_result_id UUID NOT NULL REFERENCES ai_research_results(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  color VARCHAR(20) NOT NULL DEFAULT '#FAD4C0',
  color_name VARCHAR(60) NOT NULL DEFAULT 'Melocotón',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_research_result_notes_result
  ON ai_research_result_notes(ai_research_result_id);

ALTER TABLE ai_research_result_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on ai_research_result_notes"
ON ai_research_result_notes FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
