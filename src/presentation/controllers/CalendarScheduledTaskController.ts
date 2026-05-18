import { Request, Response } from 'express';
import { ZodError } from 'zod';
import {
  CreateCalendarScheduledTaskUseCase,
  GetCalendarScheduledTasksUseCase,
  GetCalendarScheduledTaskByIdUseCase,
  UpdateCalendarScheduledTaskUseCase,
  DeleteCalendarScheduledTaskUseCase,
  ProcessDueCalendarScheduledTasksUseCase,
  GetCalendarNotificationsUseCase,
  GetCalendarNotificationByIdUseCase,
} from '../../domain/usecases/CalendarScheduledTaskUseCases';
import {
  CalendarEventRepository,
  CalendarScheduledTaskRepository,
  CalendarNotificationRepository,
} from '../../infrastructure/database';
import { CalendarNotificationGateway } from '../../infrastructure/clients/CalendarNotificationGateway';
import {
  CreateCalendarScheduledTaskDTO,
  UpdateCalendarScheduledTaskDTO,
  CalendarScheduledTaskQueryDTO,
  CalendarNotificationQueryDTO,
  ProcessDueTasksDTO,
} from '../dto/CalendarScheduledTaskDTO';
import { Logger } from '../../infrastructure/logger/Logger';

const taskRepository = new CalendarScheduledTaskRepository();
const eventRepository = new CalendarEventRepository();
const notificationRepository = new CalendarNotificationRepository();
const deliveryGateway = CalendarNotificationGateway.create();

export class CalendarScheduledTaskController {
  static async create(req: Request, res: Response) {
    try {
      const data = CreateCalendarScheduledTaskDTO.parse({
        ...req.body,
        calendarEventId:
          req.body?.calendarEventId ?? req.params.eventId ?? undefined,
      });
      const useCase = new CreateCalendarScheduledTaskUseCase(
        taskRepository,
        eventRepository
      );
      const result = await useCase.execute(data);
      res.status(201).json(result);
    } catch (error) {
      CalendarScheduledTaskController.handleError(res, error, 'create');
    }
  }

  static async findAll(req: Request, res: Response) {
    try {
      const query = CalendarScheduledTaskQueryDTO.parse({
        ...req.query,
        calendarEventId: req.params.eventId ?? req.query.calendarEventId,
      });
      const useCase = new GetCalendarScheduledTasksUseCase(taskRepository);
      const result = await useCase.execute(query);
      res.json({ tasks: result, meta: { count: result.length } });
    } catch (error) {
      CalendarScheduledTaskController.handleError(res, error, 'findAll');
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const useCase = new GetCalendarScheduledTaskByIdUseCase(taskRepository);
      const result = await useCase.execute(req.params.id);

      if (!result) {
        res.status(404).json({ error: 'Tarea programada no encontrada' });
        return;
      }

      res.json(result);
    } catch (error) {
      CalendarScheduledTaskController.handleError(res, error, 'findById');
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const data = UpdateCalendarScheduledTaskDTO.parse(req.body);
      const useCase = new UpdateCalendarScheduledTaskUseCase(taskRepository);
      const result = await useCase.execute(req.params.id, data);
      res.json(result);
    } catch (error) {
      CalendarScheduledTaskController.handleError(res, error, 'update');
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const useCase = new DeleteCalendarScheduledTaskUseCase(taskRepository);
      await useCase.execute(req.params.id);
      res.status(204).send();
    } catch (error) {
      CalendarScheduledTaskController.handleError(res, error, 'delete');
    }
  }

  static async processDue(req: Request, res: Response) {
    try {
      const { limit } = ProcessDueTasksDTO.parse(req.body ?? {});
      const useCase = new ProcessDueCalendarScheduledTasksUseCase(
        taskRepository,
        eventRepository,
        notificationRepository,
        deliveryGateway
      );
      const result = await useCase.execute(limit);
      res.json({ success: true, data: result });
    } catch (error) {
      CalendarScheduledTaskController.handleError(res, error, 'processDue');
    }
  }

  static async findAllNotifications(req: Request, res: Response) {
    try {
      const query = CalendarNotificationQueryDTO.parse(req.query);
      const useCase = new GetCalendarNotificationsUseCase(notificationRepository);
      const notifications = await useCase.execute(query);
      res.json({ notifications, meta: { count: notifications.length } });
    } catch (error) {
      CalendarScheduledTaskController.handleError(res, error, 'findAllNotifications');
    }
  }

  static async findNotificationById(req: Request, res: Response) {
    try {
      const useCase = new GetCalendarNotificationByIdUseCase(notificationRepository);
      const result = await useCase.execute(req.params.id);

      if (!result) {
        res.status(404).json({ error: 'Notificación no encontrada' });
        return;
      }

      res.json(result);
    } catch (error) {
      CalendarScheduledTaskController.handleError(res, error, 'findNotificationById');
    }
  }

  private static handleError(res: Response, error: unknown, action: string): void {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }

    const errorMessage = (error as Error).message;

    if (
      errorMessage.includes('no encontrad') ||
      errorMessage.includes('no es válido') ||
      errorMessage.includes('ID es requerido') ||
      errorMessage.includes('Debe indicar') ||
      errorMessage.includes('No se puede modificar')
    ) {
      res.status(400).json({ error: errorMessage });
      return;
    }

    Logger.danger(`Error en CalendarScheduledTaskController.${action}`, {
      error: errorMessage,
    });
    res.status(500).json({ error: errorMessage });
  }
}
