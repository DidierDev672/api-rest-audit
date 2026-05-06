import { z } from 'zod';
export declare const CreateDoctorProfessionalDataSchema: z.ZodObject<{
    id_doctor: z.ZodString;
    professional_title: z.ZodString;
    university: z.ZodString;
    country: z.ZodString;
    graduation_year: z.ZodNumber;
    professional_card_number: z.ZodString;
    rethus_registration: z.ZodString;
    registration_status: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended"]>>;
    medical_specialty: z.ZodOptional<z.ZodString>;
    subspecialty: z.ZodOptional<z.ZodString>;
    additional_certifications: z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        institution: z.ZodString;
        year: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        institution: string;
        year: number;
    }, {
        name: string;
        institution: string;
        year: number;
    }>, "many">>;
    diploma_url: z.ZodOptional<z.ZodString>;
    degree_certificate_url: z.ZodOptional<z.ZodString>;
    specialty_certificates_url: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    university: string;
    country: string;
    id_doctor: string;
    professional_title: string;
    graduation_year: number;
    professional_card_number: string;
    rethus_registration: string;
    registration_status: "active" | "inactive" | "suspended";
    additional_certifications: {
        name: string;
        institution: string;
        year: number;
    }[];
    specialty_certificates_url: string[];
    medical_specialty?: string | undefined;
    subspecialty?: string | undefined;
    diploma_url?: string | undefined;
    degree_certificate_url?: string | undefined;
}, {
    university: string;
    country: string;
    id_doctor: string;
    professional_title: string;
    graduation_year: number;
    professional_card_number: string;
    rethus_registration: string;
    registration_status?: "active" | "inactive" | "suspended" | undefined;
    medical_specialty?: string | undefined;
    subspecialty?: string | undefined;
    additional_certifications?: {
        name: string;
        institution: string;
        year: number;
    }[] | undefined;
    diploma_url?: string | undefined;
    degree_certificate_url?: string | undefined;
    specialty_certificates_url?: string[] | undefined;
}>;
export declare const UpdateDoctorProfessionalDataSchema: z.ZodObject<{
    professional_title: z.ZodOptional<z.ZodString>;
    university: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    graduation_year: z.ZodOptional<z.ZodNumber>;
    professional_card_number: z.ZodOptional<z.ZodString>;
    rethus_registration: z.ZodOptional<z.ZodString>;
    registration_status: z.ZodOptional<z.ZodEnum<["active", "inactive", "suspended"]>>;
    medical_specialty: z.ZodOptional<z.ZodString>;
    subspecialty: z.ZodOptional<z.ZodString>;
    additional_certifications: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        institution: z.ZodString;
        year: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        institution: string;
        year: number;
    }, {
        name: string;
        institution: string;
        year: number;
    }>, "many">>;
    diploma_url: z.ZodOptional<z.ZodString>;
    degree_certificate_url: z.ZodOptional<z.ZodString>;
    specialty_certificates_url: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    is_verified: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    professional_title?: string | undefined;
    university?: string | undefined;
    country?: string | undefined;
    graduation_year?: number | undefined;
    professional_card_number?: string | undefined;
    rethus_registration?: string | undefined;
    registration_status?: "active" | "inactive" | "suspended" | undefined;
    medical_specialty?: string | undefined;
    subspecialty?: string | undefined;
    additional_certifications?: {
        name: string;
        institution: string;
        year: number;
    }[] | undefined;
    diploma_url?: string | undefined;
    degree_certificate_url?: string | undefined;
    specialty_certificates_url?: string[] | undefined;
    is_verified?: boolean | undefined;
}, {
    professional_title?: string | undefined;
    university?: string | undefined;
    country?: string | undefined;
    graduation_year?: number | undefined;
    professional_card_number?: string | undefined;
    rethus_registration?: string | undefined;
    registration_status?: "active" | "inactive" | "suspended" | undefined;
    medical_specialty?: string | undefined;
    subspecialty?: string | undefined;
    additional_certifications?: {
        name: string;
        institution: string;
        year: number;
    }[] | undefined;
    diploma_url?: string | undefined;
    degree_certificate_url?: string | undefined;
    specialty_certificates_url?: string[] | undefined;
    is_verified?: boolean | undefined;
}>;
export type CreateDoctorProfessionalDataDTO = z.infer<typeof CreateDoctorProfessionalDataSchema>;
export type UpdateDoctorProfessionalDataDTO = z.infer<typeof UpdateDoctorProfessionalDataSchema>;
//# sourceMappingURL=DoctorProfessionalDataDTO.d.ts.map