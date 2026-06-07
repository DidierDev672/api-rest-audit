import { AiModelProvider } from '../../domain/entities/AiModelCredentialEntity';
import { Logger } from '../logger/Logger';

export interface AiModelTestInput {
  provider: AiModelProvider;
  apiKey: string;
  model?: string | null;
  baseUrl?: string | null;
}

export interface AiModelTestOutcome {
  ok: boolean;
  statusCode: number | null;
  message: string;
}

/**
 * Realiza una comprobación en vivo, ligera y de bajo costo, contra el proveedor
 * de IA para validar que la API key (y, si aplica, el endpoint) funcionan.
 */
export class AiModelTesterGateway {
  private readonly timeoutMs: number;

  constructor() {
    this.timeoutMs = Number(process.env.AI_MODEL_TEST_TIMEOUT_MS ?? 15000);
  }

  async test(input: AiModelTestInput): Promise<AiModelTestOutcome> {
    const apiKey = (input.apiKey ?? '').trim();
    if (!apiKey) {
      return { ok: false, statusCode: null, message: 'No hay API key configurada.' };
    }

    try {
      switch (input.provider) {
        case 'gemini':
          return await this.testGemini(apiKey);
        case 'openai':
          return await this.testOpenAi(apiKey);
        case 'anthropic':
          return await this.testAnthropic(apiKey);
        case 'other':
          return await this.testOther(apiKey, input.baseUrl);
        default:
          return { ok: false, statusCode: null, message: 'Proveedor no soportado.' };
      }
    } catch (error) {
      const message =
        (error as Error).name === 'AbortError'
          ? 'Tiempo de espera agotado al contactar al proveedor.'
          : `No se pudo conectar con el proveedor: ${(error as Error).message}`;
      Logger.warning('Fallo al probar modelo de IA', { provider: input.provider, message });
      return { ok: false, statusCode: null, message };
    }
  }

  private async testGemini(apiKey: string): Promise<AiModelTestOutcome> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(
      apiKey,
    )}`;
    const res = await this.fetchWithTimeout(url, { method: 'GET' });
    return this.interpret(res, 'Gemini');
  }

  private async testOpenAi(apiKey: string): Promise<AiModelTestOutcome> {
    const res = await this.fetchWithTimeout('https://api.openai.com/v1/models', {
      method: 'GET',
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    return this.interpret(res, 'OpenAI');
  }

  private async testAnthropic(apiKey: string): Promise<AiModelTestOutcome> {
    const res = await this.fetchWithTimeout('https://api.anthropic.com/v1/models', {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
    });
    return this.interpret(res, 'Claude');
  }

  private async testOther(
    apiKey: string,
    baseUrl?: string | null,
  ): Promise<AiModelTestOutcome> {
    const base = (baseUrl ?? '').trim().replace(/\/+$/, '');
    if (!base) {
      return {
        ok: false,
        statusCode: null,
        message: 'Falta el endpoint base (base_url) del proveedor personalizado.',
      };
    }

    const res = await this.fetchWithTimeout(`${base}/models`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    return this.interpret(res, 'el proveedor');
  }

  private interpret(res: Response, label: string): AiModelTestOutcome {
    if (res.ok) {
      return { ok: true, statusCode: res.status, message: `Conexión con ${label} verificada.` };
    }
    if (res.status === 401 || res.status === 403) {
      return {
        ok: false,
        statusCode: res.status,
        message: `${label} rechazó la API key (no autorizada). Verifica que sea válida y esté activa.`,
      };
    }
    if (res.status === 404) {
      return {
        ok: false,
        statusCode: res.status,
        message: `${label} respondió 404. Revisa el endpoint o el nombre del modelo.`,
      };
    }
    if (res.status === 429) {
      return {
        ok: false,
        statusCode: res.status,
        message: `${label} reportó límite de uso (429). La key es válida pero está saturada o sin cuota.`,
      };
    }
    return {
      ok: false,
      statusCode: res.status,
      message: `${label} respondió con estado ${res.status}.`,
    };
  }

  private async fetchWithTimeout(url: string, init: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      return await fetch(url, { ...init, signal: controller.signal });
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
