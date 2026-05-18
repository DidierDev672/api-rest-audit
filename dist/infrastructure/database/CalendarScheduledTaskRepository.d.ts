import { CalendarScheduledTask } from '../../domain/entities';
import { CalendarScheduledTaskFilters, ICalendarScheduledTaskRepository } from '../../domain/repositories/ICalendarScheduledTaskRepository';
export declare class CalendarScheduledTaskRepository implements ICalendarScheduledTaskRepository {
    private readonly table;
    create(data: Omit<CalendarScheduledTask, 'id' | 'createdAt' | 'updatedAt' | 'sentAt' | 'lastError'>): Promise<CalendarScheduledTask>;
    findAll(filters?: CalendarScheduledTaskFilters): Promise<CalendarScheduledTask[]>;
    findById(id: string): Promise<CalendarScheduledTask | null>;
    findDuePending(limit?: number): Promise<CalendarScheduledTask[]>;
    update(id: string, data: Partial<Pick<CalendarScheduledTask, 'title' | 'message' | 'scheduledAt' | 'status' | 'channel' | 'metadata' | 'sentAt' | 'lastError'>>): Promise<CalendarScheduledTask>;
    delete(id: string): Promise<void>;
    cancelByCalendarEventId(calendarEventId: string): Promise<void>;
    private mapToEntity;
}
//# sourceMappingURL=CalendarScheduledTaskRepository.d.ts.map