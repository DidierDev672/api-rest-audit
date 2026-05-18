import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabase';
import { CalendarNotification } from '../../domain/entities';
import {
  CalendarNotificationFilters,
  ICalendarNotificationRepository,
} from '../../domain/repositories/ICalendarNotificationRepository';
import { CalendarNotificationChannel } from '../../domain/enums/CalendarScheduledTaskStatus';

export class CalendarNotificationRepository implements ICalendarNotificationRepository {
  private readonly table = 'calendar_notifications';

  async create(data: {
    scheduledTaskId?: string | null;
    calendarEventId?: string | null;
    title: string;
    message: string;
    channel: CalendarNotificationChannel;
    status: 'delivered' | 'failed';
    payload?: Record<string, unknown>;
    deliveredAt?: Date;
  }): Promise<CalendarNotification> {
    const id = uuidv4();
    const now = new Date();
    const deliveredAt = data.deliveredAt ?? now;

    const { data: result, error } = await supabase
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

    if (error) throw new Error(error.message);
    return this.mapToEntity(result);
  }

  async findAll(
    filters: CalendarNotificationFilters = {}
  ): Promise<CalendarNotification[]> {
    let query = supabase
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

    if (error) throw new Error(error.message);
    return (data || []).map((row) => this.mapToEntity(row));
  }

  async findById(id: string): Promise<CalendarNotification | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return this.mapToEntity(data);
  }

  private mapToEntity(data: Record<string, unknown>): CalendarNotification {
    return {
      id: data.id as string,
      scheduledTaskId: (data.scheduled_task_id as string) || null,
      calendarEventId: (data.calendar_event_id as string) || null,
      title: data.title as string,
      message: (data.message as string) || '',
      channel: data.channel as CalendarNotification['channel'],
      status: data.status as CalendarNotification['status'],
      payload: (data.payload as Record<string, unknown>) || {},
      deliveredAt: new Date(data.delivered_at as string),
      createdAt: new Date(data.created_at as string),
    };
  }
}
