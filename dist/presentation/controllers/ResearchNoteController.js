"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchNoteController = void 0;
const usecases_1 = require("../../domain/usecases");
const database_1 = require("../../infrastructure/database");
const dto_1 = require("../dto");
const zod_1 = require("zod");
const Logger_1 = require("../../infrastructure/logger/Logger");
const repository = new database_1.ResearchNoteRepository();
class ResearchNoteController {
    static async createNotes(req, res) {
        try {
            const { id } = req.params;
            const data = dto_1.CreateResearchNotesDTO.parse({
                ...req.body,
                researchId: id,
            });
            const useCase = new usecases_1.CreateResearchNotesUseCase(repository);
            const result = await useCase.execute({
                researchId: id,
                notes: data.notes,
            });
            res.status(201).json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            Logger_1.Logger.danger('Error en ResearchNoteController.createNotes', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
}
exports.ResearchNoteController = ResearchNoteController;
//# sourceMappingURL=ResearchNoteController.js.map