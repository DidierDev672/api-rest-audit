"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResearchNoteAnalysisUseCase = void 0;
const ValidationError_1 = require("../../domain/errors/ValidationError");
const Logger_1 = require("../../infrastructure/logger/Logger");
const uuid_1 = require("uuid");
class CreateResearchNoteAnalysisUseCase {
    constructor(repository, researchRepository) {
        this.repository = repository;
        this.researchRepository = researchRepository;
    }
    async execute(data, userId) {
        const research = await this.researchRepository.findById(data.research_id);
        if (!research) {
            throw new ValidationError_1.ValidationError(`Investigación con ID ${data.research_id} no encontrada`);
        }
        Logger_1.Logger.info('Creando análisis de notas de investigación', {
            researchId: data.research_id,
            userId,
        });
        const id = (0, uuid_1.v4)();
        const now = new Date();
        await this.repository.create({
            id,
            researchId: data.research_id,
            analysisText: data.analysis_text,
            notesCount: data.notes_count,
            source: data.source || 'gemini',
            modelName: data.model_name,
            language: data.language || 'es',
            createdByUserId: userId,
            createdAt: now,
            updatedAt: now,
        });
        Logger_1.Logger.success('Análisis de notas de investigación creado', {
            researchId: data.research_id,
        });
        return {
            id,
            research_id: data.research_id,
            created_by_user_id: userId,
            created_at: now.toISOString(),
        };
    }
}
exports.CreateResearchNoteAnalysisUseCase = CreateResearchNoteAnalysisUseCase;
//# sourceMappingURL=CreateResearchNoteAnalysisUseCase.js.map