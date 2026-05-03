"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDoctorSchema = exports.CreateDoctorSchema = void 0;
const zod_1 = require("zod");
exports.CreateDoctorSchema = zod_1.z.object({
    documentType: zod_1.z.enum(['CC', 'CE', 'PA', 'TI'], {
        errorMap: () => ({ message: 'Tipo de documento inválido. Use CC, CE, PA o TI' }),
    }),
    documentNumber: zod_1.z.string().min(1, 'El número de documento es requerido'),
    fullName: zod_1.z.string().min(1, 'El nombre completo es requerido').max(255),
    birthDate: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Fecha de nacimiento inválida',
    }),
    gender: zod_1.z.enum(['M', 'F', 'Otro'], {
        errorMap: () => ({ message: 'Sexo inválido. Use M, F u Otro' }),
    }),
    email: zod_1.z.string().email('Correo electrónico inválido'),
    phone: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
});
exports.UpdateDoctorSchema = zod_1.z.object({
    documentType: zod_1.z.enum(['CC', 'CE', 'PA', 'TI']).optional(),
    documentNumber: zod_1.z.string().min(1).optional(),
    fullName: zod_1.z.string().min(1).max(255).optional(),
    birthDate: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Fecha de nacimiento inválida',
    }).optional(),
    gender: zod_1.z.enum(['M', 'F', 'Otro']).optional(),
    email: zod_1.z.string().email().optional(),
    phone: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=DoctorDTO.js.map