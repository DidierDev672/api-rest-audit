import { IAiDocumentAnalysisRepository } from '../../domain/repositories/IAiDocumentAnalysisRepository';
export declare class GetAiDocumentAnalysisUseCase {
    private readonly repository;
    constructor(repository: IAiDocumentAnalysisRepository);
    findAll(): Promise<import("../../domain/entities").AiDocumentAnalysis[]>;
    findById(id: string): Promise<import("../../domain/entities").AiDocumentAnalysis>;
    findByDocumentUploadId(documentUploadId: string): Promise<import("../../domain/entities").AiDocumentAnalysis[]>;
}
//# sourceMappingURL=GetAiDocumentAnalysisUseCase.d.ts.map