"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTinnitusNoteSchema = exports.CreateTinnitusNoteSchema = void 0;
const zod_1 = require("zod");
exports.CreateTinnitusNoteSchema = zod_1.z.object({
    id_patient: zod_1.z.string().uuid('El ID del paciente debe ser un UUID válido'),
    id_tinnitus_questionnaires: zod_1.z.string().uuid('El ID del cuestionario de tinnitus debe ser un UUID válido'),
    id_tinnitus_response: zod_1.z.string().uuid('El ID de la respuesta de tinnitus debe ser un UUID válido'),
    description: zod_1.z.string().min(1, 'La descripción es requerida').refine(val => val.trim().length > 0, {
        message: 'La descripción no puede estar vacía',
    }),
    color: zod_1.z.string().optional(),
    source: zod_1.z.string().optional(),
});
exports.UpdateTinnitusNoteSchema = zod_1.z.object({
    id_patient: zod_1.z.string().uuid().optional(),
    id_tinnitus_questionnaires: zod_1.z.string().uuid().optional(),
    id_tinnitus_response: zod_1.z.string().uuid().optional(),
    description: zod_1.z.string().min(1).refine(val => val.trim().length > 0, {
        message: 'La descripción no puede estar vacía',
    }).optional(),
    color: zod_1.z.string().optional(),
    source: zod_1.z.string().optional(),
});
//# sourceMappingURL=TinnitusNoteDTO.js.map