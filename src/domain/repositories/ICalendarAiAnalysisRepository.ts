import { CalendarAiAnalysis } from '../entities';

export interface ICalendarAiAnalysisRepository {
  create(data: Omit<CalendarAiAnalysis, 'id' | 'createdAt' | 'updatedAt'>): Promise<CalendarAiAnalysis>;
  findAll(filters?: {
    calendarEventId?: string;
    researchId?: string;
    from?: string;
    to?: string;
  }): Promise<CalendarAiAnalysis[]>;
  findById(id: string): Promise<CalendarAiAnalysis | null>;
  update(
    id: string,
    data: {
      eventTitle?: string;
      researchName?: string | null;
      content?: string;
      eventDate?: string;
    },
  ): Promise<CalendarAiAnalysis>;
  delete(id: string): Promise<void>;
  getEventAnalysisSummary(eventIds: string[]): Promise<Array<{
    calendarEventId: string;
    count: number;
    lastGeneratedAt: string | null;
  }>>;
}
