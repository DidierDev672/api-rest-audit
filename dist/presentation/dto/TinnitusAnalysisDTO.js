"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTinnitusAnalysisSchema = exports.CreateTinnitusAnalysisSchema = void 0;
const zod_1 = require("zod");
exports.CreateTinnitusAnalysisSchema = zod_1.z.object({
    id_patient: zod_1.z.string().uuid('ID de paciente inválido'),
    id_tinnitus_questionnaires: zod_1.z.string().uuid('ID de cuestionario inválido'),
    id_tinnitus_response: zod_1.z.string().uuid('ID de respuesta inválido'),
    analysis: zod_1.z.string().min(1, 'El análisis es requerido'),
    model: zod_1.z.string().min(1, 'El modelo es requerido'),
});
exports.UpdateTinnitusAnalysisSchema = zod_1.z.object({
    id_patient: zod_1.z.string().uuid('ID de paciente inválido').optional(),
    id_tinnitus_questionnaires: zod_1.z.string().uuid('ID de cuestionario inválido').optional(),
    id_tinnitus_response: zod_1.z.string().uuid('ID de respuesta inválido').optional(),
    analysis: zod_1.z.string().min(1, 'El análisis no puede estar vacío').optional(),
    model: zod_1.z.string().min(1, 'El modelo no puede estar vacío').optional(),
});
//# sourceMappingURL=TinnitusAnalysisDTO.js.map