"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRelaxingSoundDTO = exports.CreateRelaxingSoundDTO = exports.UpdateRelaxingSoundSchema = exports.CreateRelaxingSoundSchema = void 0;
const zod_1 = require("zod");
exports.CreateRelaxingSoundSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'El título es requerido'),
    description: zod_1.z.string().min(1, 'La descripción es requerida'),
    sound: zod_1.z.string().min(1, 'El sonido es requerido'),
});
exports.UpdateRelaxingSoundSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().min(1).optional(),
    sound: zod_1.z.string().min(1).optional(),
});
exports.CreateRelaxingSoundDTO = exports.CreateRelaxingSoundSchema;
exports.UpdateRelaxingSoundDTO = exports.UpdateRelaxingSoundSchema;
//# sourceMappingURL=RelaxingSoundDTO.js.map