-- Datos del paciente en documentos AI (registrado o manual)
-- Ejecutar en el proyecto Supabase usado por auditory-api / universal-audit
ALTER TABLE ai_document_uploads
  ADD COLUMN IF NOT EXISTS patient_id TEXT,
  ADD COLUMN IF NOT EXISTS patient_name TEXT,
  ADD COLUMN IF NOT EXISTS patient_document_type TEXT,
  ADD COLUMN IF NOT EXISTS patient_document_number TEXT,
  ADD COLUMN IF NOT EXISTS patient_birth_date DATE;

CREATE INDEX IF NOT EXISTS idx_ai_document_uploads_patient_id
  ON ai_document_uploads(patient_id) WHERE patient_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_ai_document_uploads_patient_name
  ON ai_document_uploads(patient_name) WHERE patient_name IS NOT NULL;

COMMENT ON COLUMN ai_document_uploads.patient_id IS 'UUID del paciente en patients (API) si está registrado';
COMMENT ON COLUMN ai_document_uploads.patient_name IS 'Nombre completo (registrado o manual)';
