import { z } from 'zod';

export const CreateResearchNoteSchema = z.object({
  id: z.string().min(1, 'El ID es requerido'),
  research_id: z.string().min(1, 'El research_id es requerido'),
  id_note: z.string().min(1, 'El id_note es requerido'),
  text: z.string().min(1, 'El texto es requerido'),
  color: z.string().min(1, 'El color es requerido'),
  color_name: z.string().min(1, 'El nombre del color es requerido'),
});

export const CreateResearchNoteDTO = CreateResearchNoteSchema;
export type CreateResearchNoteDTO = z.infer<typeof CreateResearchNoteSchema>;
