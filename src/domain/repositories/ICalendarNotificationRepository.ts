import { CalendarNotification } from '../entities';
import { CalendarNotificationChannel } from '../enums/CalendarScheduledTaskStatus';

export interface CalendarNotificationFilters {
  calendarEventId?: string;
  scheduledTaskId?: string;
  from?: string;
  to?: string;
}

export interface ICalendarNotificationRepository {
  create(data: {
    scheduledTaskId?: string | null;
    calendarEventId?: string | null;
    title: string;
    message: string;
    channel: CalendarNotificationChannel;
    status: 'delivered' | 'failed';
    payload?: Record<string, unknown>;
    deliveredAt?: Date;
  }): Promise<CalendarNotification>;
  findAll(filters?: CalendarNotificationFilters): Promise<CalendarNotification[]>;
  findById(id: string): Promise<CalendarNotification | null>;
}
