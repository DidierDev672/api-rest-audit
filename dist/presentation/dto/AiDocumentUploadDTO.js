"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manualPatientSchema = exports.CreateAiDocumentUploadFieldsSchema = void 0;
const zod_1 = require("zod");
const manualPatientSchema = zod_1.z.object({
    patient_name: zod_1.z.string().min(2, 'El nombre del paciente es requerido'),
    patient_document_type: zod_1.z.string().optional(),
    patient_document_number: zod_1.z.string().optional(),
    patient_birth_date: zod_1.z.string().optional(),
});
exports.manualPatientSchema = manualPatientSchema;
exports.CreateAiDocumentUploadFieldsSchema = zod_1.z
    .object({
    patient_id: zod_1.z.string().uuid().optional().or(zod_1.z.literal('').transform(() => undefined)),
    patient_name: zod_1.z.string().optional(),
    patient_document_type: zod_1.z.string().optional(),
    patient_document_number: zod_1.z.string().optional(),
    patient_birth_date: zod_1.z.string().optional(),
    client_user_id: zod_1.z.string().optional(),
})
    .superRefine((data, ctx) => {
    const hasPatientId = !!data.patient_id;
    const hasName = !!data.patient_name?.trim();
    if (!hasPatientId && !hasName) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: 'Indica un paciente registrado o el nombre manual',
            path: ['patient_name'],
        });
    }
});
//# sourceMappingURL=AiDocumentUploadDTO.js.map