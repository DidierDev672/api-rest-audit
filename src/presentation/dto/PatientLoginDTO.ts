import { z } from 'zod';

const PERMIT_ROLES = ['patient', 'user', 'doctor', 'administrator', 'super_administrator'] as const;

export const RegisterPatientLoginSchema = z.object({
  idPatient: z.string().uuid('El ID del paciente debe ser un UUID válido'),
  email: z.string().email('Email inválido'),
  username: z
    .string()
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
    .max(30, 'El nombre de usuario no puede exceder 30 caracteres')
    .regex(/^[a-zA-Z0-9_]+$/, 'El nombre de usuario solo puede contener letras, números y guiones bajos'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(100, 'La contraseña no puede exceder 100 caracteres'),
  permits: z.array(z.enum(PERMIT_ROLES)).optional().default(['patient']),
  hasConsent: z.boolean().refine((val) => val === true, {
    message: 'El consentimiento es mandatorio para la permanencia de la integridad digital',
  }),
});

export const LoginSchema = z.object({
  email: z.string().email('Email inválido').optional(),
  username: z.string().min(1, 'Nombre de usuario requerido').optional(),
  password: z.string().min(1, 'Contraseña requerida'),
}).refine((data) => data.email || data.username, {
  message: 'Email o nombre de usuario son requeridos',
  path: ['email'],
});

export const TokenSchema = z.object({
  token: z.string().min(1, 'Token es requerido'),
});

export type RegisterPatientLoginDTO = z.infer<typeof RegisterPatientLoginSchema>;
export type LoginDTO = z.infer<typeof LoginSchema>;
export type TokenDTO = z.infer<typeof TokenSchema>;
