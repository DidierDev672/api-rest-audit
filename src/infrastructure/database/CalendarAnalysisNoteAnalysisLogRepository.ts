import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabase';
import { CalendarAnalysisNoteAnalysisLog } from '../../domain/entities';
import { ICalendarAnalysisNoteAnalysisLogRepository } from '../../domain/repositories/ICalendarAnalysisNoteAnalysisLogRepository';
import { Logger } from '../logger/Logger';

export class CalendarAnalysisNoteAnalysisLogRepository
  implements ICalendarAnalysisNoteAnalysisLogRepository
{
  private readonly table = 'calendar_analysis_note_analysis_logs';

  async create(data: {
    calendarAiAnalysisId: string;
    analysis: string;
    noteCount: number;
    model?: string | null;
    analyzedAt?: Date;
  }): Promise<CalendarAnalysisNoteAnalysisLog> {
    const id = uuidv4();
    const now = new Date();
    const analyzedAt = data.analyzedAt ?? now;

    const { data: result, error } = await supabase
      .from(this.table)
      .insert({
        id,
        calendar_ai_analysis_id: data.calendarAiAnalysisId,
        analysis: data.analysis,
        note_count: data.noteCount,
        model: data.model ?? null,
        analyzed_at: analyzedAt,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) {
      Logger.danger('Error al crear log de análisis de notas', { error: error.message });
      throw new Error(error.message);
    }

    return this.mapToEntity(result);
  }

  async findAll(calendarAiAnalysisId?: string): Promise<CalendarAnalysisNoteAnalysisLog[]> {
    let query = supabase.from(this.table).select('*');

    if (calendarAiAnalysisId) {
      query = query.eq('calendar_ai_analysis_id', calendarAiAnalysisId);
    }

    const { data, error } = await query.order('analyzed_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (data || []).map(this.mapToEntity);
  }

  async findByAnalysisId(
    calendarAiAnalysisId: string,
  ): Promise<CalendarAnalysisNoteAnalysisLog[]> {
    return this.findAll(calendarAiAnalysisId);
  }

  async findById(id: string): Promise<CalendarAnalysisNoteAnalysisLog | null> {
    const { data, error } = await supabase.from(this.table).select('*').eq('id', id).single();

    if (error) {
      return null;
    }

    return this.mapToEntity(data);
  }

  private mapToEntity(row: Record<string, unknown>): CalendarAnalysisNoteAnalysisLog {
    return {
      id: row.id as string,
      calendarAiAnalysisId: row.calendar_ai_analysis_id as string,
      analysis: row.analysis as string,
      noteCount: row.note_count as number,
      model: (row.model as string) ?? null,
      analyzedAt: new Date(row.analyzed_at as string),
      createdAt: new Date(row.created_at as string),
      updatedAt: new Date(row.updated_at as string),
    };
  }
}
