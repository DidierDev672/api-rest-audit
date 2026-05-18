-- Tareas programadas vinculadas al calendario (recordatorios / notificaciones)
CREATE TABLE IF NOT EXISTS calendar_scheduled_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  calendar_event_id UUID REFERENCES calendar_events(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL DEFAULT '',
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'processing', 'sent', 'failed', 'cancelled')),
  channel VARCHAR(20) NOT NULL DEFAULT 'in_app'
    CHECK (channel IN ('in_app', 'webhook', 'n8n')),
  reminder_minutes_before INTEGER,
  metadata JSONB DEFAULT '{}'::jsonb,
  sent_at TIMESTAMP WITH TIME ZONE,
  last_error TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE calendar_scheduled_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for calendar_scheduled_tasks"
  ON calendar_scheduled_tasks FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX idx_calendar_scheduled_tasks_status_scheduled_at
  ON calendar_scheduled_tasks(status, scheduled_at);

CREATE INDEX idx_calendar_scheduled_tasks_calendar_event_id
  ON calendar_scheduled_tasks(calendar_event_id);

CREATE INDEX idx_calendar_scheduled_tasks_scheduled_at
  ON calendar_scheduled_tasks(scheduled_at);

-- Registro de notificaciones entregadas
CREATE TABLE IF NOT EXISTS calendar_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scheduled_task_id UUID REFERENCES calendar_scheduled_tasks(id) ON DELETE SET NULL,
  calendar_event_id UUID REFERENCES calendar_events(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL DEFAULT '',
  channel VARCHAR(20) NOT NULL DEFAULT 'in_app'
    CHECK (channel IN ('in_app', 'webhook', 'n8n')),
  status VARCHAR(20) NOT NULL DEFAULT 'delivered'
    CHECK (status IN ('delivered', 'failed')),
  payload JSONB DEFAULT '{}'::jsonb,
  delivered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE calendar_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for calendar_notifications"
  ON calendar_notifications FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX idx_calendar_notifications_scheduled_task_id
  ON calendar_notifications(scheduled_task_id);

CREATE INDEX idx_calendar_notifications_calendar_event_id
  ON calendar_notifications(calendar_event_id);

CREATE INDEX idx_calendar_notifications_delivered_at
  ON calendar_notifications(delivered_at DESC);
