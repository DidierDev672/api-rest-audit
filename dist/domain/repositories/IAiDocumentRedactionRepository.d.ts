import { AiDocumentRedaction } from '../entities/AiDocumentRedactionEntity';
export interface IAiDocumentRedactionRepository {
    create(data: AiDocumentRedaction): Promise<void>;
    findById(id: string): Promise<AiDocumentRedaction | null>;
    findAll(): Promise<AiDocumentRedaction[]>;
    findByDocumentUploadId(documentUploadId: string): Promise<AiDocumentRedaction[]>;
    update(id: string, data: Partial<AiDocumentRedaction>): Promise<AiDocumentRedaction>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=IAiDocumentRedactionRepository.d.ts.map