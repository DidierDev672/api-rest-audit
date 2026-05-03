import { IResearchAnalysisRepository } from '../../domain/repositories';
import { CreateResearchAnalysisDTO } from '../../presentation/dto';
import { ValidationError } from '../../domain/errors/ValidationError';
import { Logger } from '../../infrastructure/logger/Logger';
import { ResearchAnalysis } from '../../domain/entities';

export class CreateResearchAnalysisUseCase {
  constructor(private readonly repository: IResearchAnalysisRepository) {}

  async execute(data: CreateResearchAnalysisDTO): Promise<ResearchAnalysis> {
    const { researchId, analysis, notesCount, notesReferences } = data;

    if (!researchId?.trim()) {
      throw new ValidationError('researchId cannot be null or empty');
    }

    if (!analysis?.summary?.trim()) {
      throw new ValidationError('analysis.summary cannot be null or empty');
    }

    if (!analysis?.generatedAt?.trim()) {
      throw new ValidationError('analysis.generatedAt cannot be null or empty');
    }

    if (!analysis?.model?.trim()) {
      throw new ValidationError('analysis.model cannot be null or empty');
    }

    if (notesCount < 0) {
      throw new ValidationError('notesCount must be non-negative');
    }

    Logger.info('Creating research analysis', { researchId, notesCount });

    const analysisData: Omit<ResearchAnalysis, 'id' | 'createdAt' | 'updatedAt'> = {
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