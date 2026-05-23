"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAiDocumentRedactionUseCase = void 0;
const ValidationError_1 = require("../../domain/errors/ValidationError");
const Logger_1 = require("../../infrastructure/logger/Logger");
class UpdateAiDocumentRedactionUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id, data) {
        const existing = await this.repository.findById(id);
        if (!existing) {
            throw new ValidationError_1.ValidationError(`Redacción con ID ${id} no encontrada`);
        }
        if (data.content !== undefined) {
            const trimmed = data.content.trim();
            if (trimmed.length === 0) {
                throw new ValidationError_1.ValidationError('El contenido de la redacción no puede estar vacío');
            }
            data.content = trimmed;
        }
        Logger_1.Logger.info('Actualizando redacción de documento AI', { id });
        const updated = await this.repository.update(id, {
            ...existing,
            ...data,
            analysisId: data.analysis_id !== undefined ? data.analysis_id : existing.analysisId,
            redactionId: data.redaction_id !== undefined ? data.redaction_id : existing.redactionId,
            updatedAt: new Date(),
        });
        Logger_1.Logger.success('Redacción de documento AI actualizada', { id });
        return updated;
    }
}
exports.UpdateAiDocumentRedactionUseCase = UpdateAiDocumentRedactionUseCase;
//# sourceMappingURL=UpdateAiDocumentRedactionUseCase.js.map