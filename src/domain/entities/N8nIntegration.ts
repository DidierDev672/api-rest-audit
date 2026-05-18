export type N8nWebhookEndpoint = 'send' | 'receive' | 'markdown/upload';
export type N8nWebhookDirection = 'inbound' | 'outbound';
export type N8nPayloadType = 'text' | 'gemini' | 'markdown' | 'legacy_text';
export type N8nWebhookStatus = 'success' | 'failed';

export interface N8nWebhookLog {
  id: string;
  httpMethod: string;
  endpoint: N8nWebhookEndpoint;
  direction: N8nWebhookDirection;
  payloadType: N8nPayloadType;
  status: N8nWebhookStatus;
  requestPayload: Record<string, unknown>;
  responsePayload: Record<string, unknown> | null;
  errorMessage: string | null;
  durationMs: number | null;
  createdAt: Date;
}

export interface N8nTextExchange {
  id: string;
  webhookLogId: string | null;
  requestText: string;
  responseText: string | null;
  requestMetadata: Record<string, unknown>;
  responseMetadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export type N8nMarkdownSourceType = 'gemini' | 'direct_upload' | 'legacy_text';

export interface N8nMarkdownDocument {
  id: string;
  webhookLogId: string | null;
  filename: string;
  content: string;
  contentLength: number;
  storagePath: string | null;
  sourceType: N8nMarkdownSourceType;
  task: string | null;
  sourceTimestamp: Date | null;
  geminiFinishReason: string | null;
  geminiRole: string | null;
  geminiRawResponse: Record<string, unknown> | null;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}
