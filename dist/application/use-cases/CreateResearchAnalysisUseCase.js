"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResearchAnalysisUseCase = void 0;
const ValidationError_1 = require("../../domain/errors/ValidationError");
const Logger_1 = require("../../infrastructure/logger/Logger");
class CreateResearchAnalysisUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(data) {
        const { researchId, analysis, notesCount, notesReferences } = data;
        if (!researchId?.trim()) {
            throw new ValidationError_1.ValidationError('researchId cannot be null or empty');
        }
        if (!analysis?.summary?.trim()) {
            throw new ValidationError_1.ValidationError('analysis.summary cannot be null or empty');
        }
        if (!analysis?.generatedAt?.trim()) {
            throw new ValidationError_1.ValidationError('analysis.generatedAt cannot be null or empty');
        }
        if (!analysis?.model?.trim()) {
            throw new ValidationError_1.ValidationError('analysis.model cannot be null or empty');
        }
        if (notesCount < 0) {
            throw new ValidationError_1.ValidationError('notesCount must be non-negative');
        }
        Logger_1.Logger.info('Creating research analysis', { researchId, notesCount });
        const analysisData = {
            researchId,
            analysis: {
                summary: analysis.summary,
                generatedAt: analysis.generatedAt,
                model: analysis.model,
            },
            notesCount,
            notesReferences: notesReferences.map(ref => ({
                id: ref.id,
                createdAt: ref.createdAt,
                updatedAt: ref.updatedAt,
            })),
        };
        return await this.repository.create(analysisData);
    }
}
exports.CreateResearchAnalysisUseCase = CreateResearchAnalysisUseCase;
//# sourceMappingURL=CreateResearchAnalysisUseCase.js.map