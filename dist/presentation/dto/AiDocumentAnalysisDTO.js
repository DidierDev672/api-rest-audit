"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAiDocumentAnalysisSchema = void 0;
const zod_1 = require("zod");
exports.CreateAiDocumentAnalysisSchema = zod_1.z.object({
    document_upload_id: zod_1.z.string().uuid('document_upload_id debe ser un UUID válido'),
    content: zod_1.z
        .string()
        .min(1, 'El contenido no puede estar vacío')
        .refine(val => val.trim().length > 0, { message: 'El contenido no puede estar vacío' }),
    model: zod_1.z.string().min(1, 'El modelo es requerido').default('gemini-3-flash-preview'),
    analysis_id: zod_1.z.string().uuid().nullable().optional(),
});
//# sourceMappingURL=AiDocumentAnalysisDTO.js.map