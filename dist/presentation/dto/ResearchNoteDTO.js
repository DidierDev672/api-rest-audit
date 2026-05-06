"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResearchNoteDTO = exports.CreateResearchNoteSchema = void 0;
const zod_1 = require("zod");
exports.CreateResearchNoteSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, 'El ID es requerido'),
    research_id: zod_1.z.string().min(1, 'El research_id es requerido'),
    id_note: zod_1.z.string().min(1, 'El id_note es requerido'),
    text: zod_1.z.string().min(1, 'El texto es requerido'),
    color: zod_1.z.string().min(1, 'El color es requerido'),
    color_name: zod_1.z.string().min(1, 'El nombre del color es requerido'),
});
exports.CreateResearchNoteDTO = exports.CreateResearchNoteSchema;
//# sourceMappingURL=ResearchNoteDTO.js.map