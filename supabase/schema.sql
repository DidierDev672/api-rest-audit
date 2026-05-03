-- Tablas para la API de Salud Auditiva

-- Tabla de Investigaciones Auditivas
CREATE TABLE IF NOT EXISTS auditory_research (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Cuestionarios de Tinnitus
CREATE TABLE IF NOT EXISTS tinnitus_questionnaires (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  questions JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Tamizajes Auditivos
CREATE TABLE IF NOT EXISTS screenings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  sound VARCHAR(500) NOT NULL,
  options_answer JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Sonidos Relajantes
CREATE TABLE IF NOT EXISTS relaxing_sounds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  sound VARCHAR(500) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Pacientes Médicos
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  document_type VARCHAR(50) NOT NULL CHECK (document_type IN ('Tarjeta de Identidad', 'Cedula de ciudadania', 'Pasaporte', 'Tarjeta de extranjero')),
  document_number VARCHAR(50) NOT NULL UNIQUE,
  birth_date DATE NOT NULL,
  height DECIMAL(5,2) NOT NULL,
  weight DECIMAL(5,2) NOT NULL,
  is_allergic BOOLEAN NOT NULL DEFAULT false,
  family_data JSONB NOT NULL DEFAULT '{"father": {"fullName": "", "age": 0, "diseases": []}, "mother": {"fullName": "", "age": 0, "diseases": []}}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Asignación de Cuestionarios de Tinnitus a Pacientes
CREATE TABLE IF NOT EXISTS patient_tinnitus_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_patient UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  id_tinnitus UUID NOT NULL REFERENCES tinnitus_questionnaires(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(id_patient, id_tinnitus)
);

-- Habilitar Row Level Security (opcional)
ALTER TABLE auditory_research ENABLE ROW LEVEL SECURITY;
ALTER TABLE tinnitus_questionnaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE screenings ENABLE ROW LEVEL SECURITY;
ALTER TABLE relaxing_sounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_tinnitus_assignments ENABLE ROW LEVEL SECURITY;

-- Políticas públicas para desarrollo (ajustar para producción)
CREATE POLICY "Allow all for auditory_research" ON auditory_research FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for tinnitus_questionnaires" ON tinnitus_questionnaires FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for screenings" ON screenings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for relaxing_sounds" ON relaxing_sounds FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for patients" ON patients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for patient_tinnitus_assignments" ON patient_tinnitus_assignments FOR ALL USING (true) WITH CHECK (true);

-- Índices para mejorar rendimiento
CREATE INDEX idx_auditory_research_created_at ON auditory_research(created_at DESC);
CREATE INDEX idx_tinnitus_questionnaires_created_at ON tinnitus_questionnaires(created_at DESC);
CREATE INDEX idx_screenings_created_at ON screenings(created_at DESC);
CREATE INDEX idx_relaxing_sounds_created_at ON relaxing_sounds(created_at DESC);
CREATE INDEX idx_patients_created_at ON patients(created_at DESC);
CREATE INDEX idx_patients_document_number ON patients(document_number);
CREATE INDEX idx_patients_document_type ON patients(document_type);
CREATE INDEX idx_patient_tinnitus_assignments_id_patient ON patient_tinnitus_assignments(id_patient);
CREATE INDEX idx_patient_tinnitus_assignments_id_tinnitus ON patient_tinnitus_assignments(id_tinnitus);
CREATE INDEX idx_patient_tinnitus_assignments_created_at ON patient_tinnitus_assignments(created_at DESC);

-- Tabla de Login de Pacientes
CREATE TABLE IF NOT EXISTS patient_login (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_patient UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  permits TEXT[] NOT NULL DEFAULT ARRAY['patient'],
  token VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security para patient_login
ALTER TABLE patient_login ENABLE ROW LEVEL SECURITY;

-- Políticas para patient_login
CREATE POLICY "Allow all for patient_login" ON patient_login FOR ALL USING (true) WITH CHECK (true);

-- Índices para patient_login
CREATE INDEX idx_patient_login_email ON patient_login(email);
CREATE INDEX idx_patient_login_username ON patient_login(username);
CREATE INDEX idx_patient_login_token ON patient_login(token);
CREATE INDEX idx_patient_login_id_patient ON patient_login(id_patient);
