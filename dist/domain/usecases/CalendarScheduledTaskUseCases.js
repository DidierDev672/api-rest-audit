"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCalendarNotificationByIdUseCase = exports.GetCalendarNotificationsUseCase = exports.ProcessDueCalendarScheduledTasksUseCase = exports.DeleteCalendarScheduledTaskUseCase = exports.UpdateCalendarScheduledTaskUseCase = exports.GetCalendarScheduledTaskByIdUseCase = exports.GetCalendarScheduledTasksUseCase = exports.CreateCalendarScheduledTaskUseCase = void 0;
const CalendarScheduleCalculator_1 = require("../services/CalendarScheduleCalculator");
const Logger_1 = require("../../infrastructure/logger/Logger");
const IdValidator_1 = require("../../infrastructure/validators/IdValidator");
class CreateCalendarScheduledTaskUseCase {
    constructor(taskRepository, eventRepository) {
        this.taskRepository = taskRepository;
        this.eventRepository = eventRepository;
    }
    async execute(input) {
        let scheduledAt;
        let calendarEvent = null;
        if (input.calendarEventId) {
            IdValidator_1.IdValidator.validate(input.calendarEventId, 'CalendarEvent');
            calendarEvent = await this.eventRepository.findById(input.calendarEventId);
            if (!calendarEvent) {
                throw new Error('Evento de calendario no encontrado');
            }
        }
        if (input.reminderMinutesBefore !== undefined) {
            if (!calendarEvent) {
                throw new Error('calendarEventId es requerido cuando se usa reminderMinutesBefore');
            }
            scheduledAt = CalendarScheduleCalculator_1.CalendarScheduleCalculator.reminderAt(calendarEvent, input.reminderMinutesBefore);
        }
        else if (input.scheduledAt) {
            scheduledAt = new Date(input.scheduledAt);
            if (Number.isNaN(scheduledAt.getTime())) {
                throw new Error('scheduledAt no es una fecha válida');
            }
        }
        else {
            throw new Error('Debe indicar scheduledAt o reminderMinutesBefore');
        }
        const title = input.title.trim() ||
            (calendarEvent ? `Recordatorio: ${calendarEvent.title}` : 'Tarea programada');
        const message = input.message?.trim() ||
            (calendarEvent
                ? `Recordatorio del evento "${calendarEvent.title}" programado para ${calendarEvent.startDate} a las ${calendarEvent.startTime}`
                : '');
        Logger_1.Logger.info('Creando tarea programada de calendario', {
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
        Logger_1.Logger.success('Tarea programada creada', { id: task.id });
        return task;
    }
}
exports.CreateCalendarScheduledTaskUseCase = CreateCalendarScheduledTaskUseCase;
class GetCalendarScheduledTasksUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(filters) {
        Logger_1.Logger.info('Obteniendo tareas programadas', { filters });
        const tasks = await this.repository.findAll(filters);
        Logger_1.Logger.success('Tareas programadas obtenidas', { count: tasks.length });
        return tasks;
    }
}
exports.GetCalendarScheduledTasksUseCase = GetCalendarScheduledTasksUseCase;
class GetCalendarScheduledTaskByIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        IdValidator_1.IdValidator.validate(id, 'CalendarScheduledTask');
        return this.repository.findById(id);
    }
}
exports.GetCalendarScheduledTaskByIdUseCase = GetCalendarScheduledTaskByIdUseCase;
class UpdateCalendarScheduledTaskUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id, data) {
        IdValidator_1.IdValidator.validate(id, 'CalendarScheduledTask');
        const existing = await this.repository.findById(id);
        if (!existing) {
            throw new Error('Tarea programada no encontrada');
        }
        if (existing.status === 'sent') {
            throw new Error('No se puede modificar una tarea ya enviada');
        }
        const updateData = {};
        if (data.title !== undefined)
            updateData.title = data.title;
        if (data.message !== undefined)
            updateData.message = data.message;
        if (data.scheduledAt !== undefined) {
            const scheduledAt = new Date(data.scheduledAt);
            if (Number.isNaN(scheduledAt.getTime())) {
                throw new Error('scheduledAt no es una fecha válida');
            }
            updateData.scheduledAt = scheduledAt;
        }
        if (data.status !== undefined)
            updateData.status = data.status;
        if (data.channel !== undefined)
            updateData.channel = data.channel;
        if (data.metadata !== undefined)
            updateData.metadata = data.metadata;
        Logger_1.Logger.info('Actualizando tarea programada', { id });
        const updated = await this.repository.update(id, updateData);
        Logger_1.Logger.success('Tarea programada actualizada', { id });
        return updated;
    }
}
exports.UpdateCalendarScheduledTaskUseCase = UpdateCalendarScheduledTaskUseCase;
class DeleteCalendarScheduledTaskUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        IdValidator_1.IdValidator.validate(id, 'CalendarScheduledTask');
        const existing = await this.repository.findById(id);
        if (!existing) {
            throw new Error('Tarea programada no encontrada');
        }
        await this.repository.delete(id);
        Logger_1.Logger.success('Tarea programada eliminada', { id });
    }
}
exports.DeleteCalendarScheduledTaskUseCase = DeleteCalendarScheduledTaskUseCase;
class ProcessDueCalendarScheduledTasksUseCase {
    constructor(taskRepository, eventRepository, notificationRepository, deliveryGateway) {
        this.taskRepository = taskRepository;
        this.eventRepository = eventRepository;
        this.notificationRepository = notificationRepository;
        this.deliveryGateway = deliveryGateway;
    }
    async execute(limit = 50) {
        const dueTasks = await this.taskRepository.findDuePending(limit);
        Logger_1.Logger.info('Procesando tareas programadas vencidas', { count: dueTasks.length });
        const result = {
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
                }
                else {
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
            }
            catch (error) {
                const errorMessage = error.message;
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
                Logger_1.Logger.danger('Error al procesar tarea programada', {
                    taskId: task.id,
                    error: errorMessage,
                });
            }
        }
        Logger_1.Logger.success('Procesamiento de tareas programadas finalizado', result);
        return result;
    }
}
exports.ProcessDueCalendarScheduledTasksUseCase = ProcessDueCalendarScheduledTasksUseCase;
class GetCalendarNotificationsUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(filters) {
        return this.repository.findAll(filters);
    }
}
exports.GetCalendarNotificationsUseCase = GetCalendarNotificationsUseCase;
class GetCalendarNotificationByIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id) {
        IdValidator_1.IdValidator.validate(id, 'CalendarNotification');
        return this.repository.findById(id);
    }
}
exports.GetCalendarNotificationByIdUseCase = GetCalendarNotificationByIdUseCase;
//# sourceMappingURL=CalendarScheduledTaskUseCases.js.map