-- Tabla de Análisis IA asociados a eventos de calendario
CREATE TABLE IF NOT EXISTS calendar_ai_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  calendar_event_id UUID REFERENCES calendar_events(id) ON DELETE SET NULL,
  research_id UUID REFERENCES auditory_research(id) ON DELETE SET NULL,
  event_title VARCHAR(255) NOT NULL,
  event_type VARCHAR(20) NOT NULL CHECK (event_type IN ('task', 'research')),
  event_date DATE NOT NULL,
  research_name VARCHAR(255),
  content TEXT NOT NULL,
  model VARCHAR(100),
  generated_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE calendar_ai_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for calendar_ai_analyses" ON calendar_ai_analyses FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX idx_calendar_ai_analyses_event_id ON calendar_ai_analyses(calendar_event_id);
CREATE INDEX idx_calendar_ai_analyses_research_id ON calendar_ai_analyses(research_id);
CREATE INDEX idx_calendar_ai_analyses_event_date ON calendar_ai_analyses(event_date);
CREATE INDEX idx_calendar_ai_analyses_created_at ON calendar_ai_analyses(created_at DESC);
