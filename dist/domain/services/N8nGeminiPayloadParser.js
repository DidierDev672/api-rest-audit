"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.N8nGeminiPayloadParser = void 0;
const ValidationError_1 = require("../errors/ValidationError");
class N8nGeminiPayloadParser {
    static unwrapBody(raw) {
        if (typeof raw === 'object' &&
            raw !== null &&
            'body' in raw &&
            typeof raw.body === 'object' &&
            raw.body !== null) {
            return raw.body;
        }
        return raw;
    }
    static isGeminiWebhookPayload(payload) {
        if (typeof payload !== 'object' || payload === null) {
            return false;
        }
        const record = payload;
        return (typeof record.task === 'string' &&
            typeof record.gemini_response === 'object' &&
            record.gemini_response !== null);
    }
    static isMarkdownUploadPayload(payload) {
        if (typeof payload !== 'object' || payload === null) {
            return false;
        }
        const record = payload;
        return typeof record.filename === 'string' && typeof record.content === 'string';
    }
    static isLegacyTextPayload(payload) {
        if (typeof payload !== 'object' || payload === null) {
            return false;
        }
        const record = payload;
        return typeof record.text === 'string' && !record.gemini_response;
    }
    static extractMarkdownFromGemini(geminiResponse) {
        const parts = geminiResponse?.content?.parts;
        if (!Array.isArray(parts) || parts.length === 0) {
            throw new ValidationError_1.ValidationError('gemini_response.content.parts debe contener al menos una parte con texto');
        }
        const textParts = parts
            .map((part) => (typeof part.text === 'string' ? part.text.trim() : ''))
            .filter((text) => text.length > 0);
        if (textParts.length === 0) {
            throw new ValidationError_1.ValidationError('No se encontró texto en gemini_response.content.parts');
        }
        return textParts.join('\n\n');
    }
    static buildFilename(task, options) {
        if (options?.filename) {
            const trimmed = options.filename.trim();
            return trimmed.toLowerCase().endsWith('.md') ? trimmed : `${trimmed}.md`;
        }
        const slug = task
            .slice(0, 80)
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') || 'documento';
        const dateSuffix = options?.timestamp
            ? new Date(options.timestamp).toISOString().slice(0, 19).replace(/[:.]/g, '-')
            : new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-');
        return `${slug}-${dateSuffix}.md`;
    }
}
exports.N8nGeminiPayloadParser = N8nGeminiPayloadParser;
//# sourceMappingURL=N8nGeminiPayloadParser.js.map