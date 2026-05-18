import { N8nTextRequest, N8nTextResponse } from '../entities/N8nTextMessage';
import { N8nGeminiWebhookPayload, N8nMarkdownStoredResult, N8nMarkdownUploadPayload } from '../entities/N8nMarkdownMessage';
import { N8nWebhookEndpoint } from '../entities/N8nIntegration';
import { IN8nTextGateway } from '../ports/IN8nTextGateway';
import { IN8nWebhookLogRepository } from '../repositories/IN8nWebhookLogRepository';
import { IN8nTextExchangeRepository } from '../repositories/IN8nTextExchangeRepository';
import { IN8nMarkdownDocumentRepository } from '../repositories/IN8nMarkdownDocumentRepository';
export type N8nReceivePayload = N8nGeminiWebhookPayload | N8nMarkdownUploadPayload | {
    text: string;
    metadata?: Record<string, unknown>;
};
export interface ReceiveTextFromN8nInput {
    endpoint: N8nWebhookEndpoint;
    payload: N8nReceivePayload;
}
export declare class SendTextToN8nUseCase {
    private readonly gateway;
    private readonly webhookLogRepository;
    private readonly textExchangeRepository;
    constructor(gateway: IN8nTextGateway, webhookLogRepository: IN8nWebhookLogRepository, textExchangeRepository: IN8nTextExchangeRepository);
    execute(request: N8nTextRequest): Promise<N8nTextResponse>;
    private persistFailedExchange;
}
export declare class ReceiveTextFromN8nUseCase {
    private readonly webhookLogRepository;
    private readonly markdownDocumentRepository;
    constructor(webhookLogRepository: IN8nWebhookLogRepository, markdownDocumentRepository: IN8nMarkdownDocumentRepository);
    execute(input: ReceiveTextFromN8nInput): Promise<N8nMarkdownStoredResult>;
    private handleGeminiPayload;
    private handleDirectUpload;
    private handleLegacyText;
    private persistMarkdown;
    private resolvePayloadType;
    private persistFailedReceive;
}
//# sourceMappingURL=N8nTextUseCases.d.ts.map