import { CreateN8nMarkdownDocumentInput, IN8nMarkdownDocumentRepository } from '../../domain/repositories/IN8nMarkdownDocumentRepository';
import { N8nMarkdownDocument } from '../../domain/entities/N8nIntegration';
export declare class N8nMarkdownDocumentRepository implements IN8nMarkdownDocumentRepository {
    private readonly table;
    create(data: CreateN8nMarkdownDocumentInput): Promise<N8nMarkdownDocument>;
    findById(id: string): Promise<N8nMarkdownDocument | null>;
    findByWebhookLogId(webhookLogId: string): Promise<N8nMarkdownDocument | null>;
    private mapToEntity;
}
//# sourceMappingURL=N8nMarkdownDocumentRepository.d.ts.map