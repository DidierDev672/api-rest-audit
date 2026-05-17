import { CalendarEvent } from '../entities';
import { ICalendarEventRepository } from '../repositories';
import { Logger } from '../../infrastructure/logger/Logger';
import { IdValidator } from '../../infrastructure/validators/IdValidator';

export class CreateCalendarEventUseCase {
  constructor(private readonly repository: ICalendarEventRepository) {}

  async execute(data: {
    type: 'task' | 'research';
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    researchId?: string | null;
  }): Promise<CalendarEvent> {
    try {
      Logger.info('Creando evento de calendario', { title: data.title });

      if (data.endDate < data.startDate) {
        throw new Error('endDate debe ser mayor o igual a startDate');
      }

      if (data.endDate === data.startDate && data.endTime <= data.startTime) {
        throw new Error('endTime debe ser mayor a startTime cuando es el mismo día');
      }

      const result = await this.repository.create({
        type: data.type,
        title: data.title,
        description: data.description || '',
        startDate: data.startDate,
        endDate: data.endDate,
        startTime: data.startTime,
        endTime: data.endTime,
        researchId: data.researchId || null,
      });

      Logger.success('Evento de calendario creado exitosamente', { id: result.id });
      return result;
    } catch (error) {
      Logger.danger('Error al crear evento de calendario', { error: (error as Error).message });
      throw error;
    }
  }
}

export class GetCalendarEventsByDateRangeUseCase {
  constructor(private readonly repository: ICalendarEventRepository) {}

  async execute(from: string, to: string): Promise<CalendarEvent[]> {
    try {
      Logger.info('Obteniendo eventos de calendario por rango', { from, to });
      const result = await this.repository.findByDateRange(from, to);
      Logger.success('Eventos de calendario obtenidos', { count: result.length });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener eventos de calendario', { error: (error as Error).message });
      throw error;
    }
  }
}

export class GetCalendarEventByIdUseCase {
  constructor(private readonly repository: ICalendarEventRepository) {}

  async execute(id: string): Promise<CalendarEvent | null> {
    try {
      IdValidator.validate(id, 'CalendarEvent');
      Logger.info('Obteniendo evento de calendario por ID', { id });
      const result = await this.repository.findById(id);
      if (!result) {
        Logger.warning('Evento de calendario no encontrado', { id });
        return null;
      }
      Logger.success('Evento de calendario obtenido', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al obtener evento de calendario por ID', { error: (error as Error).message });
      throw error;
    }
  }
}

export class UpdateCalendarEventUseCase {
  constructor(private readonly repository: ICalendarEventRepository) {}

  async execute(id: string, data: Partial<CalendarEvent>): Promise<CalendarEvent> {
    try {
      IdValidator.validate(id, 'CalendarEvent');
      Logger.info('Actualizando evento de calendario', { id });

      const existing = await this.repository.findById(id);
      if (!existing) {
        throw new Error('Evento de calendario no encontrada');
      }

      const result = await this.repository.update(id, data);
      Logger.success('Evento de calendario actualizado', { id });
      return result;
    } catch (error) {
      Logger.danger('Error al actualizar evento de calendario', { error: (error as Error).message });
      throw error;
    }
  }
}

export class DeleteCalendarEventUseCase {
  constructor(private readonly repository: ICalendarEventRepository) {}

  async execute(id: string): Promise<void> {
    try {
      IdValidator.validate(id, 'CalendarEvent');
      Logger.info('Eliminando evento de calendario', { id });

      const existing = await this.repository.findById(id);
      if (!existing) {
        throw new Error('Evento de calendario no encontrada');
      }

      await this.repository.delete(id);
      Logger.success('Evento de calendario eliminado', { id });
    } catch (error) {
      Logger.danger('Error al eliminar evento de calendario', { error: (error as Error).message });
      throw error;
    }
  }
}
