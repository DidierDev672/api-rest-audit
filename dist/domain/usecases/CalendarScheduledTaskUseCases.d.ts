import { CalendarScheduledTask } from '../entities';
import { ICalendarEventRepository } from '../repositories/ICalendarEventRepository';
import { CalendarScheduledTaskFilters, ICalendarScheduledTaskRepository } from '../repositories/ICalendarScheduledTaskRepository';
import { ICalendarNotificationRepository } from '../repositories/ICalendarNotificationRepository';
import { INotificationDeliveryGateway } from '../ports/INotificationDeliveryGateway';
import { CalendarNotificationChannel } from '../enums/CalendarScheduledTaskStatus';
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
    notifications: Array<{
        taskId: string;
        notificationId: string;
        status: string;
    }>;
}
export declare class CreateCalendarScheduledTaskUseCase {
    private readonly taskRepository;
    private readonly eventRepository;
    constructor(taskRepository: ICalendarScheduledTaskRepository, eventRepository: ICalendarEventRepository);
    execute(input: CreateScheduledTaskInput): Promise<CalendarScheduledTask>;
}
export declare class GetCalendarScheduledTasksUseCase {
    private readonly repository;
    constructor(repository: ICalendarScheduledTaskRepository);
    execute(filters?: CalendarScheduledTaskFilters): Promise<CalendarScheduledTask[]>;
}
export declare class GetCalendarScheduledTaskByIdUseCase {
    private readonly repository;
    constructor(repository: ICalendarScheduledTaskRepository);
    execute(id: string): Promise<CalendarScheduledTask | null>;
}
export declare class UpdateCalendarScheduledTaskUseCase {
    private readonly repository;
    constructor(repository: ICalendarScheduledTaskRepository);
    execute(id: string, data: {
        title?: string;
        message?: string;
        scheduledAt?: string;
        status?: 'pending' | 'cancelled';
        channel?: CalendarNotificationChannel;
        metadata?: Record<string, unknown>;
    }): Promise<CalendarScheduledTask>;
}
export declare class DeleteCalendarScheduledTaskUseCase {
    private readonly repository;
    constructor(repository: ICalendarScheduledTaskRepository);
    execute(id: string): Promise<void>;
}
export declare class ProcessDueCalendarScheduledTasksUseCase {
    private readonly taskRepository;
    private readonly eventRepository;
    private readonly notificationRepository;
    private readonly deliveryGateway;
    constructor(taskRepository: ICalendarScheduledTaskRepository, eventRepository: ICalendarEventRepository, notificationRepository: ICalendarNotificationRepository, deliveryGateway: INotificationDeliveryGateway);
    execute(limit?: number): Promise<ProcessDueTasksResult>;
}
export declare class GetCalendarNotificationsUseCase {
    private readonly repository;
    constructor(repository: ICalendarNotificationRepository);
    execute(filters?: Parameters<ICalendarNotificationRepository['findAll']>[0]): Promise<import("../entities").CalendarNotification[]>;
}
export declare class GetCalendarNotificationByIdUseCase {
    private readonly repository;
    constructor(repository: ICalendarNotificationRepository);
    execute(id: string): Promise<import("../entities").CalendarNotification | null>;
}
//# sourceMappingURL=CalendarScheduledTaskUseCases.d.ts.map