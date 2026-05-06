import { z } from 'zod';
export declare const CreatePatientSchema: z.ZodObject<{
    fullName: z.ZodString;
    documentType: z.ZodEnum<["Tarjeta de Identidad", "Cedula de ciudadania", "Pasaporte", "Tarjeta de extranjero"]>;
    documentNumber: z.ZodString;
    birthDate: z.ZodEffects<z.ZodString, string, string>;
    height: z.ZodNumber;
    weight: z.ZodNumber;
    isAllergic: z.ZodBoolean;
    familyData: z.ZodObject<{
        father: z.ZodObject<{
            fullName: z.ZodString;
            age: z.ZodNumber;
            diseases: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            fullName: string;
            age: number;
            diseases: string[];
        }, {
            fullName: string;
            age: number;
            diseases?: string[] | undefined;
        }>;
        mother: z.ZodObject<{
            fullName: z.ZodString;
            age: z.ZodNumber;
            diseases: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            fullName: string;
            age: number;
            diseases: string[];
        }, {
            fullName: string;
            age: number;
            diseases?: string[] | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        father: {
            fullName: string;
            age: number;
            diseases: string[];
        };
        mother: {
            fullName: string;
            age: number;
            diseases: string[];
        };
    }, {
        father: {
            fullName: string;
            age: number;
            diseases?: string[] | undefined;
        };
        mother: {
            fullName: string;
            age: number;
            diseases?: string[] | undefined;
        };
    }>;
    hasConsent: z.ZodEffects<z.ZodBoolean, boolean, boolean>;
}, "strip", z.ZodTypeAny, {
    hasConsent: boolean;
    fullName: string;
    documentType: "Tarjeta de Identidad" | "Cedula de ciudadania" | "Pasaporte" | "Tarjeta de extranjero";
    documentNumber: string;
    birthDate: string;
    height: number;
    weight: number;
    isAllergic: boolean;
    familyData: {
        father: {
            fullName: string;
            age: number;
            diseases: string[];
        };
        mother: {
            fullName: string;
            age: number;
            diseases: string[];
        };
    };
}, {
    hasConsent: boolean;
    fullName: string;
    documentType: "Tarjeta de Identidad" | "Cedula de ciudadania" | "Pasaporte" | "Tarjeta de extranjero";
    documentNumber: string;
    birthDate: string;
    height: number;
    weight: number;
    isAllergic: boolean;
    familyData: {
        father: {
            fullName: string;
            age: number;
            diseases?: string[] | undefined;
        };
        mother: {
            fullName: string;
            age: number;
            diseases?: string[] | undefined;
        };
    };
}>;
export declare const UpdatePatientSchema: z.ZodObject<{
    fullName: z.ZodOptional<z.ZodString>;
    documentType: z.ZodOptional<z.ZodEnum<["Tarjeta de Identidad", "Cedula de ciudadania", "Pasaporte", "Tarjeta de extranjero"]>>;
    documentNumber: z.ZodOptional<z.ZodString>;
    birthDate: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    height: z.ZodOptional<z.ZodNumber>;
    weight: z.ZodOptional<z.ZodNumber>;
    isAllergic: z.ZodOptional<z.ZodBoolean>;
    familyData: z.ZodOptional<z.ZodObject<{
        father: z.ZodObject<{
            fullName: z.ZodString;
            age: z.ZodNumber;
            diseases: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            fullName: string;
            age: number;
            diseases: string[];
        }, {
            fullName: string;
            age: number;
            diseases?: string[] | undefined;
        }>;
        mother: z.ZodObject<{
            fullName: z.ZodString;
            age: z.ZodNumber;
            diseases: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            fullName: string;
            age: number;
            diseases: string[];
        }, {
            fullName: string;
            age: number;
            diseases?: string[] | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        father: {
            fullName: string;
            age: number;
            diseases: string[];
        };
        mother: {
            fullName: string;
            age: number;
            diseases: string[];
        };
    }, {
        father: {
            fullName: string;
            age: number;
            diseases?: string[] | undefined;
        };
        mother: {
            fullName: string;
            age: number;
            diseases?: string[] | undefined;
        };
    }>>;
}, "strip", z.ZodTypeAny, {
    fullName?: string | undefined;
    documentType?: "Tarjeta de Identidad" | "Cedula de ciudadania" | "Pasaporte" | "Tarjeta de extranjero" | undefined;
    documentNumber?: string | undefined;
    birthDate?: string | undefined;
    height?: number | undefined;
    weight?: number | undefined;
    isAllergic?: boolean | undefined;
    familyData?: {
        father: {
            fullName: string;
            age: number;
            diseases: string[];
        };
        mother: {
            fullName: string;
            age: number;
            diseases: string[];
        };
    } | undefined;
}, {
    fullName?: string | undefined;
    documentType?: "Tarjeta de Identidad" | "Cedula de ciudadania" | "Pasaporte" | "Tarjeta de extranjero" | undefined;
    documentNumber?: string | undefined;
    birthDate?: string | undefined;
    height?: number | undefined;
    weight?: number | undefined;
    isAllergic?: boolean | undefined;
    familyData?: {
        father: {
            fullName: string;
            age: number;
            diseases?: string[] | undefined;
        };
        mother: {
            fullName: string;
            age: number;
            diseases?: string[] | undefined;
        };
    } | undefined;
}>;
export type CreatePatientDTO = z.infer<typeof CreatePatientSchema>;
export type UpdatePatientDTO = z.infer<typeof UpdatePatientSchema>;
//# sourceMappingURL=PatientDTO.d.ts.map