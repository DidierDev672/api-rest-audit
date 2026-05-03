"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateScreeningNoteSchema = exports.CreateScreeningNoteSchema = void 0;
const zod_1 = require("zod");
exports.CreateScreeningNoteSchema = zod_1.z.object({
    id_patient: zod_1.z.string().uuid('El ID del paciente debe ser un UUID válido'),
    id_screening: zod_1.z.string().uuid('El ID del tamizaje debe ser un UUID válido'),
    id_doctor: zod_1.z.string().uuid('El ID del doctor debe ser un UUID válido'),
    title_note: zod_1.z.string().min(1, 'El título es requerido').max(255, 'El título no puede exceder 255 caracteres'),
    description_note: zod_1.z.string().min(1, 'La descripción es requerida'),
});
exports.UpdateScreeningNoteSchema = zod_1.z.object({
    id_patient: zod_1.z.string().uuid().optional(),
    id_screening: zod_1.z.string().uuid().optional(),
    id_doctor: zod_1.z.string().uuid().optional(),
    title_note: zod_1.z.string().min(1).max(255).optional(),
    description_note: zod_1.z.string().min(1).optional(),
});
//# sourceMappingURL=ScreeningNoteDTO.js.map