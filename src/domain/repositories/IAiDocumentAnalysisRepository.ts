import { AiDocumentAnalysis } from '../entities/AiDocumentAnalysisEntity';

export interface IAiDocumentAnalysisRepository {
  create(data: AiDocumentAnalysis): Promise<void>;
  findById(id: string): Promise<AiDocumentAnalysis | null>;
  findByDocumentUploadId(documentUploadId: string): Promise<AiDocumentAnalysis[]>;
  findAll(): Promise<AiDocumentAnalysis[]>;
  update(id: string, data: Partial<AiDocumentAnalysis>): Promise<AiDocumentAnalysis>;
  delete(id: string): Promise<void>;
}
