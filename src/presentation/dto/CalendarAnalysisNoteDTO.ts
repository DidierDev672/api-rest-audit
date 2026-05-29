import { z } from 'zod';

export const CreateCalendarAnalysisNoteSchema = z.object({
  calendar_ai_analysis_id: z
    .string()
    .uuid('calendar_ai_analysis_id debe ser un UUID válido'),
  content: z.string().min(1, 'El contenido es requerido'),
  color: z.string().min(1, 'El color es requerido'),
  color_name: z.string().min(1, 'El nombre del color es requerido'),
  created_at: z.string().datetime({ message: 'created_at debe ser ISO 8601' }).optional(),
});

export const CalendarAnalysisNoteQuerySchema = z.object({
  calendar_ai_analysis_id: z.string().uuid().optional(),
});

export const CreateCalendarAnalysisNoteDTO = CreateCalendarAnalysisNoteSchema;
export const CalendarAnalysisNoteQueryDTO = CalendarAnalysisNoteQuerySchema;

export type CreateCalendarAnalysisNoteDTO = z.infer<typeof CreateCalendarAnalysisNoteSchema>;
export type CalendarAnalysisNoteQueryDTO = z.infer<typeof CalendarAnalysisNoteQuerySchema>;
