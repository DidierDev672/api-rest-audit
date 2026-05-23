import { z } from 'zod';
declare const manualPatientSchema: z.ZodObject<{
    patient_name: z.ZodString;
    patient_document_type: z.ZodOptional<z.ZodString>;
    patient_document_number: z.ZodOptional<z.ZodString>;
    patient_birth_date: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    patient_name: string;
    patient_document_type?: string | undefined;
    patient_document_number?: string | undefined;
    patient_birth_date?: string | undefined;
}, {
    patient_name: string;
    patient_document_type?: string | undefined;
    patient_document_number?: string | undefined;
    patient_birth_date?: string | undefined;
}>;
export declare const CreateAiDocumentUploadFieldsSchema: z.ZodEffects<z.ZodObject<{
    patient_id: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodEffects<z.ZodLiteral<"">, undefined, "">]>;
    patient_name: z.ZodOptional<z.ZodString>;
    patient_document_type: z.ZodOptional<z.ZodString>;
    patient_document_number: z.ZodOptional<z.ZodString>;
    patient_birth_date: z.ZodOptional<z.ZodString>;
    client_user_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    patient_id?: string | undefined;
    patient_name?: string | undefined;
    patient_document_type?: string | undefined;
    patient_document_number?: string | undefined;
    patient_birth_date?: string | undefined;
    client_user_id?: string | undefined;
}, {
    patient_id?: string | undefined;
    patient_name?: string | undefined;
    patient_document_type?: string | undefined;
    patient_document_number?: string | undefined;
    patient_birth_date?: string | undefined;
    client_user_id?: string | undefined;
}>, {
    patient_id?: string | undefined;
    patient_name?: string | undefined;
    patient_document_type?: string | undefined;
    patient_document_number?: string | undefined;
    patient_birth_date?: string | undefined;
    client_user_id?: string | undefined;
}, {
    patient_id?: string | undefined;
    patient_name?: string | undefined;
    patient_document_type?: string | undefined;
    patient_document_number?: string | undefined;
    patient_birth_date?: string | undefined;
    client_user_id?: string | undefined;
}>;
export type CreateAiDocumentUploadFieldsDTO = z.infer<typeof CreateAiDocumentUploadFieldsSchema>;
export { manualPatientSchema };
//# sourceMappingURL=AiDocumentUploadDTO.d.ts.map