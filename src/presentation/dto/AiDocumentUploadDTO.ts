import { z } from 'zod';

const manualPatientSchema = z.object({
  patient_name: z.string().min(2, 'El nombre del paciente es requerido'),
  patient_document_type: z.string().optional(),
  patient_document_number: z.string().optional(),
  patient_birth_date: z.string().optional(),
});

export const CreateAiDocumentUploadFieldsSchema = z
  .object({
    patient_id: z.string().uuid().optional().or(z.literal('').transform(() => undefined)),
    patient_name: z.string().optional(),
    patient_document_type: z.string().optional(),
    patient_document_number: z.string().optional(),
    patient_birth_date: z.string().optional(),
    client_user_id: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const hasPatientId = !!data.patient_id;
    const hasName = !!data.patient_name?.trim();

    if (!hasPatientId && !hasName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Indica un paciente registrado o el nombre manual',
        path: ['patient_name'],
      });
    }
  });

export type CreateAiDocumentUploadFieldsDTO = z.infer<
  typeof CreateAiDocumentUploadFieldsSchema
>;

export { manualPatientSchema };
