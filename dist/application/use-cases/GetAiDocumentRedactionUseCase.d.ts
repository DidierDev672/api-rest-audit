import { IAiDocumentRedactionRepository } from '../../domain/repositories/IAiDocumentRedactionRepository';
export declare class GetAiDocumentRedactionUseCase {
    private readonly repository;
    constructor(repository: IAiDocumentRedactionRepository);
    findAll(): Promise<import("../../domain/entities").AiDocumentRedaction[]>;
    findById(id: string): Promise<import("../../domain/entities").AiDocumentRedaction>;
    findByDocumentUploadId(documentUploadId: string): Promise<import("../../domain/entities").AiDocumentRedaction[]>;
}
//# sourceMappingURL=GetAiDocumentRedactionUseCase.d.ts.map