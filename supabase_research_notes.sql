-- Schema de Supabase para Research Notes
-- Ejecutar en el SQL Editor de Supabase

-- Tabla principal de notas de investigacion
CREATE TABLE IF NOT EXISTS research_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  research_id UUID NOT NULL,
  id_note VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  color VARCHAR(50) NOT NULL,
  color_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  source_message_index INTEGER,
  source_content TEXT,
  UNIQUE(research_id, id_note)
);

-- Habilitar Row Level Security
ALTER TABLE research_notes ENABLE ROW LEVEL SECURITY;

-- Politicas RLS
CREATE POLICY "Allow all operations on research_notes" 
ON research_notes FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Indice para busquedas rapidas
CREATE INDEX idx_research_notes_research_id ON research_notes(research_id);
CREATE INDEX idx_research_notes_id_note ON research_notes(id_note);