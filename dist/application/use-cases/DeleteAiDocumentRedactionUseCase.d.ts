import { IAiDocumentRedactionRepository } from '../../domain/repositories/IAiDocumentRedactionRepository';
export declare class DeleteAiDocumentRedactionUseCase {
    private readonly repository;
    constructor(repository: IAiDocumentRedactionRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=DeleteAiDocumentRedactionUseCase.d.ts.map