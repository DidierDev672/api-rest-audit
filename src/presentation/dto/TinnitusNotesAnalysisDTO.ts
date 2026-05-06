import { z } from 'zod';

export const CreateTinnitusNotesAnalysisSchema = z.object({
  id_patient: z.string().uuid('El ID del paciente debe ser un UUID válido'),
  id_tinnitus_questionnaires: z.string().uuid().optional(),
  id_tinnitus_response: z.string().uuid().optional(),
  analysis: z.string().min(1, 'El análisis es requerido'),
  note_count: z.number().int().positive().optional(),
  analyzed_at: z.string().datetime().optional(),
});

export type CreateTinnitusNotesAnalysisDTO = z.infer<typeof CreateTinnitusNotesAnalysisSchema>;
