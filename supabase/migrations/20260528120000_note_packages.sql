-- Paquetes (secciones) de notas individuales + análisis IA guardados

CREATE TABLE IF NOT EXISTS note_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  note_count INT NOT NULL DEFAULT 0,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS note_package_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  note_package_id UUID NOT NULL REFERENCES note_packages(id) ON DELETE CASCADE,
  subject TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#FAD4C0',
  color_name TEXT NOT NULL DEFAULT 'Melocotón',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS note_package_analysis_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  note_package_id UUID NOT NULL REFERENCES note_packages(id) ON DELETE CASCADE,
  analysis TEXT NOT NULL,
  note_count INT NOT NULL DEFAULT 0,
  model TEXT,
  analyzed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_note_package_items_package
  ON note_package_items(note_package_id);

CREATE INDEX IF NOT EXISTS idx_note_package_analysis_logs_package
  ON note_package_analysis_logs(note_package_id);
