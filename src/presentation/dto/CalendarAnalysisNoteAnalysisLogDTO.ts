import { z } from 'zod';

export const CreateCalendarAnalysisNoteAnalysisLogSchema = z.object({
  calendar_ai_analysis_id: z
    .string()
    .uuid('calendar_ai_analysis_id debe ser un UUID válido'),
  analysis: z.string().min(1, 'El análisis es requerido'),
  note_count: z.number().int().min(0),
  model: z.string().optional().nullable(),
  analyzed_at: z.string().datetime({ message: 'analyzed_at debe ser ISO 8601' }).optional(),
});

export const CalendarAnalysisNoteAnalysisLogQuerySchema = z.object({
  calendar_ai_analysis_id: z.string().uuid().optional(),
});

export const CreateCalendarAnalysisNoteAnalysisLogDTO =
  CreateCalendarAnalysisNoteAnalysisLogSchema;
export const CalendarAnalysisNoteAnalysisLogQueryDTO =
  CalendarAnalysisNoteAnalysisLogQuerySchema;
