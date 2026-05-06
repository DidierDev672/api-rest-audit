"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInvestigacionDTO = exports.CreateInvestigacionSchema = void 0;
const zod_1 = require("zod");
exports.CreateInvestigacionSchema = zod_1.z.object({
    id_resource: zod_1.z.string().min(1, 'id_resource es requerido y no puede estar vacío'),
    content_resource: zod_1.z.string().min(1, 'content_resource es requerido y no puede estar vacío'),
});
exports.CreateInvestigacionDTO = exports.CreateInvestigacionSchema;
//# sourceMappingURL=InvestigacionDTO.js.map