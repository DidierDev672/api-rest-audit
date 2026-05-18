"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarScheduledTaskController = void 0;
const zod_1 = require("zod");
const CalendarScheduledTaskUseCases_1 = require("../../domain/usecases/CalendarScheduledTaskUseCases");
const database_1 = require("../../infrastructure/database");
const CalendarNotificationGateway_1 = require("../../infrastructure/clients/CalendarNotificationGateway");
const CalendarScheduledTaskDTO_1 = require("../dto/CalendarScheduledTaskDTO");
const Logger_1 = require("../../infrastructure/logger/Logger");
const taskRepository = new database_1.CalendarScheduledTaskRepository();
const eventRepository = new database_1.CalendarEventRepository();
const notificationRepository = new database_1.CalendarNotificationRepository();
const deliveryGateway = CalendarNotificationGateway_1.CalendarNotificationGateway.create();
class CalendarScheduledTaskController {
    static async create(req, res) {
        try {
            const data = CalendarScheduledTaskDTO_1.CreateCalendarScheduledTaskDTO.parse({
                ...req.body,
                calendarEventId: req.body?.calendarEventId ?? req.params.eventId ?? undefined,
            });
            const useCase = new CalendarScheduledTaskUseCases_1.CreateCalendarScheduledTaskUseCase(taskRepository, eventRepository);
            const result = await useCase.execute(data);
            res.status(201).json(result);
        }
        catch (error) {
            CalendarScheduledTaskController.handleError(res, error, 'create');
        }
    }
    static async findAll(req, res) {
        try {
            const query = CalendarScheduledTaskDTO_1.CalendarScheduledTaskQueryDTO.parse({
                ...req.query,
                calendarEventId: req.params.eventId ?? req.query.calendarEventId,
            });
            const useCase = new CalendarScheduledTaskUseCases_1.GetCalendarScheduledTasksUseCase(taskRepository);
            const result = await useCase.execute(query);
            res.json({ tasks: result, meta: { count: result.length } });
        }
        catch (error) {
            CalendarScheduledTaskController.handleError(res, error, 'findAll');
        }
    }
    static async findById(req, res) {
        try {
            const useCase = new CalendarScheduledTaskUseCases_1.GetCalendarScheduledTaskByIdUseCase(taskRepository);
            const result = await useCase.execute(req.params.id);
            if (!result) {
                res.status(404).json({ error: 'Tarea programada no encontrada' });
                return;
            }
            res.json(result);
        }
        catch (error) {
            CalendarScheduledTaskController.handleError(res, error, 'findById');
        }
    }
    static async update(req, res) {
        try {
            const data = CalendarScheduledTaskDTO_1.UpdateCalendarScheduledTaskDTO.parse(req.body);
            const useCase = new CalendarScheduledTaskUseCases_1.UpdateCalendarScheduledTaskUseCase(taskRepository);
            const result = await useCase.execute(req.params.id, data);
            res.json(result);
        }
        catch (error) {
            CalendarScheduledTaskController.handleError(res, error, 'update');
        }
    }
    static async delete(req, res) {
        try {
            const useCase = new CalendarScheduledTaskUseCases_1.DeleteCalendarScheduledTaskUseCase(taskRepository);
            await useCase.execute(req.params.id);
            res.status(204).send();
        }
        catch (error) {
            CalendarScheduledTaskController.handleError(res, error, 'delete');
        }
    }
    static async processDue(req, res) {
        try {
            const { limit } = CalendarScheduledTaskDTO_1.ProcessDueTasksDTO.parse(req.body ?? {});
            const useCase = new CalendarScheduledTaskUseCases_1.ProcessDueCalendarScheduledTasksUseCase(taskRepository, eventRepository, notificationRepository, deliveryGateway);
            const result = await useCase.execute(limit);
            res.json({ success: true, data: result });
        }
        catch (error) {
            CalendarScheduledTaskController.handleError(res, error, 'processDue');
        }
    }
    static async findAllNotifications(req, res) {
        try {
            const query = CalendarScheduledTaskDTO_1.CalendarNotificationQueryDTO.parse(req.query);
            const useCase = new CalendarScheduledTaskUseCases_1.GetCalendarNotificationsUseCase(notificationRepository);
            const notifications = await useCase.execute(query);
            res.json({ notifications, meta: { count: notifications.length } });
        }
        catch (error) {
            CalendarScheduledTaskController.handleError(res, error, 'findAllNotifications');
        }
    }
    static async findNotificationById(req, res) {
        try {
            const useCase = new CalendarScheduledTaskUseCases_1.GetCalendarNotificationByIdUseCase(notificationRepository);
            const result = await useCase.execute(req.params.id);
            if (!result) {
                res.status(404).json({ error: 'Notificación no encontrada' });
                return;
            }
            res.json(result);
        }
        catch (error) {
            CalendarScheduledTaskController.handleError(res, error, 'findNotificationById');
        }
    }
    static handleError(res, error, action) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({ error: error.errors });
            return;
        }
        const errorMessage = error.message;
        if (errorMessage.includes('no encontrad') ||
            errorMessage.includes('no es válido') ||
            errorMessage.includes('ID es requerido') ||
            errorMessage.includes('Debe indicar') ||
            errorMessage.includes('No se puede modificar')) {
            res.status(400).json({ error: errorMessage });
            return;
        }
        Logger_1.Logger.danger(`Error en CalendarScheduledTaskController.${action}`, {
            error: errorMessage,
        });
        res.status(500).json({ error: errorMessage });
    }
}
exports.CalendarScheduledTaskController = CalendarScheduledTaskController;
//# sourceMappingURL=CalendarScheduledTaskController.js.map