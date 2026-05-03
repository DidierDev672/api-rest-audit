"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAuditoryResearchDTO = exports.CreateAuditoryResearchDTO = exports.UpdateAuditoryResearchSchema = exports.CreateAuditoryResearchSchema = void 0;
const zod_1 = require("zod");
exports.CreateAuditoryResearchSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'El nombre es requerido'),
    description: zod_1.z.string().min(1, 'La descripción es requerida'),
});
exports.UpdateAuditoryResearchSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().min(1).optional(),
});
exports.CreateAuditoryResearchDTO = exports.CreateAuditoryResearchSchema;
exports.UpdateAuditoryResearchDTO = exports.UpdateAuditoryResearchSchema;
//# sourceMappingURL=AuditoryResearchDTO.js.map