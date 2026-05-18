import { CalendarAiAnalysis } from '../entities';
import { ICalendarAiAnalysisRepository } from '../repositories';
export declare class CreateCalendarAiAnalysisUseCase {
    private readonly repository;
    constructor(repository: ICalendarAiAnalysisRepository);
    execute(data: {
        calendarEventId: string;
        researchId?: string | number | null;
        eventTitle: string;
        eventType: 'task' | 'research';
        eventDate: string;
        researchName?: string | null;
        content: string;
        model?: string | null;
        generatedAt: string;
    }): Promise<CalendarAiAnalysis>;
}
export declare class GetCalendarAiAnalysesUseCase {
    private readonly repository;
    constructor(repository: ICalendarAiAnalysisRepository);
    execute(filters?: {
        calendarEventId?: string;
        researchId?: string;
        from?: string;
        to?: string;
    }): Promise<CalendarAiAnalysis[]>;
}
export declare class GetCalendarAiAnalysisByIdUseCase {
    private readonly repository;
    constructor(repository: ICalendarAiAnalysisRepository);
    execute(id: string): Promise<CalendarAiAnalysis | null>;
}
export declare class DeleteCalendarAiAnalysisUseCase {
    private readonly repository;
    constructor(repository: ICalendarAiAnalysisRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=CalendarAiAnalysisUseCases.d.ts.map