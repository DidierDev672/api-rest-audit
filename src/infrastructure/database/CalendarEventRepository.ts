import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabase';
import { CalendarEvent } from '../../domain/entities';
import { ICalendarEventRepository } from '../../domain/repositories';

export class CalendarEventRepository implements ICalendarEventRepository {
  private readonly table = 'calendar_events';

  async create(data: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>): Promise<CalendarEvent> {
    const id = uuidv4();
    const now = new Date();

    const { data: result, error } = await supabase
      .from(this.table)
      .insert({
        id,
        type: data.type,
        title: data.title,
        description: data.description,
        start_date: data.startDate,
        end_date: data.endDate,
        start_time: data.startTime,
        end_time: data.endTime,
        research_id: data.researchId,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapToEntity(result);
  }

  async findByDateRange(from: string, to: string): Promise<CalendarEvent[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .gte('start_date', from)
      .lte('start_date', to)
      .order('start_date', { ascending: true });

    if (error) throw new Error(error.message);
    return (data || []).map(this.mapToEntity);
  }

  async findById(id: string): Promise<CalendarEvent | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return this.mapToEntity(data);
  }

  async update(id: string, data: Partial<CalendarEvent>): Promise<CalendarEvent> {
    const now = new Date();
    const updateData: any = { updated_at: now };

    if (data.type !== undefined) updateData.type = data.type;
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.startDate !== undefined) updateData.start_date = data.startDate;
    if (data.endDate !== undefined) updateData.end_date = data.endDate;
    if (data.startTime !== undefined) updateData.start_time = data.startTime;
    if (data.endTime !== undefined) updateData.end_time = data.endTime;
    if (data.researchId !== undefined) updateData.research_id = data.researchId;

    const { data: result, error } = await supabase
      .from(this.table)
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapToEntity(result);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }

  private mapToEntity(data: any): CalendarEvent {
    return {
      id: data.id,
      type: data.type,
      title: data.title,
      description: data.description || '',
      startDate: data.start_date,
      endDate: data.end_date,
      startTime: data.start_time,
      endTime: data.end_time,
      researchId: data.research_id || null,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}
