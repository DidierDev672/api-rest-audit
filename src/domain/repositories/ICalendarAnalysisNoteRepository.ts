import { CalendarAnalysisNote } from '../entities';

export interface ICalendarAnalysisNoteRepository {
  create(data: {
    calendarAiAnalysisId: string;
    content: string;
    color: string;
    colorName: string;
    createdAt?: Date;
  }): Promise<CalendarAnalysisNote>;

  findAll(calendarAiAnalysisId?: string): Promise<CalendarAnalysisNote[]>;

  findByAnalysisId(calendarAiAnalysisId: string): Promise<CalendarAnalysisNote[]>;

  findById(id: string): Promise<CalendarAnalysisNote | null>;

  delete(id: string): Promise<void>;
}
