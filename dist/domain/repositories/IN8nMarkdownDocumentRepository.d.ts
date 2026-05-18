import { N8nMarkdownDocument, N8nMarkdownSourceType } from '../entities/N8nIntegration';
export interface CreateN8nMarkdownDocumentInput {
    webhookLogId?: string | null;
    filename: string;
    content: string;
    contentLength: number;
    storagePath?: string | null;
    sourceType: N8nMarkdownSourceType;
    task?: string | null;
    sourceTimestamp?: Date | null;
    geminiFinishReason?: string | null;
    geminiRole?: string | null;
    geminiRawResponse?: Record<string, unknown> | null;
    metadata?: Record<string, unknown>;
}
export interface IN8nMarkdownDocumentRepository {
    create(data: CreateN8nMarkdownDocumentInput): Promise<N8nMarkdownDocument>;
    findById(id: string): Promise<N8nMarkdownDocument | null>;
    findByWebhookLogId(webhookLogId: string): Promise<N8nMarkdownDocument | null>;
}
//# sourceMappingURL=IN8nMarkdownDocumentRepository.d.ts.map