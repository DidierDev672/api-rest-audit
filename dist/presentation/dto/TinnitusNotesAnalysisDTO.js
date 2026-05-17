"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTinnitusNotesAnalysisSchema = void 0;
const zod_1 = require("zod");
exports.CreateTinnitusNotesAnalysisSchema = zod_1.z.object({
    id_patient: zod_1.z.string().uuid('El ID del paciente debe ser un UUID válido'),
    id_tinnitus_questionnaires: zod_1.z.string().uuid().optional(),
    id_tinnitus_response: zod_1.z.string().uuid().optional(),
    analysis: zod_1.z.string().min(1, 'El análisis es requerido'),
    note_count: zod_1.z.number().int().positive().optional(),
    analyzed_at: zod_1.z.string().datetime().optional(),
});
//# sourceMappingURL=TinnitusNotesAnalysisDTO.js.map