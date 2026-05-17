-- Tabla de Eventos de Calendario (agenda unificada)
CREATE TABLE IF NOT EXISTS calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(20) NOT NULL CHECK (type IN ('task', 'research')),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  start_time VARCHAR(5) NOT NULL,
  end_time VARCHAR(5) NOT NULL,
  research_id UUID REFERENCES auditory_research(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT check_date_range CHECK (end_date >= start_date)
);

ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for calendar_events" ON calendar_events FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX idx_calendar_events_start_date ON calendar_events(start_date);
CREATE INDEX idx_calendar_events_end_date ON calendar_events(end_date);
CREATE INDEX idx_calendar_events_date_range ON calendar_events(start_date, end_date);
CREATE INDEX idx_calendar_events_research_id ON calendar_events(research_id);
CREATE INDEX idx_calendar_events_type ON calendar_events(type);
