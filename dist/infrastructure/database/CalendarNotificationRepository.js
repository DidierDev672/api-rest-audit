"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarNotificationRepository = void 0;
const uuid_1 = require("uuid");
const supabase_1 = require("./supabase");
class CalendarNotificationRepository {
    constructor() {
        this.table = 'calendar_notifications';
    }
    async create(data) {
        const id = (0, uuid_1.v4)();
        const now = new Date();
        const deliveredAt = data.deliveredAt ?? now;
        const { data: result, error } = await supabase_1.supabase
            .from(this.table)
            .insert({
            id,
            scheduled_task_id: data.scheduledTaskId ?? null,
            calendar_event_id: data.calendarEventId ?? null,
            title: data.title,
            message: data.message,
            channel: data.channel,
            status: data.status,
            payload: data.payload ?? {},
            delivered_at: deliveredAt.toISOString(),
            created_at: now,
        })
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return this.mapToEntity(result);
    }
    async findAll(filters = {}) {
        let query = supabase_1.supabase
            .from(this.table)
            .select('*')
            .order('delivered_at', { ascending: false });
        if (filters.calendarEventId) {
            query = query.eq('calendar_event_id', filters.calendarEventId);
        }
        if (filters.scheduledTaskId) {
            query = query.eq('scheduled_task_id', filters.scheduledTaskId);
        }
        if (filters.from) {
            query = query.gte('delivered_at', `${filters.from}T00:00:00.000Z`);
        }
        if (filters.to) {
            query = query.lte('delivered_at', `${filters.to}T23:59:59.999Z`);
        }
        const { data, error } = await query;
        if (error)
            throw new Error(error.message);
        return (data || []).map((row) => this.mapToEntity(row));
    }
    async findById(id) {
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            return null;
        return this.mapToEntity(data);
    }
    mapToEntity(data) {
        return {
            id: data.id,
            scheduledTaskId: data.scheduled_task_id || null,
            calendarEventId: data.calendar_event_id || null,
            title: data.title,
            message: data.message || '',
            channel: data.channel,
            status: data.status,
            payload: data.payload || {},
            deliveredAt: new Date(data.delivered_at),
            createdAt: new Date(data.created_at),
        };
    }
}
exports.CalendarNotificationRepository = CalendarNotificationRepository;
//# sourceMappingURL=CalendarNotificationRepository.js.map