import { IAiDocumentRedactionRepository } from '../../domain/repositories/IAiDocumentRedactionRepository';
import { ValidationError } from '../../domain/errors/ValidationError';
import { Logger } from '../../infrastructure/logger/Logger';

export class DeleteAiDocumentRedactionUseCase {
  constructor(
    private readonly repository: IAiDocumentRedactionRepository
  ) {}

  async execute(id: string) {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new ValidationError(`Redacción con ID ${id} no encontrada`);
    }

    Logger.info('Eliminando redacción de documento AI', { id });

    await this.repository.delete(id);

    Logger.success('Redacción de documento AI eliminada', { id });
  }
}
