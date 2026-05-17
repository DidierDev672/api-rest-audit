import { z } from 'zod';
import { TinnitusAssignmentStatus } from '../../domain/enums/TinnitusAssignmentStatus';
export declare const AssignTinnitusSchema: z.ZodObject<{
    idPatient: z.ZodEffects<z.ZodString, string, string>;
    idTinnitusQuestionnaires: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    idPatient: string;
    idTinnitusQuestionnaires: string;
}, {
    idPatient: string;
    idTinnitusQuestionnaires: string;
}>;
export declare const ValidateTinnitusAssignmentSchema: z.ZodObject<{
    idPatient: z.ZodEffects<z.ZodString, string, string>;
    idTinnitusQuestionnaires: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    idPatient: string;
    idTinnitusQuestionnaires: string;
}, {
    idPatient: string;
    idTinnitusQuestionnaires: string;
}>;
export declare const CheckPatientTinnitusExistsSchema: z.ZodObject<{
    idPatient: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    idPatient: string;
}, {
    idPatient: string;
}>;
export declare const CheckTinnitusExistsSchema: z.ZodObject<{
    idTinnitusQuestionnaires: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    idTinnitusQuestionnaires: string;
}, {
    idTinnitusQuestionnaires: string;
}>;
export declare const UpdateTinnitusAssignmentSchema: z.ZodObject<{
    status: z.ZodEffects<z.ZodNativeEnum<typeof TinnitusAssignmentStatus>, TinnitusAssignmentStatus, unknown>;
}, "strip", z.ZodTypeAny, {
    status: TinnitusAssignmentStatus;
}, {
    status?: unknown;
}>;
export type AssignTinnitusDTO = z.infer<typeof AssignTinnitusSchema>;
export type ValidateTinnitusAssignmentDTO = z.infer<typeof ValidateTinnitusAssignmentSchema>;
export type CheckPatientTinnitusExistsDTO = z.infer<typeof CheckPatientTinnitusExistsSchema>;
export type CheckTinnitusExistsDTO = z.infer<typeof CheckTinnitusExistsSchema>;
export type UpdateTinnitusAssignmentDTO = z.infer<typeof UpdateTinnitusAssignmentSchema>;
//# sourceMappingURL=PatientTinnitusAssignmentDTO.d.ts.map