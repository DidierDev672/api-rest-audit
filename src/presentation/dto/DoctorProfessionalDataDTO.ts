import { z } from 'zod';

const REGISTRATION_STATUS = ['active', 'inactive', 'suspended'] as const;

const DoctorCertificationSchema = z.object({
  name: z.string().min(1, 'El nombre de la certificación es requerido'),
  institution: z.string().min(1, 'La institución es requerida'),
  year: z.number().int().min(1900).max(new Date().getFullYear()),
});

export const CreateDoctorProfessionalDataSchema = z.object({
  id_doctor: z.string().uuid('El ID del doctor debe ser un UUID válido'),
  professional_title: z.string().min(1, 'El título profesional es requerido').max(100),
  university: z.string().min(1, 'La universidad es requerida').max(255),
  country: z.string().min(1, 'El país es requerido').max(100),
  graduation_year: z.number().int().min(1900).max(new Date().getFullYear()),
  professional_card_number: z.string().min(1, 'El número de tarjeta profesional es requerido').max(50),
  rethus_registration: z.string().min(1, 'El registro RETHUS es requerido').max(50),
  registration_status: z.enum(REGISTRATION_STATUS).default('active'),
  medical_specialty: z.string().max(100).optional(),
  subspecialty: z.string().max(100).optional(),
  additional_certifications: z.array(DoctorCertificationSchema).default([]),
  diploma_url: z.string().optional(),
  degree_certificate_url: z.string().optional(),
  specialty_certificates_url: z.array(z.string()).default([]),
});

export const UpdateDoctorProfessionalDataSchema = z.object({
  professional_title: z.string().min(1).max(100).optional(),
  university: z.string().min(1).max(255).optional(),
  country: z.string().min(1).max(100).optional(),
  graduation_year: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
  professional_card_number: z.string().min(1).max(50).optional(),
  rethus_registration: z.string().min(1).max(50).optional(),
  registration_status: z.enum(REGISTRATION_STATUS).optional(),
  medical_specialty: z.string().max(100).optional(),
  subspecialty: z.string().max(100).optional(),
  additional_certifications: z.array(DoctorCertificationSchema).optional(),
  diploma_url: z.string().optional(),
  degree_certificate_url: z.string().optional(),
  specialty_certificates_url: z.array(z.string()).optional(),
  is_verified: z.boolean().optional(),
});

export type CreateDoctorProfessionalDataDTO = z.infer<typeof CreateDoctorProfessionalDataSchema>;
export type UpdateDoctorProfessionalDataDTO = z.infer<typeof UpdateDoctorProfessionalDataSchema>;
