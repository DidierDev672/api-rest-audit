export interface N8nGeminiPart {
    text?: string;
    thoughtSignature?: string;
}
export interface N8nGeminiContent {
    parts: N8nGeminiPart[];
    role?: string;
}
export interface N8nGeminiResponse {
    content: N8nGeminiContent;
    finishReason?: string;
    index?: number;
}
export interface N8nGeminiWebhookPayload {
    task: string;
    gemini_response: N8nGeminiResponse;
    timestamp?: string;
    filename?: string;
    metadata?: Record<string, unknown>;
}
export interface N8nMarkdownUploadPayload {
    filename: string;
    content: string;
    metadata?: Record<string, unknown>;
}
export interface N8nMarkdownStoredResult {
    filename: string;
    contentLength: number;
    documentId: string;
    webhookLogId: string;
    task?: string;
    timestamp?: string;
    metadata?: Record<string, unknown>;
}
//# sourceMappingURL=N8nMarkdownMessage.d.ts.map