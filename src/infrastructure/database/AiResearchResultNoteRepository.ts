import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabase';
import { Logger } from '../logger/Logger';

export interface AiResearchResultNoteRecord {
  id: string;
  aiResearchResultId: string;
  content: string;
  color: string;
  colorName: string;
  createdAt: Date;
  updatedAt: Date;
}

export class AiResearchResultNoteRepository {
  private readonly table = 'ai_research_result_notes';

  async create(data: {
    aiResearchResultId: string;
    content: string;
    color: string;
    colorName: string;
    createdAt?: Date;
  }): Promise<AiResearchResultNoteRecord> {
    const id = uuidv4();
    const now = new Date();
    const createdAt = data.createdAt ?? now;

    const { data: row, error } = await supabase
      .from(this.table)
      .insert({
        id,
        ai_research_result_id: data.aiResearchResultId,
        content: data.content,
        color: data.color,
        color_name: data.colorName,
        created_at: createdAt.toISOString(),
        updated_at: now.toISOString(),
      })
      .select()
      .single();

    if (error) {
      Logger.danger('Error al crear nota de resultado IA', { error: error.message });
      throw new Error(error.message);
    }

    return this.map(row);
  }

  async findByResultId(aiResearchResultId: string): Promise<AiResearchResultNoteRecord[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('ai_research_result_id', aiResearchResultId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []).map(this.map);
  }

  async findById(id: string): Promise<AiResearchResultNoteRecord | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return this.map(data);
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from(this.table).delete().eq('id', id);
    if (error) throw new Error(error.message);
  }

  private map(row: Record<string, unknown>): AiResearchResultNoteRecord {
    return {
      id: row.id as string,
      aiResearchResultId: row.ai_research_result_id as string,
      content: row.content as string,
      color: row.color as string,
      colorName: row.color_name as string,
      createdAt: new Date(row.created_at as string),
      updatedAt: new Date(row.updated_at as string),
    };
  }
}
