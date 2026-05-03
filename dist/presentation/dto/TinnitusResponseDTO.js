"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTinnitusResponseDTO = exports.CreateTinnitusResponseDTO = exports.UpdateTinnitusResponseSchema = exports.CreateTinnitusResponseSchema = exports.AnswerSchema = exports.OptionAnswerResponseSchema = void 0;
const zod_1 = require("zod");
exports.OptionAnswerResponseSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    text: zod_1.z.string().min(1, 'El texto de la opción es requerido'),
    value: zod_1.z.number(),
});
exports.AnswerSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    title: zod_1.z.string().min(1, 'El título es requerido'),
    description: zod_1.z.string().min(1, 'La descripción es requerida'),
    optionsAnswer: zod_1.z.array(exports.OptionAnswerResponseSchema).min(1, 'Debe tener al menos una opción de respuesta'),
});
exports.CreateTinnitusResponseSchema = zod_1.z.object({
    idPatient: zod_1.z.string().min(1, 'El ID del paciente es requerido'),
    idTinnitusQuestionnaires: zod_1.z.string().min(1, 'El ID del cuestionario de tinnitus es requerido'),
    answer: zod_1.z.array(exports.AnswerSchema).min(1, 'Debe tener al menos una respuesta'),
});
exports.UpdateTinnitusResponseSchema = zod_1.z.object({
    idPatient: zod_1.z.string().min(1).optional(),
    idTinnitusQuestionnaires: zod_1.z.string().min(1).optional(),
    answer: zod_1.z.array(exports.AnswerSchema).optional(),
});
exports.CreateTinnitusResponseDTO = exports.CreateTinnitusResponseSchema;
exports.UpdateTinnitusResponseDTO = exports.UpdateTinnitusResponseSchema;
//# sourceMappingURL=TinnitusResponseDTO.js.map