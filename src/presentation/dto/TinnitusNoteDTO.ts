import { z } from 'zod';

export const CreateTinnitusNoteSchema = z.object({
  id_patient: z.string().uuid('El ID del paciente debe ser un UUID válido'),
  id_tinnitus_questionnaires: z.string().uuid('El ID del cuestionario de tinnitus debe ser un UUID válido'),
  id_tinnitus_response: z.string().uuid('El ID de la respuesta de tinnitus debe ser un UUID válido'),
  description: z.string().min(1, 'La descripción es requerida'),
});

export const UpdateTinnitusNoteSchema = z.object({
  id_patient: z.string().uuid().optional(),
  id_tinnitus_questionnaires: z.string().uuid().optional(),
  id_tinnitus_response: z.string().uuid().optional(),
  description: z.string().min(1).optional(),
});

export type CreateTinnitusNoteDTO = z.infer<typeof CreateTinnitusNoteSchema>;
export type UpdateTinnitusNoteDTO = z.infer<typeof UpdateTinnitusNoteSchema>;