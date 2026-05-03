-- =====================================================
-- SCHEMA SUPABASE - CLINICAL NOTES (Notas Clínicas)
-- Sistema de Tamizaje Auditivo
-- =====================================================

-- TABLA: clinical_notes
-- Almacena las notas clínicas realizadas por doctores
CREATE TABLE IF NOT EXISTS public.clinical_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_patient UUID NOT NULL,
    id_doctor UUID NOT NULL,
    id_screening UUID,
    note_type VARCHAR(50) NOT NULL DEFAULT 'general',
    title_note VARCHAR(255) NOT NULL,
    description_note TEXT NOT NULL,
    diagnosis TEXT,
    treatment TEXT,
    observations TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_clinical_notes_patient ON public.clinical_notes(id_patient);
CREATE INDEX IF NOT EXISTS idx_clinical_notes_doctor ON public.clinical_notes(id_doctor);
CREATE INDEX IF NOT EXISTS idx_clinical_notes_screening ON public.clinical_notes(id_screening);
CREATE INDEX IF NOT EXISTS idx_clinical_notes_type ON public.clinical_notes(note_type);
CREATE INDEX IF NOT EXISTS idx_clinical_notes_patient_date ON public.clinical_notes(id_patient, created_at DESC);

-- Comentarios
COMMENT ON TABLE public.clinical_notes IS 'Notas clínicas realizadas por doctores sobre pacientes';
COMMENT ON COLUMN public.clinical_notes.id_patient IS 'UUID del paciente';
COMMENT ON COLUMN public.clinical_notes.id_doctor IS 'UUID del doctor que creó la nota';
COMMENT ON COLUMN public.clinical_notes.id_screening IS 'UUID opcional del tamizaje asociado';
COMMENT ON COLUMN public.clinical_notes.note_type IS 'Tipo de nota: general, evaluacion, seguimiento, emergencia';
COMMENT ON COLUMN public.clinical_notes.title_note IS 'Título de la nota clínica';
COMMENT ON COLUMN public.clinical_notes.description_note IS 'Descripción detallada de la nota';
COMMENT ON COLUMN public.clinical_notes.diagnosis IS 'Diagnóstico asociado si aplica';
COMMENT ON COLUMN public.clinical_notes.treatment IS 'Tratamiento recomendado si aplica';
COMMENT ON COLUMN public.clinical_notes.observations IS 'Observaciones adicionales';
COMMENT ON COLUMN public.clinical_notes.is_active IS 'Indica si la nota está activa o archivada';
COMMENT ON COLUMN public.clinical_notes.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN public.clinical_notes.updated_at IS 'Fecha de última actualización';

-- Seguridad
ALTER TABLE public.clinical_notes DISABLE ROW LEVEL SECURITY;
GRANT ALL ON public.clinical_notes TO anon, authenticated, service_role;
