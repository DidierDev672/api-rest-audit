export interface N8nConfig {
  webhookUrl: string;
  webhookSecret?: string;
  requestTimeoutMs: number;
}

export class N8nConfigProvider {
  static load(): N8nConfig {
    const webhookUrl = process.env.N8N_WEBHOOK_URL?.trim();

    if (!webhookUrl) {
      throw new Error(
        'N8N_WEBHOOK_URL no está configurada. Defina la URL del webhook de N8N en las variables de entorno.'
      );
    }

    const timeout = Number(process.env.N8N_REQUEST_TIMEOUT_MS ?? 30000);

    return {
      webhookUrl,
      webhookSecret: process.env.N8N_WEBHOOK_SECRET?.trim() || undefined,
      requestTimeoutMs: Number.isFinite(timeout) && timeout > 0 ? timeout : 30000,
    };
  }
}
