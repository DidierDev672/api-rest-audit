"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResearchNoteAnalysisSchema = void 0;
const zod_1 = require("zod");
exports.CreateResearchNoteAnalysisSchema = zod_1.z.object({
    research_id: zod_1.z.string().uuid('research_id debe ser un UUID válido'),
    analysis_text: zod_1.z
        .string()
        .min(20, 'analysis_text debe tener al menos 20 caracteres')
        .max(50000, 'analysis_text no debe exceder 50000 caracteres'),
    notes_count: zod_1.z.number().int('notes_count debe ser un entero').min(1, 'notes_count debe ser >= 1'),
    source: zod_1.z.enum(['gemini', 'manual', 'other']).default('gemini'),
    model_name: zod_1.z.string().optional(),
    language: zod_1.z.string().default('es'),
});
//# sourceMappingURL=ResearchNoteAnalysisDTO.js.map