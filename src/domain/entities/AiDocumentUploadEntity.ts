export type AiDocumentFileType = 'pdf' | 'word' | 'image';

export interface AiDocumentUpload {
  id: string;
  storageBucket: string;
  storageObjectPath: string;
  originalFilename: string;
  mimeType: string;
  fileSizeBytes: number | null;
  fileType: AiDocumentFileType;
  clientUserId: string | null;
  patientId: string | null;
  patientName: string;
  patientDocumentType: string | null;
  patientDocumentNumber: string | null;
  patientBirthDate: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAiDocumentUploadInput {
  originalFilename: string;
  mimeType: string;
  fileSizeBytes: number;
  fileType: AiDocumentFileType;
  fileBuffer: Buffer;
  clientUserId: string | null;
  patientId: string | null;
  patientName: string;
  patientDocumentType: string | null;
  patientDocumentNumber: string | null;
  patientBirthDate: string | null;
}
