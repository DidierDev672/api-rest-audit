"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTinnitusAssignmentSchema = exports.CheckTinnitusExistsSchema = exports.CheckPatientTinnitusExistsSchema = exports.ValidateTinnitusAssignmentSchema = exports.AssignTinnitusSchema = void 0;
const zod_1 = require("zod");
const TinnitusAssignmentStatus_1 = require("../../domain/enums/TinnitusAssignmentStatus");
const uuidSchema = zod_1.z.string().uuid('El ID debe ser un UUID válido').refine((val) => val !== undefined && val !== null && val !== 'undefined' && val !== 'null', { message: 'No se permiten valores undefined o null' });
exports.AssignTinnitusSchema = zod_1.z.object({
    idPatient: uuidSchema,
    idTinnitusQuestionnaires: uuidSchema,
});
exports.ValidateTinnitusAssignmentSchema = zod_1.z.object({
    idPatient: uuidSchema,
    idTinnitusQuestionnaires: uuidSchema,
});
exports.CheckPatientTinnitusExistsSchema = zod_1.z.object({
    idPatient: uuidSchema,
});
exports.CheckTinnitusExistsSchema = zod_1.z.object({
    idTinnitusQuestionnaires: uuidSchema,
});
exports.UpdateTinnitusAssignmentSchema = zod_1.z.object({
    status: zod_1.z.preprocess((val) => (typeof val === 'string' ? val.toLowerCase() : val), zod_1.z.nativeEnum(TinnitusAssignmentStatus_1.TinnitusAssignmentStatus, {
        errorMap: () => ({ message: 'El estado debe ser: active, inactive o discontinued' }),
    })),
});
//# sourceMappingURL=PatientTinnitusAssignmentDTO.js.map