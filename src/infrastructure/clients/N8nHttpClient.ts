import { IN8nTextGateway } from '../../domain/ports/IN8nTextGateway';
import { N8nTextRequest, N8nTextResponse } from '../../domain/entities/N8nTextMessage';
import { N8nIntegrationError } from '../../domain/errors/N8nIntegrationError';
import { TextContentValidator } from '../../domain/services/TextContentValidator';
import { N8nConfig } from '../config/N8nConfig';
import { circuitBreaker } from '../resilience/CircuitBreaker';
import { withRetry } from '../resilience/RetryLogic';
import { Logger } from '../logger/Logger';
import { DefaultN8nResponseParser, IN8nResponseParser } from './N8nResponseParser';

export class N8nHttpClient implements IN8nTextGateway {
  constructor(
    private readonly config: N8nConfig,
    private readonly responseParser: IN8nResponseParser = new DefaultN8nResponseParser()
  ) {}

  async sendText(request: N8nTextRequest): Promise<N8nTextResponse> {
    const payload = {
      text: request.text,
      metadata: request.metadata ?? {},
    };

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.config.webhookSecret) {
      headers['X-N8N-Webhook-Secret'] = this.config.webhookSecret;
    }

    const executeRequest = async (): Promise<N8nTextResponse> => {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        this.config.requestTimeoutMs
      );

      try {
        const response = await fetch(this.config.webhookUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        const rawBody = await this.parseResponseBody(response);

        if (!response.ok) {
          Logger.danger('N8N respondió con error HTTP', {
            status: response.status,
            body: rawBody,
          });
          throw new N8nIntegrationError(
            `N8N respondió con estado HTTP ${response.status}`,
            response.status >= 500 ? 502 : 400
          );
        }

        const extractedText = this.responseParser.extractText(rawBody);
        const validatedText = TextContentValidator.validateNonEmpty(
          extractedText,
          'El texto de la respuesta de N8N'
        );

        const metadata =
          typeof rawBody === 'object' && rawBody !== null
            ? (rawBody as Record<string, unknown>)
            : undefined;

        return { text: validatedText, metadata };
      } catch (error) {
        if (error instanceof N8nIntegrationError) {
          throw error;
        }

        if ((error as Error).name === 'AbortError') {
          throw new N8nIntegrationError(
            `Tiempo de espera agotado al contactar N8N (${this.config.requestTimeoutMs}ms)`,
            504
          );
        }

        Logger.danger('Error de comunicación con N8N', {
          error: (error as Error).message,
        });
        throw new N8nIntegrationError(
          `Error al comunicarse con N8N: ${(error as Error).message}`,
          502
        );
      } finally {
        clearTimeout(timeoutId);
      }
    };

    return circuitBreaker.execute(() =>
      withRetry(executeRequest, { maxAttempts: 3 })
    );
  }

  private async parseResponseBody(response: Response): Promise<unknown> {
    const contentType = response.headers.get('content-type') ?? '';

    if (contentType.includes('application/json')) {
      try {
        return await response.json();
      } catch {
        throw new N8nIntegrationError(
          'N8N devolvió un JSON inválido',
          502
        );
      }
    }

    const text = await response.text();

    if (!text) {
      throw new N8nIntegrationError(
        'N8N devolvió una respuesta vacía',
        502
      );
    }

    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }
}
