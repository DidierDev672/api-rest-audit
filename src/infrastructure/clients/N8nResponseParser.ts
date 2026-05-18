import { N8nIntegrationError } from '../../domain/errors/N8nIntegrationError';

export interface IN8nResponseParser {
  extractText(rawBody: unknown): string;
}

export class DefaultN8nResponseParser implements IN8nResponseParser {
  private extractFromGeminiResponse(geminiResponse: unknown): string | null {
    if (typeof geminiResponse !== 'object' || geminiResponse === null) {
      return null;
    }

    const content = (geminiResponse as Record<string, unknown>).content;

    if (typeof content !== 'object' || content === null) {
      return null;
    }

    const parts = (content as Record<string, unknown>).parts;

    if (!Array.isArray(parts)) {
      return null;
    }

    const textParts = parts
      .map((part) => {
        if (typeof part !== 'object' || part === null) {
          return '';
        }

        const text = (part as Record<string, unknown>).text;
        return typeof text === 'string' ? text.trim() : '';
      })
      .filter((text) => text.length > 0);

    return textParts.length > 0 ? textParts.join('\n\n') : null;
  }

  extractText(rawBody: unknown): string {
    if (typeof rawBody === 'string') {
      return rawBody;
    }

    if (rawBody === null || rawBody === undefined) {
      throw new N8nIntegrationError(
        'N8N devolvió una respuesta nula o indefinida',
        502
      );
    }

    if (typeof rawBody === 'object') {
      const record = rawBody as Record<string, unknown>;
      const geminiText = this.extractFromGeminiResponse(record.gemini_response);

      if (geminiText) {
        return geminiText;
      }

      const body = record.body;
      if (typeof body === 'object' && body !== null) {
        const bodyRecord = body as Record<string, unknown>;
        const nestedGeminiText = this.extractFromGeminiResponse(
          bodyRecord.gemini_response
        );

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

    throw new N8nIntegrationError(
      'N8N devolvió un formato de respuesta no reconocido',
      502
    );
  }
}
