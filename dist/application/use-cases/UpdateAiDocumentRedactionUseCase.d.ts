import { IAiDocumentRedactionRepository } from '../../domain/repositories/IAiDocumentRedactionRepository';
import { UpdateAiDocumentRedactionDTO } from '../../presentation/dto/AiDocumentRedactionDTO';
export declare class UpdateAiDocumentRedactionUseCase {
    private readonly repository;
    constructor(repository: IAiDocumentRedactionRepository);
    execute(id: string, data: UpdateAiDocumentRedactionDTO): Promise<import("../../domain/entities").AiDocumentRedaction>;
}
//# sourceMappingURL=UpdateAiDocumentRedactionUseCase.d.ts.map