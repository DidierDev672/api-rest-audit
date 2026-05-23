-- Ejecutar en el mismo proyecto Supabase que usa auditory-api / universal-audit
ALTER TABLE ai_document_uploads
  ADD COLUMN IF NOT EXISTS patient_id TEXT,
  ADD COLUMN IF NOT EXISTS patient_name TEXT,
  ADD COLUMN IF NOT EXISTS patient_document_type TEXT,
  ADD COLUMN IF NOT EXISTS patient_document_number TEXT,
  ADD COLUMN IF NOT EXISTS patient_birth_date DATE;

CREATE INDEX IF NOT EXISTS idx_ai_document_uploads_patient_id
  ON ai_document_uploads(patient_id) WHERE patient_id IS NOT NULL;
