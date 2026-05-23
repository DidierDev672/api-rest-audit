import { AiDocumentUpload, CreateAiDocumentUploadInput } from '../entities/AiDocumentUploadEntity';
export interface IAiDocumentUploadRepository {
    create(input: CreateAiDocumentUploadInput): Promise<AiDocumentUpload>;
    findAll(): Promise<AiDocumentUpload[]>;
    findById(id: string): Promise<AiDocumentUpload | null>;
    queueAnalysis(documentUploadId: string): Promise<{
        id: string;
    }>;
}
//# sourceMappingURL=IAiDocumentUploadRepository.d.ts.map