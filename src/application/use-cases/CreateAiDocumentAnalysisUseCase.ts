import { IAiDocumentAnalysisRepository } from '../../domain/repositories/IAiDocumentAnalysisRepository';
import { CreateAiDocumentAnalysisDTO } from '../../presentation/dto/AiDocumentAnalysisDTO';
import { ValidationError } from '../../domain/errors/ValidationError';
import { Logger } from '../../infrastructure/logger/Logger';
import { v4 as uuidv4 } from 'uuid';

export class CreateAiDocumentAnalysisUseCase {
  constructor(
    private readonly repository: IAiDocumentAnalysisRepository
  ) {}

  async execute(data: CreateAiDocumentAnalysisDTO, userId: string) {
    if (!data.content || data.content.trim().length === 0) {
      throw new ValidationError('El contenido del análisis no puede estar vacío');
    }

    Logger.info('Creando análisis de documento AI', {
      documentUploadId: data.document_upload_id,
      model: data.model,
      userId,
    });

    const id = uuidv4();
    const now = new Date();

    await this.repository.create({
      id,
      documentUploadId: data.document_upload_id,
      content: data.content.trim(),
      model: data.model || 'gemini-3-flash-preview',
      analysisId: data.analysis_id ?? null,
      createdAt: now,
      updatedAt: now,
    });

    Logger.success('Análisis de documento AI creado', { id, documentUploadId: data.document_upload_id });

    return {
      id,
      document_upload_id: data.document_upload_id,
      created_at: now.toISOString(),
    };
  }
}
