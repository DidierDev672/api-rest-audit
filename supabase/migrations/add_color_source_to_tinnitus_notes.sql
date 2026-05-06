-- Migración para agregar columnas color y source a tinnitus_notes
-- Ejecutar esto en Supabase SQL Editor si la tabla ya existe sin estas columnas

ALTER TABLE tinnitus_notes 
ADD COLUMN IF NOT EXISTS color VARCHAR(100),
ADD COLUMN IF NOT EXISTS source VARCHAR(255);

-- Verificar que las columnas se agregaron correctamente
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'tinnitus_notes' 
ORDER BY ordinal_position;
