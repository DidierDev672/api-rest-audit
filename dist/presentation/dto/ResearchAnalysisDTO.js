"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResearchAnalysisSchema = exports.AnalysisSchema = exports.NoteReferenceSchema = void 0;
const zod_1 = require("zod");
exports.NoteReferenceSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, 'Note ID is required'),
    createdAt: zod_1.z.string().min(1, 'Created date is required'),
    updatedAt: zod_1.z.string().min(1, 'Updated date is required'),
});
exports.AnalysisSchema = zod_1.z.object({
    summary: zod_1.z.string().min(1, 'Summary is required'),
    generatedAt: zod_1.z.string().min(1, 'Generated date is required'),
    model: zod_1.z.string().min(1, 'Model is required'),
});
exports.CreateResearchAnalysisSchema = zod_1.z.object({
    researchId: zod_1.z.string().min(1, 'Research ID is required'),
    analysis: exports.AnalysisSchema,
    notesCount: zod_1.z.number().min(0, 'Notes count must be non-negative'),
    notesReferences: zod_1.z.array(exports.NoteReferenceSchema).min(0),
});
//# sourceMappingURL=ResearchAnalysisDTO.js.map