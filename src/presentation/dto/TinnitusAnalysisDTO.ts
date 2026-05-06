import { z } from 'zod';

export const CreateTinnitusAnalysisSchema = z.object({
  id_patient: z.string().uuid('ID de paciente inválido'),
  id_tinnitus_questionnaires: z.string().uuid('ID de cuestionario inválido'),
  id_tinnitus_response: z.string().uuid('ID de respuesta inválido'),
  analysis: z.string().min(1, 'El análisis es requerido'),
  model: z.string().min(1, 'El modelo es requerido'),
});

export const UpdateTinnitusAnalysisSchema = z.object({
  id_patient: z.string().uuid('ID de paciente inválido').optional(),
  id_tinnitus_questionnaires: z.string().uuid('ID de cuestionario inválido').optional(),
  id_tinnitus_response: z.string().uuid('ID de respuesta inválido').optional(),
  analysis: z.string().min(1, 'El análisis no puede estar vacío').optional(),
  model: z.string().min(1, 'El modelo no puede estar vacío').optional(),
});

export type CreateTinnitusAnalysisDTO = z.infer<typeof CreateTinnitusAnalysisSchema>;
export type UpdateTinnitusAnalysisDTO = z.infer<typeof UpdateTinnitusAnalysisSchema>;