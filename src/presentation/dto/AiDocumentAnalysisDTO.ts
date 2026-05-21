import { z } from 'zod';

export const CreateAiDocumentAnalysisSchema = z.object({
  document_upload_id: z.string().uuid('document_upload_id debe ser un UUID válido'),
  content: z
    .string()
    .min(1, 'El contenido no puede estar vacío')
    .refine(val => val.trim().length > 0, { message: 'El contenido no puede estar vacío' }),
  model: z.string().min(1, 'El modelo es requerido').default('gemini-3-flash-preview'),
  analysis_id: z.string().uuid().nullable().optional(),
});

export type CreateAiDocumentAnalysisDTO = z.infer<typeof CreateAiDocumentAnalysisSchema>;
