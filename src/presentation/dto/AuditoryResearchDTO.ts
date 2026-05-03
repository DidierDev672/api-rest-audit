import { z } from 'zod';

export const CreateAuditoryResearchSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
});

export const UpdateAuditoryResearchSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
});

export const CreateAuditoryResearchDTO = CreateAuditoryResearchSchema;
export const UpdateAuditoryResearchDTO = UpdateAuditoryResearchSchema;

export type CreateAuditoryResearchDTO = z.infer<typeof CreateAuditoryResearchSchema>;
export type UpdateAuditoryResearchDTO = z.infer<typeof UpdateAuditoryResearchSchema>;
