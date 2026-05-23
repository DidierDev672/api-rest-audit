import { IAiDocumentAnalysisRepository } from '../../domain/repositories/IAiDocumentAnalysisRepository';
import { CreateAiDocumentAnalysisDTO } from '../../presentation/dto/AiDocumentAnalysisDTO';
export declare class CreateAiDocumentAnalysisUseCase {
    private readonly repository;
    constructor(repository: IAiDocumentAnalysisRepository);
    execute(data: CreateAiDocumentAnalysisDTO, userId: string): Promise<{
        id: string;
        document_upload_id: string;
        created_at: string;
    }>;
}
//# sourceMappingURL=CreateAiDocumentAnalysisUseCase.d.ts.map