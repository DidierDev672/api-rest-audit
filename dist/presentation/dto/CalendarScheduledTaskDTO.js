"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessDueTasksDTO = exports.CalendarNotificationQueryDTO = exports.CalendarScheduledTaskQueryDTO = exports.UpdateCalendarScheduledTaskDTO = exports.CreateCalendarScheduledTaskDTO = exports.ProcessDueTasksSchema = exports.CalendarNotificationQuerySchema = exports.CalendarScheduledTaskQuerySchema = exports.UpdateCalendarScheduledTaskSchema = exports.CreateCalendarScheduledTaskSchema = void 0;
const zod_1 = require("zod");
const CalendarScheduledTaskStatus_1 = require("../../domain/enums/CalendarScheduledTaskStatus");
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
exports.CreateCalendarScheduledTaskSchema = zod_1.z
    .object({
    calendarEventId: zod_1.z
        .string()
        .uuid('calendarEventId debe ser un UUID válido')
        .nullable()
        .optional(),
    title: zod_1.z.string().min(1, 'El título es requerido').optional(),
    message: zod_1.z.string().optional(),
    scheduledAt: zod_1.z
        .string()
        .datetime({ offset: true, message: 'scheduledAt debe ser ISO 8601' })
        .optional(),
    reminderMinutesBefore: zod_1.z
        .number()
        .int()
        .min(0, 'reminderMinutesBefore debe ser >= 0')
        .max(10080, 'reminderMinutesBefore no puede superar 7 días')
        .optional(),
    channel: zod_1.z.enum(CalendarScheduledTaskStatus_1.CALENDAR_NOTIFICATION_CHANNELS).optional(),
    metadata: zod_1.z.record(zod_1.z.unknown()).optional(),
})
    .refine((data) => data.scheduledAt || data.reminderMinutesBefore !== undefined, {
    message: 'Debe indicar scheduledAt o reminderMinutesBefore',
    path: ['scheduledAt'],
});
exports.UpdateCalendarScheduledTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    message: zod_1.z.string().optional(),
    scheduledAt: zod_1.z
        .string()
        .datetime({ offset: true, message: 'scheduledAt debe ser ISO 8601' })
        .optional(),
    status: zod_1.z.enum(['pending', 'cancelled']).optional(),
    channel: zod_1.z.enum(CalendarScheduledTaskStatus_1.CALENDAR_NOTIFICATION_CHANNELS).optional(),
    metadata: zod_1.z.record(zod_1.z.unknown()).optional(),
});
exports.CalendarScheduledTaskQuerySchema = zod_1.z.object({
    calendarEventId: zod_1.z.string().uuid().optional(),
    status: zod_1.z.enum(CalendarScheduledTaskStatus_1.CALENDAR_SCHEDULED_TASK_STATUSES).optional(),
    from: zod_1.z.string().regex(dateRegex, 'from debe ser YYYY-MM-DD').optional(),
    to: zod_1.z.string().regex(dateRegex, 'to debe ser YYYY-MM-DD').optional(),
});
exports.CalendarNotificationQuerySchema = zod_1.z.object({
    calendarEventId: zod_1.z.string().uuid().optional(),
    scheduledTaskId: zod_1.z.string().uuid().optional(),
    from: zod_1.z.string().regex(dateRegex, 'from debe ser YYYY-MM-DD').optional(),
    to: zod_1.z.string().regex(dateRegex, 'to debe ser YYYY-MM-DD').optional(),
});
exports.ProcessDueTasksSchema = zod_1.z.object({
    limit: zod_1.z.coerce.number().int().min(1).max(200).optional(),
});
exports.CreateCalendarScheduledTaskDTO = exports.CreateCalendarScheduledTaskSchema;
exports.UpdateCalendarScheduledTaskDTO = exports.UpdateCalendarScheduledTaskSchema;
exports.CalendarScheduledTaskQueryDTO = exports.CalendarScheduledTaskQuerySchema;
exports.CalendarNotificationQueryDTO = exports.CalendarNotificationQuerySchema;
exports.ProcessDueTasksDTO = exports.ProcessDueTasksSchema;
//# sourceMappingURL=CalendarScheduledTaskDTO.js.map