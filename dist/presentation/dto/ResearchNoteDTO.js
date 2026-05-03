"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResearchNotesDTO = exports.CreateResearchNotesSchema = void 0;
const zod_1 = require("zod");
const NoteItemSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, 'El ID de la nota es requerido'),
    text: zod_1.z.string().min(1, 'El texto es requerido'),
    color: zod_1.z.string().min(1, 'El color es requerido'),
    colorName: zod_1.z.string().min(1, 'El nombre del color es requerido'),
    createdAt: zod_1.z.string().datetime({ message: 'Fecha inválida en formato ISO-8601' }),
    sourceMessageIndex: zod_1.z.number().optional(),
    sourceContent: zod_1.z.string().optional(),
});
exports.CreateResearchNotesSchema = zod_1.z.object({
    researchId: zod_1.z.string().min(1, 'El ID de investigación es requerido'),
    notes: zod_1.z.array(NoteItemSchema).min(1, 'Debe tener al menos una nota'),
});
exports.CreateResearchNotesDTO = exports.CreateResearchNotesSchema;
//# sourceMappingURL=ResearchNoteDTO.js.map