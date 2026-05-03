"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePatientSchema = exports.CreatePatientSchema = void 0;
const zod_1 = require("zod");
const DOCUMENT_TYPES = ['Tarjeta de Identidad', 'Cedula de ciudadania', 'Pasaporte', 'Tarjeta de extranjero'];
const ParentInfoSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1, 'El nombre completo es requerido'),
    age: zod_1.z.number().int().positive('La edad debe ser un número positivo'),
    diseases: zod_1.z.array(zod_1.z.string()).default([]),
});
const FamilyDataSchema = zod_1.z.object({
    father: ParentInfoSchema,
    mother: ParentInfoSchema,
});
exports.CreatePatientSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1, 'El nombre completo es requerido'),
    documentType: zod_1.z.enum(DOCUMENT_TYPES, {
        errorMap: () => ({ message: 'Tipo de documento inválido' }),
    }),
    documentNumber: zod_1.z.string().min(1, 'El número de documento es requerido'),
    birthDate: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Fecha de nacimiento inválida',
    }),
    height: zod_1.z.number().positive('La altura debe ser un número positivo'),
    weight: zod_1.z.number().positive('El peso debe ser un número positivo'),
    isAllergic: zod_1.z.boolean(),
    familyData: FamilyDataSchema,
    hasConsent: zod_1.z.boolean().refine((val) => val === true, {
        message: 'El consentimiento es mandatorio para la permanencia de la integridad digital',
    }),
});
exports.UpdatePatientSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1).optional(),
    documentType: zod_1.z.enum(DOCUMENT_TYPES).optional(),
    documentNumber: zod_1.z.string().min(1).optional(),
    birthDate: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Fecha de nacimiento inválida',
    }).optional(),
    height: zod_1.z.number().positive().optional(),
    weight: zod_1.z.number().positive().optional(),
    isAllergic: zod_1.z.boolean().optional(),
    familyData: FamilyDataSchema.optional(),
});
//# sourceMappingURL=PatientDTO.js.map