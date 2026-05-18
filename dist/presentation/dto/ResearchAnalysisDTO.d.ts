import { z } from 'zod';
export declare const NoteReferenceSchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    updatedAt: string;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
}>;
export declare const AnalysisSchema: z.ZodObject<{
    summary: z.ZodString;
    generatedAt: z.ZodString;
    model: z.ZodString;
}, "strip", z.ZodTypeAny, {
    model: string;
    generatedAt: string;
    summary: string;
}, {
    model: string;
    generatedAt: string;
    summary: string;
}>;
export declare const CreateResearchAnalysisSchema: z.ZodObject<{
    researchId: z.ZodString;
    analysis: z.ZodObject<{
        summary: z.ZodString;
        generatedAt: z.ZodString;
        model: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        model: string;
        generatedAt: string;
        summary: string;
    }, {
        model: string;
        generatedAt: string;
        summary: string;
    }>;
    notesCount: z.ZodNumber;
    notesReferences: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        updatedAt: string;
    }, {
        id: string;
        createdAt: string;
        updatedAt: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    researchId: string;
    analysis: {
        model: string;
        generatedAt: string;
        summary: string;
    };
    notesCount: number;
    notesReferences: {
        id: string;
        createdAt: string;
        updatedAt: string;
    }[];
}, {
    researchId: string;
    analysis: {
        model: string;
        generatedAt: string;
        summary: string;
    };
    notesCount: number;
    notesReferences: {
        id: string;
        createdAt: string;
        updatedAt: string;
    }[];
}>;
export type CreateResearchAnalysisDTO = z.infer<typeof CreateResearchAnalysisSchema>;
export type AnalysisDTO = z.infer<typeof AnalysisSchema>;
export type NoteReferenceDTO = z.infer<typeof NoteReferenceSchema>;
//# sourceMappingURL=ResearchAnalysisDTO.d.ts.map