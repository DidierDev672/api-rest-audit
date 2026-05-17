import { supabase } from './supabase';
import { ResearchNoteAnalysis } from '../../domain/entities';
import { IResearchNoteAnalysisRepository } from '../../domain/repositories/IResearchNoteAnalysisRepository';
import { Logger } from '../logger/Logger';

export class ResearchNoteAnalysisRepository implements IResearchNoteAnalysisRepository {
  private readonly table = 'research_note_analysis';

  async create(data: ResearchNoteAnalysis): Promise<void> {
    Logger.info('Creando análisis de notas de investigación', { id: data.id, researchId: data.researchId });

    const { error } = await supabase
      .from(this.table)
      .insert({
        id: data.id,
        research_id: data.researchId,
        analysis_text: data.analysisText,
        notes_count: data.notesCount,
        source: data.source,
        model_name: data.modelName,
        language: data.language,
        created_by_user_id: data.createdByUserId,
        created_at: data.createdAt.toISOString(),
        updated_at: data.updatedAt.toISOString(),
      });

    if (error) {
      Logger.danger('Error al crear análisis de notas de investigación', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Análisis de notas de investigación creado');
  }

  async findById(id: string): Promise<ResearchNoteAnalysis | null> {
    Logger.info('Obteniendo análisis de notas por ID', { id });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      Logger.danger('Error al obtener análisis de notas', { error: error.message });
      throw new Error(error.message);
    }

    return this.mapToEntity(data);
  }

  async findByResearchId(researchId: string): Promise<ResearchNoteAnalysis[]> {
    Logger.info('Obteniendo análisis de notas por research ID', { researchId });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('research_id', researchId)
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error al obtener análisis de notas', { error: error.message });
      throw new Error(error.message);
    }

    return data.map(this.mapToEntity);
  }

  private mapToEntity(data: any): ResearchNoteAnalysis {
    return {
      id: data.id,
      researchId: data.research_id,
      analysisText: data.analysis_text,
      notesCount: data.notes_count,
      source: data.source,
      modelName: data.model_name,
      language: data.language,
      createdByUserId: data.created_by_user_id,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}
