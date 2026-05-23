"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAiDocumentRedactionUseCase = void 0;
const ValidationError_1 = require("../../domain/errors/ValidationError");
const Logger_1 = require("../../infrastructure/logger/Logger");
const uuid_1 = require("uuid");
class CreateAiDocumentRedactionUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(data) {
        const content = data.content?.trim();
        if (!content || content.length === 0) {
            throw new ValidationError_1.ValidationError('El contenido de la redacción no puede estar vacío');
        }
        Logger_1.Logger.info('Creando redacción de documento AI', {
            documentUploadId: data.document_upload_id,
            model: data.model,
            originalFilename: data.original_filename,
        });
        const id = (0, uuid_1.v4)();
        const now = new Date();
        await this.repository.create({
            id,
            documentUploadId: data.document_upload_id,
            analysisId: data.analysis_id ?? null,
            content,
            model: data.model || 'gemini-3-flash-preview',
            notesCount: data.notes_count ?? 0,
            originalFilename: data.original_filename,
            redactionId: data.redaction_id ?? null,
            createdAt: now,
            updatedAt: now,
        });
        Logger_1.Logger.success('Redacción de documento AI creada', { id, documentUploadId: data.document_upload_id });
        return {
            id,
            document_upload_id: data.document_upload_id,
            created_at: now.toISOString(),
        };
    }
}
exports.CreateAiDocumentRedactionUseCase = CreateAiDocumentRedactionUseCase;
//# sourceMappingURL=CreateAiDocumentRedactionUseCase.js.map