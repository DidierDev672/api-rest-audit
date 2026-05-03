"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenSchema = exports.LoginSchema = exports.RegisterPatientLoginSchema = void 0;
const zod_1 = require("zod");
const PERMIT_ROLES = ['patient', 'user', 'doctor', 'administrator', 'super_administrator'];
exports.RegisterPatientLoginSchema = zod_1.z.object({
    idPatient: zod_1.z.string().uuid('El ID del paciente debe ser un UUID válido'),
    email: zod_1.z.string().email('Email inválido'),
    username: zod_1.z
        .string()
        .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
        .max(30, 'El nombre de usuario no puede exceder 30 caracteres')
        .regex(/^[a-zA-Z0-9_]+$/, 'El nombre de usuario solo puede contener letras, números y guiones bajos'),
    password: zod_1.z
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .max(100, 'La contraseña no puede exceder 100 caracteres'),
    permits: zod_1.z.array(zod_1.z.enum(PERMIT_ROLES)).optional().default(['patient']),
    hasConsent: zod_1.z.boolean().refine((val) => val === true, {
        message: 'El consentimiento es mandatorio para la permanencia de la integridad digital',
    }),
});
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Email inválido').optional(),
    username: zod_1.z.string().min(1, 'Nombre de usuario requerido').optional(),
    password: zod_1.z.string().min(1, 'Contraseña requerida'),
}).refine((data) => data.email || data.username, {
    message: 'Email o nombre de usuario son requeridos',
    path: ['email'],
});
exports.TokenSchema = zod_1.z.object({
    token: zod_1.z.string().min(1, 'Token es requerido'),
});
//# sourceMappingURL=PatientLoginDTO.js.map