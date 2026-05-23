import { AiDocumentAnalysis } from '../../domain/entities/AiDocumentAnalysisEntity';
import { IAiDocumentAnalysisRepository } from '../../domain/repositories/IAiDocumentAnalysisRepository';
export declare class AiDocumentAnalysisRepository implements IAiDocumentAnalysisRepository {
    private readonly table;
    create(data: AiDocumentAnalysis): Promise<void>;
    findById(id: string): Promise<AiDocumentAnalysis | null>;
    findAll(): Promise<AiDocumentAnalysis[]>;
    findByDocumentUploadId(documentUploadId: string): Promise<AiDocumentAnalysis[]>;
    private mapToEntity;
}
//# sourceMappingURL=AiDocumentAnalysisRepository.d.ts.map