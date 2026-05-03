-- Tabla de Investigaciones
CREATE TABLE IF NOT EXISTS investigaciones (
  id_resource VARCHAR(255) PRIMARY KEY,
  content_resource TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE investigaciones ENABLE ROW LEVEL SECURITY;

-- Políticas públicas para desarrollo (ajustar para producción)
CREATE POLICY "Allow all for investigaciones" ON investigaciones FOR ALL USING (true) WITH CHECK (true);

-- Índices para mejorar rendimiento
CREATE INDEX idx_investigaciones_created_at ON investigaciones(created_at DESC);