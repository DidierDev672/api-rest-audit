"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAiDocumentUploadUseCase = void 0;
const errorHandler_1 = require("../../infrastructure/middleware/errorHandler");
class GetAiDocumentUploadUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async findAll() {
        const rows = await this.repository.findAll();
        return rows.map((r) => ({
            id: r.id,
            storage_bucket: r.storageBucket,
            storage_object_path: r.storageObjectPath,
            original_filename: r.originalFilename,
            mime_type: r.mimeType,
            file_size_bytes: r.fileSizeBytes,
            file_type: r.fileType,
            client_user_id: r.clientUserId,
            patient_id: r.patientId,
            patient_name: r.patientName,
            patient_document_type: r.patientDocumentType,
            patient_document_number: r.patientDocumentNumber,
            patient_birth_date: r.patientBirthDate,
            status: r.status,
            created_at: r.createdAt.toISOString(),
            updated_at: r.updatedAt.toISOString(),
        }));
    }
    async findById(id) {
        const row = await this.repository.findById(id);
        if (!row) {
            throw new errorHandler_1.AppError('Documento no encontrado', 404);
        }
        return {
            id: row.id,
            storage_bucket: row.storageBucket,
            storage_object_path: row.storageObjectPath,
            original_filename: row.originalFilename,
            mime_type: row.mimeType,
            file_size_bytes: row.fileSizeBytes,
            file_type: row.fileType,
            client_user_id: row.clientUserId,
            patient_id: row.patientId,
            patient_name: row.patientName,
            patient_document_type: row.patientDocumentType,
            patient_document_number: row.patientDocumentNumber,
            patient_birth_date: row.patientBirthDate,
            status: row.status,
            created_at: row.createdAt.toISOString(),
            updated_at: row.updatedAt.toISOString(),
        };
    }
}
exports.GetAiDocumentUploadUseCase = GetAiDocumentUploadUseCase;
//# sourceMappingURL=GetAiDocumentUploadUseCase.js.map