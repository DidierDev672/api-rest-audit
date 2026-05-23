import { IAiDocumentUploadRepository } from '../../domain/repositories/IAiDocumentUploadRepository';
export declare class QueueAiDocumentAnalysisUseCase {
    private readonly repository;
    constructor(repository: IAiDocumentUploadRepository);
    execute(documentUploadId: string): Promise<{
        id: string;
        document_upload_id: string;
        status: string;
    }>;
}
//# sourceMappingURL=QueueAiDocumentAnalysisUseCase.d.ts.map