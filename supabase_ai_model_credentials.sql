-- Schema de Supabase para credenciales de modelos de IA (app movil)
-- Ejecutar en el SQL Editor de Supabase
--
-- Almacena las API keys que cada usuario configura desde la app movil
-- para distintos proveedores de IA (Gemini, OpenAI/Codex, Claude u "Other").

CREATE TABLE IF NOT EXISTS ai_model_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id VARCHAR(255) NOT NULL,
  provider VARCHAR(20) NOT NULL CHECK (provider IN ('gemini', 'openai', 'anthropic', 'other')),
  label VARCHAR(120),
  model_name VARCHAR(120),
  api_key TEXT NOT NULL,
  base_url TEXT,
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indices para busquedas por usuario y proveedor
CREATE INDEX IF NOT EXISTS idx_ai_model_credentials_owner_id
  ON ai_model_credentials(owner_id);
CREATE INDEX IF NOT EXISTS idx_ai_model_credentials_provider
  ON ai_model_credentials(provider);

-- Como maximo una credencial predeterminada por usuario
CREATE UNIQUE INDEX IF NOT EXISTS uq_ai_model_credentials_owner_default
  ON ai_model_credentials(owner_id)
  WHERE is_default = TRUE;

-- Trigger para mantener updated_at
CREATE OR REPLACE FUNCTION set_ai_model_credentials_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_ai_model_credentials_updated_at ON ai_model_credentials;
CREATE TRIGGER trg_ai_model_credentials_updated_at
  BEFORE UPDATE ON ai_model_credentials
  FOR EACH ROW
  EXECUTE FUNCTION set_ai_model_credentials_updated_at();

-- Row Level Security
ALTER TABLE ai_model_credentials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on ai_model_credentials"
ON ai_model_credentials FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
