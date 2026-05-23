import { z } from 'zod';
export declare const CreateAiDocumentRedactionSchema: z.ZodObject<{
    document_upload_id: z.ZodString;
    analysis_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    content: z.ZodEffects<z.ZodString, string, string>;
    model: z.ZodDefault<z.ZodString>;
    notes_count: z.ZodDefault<z.ZodNumber>;
    original_filename: z.ZodString;
    redaction_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    document_upload_id: string;
    content: string;
    model: string;
    notes_count: number;
    original_filename: string;
    analysis_id?: string | null | undefined;
    redaction_id?: string | null | undefined;
}, {
    document_upload_id: string;
    content: string;
    original_filename: string;
    analysis_id?: string | null | undefined;
    model?: string | undefined;
    notes_count?: number | undefined;
    redaction_id?: string | null | undefined;
}>;
export declare const UpdateAiDocumentRedactionSchema: z.ZodObject<{
    document_upload_id: z.ZodOptional<z.ZodString>;
    analysis_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    content: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    model: z.ZodOptional<z.ZodString>;
    notes_count: z.ZodOptional<z.ZodNumber>;
    original_filename: z.ZodOptional<z.ZodString>;
    redaction_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    document_upload_id?: string | undefined;
    analysis_id?: string | null | undefined;
    content?: string | undefined;
    model?: string | undefined;
    notes_count?: number | undefined;
    original_filename?: string | undefined;
    redaction_id?: string | null | undefined;
}, {
    document_upload_id?: string | undefined;
    analysis_id?: string | null | undefined;
    content?: string | undefined;
    model?: string | undefined;
    notes_count?: number | undefined;
    original_filename?: string | undefined;
    redaction_id?: string | null | undefined;
}>;
export type CreateAiDocumentRedactionDTO = z.infer<typeof CreateAiDocumentRedactionSchema>;
export type UpdateAiDocumentRedactionDTO = z.infer<typeof UpdateAiDocumentRedactionSchema>;
//# sourceMappingURL=AiDocumentRedactionDTO.d.ts.map