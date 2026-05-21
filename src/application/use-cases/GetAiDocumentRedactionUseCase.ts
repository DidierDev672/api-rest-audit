import { IAiDocumentRedactionRepository } from '../../domain/repositories/IAiDocumentRedactionRepository';
import { ValidationError } from '../../domain/errors/ValidationError';
import { Logger } from '../../infrastructure/logger/Logger';

export class GetAiDocumentRedactionUseCase {
  constructor(
    private readonly repository: IAiDocumentRedactionRepository
  ) {}

  async findAll() {
    Logger.info('Obteniendo todas las redacciones de documentos AI');
    return this.repository.findAll();
  }

  async findById(id: string) {
    Logger.info('Obteniendo redacción de documento AI por ID', { id });

    const redaction = await this.repository.findById(id);
    if (!redaction) {
      throw new ValidationError(`Redacción con ID ${id} no encontrada`);
    }

    return redaction;
  }

  async findByDocumentUploadId(documentUploadId: string) {
    Logger.info('Obteniendo redacciones por documentUploadId', { documentUploadId });
    return this.repository.findByDocumentUploadId(documentUploadId);
  }
}
