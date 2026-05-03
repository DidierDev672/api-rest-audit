"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchChatSessionController = void 0;
const usecases_1 = require("../../domain/usecases");
const database_1 = require("../../infrastructure/database");
const dto_1 = require("../dto");
const zod_1 = require("zod");
const Logger_1 = require("../../infrastructure/logger/Logger");
const repository = new database_1.ResearchChatSessionRepository();
class ResearchChatSessionController {
    static async createSession(req, res) {
        try {
            const { id } = req.params;
            const data = dto_1.CreateResearchChatSessionDTO.parse({
                ...req.body,
                researchId: id,
            });
            const useCase = new usecases_1.CreateResearchChatSessionUseCase(repository);
            const result = await useCase.execute(data);
            res.status(201).json(result);
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ error: error.errors });
                return;
            }
            Logger_1.Logger.danger('Error en ResearchChatSessionController.createSession', { error: error.message });
            res.status(500).json({ error: error.message });
        }
    }
}
exports.ResearchChatSessionController = ResearchChatSessionController;
//# sourceMappingURL=ResearchChatSessionController.js.map