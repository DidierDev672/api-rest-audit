import { CalendarAiAnalysis } from '../../domain/entities';
import { ICalendarAiAnalysisRepository } from '../../domain/repositories';
export declare class CalendarAiAnalysisRepository implements ICalendarAiAnalysisRepository {
    private readonly table;
    create(data: Omit<CalendarAiAnalysis, 'id' | 'createdAt' | 'updatedAt'>): Promise<CalendarAiAnalysis>;
    findAll(filters?: {
        calendarEventId?: string;
        researchId?: string;
        from?: string;
        to?: string;
    }): Promise<CalendarAiAnalysis[]>;
    findById(id: string): Promise<CalendarAiAnalysis | null>;
    delete(id: string): Promise<void>;
    getEventAnalysisSummary(eventIds: string[]): Promise<Array<{
        calendarEventId: string;
        count: number;
        lastGeneratedAt: string | null;
    }>>;
    private mapToEntity;
}
//# sourceMappingURL=CalendarAiAnalysisRepository.d.ts.map