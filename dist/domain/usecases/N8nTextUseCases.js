"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiveTextFromN8nUseCase = exports.SendTextToN8nUseCase = void 0;
const TextContentValidator_1 = require("../services/TextContentValidator");
const N8nGeminiPayloadParser_1 = require("../services/N8nGeminiPayloadParser");
const Logger_1 = require("../../infrastructure/logger/Logger");
class SendTextToN8nUseCase {
    constructor(gateway, webhookLogRepository, textExchangeRepository) {
        this.gateway = gateway;
        this.webhookLogRepository = webhookLogRepository;
        this.textExchangeRepository = textExchangeRepository;
    }
    async execute(request) {
        const startMs = Date.now();
        const validatedText = TextContentValidator_1.TextContentValidator.validateNonEmpty(request.text, 'El texto de la petición');
        const requestPayload = {
            text: validatedText,
            metadata: request.metadata ?? {},
        };
        Logger_1.Logger.info('Enviando texto a N8N', {
            textLength: validatedText.length,
            hasMetadata: Boolean(request.metadata),
        });
        try {
            const response = await this.gateway.sendText({
                text: validatedText,
                metadata: request.metadata,
            });
            const validatedResponseText = TextContentValidator_1.TextContentValidator.validateNonEmpty(response.text, 'El texto de la respuesta de N8N');
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
            Logger_1.Logger.success('Texto enviado, respuesta recibida y guardada en Supabase', {
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
        }
        catch (error) {
            const errorMessage = error.message;
            await this.persistFailedExchange(validatedText, request.metadata, requestPayload, errorMessage, Date.now() - startMs);
            throw error;
        }
    }
    async persistFailedExchange(requestText, requestMetadata, requestPayload, errorMessage, durationMs) {
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
            Logger_1.Logger.warning('Intercambio N8N fallido registrado en Supabase', {
                webhookLogId: webhookLog.id,
                error: errorMessage,
            });
        }
        catch (persistError) {
            Logger_1.Logger.danger('No se pudo guardar el intercambio N8N en Supabase', {
                error: persistError.message,
                originalError: errorMessage,
            });
        }
    }
}
exports.SendTextToN8nUseCase = SendTextToN8nUseCase;
class ReceiveTextFromN8nUseCase {
    constructor(webhookLogRepository, markdownDocumentRepository) {
        this.webhookLogRepository = webhookLogRepository;
        this.markdownDocumentRepository = markdownDocumentRepository;
    }
    async execute(input) {
        const { endpoint, payload } = input;
        const startMs = Date.now();
        const requestPayload = payload;
        try {
            if (N8nGeminiPayloadParser_1.N8nGeminiPayloadParser.isGeminiWebhookPayload(payload)) {
                return await this.handleGeminiPayload(endpoint, payload, requestPayload, startMs);
            }
            if (N8nGeminiPayloadParser_1.N8nGeminiPayloadParser.isMarkdownUploadPayload(payload)) {
                return await this.handleDirectUpload(endpoint, payload, requestPayload, startMs);
            }
            return await this.handleLegacyText(endpoint, payload, requestPayload, startMs);
        }
        catch (error) {
            await this.persistFailedReceive(endpoint, requestPayload, this.resolvePayloadType(payload), error.message, Date.now() - startMs);
            throw error;
        }
    }
    async handleGeminiPayload(endpoint, payload, requestPayload, startMs) {
        const content = N8nGeminiPayloadParser_1.N8nGeminiPayloadParser.extractMarkdownFromGemini(payload.gemini_response);
        const validatedContent = TextContentValidator_1.TextContentValidator.validateNonEmpty(content, 'El contenido markdown de Gemini');
        const filename = N8nGeminiPayloadParser_1.N8nGeminiPayloadParser.buildFilename(payload.task, {
            timestamp: payload.timestamp,
            filename: payload.filename,
        });
        Logger_1.Logger.info('Recibiendo markdown desde N8N (Gemini)', {
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
            geminiRawResponse: payload.gemini_response,
            metadata: {
                ...payload.metadata,
                finishReason: payload.gemini_response.finishReason,
                geminiRole: payload.gemini_response.content.role,
            },
            durationMs: Date.now() - startMs,
            timestamp: payload.timestamp,
        });
        Logger_1.Logger.success('Markdown de N8N guardado en Supabase', {
            documentId: result.documentId,
            webhookLogId: result.webhookLogId,
            filename: result.filename,
        });
        return result;
    }
    async handleDirectUpload(endpoint, payload, requestPayload, startMs) {
        const validatedContent = TextContentValidator_1.TextContentValidator.validateNonEmpty(payload.content, 'El contenido markdown');
        const filename = N8nGeminiPayloadParser_1.N8nGeminiPayloadParser.buildFilename(payload.filename, {
            filename: payload.filename,
        });
        Logger_1.Logger.info('Recibiendo markdown directo desde N8N', {
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
        Logger_1.Logger.success('Markdown directo de N8N guardado en Supabase', {
            documentId: result.documentId,
            filename: result.filename,
        });
        return result;
    }
    async handleLegacyText(endpoint, payload, requestPayload, startMs) {
        const validatedText = TextContentValidator_1.TextContentValidator.validateNonEmpty(payload.text, 'El texto recibido');
        const filename = N8nGeminiPayloadParser_1.N8nGeminiPayloadParser.buildFilename('texto-n8n', {
            filename: 'texto-n8n.md',
        });
        Logger_1.Logger.info('Recibiendo texto legacy desde N8N', {
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
        Logger_1.Logger.success('Texto legacy de N8N guardado en Supabase');
        return result;
    }
    async persistMarkdown(params) {
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
    resolvePayloadType(payload) {
        if (N8nGeminiPayloadParser_1.N8nGeminiPayloadParser.isGeminiWebhookPayload(payload)) {
            return 'gemini';
        }
        if (N8nGeminiPayloadParser_1.N8nGeminiPayloadParser.isMarkdownUploadPayload(payload)) {
            return 'markdown';
        }
        return 'legacy_text';
    }
    async persistFailedReceive(endpoint, requestPayload, payloadType, errorMessage, durationMs) {
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
            Logger_1.Logger.warning('Recepción N8N fallida registrada en Supabase', {
                endpoint,
                error: errorMessage,
            });
        }
        catch (persistError) {
            Logger_1.Logger.danger('No se pudo guardar el log de recepción N8N en Supabase', {
                error: persistError.message,
                originalError: errorMessage,
            });
        }
    }
}
exports.ReceiveTextFromN8nUseCase = ReceiveTextFromN8nUseCase;
//# sourceMappingURL=N8nTextUseCases.js.map