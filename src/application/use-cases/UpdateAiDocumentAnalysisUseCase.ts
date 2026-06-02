import { IAiDocumentAnalysisRepository } from '../../domain/repositories/IAiDocumentAnalysisRepository';
import { UpdateAiDocumentAnalysisDTO } from '../../presentation/dto/AiDocumentAnalysisDTO';
import { ValidationError } from '../../domain/errors/ValidationError';
import { Logger } from '../../infrastructure/logger/Logger';

export class UpdateAiDocumentAnalysisUseCase {
  constructor(
    private readonly repository: IAiDocumentAnalysisRepository
  ) {}

  async execute(id: string, data: UpdateAiDocumentAnalysisDTO) {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new ValidationError(`Análisis con ID ${id} no encontrado`);
    }

    if (data.content !== undefined) {
      const trimmed = data.content.trim();
      if (trimmed.length === 0) {
        throw new ValidationError('El contenido del análisis no puede estar vacío');
      }
      data.content = trimmed;
    }

    Logger.info('Actualizando análisis de documento AI', { id });

    const updated = await this.repository.update(id, {
      content: data.content ?? existing.content,
      model: data.model ?? existing.model,
      updatedAt: new Date(),
    });

    Logger.success('Análisis de documento AI actualizado', { id });

    return updated;
  }
}
