import {
  N8nGeminiWebhookPayload,
  N8nGeminiResponse,
  N8nMarkdownUploadPayload,
} from '../entities/N8nMarkdownMessage';
import { ValidationError } from '../errors/ValidationError';

export type N8nInboundPayload =
  | N8nGeminiWebhookPayload
  | N8nMarkdownUploadPayload
  | { text: string; metadata?: Record<string, unknown> };

export class N8nGeminiPayloadParser {
  static unwrapBody(raw: unknown): unknown {
    if (
      typeof raw === 'object' &&
      raw !== null &&
      'body' in raw &&
      typeof (raw as Record<string, unknown>).body === 'object' &&
      (raw as Record<string, unknown>).body !== null
    ) {
      return (raw as Record<string, unknown>).body;
    }

    return raw;
  }

  static isGeminiWebhookPayload(payload: unknown): payload is N8nGeminiWebhookPayload {
    if (typeof payload !== 'object' || payload === null) {
      return false;
    }

    const record = payload as Record<string, unknown>;
    return (
      typeof record.task === 'string' &&
      typeof record.gemini_response === 'object' &&
      record.gemini_response !== null
    );
  }

  static isMarkdownUploadPayload(
    payload: unknown
  ): payload is N8nMarkdownUploadPayload {
    if (typeof payload !== 'object' || payload === null) {
      return false;
    }

    const record = payload as Record<string, unknown>;
    return typeof record.filename === 'string' && typeof record.content === 'string';
  }

  static isLegacyTextPayload(
    payload: unknown
  ): payload is { text: string; metadata?: Record<string, unknown> } {
    if (typeof payload !== 'object' || payload === null) {
      return false;
    }

    const record = payload as Record<string, unknown>;
    return typeof record.text === 'string' && !record.gemini_response;
  }

  static extractMarkdownFromGemini(geminiResponse: N8nGeminiResponse): string {
    const parts = geminiResponse?.content?.parts;

    if (!Array.isArray(parts) || parts.length === 0) {
      throw new ValidationError(
        'gemini_response.content.parts debe contener al menos una parte con texto'
      );
    }

    const textParts = parts
      .map((part) => (typeof part.text === 'string' ? part.text.trim() : ''))
      .filter((text) => text.length > 0);

    if (textParts.length === 0) {
      throw new ValidationError(
        'No se encontró texto en gemini_response.content.parts'
      );
    }

    return textParts.join('\n\n');
  }

  static buildFilename(
    task: string,
    options?: { timestamp?: string; filename?: string }
  ): string {
    if (options?.filename) {
      const trimmed = options.filename.trim();
      return trimmed.toLowerCase().endsWith('.md') ? trimmed : `${trimmed}.md`;
    }

    const slug =
      task
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
