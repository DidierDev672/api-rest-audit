import { CalendarEvent } from '../entities';
export interface ICalendarEventRepository {
    create(data: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>): Promise<CalendarEvent>;
    findByDateRange(from: string, to: string): Promise<CalendarEvent[]>;
    findById(id: string): Promise<CalendarEvent | null>;
    update(id: string, data: Partial<CalendarEvent>): Promise<CalendarEvent>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=ICalendarEventRepository.d.ts.map