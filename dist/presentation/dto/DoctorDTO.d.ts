import { z } from 'zod';
export declare const CreateDoctorSchema: z.ZodObject<{
    documentType: z.ZodEnum<["CC", "CE", "PA", "TI"]>;
    documentNumber: z.ZodString;
    fullName: z.ZodString;
    birthDate: z.ZodEffects<z.ZodString, string, string>;
    gender: z.ZodEnum<["M", "F", "Otro"]>;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    fullName: string;
    documentType: "CC" | "CE" | "PA" | "TI";
    documentNumber: string;
    birthDate: string;
    gender: "M" | "F" | "Otro";
    phone?: string | undefined;
    address?: string | undefined;
}, {
    email: string;
    fullName: string;
    documentType: "CC" | "CE" | "PA" | "TI";
    documentNumber: string;
    birthDate: string;
    gender: "M" | "F" | "Otro";
    phone?: string | undefined;
    address?: string | undefined;
}>;
export declare const UpdateDoctorSchema: z.ZodObject<{
    documentType: z.ZodOptional<z.ZodEnum<["CC", "CE", "PA", "TI"]>>;
    documentNumber: z.ZodOptional<z.ZodString>;
    fullName: z.ZodOptional<z.ZodString>;
    birthDate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    gender: z.ZodOptional<z.ZodEnum<["M", "F", "Otro"]>>;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    documentType?: "CC" | "CE" | "PA" | "TI" | undefined;
    documentNumber?: string | undefined;
    fullName?: string | undefined;
    birthDate?: string | undefined;
    gender?: "M" | "F" | "Otro" | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    address?: string | undefined;
    isActive?: boolean | undefined;
}, {
    documentType?: "CC" | "CE" | "PA" | "TI" | undefined;
    documentNumber?: string | undefined;
    fullName?: string | undefined;
    birthDate?: string | undefined;
    gender?: "M" | "F" | "Otro" | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    address?: string | undefined;
    isActive?: boolean | undefined;
}>;
export type CreateDoctorDTO = z.infer<typeof CreateDoctorSchema>;
export type UpdateDoctorDTO = z.infer<typeof UpdateDoctorSchema>;
//# sourceMappingURL=DoctorDTO.d.ts.map