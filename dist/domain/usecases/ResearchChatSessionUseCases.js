"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResearchChatSessionUseCase = void 0;
const Logger_1 = require("../../infrastructure/logger/Logger");
class CreateResearchChatSessionUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(data) {
        try {
            Logger_1.Logger.info('Creando chat session de investigacion', { researchId: data.researchId, title: data.session.title });
            const result = await this.repository.createSessionWithMessages(data.researchId, data.session, data.metadata);
            Logger_1.Logger.success('Chat session de investigacion creado', { title: data.session.title });
            return result;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al crear chat session de investigacion', { error: error.message });
            throw error;
        }
    }
}
exports.CreateResearchChatSessionUseCase = CreateResearchChatSessionUseCase;
//# sourceMappingURL=ResearchChatSessionUseCases.js.map