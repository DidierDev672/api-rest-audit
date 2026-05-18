import { CalendarScheduledTask, CalendarEvent } from '../entities';
import { ICalendarEventRepository } from '../repositories/ICalendarEventRepository';
import {
  CalendarScheduledTaskFilters,
  ICalendarScheduledTaskRepository,
} from '../repositories/ICalendarScheduledTaskRepository';
import { ICalendarNotificationRepository } from '../repositories/ICalendarNotificationRepository';
import { INotificationDeliveryGateway } from '../ports/INotificationDeliveryGateway';
import { CalendarScheduleCalculator } from '../services/CalendarScheduleCalculator';
import { CalendarNotificationChannel } from '../enums/CalendarScheduledTaskStatus';
import { Logger } from '../../infrastructure/logger/Logger';
import { IdValidator } from '../../infrastructure/validators/IdValidator';

export interface CreateScheduledTaskInput {
  calendarEventId?: string | null;
  title: string;
  message?: string;
  scheduledAt?: string;
  reminderMinutesBefore?: number;
  channel?: CalendarNotificationChannel;
  metadata?: Record<string, unknown>;
}

export interface ProcessDueTasksResult {
  processed: number;
  delivered: number;
  failed: number;
  notifications: Array<{ taskId: string; notificationId: string; status: string }>;
}

export class CreateCalendarScheduledTaskUseCase {
  constructor(
    private readonly taskRepository: ICalendarScheduledTaskRepository,
    private readonly eventRepository: ICalendarEventRepository
  ) {}

  async execute(input: CreateScheduledTaskInput): Promise<CalendarScheduledTask> {
    let scheduledAt: Date;
    let calendarEvent: CalendarEvent | null = null;

    if (input.calendarEventId) {
      IdValidator.validate(input.calendarEventId, 'CalendarEvent');
      calendarEvent = await this.eventRepository.findById(input.calendarEventId);

      if (!calendarEvent) {
        throw new Error('Evento de calendario no encontrado');
      }
    }

    if (input.reminderMinutesBefore !== undefined) {
      if (!calendarEvent) {
        throw new Error(
          'calendarEventId es requerido cuando se usa reminderMinutesBefore'
        );
      }

      scheduledAt = CalendarScheduleCalculator.reminderAt(
        calendarEvent,
        input.reminderMinutesBefore
      );
    } else if (input.scheduledAt) {
      scheduledAt = new Date(input.scheduledAt);

      if (Number.isNaN(scheduledAt.getTime())) {
        throw new Error('scheduledAt no es una fecha válida');
      }
    } else {
      throw new Error('Debe indicar scheduledAt o reminderMinutesBefore');
    }

    const title =
      input.title.trim() ||
      (calendarEvent ? `Recordatorio: ${calendarEvent.title}` : 'Tarea programada');

    const message =
      input.message?.trim() ||
      (calendarEvent
        ? `Recordatorio del evento "${calendarEvent.title}" programado para ${calendarEvent.startDate} a las ${calendarEvent.startTime}`
        : '');

    Logger.info('Creando tarea programada de calendario', {
      calendarEventId: input.calendarEventId,
      scheduledAt: scheduledAt.toISOString(),
    });

    const task = await this.taskRepository.create({
      calendarEventId: input.calendarEventId ?? null,
      title,
      message,
      scheduledAt,
      status: 'pending',
      channel: input.channel ?? 'in_app',
      reminderMinutesBefore: input.reminderMinutesBefore ?? null,
      metadata: input.metadata ?? {},
    });

    Logger.success('Tarea programada creada', { id: task.id });
    return task;
  }
}

export class GetCalendarScheduledTasksUseCase {
  constructor(private readonly repository: ICalendarScheduledTaskRepository) {}

  async execute(filters?: CalendarScheduledTaskFilters): Promise<CalendarScheduledTask[]> {
    Logger.info('Obteniendo tareas programadas', { filters });
    const tasks = await this.repository.findAll(filters);
    Logger.success('Tareas programadas obtenidas', { count: tasks.length });
    return tasks;
  }
}

export class GetCalendarScheduledTaskByIdUseCase {
  constructor(private readonly repository: ICalendarScheduledTaskRepository) {}

  async execute(id: string): Promise<CalendarScheduledTask | null> {
    IdValidator.validate(id, 'CalendarScheduledTask');
    return this.repository.findById(id);
  }
}

export class UpdateCalendarScheduledTaskUseCase {
  constructor(private readonly repository: ICalendarScheduledTaskRepository) {}

  async execute(
    id: string,
    data: {
      title?: string;
      message?: string;
      scheduledAt?: string;
      status?: 'pending' | 'cancelled';
      channel?: CalendarNotificationChannel;
      metadata?: Record<string, unknown>;
    }
  ): Promise<CalendarScheduledTask> {
    IdValidator.validate(id, 'CalendarScheduledTask');

    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new Error('Tarea programada no encontrada');
    }

    if (existing.status === 'sent') {
      throw new Error('No se puede modificar una tarea ya enviada');
    }

    const updateData: Parameters<ICalendarScheduledTaskRepository['update']>[1] = {};

    if (data.title !== undefined) updateData.title = data.title;
    if (data.message !== undefined) updateData.message = data.message;
    if (data.scheduledAt !== undefined) {
      const scheduledAt = new Date(data.scheduledAt);
      if (Number.isNaN(scheduledAt.getTime())) {
        throw new Error('scheduledAt no es una fecha válida');
      }
      updateData.scheduledAt = scheduledAt;
    }
    if (data.status !== undefined) updateData.status = data.status;
    if (data.channel !== undefined) updateData.channel = data.channel;
    if (data.metadata !== undefined) updateData.metadata = data.metadata;

    Logger.info('Actualizando tarea programada', { id });
    const updated = await this.repository.update(id, updateData);
    Logger.success('Tarea programada actualizada', { id });
    return updated;
  }
}

export class DeleteCalendarScheduledTaskUseCase {
  constructor(private readonly repository: ICalendarScheduledTaskRepository) {}

  async execute(id: string): Promise<void> {
    IdValidator.validate(id, 'CalendarScheduledTask');

    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new Error('Tarea programada no encontrada');
    }

    await this.repository.delete(id);
    Logger.success('Tarea programada eliminada', { id });
  }
}

export class ProcessDueCalendarScheduledTasksUseCase {
  constructor(
    private readonly taskRepository: ICalendarScheduledTaskRepository,
    private readonly eventRepository: ICalendarEventRepository,
    private readonly notificationRepository: ICalendarNotificationRepository,
    private readonly deliveryGateway: INotificationDeliveryGateway
  ) {}

  async execute(limit = 50): Promise<ProcessDueTasksResult> {
    const dueTasks = await this.taskRepository.findDuePending(limit);

    Logger.info('Procesando tareas programadas vencidas', { count: dueTasks.length });

    const result: ProcessDueTasksResult = {
      processed: 0,
      delivered: 0,
      failed: 0,
      notifications: [],
    };

    for (const task of dueTasks) {
      result.processed += 1;

      await this.taskRepository.update(task.id, { status: 'processing' });

      try {
        const event = task.calendarEventId
          ? await this.eventRepository.findById(task.calendarEventId)
          : null;

        const delivery = await this.deliveryGateway.deliver({
          scheduledTaskId: task.id,
          calendarEventId: task.calendarEventId,
          title: task.title,
          message: task.message,
          scheduledAt: task.scheduledAt.toISOString(),
          channel: task.channel,
          metadata: task.metadata,
          event: event
            ? {
                id: event.id,
                type: event.type,
                title: event.title,
                startDate: event.startDate,
                startTime: event.startTime,
                endDate: event.endDate,
                endTime: event.endTime,
              }
            : undefined,
        });

        const notification = await this.notificationRepository.create({
          scheduledTaskId: task.id,
          calendarEventId: task.calendarEventId,
          title: task.title,
          message: task.message,
          channel: task.channel,
          status: delivery.delivered ? 'delivered' : 'failed',
          payload: {
            ...task.metadata,
            externalReference: delivery.externalReference,
            deliveryError: delivery.error,
          },
        });

        if (delivery.delivered) {
          await this.taskRepository.update(task.id, {
            status: 'sent',
            sentAt: new Date(),
            lastError: null,
          });
          result.delivered += 1;
        } else {
          await this.taskRepository.update(task.id, {
            status: 'failed',
            lastError: delivery.error ?? 'Error desconocido al entregar notificación',
          });
          result.failed += 1;
        }

        result.notifications.push({
          taskId: task.id,
          notificationId: notification.id,
          status: notification.status,
        });
      } catch (error) {
        const errorMessage = (error as Error).message;

        await this.taskRepository.update(task.id, {
          status: 'failed',
          lastError: errorMessage,
        });

        await this.notificationRepository.create({
          scheduledTaskId: task.id,
          calendarEventId: task.calendarEventId,
          title: task.title,
          message: task.message,
          channel: task.channel,
          status: 'failed',
          payload: { error: errorMessage },
        });

        result.failed += 1;
        result.notifications.push({
          taskId: task.id,
          notificationId: '',
          status: 'failed',
        });

        Logger.danger('Error al procesar tarea programada', {
          taskId: task.id,
          error: errorMessage,
        });
      }
    }

    Logger.success('Procesamiento de tareas programadas finalizado', result);
    return result;
  }
}

export class GetCalendarNotificationsUseCase {
  constructor(private readonly repository: ICalendarNotificationRepository) {}

  async execute(
    filters?: Parameters<ICalendarNotificationRepository['findAll']>[0]
  ) {
    return this.repository.findAll(filters);
  }
}

export class GetCalendarNotificationByIdUseCase {
  constructor(private readonly repository: ICalendarNotificationRepository) {}

  async execute(id: string) {
    IdValidator.validate(id, 'CalendarNotification');
    return this.repository.findById(id);
  }
}
