import { IAiDocumentRedactionRepository } from '../../domain/repositories/IAiDocumentRedactionRepository';
import { UpdateAiDocumentRedactionDTO } from '../../presentation/dto/AiDocumentRedactionDTO';
import { ValidationError } from '../../domain/errors/ValidationError';
import { Logger } from '../../infrastructure/logger/Logger';

export class UpdateAiDocumentRedactionUseCase {
  constructor(
    private readonly repository: IAiDocumentRedactionRepository
  ) {}

  async execute(id: string, data: UpdateAiDocumentRedactionDTO) {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new ValidationError(`Redacción con ID ${id} no encontrada`);
    }

    if (data.content !== undefined) {
      const trimmed = data.content.trim();
      if (trimmed.length === 0) {
        throw new ValidationError('El contenido de la redacción no puede estar vacío');
      }
      data.content = trimmed;
    }

    Logger.info('Actualizando redacción de documento AI', { id });

    const updated = await this.repository.update(id, {
      ...existing,
      ...data,
      analysisId: data.analysis_id !== undefined ? data.analysis_id : existing.analysisId,
      redactionId: data.redaction_id !== undefined ? data.redaction_id : existing.redactionId,
      updatedAt: new Date(),
    });

    Logger.success('Redacción de documento AI actualizada', { id });

    return updated;
  }
}
