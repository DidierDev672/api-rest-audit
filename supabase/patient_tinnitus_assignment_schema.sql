-- =====================================================
-- SCHEMA SUPABASE - PATIENT TINNITUS ASSIGNMENT
-- Sistema de Tamizaje Auditivo
-- =====================================================

-- TABLA: patient_tinnitus_assignments
-- Asigna cuestionarios de tinnitus a pacientes
CREATE TABLE IF NOT EXISTS public.patient_tinnitus_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_patient UUID NOT NULL,
    id_tinnitus_questionnaires UUID NOT NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'discontinued')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_patient FOREIGN KEY (id_patient) REFERENCES public.patients(id) ON DELETE CASCADE,
    CONSTRAINT fk_tinnitus_questionnaire FOREIGN KEY (id_tinnitus_questionnaires) REFERENCES public.tinnitus_questionnaires(id) ON DELETE CASCADE
);

-- Índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_patient_tinnitus_patient ON public.patient_tinnitus_assignments(id_patient);
CREATE INDEX IF NOT EXISTS idx_patient_tinnitus_questionnaire ON public.patient_tinnitus_assignments(id_tinnitus_questionnaires);
CREATE INDEX IF NOT EXISTS idx_patient_tinnitus_status ON public.patient_tinnitus_assignments(status);

-- Comentarios
COMMENT ON TABLE public.patient_tinnitus_assignments IS 'Asignación de cuestionarios de tinnitus a pacientes';
COMMENT ON COLUMN public.patient_tinnitus_assignments.id_patient IS 'UUID del paciente';
COMMENT ON COLUMN public.patient_tinnitus_assignments.id_tinnitus_questionnaires IS 'UUID del cuestionario de tinnitus';
COMMENT ON COLUMN public.patient_tinnitus_assignments.status IS 'Estado de la asignación: active, inactive, discontinued';
COMMENT ON COLUMN public.patient_tinnitus_assignments.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN public.patient_tinnitus_assignments.updated_at IS 'Fecha de última actualización';

-- Seguridad
ALTER TABLE public.patient_tinnitus_assignments DISABLE ROW LEVEL SECURITY;
GRANT ALL ON public.patient_tinnitus_assignments TO anon, authenticated, service_role;
