"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultN8nResponseParser = void 0;
const N8nIntegrationError_1 = require("../../domain/errors/N8nIntegrationError");
class DefaultN8nResponseParser {
    extractFromGeminiResponse(geminiResponse) {
        if (typeof geminiResponse !== 'object' || geminiResponse === null) {
            return null;
        }
        const content = geminiResponse.content;
        if (typeof content !== 'object' || content === null) {
            return null;
        }
        const parts = content.parts;
        if (!Array.isArray(parts)) {
            return null;
        }
        const textParts = parts
            .map((part) => {
            if (typeof part !== 'object' || part === null) {
                return '';
            }
            const text = part.text;
            return typeof text === 'string' ? text.trim() : '';
        })
            .filter((text) => text.length > 0);
        return textParts.length > 0 ? textParts.join('\n\n') : null;
    }
    extractText(rawBody) {
        if (typeof rawBody === 'string') {
            return rawBody;
        }
        if (rawBody === null || rawBody === undefined) {
            throw new N8nIntegrationError_1.N8nIntegrationError('N8N devolvió una respuesta nula o indefinida', 502);
        }
        if (typeof rawBody === 'object') {
            const record = rawBody;
            const geminiText = this.extractFromGeminiResponse(record.gemini_response);
            if (geminiText) {
                return geminiText;
            }
            const body = record.body;
            if (typeof body === 'object' && body !== null) {
                const bodyRecord = body;
                const nestedGeminiText = this.extractFromGeminiResponse(bodyRecord.gemini_response);
                if (nestedGeminiText) {
                    return nestedGeminiText;
                }
            }
            const candidates = ['text', 'content', 'response', 'message', 'output', 'result'];
            for (const key of candidates) {
                const value = record[key];
                if (typeof value === 'string') {
                    return value;
                }
            }
        }
        throw new N8nIntegrationError_1.N8nIntegrationError('N8N devolvió un formato de respuesta no reconocido', 502);
    }
}
exports.DefaultN8nResponseParser = DefaultN8nResponseParser;
//# sourceMappingURL=N8nResponseParser.js.map