import { supabase } from './supabase';
import {
  AiResearchAssignment,
  AiResearchAssignmentStatus,
  AiResearchEventType,
  AiResearchRecurrence,
} from '../../domain/entities/AiResearchAssignmentEntity';
import { IAiResearchAssignmentRepository } from '../../domain/repositories/IAiResearchAssignmentRepository';
import { Logger } from '../logger/Logger';

export class AiResearchAssignmentRepository
  implements IAiResearchAssignmentRepository
{
  private readonly table = 'ai_research_assignments';

  async create(data: AiResearchAssignment): Promise<void> {
    Logger.info('Creando asignación de investigación IA', {
      id: data.id,
      ownerId: data.ownerId,
    });

    const { error } = await supabase.from(this.table).insert({
      id: data.id,
      owner_id: data.ownerId,
      calendar_event_id: data.calendarEventId,
      research_id: data.researchId,
      event_type: data.eventType,
      title: data.title,
      prompt: data.prompt,
      start_date: data.startDate,
      end_date: data.endDate,
      recurrence: data.recurrence,
      status: data.status,
      continue_delivery: data.continueDelivery,
      model: data.model,
      next_run_at: data.nextRunAt ? data.nextRunAt.toISOString() : null,
      last_run_at: data.lastRunAt ? data.lastRunAt.toISOString() : null,
      completed_at: data.completedAt ? data.completedAt.toISOString() : null,
      runs_count: data.runsCount,
      last_error: data.lastError,
      created_at: data.createdAt.toISOString(),
      updated_at: data.updatedAt.toISOString(),
    });

    if (error) {
      Logger.danger('Error al crear asignación de investigación IA', { error: error.message });
      throw new Error(error.message);
    }
  }

  async findById(id: string): Promise<AiResearchAssignment | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(error.message);
    }

    return this.mapToEntity(data);
  }

  async findByOwnerId(ownerId: string): Promise<AiResearchAssignment[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('owner_id', ownerId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data.map(this.mapToEntity);
  }

  async findDuePending(limit: number): Promise<AiResearchAssignment[]> {
    const nowIso = new Date().toISOString();

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('status', 'pending')
      .eq('continue_delivery', true)
      .lte('next_run_at', nowIso)
      .order('next_run_at', { ascending: true })
      .limit(limit);

    if (error) throw new Error(error.message);
    return data.map(this.mapToEntity);
  }

  async update(
    id: string,
    data: Partial<AiResearchAssignment>,
  ): Promise<AiResearchAssignment> {
    const dbData: Record<string, unknown> = {};
    if (data.calendarEventId !== undefined) dbData.calendar_event_id = data.calendarEventId;
    if (data.researchId !== undefined) dbData.research_id = data.researchId;
    if (data.eventType !== undefined) dbData.event_type = data.eventType;
    if (data.title !== undefined) dbData.title = data.title;
    if (data.prompt !== undefined) dbData.prompt = data.prompt;
    if (data.startDate !== undefined) dbData.start_date = data.startDate;
    if (data.endDate !== undefined) dbData.end_date = data.endDate;
    if (data.recurrence !== undefined) dbData.recurrence = data.recurrence;
    if (data.status !== undefined) dbData.status = data.status;
    if (data.continueDelivery !== undefined) dbData.continue_delivery = data.continueDelivery;
    if (data.model !== undefined) dbData.model = data.model;
    if (data.nextRunAt !== undefined) {
      dbData.next_run_at = data.nextRunAt ? data.nextRunAt.toISOString() : null;
    }
    if (data.lastRunAt !== undefined) {
      dbData.last_run_at = data.lastRunAt ? data.lastRunAt.toISOString() : null;
    }
    if (data.completedAt !== undefined) {
      dbData.completed_at = data.completedAt ? data.completedAt.toISOString() : null;
    }
    if (data.runsCount !== undefined) dbData.runs_count = data.runsCount;
    if (data.lastError !== undefined) dbData.last_error = data.lastError;
    dbData.updated_at = new Date().toISOString();

    const { data: updated, error } = await supabase
      .from(this.table)
      .update(dbData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return this.mapToEntity(updated);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from(this.table).delete().eq('id', id);
    if (error) throw new Error(error.message);
  }

  private mapToEntity(data: any): AiResearchAssignment {
    return {
      id: data.id,
      ownerId: data.owner_id,
      calendarEventId: data.calendar_event_id ?? null,
      researchId: data.research_id ?? null,
      eventType: (data.event_type as AiResearchEventType) ?? 'task',
      title: data.title ?? '',
      prompt: data.prompt ?? '',
      startDate: data.start_date,
      endDate: data.end_date,
      recurrence: (data.recurrence as AiResearchRecurrence) ?? 'once',
      status: (data.status as AiResearchAssignmentStatus) ?? 'pending',
      continueDelivery: data.continue_delivery ?? true,
      model: data.model ?? null,
      nextRunAt: data.next_run_at ? new Date(data.next_run_at) : null,
      lastRunAt: data.last_run_at ? new Date(data.last_run_at) : null,
      completedAt: data.completed_at ? new Date(data.completed_at) : null,
      runsCount: data.runs_count ?? 0,
      lastError: data.last_error ?? null,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}
