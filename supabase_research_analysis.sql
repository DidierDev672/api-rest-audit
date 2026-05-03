-- Schema de Supabase para Research Analysis
-- Ejecutar en el SQL Editor de Supabase

-- Tabla principal de análisis de investigación
CREATE TABLE IF NOT EXISTS research_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  research_id UUID NOT NULL,
  analysis JSONB NOT NULL,
  notes_count INTEGER NOT NULL DEFAULT 0,
  notes_references JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE research_analysis ENABLE ROW LEVEL SECURITY;

-- Politicas RLS
CREATE POLICY "Allow all operations on research_analysis" 
ON research_analysis FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Indice para búsquedas rápidas
CREATE INDEX idx_research_analysis_research_id ON research_analysis(research_id);
CREATE INDEX idx_research_analysis_created_at ON research_analysis(created_at DESC);