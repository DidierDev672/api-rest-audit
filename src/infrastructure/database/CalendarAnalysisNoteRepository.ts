import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabase';
import { CalendarAnalysisNote } from '../../domain/entities';
import { ICalendarAnalysisNoteRepository } from '../../domain/repositories/ICalendarAnalysisNoteRepository';
import { Logger } from '../logger/Logger';

export class CalendarAnalysisNoteRepository implements ICalendarAnalysisNoteRepository {
  private readonly table = 'calendar_analysis_notes';

  async create(data: {
    calendarAiAnalysisId: string;
    content: string;
    color: string;
    colorName: string;
    createdAt?: Date;
  }): Promise<CalendarAnalysisNote> {
    const id = uuidv4();
    const now = new Date();
    const createdAt = data.createdAt ?? now;

    Logger.info('Creando nota de análisis de calendario', {
      id,
      calendarAiAnalysisId: data.calendarAiAnalysisId,
    });

    const { data: result, error } = await supabase
      .from(this.table)
      .insert({
        id,
        calendar_ai_analysis_id: data.calendarAiAnalysisId,
        content: data.content,
        color: data.color,
        color_name: data.colorName,
        created_at: createdAt,
        updated_at: now,
      })
      .select()
      .single();

    if (error) {
      Logger.danger('Error al crear nota de análisis de calendario', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Nota de análisis de calendario creada', { id });
    return this.mapToEntity(result);
  }

  async findAll(calendarAiAnalysisId?: string): Promise<CalendarAnalysisNote[]> {
    let query = supabase.from(this.table).select('*');

    if (calendarAiAnalysisId) {
      query = query.eq('calendar_ai_analysis_id', calendarAiAnalysisId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (data || []).map(this.mapToEntity);
  }

  async findByAnalysisId(calendarAiAnalysisId: string): Promise<CalendarAnalysisNote[]> {
    return this.findAll(calendarAiAnalysisId);
  }

  async findById(id: string): Promise<CalendarAnalysisNote | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return null;
    }

    return this.mapToEntity(data);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from(this.table).delete().eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  }

  private mapToEntity(row: Record<string, unknown>): CalendarAnalysisNote {
    return {
      id: row.id as string,
      calendarAiAnalysisId: row.calendar_ai_analysis_id as string,
      content: row.content as string,
      color: row.color as string,
      colorName: row.color_name as string,
      createdAt: new Date(row.created_at as string),
      updatedAt: new Date(row.updated_at as string),
    };
  }
}
