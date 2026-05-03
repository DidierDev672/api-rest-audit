import { z } from 'zod';

export const CreateRelaxingSoundSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  sound: z.string().min(1, 'El sonido es requerido'),
});

export const UpdateRelaxingSoundSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  sound: z.string().min(1).optional(),
});

export const CreateRelaxingSoundDTO = CreateRelaxingSoundSchema;
export const UpdateRelaxingSoundDTO = UpdateRelaxingSoundSchema;

export type CreateRelaxingSoundDTO = z.infer<typeof CreateRelaxingSoundSchema>;
export type UpdateRelaxingSoundDTO = z.infer<typeof UpdateRelaxingSoundSchema>;
