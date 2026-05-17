import { CalendarEvent } from '../../domain/entities';
import { ICalendarEventRepository } from '../../domain/repositories';
export declare class CalendarEventRepository implements ICalendarEventRepository {
    private readonly table;
    create(data: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>): Promise<CalendarEvent>;
    findByDateRange(from: string, to: string): Promise<CalendarEvent[]>;
    findById(id: string): Promise<CalendarEvent | null>;
    update(id: string, data: Partial<CalendarEvent>): Promise<CalendarEvent>;
    delete(id: string): Promise<void>;
    private mapToEntity;
}
//# sourceMappingURL=CalendarEventRepository.d.ts.map