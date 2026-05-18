"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.N8nReceivePayloadSchema = exports.N8nMarkdownUploadSchema = exports.N8nReceiveGeminiSchema = exports.N8nReceiveTextSchema = exports.N8nSendTextSchema = void 0;
const zod_1 = require("zod");
const nonEmptyText = zod_1.z
    .string({
    required_error: 'El texto es requerido',
    invalid_type_error: 'El texto debe ser una cadena de caracteres',
})
    .min(1, 'El texto no puede estar vacío')
    .refine((value) => value.trim().length > 0, {
    message: 'El texto no puede contener solo espacios en blanco',
});
const geminiPartSchema = zod_1.z
    .object({
    text: zod_1.z.string().optional(),
    thoughtSignature: zod_1.z.string().optional(),
})
    .passthrough();
const geminiContentSchema = zod_1.z
    .object({
    parts: zod_1.z.array(geminiPartSchema).min(1, 'Se requiere al menos una parte en content.parts'),
    role: zod_1.z.string().optional(),
})
    .passthrough();
const geminiResponseSchema = zod_1.z
    .object({
    content: geminiContentSchema,
    finishReason: zod_1.z.string().optional(),
    index: zod_1.z.number().optional(),
})
    .passthrough();
exports.N8nSendTextSchema = zod_1.z.object({
    text: nonEmptyText,
    metadata: zod_1.z.record(zod_1.z.unknown()).optional(),
});
exports.N8nReceiveTextSchema = zod_1.z.object({
    text: nonEmptyText,
    metadata: zod_1.z.record(zod_1.z.unknown()).optional(),
});
exports.N8nReceiveGeminiSchema = zod_1.z.object({
    task: zod_1.z.string().min(1, 'El campo task es requerido'),
    gemini_response: geminiResponseSchema,
    timestamp: zod_1.z.string().optional(),
    filename: zod_1.z.string().optional(),
    metadata: zod_1.z.record(zod_1.z.unknown()).optional(),
});
exports.N8nMarkdownUploadSchema = zod_1.z.object({
    filename: zod_1.z.string().min(1, 'El nombre del archivo es requerido'),
    content: nonEmptyText,
    metadata: zod_1.z.record(zod_1.z.unknown()).optional(),
});
const n8nReceivePayloadSchema = zod_1.z.union([
    exports.N8nReceiveGeminiSchema,
    exports.N8nMarkdownUploadSchema,
    exports.N8nReceiveTextSchema,
]);
exports.N8nReceivePayloadSchema = zod_1.z.preprocess((value) => {
    if (typeof value === 'object' &&
        value !== null &&
        'body' in value &&
        typeof value.body === 'object' &&
        value.body !== null) {
        return value.body;
    }
    return value;
}, n8nReceivePayloadSchema);
//# sourceMappingURL=N8nTextDTO.js.map