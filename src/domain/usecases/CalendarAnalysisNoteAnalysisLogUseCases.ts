import { CalendarAnalysisNoteAnalysisLog } from '../entities';
import { ICalendarAnalysisNoteAnalysisLogRepository } from '../repositories/ICalendarAnalysisNoteAnalysisLogRepository';
import { ICalendarAiAnalysisRepository } from '../repositories/ICalendarAiAnalysisRepository';
import { IdValidator } from '../../infrastructure/validators/IdValidator';

export class CreateCalendarAnalysisNoteAnalysisLogUseCase {
  constructor(
    private readonly logRepository: ICalendarAnalysisNoteAnalysisLogRepository,
    private readonly analysisRepository: ICalendarAiAnalysisRepository,
  ) {}

  async execute(data: {
    calendarAiAnalysisId: string;
    analysis: string;
    noteCount: number;
    model?: string | null;
    analyzedAt?: string;
  }): Promise<CalendarAnalysisNoteAnalysisLog> {
    IdValidator.validate(data.calendarAiAnalysisId, 'CalendarAiAnalysis');

    const analysis = await this.analysisRepository.findById(data.calendarAiAnalysisId);
    if (!analysis) {
      throw new Error('Análisis de calendario no encontrado');
    }

    const analyzedAt = data.analyzedAt ? new Date(data.analyzedAt) : undefined;

    return this.logRepository.create({
      calendarAiAnalysisId: data.calendarAiAnalysisId,
      analysis: data.analysis.trim(),
      noteCount: data.noteCount,
      model: data.model ?? null,
      analyzedAt,
    });
  }
}

export class GetCalendarAnalysisNoteAnalysisLogsUseCase {
  constructor(private readonly logRepository: ICalendarAnalysisNoteAnalysisLogRepository) {}

  async execute(calendarAiAnalysisId?: string): Promise<CalendarAnalysisNoteAnalysisLog[]> {
    if (calendarAiAnalysisId) {
      IdValidator.validate(calendarAiAnalysisId, 'CalendarAiAnalysis');
      return this.logRepository.findByAnalysisId(calendarAiAnalysisId);
    }
    return this.logRepository.findAll();
  }
}

export class GetCalendarAnalysisNoteAnalysisLogByIdUseCase {
  constructor(private readonly logRepository: ICalendarAnalysisNoteAnalysisLogRepository) {}

  async execute(id: string): Promise<CalendarAnalysisNoteAnalysisLog | null> {
    IdValidator.validate(id, 'CalendarAnalysisNoteAnalysisLog');
    return this.logRepository.findById(id);
  }
}
