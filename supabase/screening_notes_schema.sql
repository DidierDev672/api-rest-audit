-- =====================================================
-- SCHEMA SUPABASE - SCREENING NOTES
-- Sistema de Tamizaje Auditivo
-- =====================================================

-- TABLA: screening_notes
-- Almacena las notas de los doctores sobre las respuestas de los tamizajes
CREATE TABLE IF NOT EXISTS public.screening_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_patient UUID NOT NULL,
    id_screening UUID NOT NULL,
    id_doctor UUID NOT NULL,
    title_note VARCHAR(255) NOT NULL,
    description_note TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_screening_notes_patient ON public.screening_notes(id_patient);
CREATE INDEX IF NOT EXISTS idx_screening_notes_screening ON public.screening_notes(id_screening);
CREATE INDEX IF NOT EXISTS idx_screening_notes_doctor ON public.screening_notes(id_doctor);
CREATE INDEX IF NOT EXISTS idx_screening_notes_patient_screening ON public.screening_notes(id_patient, id_screening);

-- Comentarios
COMMENT ON TABLE public.screening_notes IS 'Notas de doctores sobre las respuestas de tamizajes';
COMMENT ON COLUMN public.screening_notes.id_patient IS 'UUID del paciente';
COMMENT ON COLUMN public.screening_notes.id_screening IS 'UUID del tamizaje';
COMMENT ON COLUMN public.screening_notes.id_doctor IS 'UUID del doctor que creó la nota';
COMMENT ON COLUMN public.screening_notes.title_note IS 'Título de la nota';
COMMENT ON COLUMN public.screening_notes.description_note IS 'Descripción o contenido de la nota';
COMMENT ON COLUMN public.screening_notes.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN public.screening_notes.updated_at IS 'Fecha de última actualización';

-- Seguridad
ALTER TABLE public.screening_notes DISABLE ROW LEVEL SECURITY;
GRANT ALL ON public.screening_notes TO anon, authenticated, service_role;
