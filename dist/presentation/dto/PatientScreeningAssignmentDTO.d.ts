import { z } from 'zod';
export declare const AssignScreeningsSchema: z.ZodObject<{
    patientId: z.ZodEffects<z.ZodString, string, string>;
    screeningIds: z.ZodEffects<z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">, string[], string[]>;
}, "strip", z.ZodTypeAny, {
    patientId: string;
    screeningIds: string[];
}, {
    patientId: string;
    screeningIds: string[];
}>;
export declare const ValidateAssignmentSchema: z.ZodObject<{
    patientId: z.ZodEffects<z.ZodString, string, string>;
    screeningIds: z.ZodEffects<z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">, string[], string[]>;
}, "strip", z.ZodTypeAny, {
    patientId: string;
    screeningIds: string[];
}, {
    patientId: string;
    screeningIds: string[];
}>;
export declare const CheckPatientScreeningExistsSchema: z.ZodObject<{
    patientId: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    patientId: string;
}, {
    patientId: string;
}>;
export declare const CheckScreeningExistsSchema: z.ZodObject<{
    screeningId: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    screeningId: string;
}, {
    screeningId: string;
}>;
export type AssignScreeningsDTO = z.infer<typeof AssignScreeningsSchema>;
export type ValidateAssignmentDTO = z.infer<typeof ValidateAssignmentSchema>;
export type CheckPatientScreeningExistsDTO = z.infer<typeof CheckPatientScreeningExistsSchema>;
export type CheckScreeningExistsDTO = z.infer<typeof CheckScreeningExistsSchema>;
//# sourceMappingURL=PatientScreeningAssignmentDTO.d.ts.map