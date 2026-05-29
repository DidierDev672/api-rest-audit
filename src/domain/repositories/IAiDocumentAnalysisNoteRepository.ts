import { AiDocumentAnalysisNote } from '../entities';

export interface IAiDocumentAnalysisNoteRepository {
  create(data: {
    aiDocumentAnalysisId: string;
    content: string;
    color: string;
    colorName: string;
    createdAt?: Date;
  }): Promise<AiDocumentAnalysisNote>;

  findAll(aiDocumentAnalysisId?: string): Promise<AiDocumentAnalysisNote[]>;

  findByAnalysisId(aiDocumentAnalysisId: string): Promise<AiDocumentAnalysisNote[]>;

  findById(id: string): Promise<AiDocumentAnalysisNote | null>;

  delete(id: string): Promise<void>;
}
