"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.N8nHttpClient = void 0;
const N8nIntegrationError_1 = require("../../domain/errors/N8nIntegrationError");
const TextContentValidator_1 = require("../../domain/services/TextContentValidator");
const CircuitBreaker_1 = require("../resilience/CircuitBreaker");
const RetryLogic_1 = require("../resilience/RetryLogic");
const Logger_1 = require("../logger/Logger");
const N8nResponseParser_1 = require("./N8nResponseParser");
class N8nHttpClient {
    constructor(config, responseParser = new N8nResponseParser_1.DefaultN8nResponseParser()) {
        this.config = config;
        this.responseParser = responseParser;
    }
    async sendText(request) {
        const payload = {
            text: request.text,
            metadata: request.metadata ?? {},
        };
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.config.webhookSecret) {
            headers['X-N8N-Webhook-Secret'] = this.config.webhookSecret;
        }
        const executeRequest = async () => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.config.requestTimeoutMs);
            try {
                const response = await fetch(this.config.webhookUrl, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(payload),
                    signal: controller.signal,
                });
                const rawBody = await this.parseResponseBody(response);
                if (!response.ok) {
                    Logger_1.Logger.danger('N8N respondió con error HTTP', {
                        status: response.status,
                        body: rawBody,
                    });
                    throw new N8nIntegrationError_1.N8nIntegrationError(`N8N respondió con estado HTTP ${response.status}`, response.status >= 500 ? 502 : 400);
                }
                const extractedText = this.responseParser.extractText(rawBody);
                const validatedText = TextContentValidator_1.TextContentValidator.validateNonEmpty(extractedText, 'El texto de la respuesta de N8N');
                const metadata = typeof rawBody === 'object' && rawBody !== null
                    ? rawBody
                    : undefined;
                return { text: validatedText, metadata };
            }
            catch (error) {
                if (error instanceof N8nIntegrationError_1.N8nIntegrationError) {
                    throw error;
                }
                if (error.name === 'AbortError') {
                    throw new N8nIntegrationError_1.N8nIntegrationError(`Tiempo de espera agotado al contactar N8N (${this.config.requestTimeoutMs}ms)`, 504);
                }
                Logger_1.Logger.danger('Error de comunicación con N8N', {
                    error: error.message,
                });
                throw new N8nIntegrationError_1.N8nIntegrationError(`Error al comunicarse con N8N: ${error.message}`, 502);
            }
            finally {
                clearTimeout(timeoutId);
            }
        };
        return CircuitBreaker_1.circuitBreaker.execute(() => (0, RetryLogic_1.withRetry)(executeRequest, { maxAttempts: 3 }));
    }
    async parseResponseBody(response) {
        const contentType = response.headers.get('content-type') ?? '';
        if (contentType.includes('application/json')) {
            try {
                return await response.json();
            }
            catch {
                throw new N8nIntegrationError_1.N8nIntegrationError('N8N devolvió un JSON inválido', 502);
            }
        }
        const text = await response.text();
        if (!text) {
            throw new N8nIntegrationError_1.N8nIntegrationError('N8N devolvió una respuesta vacía', 502);
        }
        try {
            return JSON.parse(text);
        }
        catch {
            return text;
        }
    }
}
exports.N8nHttpClient = N8nHttpClient;
//# sourceMappingURL=N8nHttpClient.js.map