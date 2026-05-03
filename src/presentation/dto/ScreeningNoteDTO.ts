import { z } from 'zod';

export const CreateScreeningNoteSchema = z.object({
  id_patient: z.string().uuid('El ID del paciente debe ser un UUID válido'),
  id_screening: z.string().uuid('El ID del tamizaje debe ser un UUID válido'),
  id_doctor: z.string().uuid('El ID del doctor debe ser un UUID válido'),
  title_note: z.string().min(1, 'El título es requerido').max(255, 'El título no puede exceder 255 caracteres'),
  description_note: z.string().min(1, 'La descripción es requerida'),
});

export const UpdateScreeningNoteSchema = z.object({
  id_patient: z.string().uuid().optional(),
  id_screening: z.string().uuid().optional(),
  id_doctor: z.string().uuid().optional(),
  title_note: z.string().min(1).max(255).optional(),
  description_note: z.string().min(1).optional(),
});

export type CreateScreeningNoteDTO = z.infer<typeof CreateScreeningNoteSchema>;
export type UpdateScreeningNoteDTO = z.infer<typeof UpdateScreeningNoteSchema>;
