import { N8nTextExchange } from '../entities/N8nIntegration';

export interface CreateN8nTextExchangeInput {
  webhookLogId?: string | null;
  requestText: string;
  responseText?: string | null;
  requestMetadata?: Record<string, unknown>;
  responseMetadata?: Record<string, unknown>;
}

export interface IN8nTextExchangeRepository {
  create(data: CreateN8nTextExchangeInput): Promise<N8nTextExchange>;
  findById(id: string): Promise<N8nTextExchange | null>;
  findByWebhookLogId(webhookLogId: string): Promise<N8nTextExchange | null>;
}
