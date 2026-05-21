export interface AiDocumentRedaction {
  id: string;
  documentUploadId: string;
  analysisId: string | null;
  content: string;
  model: string;
  notesCount: number;
  originalFilename: string;
  redactionId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
