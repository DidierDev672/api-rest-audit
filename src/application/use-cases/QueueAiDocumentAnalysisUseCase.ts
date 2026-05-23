import { IAiDocumentUploadRepository } from '../../domain/repositories/IAiDocumentUploadRepository';
import { AppError } from '../../infrastructure/middleware/errorHandler';

export class QueueAiDocumentAnalysisUseCase {
  constructor(private readonly repository: IAiDocumentUploadRepository) {}

  async execute(documentUploadId: string) {
    const doc = await this.repository.findById(documentUploadId);
    if (!doc) {
      throw new AppError('Documento no encontrado', 404);
    }

    const queued = await this.repository.queueAnalysis(documentUploadId);

    return {
      id: queued.id,
      document_upload_id: documentUploadId,
      status: 'pending',
    };
  }
}
