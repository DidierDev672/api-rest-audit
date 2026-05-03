-- =====================================================
-- SCHEMA SUPABASE - SCREENING RESPONSES
-- Sistema de Tamizaje Auditivo
-- =====================================================

-- TABLA: screening_responses
-- Almacena las respuestas de los pacientes al tamizaje
CREATE TABLE IF NOT EXISTS public.screening_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_patient UUID NOT NULL,
    id_screening UUID NOT NULL,
    options_answer JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_screening_responses_patient ON public.screening_responses(id_patient);
CREATE INDEX IF NOT EXISTS idx_screening_responses_screening ON public.screening_responses(id_screening);
CREATE INDEX IF NOT EXISTS idx_screening_responses_patient_screening ON public.screening_responses(id_patient, id_screening);

-- Comentarios
COMMENT ON TABLE public.screening_responses IS 'Respuestas de pacientes al tamizaje auditivo';
COMMENT ON COLUMN public.screening_responses.id_patient IS 'UUID del paciente';
COMMENT ON COLUMN public.screening_responses.id_screening IS 'UUID del tamizaje';
COMMENT ON COLUMN public.screening_responses.options_answer IS 'Arreglo de respuestas: [{id, text, value}]';
COMMENT ON COLUMN public.screening_responses.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN public.screening_responses.updated_at IS 'Fecha de última actualización';

-- Restricciones
ALTER TABLE public.screening_responses ADD CONSTRAINT chk_options_answer_not_empty 
    CHECK (jsonb_array_length(options_answer) > 0);

-- Seguridad
ALTER TABLE public.screening_responses DISABLE ROW LEVEL SECURITY;
GRANT ALL ON public.screening_responses TO anon, authenticated, service_role;
