"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckTinnitusExistsSchema = exports.CheckPatientTinnitusExistsSchema = exports.ValidateTinnitusAssignmentSchema = exports.AssignTinnitusSchema = void 0;
const zod_1 = require("zod");
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
//# sourceMappingURL=PatientTinnitusAssignmentDTO.js.map