"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResearchNotesUseCase = void 0;
const Logger_1 = require("../../infrastructure/logger/Logger");
class CreateResearchNotesUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(data) {
        try {
            Logger_1.Logger.info('Creando notas de investigacion', { researchId: data.researchId, count: data.notes.length });
            const notesToCreate = data.notes.map(note => ({
                researchId: data.researchId,
                idNote: note.id,
                text: note.text,
                color: note.color,
                colorName: note.colorName,
                sourceMessageIndex: note.sourceMessageIndex,
                sourceContent: note.sourceContent,
            }));
            const result = await this.repository.createMany(notesToCreate);
            Logger_1.Logger.success('Notas de investigacion creadas', { count: result.length });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al crear notas de investigacion', { error: error.message });
            throw error;
        }
    }
}
exports.CreateResearchNotesUseCase = CreateResearchNotesUseCase;
//# sourceMappingURL=ResearchNoteUseCases.js.map