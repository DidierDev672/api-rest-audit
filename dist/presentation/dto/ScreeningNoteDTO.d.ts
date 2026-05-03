import { z } from 'zod';
export declare const CreateScreeningNoteSchema: z.ZodObject<{
    id_patient: z.ZodString;
    id_screening: z.ZodString;
    id_doctor: z.ZodString;
    title_note: z.ZodString;
    description_note: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id_patient: string;
    id_screening: string;
    id_doctor: string;
    title_note: string;
    description_note: string;
}, {
    id_patient: string;
    id_screening: string;
    id_doctor: string;
    title_note: string;
    description_note: string;
}>;
export declare const UpdateScreeningNoteSchema: z.ZodObject<{
    id_patient: z.ZodOptional<z.ZodString>;
    id_screening: z.ZodOptional<z.ZodString>;
    id_doctor: z.ZodOptional<z.ZodString>;
    title_note: z.ZodOptional<z.ZodString>;
    description_note: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id_patient?: string | undefined;
    id_screening?: string | undefined;
    id_doctor?: string | undefined;
    title_note?: string | undefined;
    description_note?: string | undefined;
}, {
    id_patient?: string | undefined;
    id_screening?: string | undefined;
    id_doctor?: string | undefined;
    title_note?: string | undefined;
    description_note?: string | undefined;
}>;
export type CreateScreeningNoteDTO = z.infer<typeof CreateScreeningNoteSchema>;
export type UpdateScreeningNoteDTO = z.infer<typeof UpdateScreeningNoteSchema>;
//# sourceMappingURL=ScreeningNoteDTO.d.ts.map