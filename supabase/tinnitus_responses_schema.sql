-- =====================================================
-- SCHEMA SUPABASE - TINNITUS RESPONSE
-- Sistema de Tamizaje Auditivo
-- =====================================================

-- TABLA: tinnitus_responses
-- Almacena las respuestas de los cuestionarios de tinnitus
CREATE TABLE IF NOT EXISTS public.tinnitus_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_patient UUID NOT NULL,
    id_tinnitus_questionnaires UUID NOT NULL,
    answer JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_patient FOREIGN KEY (id_patient) REFERENCES public.patients(id) ON DELETE CASCADE,
    CONSTRAINT fk_tinnitus_questionnaire FOREIGN KEY (id_tinnitus_questionnaires) REFERENCES public.tinnitus_questionnaires(id) ON DELETE CASCADE
);

-- Índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_tinnitus_responses_patient ON public.tinnitus_responses(id_patient);
CREATE INDEX IF NOT EXISTS idx_tinnitus_responses_questionnaire ON public.tinnitus_responses(id_tinnitus_questionnaires);
CREATE INDEX IF NOT EXISTS idx_tinnitus_responses_created ON public.tinnitus_responses(created_at);

-- Comentarios
COMMENT ON TABLE public.tinnitus_responses IS 'Respuestas de cuestionarios de tinnitus';
COMMENT ON COLUMN public.tinnitus_responses.id_patient IS 'UUID del paciente';
COMMENT ON COLUMN public.tinnitus_responses.id_tinnitus_questionnaires IS 'UUID del cuestionario de tinnitus';
COMMENT ON COLUMN public.tinnitus_responses.answer IS 'Arreglo de respuestas (JSONB)';
COMMENT ON COLUMN public.tinnitus_responses.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN public.tinnitus_responses.updated_at IS 'Fecha de última actualización';

-- Seguridad
ALTER TABLE public.tinnitus_responses DISABLE ROW LEVEL SECURITY;
GRANT ALL ON public.tinnitus_responses TO anon, authenticated, service_role;