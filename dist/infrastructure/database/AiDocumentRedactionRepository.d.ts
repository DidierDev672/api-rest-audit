import { AiDocumentRedaction } from '../../domain/entities/AiDocumentRedactionEntity';
import { IAiDocumentRedactionRepository } from '../../domain/repositories/IAiDocumentRedactionRepository';
export declare class AiDocumentRedactionRepository implements IAiDocumentRedactionRepository {
    private readonly table;
    create(data: AiDocumentRedaction): Promise<void>;
    findById(id: string): Promise<AiDocumentRedaction | null>;
    findAll(): Promise<AiDocumentRedaction[]>;
    findByDocumentUploadId(documentUploadId: string): Promise<AiDocumentRedaction[]>;
    update(id: string, data: Partial<AiDocumentRedaction>): Promise<AiDocumentRedaction>;
    delete(id: string): Promise<void>;
    private mapToEntity;
}
//# sourceMappingURL=AiDocumentRedactionRepository.d.ts.map