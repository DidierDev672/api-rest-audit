import {
  N8nPayloadType,
  N8nWebhookDirection,
  N8nWebhookEndpoint,
  N8nWebhookLog,
  N8nWebhookStatus,
} from '../entities/N8nIntegration';

export interface CreateN8nWebhookLogInput {
  httpMethod?: string;
  endpoint: N8nWebhookEndpoint;
  direction: N8nWebhookDirection;
  payloadType: N8nPayloadType;
  status: N8nWebhookStatus;
  requestPayload: Record<string, unknown>;
  responsePayload?: Record<string, unknown> | null;
  errorMessage?: string | null;
  durationMs?: number | null;
}

export interface IN8nWebhookLogRepository {
  create(data: CreateN8nWebhookLogInput): Promise<N8nWebhookLog>;
  findById(id: string): Promise<N8nWebhookLog | null>;
}
