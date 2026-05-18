export interface IN8nResponseParser {
    extractText(rawBody: unknown): string;
}
export declare class DefaultN8nResponseParser implements IN8nResponseParser {
    private extractFromGeminiResponse;
    extractText(rawBody: unknown): string;
}
//# sourceMappingURL=N8nResponseParser.d.ts.map