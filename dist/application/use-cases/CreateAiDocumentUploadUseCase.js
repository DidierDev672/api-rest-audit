"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAiDocumentUploadUseCase = exports.inferDocumentFileType = void 0;
const errorHandler_1 = require("../../infrastructure/middleware/errorHandler");
const Logger_1 = require("../../infrastructure/logger/Logger");
function inferDocumentFileType(filename, mimeType) {
    const lower = filename.toLowerCase();
    if (mimeType === 'application/pdf' || lower.endsWith('.pdf'))
        return 'pdf';
    if (mimeType === 'application/msword' ||
        mimeType ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        lower.endsWith('.doc') ||
        lower.endsWith('.docx')) {
        return 'word';
    }
    return null;
}
exports.inferDocumentFileType = inferDocumentFileType;
class CreateAiDocumentUploadUseCase {
    constructor(uploadRepository, patientRepository) {
        this.uploadRepository = uploadRepository;
        this.patientRepository = patientRepository;
    }
    async execute(file, fields, userId) {
        const fileType = inferDocumentFileType(file.originalname, file.mimetype);
        if (!fileType) {
            throw new errorHandler_1.AppError('Solo se permiten archivos PDF o Word (.doc, .docx)', 400);
        }
        let patientId = fields.patient_id ?? null;
        let patientName = fields.patient_name?.trim() ?? '';
        let patientDocumentType = fields.patient_document_type?.trim() || null;
        let patientDocumentNumber = fields.patient_document_number?.trim() || null;
        let patientBirthDate = fields.patient_birth_date?.trim() || null;
        if (patientId) {
            const patient = await this.patientRepository.findById(patientId);
            if (!patient) {
                throw new errorHandler_1.AppError('Paciente no encontrado', 404);
            }
            patientName = patient.fullName;
            patientDocumentType = patient.documentType;
            patientDocumentNumber = patient.documentNumber;
            patientBirthDate = patient.birthDate.toISOString().slice(0, 10);
        }
        if (!patientName) {
            throw new errorHandler_1.AppError('El nombre del paciente es requerido', 400);
        }
        const input = {
            originalFilename: file.originalname,
            mimeType: file.mimetype ||
                (fileType === 'pdf'
                    ? 'application/pdf'
                    : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
            fileSizeBytes: file.size,
            fileType,
            fileBuffer: file.buffer,
            clientUserId: fields.client_user_id?.trim() || userId,
            patientId,
            patientName,
            patientDocumentType,
            patientDocumentNumber,
            patientBirthDate,
        };
        const created = await this.uploadRepository.create(input);
        Logger_1.Logger.success('Documento AI almacenado', {
            id: created.id,
            patientId: created.patientId,
            patientName: created.patientName,
        });
        return this.toResponse(created);
    }
    toResponse(upload) {
        return {
            id: upload.id,
            storage_bucket: upload.storageBucket,
            storage_object_path: upload.storageObjectPath,
            original_filename: upload.originalFilename,
            mime_type: upload.mimeType,
            file_size_bytes: upload.fileSizeBytes,
            file_type: upload.fileType,
            client_user_id: upload.clientUserId,
            patient_id: upload.patientId,
            patient_name: upload.patientName,
            patient_document_type: upload.patientDocumentType,
            patient_document_number: upload.patientDocumentNumber,
            patient_birth_date: upload.patientBirthDate,
            status: upload.status,
            created_at: upload.createdAt.toISOString(),
            updated_at: upload.updatedAt.toISOString(),
        };
    }
}
exports.CreateAiDocumentUploadUseCase = CreateAiDocumentUploadUseCase;
//# sourceMappingURL=CreateAiDocumentUploadUseCase.js.map