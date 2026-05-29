import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabase';
import { AiDocumentAnalysisNote } from '../../domain/entities';
import { IAiDocumentAnalysisNoteRepository } from '../../domain/repositories/IAiDocumentAnalysisNoteRepository';
import { Logger } from '../logger/Logger';

export class AiDocumentAnalysisNoteRepository implements IAiDocumentAnalysisNoteRepository {
  private readonly table = 'ai_document_analysis_notes';

  async create(data: {
    aiDocumentAnalysisId: string;
    content: string;
    color: string;
    colorName: string;
    createdAt?: Date;
  }): Promise<AiDocumentAnalysisNote> {
    const id = uuidv4();
    const now = new Date();
    const createdAt = data.createdAt ?? now;

    Logger.info('Creando nota de análisis de documento IA', {
      id,
      aiDocumentAnalysisId: data.aiDocumentAnalysisId,
    });

    const { data: result, error } = await supabase
      .from(this.table)
      .insert({
        id,
        ai_document_analysis_id: data.aiDocumentAnalysisId,
        content: data.content,
        color: data.color,
        color_name: data.colorName,
        created_at: createdAt,
        updated_at: now,
      })
      .select()
      .single();

    if (error) {
      Logger.danger('Error al crear nota de análisis de documento IA', {
        error: error.message,
      });
      throw new Error(error.message);
    }

    Logger.success('Nota de análisis de documento IA creada', { id });
    return this.mapToEntity(result);
  }

  async findAll(aiDocumentAnalysisId?: string): Promise<AiDocumentAnalysisNote[]> {
    let query = supabase.from(this.table).select('*');

    if (aiDocumentAnalysisId) {
      query = query.eq('ai_document_analysis_id', aiDocumentAnalysisId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (data || []).map(this.mapToEntity);
  }

  async findByAnalysisId(aiDocumentAnalysisId: string): Promise<AiDocumentAnalysisNote[]> {
    return this.findAll(aiDocumentAnalysisId);
  }

  async findById(id: string): Promise<AiDocumentAnalysisNote | null> {
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

  private mapToEntity(row: Record<string, unknown>): AiDocumentAnalysisNote {
    return {
      id: row.id as string,
      aiDocumentAnalysisId: row.ai_document_analysis_id as string,
      content: row.content as string,
      color: row.color as string,
      colorName: row.color_name as string,
      createdAt: new Date(row.created_at as string),
      updatedAt: new Date(row.updated_at as string),
    };
  }
}
