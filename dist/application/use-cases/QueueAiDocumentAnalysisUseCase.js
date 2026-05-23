"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueAiDocumentAnalysisUseCase = void 0;
const errorHandler_1 = require("../../infrastructure/middleware/errorHandler");
class QueueAiDocumentAnalysisUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(documentUploadId) {
        const doc = await this.repository.findById(documentUploadId);
        if (!doc) {
            throw new errorHandler_1.AppError('Documento no encontrado', 404);
        }
        const queued = await this.repository.queueAnalysis(documentUploadId);
        return {
            id: queued.id,
            document_upload_id: documentUploadId,
            status: 'pending',
        };
    }
}
exports.QueueAiDocumentAnalysisUseCase = QueueAiDocumentAnalysisUseCase;
//# sourceMappingURL=QueueAiDocumentAnalysisUseCase.js.map