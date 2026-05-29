import { CalendarAnalysisNoteAnalysisLog } from '../entities';

export interface ICalendarAnalysisNoteAnalysisLogRepository {
  create(data: {
    calendarAiAnalysisId: string;
    analysis: string;
    noteCount: number;
    model?: string | null;
    analyzedAt?: Date;
  }): Promise<CalendarAnalysisNoteAnalysisLog>;

  findAll(calendarAiAnalysisId?: string): Promise<CalendarAnalysisNoteAnalysisLog[]>;

  findByAnalysisId(calendarAiAnalysisId: string): Promise<CalendarAnalysisNoteAnalysisLog[]>;

  findById(id: string): Promise<CalendarAnalysisNoteAnalysisLog | null>;
}
