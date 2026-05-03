-- =====================================================
-- SCHEMA SUPABASE - DOCTOR PROFESSIONAL DATA
-- Sistema de Tamizaje Auditivo
-- =====================================================

-- TABLA: doctor_professional_data
-- Almacena los datos profesionales de los médicos
CREATE TABLE IF NOT EXISTS public.doctor_professional_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_doctor UUID NOT NULL REFERENCES public.doctors(id) ON DELETE CASCADE,
    professional_title VARCHAR(100) NOT NULL,
    university VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    graduation_year INTEGER NOT NULL,
    professional_card_number VARCHAR(50) NOT NULL UNIQUE,
    rethus_registration VARCHAR(50) NOT NULL UNIQUE,
    registration_status VARCHAR(20) NOT NULL DEFAULT 'active',
    medical_specialty VARCHAR(100),
    subspecialty VARCHAR(100),
    additional_certifications JSONB DEFAULT '[]',
    diploma_url TEXT,
    degree_certificate_url TEXT,
    specialty_certificates_url JSONB DEFAULT '[]',
    is_verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_doctor_professional_doctor ON public.doctor_professional_data(id_doctor);
CREATE INDEX IF NOT EXISTS idx_doctor_professional_rethus ON public.doctor_professional_data(rethus_registration);
CREATE INDEX IF NOT EXISTS idx_doctor_professional_card ON public.doctor_professional_data(professional_card_number);
CREATE INDEX IF NOT EXISTS idx_doctor_professional_specialty ON public.doctor_professional_data(medical_specialty);

-- Comentarios
COMMENT ON TABLE public.doctor_professional_data IS 'Datos profesionales y de formación de los médicos';
COMMENT ON COLUMN public.doctor_professional_data.id_doctor IS 'UUID del médico (FK a doctors)';
COMMENT ON COLUMN public.doctor_professional_data.professional_title IS 'Título profesional: Médico general, Especialista, etc.';
COMMENT ON COLUMN public.doctor_professional_data.university IS 'Universidad de egreso';
COMMENT ON COLUMN public.doctor_professional_data.country IS 'País de formación';
COMMENT ON COLUMN public.doctor_professional_data.graduation_year IS 'Año de graduación';
COMMENT ON COLUMN public.doctor_professional_data.professional_card_number IS 'Número de tarjeta profesional';
COMMENT ON COLUMN public.doctor_professional_data.rethus_registration IS 'Registro en RETHUS (obligatorio para ejercer)';
COMMENT ON COLUMN public.doctor_professional_data.registration_status IS 'Estado del registro: active, inactive, suspended';
COMMENT ON COLUMN public.doctor_professional_data.medical_specialty IS 'Especialidad médica';
COMMENT ON COLUMN public.doctor_professional_data.subspecialty IS 'Subespecialidad (opcional)';
COMMENT ON COLUMN public.doctor_professional_data.additional_certifications IS 'Certificaciones adicionales en JSON';
COMMENT ON COLUMN public.doctor_professional_data.diploma_url IS 'URL del diploma (LocalStorage)';
COMMENT ON COLUMN public.doctor_professional_data.degree_certificate_url IS 'URL del acta de grado (LocalStorage)';
COMMENT ON COLUMN public.doctor_professional_data.specialty_certificates_url IS 'URLs de certificados de especialidad (LocalStorage)';
COMMENT ON COLUMN public.doctor_professional_data.is_verified IS 'Indica si los documentos han sido verificados';
COMMENT ON COLUMN public.doctor_professional_data.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN public.doctor_professional_data.updated_at IS 'Fecha de última actualización';

-- Seguridad
ALTER TABLE public.doctor_professional_data DISABLE ROW LEVEL SECURITY;
GRANT ALL ON public.doctor_professional_data TO anon, authenticated, service_role;
