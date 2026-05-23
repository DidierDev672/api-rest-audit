/// <reference types="multer" />
import { IAiDocumentUploadRepository } from '../../domain/repositories/IAiDocumentUploadRepository';
import { IPatientRepository } from '../../domain/repositories/IPatientRepository';
import type { CreateAiDocumentUploadFieldsDTO } from '../../presentation/dto/AiDocumentUploadDTO';
export type AiDocumentFileType = 'pdf' | 'word';
export declare function inferDocumentFileType(filename: string, mimeType: string): AiDocumentFileType | null;
export declare class CreateAiDocumentUploadUseCase {
    private readonly uploadRepository;
    private readonly patientRepository;
    constructor(uploadRepository: IAiDocumentUploadRepository, patientRepository: IPatientRepository);
    execute(file: Express.Multer.File, fields: CreateAiDocumentUploadFieldsDTO, userId: string | null): Promise<{
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
    private toResponse;
}
//# sourceMappingURL=CreateAiDocumentUploadUseCase.d.ts.map