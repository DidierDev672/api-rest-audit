import { supabase } from './supabase';
import { AiResearchResult } from '../../domain/entities/AiResearchAssignmentEntity';
import { IAiResearchResultRepository } from '../../domain/repositories/IAiResearchResultRepository';
import { Logger } from '../logger/Logger';

export class AiResearchResultRepository implements IAiResearchResultRepository {
  private readonly table = 'ai_research_results';

  async create(data: AiResearchResult): Promise<void> {
    Logger.info('Guardando resultado de investigación IA', {
      id: data.id,
      assignmentId: data.assignmentId,
    });

    const { error } = await supabase.from(this.table).insert({
      id: data.id,
      assignment_id: data.assignmentId,
      owner_id: data.ownerId,
      title: data.title,
      content: data.content,
      psychological_message: data.psychologicalMessage,
      model: data.model,
      seen: data.seen,
      created_at: data.createdAt.toISOString(),
    });

    if (error) {
      Logger.danger('Error al guardar resultado de investigación IA', { error: error.message });
      throw new Error(error.message);
    }
  }

  async findById(id: string): Promise<AiResearchResult | null> {
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

  async findByOwnerId(ownerId: string, onlyUnseen = false): Promise<AiResearchResult[]> {
    let query = supabase
      .from(this.table)
      .select('*')
      .eq('owner_id', ownerId);

    if (onlyUnseen) {
      query = query.eq('seen', false);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data.map(this.mapToEntity);
  }

  async findByAssignmentId(assignmentId: string): Promise<AiResearchResult[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('assignment_id', assignmentId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data.map(this.mapToEntity);
  }

  async markSeen(id: string): Promise<void> {
    const { error } = await supabase
      .from(this.table)
      .update({ seen: true })
      .eq('id', id);

    if (error) throw new Error(error.message);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from(this.table).delete().eq('id', id);

    if (error) {
      Logger.danger('Error al eliminar resultado de investigación IA', {
        error: error.message,
        id,
      });
      throw new Error(error.message);
    }
  }

  private mapToEntity(data: any): AiResearchResult {
    return {
      id: data.id,
      assignmentId: data.assignment_id,
      ownerId: data.owner_id,
      title: data.title ?? '',
      content: data.content ?? '',
      psychologicalMessage: data.psychological_message ?? '',
      model: data.model ?? null,
      seen: data.seen ?? false,
      createdAt: new Date(data.created_at),
    };
  }
}
