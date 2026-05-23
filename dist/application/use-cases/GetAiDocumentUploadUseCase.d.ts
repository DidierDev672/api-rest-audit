import { IAiDocumentUploadRepository } from '../../domain/repositories/IAiDocumentUploadRepository';
export declare class GetAiDocumentUploadUseCase {
    private readonly repository;
    constructor(repository: IAiDocumentUploadRepository);
    findAll(): Promise<{
        id: string;
        storage_bucket: string;
        storage_object_path: string;
        original_filename: string;
        mime_type: string;
        file_size_bytes: number | null;
        file_type: import("../../domain/entities/AiDocumentUploadEntity").AiDocumentFileType;
        client_user_id: string | null;
        patient_id: string | null;
        patient_name: string;
        patient_document_type: string | null;
        patient_document_number: string | null;
        patient_birth_date: string | null;
        status: string;
        created_at: string;
        updated_at: string;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        storage_bucket: string;
        storage_object_path: string;
        original_filename: string;
        mime_type: string;
        file_size_bytes: number | null;
        file_type: import("../../domain/entities/AiDocumentUploadEntity").AiDocumentFileType;
        client_user_id: string | null;
        patient_id: string | null;
        patient_name: string;
        patient_document_type: string | null;
        patient_document_number: string | null;
        patient_birth_date: string | null;
        status: string;
        created_at: string;
        updated_at: string;
    }>;
}
//# sourceMappingURL=GetAiDocumentUploadUseCase.d.ts.map