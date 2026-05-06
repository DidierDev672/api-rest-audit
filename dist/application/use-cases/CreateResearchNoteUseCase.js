"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResearchNoteUseCase = void 0;
const ValidationError_1 = require("../../domain/errors/ValidationError");
const Logger_1 = require("../../infrastructure/logger/Logger");
class CreateResearchNoteUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(data) {
        const { id, research_id, id_note, text, color, color_name } = data;
        if (!id?.trim())
            throw new ValidationError_1.ValidationError('id no puede ser nulo o vacío');
        if (!research_id?.trim())
            throw new ValidationError_1.ValidationError('research_id no puede ser nulo o vacío');
        if (!id_note?.trim())
            throw new ValidationError_1.ValidationError('id_note no puede ser nulo o vacío');
        if (!text?.trim())
            throw new ValidationError_1.ValidationError('text no puede ser nulo o vacío');
        if (!color?.trim())
            throw new ValidationError_1.ValidationError('color no puede ser nulo o vacío');
        if (!color_name?.trim())
            throw new ValidationError_1.ValidationError('color_name no puede ser nulo o vacío');
        Logger_1.Logger.info('Creando nota de investigación', { id, research_id });
        await this.repository.create({
            id,
            research_id,
            id_note,
            text,
            color,
            color_name,
        });
    }
}
exports.CreateResearchNoteUseCase = CreateResearchNoteUseCase;
//# sourceMappingURL=CreateResearchNoteUseCase.js.map