import { z } from 'zod';

export const CreateAiDocumentRedactionSchema = z.object({
  document_upload_id: z.string().uuid('document_upload_id debe ser un UUID válido'),
  analysis_id: z.string().uuid('analysis_id debe ser un UUID válido').nullable().optional(),
  content: z
    .string()
    .min(1, 'El contenido no puede estar vacío')
    .refine(val => val.trim().length > 0, { message: 'El contenido no puede estar vacío' }),
  model: z.string().min(1, 'El modelo es requerido').default('gemini-3-flash-preview'),
  notes_count: z.number().int().min(0, 'notes_count debe ser un número entero positivo').default(0),
  original_filename: z.string().min(1, 'original_filename es requerido'),
  redaction_id: z.string().uuid('redaction_id debe ser un UUID válido').nullable().optional(),
});

export const UpdateAiDocumentRedactionSchema = z.object({
  document_upload_id: z.string().uuid('document_upload_id debe ser un UUID válido').optional(),
  analysis_id: z.string().uuid('analysis_id debe ser un UUID válido').nullable().optional(),
  content: z
    .string()
    .min(1, 'El contenido no puede estar vacío')
    .refine(val => val.trim().length > 0, { message: 'El contenido no puede estar vacío' })
    .optional(),
  model: z.string().min(1, 'El modelo es requerido').optional(),
  notes_count: z.number().int().min(0, 'notes_count debe ser un número entero positivo').optional(),
  original_filename: z.string().min(1, 'original_filename es requerido').optional(),
  redaction_id: z.string().uuid('redaction_id debe ser un UUID válido').nullable().optional(),
});

export type CreateAiDocumentRedactionDTO = z.infer<typeof CreateAiDocumentRedactionSchema>;
export type UpdateAiDocumentRedactionDTO = z.infer<typeof UpdateAiDocumentRedactionSchema>;
