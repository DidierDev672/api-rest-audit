"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInvestigacionDTO = exports.CreateInvestigacionDTO = exports.UpdateInvestigacionSchema = exports.CreateInvestigacionSchema = void 0;
const zod_1 = require("zod");
exports.CreateInvestigacionSchema = zod_1.z.object({
    id_resource: zod_1.z.string().min(1, 'id_resource es requerido y no puede estar vacío'),
    content_resource: zod_1.z.string().min(1, 'content_resource es requerido y no puede estar vacío'),
});
exports.UpdateInvestigacionSchema = zod_1.z.object({
    content_resource: zod_1.z.string().min(1, 'content_resource no puede estar vacío'),
});
exports.CreateInvestigacionDTO = exports.CreateInvestigacionSchema;
exports.UpdateInvestigacionDTO = exports.UpdateInvestigacionSchema;
//# sourceMappingURL=InvestigacionDTO.js.map