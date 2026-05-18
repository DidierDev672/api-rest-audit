import { N8nGeminiWebhookPayload, N8nGeminiResponse, N8nMarkdownUploadPayload } from '../entities/N8nMarkdownMessage';
export type N8nInboundPayload = N8nGeminiWebhookPayload | N8nMarkdownUploadPayload | {
    text: string;
    metadata?: Record<string, unknown>;
};
export declare class N8nGeminiPayloadParser {
    static unwrapBody(raw: unknown): unknown;
    static isGeminiWebhookPayload(payload: unknown): payload is N8nGeminiWebhookPayload;
    static isMarkdownUploadPayload(payload: unknown): payload is N8nMarkdownUploadPayload;
    static isLegacyTextPayload(payload: unknown): payload is {
        text: string;
        metadata?: Record<string, unknown>;
    };
    static extractMarkdownFromGemini(geminiResponse: N8nGeminiResponse): string;
    static buildFilename(task: string, options?: {
        timestamp?: string;
        filename?: string;
    }): string;
}
//# sourceMappingURL=N8nGeminiPayloadParser.d.ts.map