import { CreateAiDocumentUploadInput } from '../../domain/entities/AiDocumentUploadEntity';
import { IAiDocumentUploadRepository } from '../../domain/repositories/IAiDocumentUploadRepository';
import { IPatientRepository } from '../../domain/repositories/IPatientRepository';
import { AppError } from '../../infrastructure/middleware/errorHandler';
import { Logger } from '../../infrastructure/logger/Logger';
import type { CreateAiDocumentUploadFieldsDTO } from '../../presentation/dto/AiDocumentUploadDTO';

export type AiDocumentFileType = 'pdf' | 'word' | 'image';

export function inferDocumentFileType(
  filename: string,
  mimeType: string,
): AiDocumentFileType | null {
  const lower = filename.toLowerCase();
  if (mimeType === 'application/pdf' || lower.endsWith('.pdf')) return 'pdf';
  if (
    mimeType === 'application/msword' ||
    mimeType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    lower.endsWith('.doc') ||
    lower.endsWith('.docx')
  ) {
    return 'word';
  }
  if (
    mimeType.startsWith('image/') ||
    lower.endsWith('.png') ||
    lower.endsWith('.jpg') ||
    lower.endsWith('.jpeg') ||
    lower.endsWith('.webp') ||
    lower.endsWith('.gif') ||
    lower.endsWith('.bmp')
  ) {
    return 'image';
  }
  return null;
}

export class CreateAiDocumentUploadUseCase {
  constructor(
    private readonly uploadRepository: IAiDocumentUploadRepository,
    private readonly patientRepository: IPatientRepository,
  ) {}

  async execute(
    file: Express.Multer.File,
    fields: CreateAiDocumentUploadFieldsDTO,
    userId: string | null,
  ) {
    const fileType = inferDocumentFileType(file.originalname, file.mimetype);
    if (!fileType) {
      throw new AppError(
        'Solo se permiten archivos PDF, Word (.doc, .docx) o imagenes (png, jpg, jpeg, webp, gif, bmp)',
        400,
      );
    }

    let patientId: string | null = fields.patient_id ?? null;
    let patientName = fields.patient_name?.trim() ?? '';
    let patientDocumentType = fields.patient_document_type?.trim() || null;
    let patientDocumentNumber = fields.patient_document_number?.trim() || null;
    let patientBirthDate = fields.patient_birth_date?.trim() || null;

    if (patientId) {
      const patient = await this.patientRepository.findById(patientId);
      if (!patient) {
        throw new AppError('Paciente no encontrado', 404);
      }
      patientName = patient.fullName;
      patientDocumentType = patient.documentType;
      patientDocumentNumber = patient.documentNumber;
      patientBirthDate = patient.birthDate.toISOString().slice(0, 10);
    }

    if (!patientName) {
      throw new AppError('El nombre del paciente es requerido', 400);
    }

    const input: CreateAiDocumentUploadInput = {
      originalFilename: file.originalname,
      mimeType:
        file.mimetype ||
        (fileType === 'pdf'
          ? 'application/pdf'
          : fileType === 'word'
            ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            : 'image/jpeg'),
      fileSizeBytes: file.size,
      fileType,
      fileBuffer: file.buffer,
      clientUserId: fields.client_user_id?.trim() || userId,
      patientId,
      patientName,
      patientDocumentType,
      patientDocumentNumber,
      patientBirthDate,
    };

    const created = await this.uploadRepository.create(input);

    Logger.success('Documento AI almacenado', {
      id: created.id,
      patientId: created.patientId,
      patientName: created.patientName,
    });

    return this.toResponse(created);
  }

  private toResponse(upload: Awaited<ReturnType<IAiDocumentUploadRepository['create']>>) {
    return {
      id: upload.id,
      storage_bucket: upload.storageBucket,
      storage_object_path: upload.storageObjectPath,
      original_filename: upload.originalFilename,
      mime_type: upload.mimeType,
      file_size_bytes: upload.fileSizeBytes,
      file_type: upload.fileType,
      client_user_id: upload.clientUserId,
      patient_id: upload.patientId,
      patient_name: upload.patientName,
      patient_document_type: upload.patientDocumentType,
      patient_document_number: upload.patientDocumentNumber,
      patient_birth_date: upload.patientBirthDate,
      status: upload.status,
      created_at: upload.createdAt.toISOString(),
      updated_at: upload.updatedAt.toISOString(),
    };
  }
}
