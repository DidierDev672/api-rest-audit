import { N8nTextRequest, N8nTextResponse } from '../entities/N8nTextMessage';
import {
  N8nGeminiWebhookPayload,
  N8nMarkdownStoredResult,
  N8nMarkdownUploadPayload,
} from '../entities/N8nMarkdownMessage';
import {
  N8nPayloadType,
  N8nWebhookEndpoint,
} from '../entities/N8nIntegration';
import { IN8nTextGateway } from '../ports/IN8nTextGateway';
import { IN8nWebhookLogRepository } from '../repositories/IN8nWebhookLogRepository';
import { IN8nTextExchangeRepository } from '../repositories/IN8nTextExchangeRepository';
import { IN8nMarkdownDocumentRepository } from '../repositories/IN8nMarkdownDocumentRepository';
import { TextContentValidator } from '../services/TextContentValidator';
import { N8nGeminiPayloadParser } from '../services/N8nGeminiPayloadParser';
import { Logger } from '../../infrastructure/logger/Logger';

export type N8nReceivePayload =
  | N8nGeminiWebhookPayload
  | N8nMarkdownUploadPayload
  | { text: string; metadata?: Record<string, unknown> };

export interface ReceiveTextFromN8nInput {
  endpoint: N8nWebhookEndpoint;
  payload: N8nReceivePayload;
}

export class SendTextToN8nUseCase {
  constructor(
    private readonly gateway: IN8nTextGateway,
    private readonly webhookLogRepository: IN8nWebhookLogRepository,
    private readonly textExchangeRepository: IN8nTextExchangeRepository
  ) {}

  async execute(request: N8nTextRequest): Promise<N8nTextResponse> {
    const startMs = Date.now();
    const validatedText = TextContentValidator.validateNonEmpty(
      request.text,
      'El texto de la petición'
    );

    const requestPayload = {
      text: validatedText,
      metadata: request.metadata ?? {},
    };

    Logger.info('Enviando texto a N8N', {
      textLength: validatedText.length,
      hasMetadata: Boolean(request.metadata),
    });

    try {
      const response = await this.gateway.sendText({
        text: validatedText,
        metadata: request.metadata,
      });

      const validatedResponseText = TextContentValidator.validateNonEmpty(
        response.text,
        'El texto de la respuesta de N8N'
      );

      const responsePayload = {
        text: validatedResponseText,
        metadata: response.metadata ?? {},
      };

      const webhookLog = await this.webhookLogRepository.create({
        endpoint: 'send',
        direction: 'outbound',
        payloadType: 'text',
        status: 'success',
        requestPayload,
        responsePayload,
        durationMs: Date.now() - startMs,
      });

      const exchange = await this.textExchangeRepository.create({
        webhookLogId: webhookLog.id,
        requestText: validatedText,
        responseText: validatedResponseText,
        requestMetadata: request.metadata ?? {},
        responseMetadata: response.metadata ?? {},
      });

      Logger.success('Texto enviado, respuesta recibida y guardada en Supabase', {
        exchangeId: exchange.id,
        webhookLogId: webhookLog.id,
        responseLength: validatedResponseText.length,
      });

      return {
        text: validatedResponseText,
        metadata: response.metadata,
        exchangeId: exchange.id,
        webhookLogId: webhookLog.id,
      };
    } catch (error) {
      const errorMessage = (error as Error).message;

      await this.persistFailedExchange(
        validatedText,
        request.metadata,
        requestPayload,
        errorMessage,
        Date.now() - startMs
      );

      throw error;
    }
  }

  private async persistFailedExchange(
    requestText: string,
    requestMetadata: Record<string, unknown> | undefined,
    requestPayload: Record<string, unknown>,
    errorMessage: string,
    durationMs: number
  ): Promise<void> {
    try {
      const webhookLog = await this.webhookLogRepository.create({
        endpoint: 'send',
        direction: 'outbound',
        payloadType: 'text',
        status: 'failed',
        requestPayload,
        responsePayload: null,
        errorMessage,
        durationMs,
      });

      await this.textExchangeRepository.create({
        webhookLogId: webhookLog.id,
        requestText,
        responseText: null,
        requestMetadata: requestMetadata ?? {},
        responseMetadata: { error: errorMessage },
      });

      Logger.warning('Intercambio N8N fallido registrado en Supabase', {
        webhookLogId: webhookLog.id,
        error: errorMessage,
      });
    } catch (persistError) {
      Logger.danger('No se pudo guardar el intercambio N8N en Supabase', {
        error: (persistError as Error).message,
        originalError: errorMessage,
      });
    }
  }
}

export class ReceiveTextFromN8nUseCase {
  constructor(
    private readonly webhookLogRepository: IN8nWebhookLogRepository,
    private readonly markdownDocumentRepository: IN8nMarkdownDocumentRepository
  ) {}

  async execute(input: ReceiveTextFromN8nInput): Promise<N8nMarkdownStoredResult> {
    const { endpoint, payload } = input;
    const startMs = Date.now();
    const requestPayload = payload as Record<string, unknown>;

    try {
      if (N8nGeminiPayloadParser.isGeminiWebhookPayload(payload)) {
        return await this.handleGeminiPayload(endpoint, payload, requestPayload, startMs);
      }

      if (N8nGeminiPayloadParser.isMarkdownUploadPayload(payload)) {
        return await this.handleDirectUpload(endpoint, payload, requestPayload, startMs);
      }

      return await this.handleLegacyText(endpoint, payload, requestPayload, startMs);
    } catch (error) {
      await this.persistFailedReceive(
        endpoint,
        requestPayload,
        this.resolvePayloadType(payload),
        (error as Error).message,
        Date.now() - startMs
      );
      throw error;
    }
  }

  private async handleGeminiPayload(
    endpoint: N8nWebhookEndpoint,
    payload: N8nGeminiWebhookPayload,
    requestPayload: Record<string, unknown>,
    startMs: number
  ): Promise<N8nMarkdownStoredResult> {
    const content = N8nGeminiPayloadParser.extractMarkdownFromGemini(
      payload.gemini_response
    );
    const validatedContent = TextContentValidator.validateNonEmpty(
      content,
      'El contenido markdown de Gemini'
    );

    const filename = N8nGeminiPayloadParser.buildFilename(payload.task, {
      timestamp: payload.timestamp,
      filename: payload.filename,
    });

    Logger.info('Recibiendo markdown desde N8N (Gemini)', {
      endpoint,
      taskLength: payload.task.length,
      contentLength: validatedContent.length,
      filename,
      finishReason: payload.gemini_response.finishReason,
    });

    const result = await this.persistMarkdown({
      endpoint,
      payloadType: 'gemini',
      requestPayload,
      filename,
      content: validatedContent,
      sourceType: 'gemini',
      task: payload.task,
      sourceTimestamp: payload.timestamp ? new Date(payload.timestamp) : null,
      geminiFinishReason: payload.gemini_response.finishReason ?? null,
      geminiRole: payload.gemini_response.content.role ?? null,
      geminiRawResponse: payload.gemini_response as unknown as Record<string, unknown>,
      metadata: {
        ...payload.metadata,
        finishReason: payload.gemini_response.finishReason,
        geminiRole: payload.gemini_response.content.role,
      },
      durationMs: Date.now() - startMs,
      timestamp: payload.timestamp,
    });

    Logger.success('Markdown de N8N guardado en Supabase', {
      documentId: result.documentId,
      webhookLogId: result.webhookLogId,
      filename: result.filename,
    });

    return result;
  }

  private async handleDirectUpload(
    endpoint: N8nWebhookEndpoint,
    payload: N8nMarkdownUploadPayload,
    requestPayload: Record<string, unknown>,
    startMs: number
  ): Promise<N8nMarkdownStoredResult> {
    const validatedContent = TextContentValidator.validateNonEmpty(
      payload.content,
      'El contenido markdown'
    );

    const filename = N8nGeminiPayloadParser.buildFilename(payload.filename, {
      filename: payload.filename,
    });

    Logger.info('Recibiendo markdown directo desde N8N', {
      endpoint,
      filename,
      contentLength: validatedContent.length,
    });

    const result = await this.persistMarkdown({
      endpoint,
      payloadType: 'markdown',
      requestPayload,
      filename,
      content: validatedContent,
      sourceType: 'direct_upload',
      metadata: payload.metadata ?? {},
      durationMs: Date.now() - startMs,
    });

    Logger.success('Markdown directo de N8N guardado en Supabase', {
      documentId: result.documentId,
      filename: result.filename,
    });

    return result;
  }

  private async handleLegacyText(
    endpoint: N8nWebhookEndpoint,
    payload: { text: string; metadata?: Record<string, unknown> },
    requestPayload: Record<string, unknown>,
    startMs: number
  ): Promise<N8nMarkdownStoredResult> {
    const validatedText = TextContentValidator.validateNonEmpty(
      payload.text,
      'El texto recibido'
    );

    const filename = N8nGeminiPayloadParser.buildFilename('texto-n8n', {
      filename: 'texto-n8n.md',
    });

    Logger.info('Recibiendo texto legacy desde N8N', {
      endpoint,
      textLength: validatedText.length,
    });

    const result = await this.persistMarkdown({
      endpoint,
      payloadType: 'legacy_text',
      requestPayload,
      filename,
      content: validatedText,
      sourceType: 'legacy_text',
      metadata: payload.metadata ?? {},
      durationMs: Date.now() - startMs,
    });

    Logger.success('Texto legacy de N8N guardado en Supabase');

    return result;
  }

  private async persistMarkdown(params: {
    endpoint: N8nWebhookEndpoint;
    payloadType: N8nPayloadType;
    requestPayload: Record<string, unknown>;
    filename: string;
    content: string;
    sourceType: 'gemini' | 'direct_upload' | 'legacy_text';
    task?: string | null;
    sourceTimestamp?: Date | null;
    geminiFinishReason?: string | null;
    geminiRole?: string | null;
    geminiRawResponse?: Record<string, unknown> | null;
    metadata?: Record<string, unknown>;
    durationMs: number;
    timestamp?: string;
  }): Promise<N8nMarkdownStoredResult> {
    const webhookLog = await this.webhookLogRepository.create({
      endpoint: params.endpoint,
      direction: 'inbound',
      payloadType: params.payloadType,
      status: 'success',
      requestPayload: params.requestPayload,
      responsePayload: {
        filename: params.filename,
        contentLength: params.content.length,
      },
      durationMs: params.durationMs,
    });

    const document = await this.markdownDocumentRepository.create({
      webhookLogId: webhookLog.id,
      filename: params.filename,
      content: params.content,
      contentLength: params.content.length,
      sourceType: params.sourceType,
      task: params.task ?? null,
      sourceTimestamp: params.sourceTimestamp ?? null,
      geminiFinishReason: params.geminiFinishReason ?? null,
      geminiRole: params.geminiRole ?? null,
      geminiRawResponse: params.geminiRawResponse ?? null,
      metadata: params.metadata ?? {},
    });

    return {
      filename: document.filename,
      contentLength: document.contentLength,
      documentId: document.id,
      webhookLogId: webhookLog.id,
      task: params.task ?? undefined,
      timestamp: params.timestamp,
      metadata: params.metadata,
    };
  }

  private resolvePayloadType(payload: N8nReceivePayload): N8nPayloadType {
    if (N8nGeminiPayloadParser.isGeminiWebhookPayload(payload)) {
      return 'gemini';
    }
    if (N8nGeminiPayloadParser.isMarkdownUploadPayload(payload)) {
      return 'markdown';
    }
    return 'legacy_text';
  }

  private async persistFailedReceive(
    endpoint: N8nWebhookEndpoint,
    requestPayload: Record<string, unknown>,
    payloadType: N8nPayloadType,
    errorMessage: string,
    durationMs: number
  ): Promise<void> {
    try {
      await this.webhookLogRepository.create({
        endpoint,
        direction: 'inbound',
        payloadType,
        status: 'failed',
        requestPayload,
        responsePayload: null,
        errorMessage,
        durationMs,
      });

      Logger.warning('Recepción N8N fallida registrada en Supabase', {
        endpoint,
        error: errorMessage,
      });
    } catch (persistError) {
      Logger.danger('No se pudo guardar el log de recepción N8N en Supabase', {
        error: (persistError as Error).message,
        originalError: errorMessage,
      });
    }
  }
}

