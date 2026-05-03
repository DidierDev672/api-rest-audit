"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckScreeningExistsSchema = exports.CheckPatientScreeningExistsSchema = exports.ValidateAssignmentSchema = exports.AssignScreeningsSchema = void 0;
const zod_1 = require("zod");
const uuidSchema = zod_1.z.string().uuid('El ID debe ser un UUID válido').refine((val) => val !== undefined && val !== null && val !== 'undefined' && val !== 'null', { message: 'No se permiten valores undefined o null' });
exports.AssignScreeningsSchema = zod_1.z.object({
    patientId: uuidSchema,
    screeningIds: zod_1.z.array(uuidSchema)
        .min(1, 'Debe incluir al menos un tamizaje')
        .refine((arr) => !arr.some((id) => !id || id === 'undefined'), { message: 'No se permiten IDs undefined en la lista de tamizajes' }),
});
exports.ValidateAssignmentSchema = zod_1.z.object({
    patientId: uuidSchema,
    screeningIds: zod_1.z.array(uuidSchema)
        .min(1, 'Debe incluir al menos un tamizaje')
        .refine((arr) => !arr.some((id) => !id || id === 'undefined'), { message: 'No se permiten IDs undefined en la lista de tamizajes' }),
});
exports.CheckPatientScreeningExistsSchema = zod_1.z.object({
    patientId: uuidSchema,
});
exports.CheckScreeningExistsSchema = zod_1.z.object({
    screeningId: uuidSchema,
});
//# sourceMappingURL=PatientScreeningAssignmentDTO.js.map