import { z } from 'zod';

export const CreateTinnitusNoteSchema = z.object({
  id_patient: z.string().uuid('El ID del paciente debe ser un UUID válido'),
  id_tinnitus_questionnaires: z.string().uuid('El ID del cuestionario de tinnitus debe ser un UUID válido'),
  id_tinnitus_response: z.string().uuid('El ID de la respuesta de tinnitus debe ser un UUID válido'),
  description: z.string().min(1, 'La descripción es requerida').refine(val => val.trim().length > 0, {
    message: 'La descripción no puede estar vacía',
  }),
  color: z.string().optional(),
  source: z.string().optional(),
});

export const UpdateTinnitusNoteSchema = z.object({
  id_patient: z.string().uuid().optional(),
  id_tinnitus_questionnaires: z.string().uuid().optional(),
  id_tinnitus_response: z.string().uuid().optional(),
  description: z.string().min(1).refine(val => val.trim().length > 0, {
    message: 'La descripción no puede estar vacía',
  }).optional(),
  color: z.string().optional(),
  source: z.string().optional(),
});

export type CreateTinnitusNoteDTO = z.infer<typeof CreateTinnitusNoteSchema>;
export type UpdateTinnitusNoteDTO = z.infer<typeof UpdateTinnitusNoteSchema>;