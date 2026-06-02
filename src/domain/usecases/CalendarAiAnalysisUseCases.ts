import { CalendarAiAnalysis } from '../entities';
import { ICalendarAiAnalysisRepository } from '../repositories';
import { Logger } from '../../infrastructure/logger/Logger';
import { IdValidator } from '../../infrastructure/validators/IdValidator';

export class CreateCalendarAiAnalysisUseCase {
  constructor(private readonly repository: ICalendarAiAnalysisRepository) {}

  async execute(data: {
    calendarEventId: string;
    researchId?: string | number | null;
    eventTitle: string;
    eventType: 'task' | 'research';
    eventDate: string;
    researchName?: string | null;
    content: string;
    model?: string | null;
    generatedAt: string;
  }): Promise<CalendarAiAnalysis> {
    try {
      Logger.info('Creando análisis IA de calendario', { calendarEventId: data.calendarEventId });

      const researchId = data.researchId != null ? String(data.researchId) : null;

      const result = await this.repository.create({
        calendarEventId: data.calendarEventId,
        researchId,
        eventTitle: data.eventTitle,
        eventType: data.eventType,
        eventDate: data.eventDate,
        researchName: data.researchName ?? null,
        content: data.content,
        model: data.model ?? null,
        generatedAt: new Date(data.generatedAt),
      });

      Logger.success('Análisis IA de calendario creado exitosamente', { id: result.id });
      return result;
    } catch (error) {
      Logger.danger('Error al crear análisis IA de calendario', { error: (error as Error).message });
      throw error;
    }
  }
}

export class GetCalendarAiAnalysesUseCase {
  constructor(private readonly repository: ICalendarAiAnalysisRepository) {}

  async execute(filters?: {
    calendarEventId?: string;
    researchId?: string;
    from?: string;
    to?: string;
  }): Promise<CalendarAiAnalysis[]> {
    try {
      Logger.info('Obteniendo análisis IA de calendario', { filters });
      const result = await this.repository.findAll(filters);
      Logger.success('Análisis IA de calendario obtenidos', { count: result.length });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener análisis IA de calendario', { error: (error as Error).message });
      throw error;
    }
  }
}

export class GetCalendarAiAnalysisByIdUseCase {
  constructor(private readonly repository: ICalendarAiAnalysisRepository) {}

  async execute(id: string): Promise<CalendarAiAnalysis | null> {
    try {
      IdValidator.validate(id, 'CalendarAiAnalysis');
      Logger.info('Obteniendo análisis IA de calendario por ID', { id });
      const result = await this.repository.findById(id);
      if (!result) {
        Logger.warning('Análisis IA de calendario no encontrado', { id });
        return null;
      }
      Logger.success('Análisis IA de calendario obtenido', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener análisis IA de calendario por ID', { error: (error as Error).message });
      throw error;
    }
  }
}

export class UpdateCalendarAiAnalysisUseCase {
  constructor(private readonly repository: ICalendarAiAnalysisRepository) {}

  async execute(
    id: string,
    data: {
      eventTitle?: string;
      researchName?: string | null;
      content?: string;
      eventDate?: string;
    },
  ): Promise<CalendarAiAnalysis> {
    try {
      IdValidator.validate(id, 'CalendarAiAnalysis');
      Logger.info('Actualizando análisis IA de calendario', { id });

      const existing = await this.repository.findById(id);
      if (!existing) {
        throw new Error('Análisis IA de calendario no encontrada');
      }

      const result = await this.repository.update(id, data);
      Logger.success('Análisis IA de calendario actualizado', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al actualizar análisis IA de calendario', {
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export class DeleteCalendarAiAnalysisUseCase {
  constructor(private readonly repository: ICalendarAiAnalysisRepository) {}

  async execute(id: string): Promise<void> {
    try {
      IdValidator.validate(id, 'CalendarAiAnalysis');
      Logger.info('Eliminando análisis IA de calendario', { id });

      const existing = await this.repository.findById(id);
      if (!existing) {
        throw new Error('Análisis IA de calendario no encontrada');
      }

      await this.repository.delete(id);
      Logger.success('Análisis IA de calendario eliminado', { id });
    } catch (error) {
      Logger.danger('Error al eliminar análisis IA de calendario', { error: (error as Error).message });
      throw error;
    }
  }
}
