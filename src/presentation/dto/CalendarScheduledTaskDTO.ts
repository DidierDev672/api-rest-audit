import { z } from 'zod';
import {
  CALENDAR_NOTIFICATION_CHANNELS,
  CALENDAR_SCHEDULED_TASK_STATUSES,
} from '../../domain/enums/CalendarScheduledTaskStatus';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const CreateCalendarScheduledTaskSchema = z
  .object({
    calendarEventId: z
      .string()
      .uuid('calendarEventId debe ser un UUID válido')
      .nullable()
      .optional(),
    title: z.string().min(1, 'El título es requerido').optional(),
    message: z.string().optional(),
    scheduledAt: z
      .string()
      .datetime({ offset: true, message: 'scheduledAt debe ser ISO 8601' })
      .optional(),
    reminderMinutesBefore: z
      .number()
      .int()
      .min(0, 'reminderMinutesBefore debe ser >= 0')
      .max(10080, 'reminderMinutesBefore no puede superar 7 días')
      .optional(),
    channel: z.enum(CALENDAR_NOTIFICATION_CHANNELS).optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .refine((data) => data.scheduledAt || data.reminderMinutesBefore !== undefined, {
    message: 'Debe indicar scheduledAt o reminderMinutesBefore',
    path: ['scheduledAt'],
  });

export const UpdateCalendarScheduledTaskSchema = z.object({
  title: z.string().min(1).optional(),
  message: z.string().optional(),
  scheduledAt: z
    .string()
    .datetime({ offset: true, message: 'scheduledAt debe ser ISO 8601' })
    .optional(),
  status: z.enum(['pending', 'cancelled']).optional(),
  channel: z.enum(CALENDAR_NOTIFICATION_CHANNELS).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const CalendarScheduledTaskQuerySchema = z.object({
  calendarEventId: z.string().uuid().optional(),
  status: z.enum(CALENDAR_SCHEDULED_TASK_STATUSES).optional(),
  from: z.string().regex(dateRegex, 'from debe ser YYYY-MM-DD').optional(),
  to: z.string().regex(dateRegex, 'to debe ser YYYY-MM-DD').optional(),
});

export const CalendarNotificationQuerySchema = z.object({
  calendarEventId: z.string().uuid().optional(),
  scheduledTaskId: z.string().uuid().optional(),
  from: z.string().regex(dateRegex, 'from debe ser YYYY-MM-DD').optional(),
  to: z.string().regex(dateRegex, 'to debe ser YYYY-MM-DD').optional(),
});

export const ProcessDueTasksSchema = z.object({
  limit: z.coerce.number().int().min(1).max(200).optional(),
});

export const CreateCalendarScheduledTaskDTO = CreateCalendarScheduledTaskSchema;
export const UpdateCalendarScheduledTaskDTO = UpdateCalendarScheduledTaskSchema;
export const CalendarScheduledTaskQueryDTO = CalendarScheduledTaskQuerySchema;
export const CalendarNotificationQueryDTO = CalendarNotificationQuerySchema;
export const ProcessDueTasksDTO = ProcessDueTasksSchema;
