import { supabase } from './supabase';
import { AiDocumentRedaction } from '../../domain/entities/AiDocumentRedactionEntity';
import { IAiDocumentRedactionRepository } from '../../domain/repositories/IAiDocumentRedactionRepository';
import { Logger } from '../logger/Logger';

export class AiDocumentRedactionRepository implements IAiDocumentRedactionRepository {
  private readonly table = 'ai_document_redactions';

  async create(data: AiDocumentRedaction): Promise<void> {
    Logger.info('Creando redacción de documento AI', { id: data.id, documentUploadId: data.documentUploadId });

    const { error } = await supabase
      .from(this.table)
      .insert({
        id: data.id,
        document_upload_id: data.documentUploadId,
        analysis_id: data.analysisId,
        content: data.content,
        model: data.model,
        notes_count: data.notesCount,
        original_filename: data.originalFilename,
        redaction_id: data.redactionId,
        created_at: data.createdAt.toISOString(),
        updated_at: data.updatedAt.toISOString(),
      });

    if (error) {
      Logger.danger('Error al crear redacción de documento AI', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Redacción de documento AI creada en base de datos');
  }

  async findById(id: string): Promise<AiDocumentRedaction | null> {
    Logger.info('Obteniendo redacción de documento AI por ID', { id });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      Logger.danger('Error al obtener redacción de documento AI', { error: error.message });
      throw new Error(error.message);
    }

    return this.mapToEntity(data);
  }

  async findAll(): Promise<AiDocumentRedaction[]> {
    Logger.info('Obteniendo todas las redacciones de documentos AI');

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener redacciones de documentos AI', { error: error.message });
      throw new Error(error.message);
    }

    return data.map(this.mapToEntity);
  }

  async findByDocumentUploadId(documentUploadId: string): Promise<AiDocumentRedaction[]> {
    Logger.info('Obteniendo redacciones por documentUploadId', { documentUploadId });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('document_upload_id', documentUploadId)
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener redacciones por documentUploadId', { error: error.message });
      throw new Error(error.message);
    }

    return data.map(this.mapToEntity);
  }

  async update(id: string, data: Partial<AiDocumentRedaction>): Promise<AiDocumentRedaction> {
    Logger.info('Actualizando redacción de documento AI', { id });

    const dbData: Record<string, unknown> = {};
    if (data.documentUploadId !== undefined) dbData.document_upload_id = data.documentUploadId;
    if (data.analysisId !== undefined) dbData.analysis_id = data.analysisId;
    if (data.content !== undefined) dbData.content = data.content;
    if (data.model !== undefined) dbData.model = data.model;
    if (data.notesCount !== undefined) dbData.notes_count = data.notesCount;
    if (data.originalFilename !== undefined) dbData.original_filename = data.originalFilename;
    if (data.redactionId !== undefined) dbData.redaction_id = data.redactionId;
    if (data.updatedAt !== undefined) dbData.updated_at = data.updatedAt.toISOString();

    const { data: updated, error } = await supabase
      .from(this.table)
      .update(dbData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      Logger.danger('Error al actualizar redacción de documento AI', { error: error.message });
      throw new Error(error.message);
    }

    return this.mapToEntity(updated);
  }

  async delete(id: string): Promise<void> {
    Logger.info('Eliminando redacción de documento AI', { id });

    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id);

    if (error) {
      Logger.danger('Error al eliminar redacción de documento AI', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Redacción de documento AI eliminada de base de datos');
  }

  private mapToEntity(data: any): AiDocumentRedaction {
    return {
      id: data.id,
      documentUploadId: data.document_upload_id,
      analysisId: data.analysis_id ?? null,
      content: data.content,
      model: data.model,
      notesCount: data.notes_count,
      originalFilename: data.original_filename,
      redactionId: data.redaction_id ?? null,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}
