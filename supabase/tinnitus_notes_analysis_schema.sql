-- Tabla de Análisis de Notas de Tinnitus por IA
CREATE TABLE IF NOT EXISTS tinnitus_notes_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_patient UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  id_tinnitus_questionnaires UUID REFERENCES tinnitus_questionnaires(id) ON DELETE SET NULL,
  id_tinnitus_response UUID REFERENCES tinnitus_responses(id) ON DELETE SET NULL,
  analysis TEXT NOT NULL,
  note_count INTEGER CHECK (note_count IS NULL OR note_count > 0),
  analyzed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE tinnitus_notes_analysis ENABLE ROW LEVEL SECURITY;

-- Políticas para tinnitus_notes_analysis (ajustar para producción)
CREATE POLICY "Allow all for tinnitus_notes_analysis" ON tinnitus_notes_analysis FOR ALL USING (true) WITH CHECK (true);

-- Índices para mejorar rendimiento
CREATE INDEX idx_tinnitus_notes_analysis_id_patient ON tinnitus_notes_analysis(id_patient);
CREATE INDEX idx_tinnitus_notes_analysis_id_tinnitus_questionnaires ON tinnitus_notes_analysis(id_tinnitus_questionnaires);
CREATE INDEX idx_tinnitus_notes_analysis_id_tinnitus_response ON tinnitus_notes_analysis(id_tinnitus_response);
CREATE INDEX idx_tinnitus_notes_analysis_created_at ON tinnitus_notes_analysis(created_at DESC);
CREATE INDEX idx_tinnitus_notes_analysis_analyzed_at ON tinnitus_notes_analysis(analyzed_at DESC);

-- Comentarios para documentación
COMMENT ON TABLE tinnitus_notes_analysis IS 'Análisis de notas de tinnitus generados por IA';
COMMENT ON COLUMN tinnitus_notes_analysis.id_patient IS 'ID del paciente (referencia a patients)';
COMMENT ON COLUMN tinnitus_notes_analysis.id_tinnitus_questionnaires IS 'ID del cuestionario de tinnitus (referencia a tinnitus_questionnaires)';
COMMENT ON COLUMN tinnitus_notes_analysis.id_tinnitus_response IS 'ID de la respuesta de tinnitus (referencia a tinnitus_responses)';
COMMENT ON COLUMN tinnitus_notes_analysis.analysis IS 'Contenido del análisis generado por IA (formato markdown)';
COMMENT ON COLUMN tinnitus_notes_analysis.note_count IS 'Cantidad de notas analizadas';
COMMENT ON COLUMN tinnitus_notes_analysis.analyzed_at IS 'Timestamp del análisis';
COMMENT ON COLUMN tinnitus_notes_analysis.created_by IS 'Usuario que creó el análisis';
