import {
  INotificationDeliveryGateway,
  NotificationDeliveryPayload,
  NotificationDeliveryResult,
} from '../../domain/ports/INotificationDeliveryGateway';
import { Logger } from '../logger/Logger';

export class CalendarNotificationGateway implements INotificationDeliveryGateway {
  constructor(
    private readonly webhookUrl?: string,
    private readonly webhookSecret?: string,
    private readonly requestTimeoutMs = 15000
  ) {}

  static create(): CalendarNotificationGateway {
    return new CalendarNotificationGateway(
      process.env.CALENDAR_NOTIFICATION_WEBHOOK_URL?.trim() ||
        process.env.N8N_WEBHOOK_URL?.trim(),
      process.env.N8N_WEBHOOK_SECRET?.trim() || process.env.N8N_API_KEY?.trim(),
      Number(process.env.CALENDAR_NOTIFICATION_TIMEOUT_MS ?? 15000)
    );
  }

  async deliver(
    payload: NotificationDeliveryPayload
  ): Promise<NotificationDeliveryResult> {
    if (payload.channel === 'in_app') {
      return { delivered: true };
    }

    if (!this.webhookUrl) {
      Logger.warning(
        'Canal de notificación externo sin URL configurada; se registra solo en base de datos',
        { channel: payload.channel, taskId: payload.scheduledTaskId }
      );
      return { delivered: true };
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.webhookSecret) {
      headers['X-N8N-Webhook-Secret'] = this.webhookSecret;
      headers['X-API-KEY'] = this.webhookSecret;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.requestTimeoutMs);

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          type: 'calendar_notification',
          ...payload,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const body = await response.text();
        return {
          delivered: false,
          error: `Webhook respondió ${response.status}: ${body}`,
        };
      }

      return {
        delivered: true,
        externalReference: response.headers.get('x-request-id') || undefined,
      };
    } catch (error) {
      const message =
        (error as Error).name === 'AbortError'
          ? 'Tiempo de espera agotado al enviar notificación'
          : (error as Error).message;

      return { delivered: false, error: message };
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
