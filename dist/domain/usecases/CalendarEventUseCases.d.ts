import { CalendarEvent } from '../entities';
import { ICalendarEventRepository } from '../repositories';
export declare class CreateCalendarEventUseCase {
    private readonly repository;
    constructor(repository: ICalendarEventRepository);
    execute(data: {
        type: 'task' | 'research';
        title: string;
        description?: string;
        startDate: string;
        endDate: string;
        startTime: string;
        endTime: string;
        researchId?: string | null;
    }): Promise<CalendarEvent>;
}
export declare class GetCalendarEventsByDateRangeUseCase {
    private readonly repository;
    constructor(repository: ICalendarEventRepository);
    execute(from: string, to: string): Promise<CalendarEvent[]>;
}
export declare class GetCalendarEventByIdUseCase {
    private readonly repository;
    constructor(repository: ICalendarEventRepository);
    execute(id: string): Promise<CalendarEvent | null>;
}
export declare class UpdateCalendarEventUseCase {
    private readonly repository;
    constructor(repository: ICalendarEventRepository);
    execute(id: string, data: Partial<CalendarEvent>): Promise<CalendarEvent>;
}
export declare class DeleteCalendarEventUseCase {
    private readonly repository;
    constructor(repository: ICalendarEventRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=CalendarEventUseCases.d.ts.map