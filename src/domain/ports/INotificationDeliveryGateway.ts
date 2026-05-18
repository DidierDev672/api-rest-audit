import { CalendarNotificationChannel } from '../enums/CalendarScheduledTaskStatus';

export interface NotificationDeliveryPayload {
  scheduledTaskId: string;
  calendarEventId: string | null;
  title: string;
  message: string;
  scheduledAt: string;
  channel: CalendarNotificationChannel;
  metadata?: Record<string, unknown>;
  event?: {
    id: string;
    type: string;
    title: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
  };
}

export interface NotificationDeliveryResult {
  delivered: boolean;
  externalReference?: string;
  error?: string;
}

export interface INotificationDeliveryGateway {
  deliver(payload: NotificationDeliveryPayload): Promise<NotificationDeliveryResult>;
}
