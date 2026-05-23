"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAiDocumentRedactionSchema = exports.CreateAiDocumentRedactionSchema = void 0;
const zod_1 = require("zod");
exports.CreateAiDocumentRedactionSchema = zod_1.z.object({
    document_upload_id: zod_1.z.string().uuid('document_upload_id debe ser un UUID válido'),
    analysis_id: zod_1.z.string().uuid('analysis_id debe ser un UUID válido').nullable().optional(),
    content: zod_1.z
        .string()
        .min(1, 'El contenido no puede estar vacío')
        .refine(val => val.trim().length > 0, { message: 'El contenido no puede estar vacío' }),
    model: zod_1.z.string().min(1, 'El modelo es requerido').default('gemini-3-flash-preview'),
    notes_count: zod_1.z.number().int().min(0, 'notes_count debe ser un número entero positivo').default(0),
    original_filename: zod_1.z.string().min(1, 'original_filename es requerido'),
    redaction_id: zod_1.z.string().uuid('redaction_id debe ser un UUID válido').nullable().optional(),
});
exports.UpdateAiDocumentRedactionSchema = zod_1.z.object({
    document_upload_id: zod_1.z.string().uuid('document_upload_id debe ser un UUID válido').optional(),
    analysis_id: zod_1.z.string().uuid('analysis_id debe ser un UUID válido').nullable().optional(),
    content: zod_1.z
        .string()
        .min(1, 'El contenido no puede estar vacío')
        .refine(val => val.trim().length > 0, { message: 'El contenido no puede estar vacío' })
        .optional(),
    model: zod_1.z.string().min(1, 'El modelo es requerido').optional(),
    notes_count: zod_1.z.number().int().min(0, 'notes_count debe ser un número entero positivo').optional(),
    original_filename: zod_1.z.string().min(1, 'original_filename es requerido').optional(),
    redaction_id: zod_1.z.string().uuid('redaction_id debe ser un UUID válido').nullable().optional(),
});
//# sourceMappingURL=AiDocumentRedactionDTO.js.map