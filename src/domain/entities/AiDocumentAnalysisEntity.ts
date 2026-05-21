export interface AiDocumentAnalysis {
  id: string;
  documentUploadId: string;
  content: string;
  model: string;
  analysisId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
