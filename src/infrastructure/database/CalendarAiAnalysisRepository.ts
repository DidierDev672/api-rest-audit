import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabase';
import { CalendarAiAnalysis } from '../../domain/entities';
import { ICalendarAiAnalysisRepository } from '../../domain/repositories';

export class CalendarAiAnalysisRepository implements ICalendarAiAnalysisRepository {
  private readonly table = 'calendar_ai_analyses';

  async create(data: Omit<CalendarAiAnalysis, 'id' | 'createdAt' | 'updatedAt'>): Promise<CalendarAiAnalysis> {
    const id = uuidv4();
    const now = new Date();

    const { data: result, error } = await supabase
      .from(this.table)
      .insert({
        id,
        calendar_event_id: data.calendarEventId,
        research_id: data.researchId,
        event_title: data.eventTitle,
        event_type: data.eventType,
        event_date: data.eventDate,
        research_name: data.researchName,
        content: data.content,
        model: data.model,
        generated_at: data.generatedAt,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapToEntity(result);
  }

  async findAll(filters?: {
    calendarEventId?: string;
    researchId?: string;
    from?: string;
    to?: string;
  }): Promise<CalendarAiAnalysis[]> {
    let query = supabase
      .from(this.table)
      .select('*');

    if (filters?.calendarEventId) {
      query = query.eq('calendar_event_id', filters.calendarEventId);
    }
    if (filters?.researchId) {
      query = query.eq('research_id', filters.researchId);
    }
    if (filters?.from) {
      query = query.gte('event_date', filters.from);
    }
    if (filters?.to) {
      query = query.lte('event_date', filters.to);
    }

    const { data, error } = await query
      .order('generated_at', { ascending: false });

    if (error) throw new Error(error.message);
    return (data || []).map(this.mapToEntity);
  }

  async findById(id: string): Promise<CalendarAiAnalysis | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return this.mapToEntity(data);
  }

  async update(
    id: string,
    data: {
      eventTitle?: string;
      researchName?: string | null;
      content?: string;
      eventDate?: string;
    },
  ): Promise<CalendarAiAnalysis> {
    const patch: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (data.eventTitle !== undefined) patch.event_title = data.eventTitle;
    if (data.researchName !== undefined) patch.research_name = data.researchName;
    if (data.content !== undefined) patch.content = data.content;
    if (data.eventDate !== undefined) patch.event_date = data.eventDate;

    const { data: result, error } = await supabase
      .from(this.table)
      .update(patch)
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

  async getEventAnalysisSummary(eventIds: string[]): Promise<Array<{
    calendarEventId: string;
    count: number;
    lastGeneratedAt: string | null;
  }>> {
    if (eventIds.length === 0) return [];

    const { data, error } = await supabase
      .from(this.table)
      .select('calendar_event_id, generated_at')
      .in('calendar_event_id', eventIds)
      .order('generated_at', { ascending: false });

    if (error) throw new Error(error.message);

    const summaryMap = new Map<string, { count: number; lastGeneratedAt: string | null }>();
    for (const row of data || []) {
      const existing = summaryMap.get(row.calendar_event_id);
      if (existing) {
        existing.count++;
      } else {
        summaryMap.set(row.calendar_event_id, {
          count: 1,
          lastGeneratedAt: row.generated_at,
        });
      }
    }

    return Array.from(summaryMap.entries()).map(([calendarEventId, info]) => ({
      calendarEventId,
      count: info.count,
      lastGeneratedAt: info.lastGeneratedAt,
    }));
  }

  private mapToEntity(data: any): CalendarAiAnalysis {
    return {
      id: data.id,
      calendarEventId: data.calendar_event_id,
      researchId: data.research_id || null,
      eventTitle: data.event_title,
      eventType: data.event_type,
      eventDate: data.event_date,
      researchName: data.research_name || null,
      content: data.content,
      model: data.model || null,
      generatedAt: new Date(data.generated_at),
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}
