import { z } from 'zod';
export declare const CreateAiDocumentAnalysisSchema: z.ZodObject<{
    document_upload_id: z.ZodString;
    content: z.ZodEffects<z.ZodString, string, string>;
    model: z.ZodDefault<z.ZodString>;
    analysis_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    document_upload_id: string;
    content: string;
    model: string;
    analysis_id?: string | null | undefined;
}, {
    document_upload_id: string;
    content: string;
    model?: string | undefined;
    analysis_id?: string | null | undefined;
}>;
export type CreateAiDocumentAnalysisDTO = z.infer<typeof CreateAiDocumentAnalysisSchema>;
//# sourceMappingURL=AiDocumentAnalysisDTO.d.ts.map