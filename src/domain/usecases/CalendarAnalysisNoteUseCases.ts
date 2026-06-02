import { CalendarAnalysisNote } from '../entities';
import { ICalendarAnalysisNoteRepository } from '../repositories/ICalendarAnalysisNoteRepository';
import { ICalendarAiAnalysisRepository } from '../repositories/ICalendarAiAnalysisRepository';
import { Logger } from '../../infrastructure/logger/Logger';
import { IdValidator } from '../../infrastructure/validators/IdValidator';

export class CreateCalendarAnalysisNoteUseCase {
  constructor(
    private readonly noteRepository: ICalendarAnalysisNoteRepository,
    private readonly analysisRepository: ICalendarAiAnalysisRepository,
  ) {}

  async execute(data: {
    calendarAiAnalysisId: string;
    content: string;
    color: string;
    colorName: string;
    createdAt?: string;
  }): Promise<CalendarAnalysisNote> {
    IdValidator.validate(data.calendarAiAnalysisId, 'CalendarAiAnalysis');

    const analysis = await this.analysisRepository.findById(data.calendarAiAnalysisId);
    if (!analysis) {
      throw new Error('Análisis de calendario no encontrado');
    }

    const createdAt = data.createdAt ? new Date(data.createdAt) : undefined;

    Logger.info('Creando nota para análisis de calendario', {
      calendarAiAnalysisId: data.calendarAiAnalysisId,
    });

    return this.noteRepository.create({
      calendarAiAnalysisId: data.calendarAiAnalysisId,
      content: data.content.trim(),
      color: data.color,
      colorName: data.colorName,
      createdAt,
    });
  }
}

export class GetCalendarAnalysisNotesUseCase {
  constructor(private readonly noteRepository: ICalendarAnalysisNoteRepository) {}

  async execute(calendarAiAnalysisId?: string): Promise<CalendarAnalysisNote[]> {
    if (calendarAiAnalysisId) {
      IdValidator.validate(calendarAiAnalysisId, 'CalendarAiAnalysis');
      return this.noteRepository.findByAnalysisId(calendarAiAnalysisId);
    }
    return this.noteRepository.findAll();
  }
}

export class GetCalendarAnalysisNoteByIdUseCase {
  constructor(private readonly noteRepository: ICalendarAnalysisNoteRepository) {}

  async execute(id: string): Promise<CalendarAnalysisNote | null> {
    IdValidator.validate(id, 'CalendarAnalysisNote');
    return this.noteRepository.findById(id);
  }
}

export class UpdateCalendarAnalysisNoteUseCase {
  constructor(private readonly noteRepository: ICalendarAnalysisNoteRepository) {}

  async execute(
    id: string,
    data: {
      content?: string;
      color?: string;
      colorName?: string;
      createdAt?: string;
    },
  ): Promise<CalendarAnalysisNote> {
    IdValidator.validate(id, 'CalendarAnalysisNote');

    const existing = await this.noteRepository.findById(id);
    if (!existing) {
      throw new Error('Nota no encontrada');
    }

    const patch: {
      content?: string;
      color?: string;
      colorName?: string;
      createdAt?: Date;
    } = {};

    if (data.content !== undefined) patch.content = data.content.trim();
    if (data.color !== undefined) patch.color = data.color;
    if (data.colorName !== undefined) patch.colorName = data.colorName.trim();
    if (data.createdAt !== undefined) patch.createdAt = new Date(data.createdAt);

    return this.noteRepository.update(id, patch);
  }
}

export class DeleteCalendarAnalysisNoteUseCase {
  constructor(private readonly noteRepository: ICalendarAnalysisNoteRepository) {}

  async execute(id: string): Promise<void> {
    IdValidator.validate(id, 'CalendarAnalysisNote');

    const existing = await this.noteRepository.findById(id);
    if (!existing) {
      throw new Error('Nota no encontrada');
    }

    await this.noteRepository.delete(id);
  }
}
