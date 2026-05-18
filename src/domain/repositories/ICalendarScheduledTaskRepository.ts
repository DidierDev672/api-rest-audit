import { CalendarScheduledTask } from '../entities';
import { CalendarScheduledTaskStatus } from '../enums/CalendarScheduledTaskStatus';

export interface CalendarScheduledTaskFilters {
  calendarEventId?: string;
  status?: CalendarScheduledTaskStatus;
  from?: string;
  to?: string;
}

export interface ICalendarScheduledTaskRepository {
  create(
    data: Omit<
      CalendarScheduledTask,
      'id' | 'createdAt' | 'updatedAt' | 'sentAt' | 'lastError'
    >
  ): Promise<CalendarScheduledTask>;
  findAll(filters?: CalendarScheduledTaskFilters): Promise<CalendarScheduledTask[]>;
  findById(id: string): Promise<CalendarScheduledTask | null>;
  findDuePending(limit?: number): Promise<CalendarScheduledTask[]>;
  update(
    id: string,
    data: Partial<
      Pick<
        CalendarScheduledTask,
        | 'title'
        | 'message'
        | 'scheduledAt'
        | 'status'
        | 'channel'
        | 'metadata'
        | 'sentAt'
        | 'lastError'
      >
    >
  ): Promise<CalendarScheduledTask>;
  delete(id: string): Promise<void>;
  cancelByCalendarEventId(calendarEventId: string): Promise<void>;
}
