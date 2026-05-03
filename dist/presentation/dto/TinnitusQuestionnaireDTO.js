"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTinnitusQuestionnaireDTO = exports.CreateTinnitusQuestionnaireDTO = exports.UpdateTinnitusQuestionnaireSchema = exports.CreateTinnitusQuestionnaireSchema = exports.QuestionSchema = exports.OptionAnswerSchema = void 0;
const zod_1 = require("zod");
exports.OptionAnswerSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    text: zod_1.z.string().min(1, 'El texto de la opción es requerido'),
    value: zod_1.z.number(),
});
exports.QuestionSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    title: zod_1.z.string().min(1, 'El título de la pregunta es requerido'),
    description: zod_1.z.string().min(1, 'La descripción es requerida'),
    optionsAnswer: zod_1.z.array(exports.OptionAnswerSchema).min(1, 'Debe tener al menos una opción'),
});
exports.CreateTinnitusQuestionnaireSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'El título es requerido'),
    description: zod_1.z.string().min(1, 'La descripción es requerida'),
    questions: zod_1.z.array(exports.QuestionSchema).min(1, 'Debe tener al menos una pregunta'),
});
exports.UpdateTinnitusQuestionnaireSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().min(1).optional(),
    questions: zod_1.z.array(exports.QuestionSchema).optional(),
});
exports.CreateTinnitusQuestionnaireDTO = exports.CreateTinnitusQuestionnaireSchema;
exports.UpdateTinnitusQuestionnaireDTO = exports.UpdateTinnitusQuestionnaireSchema;
//# sourceMappingURL=TinnitusQuestionnaireDTO.js.map