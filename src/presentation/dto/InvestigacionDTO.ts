import { z } from 'zod';

export const CreateInvestigacionSchema = z.object({
  id_resource: z.string().min(1, 'id_resource es requerido y no puede estar vacío'),
  content_resource: z.string().min(1, 'content_resource es requerido y no puede estar vacío'),
});

export const UpdateInvestigacionSchema = z.object({
  content_resource: z.string().min(1, 'content_resource no puede estar vacío'),
});

export const CreateInvestigacionDTO = CreateInvestigacionSchema;
export const UpdateInvestigacionDTO = UpdateInvestigacionSchema;

export type CreateInvestigacionDTO = z.infer<typeof CreateInvestigacionSchema>;
export type UpdateInvestigacionDTO = z.infer<typeof UpdateInvestigacionSchema>;