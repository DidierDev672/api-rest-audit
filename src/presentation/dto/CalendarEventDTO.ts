import { z } from 'zod';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const timeRegex = /^\d{2}:\d{2}$/;

export const CreateCalendarEventSchema = z.object({
  type: z.enum(['task', 'research'], { required_error: 'type es requerido (task | research)' }),
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().default(''),
  startDate: z.string().regex(dateRegex, 'startDate debe ser YYYY-MM-DD'),
  endDate: z.string().regex(dateRegex, 'endDate debe ser YYYY-MM-DD'),
  startTime: z.string().regex(timeRegex, 'startTime debe ser HH:mm'),
  endTime: z.string().regex(timeRegex, 'endTime debe ser HH:mm'),
  researchId: z.string().uuid('researchId debe ser un UUID válido').nullable().optional(),
});

export const UpdateCalendarEventSchema = z.object({
  type: z.enum(['task', 'research']).optional(),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  startDate: z.string().regex(dateRegex, 'startDate debe ser YYYY-MM-DD').optional(),
  endDate: z.string().regex(dateRegex, 'endDate debe ser YYYY-MM-DD').optional(),
  startTime: z.string().regex(timeRegex, 'startTime debe ser HH:mm').optional(),
  endTime: z.string().regex(timeRegex, 'endTime debe ser HH:mm').optional(),
  researchId: z.string().uuid('researchId debe ser un UUID válido').nullable().optional(),
});

export const CalendarEventQuerySchema = z.object({
  from: z.string().regex(dateRegex, 'from debe ser YYYY-MM-DD').optional(),
  to: z.string().regex(dateRegex, 'to debe ser YYYY-MM-DD').optional(),
});

export const CreateCalendarEventDTO = CreateCalendarEventSchema;
export const UpdateCalendarEventDTO = UpdateCalendarEventSchema;
export const CalendarEventQueryDTO = CalendarEventQuerySchema;

export type CreateCalendarEventDTO = z.infer<typeof CreateCalendarEventSchema>;
export type UpdateCalendarEventDTO = z.infer<typeof UpdateCalendarEventSchema>;
export type CalendarEventQueryDTO = z.infer<typeof CalendarEventQuerySchema>;
