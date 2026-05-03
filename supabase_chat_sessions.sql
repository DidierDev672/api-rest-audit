-- Schema de Supabase para Chat Sessions
-- Ejecutar en el SQL Editor de Supabase

-- Tabla de sesiones de chat
CREATE TABLE IF NOT EXISTS research_chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  research_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  original_description TEXT,
  summary TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de mensajes del chat
CREATE TABLE IF NOT EXISTS research_chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES research_chat_sessions(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL
);

-- Tabla de metadata de sesiones
CREATE TABLE IF NOT EXISTS research_chat_session_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL UNIQUE REFERENCES research_chat_sessions(id) ON DELETE CASCADE,
  total_messages INTEGER DEFAULT 0,
  total_user_messages INTEGER DEFAULT 0,
  total_assistant_messages INTEGER DEFAULT 0,
  duration INTEGER DEFAULT 0,
  ai_model VARCHAR(100)
);

-- Habilitar RLS
ALTER TABLE research_chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_chat_session_metadata ENABLE ROW LEVEL SECURITY;

-- Politicas RLS
CREATE POLICY "Allow all on research_chat_sessions" ON research_chat_sessions FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on research_chat_messages" ON research_chat_messages FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on research_chat_session_metadata" ON research_chat_session_metadata FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Indices
CREATE INDEX idx_chat_sessions_research_id ON research_chat_sessions(research_id);
CREATE INDEX idx_chat_messages_session_id ON research_chat_messages(session_id);
CREATE INDEX idx_chat_metadata_session_id ON research_chat_session_metadata(session_id);