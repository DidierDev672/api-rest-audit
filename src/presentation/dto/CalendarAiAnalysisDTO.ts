import { z } from 'zod';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const CreateCalendarAiAnalysisSchema = z.object({
  calendarEventId: z.string().min(1, 'calendarEventId es requerido'),
  researchId: z.union([z.string(), z.number()]).nullable().optional(),
  eventTitle: z.string().min(1, 'eventTitle es requerido'),
  eventType: z.enum(['task', 'research'], { required_error: 'eventType es requerido (task | research)' }),
  eventDate: z.string().regex(dateRegex, 'eventDate debe ser YYYY-MM-DD'),
  researchName: z.string().nullable().optional(),
  content: z.string().min(10, 'content debe tener al menos 10 caracteres'),
  model: z.string().nullable().optional(),
  generatedAt: z.string().datetime({ message: 'generatedAt debe ser ISO 8601' }),
});

export const CalendarAiAnalysisQuerySchema = z.object({
  calendarEventId: z.string().optional(),
  researchId: z.string().optional(),
  from: z.string().regex(dateRegex, 'from debe ser YYYY-MM-DD').optional(),
  to: z.string().regex(dateRegex, 'to debe ser YYYY-MM-DD').optional(),
});

export const UpdateCalendarAiAnalysisSchema = z
  .object({
    eventTitle: z.string().min(1, 'eventTitle es requerido').optional(),
    researchName: z.string().nullable().optional(),
    content: z.string().min(10, 'content debe tener al menos 10 caracteres').optional(),
    eventDate: z.string().regex(dateRegex, 'eventDate debe ser YYYY-MM-DD').optional(),
  })
  .refine(
    (data) =>
      data.eventTitle !== undefined ||
      data.researchName !== undefined ||
      data.content !== undefined ||
      data.eventDate !== undefined,
    { message: 'Debe enviar al menos un campo para actualizar' },
  );

export const CreateCalendarAiAnalysisDTO = CreateCalendarAiAnalysisSchema;
export const CalendarAiAnalysisQueryDTO = CalendarAiAnalysisQuerySchema;
export const UpdateCalendarAiAnalysisDTO = UpdateCalendarAiAnalysisSchema;

export type CreateCalendarAiAnalysisDTO = z.infer<typeof CreateCalendarAiAnalysisSchema>;
export type CalendarAiAnalysisQueryDTO = z.infer<typeof CalendarAiAnalysisQuerySchema>;
export type UpdateCalendarAiAnalysisDTO = z.infer<typeof UpdateCalendarAiAnalysisSchema>;
