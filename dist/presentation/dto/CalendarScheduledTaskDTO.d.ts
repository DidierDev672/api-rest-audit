import { z } from 'zod';
export declare const CreateCalendarScheduledTaskSchema: z.ZodEffects<z.ZodObject<{
    calendarEventId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    title: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
    scheduledAt: z.ZodOptional<z.ZodString>;
    reminderMinutesBefore: z.ZodOptional<z.ZodNumber>;
    channel: z.ZodOptional<z.ZodEnum<["in_app", "webhook", "n8n"]>>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    calendarEventId?: string | null | undefined;
    title?: string | undefined;
    message?: string | undefined;
    scheduledAt?: string | undefined;
    reminderMinutesBefore?: number | undefined;
    channel?: "in_app" | "webhook" | "n8n" | undefined;
    metadata?: Record<string, unknown> | undefined;
}, {
    calendarEventId?: string | null | undefined;
    title?: string | undefined;
    message?: string | undefined;
    scheduledAt?: string | undefined;
    reminderMinutesBefore?: number | undefined;
    channel?: "in_app" | "webhook" | "n8n" | undefined;
    metadata?: Record<string, unknown> | undefined;
}>, {
    calendarEventId?: string | null | undefined;
    title?: string | undefined;
    message?: string | undefined;
    scheduledAt?: string | undefined;
    reminderMinutesBefore?: number | undefined;
    channel?: "in_app" | "webhook" | "n8n" | undefined;
    metadata?: Record<string, unknown> | undefined;
}, {
    calendarEventId?: string | null | undefined;
    title?: string | undefined;
    message?: string | undefined;
    scheduledAt?: string | undefined;
    reminderMinutesBefore?: number | undefined;
    channel?: "in_app" | "webhook" | "n8n" | undefined;
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const UpdateCalendarScheduledTaskSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
    scheduledAt: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["pending", "cancelled"]>>;
    channel: z.ZodOptional<z.ZodEnum<["in_app", "webhook", "n8n"]>>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    message?: string | undefined;
    scheduledAt?: string | undefined;
    status?: "pending" | "cancelled" | undefined;
    channel?: "in_app" | "webhook" | "n8n" | undefined;
    metadata?: Record<string, unknown> | undefined;
}, {
    title?: string | undefined;
    message?: string | undefined;
    scheduledAt?: string | undefined;
    status?: "pending" | "cancelled" | undefined;
    channel?: "in_app" | "webhook" | "n8n" | undefined;
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const CalendarScheduledTaskQuerySchema: z.ZodObject<{
    calendarEventId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["pending", "processing", "sent", "failed", "cancelled"]>>;
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    calendarEventId?: string | undefined;
    status?: "pending" | "processing" | "sent" | "failed" | "cancelled" | undefined;
    from?: string | undefined;
    to?: string | undefined;
}, {
    calendarEventId?: string | undefined;
    status?: "pending" | "processing" | "sent" | "failed" | "cancelled" | undefined;
    from?: string | undefined;
    to?: string | undefined;
}>;
export declare const CalendarNotificationQuerySchema: z.ZodObject<{
    calendarEventId: z.ZodOptional<z.ZodString>;
    scheduledTaskId: z.ZodOptional<z.ZodString>;
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    calendarEventId?: string | undefined;
    scheduledTaskId?: string | undefined;
    from?: string | undefined;
    to?: string | undefined;
}, {
    calendarEventId?: string | undefined;
    scheduledTaskId?: string | undefined;
    from?: string | undefined;
    to?: string | undefined;
}>;
export declare const ProcessDueTasksSchema: z.ZodObject<{
    limit: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit?: number | undefined;
}, {
    limit?: number | undefined;
}>;
export declare const CreateCalendarScheduledTaskDTO: z.ZodEffects<z.ZodObject<{
    calendarEventId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    title: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
    scheduledAt: z.ZodOptional<z.ZodString>;
    reminderMinutesBefore: z.ZodOptional<z.ZodNumber>;
    channel: z.ZodOptional<z.ZodEnum<["in_app", "webhook", "n8n"]>>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    calendarEventId?: string | null | undefined;
    title?: string | undefined;
    message?: string | undefined;
    scheduledAt?: string | undefined;
    reminderMinutesBefore?: number | undefined;
    channel?: "in_app" | "webhook" | "n8n" | undefined;
    metadata?: Record<string, unknown> | undefined;
}, {
    calendarEventId?: string | null | undefined;
    title?: string | undefined;
    message?: string | undefined;
    scheduledAt?: string | undefined;
    reminderMinutesBefore?: number | undefined;
    channel?: "in_app" | "webhook" | "n8n" | undefined;
    metadata?: Record<string, unknown> | undefined;
}>, {
    calendarEventId?: string | null | undefined;
    title?: string | undefined;
    message?: string | undefined;
    scheduledAt?: string | undefined;
    reminderMinutesBefore?: number | undefined;
    channel?: "in_app" | "webhook" | "n8n" | undefined;
    metadata?: Record<string, unknown> | undefined;
}, {
    calendarEventId?: string | null | undefined;
    title?: string | undefined;
    message?: string | undefined;
    scheduledAt?: string | undefined;
    reminderMinutesBefore?: number | undefined;
    channel?: "in_app" | "webhook" | "n8n" | undefined;
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const UpdateCalendarScheduledTaskDTO: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
    scheduledAt: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["pending", "cancelled"]>>;
    channel: z.ZodOptional<z.ZodEnum<["in_app", "webhook", "n8n"]>>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    message?: string | undefined;
    scheduledAt?: string | undefined;
    status?: "pending" | "cancelled" | undefined;
    channel?: "in_app" | "webhook" | "n8n" | undefined;
    metadata?: Record<string, unknown> | undefined;
}, {
    title?: string | undefined;
    message?: string | undefined;
    scheduledAt?: string | undefined;
    status?: "pending" | "cancelled" | undefined;
    channel?: "in_app" | "webhook" | "n8n" | undefined;
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const CalendarScheduledTaskQueryDTO: z.ZodObject<{
    calendarEventId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["pending", "processing", "sent", "failed", "cancelled"]>>;
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    calendarEventId?: string | undefined;
    status?: "pending" | "processing" | "sent" | "failed" | "cancelled" | undefined;
    from?: string | undefined;
    to?: string | undefined;
}, {
    calendarEventId?: string | undefined;
    status?: "pending" | "processing" | "sent" | "failed" | "cancelled" | undefined;
    from?: string | undefined;
    to?: string | undefined;
}>;
export declare const CalendarNotificationQueryDTO: z.ZodObject<{
    calendarEventId: z.ZodOptional<z.ZodString>;
    scheduledTaskId: z.ZodOptional<z.ZodString>;
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    calendarEventId?: string | undefined;
    scheduledTaskId?: string | undefined;
    from?: string | undefined;
    to?: string | undefined;
}, {
    calendarEventId?: string | undefined;
    scheduledTaskId?: string | undefined;
    from?: string | undefined;
    to?: string | undefined;
}>;
export declare const ProcessDueTasksDTO: z.ZodObject<{
    limit: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit?: number | undefined;
}, {
    limit?: number | undefined;
}>;
//# sourceMappingURL=CalendarScheduledTaskDTO.d.ts.map