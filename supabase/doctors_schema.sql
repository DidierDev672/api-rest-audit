-- =====================================================
-- SCHEMA SUPABASE - DOCTORS (Médicos)
-- Sistema de Tamizaje Auditivo
-- =====================================================

-- TABLA: doctors
-- Almacena los datos básicos de los médicos
CREATE TABLE IF NOT EXISTS public.doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_type VARCHAR(50) NOT NULL,
    document_number VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    gender VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_doctors_document ON public.doctors(document_number);
CREATE INDEX IF NOT EXISTS idx_doctors_email ON public.doctors(email);
CREATE INDEX IF NOT EXISTS idx_doctors_full_name ON public.doctors(full_name);

-- Comentarios
COMMENT ON TABLE public.doctors IS 'Datos básicos de los médicos';
COMMENT ON COLUMN public.doctors.document_type IS 'Tipo de documento: CC, CE, PA, TI';
COMMENT ON COLUMN public.doctors.document_number IS 'Número de documento único';
COMMENT ON COLUMN public.doctors.full_name IS 'Nombres y apellidos completos';
COMMENT ON COLUMN public.doctors.birth_date IS 'Fecha de nacimiento';
COMMENT ON COLUMN public.doctors.gender IS 'Sexo: M, F,Otro';
COMMENT ON COLUMN public.doctors.email IS 'Correo electrónico único';
COMMENT ON COLUMN public.doctors.phone IS 'Teléfono de contacto';
COMMENT ON COLUMN public.doctors.address IS 'Dirección de residencia';
COMMENT ON COLUMN public.doctors.is_active IS 'Indica si el médico está activo';
COMMENT ON COLUMN public.doctors.created_at IS 'Fecha de creación del registro';
COMMENT ON COLUMN public.doctors.updated_at IS 'Fecha de última actualización';

-- Seguridad
ALTER TABLE public.doctors DISABLE ROW LEVEL SECURITY;
GRANT ALL ON public.doctors TO anon, authenticated, service_role;
