"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAiDocumentRedactionUseCase = void 0;
const ValidationError_1 = require("../../domain/errors/ValidationError");
const Logger_1 = require("../../infrastructure/logger/Logger");
class DeleteAiDocumentRedactionUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        const existing = await this.repository.findById(id);
        if (!existing) {
            throw new ValidationError_1.ValidationError(`Redacción con ID ${id} no encontrada`);
        }
        Logger_1.Logger.info('Eliminando redacción de documento AI', { id });
        await this.repository.delete(id);
        Logger_1.Logger.success('Redacción de documento AI eliminada', { id });
    }
}
exports.DeleteAiDocumentRedactionUseCase = DeleteAiDocumentRedactionUseCase;
//# sourceMappingURL=DeleteAiDocumentRedactionUseCase.js.map