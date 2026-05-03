"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateScreeningSchema = exports.CreateScreeningSchema = void 0;
const zod_1 = require("zod");
const TinnitusQuestionnaireDTO_1 = require("./TinnitusQuestionnaireDTO");
const QuestionSchema = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    sound: zod_1.z.string().min(1, 'El sonido es requerido'),
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    optionsAnswer: zod_1.z.array(TinnitusQuestionnaireDTO_1.OptionAnswerSchema).min(1, 'Debe tener al menos una opción'),
});
exports.CreateScreeningSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'El título es requerido'),
    description: zod_1.z.string().min(1, 'La descripción es requerida'),
    questions: zod_1.z.array(QuestionSchema).min(1, 'Debe tener al menos una pregunta'),
});
exports.UpdateScreeningSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().min(1).optional(),
    questions: zod_1.z.array(QuestionSchema).optional(),
});
//# sourceMappingURL=ScreeningDTO.js.map