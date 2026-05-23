import { IAiDocumentRedactionRepository } from '../../domain/repositories/IAiDocumentRedactionRepository';
import { CreateAiDocumentRedactionDTO } from '../../presentation/dto/AiDocumentRedactionDTO';
export declare class CreateAiDocumentRedactionUseCase {
    private readonly repository;
    constructor(repository: IAiDocumentRedactionRepository);
    execute(data: CreateAiDocumentRedactionDTO): Promise<{
        id: string;
        document_upload_id: string;
        created_at: string;
    }>;
}
//# sourceMappingURL=CreateAiDocumentRedactionUseCase.d.ts.map