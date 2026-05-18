export const CALENDAR_SCHEDULED_TASK_STATUSES = [
  'pending',
  'processing',
  'sent',
  'failed',
  'cancelled',
] as const;

export type CalendarScheduledTaskStatus =
  (typeof CALENDAR_SCHEDULED_TASK_STATUSES)[number];

export const CALENDAR_NOTIFICATION_CHANNELS = [
  'in_app',
  'webhook',
  'n8n',
] as const;

export type CalendarNotificationChannel =
  (typeof CALENDAR_NOTIFICATION_CHANNELS)[number];

export const CALENDAR_NOTIFICATION_STATUSES = [
  'delivered',
  'failed',
] as const;

export type CalendarNotificationStatus =
  (typeof CALENDAR_NOTIFICATION_STATUSES)[number];
