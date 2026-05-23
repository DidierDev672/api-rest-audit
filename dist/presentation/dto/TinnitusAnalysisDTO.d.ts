import { z } from 'zod';
export declare const CreateTinnitusAnalysisSchema: z.ZodObject<{
    id_patient: z.ZodString;
    id_tinnitus_questionnaires: z.ZodString;
    id_tinnitus_response: z.ZodString;
    analysis: z.ZodString;
    model: z.ZodString;
}, "strip", z.ZodTypeAny, {
    model: string;
    analysis: string;
    id_patient: string;
    id_tinnitus_questionnaires: string;
    id_tinnitus_response: string;
}, {
    model: string;
    analysis: string;
    id_patient: string;
    id_tinnitus_questionnaires: string;
    id_tinnitus_response: string;
}>;
export declare const UpdateTinnitusAnalysisSchema: z.ZodObject<{
    id_patient: z.ZodOptional<z.ZodString>;
    id_tinnitus_questionnaires: z.ZodOptional<z.ZodString>;
    id_tinnitus_response: z.ZodOptional<z.ZodString>;
    analysis: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id_patient?: string | undefined;
    id_tinnitus_questionnaires?: string | undefined;
    id_tinnitus_response?: string | undefined;
    analysis?: string | undefined;
    model?: string | undefined;
}, {
    id_patient?: string | undefined;
    id_tinnitus_questionnaires?: string | undefined;
    id_tinnitus_response?: string | undefined;
    analysis?: string | undefined;
    model?: string | undefined;
}>;
export type CreateTinnitusAnalysisDTO = z.infer<typeof CreateTinnitusAnalysisSchema>;
export type UpdateTinnitusAnalysisDTO = z.infer<typeof UpdateTinnitusAnalysisSchema>;
//# sourceMappingURL=TinnitusAnalysisDTO.d.ts.map