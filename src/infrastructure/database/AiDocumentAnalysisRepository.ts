import { supabase } from './supabase';
import { AiDocumentAnalysis } from '../../domain/entities/AiDocumentAnalysisEntity';
import { IAiDocumentAnalysisRepository } from '../../domain/repositories/IAiDocumentAnalysisRepository';
import { Logger } from '../logger/Logger';

export class AiDocumentAnalysisRepository implements IAiDocumentAnalysisRepository {
  private readonly table = 'ai_document_analyses';

  async create(data: AiDocumentAnalysis): Promise<void> {
    Logger.info('Creando análisis de documento AI', { id: data.id, documentUploadId: data.documentUploadId });

    const { error } = await supabase
      .from(this.table)
      .insert({
        id: data.id,
        document_upload_id: data.documentUploadId,
        content: data.content,
        model: data.model,
        analysis_id: data.analysisId,
        created_at: data.createdAt.toISOString(),
        updated_at: data.updatedAt.toISOString(),
      });

    if (error) {
      Logger.danger('Error al crear análisis de documento AI', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Análisis de documento AI creado en base de datos');
  }

  async findById(id: string): Promise<AiDocumentAnalysis | null> {
    Logger.info('Obteniendo análisis de documento AI por ID', { id });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      Logger.danger('Error al obtener análisis de documento AI', { error: error.message });
      throw new Error(error.message);
    }

    return this.mapToEntity(data);
  }

  async findAll(): Promise<AiDocumentAnalysis[]> {
    Logger.info('Obteniendo todos los análisis de documentos AI');

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener análisis de documentos AI', { error: error.message });
      throw new Error(error.message);
    }

    return data.map(this.mapToEntity);
  }

  async findByDocumentUploadId(documentUploadId: string): Promise<AiDocumentAnalysis[]> {
    Logger.info('Obteniendo análisis por documentUploadId', { documentUploadId });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('document_upload_id', documentUploadId)
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener análisis por documentUploadId', { error: error.message });
      throw new Error(error.message);
    }

    return data.map(this.mapToEntity);
  }

  private mapToEntity(data: any): AiDocumentAnalysis {
    return {
      id: data.id,
      documentUploadId: data.document_upload_id,
      content: data.content,
      model: data.model,
      analysisId: data.analysis_id ?? null,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}
