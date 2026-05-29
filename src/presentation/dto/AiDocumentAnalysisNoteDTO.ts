import { z } from 'zod';

export const CreateAiDocumentAnalysisNoteSchema = z.object({
  ai_document_analysis_id: z
    .string()
    .uuid('ai_document_analysis_id debe ser un UUID válido'),
  content: z.string().min(1, 'El contenido es requerido'),
  color: z.string().min(1, 'El color es requerido'),
  color_name: z.string().min(1, 'El nombre del color es requerido'),
  created_at: z.string().datetime({ message: 'created_at debe ser ISO 8601' }).optional(),
});

export const AiDocumentAnalysisNoteQuerySchema = z.object({
  ai_document_analysis_id: z.string().uuid().optional(),
});

export const CreateAiDocumentAnalysisNoteDTO = CreateAiDocumentAnalysisNoteSchema;
export const AiDocumentAnalysisNoteQueryDTO = AiDocumentAnalysisNoteQuerySchema;

export type CreateAiDocumentAnalysisNoteDTO = z.infer<
  typeof CreateAiDocumentAnalysisNoteSchema
>;
export type AiDocumentAnalysisNoteQueryDTO = z.infer<
  typeof AiDocumentAnalysisNoteQuerySchema
>;
