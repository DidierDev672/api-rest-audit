import { CalendarNotification } from '../../domain/entities';
import { CalendarNotificationFilters, ICalendarNotificationRepository } from '../../domain/repositories/ICalendarNotificationRepository';
import { CalendarNotificationChannel } from '../../domain/enums/CalendarScheduledTaskStatus';
export declare class CalendarNotificationRepository implements ICalendarNotificationRepository {
    private readonly table;
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
    private mapToEntity;
}
//# sourceMappingURL=CalendarNotificationRepository.d.ts.map