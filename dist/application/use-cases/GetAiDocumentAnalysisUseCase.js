"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAiDocumentAnalysisUseCase = void 0;
const ValidationError_1 = require("../../domain/errors/ValidationError");
const Logger_1 = require("../../infrastructure/logger/Logger");
class GetAiDocumentAnalysisUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async findAll() {
        Logger_1.Logger.info('Obteniendo todos los análisis de documentos AI');
        return this.repository.findAll();
    }
    async findById(id) {
        Logger_1.Logger.info('Obteniendo análisis de documento AI por ID', { id });
        const analysis = await this.repository.findById(id);
        if (!analysis) {
            throw new ValidationError_1.ValidationError(`Análisis con ID ${id} no encontrado`);
        }
        return analysis;
    }
    async findByDocumentUploadId(documentUploadId) {
        Logger_1.Logger.info('Obteniendo análisis por documentUploadId', { documentUploadId });
        const analyses = await this.repository.findByDocumentUploadId(documentUploadId);
        return analyses;
    }
}
exports.GetAiDocumentAnalysisUseCase = GetAiDocumentAnalysisUseCase;
//# sourceMappingURL=GetAiDocumentAnalysisUseCase.js.map