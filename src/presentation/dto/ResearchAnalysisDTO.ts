import { z } from 'zod';

export const NoteReferenceSchema = z.object({
  id: z.string().min(1, 'Note ID is required'),
  createdAt: z.string().min(1, 'Created date is required'),
  updatedAt: z.string().min(1, 'Updated date is required'),
});

export const AnalysisSchema = z.object({
  summary: z.string(),
  generatedAt: z.string().min(1, 'Generated date is required'),
  model: z.string().min(1, 'Model is required'),
});

export const CreateResearchAnalysisSchema = z.object({
  researchId: z.string().min(1, 'Research ID is required'),
  analysis: AnalysisSchema,
  notesCount: z.number().min(0, 'Notes count must be non-negative'),
  notesReferences: z.array(NoteReferenceSchema).min(0),
});

export type CreateResearchAnalysisDTO = z.infer<typeof CreateResearchAnalysisSchema>;
export type AnalysisDTO = z.infer<typeof AnalysisSchema>;
export type NoteReferenceDTO = z.infer<typeof NoteReferenceSchema>;