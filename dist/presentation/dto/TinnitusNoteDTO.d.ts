import { z } from 'zod';
export declare const CreateTinnitusNoteSchema: z.ZodObject<{
    id_patient: z.ZodString;
    id_tinnitus_questionnaires: z.ZodString;
    id_tinnitus_response: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    description: string;
    id_patient: string;
    id_tinnitus_questionnaires: string;
    id_tinnitus_response: string;
}, {
    description: string;
    id_patient: string;
    id_tinnitus_questionnaires: string;
    id_tinnitus_response: string;
}>;
export declare const UpdateTinnitusNoteSchema: z.ZodObject<{
    id_patient: z.ZodOptional<z.ZodString>;
    id_tinnitus_questionnaires: z.ZodOptional<z.ZodString>;
    id_tinnitus_response: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id_patient?: string | undefined;
    id_tinnitus_questionnaires?: string | undefined;
    id_tinnitus_response?: string | undefined;
    description?: string | undefined;
}, {
    id_patient?: string | undefined;
    id_tinnitus_questionnaires?: string | undefined;
    id_tinnitus_response?: string | undefined;
    description?: string | undefined;
}>;
export type CreateTinnitusNoteDTO = z.infer<typeof CreateTinnitusNoteSchema>;
export type UpdateTinnitusNoteDTO = z.infer<typeof UpdateTinnitusNoteSchema>;
//# sourceMappingURL=TinnitusNoteDTO.d.ts.map