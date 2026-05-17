import { supabase } from '../database/supabase';
import { ResearchAnalysis } from '../../domain/entities';
import { ResearchAnalysisRepository as IResearchAnalysisRepository } from '../../domain/repositories';
import { Logger } from '../logger/Logger';

export class ResearchAnalysisRepository implements IResearchAnalysisRepository {
  private readonly table = 'research_analysis';

  async create(data: Omit<ResearchAnalysis, 'id' | 'createdAt' | 'updatedAt'>): Promise<ResearchAnalysis> {
    Logger.info('Creating research analysis', { researchId: data.researchId });

    const { data: result, error } = await supabase
      .from(this.table)
      .insert({
        research_id: data.researchId,
        analysis: data.analysis,
        notes_count: data.notesCount,
        notes_references: data.notesReferences,
      })
      .select()
      .single();

    if (error) {
      Logger.danger('Error creating research analysis', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Research analysis created');
    return this.mapToEntity(result);
  }

  async findAll(): Promise<ResearchAnalysis[]> {
    Logger.info('Finding all research analyses');

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error finding all research analyses', { error: error.message });
      throw new Error(error.message);
    }

    return data.map(this.mapToEntity);
  }

  async findById(id: string): Promise<ResearchAnalysis | null> {
    Logger.info('Finding research analysis by ID', { id });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      Logger.danger('Error finding research analysis', { error: error.message });
      throw new Error(error.message);
    }

    return this.mapToEntity(data);
  }

  async findByResearchId(researchId: string): Promise<ResearchAnalysis[]> {
    Logger.info('Finding research analysis by research ID', { researchId });

    const { data, error } = await supabase
      .from(this.table)
      .select('*')
      .eq('research_id', researchId)
      .order('created_at', { ascending: false });

    if (error) {
      Logger.danger('Error finding research analysis', { error: error.message });
      throw new Error(error.message);
    }

    return data.map(this.mapToEntity);
  }

  async update(id: string, data: Partial<ResearchAnalysis>): Promise<ResearchAnalysis> {
    Logger.info('Updating research analysis', { id });

    const updateData: any = {};
    if (data.researchId) updateData.research_id = data.researchId;
    if (data.analysis) updateData.analysis = data.analysis;
    if (data.notesCount !== undefined) updateData.notes_count = data.notesCount;
    if (data.notesReferences) updateData.notes_references = data.notesReferences;

    const { data: result, error } = await supabase
      .from(this.table)
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      Logger.danger('Error updating research analysis', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Research analysis updated');
    return this.mapToEntity(result);
  }

  async delete(id: string): Promise<void> {
    Logger.info('Deleting research analysis', { id });

    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('id', id);

    if (error) {
      Logger.danger('Error deleting research analysis', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Research analysis deleted');
  }

  async deleteByResearchId(researchId: string): Promise<void> {
    Logger.info('Deleting research analysis by research ID', { researchId });

    const { error } = await supabase
      .from(this.table)
      .delete()
      .eq('research_id', researchId);

    if (error) {
      Logger.danger('Error deleting research analysis', { error: error.message });
      throw new Error(error.message);
    }

    Logger.success('Research analysis deleted by research ID');
  }

  private mapToEntity(data: any): ResearchAnalysis {
    return {
      id: data.id,
      researchId: data.research_id,
      analysis: data.analysis,
      notesCount: data.notes_count,
      notesReferences: data.notes_references,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}