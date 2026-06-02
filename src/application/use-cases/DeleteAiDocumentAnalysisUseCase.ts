import { IAiDocumentAnalysisRepository } from '../../domain/repositories/IAiDocumentAnalysisRepository';
import { ValidationError } from '../../domain/errors/ValidationError';
import { Logger } from '../../infrastructure/logger/Logger';

export class DeleteAiDocumentAnalysisUseCase {
  constructor(
    private readonly repository: IAiDocumentAnalysisRepository
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new ValidationError(`Análisis con ID ${id} no encontrado`);
    }

    Logger.info('Eliminando análisis de documento AI', { id });
    await this.repository.delete(id);
    Logger.success('Análisis de documento AI eliminado', { id });
  }
}
