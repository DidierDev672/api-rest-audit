"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResearchChatSessionDTO = exports.CreateResearchChatSessionSchema = void 0;
const zod_1 = require("zod");
const ChatMessageSchema = zod_1.z.object({
    role: zod_1.z.enum(['user', 'assistant']),
    content: zod_1.z.string().min(1, 'El contenido es requerido'),
    timestamp: zod_1.z.string().datetime({ message: 'Fecha inválida en formato ISO-8601' }),
});
const SessionSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'El título es requerido'),
    originalDescription: zod_1.z.string().optional(),
    messages: zod_1.z.array(ChatMessageSchema).optional(),
    summary: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    createdAt: zod_1.z.string().datetime({ message: 'Fecha inválida en formato ISO-8601' }).optional(),
    updatedAt: zod_1.z.string().datetime({ message: 'Fecha inválida en formato ISO-8601' }).optional(),
});
const MetadataSchema = zod_1.z.object({
    totalMessages: zod_1.z.number().int().min(0).optional(),
    totalUserMessages: zod_1.z.number().int().min(0).optional(),
    totalAssistantMessages: zod_1.z.number().int().min(0).optional(),
    duration: zod_1.z.number().int().min(0).optional(),
    aiModel: zod_1.z.string().optional(),
});
exports.CreateResearchChatSessionSchema = zod_1.z.object({
    researchId: zod_1.z.string().min(1, 'El ID de investigación es requerido'),
    session: SessionSchema,
    metadata: MetadataSchema.optional(),
});
exports.CreateResearchChatSessionDTO = exports.CreateResearchChatSessionSchema;
//# sourceMappingURL=ResearchChatSessionDTO.js.map