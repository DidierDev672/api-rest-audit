"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDoctorProfessionalDataSchema = exports.CreateDoctorProfessionalDataSchema = void 0;
const zod_1 = require("zod");
const REGISTRATION_STATUS = ['active', 'inactive', 'suspended'];
const DoctorCertificationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'El nombre de la certificación es requerido'),
    institution: zod_1.z.string().min(1, 'La institución es requerida'),
    year: zod_1.z.number().int().min(1900).max(new Date().getFullYear()),
});
exports.CreateDoctorProfessionalDataSchema = zod_1.z.object({
    id_doctor: zod_1.z.string().uuid('El ID del doctor debe ser un UUID válido'),
    professional_title: zod_1.z.string().min(1, 'El título profesional es requerido').max(100),
    university: zod_1.z.string().min(1, 'La universidad es requerida').max(255),
    country: zod_1.z.string().min(1, 'El país es requerido').max(100),
    graduation_year: zod_1.z.number().int().min(1900).max(new Date().getFullYear()),
    professional_card_number: zod_1.z.string().min(1, 'El número de tarjeta profesional es requerido').max(50),
    rethus_registration: zod_1.z.string().min(1, 'El registro RETHUS es requerido').max(50),
    registration_status: zod_1.z.enum(REGISTRATION_STATUS).default('active'),
    medical_specialty: zod_1.z.string().max(100).optional(),
    subspecialty: zod_1.z.string().max(100).optional(),
    additional_certifications: zod_1.z.array(DoctorCertificationSchema).default([]),
    diploma_url: zod_1.z.string().optional(),
    degree_certificate_url: zod_1.z.string().optional(),
    specialty_certificates_url: zod_1.z.array(zod_1.z.string()).default([]),
});
exports.UpdateDoctorProfessionalDataSchema = zod_1.z.object({
    professional_title: zod_1.z.string().min(1).max(100).optional(),
    university: zod_1.z.string().min(1).max(255).optional(),
    country: zod_1.z.string().min(1).max(100).optional(),
    graduation_year: zod_1.z.number().int().min(1900).max(new Date().getFullYear()).optional(),
    professional_card_number: zod_1.z.string().min(1).max(50).optional(),
    rethus_registration: zod_1.z.string().min(1).max(50).optional(),
    registration_status: zod_1.z.enum(REGISTRATION_STATUS).optional(),
    medical_specialty: zod_1.z.string().max(100).optional(),
    subspecialty: zod_1.z.string().max(100).optional(),
    additional_certifications: zod_1.z.array(DoctorCertificationSchema).optional(),
    diploma_url: zod_1.z.string().optional(),
    degree_certificate_url: zod_1.z.string().optional(),
    specialty_certificates_url: zod_1.z.array(zod_1.z.string()).optional(),
    is_verified: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=DoctorProfessionalDataDTO.js.map