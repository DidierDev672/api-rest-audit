import { z } from 'zod';

const uuidSchema = z.string().uuid('El ID debe ser un UUID válido').refine(
  (val) => val !== undefined && val !== null && val !== 'undefined' && val !== 'null',
  { message: 'No se permiten valores undefined o null' }
);

export const AssignTinnitusSchema = z.object({
  idPatient: uuidSchema,
  idTinnitusQuestionnaires: uuidSchema,
});

export const ValidateTinnitusAssignmentSchema = z.object({
  idPatient: uuidSchema,
  idTinnitusQuestionnaires: uuidSchema,
});

export const CheckPatientTinnitusExistsSchema = z.object({
  idPatient: uuidSchema,
});

export const CheckTinnitusExistsSchema = z.object({
  idTinnitusQuestionnaires: uuidSchema,
});

export type AssignTinnitusDTO = z.infer<typeof AssignTinnitusSchema>;
export type ValidateTinnitusAssignmentDTO = z.infer<typeof ValidateTinnitusAssignmentSchema>;
export type CheckPatientTinnitusExistsDTO = z.infer<typeof CheckPatientTinnitusExistsSchema>;
export type CheckTinnitusExistsDTO = z.infer<typeof CheckTinnitusExistsSchema>;
