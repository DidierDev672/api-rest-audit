"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.N8nIntegrationController = void 0;
const zod_1 = require("zod");
const N8nTextUseCases_1 = require("../../domain/usecases/N8nTextUseCases");
const ValidationError_1 = require("../../domain/errors/ValidationError");
const N8nIntegrationError_1 = require("../../domain/errors/N8nIntegrationError");
const N8nHttpClient_1 = require("../../infrastructure/clients/N8nHttpClient");
const N8nConfig_1 = require("../../infrastructure/config/N8nConfig");
const Logger_1 = require("../../infrastructure/logger/Logger");
const N8nTextDTO_1 = require("../dto/N8nTextDTO");
const N8nGeminiPayloadParser_1 = require("../../domain/services/N8nGeminiPayloadParser");
const database_1 = require("../../infrastructure/database");
let sendTextUseCase = null;
const receiveTextUseCase = new N8nTextUseCases_1.ReceiveTextFromN8nUseCase(new database_1.N8nWebhookLogRepository(), new database_1.N8nMarkdownDocumentRepository());
function getSendTextUseCase() {
    if (!sendTextUseCase) {
        const gateway = new N8nHttpClient_1.N8nHttpClient(N8nConfig_1.N8nConfigProvider.load());
        sendTextUseCase = new N8nTextUseCases_1.SendTextToN8nUseCase(gateway, new database_1.N8nWebhookLogRepository(), new database_1.N8nTextExchangeRepository());
    }
    return sendTextUseCase;
}
function isInboundN8nPayload(body) {
    const unwrapped = N8nGeminiPayloadParser_1.N8nGeminiPayloadParser.unwrapBody(body);
    return (N8nGeminiPayloadParser_1.N8nGeminiPayloadParser.isGeminiWebhookPayload(unwrapped) ||
        N8nGeminiPayloadParser_1.N8nGeminiPayloadParser.isMarkdownUploadPayload(unwrapped));
}
function resolveReceiveEndpoint(req) {
    const path = req.path.toLowerCase();
    if (path.includes('markdown/upload')) {
        return 'markdown/upload';
    }
    if (path.endsWith('/send')) {
        return 'send';
    }
    return 'receive';
}
class N8nIntegrationController {
    static async sendText(req, res, next) {
        if (isInboundN8nPayload(req.body)) {
            return N8nIntegrationController.receiveText(req, res, next);
        }
        try {
            const data = N8nTextDTO_1.N8nSendTextSchema.parse(req.body);
            const result = await getSendTextUseCase().execute(data);
            res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            N8nIntegrationController.handleError(error, res, next, 'sendText');
        }
    }
    static async receiveText(req, res, next) {
        try {
            const data = N8nTextDTO_1.N8nReceivePayloadSchema.parse(req.body);
            const endpoint = resolveReceiveEndpoint(req);
            const result = await receiveTextUseCase.execute({ endpoint, payload: data });
            res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            N8nIntegrationController.handleError(error, res, next, 'receiveText');
        }
    }
    static handleError(error, res, next, action) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({
                error: 'Error de validación',
                details: error.errors,
            });
            return;
        }
        if (error instanceof ValidationError_1.ValidationError) {
            res.status(400).json({ error: error.message });
            return;
        }
        if (error instanceof N8nIntegrationError_1.N8nIntegrationError) {
            res.status(error.statusCode).json({ error: error.message });
            return;
        }
        if (error instanceof Error && error.message.includes('N8N_WEBHOOK_URL')) {
            res.status(503).json({ error: error.message });
            return;
        }
        Logger_1.Logger.danger(`Error en N8nIntegrationController.${action}`, {
            error: error.message,
        });
        next(error);
    }
}
exports.N8nIntegrationController = N8nIntegrationController;
//# sourceMappingURL=N8nIntegrationController.js.map