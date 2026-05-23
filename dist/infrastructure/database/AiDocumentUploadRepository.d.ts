import { AiDocumentUpload, CreateAiDocumentUploadInput } from '../../domain/entities/AiDocumentUploadEntity';
import { IAiDocumentUploadRepository } from '../../domain/repositories/IAiDocumentUploadRepository';
export declare class AiDocumentUploadRepository implements IAiDocumentUploadRepository {
    create(input: CreateAiDocumentUploadInput): Promise<AiDocumentUpload>;
    findAll(): Promise<AiDocumentUpload[]>;
    findById(id: string): Promise<AiDocumentUpload | null>;
    queueAnalysis(documentUploadId: string): Promise<{
        id: string;
    }>;
    private buildInsertRow;
    private mapToEntity;
}
//# sourceMappingURL=AiDocumentUploadRepository.d.ts.map