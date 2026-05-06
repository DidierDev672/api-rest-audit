"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindResearchChatSessionByIdUseCase = exports.CreateResearchChatSessionUseCase = void 0;
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
class FindResearchChatSessionByIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(sessionId) {
        try {
            Logger_1.Logger.info('Verificando si chat session existe', { sessionId });
            const session = await this.repository.findById(sessionId);
            if (!session) {
                Logger_1.Logger.warn('Chat session no encontrada', { sessionId });
                return null;
            }
            Logger_1.Logger.success('Chat session encontrada', { sessionId });
            return session;
        }
        catch (error) {
            Logger_1.Logger.danger('Error al verificar chat session', { error: error.message });
            throw error;
        }
    }
}
exports.FindResearchChatSessionByIdUseCase = FindResearchChatSessionByIdUseCase;
//# sourceMappingURL=ResearchChatSessionUseCases.js.map