import { INotificationDeliveryGateway, NotificationDeliveryPayload, NotificationDeliveryResult } from '../../domain/ports/INotificationDeliveryGateway';
export declare class CalendarNotificationGateway implements INotificationDeliveryGateway {
    private readonly webhookUrl?;
    private readonly webhookSecret?;
    private readonly requestTimeoutMs;
    constructor(webhookUrl?: string | undefined, webhookSecret?: string | undefined, requestTimeoutMs?: number);
    static create(): CalendarNotificationGateway;
    deliver(payload: NotificationDeliveryPayload): Promise<NotificationDeliveryResult>;
}
//# sourceMappingURL=CalendarNotificationGateway.d.ts.map