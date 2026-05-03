import { z } from 'zod';

export const CreateDoctorSchema = z.object({
  documentType: z.enum(['CC', 'CE', 'PA', 'TI'], {
    errorMap: () => ({ message: 'Tipo de documento inválido. Use CC, CE, PA o TI' }),
  }),
  documentNumber: z.string().min(1, 'El número de documento es requerido'),
  fullName: z.string().min(1, 'El nombre completo es requerido').max(255),
  birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Fecha de nacimiento inválida',
  }),
  gender: z.enum(['M', 'F', 'Otro'], {
    errorMap: () => ({ message: 'Sexo inválido. Use M, F u Otro' }),
  }),
  email: z.string().email('Correo electrónico inválido'),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const UpdateDoctorSchema = z.object({
  documentType: z.enum(['CC', 'CE', 'PA', 'TI']).optional(),
  documentNumber: z.string().min(1).optional(),
  fullName: z.string().min(1).max(255).optional(),
  birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Fecha de nacimiento inválida',
  }).optional(),
  gender: z.enum(['M', 'F', 'Otro']).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type CreateDoctorDTO = z.infer<typeof CreateDoctorSchema>;
export type UpdateDoctorDTO = z.infer<typeof UpdateDoctorSchema>;
