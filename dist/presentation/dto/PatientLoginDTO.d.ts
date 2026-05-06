import { z } from 'zod';
export declare const RegisterPatientLoginSchema: z.ZodObject<{
    idPatient: z.ZodString;
    email: z.ZodString;
    username: z.ZodString;
    password: z.ZodString;
    permits: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodEnum<["patient", "user", "doctor", "administrator", "super_administrator"]>, "many">>>;
    hasConsent: z.ZodEffects<z.ZodBoolean, boolean, boolean>;
}, "strip", z.ZodTypeAny, {
    password: string;
    idPatient: string;
    email: string;
    username: string;
    permits: ("patient" | "user" | "doctor" | "administrator" | "super_administrator")[];
    hasConsent: boolean;
}, {
    password: string;
    idPatient: string;
    email: string;
    username: string;
    hasConsent: boolean;
    permits?: ("patient" | "user" | "doctor" | "administrator" | "super_administrator")[] | undefined;
}>;
export declare const LoginSchema: z.ZodEffects<z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    username: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    email?: string | undefined;
    username?: string | undefined;
}, {
    password: string;
    email?: string | undefined;
    username?: string | undefined;
}>, {
    password: string;
    email?: string | undefined;
    username?: string | undefined;
}, {
    password: string;
    email?: string | undefined;
    username?: string | undefined;
}>;
export declare const TokenSchema: z.ZodObject<{
    token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    token: string;
}, {
    token: string;
}>;
export type RegisterPatientLoginDTO = z.infer<typeof RegisterPatientLoginSchema>;
export type LoginDTO = z.infer<typeof LoginSchema>;
export type TokenDTO = z.infer<typeof TokenSchema>;
//# sourceMappingURL=PatientLoginDTO.d.ts.map