import { IAiDocumentAnalysisRepository } from '../../domain/repositories/IAiDocumentAnalysisRepository';
import { ValidationError } from '../../domain/errors/ValidationError';
import { Logger } from '../../infrastructure/logger/Logger';

export class GetAiDocumentAnalysisUseCase {
  constructor(
    private readonly repository: IAiDocumentAnalysisRepository
  ) {}

  async findAll() {
    Logger.info('Obteniendo todos los análisis de documentos AI');
    return this.repository.findAll();
  }

  async findById(id: string) {
    Logger.info('Obteniendo análisis de documento AI por ID', { id });

    const analysis = await this.repository.findById(id);
    if (!analysis) {
      throw new ValidationError(`Análisis con ID ${id} no encontrado`);
    }

    return analysis;
  }

  async findByDocumentUploadId(documentUploadId: string) {
    Logger.info('Obteniendo análisis por documentUploadId', { documentUploadId });

    const analyses = await this.repository.findByDocumentUploadId(documentUploadId);
    return analyses;
  }
}
