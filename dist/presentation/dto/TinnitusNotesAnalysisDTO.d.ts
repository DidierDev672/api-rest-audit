import { z } from 'zod';
export declare const CreateTinnitusNotesAnalysisSchema: z.ZodObject<{
    id_patient: z.ZodString;
    id_tinnitus_questionnaires: z.ZodOptional<z.ZodString>;
    id_tinnitus_response: z.ZodOptional<z.ZodString>;
    analysis: z.ZodString;
    note_count: z.ZodOptional<z.ZodNumber>;
    analyzed_at: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    analysis: string;
    id_patient: string;
    id_tinnitus_questionnaires?: string | undefined;
    id_tinnitus_response?: string | undefined;
    note_count?: number | undefined;
    analyzed_at?: string | undefined;
}, {
    analysis: string;
    id_patient: string;
    id_tinnitus_questionnaires?: string | undefined;
    id_tinnitus_response?: string | undefined;
    note_count?: number | undefined;
    analyzed_at?: string | undefined;
}>;
export type CreateTinnitusNotesAnalysisDTO = z.infer<typeof CreateTinnitusNotesAnalysisSchema>;
//# sourceMappingURL=TinnitusNotesAnalysisDTO.d.ts.map