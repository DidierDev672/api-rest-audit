import { z } from 'zod';

const uuidSchema = z.string().uuid('El ID debe ser un UUID válido').refine(
  (val) => val !== undefined && val !== null && val !== 'undefined' && val !== 'null',
  { message: 'No se permiten valores undefined o null' }
);

export const AssignScreeningsSchema = z.object({
  patientId: uuidSchema,
  screeningIds: z.array(uuidSchema)
    .min(1, 'Debe incluir al menos un tamizaje')
    .refine(
      (arr) => !arr.some((id) => !id || id === 'undefined'),
      { message: 'No se permiten IDs undefined en la lista de tamizajes' }
    ),
});

export const ValidateAssignmentSchema = z.object({
  patientId: uuidSchema,
  screeningIds: z.array(uuidSchema)
    .min(1, 'Debe incluir al menos un tamizaje')
    .refine(
      (arr) => !arr.some((id) => !id || id === 'undefined'),
      { message: 'No se permiten IDs undefined en la lista de tamizajes' }
    ),
});

export const CheckPatientScreeningExistsSchema = z.object({
  patientId: uuidSchema,
});

export const CheckScreeningExistsSchema = z.object({
  screeningId: uuidSchema,
});

export type AssignScreeningsDTO = z.infer<typeof AssignScreeningsSchema>;
export type ValidateAssignmentDTO = z.infer<typeof ValidateAssignmentSchema>;
export type CheckPatientScreeningExistsDTO = z.infer<typeof CheckPatientScreeningExistsSchema>;
export type CheckScreeningExistsDTO = z.infer<typeof CheckScreeningExistsSchema>;
