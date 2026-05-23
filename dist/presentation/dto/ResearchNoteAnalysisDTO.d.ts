import { z } from 'zod';
export declare const CreateResearchNoteAnalysisSchema: z.ZodObject<{
    research_id: z.ZodString;
    analysis_text: z.ZodString;
    notes_count: z.ZodNumber;
    source: z.ZodDefault<z.ZodEnum<["gemini", "manual", "other"]>>;
    model_name: z.ZodOptional<z.ZodString>;
    language: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    notes_count: number;
    source: "gemini" | "manual" | "other";
    research_id: string;
    analysis_text: string;
    language: string;
    model_name?: string | undefined;
}, {
    notes_count: number;
    research_id: string;
    analysis_text: string;
    source?: "gemini" | "manual" | "other" | undefined;
    model_name?: string | undefined;
    language?: string | undefined;
}>;
export type CreateResearchNoteAnalysisDTO = z.infer<typeof CreateResearchNoteAnalysisSchema>;
//# sourceMappingURL=ResearchNoteAnalysisDTO.d.ts.map