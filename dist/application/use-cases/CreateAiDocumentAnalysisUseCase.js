"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAiDocumentAnalysisUseCase = void 0;
const ValidationError_1 = require("../../domain/errors/ValidationError");
const Logger_1 = require("../../infrastructure/logger/Logger");
const uuid_1 = require("uuid");
class CreateAiDocumentAnalysisUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(data, userId) {
        if (!data.content || data.content.trim().length === 0) {
            throw new ValidationError_1.ValidationError('El contenido del análisis no puede estar vacío');
        }
        Logger_1.Logger.info('Creando análisis de documento AI', {
            documentUploadId: data.document_upload_id,
            model: data.model,
            userId,
        });
        const id = (0, uuid_1.v4)();
        const now = new Date();
        await this.repository.create({
            id,
            documentUploadId: data.document_upload_id,
            content: data.content.trim(),
            model: data.model || 'gemini-3-flash-preview',
            analysisId: data.analysis_id ?? null,
            createdAt: now,
            updatedAt: now,
        });
        Logger_1.Logger.success('Análisis de documento AI creado', { id, documentUploadId: data.document_upload_id });
        return {
            id,
            document_upload_id: data.document_upload_id,
            created_at: now.toISOString(),
        };
    }
}
exports.CreateAiDocumentAnalysisUseCase = CreateAiDocumentAnalysisUseCase;
//# sourceMappingURL=CreateAiDocumentAnalysisUseCase.js.map