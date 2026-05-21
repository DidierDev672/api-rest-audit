import { IAiDocumentRedactionRepository } from '../../domain/repositories/IAiDocumentRedactionRepository';
import { CreateAiDocumentRedactionDTO } from '../../presentation/dto/AiDocumentRedactionDTO';
import { ValidationError } from '../../domain/errors/ValidationError';
import { Logger } from '../../infrastructure/logger/Logger';
import { v4 as uuidv4 } from 'uuid';

export class CreateAiDocumentRedactionUseCase {
  constructor(
    private readonly repository: IAiDocumentRedactionRepository
  ) {}

  async execute(data: CreateAiDocumentRedactionDTO) {
    const content = data.content?.trim();
    if (!content || content.length === 0) {
      throw new ValidationError('El contenido de la redacción no puede estar vacío');
    }

    Logger.info('Creando redacción de documento AI', {
      documentUploadId: data.document_upload_id,
      model: data.model,
      originalFilename: data.original_filename,
    });

    const id = uuidv4();
    const now = new Date();

    await this.repository.create({
      id,
      documentUploadId: data.document_upload_id,
      analysisId: data.analysis_id ?? null,
      content,
      model: data.model || 'gemini-3-flash-preview',
      notesCount: data.notes_count ?? 0,
      originalFilename: data.original_filename,
      redactionId: data.redaction_id ?? null,
      createdAt: now,
      updatedAt: now,
    });

    Logger.success('Redacción de documento AI creada', { id, documentUploadId: data.document_upload_id });

    return {
      id,
      document_upload_id: data.document_upload_id,
      created_at: now.toISOString(),
    };
  }
}
