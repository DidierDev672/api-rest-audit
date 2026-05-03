import { z } from 'zod';

const DOCUMENT_TYPES = ['Tarjeta de Identidad', 'Cedula de ciudadania', 'Pasaporte', 'Tarjeta de extranjero'] as const;

const ParentInfoSchema = z.object({
  fullName: z.string().min(1, 'El nombre completo es requerido'),
  age: z.number().int().positive('La edad debe ser un número positivo'),
  diseases: z.array(z.string()).default([]),
});

const FamilyDataSchema = z.object({
  father: ParentInfoSchema,
  mother: ParentInfoSchema,
});

export const CreatePatientSchema = z.object({
  fullName: z.string().min(1, 'El nombre completo es requerido'),
  documentType: z.enum(DOCUMENT_TYPES, {
    errorMap: () => ({ message: 'Tipo de documento inválido' }),
  }),
  documentNumber: z.string().min(1, 'El número de documento es requerido'),
  birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Fecha de nacimiento inválida',
  }),
  height: z.number().positive('La altura debe ser un número positivo'),
  weight: z.number().positive('El peso debe ser un número positivo'),
  isAllergic: z.boolean(),
  familyData: FamilyDataSchema,
  hasConsent: z.boolean().refine((val) => val === true, {
    message: 'El consentimiento es mandatorio para la permanencia de la integridad digital',
  }),
});

export const UpdatePatientSchema = z.object({
  fullName: z.string().min(1).optional(),
  documentType: z.enum(DOCUMENT_TYPES).optional(),
  documentNumber: z.string().min(1).optional(),
  birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Fecha de nacimiento inválida',
  }).optional(),
  height: z.number().positive().optional(),
  weight: z.number().positive().optional(),
  isAllergic: z.boolean().optional(),
  familyData: FamilyDataSchema.optional(),
});

export type CreatePatientDTO = z.infer<typeof CreatePatientSchema>;
export type UpdatePatientDTO = z.infer<typeof UpdatePatientSchema>;
