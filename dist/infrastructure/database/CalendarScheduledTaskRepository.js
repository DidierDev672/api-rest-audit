"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarScheduledTaskRepository = void 0;
const uuid_1 = require("uuid");
const supabase_1 = require("./supabase");
class CalendarScheduledTaskRepository {
    constructor() {
        this.table = 'calendar_scheduled_tasks';
    }
    async create(data) {
        const id = (0, uuid_1.v4)();
        const now = new Date();
        const { data: result, error } = await supabase_1.supabase
            .from(this.table)
            .insert({
            id,
            calendar_event_id: data.calendarEventId,
            title: data.title,
            message: data.message,
            scheduled_at: data.scheduledAt.toISOString(),
            status: data.status,
            channel: data.channel,
            reminder_minutes_before: data.reminderMinutesBefore,
            metadata: data.metadata ?? {},
            sent_at: null,
            last_error: null,
            created_at: now,
            updated_at: now,
        })
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return this.mapToEntity(result);
    }
    async findAll(filters = {}) {
        let query = supabase_1.supabase.from(this.table).select('*').order('scheduled_at', {
            ascending: true,
        });
        if (filters.calendarEventId) {
            query = query.eq('calendar_event_id', filters.calendarEventId);
        }
        if (filters.status) {
            query = query.eq('status', filters.status);
        }
        if (filters.from) {
            query = query.gte('scheduled_at', `${filters.from}T00:00:00.000Z`);
        }
        if (filters.to) {
            query = query.lte('scheduled_at', `${filters.to}T23:59:59.999Z`);
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
    async findDuePending(limit = 50) {
        const now = new Date().toISOString();
        const { data, error } = await supabase_1.supabase
            .from(this.table)
            .select('*')
            .eq('status', 'pending')
            .lte('scheduled_at', now)
            .order('scheduled_at', { ascending: true })
            .limit(limit);
        if (error)
            throw new Error(error.message);
        return (data || []).map((row) => this.mapToEntity(row));
    }
    async update(id, data) {
        const updateData = {
            updated_at: new Date().toISOString(),
        };
        if (data.title !== undefined)
            updateData.title = data.title;
        if (data.message !== undefined)
            updateData.message = data.message;
        if (data.scheduledAt !== undefined) {
            updateData.scheduled_at = data.scheduledAt.toISOString();
        }
        if (data.status !== undefined)
            updateData.status = data.status;
        if (data.channel !== undefined)
            updateData.channel = data.channel;
        if (data.metadata !== undefined)
            updateData.metadata = data.metadata;
        if (data.sentAt !== undefined) {
            updateData.sent_at = data.sentAt ? data.sentAt.toISOString() : null;
        }
        if (data.lastError !== undefined)
            updateData.last_error = data.lastError;
        const { data: result, error } = await supabase_1.supabase
            .from(this.table)
            .update(updateData)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return this.mapToEntity(result);
    }
    async delete(id) {
        const { error } = await supabase_1.supabase.from(this.table).delete().eq('id', id);
        if (error)
            throw new Error(error.message);
    }
    async cancelByCalendarEventId(calendarEventId) {
        const { error } = await supabase_1.supabase
            .from(this.table)
            .update({
            status: 'cancelled',
            updated_at: new Date().toISOString(),
        })
            .eq('calendar_event_id', calendarEventId)
            .eq('status', 'pending');
        if (error)
            throw new Error(error.message);
    }
    mapToEntity(data) {
        return {
            id: data.id,
            calendarEventId: data.calendar_event_id || null,
            title: data.title,
            message: data.message || '',
            scheduledAt: new Date(data.scheduled_at),
            status: data.status,
            channel: data.channel,
            reminderMinutesBefore: data.reminder_minutes_before !== null &&
                data.reminder_minutes_before !== undefined
                ? Number(data.reminder_minutes_before)
                : null,
            metadata: data.metadata || {},
            sentAt: data.sent_at ? new Date(data.sent_at) : null,
            lastError: data.last_error || null,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
        };
    }
}
exports.CalendarScheduledTaskRepository = CalendarScheduledTaskRepository;
//# sourceMappingURL=CalendarScheduledTaskRepository.js.map