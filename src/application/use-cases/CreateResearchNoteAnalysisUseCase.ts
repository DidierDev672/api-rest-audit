import { IResearchNoteAnalysisRepository } from '../../domain/repositories/IResearchNoteAnalysisRepository';
import { IAuditoryResearchRepository } from '../../domain/repositories';
import { CreateResearchNoteAnalysisDTO } from '../../presentation/dto';
import { ValidationError } from '../../domain/errors/ValidationError';
import { Logger } from '../../infrastructure/logger/Logger';
import { v4 as uuidv4 } from 'uuid';

export class CreateResearchNoteAnalysisUseCase {
  constructor(
    private readonly repository: IResearchNoteAnalysisRepository,
    private readonly researchRepository: IAuditoryResearchRepository
  ) {}

  async execute(data: CreateResearchNoteAnalysisDTO, userId: string) {
    const research = await this.researchRepository.findById(data.research_id);
    if (!research) {
      throw new ValidationError(`Investigación con ID ${data.research_id} no encontrada`);
    }

    Logger.info('Creando análisis de notas de investigación', {
      researchId: data.research_id,
      userId,
    });

    const id = uuidv4();
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

    Logger.success('Análisis de notas de investigación creado', {
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
