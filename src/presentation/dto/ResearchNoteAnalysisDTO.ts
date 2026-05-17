import { z } from 'zod';

export const CreateResearchNoteAnalysisSchema = z.object({
  research_id: z.string().uuid('research_id debe ser un UUID válido'),
  analysis_text: z
    .string()
    .min(20, 'analysis_text debe tener al menos 20 caracteres')
    .max(50000, 'analysis_text no debe exceder 50000 caracteres'),
  notes_count: z.number().int('notes_count debe ser un entero').min(1, 'notes_count debe ser >= 1'),
  source: z.enum(['gemini', 'manual', 'other']).default('gemini'),
  model_name: z.string().optional(),
  language: z.string().default('es'),
});

export type CreateResearchNoteAnalysisDTO = z.infer<typeof CreateResearchNoteAnalysisSchema>;
