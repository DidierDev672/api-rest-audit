-- Tabla de Notas de Tinnitus
CREATE TABLE IF NOT EXISTS tinnitus_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_patient UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  id_tinnitus_questionnaires UUID NOT NULL REFERENCES tinnitus_questionnaires(id) ON DELETE CASCADE,
  id_tinnitus_response UUID NOT NULL REFERENCES tinnitus_responses(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  color VARCHAR(100),
  source VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Restricción para evitar descripciones vacías
  CONSTRAINT check_description_not_empty CHECK (TRIM(description) != '')
);

-- Habilitar Row Level Security para tinnitus_notes
ALTER TABLE tinnitus_notes ENABLE ROW LEVEL SECURITY;

-- Políticas para tinnitus_notes (ajustar para producción)
CREATE POLICY "Allow all for tinnitus_notes" ON tinnitus_notes FOR ALL USING (true) WITH CHECK (true);

-- Índices para tinnitus_notes
CREATE INDEX idx_tinnitus_notes_id_patient ON tinnitus_notes(id_patient);
CREATE INDEX idx_tinnitus_notes_id_tinnitus_questionnaires ON tinnitus_notes(id_tinnitus_questionnaires);
CREATE INDEX idx_tinnitus_notes_id_tinnitus_response ON tinnitus_notes(id_tinnitus_response);
CREATE INDEX idx_tinnitus_notes_created_at ON tinnitus_notes(created_at DESC);
CREATE INDEX idx_tinnitus_notes_color ON tinnitus_notes(color);
CREATE INDEX idx_tinnitus_notes_source ON tinnitus_notes(source);

-- Comentarios para documentación
COMMENT ON TABLE tinnitus_notes IS 'Notas asociadas al análisis de tinnitus de los pacientes';
COMMENT ON COLUMN tinnitus_notes.id_patient IS 'ID del paciente (referencia a patients)';
COMMENT ON COLUMN tinnitus_notes.id_tinnitus_questionnaires IS 'ID del cuestionario de tinnitus (referencia a tinnitus_questionnaires)';
COMMENT ON COLUMN tinnitus_notes.id_tinnitus_response IS 'ID de la respuesta de tinnitus (referencia a tinnitus_responses)';
COMMENT ON COLUMN tinnitus_notes.description IS 'Contenido de la nota';
COMMENT ON COLUMN tinnitus_notes.color IS 'Clase CSS para el color (ej: bg-yellow-100 border-yellow-300 text-yellow-800)';
COMMENT ON COLUMN tinnitus_notes.source IS 'Fuente de la nota (ej: analysis-selection)';
