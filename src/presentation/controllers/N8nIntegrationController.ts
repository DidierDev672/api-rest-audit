import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import {
  SendTextToN8nUseCase,
  ReceiveTextFromN8nUseCase,
} from '../../domain/usecases/N8nTextUseCases';
import { ValidationError } from '../../domain/errors/ValidationError';
import { N8nIntegrationError } from '../../domain/errors/N8nIntegrationError';
import { N8nHttpClient } from '../../infrastructure/clients/N8nHttpClient';
import { N8nConfigProvider } from '../../infrastructure/config/N8nConfig';
import { IN8nTextGateway } from '../../domain/ports/IN8nTextGateway';
import { Logger } from '../../infrastructure/logger/Logger';
import {
  N8nReceivePayloadSchema,
  N8nSendTextSchema,
} from '../dto/N8nTextDTO';
import { N8nGeminiPayloadParser } from '../../domain/services/N8nGeminiPayloadParser';
import { N8nWebhookEndpoint } from '../../domain/entities/N8nIntegration';
import {
  N8nTextExchangeRepository,
  N8nWebhookLogRepository,
  N8nMarkdownDocumentRepository,
} from '../../infrastructure/database';

let sendTextUseCase: SendTextToN8nUseCase | null = null;
const receiveTextUseCase = new ReceiveTextFromN8nUseCase(
  new N8nWebhookLogRepository(),
  new N8nMarkdownDocumentRepository()
);

function getSendTextUseCase(): SendTextToN8nUseCase {
  if (!sendTextUseCase) {
    const gateway: IN8nTextGateway = new N8nHttpClient(N8nConfigProvider.load());
    sendTextUseCase = new SendTextToN8nUseCase(
      gateway,
      new N8nWebhookLogRepository(),
      new N8nTextExchangeRepository()
    );
  }
  return sendTextUseCase;
}

function isInboundN8nPayload(body: unknown): boolean {
  const unwrapped = N8nGeminiPayloadParser.unwrapBody(body);
  return (
    N8nGeminiPayloadParser.isGeminiWebhookPayload(unwrapped) ||
    N8nGeminiPayloadParser.isMarkdownUploadPayload(unwrapped)
  );
}

function resolveReceiveEndpoint(req: Request): N8nWebhookEndpoint {
  const path = req.path.toLowerCase();

  if (path.includes('markdown/upload')) {
    return 'markdown/upload';
  }

  if (path.endsWith('/send')) {
    return 'send';
  }

  return 'receive';
}

export class N8nIntegrationController {
  static async sendText(req: Request, res: Response, next: NextFunction) {
    if (isInboundN8nPayload(req.body)) {
      return N8nIntegrationController.receiveText(req, res, next);
    }

    try {
      const data = N8nSendTextSchema.parse(req.body);
      const result = await getSendTextUseCase().execute(data);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      N8nIntegrationController.handleError(error, res, next, 'sendText');
    }
  }

  static async receiveText(req: Request, res: Response, next: NextFunction) {
    try {
      const data = N8nReceivePayloadSchema.parse(req.body);
      const endpoint = resolveReceiveEndpoint(req);
      const result = await receiveTextUseCase.execute({ endpoint, payload: data });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      N8nIntegrationController.handleError(error, res, next, 'receiveText');
    }
  }

  private static handleError(
    error: unknown,
    res: Response,
    next: NextFunction,
    action: string
  ): void {
    if (error instanceof ZodError) {
      res.status(400).json({
        error: 'Error de validación',
        details: error.errors,
      });
      return;
    }

    if (error instanceof ValidationError) {
      res.status(400).json({ error: error.message });
      return;
    }

    if (error instanceof N8nIntegrationError) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }

    if (error instanceof Error && error.message.includes('N8N_WEBHOOK_URL')) {
      res.status(503).json({ error: error.message });
      return;
    }

    Logger.danger(`Error en N8nIntegrationController.${action}`, {
      error: (error as Error).message,
    });
    next(error);
  }
}
