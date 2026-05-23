"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAiDocumentRedactionUseCase = void 0;
const ValidationError_1 = require("../../domain/errors/ValidationError");
const Logger_1 = require("../../infrastructure/logger/Logger");
class GetAiDocumentRedactionUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async findAll() {
        Logger_1.Logger.info('Obteniendo todas las redacciones de documentos AI');
        return this.repository.findAll();
    }
    async findById(id) {
        Logger_1.Logger.info('Obteniendo redacción de documento AI por ID', { id });
        const redaction = await this.repository.findById(id);
        if (!redaction) {
            throw new ValidationError_1.ValidationError(`Redacción con ID ${id} no encontrada`);
        }
        return redaction;
    }
    async findByDocumentUploadId(documentUploadId) {
        Logger_1.Logger.info('Obteniendo redacciones por documentUploadId', { documentUploadId });
        return this.repository.findByDocumentUploadId(documentUploadId);
    }
}
exports.GetAiDocumentRedactionUseCase = GetAiDocumentRedactionUseCase;
//# sourceMappingURL=GetAiDocumentRedactionUseCase.js.map